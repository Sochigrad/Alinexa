// deno-lint-ignore-file no-explicit-any
import webpush from "npm:web-push@3.6.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY") || "";
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY") || "";
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:sochigrad@gmail.com";
const TIMEZONE_OFFSET = Deno.env.get("ALINEXA_REMINDER_TZ_OFFSET") || "+03:00";

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

type Workspace = {
  user_id: string;
  board: {
    cards?: ReminderCard[];
  } | null;
};

type ReminderCard = {
  id: string;
  title?: string;
  description?: string;
  plannedDate?: string;
  plannedTime?: string;
  reminderEnabled?: boolean;
};

type PushSubscriptionRow = {
  endpoint: string;
  subscription: any;
};

function headers() {
  return {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
}

async function rest(path: string, init: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      ...headers(),
      ...(init.headers || {}),
    },
  });
}

function getPlannedAt(card: ReminderCard) {
  if (!card.plannedDate || !card.plannedTime) {
    return null;
  }
  const value = new Date(`${card.plannedDate}T${card.plannedTime}:00${TIMEZONE_OFFSET}`);
  return Number.isNaN(value.getTime()) ? null : value;
}

function shouldSend(card: ReminderCard, now: Date) {
  if (!card.reminderEnabled) {
    return null;
  }

  const plannedAt = getPlannedAt(card);
  if (!plannedAt) {
    return null;
  }

  const ageMs = now.getTime() - plannedAt.getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;
  if (ageMs < 0 || ageMs > oneDayMs) {
    return null;
  }

  return plannedAt;
}

async function markDelivery(userId: string, cardId: string, plannedAt: Date) {
  const params = new URLSearchParams({
    select: "id",
    user_id: `eq.${userId}`,
    card_id: `eq.${cardId}`,
    planned_at: `eq.${plannedAt.toISOString()}`,
    limit: "1",
  });
  const existing = await rest(`alinexa_reminder_deliveries?${params}`);
  if (existing.ok) {
    const rows = await existing.json();
    if (Array.isArray(rows) && rows.length > 0) {
      return false;
    }
  }

  const response = await rest("alinexa_reminder_deliveries", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      user_id: userId,
      card_id: cardId,
      planned_at: plannedAt.toISOString(),
    }),
  });

  return response.ok;
}

async function deleteSubscription(endpoint: string) {
  const params = new URLSearchParams({ endpoint: `eq.${endpoint}` });
  await rest(`alinexa_push_subscriptions?${params}`, {
    method: "DELETE",
  });
}

async function sendToUser(userId: string, card: ReminderCard, plannedAt: Date) {
  const params = new URLSearchParams({
    select: "endpoint,subscription",
    user_id: `eq.${userId}`,
  });
  const response = await rest(`alinexa_push_subscriptions?${params}`);
  if (!response.ok) {
    return { sent: 0, failed: 0 };
  }

  const subscriptions = (await response.json()) as PushSubscriptionRow[];
  let sent = 0;
  let failed = 0;

  await Promise.all(
    subscriptions.map(async (subscription) => {
      try {
        await webpush.sendNotification(
          subscription.subscription,
          JSON.stringify({
            title: `Alinexa: ${card.title || "задача"}`,
            body: card.description || "Пришло время выполнить задачу",
            tag: `alinexa-card-${card.id}-${plannedAt.toISOString()}`,
            url: "https://alinexa.ru/",
          }),
        );
        sent += 1;
      } catch (error: any) {
        failed += 1;
        if (error?.statusCode === 404 || error?.statusCode === 410) {
          await deleteSubscription(subscription.endpoint);
        }
      }
    }),
  );

  return { sent, failed };
}

Deno.serve(async () => {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return Response.json(
      { error: "Missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, VAPID_PUBLIC_KEY or VAPID_PRIVATE_KEY" },
      { status: 500 },
    );
  }

  const now = new Date();
  const response = await rest("alinexa_workspaces?select=user_id,board");
  if (!response.ok) {
    return Response.json({ error: await response.text() }, { status: response.status });
  }

  const workspaces = (await response.json()) as Workspace[];
  let checked = 0;
  let sent = 0;
  let failed = 0;

  for (const workspace of workspaces) {
    const cards = Array.isArray(workspace.board?.cards) ? workspace.board.cards : [];
    for (const card of cards) {
      const plannedAt = shouldSend(card, now);
      if (!plannedAt) {
        continue;
      }
      checked += 1;
      const isNewDelivery = await markDelivery(workspace.user_id, card.id, plannedAt);
      if (!isNewDelivery) {
        continue;
      }
      const result = await sendToUser(workspace.user_id, card, plannedAt);
      sent += result.sent;
      failed += result.failed;
    }
  }

  return Response.json({ ok: true, checked, sent, failed });
});
