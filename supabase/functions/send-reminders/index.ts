// deno-lint-ignore-file no-explicit-any

const SUPABASE_URL =
  Deno.env.get("SUPABASE_URL") ||
  Deno.env.get("PROJECT_URL") ||
  Deno.env.get("ALINEXA_PROJECT_URL") ||
  "";
const SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
  Deno.env.get("SERVICE_ROLE_KEY") ||
  Deno.env.get("ALINEXA_SERVICE_ROLE_KEY") ||
  "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const REMINDER_FROM_EMAIL = Deno.env.get("REMINDER_FROM_EMAIL") || "Alinexa <onboarding@resend.dev>";
const TIMEZONE_OFFSET = Deno.env.get("ALINEXA_REMINDER_TZ_OFFSET") || "+03:00";
const APP_URL = "https://alinexa.ru/";
const BOARD_TITLE = "Alinexa";

type Column = {
  id: string;
  title?: string;
};

type ReminderCard = {
  id: string;
  title?: string;
  description?: string;
  columnId?: string;
  plannedDate?: string;
  plannedTime?: string;
  reminderEnabled?: boolean;
};

type Workspace = {
  user_id: string;
  board: {
    columns?: Column[];
    cards?: ReminderCard[];
  } | null;
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

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

function formatDeadline(plannedAt: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(plannedAt);
}

function getColumnTitle(workspace: Workspace, card: ReminderCard) {
  return workspace.board?.columns?.find((column) => column.id === card.columnId)?.title || "";
}

async function deliveryExists(userId: string, cardId: string, plannedAt: Date) {
  const params = new URLSearchParams({
    select: "id",
    user_id: `eq.${userId}`,
    card_id: `eq.${cardId}`,
    planned_at: `eq.${plannedAt.toISOString()}`,
    channel: "eq.email",
    limit: "1",
  });
  const response = await rest(`alinexa_reminder_deliveries?${params}`);
  if (!response.ok) {
    return false;
  }
  const rows = await response.json();
  return Array.isArray(rows) && rows.length > 0;
}

async function recordDelivery(userId: string, cardId: string, plannedAt: Date) {
  const response = await rest("alinexa_reminder_deliveries", {
    method: "POST",
    headers: {
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({
      user_id: userId,
      card_id: cardId,
      planned_at: plannedAt.toISOString(),
      channel: "email",
      sent_at: new Date().toISOString(),
    }),
  });

  return response.ok;
}

async function getUserEmail(userId: string) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
    headers: headers(),
  });
  if (!response.ok) {
    return "";
  }
  const user = await response.json();
  return typeof user?.email === "string" ? user.email : "";
}

function buildEmailHtml(card: ReminderCard, plannedAt: Date, columnTitle: string) {
  const title = escapeHtml(card.title || "Задача");
  const description = card.description ? `<p>${escapeHtml(card.description)}</p>` : "";
  const column = columnTitle ? `<p><strong>Колонка:</strong> ${escapeHtml(columnTitle)}</p>` : "";

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
      <h2 style="margin: 0 0 14px;">Alinexa</h2>
      <p style="font-size: 17px; margin: 0 0 12px;"><strong>Напоминание о задаче:</strong> ${title}</p>
      <p><strong>Дата и время:</strong> ${escapeHtml(formatDeadline(plannedAt))}</p>
      <p><strong>Доска:</strong> ${BOARD_TITLE}</p>
      ${column}
      ${description}
      <p style="margin-top: 22px;">
        <a href="${APP_URL}" style="background: #0f766e; color: #ffffff; padding: 12px 18px; border-radius: 10px; text-decoration: none; display: inline-block;">
          Открыть Alinexa
        </a>
      </p>
    </div>
  `;
}

async function sendEmailReminder(email: string, workspace: Workspace, card: ReminderCard, plannedAt: Date) {
  const columnTitle = getColumnTitle(workspace, card);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: REMINDER_FROM_EMAIL,
      to: email,
      subject: `Alinexa: ${card.title || "напоминание о задаче"}`,
      html: buildEmailHtml(card, plannedAt, columnTitle),
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}

Deno.serve(async () => {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !RESEND_API_KEY) {
    return Response.json(
      { error: "Missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY or RESEND_API_KEY" },
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
  const errors: string[] = [];

  for (const workspace of workspaces) {
    const cards = Array.isArray(workspace.board?.cards) ? workspace.board.cards : [];
    for (const card of cards) {
      const plannedAt = shouldSend(card, now);
      if (!plannedAt) {
        continue;
      }

      checked += 1;
      if (await deliveryExists(workspace.user_id, card.id, plannedAt)) {
        continue;
      }

      try {
        const email = await getUserEmail(workspace.user_id);
        if (!email) {
          throw new Error(`No email for user ${workspace.user_id}`);
        }
        await sendEmailReminder(email, workspace, card, plannedAt);
        await recordDelivery(workspace.user_id, card.id, plannedAt);
        sent += 1;
      } catch (error) {
        failed += 1;
        errors.push(error instanceof Error ? error.message : String(error));
      }
    }
  }

  return Response.json({ ok: true, checked, sent, failed, errors: errors.slice(0, 5) });
});
