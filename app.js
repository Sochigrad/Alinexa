const STORAGE_KEY = "taskflow-board-v1";
const THEME_KEY = "taskflow-theme-v1";
const LABELS_KEY = "taskflow-labels-v1";
const LOCAL_UPDATED_KEY = "alinexa-local-updated-v1";
const WORKSPACE_TABLE = "alinexa_workspaces";
const SUPABASE_URL = "https://uhxenswxuiebpxwksobw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoeGVuc3d4dWllYnB4d2tzb2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTM5MjksImV4cCI6MjA5NDU4OTkyOX0.QSc3NN9KF73yhKVjkxFYxFE0j91XOtCUeIpptI1uaCM";
const APP_URL = "https://alinexa.ru/";
const SUPABASE_CDN_URLS = [
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",
  "https://unpkg.com/@supabase/supabase-js@2",
];
const PUSH_SUBSCRIPTIONS_TABLE = "alinexa_push_subscriptions";
const VAPID_PUBLIC_KEY =
  "BBZsesectlp8qreP1O5lFR62o1LQRUAOd-T44sU3wpR3JhFKyv2hQyHK3XPG-7fOdaj-CO4Rze9TkEwWdkr_A5U";
const COLUMN_COLORS = [
  "#2563eb",
  "#f97316",
  "#22c55e",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#64748b",
  "#a855f7",
];
const COLUMN_COLOR_BY_ID = {
  backlog: "#2563eb",
  doing: "#f97316",
  review: "#8b5cf6",
  done: "#22c55e",
  today: "#ef4444",
};

const defaultTheme = {
  accent: "#0f766e",
  bg: "#eef2f7",
  panel: "#ffffff",
  ink: "#111827",
  background: "mist",
  customBackground: "",
};

const themePresets = {
  ocean: { ...defaultTheme },
  berry: {
    accent: "#be185d",
    bg: "#fff1f2",
    panel: "#ffffff",
    ink: "#171018",
    background: "rose",
    customBackground: "",
  },
  graphite: {
    accent: "#334155",
    bg: "#e5e7eb",
    panel: "#f8fafc",
    ink: "#111827",
    background: "graphite",
    customBackground: "",
  },
  sun: {
    accent: "#d97706",
    bg: "#fff7ed",
    panel: "#ffffff",
    ink: "#1f1300",
    background: "sunrise",
    customBackground: "",
  },
};

const backgroundPresets = [
  { id: "mist", css: "radial-gradient(circle at 18% 12%, rgba(20,184,166,.24), transparent 28rem), linear-gradient(145deg, #f8fafc, #eef2f7)" },
  { id: "ocean", css: "linear-gradient(135deg, rgba(8,47,73,.88), rgba(14,116,144,.66)), radial-gradient(circle at 80% 12%, #67e8f9, transparent 22rem)" },
  { id: "rose", css: "radial-gradient(circle at 20% 20%, rgba(244,114,182,.36), transparent 22rem), linear-gradient(135deg, #fff1f2, #fdf2f8)" },
  { id: "forest", css: "linear-gradient(135deg, rgba(20,83,45,.88), rgba(21,128,61,.5)), radial-gradient(circle at 70% 20%, #bbf7d0, transparent 20rem)" },
  { id: "sunrise", css: "radial-gradient(circle at 18% 18%, rgba(251,146,60,.42), transparent 20rem), linear-gradient(135deg, #fff7ed, #fef3c7)" },
  { id: "violet", css: "radial-gradient(circle at 80% 10%, rgba(167,139,250,.4), transparent 24rem), linear-gradient(135deg, #f5f3ff, #eef2ff)" },
  { id: "graphite", css: "linear-gradient(135deg, #e5e7eb, #f8fafc), radial-gradient(circle at 15% 10%, rgba(51,65,85,.18), transparent 18rem)" },
  { id: "skyline", css: "linear-gradient(160deg, rgba(37,99,235,.2), transparent 36%), repeating-linear-gradient(90deg, rgba(15,23,42,.08) 0 1px, transparent 1px 42px), linear-gradient(135deg, #eff6ff, #f8fafc)" },
  { id: "paper", css: "repeating-linear-gradient(0deg, rgba(15,23,42,.045) 0 1px, transparent 1px 28px), linear-gradient(135deg, #fffef7, #f8fafc)" },
  { id: "aurora", css: "radial-gradient(circle at 12% 20%, rgba(45,212,191,.38), transparent 18rem), radial-gradient(circle at 78% 18%, rgba(129,140,248,.34), transparent 22rem), linear-gradient(135deg, #f8fafc, #ecfeff)" },
];

const statusNames = {
  planned: "План",
  today: "Сегодня",
  urgent: "Срочно",
  waiting: "Ожидает",
  done: "Готово",
};

const defaultLabels = [
  { id: "product", name: "Продукт", color: "#bae6fd" },
  { id: "design", name: "Дизайн", color: "#ddd6fe" },
  { id: "dev", name: "Разработка", color: "#bbf7d0" },
  { id: "ops", name: "Операции", color: "#fed7aa" },
];

const defaultBoard = {
  columns: [
    { id: "backlog", title: "Бэклог" },
    { id: "doing", title: "В работе" },
    { id: "review", title: "Проверка" },
    { id: "done", title: "Готово" },
  ],
  cards: [
    {
      id: "card-1",
      columnId: "backlog",
      title: "Собрать идеи для релиза",
      description: "Коротко описать самые ценные фичи и убрать лишнее.",
      label: "product",
      focus: true,
      order: 0,
      createdAt: Date.now() - 4000,
    },
    {
      id: "card-2",
      columnId: "doing",
      title: "Прототип мобильного экрана",
      description: "Проверить навигацию, нижнюю панель и лист редактирования.",
      label: "design",
      focus: true,
      order: 0,
      createdAt: Date.now() - 3000,
    },
    {
      id: "card-3",
      columnId: "review",
      title: "Проверить сохранение",
      description: "Карточки должны оставаться после перезагрузки страницы.",
      label: "dev",
      focus: false,
      order: 0,
      createdAt: Date.now() - 2000,
    },
    {
      id: "card-4",
      columnId: "done",
      title: "Создать первую доску",
      description: "Стартовый шаблон готов к изменению под команду.",
      label: "ops",
      focus: false,
      order: 0,
      createdAt: Date.now() - 1000,
    },
  ],
  deletedCards: {},
};

function createPrivateEmptyBoard() {
  return normalizeBoard({
    columns: structuredClone(defaultBoard.columns),
    cards: [],
    deletedCards: {},
  });
}

let state = loadBoard();
let theme = loadTheme();
let labels = loadLabels();
let activeCardId = null;
let activeColumnId = null;
let quickColumnId = state.columns[0]?.id || "";
let longPressTimer = null;
let pendingTouch = null;
let touchDrag = null;
const TOUCH_LONG_PRESS_MS = 340;
const TOUCH_SCROLL_CANCEL_PX = 18;
const TOUCH_MOUSE_DRAG_PX = 4;
let suppressClickUntil = 0;
let autoScrollFrame = null;
let autoScrollState = { horizontal: 0, vertical: 0, list: null };
let dragFrame = null;
let columnDrag = null;
let columnDragFrame = null;
let supabaseClient = null;
let supabaseLoadPromise = null;
let currentUser = null;
let currentSession = null;
let remoteSaveTimer = null;
let remoteSyncTimer = null;
let reminderTimers = new Map();
let remoteWorkspaceUpdatedAt = "";
let localWorkspaceUpdatedAt = Number(localStorage.getItem(LOCAL_UPDATED_KEY) || 0);
let isApplyingRemoteWorkspace = false;
let isSavingRemoteWorkspace = false;
let hasQueuedRemoteSaveAfterCurrent = false;
let hasUnsavedLocalChanges = false;
let hasLoadedRemoteWorkspace = false;
let isWaitingForPasswordRecovery = false;
let isSigningOut = false;
let serviceWorkerReadyPromise = null;
let reminderAudioContext = null;
let recognition = null;
let recognitionTarget = null;
let isRecording = false;
let committedVoiceText = "";

const boardEl = document.querySelector("#board");
const totalCardsEl = document.querySelector("#totalCards");
const doneCardsEl = document.querySelector("#doneCards");
const focusCardsEl = document.querySelector("#focusCards");
const scrimEl = document.querySelector("#scrim");

const cardSheet = document.querySelector("#cardSheet");
const cardForm = document.querySelector("#cardForm");
const sheetTitle = document.querySelector("#sheetTitle");
const cardTitleInput = document.querySelector("#cardTitleInput");
const cardDescriptionInput = document.querySelector("#cardDescriptionInput");
const cardColumnInput = document.querySelector("#cardColumnInput");
const cardLabelInput = document.querySelector("#cardLabelInput");
const cardFocusInput = document.querySelector("#cardFocusInput");
const cardStatusInput = document.querySelector("#cardStatusInput");
const cardDateInput = document.querySelector("#cardDateInput");
const cardTimeInput = document.querySelector("#cardTimeInput");
const cardReminderInput = document.querySelector("#cardReminderInput");
const cardReminderStatus = document.querySelector("#cardReminderStatus");
const deleteCardButton = document.querySelector("#deleteCardButton");

const columnSheet = document.querySelector("#columnSheet");
const columnForm = document.querySelector("#columnForm");
const columnSheetTitle = document.querySelector("#columnSheetTitle");
const columnTitleInput = document.querySelector("#columnTitleInput");
const deleteColumnButton = document.querySelector("#deleteColumnButton");
const saveColumnButton = document.querySelector("#saveColumnButton");

const searchSheet = document.querySelector("#searchSheet");
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");

const themeSheet = document.querySelector("#themeSheet");
const themeForm = document.querySelector("#themeForm");
const accentColorInput = document.querySelector("#accentColorInput");
const bgColorInput = document.querySelector("#bgColorInput");
const panelColorInput = document.querySelector("#panelColorInput");
const inkColorInput = document.querySelector("#inkColorInput");
const backgroundGrid = document.querySelector("#backgroundGrid");
const backgroundFileInput = document.querySelector("#backgroundFileInput");

const voiceSheet = document.querySelector("#voiceSheet");
const voiceForm = document.querySelector("#voiceForm");
const voiceTextInput = document.querySelector("#voiceTextInput");
const voiceColumnInput = document.querySelector("#voiceColumnInput");
const voiceLabelInput = document.querySelector("#voiceLabelInput");
const voiceFocusInput = document.querySelector("#voiceFocusInput");
const voiceStatusInput = document.querySelector("#voiceStatusInput");
const recordVoiceButton = document.querySelector("#recordVoiceButton");
const voiceStatus = document.querySelector("#voiceStatus");
const voiceHint = document.querySelector("#voiceHint");
const dictateDescriptionButton = document.querySelector("#dictateDescriptionButton");

const labelsSheet = document.querySelector("#labelsSheet");
const labelsForm = document.querySelector("#labelsForm");
const labelsList = document.querySelector("#labelsList");
const newLabelInput = document.querySelector("#newLabelInput");

const authSheet = document.querySelector("#authSheet");
const authForm = document.querySelector("#authForm");
const authTitle = document.querySelector("#authTitle");
const authStatus = document.querySelector("#authStatus");
const authEmailLabel = document.querySelector("#authEmailLabel");
const authEmailInput = document.querySelector("#authEmailInput");
const authNameGrid = document.querySelector("#authNameGrid");
const authFirstNameInput = document.querySelector("#authFirstNameInput");
const authLastNameInput = document.querySelector("#authLastNameInput");
const authPasswordText = document.querySelector("#authPasswordText");
const authPasswordInput = document.querySelector("#authPasswordInput");
const authPasswordRepeatLabel = document.querySelector("#authPasswordRepeatLabel");
const authPasswordRepeatInput = document.querySelector("#authPasswordRepeatInput");
const signOutButton = document.querySelector("#signOutButton");
const signInButton = document.querySelector("#signInButton");
const signUpButton = document.querySelector("#signUpButton");
const resetPasswordButton = document.querySelector("#resetPasswordButton");
const accountButton = document.querySelector("#accountButton");
const accountName = document.querySelector("#accountName");
const welcomeSignUpButton = document.querySelector("#welcomeSignUpButton");
const welcomeSignInButton = document.querySelector("#welcomeSignInButton");
let authMode = "sign-in";
let ignoreNextAuthToggleClick = false;

function bindActionButton(selector, handler) {
  document.querySelector(selector).addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    handler(event);
  });
}

function bindReliableTap(button, handler) {
  if (!button) {
    return;
  }
  let lastRunAt = 0;
  const run = (event) => {
    const now = Date.now();
    if (now - lastRunAt < 350) {
      return;
    }
    lastRunAt = now;
    event?.preventDefault?.();
    event?.stopPropagation?.();
    handler(event);
  };
  button.addEventListener("click", run);
  button.addEventListener("touchend", run, { passive: false });
  button.addEventListener("pointerup", (event) => {
    if (event.pointerType === "touch") {
      run(event);
    }
  });
}

bindActionButton("#menuButton", openSearchSheet);
bindActionButton("#addCardButton", () => openCardSheet());
bindActionButton("#addColumnButton", () => openColumnSheet());
bindActionButton("#searchButton", openSearchSheet);
bindActionButton("#themeButton", openThemeSheet);
bindActionButton("#voiceButton", openVoiceSheet);
document.querySelectorAll(".bottom-action").forEach((button) => {
  button.addEventListener("pointerdown", (event) => event.stopPropagation());
  button.addEventListener("touchstart", (event) => event.stopPropagation(), { passive: true });
});
document.querySelector("#closeSheetButton").addEventListener("click", closeSheets);
document.querySelector("#closeColumnButton").addEventListener("click", closeSheets);
document.querySelector("#closeSearchButton").addEventListener("click", closeSheets);
document.querySelector("#closeThemeButton").addEventListener("click", closeSheets);
document.querySelector("#closeVoiceButton").addEventListener("click", closeSheets);
document.querySelector("#closeLabelsButton").addEventListener("click", closeSheets);
document.querySelector("#closeAuthButton").addEventListener("click", closeSheets);
accountButton.addEventListener("click", openAuthSheet);
bindReliableTap(welcomeSignUpButton, openRegistrationSheet);
bindReliableTap(welcomeSignInButton, openAuthSheet);
scrimEl.addEventListener("click", closeSheets);
document.addEventListener("pointermove", moveTouchDrag, { passive: false });
document.addEventListener("pointerup", finishTouchDrag, { passive: false });
document.addEventListener("pointercancel", cancelTouchDrag);
document.addEventListener("touchmove", moveTouchDragByTouch, { passive: false });
document.addEventListener("touchend", finishTouchDragByTouch, { passive: false });
document.addEventListener("touchcancel", cancelTouchDrag);
document.addEventListener("pointermove", moveColumnDrag, { passive: false });
document.addEventListener("pointerup", finishColumnDrag, { passive: false });
document.addEventListener("pointercancel", cancelColumnDrag);

cardForm.addEventListener("submit", saveCard);
columnForm.addEventListener("submit", saveColumn);
themeForm.addEventListener("submit", saveTheme);
voiceForm.addEventListener("submit", saveVoiceCard);
labelsForm.addEventListener("submit", saveLabels);
authForm.addEventListener("submit", handleAuthSubmit);
deleteCardButton.addEventListener("click", deleteActiveCard);
deleteColumnButton.addEventListener("click", deleteActiveColumn);
searchInput.addEventListener("input", renderSearch);
document.querySelector("#editLabelsButton").addEventListener("click", openLabelsSheet);
document.querySelector("#editVoiceLabelsButton").addEventListener("click", openLabelsSheet);
document.querySelector("#addLabelButton").addEventListener("click", addLabelDraft);
recordVoiceButton.addEventListener("click", () => toggleVoiceRecognition("voice-card"));
dictateDescriptionButton.addEventListener("click", () => toggleVoiceRecognition("description"));
document.querySelector("#clearVoiceTextButton").addEventListener("click", clearVoiceText);
document.querySelector("#resetThemeButton").addEventListener("click", resetTheme);
backgroundFileInput.addEventListener("change", uploadBackground);
window.addEventListener("focus", syncRemoteWorkspace);
window.visualViewport?.addEventListener("resize", updateVisualViewportHeight);
window.visualViewport?.addEventListener("scroll", updateVisualViewportHeight);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    syncRemoteWorkspace();
  }
});
cardFocusInput.addEventListener("change", () => {
  if (cardFocusInput.checked && cardStatusInput.value === "planned") {
    cardStatusInput.value = "today";
  }
});
cardStatusInput.addEventListener("change", () => {
  if (cardStatusInput.value === "today") {
    cardFocusInput.checked = true;
  }
});
function openNativePicker(input) {
  if (!input) {
    return;
  }

  try {
    input.showPicker?.();
  } catch {
    input.focus();
  }
}

cardDateInput.addEventListener("input", updateCardReminderStatus);
cardTimeInput.addEventListener("input", updateCardReminderStatus);
cardDateInput.addEventListener("click", () => openNativePicker(cardDateInput));
cardTimeInput.addEventListener("click", () => openNativePicker(cardTimeInput));
cardDateInput.addEventListener("touchend", () => openNativePicker(cardDateInput), { passive: true });
cardTimeInput.addEventListener("touchend", () => openNativePicker(cardTimeInput), { passive: true });
cardReminderInput.addEventListener("change", () => {
  if (cardReminderInput.checked) {
    requestReminderPermission().catch(() => "failed");
  }
  updateCardReminderStatus();
});
voiceFocusInput.addEventListener("change", () => {
  if (voiceFocusInput.checked && voiceStatusInput.value === "planned") {
    voiceStatusInput.value = "today";
  }
});
voiceStatusInput.addEventListener("change", () => {
  if (voiceStatusInput.value === "today") {
    voiceFocusInput.checked = true;
  }
});
document.querySelector("#resetLabelsButton").addEventListener("click", resetLabels);
signUpButton.addEventListener("click", () => {
  if (ignoreNextAuthToggleClick) {
    ignoreNextAuthToggleClick = false;
    return;
  }
  toggleAuthMode();
});
signUpButton.addEventListener("pointerup", (event) => {
  if (event.pointerType === "touch") {
    event.preventDefault();
    ignoreNextAuthToggleClick = true;
    toggleAuthMode();
  }
});
resetPasswordButton.addEventListener("click", sendPasswordResetEmail);
signOutButton.addEventListener("click", signOut);
signOutButton.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
});
document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => previewTheme(themePresets[button.dataset.preset]));
});
[accentColorInput, bgColorInput, panelColorInput, inkColorInput].forEach((input) => {
  input.addEventListener("input", previewThemeFromInputs);
});

applyTheme(theme);
render();
updateVisualViewportHeight();
initServiceWorker();
initAuth();

function loadBoard() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return normalizeBoard(defaultBoard);
  }

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed.columns) || !Array.isArray(parsed.cards)) {
      return normalizeBoard(defaultBoard);
    }
    return normalizeBoard(parsed);
  } catch {
    return normalizeBoard(defaultBoard);
  }
}

function persist({ immediate = false } = {}) {
  markLocalWorkspaceChanged();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleCardReminders();
  hasUnsavedLocalChanges = true;
  if (immediate) {
    return saveRemoteWorkspace();
  }
  queueRemoteWorkspaceSave();
}

function markLocalWorkspaceChanged() {
  localWorkspaceUpdatedAt = Date.now();
  localStorage.setItem(LOCAL_UPDATED_KEY, String(localWorkspaceUpdatedAt));
}

function hasLocalWorkspaceContent() {
  return hasUserBoardContent(state);
}

function hasUserBoardContent(board = state) {
  if (!board.cards?.length) {
    return false;
  }

  if (board.cards.length !== defaultBoard.cards.length || board.columns.length !== defaultBoard.columns.length) {
    return true;
  }

  const defaultTitles = new Set(defaultBoard.cards.map((card) => card.title));
  return board.cards.some((card) => !defaultTitles.has(card.title));
}

function areBoardsEqual(firstBoard, secondBoard) {
  return JSON.stringify(normalizeBoard(firstBoard)) === JSON.stringify(normalizeBoard(secondBoard));
}

function mergeBoards(localBoard, remoteBoard) {
  const normalizedLocal = normalizeBoard(localBoard);
  const normalizedRemote = normalizeBoard(remoteBoard);
  const deletedCards = {
    ...normalizedRemote.deletedCards,
    ...normalizedLocal.deletedCards,
  };
  const deletedIds = new Set(Object.keys(deletedCards));
  const columnMap = new Map();
  [...normalizedRemote.columns, ...normalizedLocal.columns].forEach((column) => {
    if (!column?.id || columnMap.has(column.id)) {
      return;
    }
    columnMap.set(column.id, { ...column });
  });

  const cardMap = new Map();
  [...normalizedRemote.cards, ...normalizedLocal.cards].forEach((card) => {
    if (!card?.id || deletedIds.has(card.id)) {
      return;
    }
    const previousCard = cardMap.get(card.id);
    if (!previousCard || getCardVersion(card) >= getCardVersion(previousCard)) {
      cardMap.set(card.id, { ...card });
    }
  });

  const columnIds = new Set(columnMap.keys());
  const cards = [...cardMap.values()].map((card) => {
    const columnId = columnIds.has(card.columnId) ? card.columnId : [...columnIds][0];
    return { ...card, columnId };
  });

  return normalizeBoard({
    columns: [...columnMap.values()],
    cards,
    deletedCards,
  });
}

function normalizeMergeKey(value) {
  return String(value || "").trim().toLowerCase();
}

function getCardVersion(card) {
  return Number(card?.updatedAt || card?.createdAt || 0);
}

function normalizeDeletedCards(value) {
  if (!value) {
    return {};
  }
  if (Array.isArray(value)) {
    return Object.fromEntries(value.filter(Boolean).map((id) => [String(id), 1]));
  }
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([id]) => id)
        .map(([id, deletedAt]) => [String(id), Number(deletedAt) || 1]),
    );
  }
  return {};
}

function normalizeColumnColor(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  return /^#[0-9a-f]{6}$/i.test(trimmed) ? trimmed : "";
}

function getDefaultColumnColor(column, index) {
  return COLUMN_COLOR_BY_ID[column?.id] || COLUMN_COLORS[index % COLUMN_COLORS.length];
}

function pickColumnColor(column, index, used = new Set()) {
  const savedColor = normalizeColumnColor(column?.color);
  if (savedColor && !used.has(savedColor.toLowerCase())) return savedColor;
  const preferredColor = normalizeColumnColor(getDefaultColumnColor(column, index));
  if (preferredColor && !used.has(preferredColor.toLowerCase())) return preferredColor;
  return COLUMN_COLORS.find((color) => !used.has(color.toLowerCase())) || COLUMN_COLORS[index % COLUMN_COLORS.length];
}

function getNextColumnColor() {
  const used = new Set(state.columns.map((column) => normalizeColumnColor(column.color).toLowerCase()).filter(Boolean));
  return COLUMN_COLORS.find((color) => !used.has(color.toLowerCase())) || COLUMN_COLORS[state.columns.length % COLUMN_COLORS.length];
}

function normalizeBoard(board) {
  const now = Date.now();
  const nextBoard = {
    columns: Array.isArray(board?.columns) ? structuredClone(board.columns) : structuredClone(defaultBoard.columns),
    cards: Array.isArray(board?.cards) ? structuredClone(board.cards) : [],
    deletedCards: normalizeDeletedCards(board?.deletedCards || board?.deletedCardIds),
  };
  const usedColumnColors = new Set();
  nextBoard.columns = nextBoard.columns
    .filter((column) => column?.id && column?.title)
    .map((column, index) => {
      const color = pickColumnColor(column, index, usedColumnColors);
      usedColumnColors.add(color.toLowerCase());
      return { ...column, color };
    });
  if (!nextBoard.columns.length) {
    nextBoard.columns = defaultBoard.columns.map((column, index) => {
      const color = pickColumnColor(column, index, usedColumnColors);
      usedColumnColors.add(color.toLowerCase());
      return { ...column, color };
    });
  }
  const columnIds = new Set(nextBoard.columns.map((column) => column.id));
  const fallbackColumnId = nextBoard.columns[0]?.id || defaultBoard.columns[0]?.id || "";
  const deletedIds = new Set(Object.keys(nextBoard.deletedCards));
  nextBoard.cards = nextBoard.cards
    .filter((card) => card?.id && !deletedIds.has(card.id))
    .map((card, index) => ({
      ...card,
      columnId: columnIds.has(card.columnId) ? card.columnId : fallbackColumnId,
      order: Number.isFinite(card.order) ? card.order : index,
      createdAt: Number(card.createdAt) || now,
      updatedAt: Number(card.updatedAt) || Number(card.createdAt) || now,
    }));
  nextBoard.columns.forEach((column) => {
    nextBoard.cards
      .filter((card) => card.columnId === column.id)
      .sort(sortCards)
      .forEach((card, index) => {
        card.order = index;
      });
  });
  return nextBoard;
}

function markCardDeleted(cardId) {
  state.deletedCards = normalizeDeletedCards(state.deletedCards);
  state.deletedCards[cardId] = Date.now();
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (!saved) {
    return { ...defaultTheme };
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      accent: normalizeHex(parsed.accent, defaultTheme.accent),
      bg: normalizeHex(parsed.bg, defaultTheme.bg),
      panel: normalizeHex(parsed.panel, defaultTheme.panel),
      ink: normalizeHex(parsed.ink, defaultTheme.ink),
      background: normalizeBackgroundId(parsed.background, defaultTheme.background),
      customBackground: typeof parsed.customBackground === "string" ? parsed.customBackground : "",
    };
  } catch {
    return { ...defaultTheme };
  }
}

function normalizeTheme(value) {
  return {
    accent: normalizeHex(value?.accent, defaultTheme.accent),
    bg: normalizeHex(value?.bg, defaultTheme.bg),
    panel: normalizeHex(value?.panel, defaultTheme.panel),
    ink: normalizeHex(value?.ink, defaultTheme.ink),
    background: normalizeBackgroundId(value?.background, defaultTheme.background),
    customBackground: typeof value?.customBackground === "string" ? value.customBackground : "",
  };
}

function loadLabels() {
  const saved = localStorage.getItem(LABELS_KEY);
  if (!saved) {
    return structuredClone(defaultLabels);
  }

  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      const safeLabels = parsed
        .map((label, index) => normalizeLabelObject(label, index))
        .filter(Boolean);
      return safeLabels.length ? safeLabels : structuredClone(defaultLabels);
    }

    // Migrate the older object shape: { product: "..." }.
    return defaultLabels.map((label) => ({
      ...label,
      name: normalizeLabel(parsed[label.id], label.name),
    }));
  } catch {
    return structuredClone(defaultLabels);
  }
}

function persistTheme({ immediate = false } = {}) {
  markLocalWorkspaceChanged();
  localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  hasUnsavedLocalChanges = true;
  if (immediate) {
    return saveRemoteWorkspace();
  }
  queueRemoteWorkspaceSave();
}

function persistLabels() {
  markLocalWorkspaceChanged();
  localStorage.setItem(LABELS_KEY, JSON.stringify(labels));
  hasUnsavedLocalChanges = true;
  queueRemoteWorkspaceSave();
}

function applyTheme(nextTheme) {
  const root = document.documentElement;
  const accentStrong = mixColors(nextTheme.accent, "#000000", 0.22);
  const panelSoft = mixColors(nextTheme.panel, nextTheme.bg, 0.34);
  const line = mixColors(nextTheme.ink, nextTheme.panel, 0.86);

  root.style.setProperty("--accent", nextTheme.accent);
  root.style.setProperty("--accent-strong", accentStrong);
  root.style.setProperty("--accent-soft", hexToRgba(nextTheme.accent, 0.16));
  root.style.setProperty("--bg", nextTheme.bg);
  root.style.setProperty("--panel", nextTheme.panel);
  root.style.setProperty("--panel-2", panelSoft);
  root.style.setProperty("--ink", nextTheme.ink);
  root.style.setProperty("--muted", mixColors(nextTheme.ink, nextTheme.panel, 0.42));
  root.style.setProperty("--line", line);
  root.style.setProperty("--app-background", getBackgroundCss(nextTheme));
  document.querySelector('meta[name="theme-color"]').setAttribute("content", accentStrong);
}

function render() {
  renderStats();
  boardEl.innerHTML = "";

  state.columns.forEach((column, columnIndex) => {
    const cards = state.cards
      .filter((card) => card.columnId === column.id)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const columnColor = normalizeColumnColor(column.color) || getDefaultColumnColor(column, columnIndex);

    const section = document.createElement("section");
    section.className = "column";
    section.dataset.columnId = column.id;
    section.style.setProperty("--column-color", columnColor);
    section.addEventListener("dragover", handleDragOver);
    section.addEventListener("drop", handleDrop);
    section.addEventListener("dragleave", handleDragLeave);

    const header = document.createElement("div");
    header.className = "column-header";
    header.innerHTML = `
      <div class="column-title">
        <button class="column-color-handle" type="button" aria-label="Переместить колонку ${escapeHtml(column.title)}"></button>
        <button class="column-name-button" type="button" aria-label="Переименовать ${escapeHtml(column.title)}">
          ${escapeHtml(column.title)}
        </button>
      </div>
      <div class="column-actions">
        <button class="icon-btn column-edit-btn" type="button" aria-label="Редактировать колонку ${escapeHtml(column.title)}">✎</button>
        <button class="icon-btn column-add-btn" type="button" aria-label="Добавить карточку в ${escapeHtml(column.title)}">+</button>
      </div>
    `;
    section.appendChild(header);

    const list = document.createElement("div");
    list.className = "cards";
    list.dataset.columnId = column.id;
    list.addEventListener("dragover", handleListDragOver);
    list.addEventListener("drop", handleDrop);
    if (!cards.length) {
      const empty = document.createElement("div");
      empty.className = "empty-drop";
      empty.textContent = "Перетащите карточку сюда";
      list.appendChild(empty);
    } else {
      cards.forEach((card) => list.appendChild(createCardElement(card)));
    }
    section.appendChild(list);

    const colorHandle = header.querySelector(".column-color-handle");
    colorHandle.addEventListener("pointerdown", (event) => startColumnDrag(event, column.id));
    header.querySelector(".column-name-button").addEventListener("click", () => openColumnSheet(column.id));
    header.querySelector(".column-edit-btn").addEventListener("click", () => openColumnSheet(column.id));
    header.querySelector(".column-add-btn").addEventListener("click", () => openCardSheet(null, column.id));

    boardEl.appendChild(section);
  });

  scheduleReminderChecks();
}

function createCardElement(card) {
  const button = document.createElement("button");
  button.className = "task-card";
  button.type = "button";
  button.draggable = false;
  button.dataset.cardId = card.id;
  const status = card.status || (card.focus ? "today" : "planned");
  const scheduleText = formatCardSchedule(card);
  button.classList.add(`status-${status}`);
  button.innerHTML = `
    <h3>${escapeHtml(card.title)}</h3>
    ${card.description ? `<p>${escapeHtml(card.description)}</p>` : ""}
    <div class="card-foot">
      <div class="card-badges">
        <span class="label" style="--label-color: ${escapeHtml(getLabelColor(card.label))}">${getLabelName(card.label)}</span>
        <span class="status-chip">${statusNames[status] || statusNames.planned}</span>
        ${scheduleText ? `<span class="schedule-chip">${escapeHtml(scheduleText)}</span>` : ""}
      </div>
      ${card.focus ? '<span class="focus-dot" aria-label="В фокусе"></span>' : ""}
    </div>
  `;

  button.addEventListener("click", () => {
    if (Date.now() < suppressClickUntil) {
      return;
    }
    openCardSheet(card.id);
  });
  button.addEventListener("touchstart", (event) => prepareTouchDragByTouch(event, button, card.id), { passive: true });
  button.addEventListener("pointerdown", (event) => prepareTouchDrag(event, button, card.id));
  button.addEventListener("dragstart", (event) => {
    clearTextSelection();
    event.dataTransfer.setData("text/plain", card.id);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setDragImage(button, 16, 16);
    button.classList.add("is-dragging");
    document.body.classList.add("is-card-dragging");
  });
  button.addEventListener("dragend", () => {
    button.classList.remove("is-dragging");
    document.body.classList.remove("is-card-dragging");
    clearTextSelection();
  });
  return button;
}

function getCardScheduleTime(card) {
  if (!card?.plannedDate || !card?.plannedTime) {
    return null;
  }
  const value = new Date(`${card.plannedDate}T${card.plannedTime}`).getTime();
  return Number.isFinite(value) ? value : null;
}

function formatCardSchedule(card) {
  const time = getCardScheduleTime(card);
  if (!time) {
    return "";
  }
  const date = new Date(time);
  const dateText = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
  });
  const timeText = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateText}, ${timeText}`;
}

function scheduleCardReminders() {
  reminderTimers.forEach((timer) => clearTimeout(timer));
  reminderTimers.clear();

  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  const now = Date.now();
  const maxDelay = 2147483647;
  state.cards.forEach((card) => {
    if (!card.reminderEnabled) {
      return;
    }
    const time = getCardScheduleTime(card);
    if (!time || time <= now) {
      return;
    }
    const delay = Math.min(time - now, maxDelay);
    const timer = setTimeout(() => {
      if (time - Date.now() > maxDelay) {
        scheduleCardReminders();
        return;
      }
      showCardReminder(card.id);
    }, delay);
    reminderTimers.set(card.id, timer);
  });
}

function playReminderSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    reminderAudioContext ||= new AudioContextClass();
    const context = reminderAudioContext;
    if (context.state === "suspended") context.resume?.();
    const now = context.currentTime;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
    gain.connect(context.destination);
    [0, 0.18].forEach((offset) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(offset ? 880 : 740, now + offset);
      oscillator.connect(gain);
      oscillator.start(now + offset);
      oscillator.stop(now + offset + 0.18);
    });
  } catch {}
}

async function showCardReminder(cardId) {
  const card = state.cards.find((item) => item.id === cardId);
  if (!card || !("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  playReminderSound();

  const notification = {
    body: card.description || "Запланированная карточка",
    tag: `alinexa-card-${card.id}`,
    renotify: true,
    requireInteraction: true,
    silent: true,
    timestamp: Date.now(),
    vibrate: [240, 80, 240],
    data: { url: APP_URL },
  };

  try {
    const registration = serviceWorkerReadyPromise ? await serviceWorkerReadyPromise : null;
    if (registration?.showNotification) {
      await registration.showNotification(`Alinexa: ${card.title}`, notification);
      return;
    }
  } catch {
    // If service worker is unavailable, fall back to the regular Notification API.
  }

  new Notification(`Alinexa: ${card.title}`, notification);
}

function initServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol !== "https:") {
    return;
  }

  serviceWorkerReadyPromise = navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      registration.update?.();
      return navigator.serviceWorker.ready;
    })
    .catch(() => null);
}

function isIosStandaloneRequired() {
  const isIos =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isStandalone =
    window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone === true;
  return isIos && !isStandalone;
}

async function requestReminderPermission() {
  if (!("Notification" in window)) {
    return "unsupported";
  }
  if (Notification.permission === "default") {
    return Notification.requestPermission();
  }
  return Notification.permission;
}

function urlBase64ToUint8Array(value) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const output = new Uint8Array(raw.length);
  for (let index = 0; index < raw.length; index += 1) {
    output[index] = raw.charCodeAt(index);
  }
  return output;
}

async function ensurePushSubscription() {
  const permission = await requestReminderPermission();
  if (permission !== "granted") {
    return permission;
  }

  if (!currentUser || !supabaseClient) {
    return "no-user";
  }

  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return "unsupported";
  }

  const registration = serviceWorkerReadyPromise ? await serviceWorkerReadyPromise : null;
  if (!registration?.pushManager) {
    return "unsupported";
  }

  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });
  }

  await savePushSubscription(subscription);
  return "subscribed";
}

function withTimeout(promise, timeoutMs, fallbackValue) {
  let timeoutId;
  const timeout = new Promise((resolve) => {
    timeoutId = setTimeout(() => resolve(fallbackValue), timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

async function savePushSubscription(subscription) {
  const token = await getAccessToken();
  if (!token || !currentUser || !subscription) {
    return;
  }

  const body = {
    user_id: currentUser.id,
    endpoint: subscription.endpoint,
    subscription: subscription.toJSON(),
    user_agent: navigator.userAgent,
    updated_at: new Date().toISOString(),
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${PUSH_SUBSCRIPTIONS_TABLE}?on_conflict=endpoint`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || errorBody?.msg || `Supabase ${response.status}`);
  }
}

function updateCardReminderStatus() {
  if (!cardReminderStatus) return;
  const draftCard = { plannedDate: cardDateInput.value, plannedTime: cardTimeInput.value };
  const hasSchedule = Boolean(draftCard.plannedDate && draftCard.plannedTime);
  const scheduleText = formatCardSchedule(draftCard);
  const isReminderOn = cardReminderInput.checked;
  cardReminderStatus.classList.remove("is-error", "is-success");

  if (isReminderOn && !hasSchedule) {
    cardReminderStatus.textContent = "Выберите дату и время, чтобы письмо-напоминание пришло вовремя.";
    cardReminderStatus.classList.add("is-error");
    return;
  }
  if (scheduleText && isReminderOn) {
    cardReminderStatus.textContent = `Письмо-напоминание придет на e-mail аккаунта: ${scheduleText}. Если страница открыта, сработает и браузерное уведомление со звуком.`;
    cardReminderStatus.classList.add("is-success");
    return;
  }
  if (scheduleText) {
    cardReminderStatus.textContent = `Запланировано: ${scheduleText}.`;
    cardReminderStatus.classList.add("is-success");
    return;
  }
  cardReminderStatus.textContent = "Можно указать дату, время и включить e-mail напоминание.";
}

function prepareTouchDrag(event, cardEl, cardId) {
  if (event.pointerType === "touch") {
    return;
  }

  if (event.pointerType === "mouse" && event.button !== 0) {
    return;
  }

  clearTimeout(longPressTimer);
  const rect = cardEl.getBoundingClientRect();
  pendingTouch = {
    cardId,
    cardEl,
    pointerId: event.pointerId,
    pointerType: event.pointerType,
    startX: event.clientX,
    startY: event.clientY,
    lastX: event.clientX,
    lastY: event.clientY,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    width: rect.width,
  };

  if (event.pointerType === "mouse") {
    try {
      cardEl.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is best effort on mobile browsers.
    }
  }

  if (event.pointerType !== "mouse") {
    longPressTimer = setTimeout(() => {
      if (pendingTouch?.pointerId === event.pointerId) {
        startTouchDrag();
      }
    }, TOUCH_LONG_PRESS_MS);
  }
}

function getPrimaryTouch(event) {
  return event.touches?.[0] || event.changedTouches?.[0] || null;
}

function prepareTouchDragByTouch(event, cardEl, cardId) {
  if (event.touches?.length !== 1) {
    return;
  }

  clearTimeout(longPressTimer);
  const touch = getPrimaryTouch(event);
  if (!touch) {
    return;
  }

  const rect = cardEl.getBoundingClientRect();
  pendingTouch = {
    cardId,
    cardEl,
    pointerId: touch.identifier,
    pointerType: "touch",
    startX: touch.clientX,
    startY: touch.clientY,
    lastX: touch.clientX,
    lastY: touch.clientY,
    offsetX: touch.clientX - rect.left,
    offsetY: touch.clientY - rect.top,
    width: rect.width,
  };

  longPressTimer = setTimeout(() => {
    if (pendingTouch?.pointerId === touch.identifier) {
      startTouchDrag();
    }
  }, TOUCH_LONG_PRESS_MS);
}

function moveTouchDrag(event) {
  if (event.pointerType === "touch") {
    return;
  }

  if (!touchDrag) {
    if (pendingTouch) {
      pendingTouch.lastX = event.clientX;
      pendingTouch.lastY = event.clientY;
      const deltaX = event.clientX - pendingTouch.startX;
      const deltaY = event.clientY - pendingTouch.startY;
      const distance = Math.hypot(deltaX, deltaY);
      if (pendingTouch.pointerType === "mouse" && distance > TOUCH_MOUSE_DRAG_PX) {
        startTouchDrag(event);
        moveTouchDrag(event);
        return;
      }

      const isIntentionalScroll =
        pendingTouch.pointerType !== "mouse" &&
        distance > TOUCH_SCROLL_CANCEL_PX &&
        Math.abs(deltaY) > Math.abs(deltaX) * 1.15;

      if (isIntentionalScroll) {
        clearTimeout(longPressTimer);
        pendingTouch = null;
      }
    }
    return;
  }

  event.preventDefault();
  touchDrag.clientX = event.clientX;
  touchDrag.clientY = event.clientY;

  if (!dragFrame) {
    dragFrame = requestAnimationFrame(updateTouchDrag);
  }
}

function moveTouchDragByTouch(event) {
  const touch = getPrimaryTouch(event);
  if (!touch) {
    return;
  }

  if (!touchDrag) {
    if (pendingTouch?.pointerType === "touch") {
      pendingTouch.lastX = touch.clientX;
      pendingTouch.lastY = touch.clientY;
      const deltaX = touch.clientX - pendingTouch.startX;
      const deltaY = touch.clientY - pendingTouch.startY;
      const distance = Math.hypot(deltaX, deltaY);
      const isIntentionalScroll =
        distance > TOUCH_SCROLL_CANCEL_PX &&
        (Math.abs(deltaY) > Math.abs(deltaX) * 1.15 || Math.abs(deltaX) > Math.abs(deltaY) * 1.15);

      if (isIntentionalScroll) {
        clearTimeout(longPressTimer);
        pendingTouch = null;
      }
    }
    return;
  }

  event.preventDefault();
  touchDrag.clientX = touch.clientX;
  touchDrag.clientY = touch.clientY;

  if (!dragFrame) {
    dragFrame = requestAnimationFrame(updateTouchDrag);
  }
}

function startTouchDrag(event = null) {
  if (!pendingTouch || touchDrag) {
    return;
  }

  clearTimeout(longPressTimer);
  clearTextSelection();
  const { cardEl, cardId, offsetX, offsetY, pointerId, width } = pendingTouch;
  const clientX = event?.clientX ?? pendingTouch.lastX ?? pendingTouch.startX;
  const clientY = event?.clientY ?? pendingTouch.lastY ?? pendingTouch.startY;
  touchDrag = {
    cardId,
    cardEl,
    originLeft: clientX - offsetX,
    originTop: clientY - offsetY,
    startX: clientX,
    clientX,
    clientY,
    currentList: null,
    marker: createDropMarker(cardEl),
    offsetX,
    offsetY,
    overColumnId: cardEl.closest(".column")?.dataset.columnId || null,
    overIndex: null,
    startedAt: Date.now(),
  };
  pendingTouch = null;

  try {
    cardEl.setPointerCapture(pointerId);
  } catch {
    // Some mobile browsers drop capture when the finger leaves the original target.
  }

  cardEl.classList.add("is-lifted");
  document.body.classList.add("is-card-dragging");
  document.body.style.overflow = "hidden";
  cardEl.style.width = `${width}px`;
  cardEl.style.left = `${clientX - offsetX}px`;
  cardEl.style.top = `${clientY - offsetY}px`;
  cardEl.style.transform = "translate3d(0, 0, 0) rotate(1deg) scale(1.02)";
  suppressClickUntil = Date.now() + 650;
}

function updateTouchDrag() {
  dragFrame = null;
  if (!touchDrag) {
    return;
  }

  const deltaX = touchDrag.clientX - touchDrag.offsetX - touchDrag.originLeft;
  const deltaY = touchDrag.clientY - touchDrag.offsetY - touchDrag.originTop;
  touchDrag.cardEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotate(1deg) scale(1.02)`;

  autoScrollDuringDrag(touchDrag.clientX, touchDrag.clientY);
  const target = document.elementFromPoint(touchDrag.clientX, touchDrag.clientY);
  const list = target?.closest?.(".card-list");

  if (list !== touchDrag.currentList) {
    touchDrag.currentList?.classList.remove("is-over");
    touchDrag.currentList?.closest(".column")?.classList.remove("is-drop-target");
    list?.classList.add("is-over");
    list?.closest(".column")?.classList.add("is-drop-target");
    touchDrag.currentList = list || null;
  }

  if (list) {
    touchDrag.overColumnId = list.dataset.columnId;
    touchDrag.overIndex = getDropIndex(list, touchDrag.clientY, touchDrag.cardId);
    placeDropMarker(list, touchDrag.overIndex, touchDrag.cardId, touchDrag.marker);
  }
}

function finishTouchDrag(event) {
  if (event.pointerType === "touch") {
    return;
  }

  clearTimeout(longPressTimer);
  pendingTouch = null;
  if (!touchDrag) {
    return;
  }

  event.preventDefault();
  suppressClickUntil = Date.now() + 450;
  const { cardId, overColumnId, overIndex } = touchDrag;
  cleanupTouchDrag();

  if (overColumnId) {
    moveCardToPosition(cardId, overColumnId, overIndex);
    quickColumnId = overColumnId;
    persist({ immediate: true });
    render();
    followDroppedCard(overColumnId);
  }
}

function finishTouchDragByTouch(event) {
  clearTimeout(longPressTimer);
  pendingTouch = null;
  if (!touchDrag) {
    return;
  }

  event.preventDefault();
  suppressClickUntil = Date.now() + 450;
  const { cardId, overColumnId, overIndex } = touchDrag;
  cleanupTouchDrag();

  if (overColumnId) {
    moveCardToPosition(cardId, overColumnId, overIndex);
    quickColumnId = overColumnId;
    persist({ immediate: true });
    render();
    followDroppedCard(overColumnId);
  }
}

function cancelTouchDrag() {
  clearTimeout(longPressTimer);
  pendingTouch = null;
  cleanupTouchDrag();
}

function cleanupTouchDrag() {
  if (dragFrame) {
    cancelAnimationFrame(dragFrame);
    dragFrame = null;
  }
  stopAutoScroll();
  if (!touchDrag) {
    return;
  }

  touchDrag.currentList?.classList.remove("is-over");
  touchDrag.currentList?.closest(".column")?.classList.remove("is-drop-target");
  touchDrag.marker?.remove();
  touchDrag.cardEl.classList.remove("is-lifted");
  touchDrag.cardEl.style.width = "";
  touchDrag.cardEl.style.left = "";
  touchDrag.cardEl.style.top = "";
  touchDrag.cardEl.style.transform = "";
  document.body.style.overflow = "";
  document.body.classList.remove("is-card-dragging");
  clearTextSelection();
  touchDrag = null;
}

function createDropMarker(cardEl) {
  const marker = document.createElement("div");
  marker.className = "drop-marker";
  marker.style.minHeight = `${Math.max(54, Math.round(cardEl.getBoundingClientRect().height))}px`;
  return marker;
}

function placeDropMarker(list, dropIndex, draggedCardId, marker) {
  const previousRects = getAnimatedDropRects(list, marker);
  const cards = [...list.querySelectorAll(".task-card:not(.is-dragging):not(.is-lifted)")].filter(
    (card) => card.dataset.cardId !== draggedCardId,
  );
  const safeIndex = Math.max(0, Math.min(dropIndex ?? cards.length, cards.length));
  const beforeCard = cards[safeIndex] || null;
  if (beforeCard) {
    list.insertBefore(marker, beforeCard);
  } else {
    list.append(marker);
  }
  animateDropShift(list, marker, previousRects);
}

function getAnimatedDropRects(list, marker) {
  const rects = new Map();
  [...list.querySelectorAll(".task-card:not(.is-lifted), .drop-marker")].forEach((element) => {
    const key = element === marker ? "__drop_marker__" : element.dataset.cardId;
    if (key) {
      rects.set(key, element.getBoundingClientRect());
    }
  });
  return rects;
}

function animateDropShift(list, marker, previousRects) {
  if (!previousRects?.size || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
    return;
  }

  [...list.querySelectorAll(".task-card:not(.is-lifted), .drop-marker")].forEach((element) => {
    const key = element === marker ? "__drop_marker__" : element.dataset.cardId;
    const previous = key ? previousRects.get(key) : null;
    if (!previous) {
      return;
    }

    const next = element.getBoundingClientRect();
    const deltaX = previous.left - next.left;
    const deltaY = previous.top - next.top;
    if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) {
      return;
    }

    element.style.transition = "none";
    element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    element.getBoundingClientRect();
    requestAnimationFrame(() => {
      element.style.transition = "transform 210ms cubic-bezier(0.16, 1, 0.3, 1)";
      element.style.transform = "";
      window.setTimeout(() => {
        element.style.transition = "";
      }, 220);
    });
  });
}

function autoScrollDuringDrag(clientX, clientY) {
  const boardRect = boardEl.getBoundingClientRect();
  const isCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
  const edge = isCoarsePointer ? Math.min(128, Math.max(74, boardRect.width * 0.22)) : 72;
  const maxHorizontalStep = isCoarsePointer ? 18 : 16;
  const maxVerticalStep = isCoarsePointer ? 16 : 14;
  const leftDistance = Math.max(0, clientX - boardRect.left);
  const rightDistance = Math.max(0, boardRect.right - clientX);
  let horizontal = 0;
  if (leftDistance < edge && boardEl.scrollLeft > 0) {
    horizontal = -Math.ceil(((edge - leftDistance) / edge) * maxHorizontalStep);
  } else if (rightDistance < edge && boardEl.scrollLeft + boardEl.clientWidth < boardEl.scrollWidth - 1) {
    horizontal = Math.ceil(((edge - rightDistance) / edge) * maxHorizontalStep);
  }

  const currentList = touchDrag?.overColumnId
    ? boardEl.querySelector(`.card-list[data-column-id="${CSS.escape(touchDrag.overColumnId)}"]`)
    : null;
  let vertical = 0;
  if (currentList) {
    const listRect = currentList.getBoundingClientRect();
    if (clientY < listRect.top + edge) {
      vertical = -maxVerticalStep;
    } else if (clientY > listRect.bottom - edge) {
      vertical = maxVerticalStep;
    }
  }

  if (!horizontal && !vertical) {
    stopAutoScroll();
    return;
  }

  autoScrollState = { horizontal, vertical, list: currentList };

  if (autoScrollFrame) {
    return;
  }

  const step = () => {
    if (!touchDrag) {
      stopAutoScroll();
      return;
    }

    if (autoScrollState.horizontal) {
      boardEl.scrollLeft += autoScrollState.horizontal;
      updateDropTargetFromPoint();
    }
    if (autoScrollState.vertical && autoScrollState.list) {
      autoScrollState.list.scrollTop += autoScrollState.vertical;
      updateDropTargetFromPoint();
    }
    autoScrollFrame = requestAnimationFrame(step);
  };
  autoScrollFrame = requestAnimationFrame(step);
}

function updateDropTargetFromPoint() {
  if (!touchDrag) {
    return;
  }

  const target = document.elementFromPoint(touchDrag.clientX, touchDrag.clientY);
  const list = target?.closest?.(".card-list");
  if (!list) {
    return;
  }

  if (list !== touchDrag.currentList) {
    touchDrag.currentList?.classList.remove("is-over");
    touchDrag.currentList?.closest(".column")?.classList.remove("is-drop-target");
    list.classList.add("is-over");
    list.closest(".column")?.classList.add("is-drop-target");
    touchDrag.currentList = list;
  }

  touchDrag.overColumnId = list.dataset.columnId;
  touchDrag.overIndex = getDropIndex(list, touchDrag.clientY, touchDrag.cardId);
  placeDropMarker(list, touchDrag.overIndex, touchDrag.cardId, touchDrag.marker);
}

function stopAutoScroll() {
  if (autoScrollFrame) {
    cancelAnimationFrame(autoScrollFrame);
    autoScrollFrame = null;
  }
  autoScrollState = { horizontal: 0, vertical: 0, list: null };
}


function startColumnDrag(event, columnId) {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();
  clearTextSelection();
  columnDrag = { columnId, pointerId: event.pointerId, clientX: event.clientX, hasMoved: false };
  document.body.classList.add("is-column-dragging");
  event.currentTarget.closest(".column")?.classList.add("is-column-dragging");
  try { event.currentTarget.setPointerCapture(event.pointerId); } catch {}
}

function moveColumnDrag(event) {
  if (!columnDrag || event.pointerId !== columnDrag.pointerId) return;
  event.preventDefault();
  columnDrag.clientX = event.clientX;
  columnDrag.hasMoved = true;
  if (!columnDragFrame) columnDragFrame = requestAnimationFrame(updateColumnDrag);
}

function updateColumnDrag() {
  columnDragFrame = null;
  if (!columnDrag) return;
  autoScrollColumnsDuringColumnDrag(columnDrag.clientX);
  const targetIndex = getColumnDropIndex(columnDrag.clientX);
  if (targetIndex !== -1) moveColumnToIndex(columnDrag.columnId, targetIndex);
}

function getColumnDropIndex(clientX) {
  const columns = [...boardEl.querySelectorAll(".column")];
  if (!columns.length) return -1;
  for (let index = 0; index < columns.length; index += 1) {
    const rect = columns[index].getBoundingClientRect();
    if (clientX < rect.left + rect.width / 2) return index;
  }
  return columns.length - 1;
}

function moveColumnToIndex(columnId, targetIndex) {
  const currentIndex = state.columns.findIndex((column) => column.id === columnId);
  if (currentIndex === -1) return;
  const boundedIndex = Math.max(0, Math.min(targetIndex, state.columns.length - 1));
  if (boundedIndex === currentIndex) return;
  const previousRects = new Map([...boardEl.querySelectorAll(".column")].map((element) => [element.dataset.columnId, element.getBoundingClientRect()]));
  const [column] = state.columns.splice(currentIndex, 1);
  state.columns.splice(boundedIndex, 0, column);
  render();
  boardEl.querySelector('.column[data-column-id="' + cssEscape(columnId) + '"]')?.classList.add("is-column-dragging");
  animateColumnShift(previousRects);
}

function animateColumnShift(previousRects) {
  if (!previousRects?.size || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
  [...boardEl.querySelectorAll(".column")].forEach((element) => {
    const previous = previousRects.get(element.dataset.columnId);
    if (!previous) return;
    const next = element.getBoundingClientRect();
    const deltaX = previous.left - next.left;
    if (Math.abs(deltaX) < 1) return;
    element.style.transition = "none";
    element.style.transform = "translate3d(" + deltaX + "px, 0, 0)";
    element.getBoundingClientRect();
    requestAnimationFrame(() => {
      element.style.transition = "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)";
      element.style.transform = "";
      window.setTimeout(() => { element.style.transition = ""; }, 230);
    });
  });
}

function finishColumnDrag(event) {
  if (!columnDrag || event.pointerId !== columnDrag.pointerId) return;
  event.preventDefault();
  const shouldSave = columnDrag.hasMoved;
  cleanupColumnDrag();
  if (shouldSave) persist({ immediate: true });
}

function cancelColumnDrag() {
  cleanupColumnDrag();
}

function cleanupColumnDrag() {
  if (columnDragFrame) {
    cancelAnimationFrame(columnDragFrame);
    columnDragFrame = null;
  }
  document.body.classList.remove("is-column-dragging");
  document.querySelectorAll(".column.is-column-dragging").forEach((element) => element.classList.remove("is-column-dragging"));
  columnDrag = null;
}

function autoScrollColumnsDuringColumnDrag(clientX) {
  const boardRect = boardEl.getBoundingClientRect();
  const edge = 90;
  const maxStep = 18;
  const leftDistance = Math.max(0, clientX - boardRect.left);
  const rightDistance = Math.max(0, boardRect.right - clientX);
  if (leftDistance < edge && boardEl.scrollLeft > 0) {
    boardEl.scrollLeft -= Math.ceil(((edge - leftDistance) / edge) * maxStep);
  } else if (rightDistance < edge && boardEl.scrollLeft + boardEl.clientWidth < boardEl.scrollWidth - 1) {
    boardEl.scrollLeft += Math.ceil(((edge - rightDistance) / edge) * maxStep);
  }
}

function shouldFollowDroppedCard() {
  return window.matchMedia?.("(pointer: coarse)")?.matches || window.innerWidth < 860;
}

function followDroppedCard(columnId) {
  if (!columnId || !shouldFollowDroppedCard()) {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const column = boardEl.querySelector(`.column[data-column-id="${CSS.escape(columnId)}"]`);
      if (!column) {
        return;
      }

      const boardRect = boardEl.getBoundingClientRect();
      const columnRect = column.getBoundingClientRect();
      const centeredLeft =
        boardEl.scrollLeft + columnRect.left - boardRect.left - Math.max(10, (boardRect.width - columnRect.width) / 2);
      const maxLeft = Math.max(0, boardEl.scrollWidth - boardEl.clientWidth);
      boardEl.scrollTo({
        left: Math.max(0, Math.min(centeredLeft, maxLeft)),
        behavior: "smooth",
      });
    });
  });
}

function clearTextSelection() {
  const selection = window.getSelection?.();
  if (selection && !selection.isCollapsed) {
    selection.removeAllRanges();
  }
}

function cssEscape(value) {
  if (window.CSS?.escape) {
    return window.CSS.escape(value);
  }
  return String(value).replace(/["\\]/g, "\\$&");
}

function renderColumnOptions() {
  const options = state.columns
    .map((column) => `<option value="${column.id}">${escapeHtml(column.title)}</option>`)
    .join("");
  cardColumnInput.innerHTML = options;
  voiceColumnInput.innerHTML = options;
}

function renderLabelOptions() {
  const fallbackLabel = labels[0]?.id || "product";
  const currentCardLabel = cardLabelInput.value || fallbackLabel;
  const currentVoiceLabel = voiceLabelInput.value || fallbackLabel;
  const options = labels
    .map((label) => `<option value="${label.id}">${escapeHtml(label.name)}</option>`)
    .join("");

  cardLabelInput.innerHTML = options;
  voiceLabelInput.innerHTML = options;
  cardLabelInput.value = getLabelById(currentCardLabel) ? currentCardLabel : fallbackLabel;
  voiceLabelInput.value = getLabelById(currentVoiceLabel) ? currentVoiceLabel : fallbackLabel;
}

function renderStats() {
  const doneColumn = state.columns.find((column) => column.title.toLowerCase().includes("готов"));
  totalCardsEl.textContent = state.cards.length;
  doneCardsEl.textContent = doneColumn
    ? state.cards.filter((card) => card.columnId === doneColumn.id).length
    : 0;
  focusCardsEl.textContent = state.cards.filter((card) => card.focus).length;
}

async function initAuth() {
  const arrivedFromSignupConfirmation = hasSignupConfirmationUrl();
  supabaseClient = await getSupabaseClient();
  if (!supabaseClient) {
    updateAuthUi(null);
    setAuthStatus(
      "Не удалось загрузить подключение к Supabase. Обновите страницу и попробуйте еще раз.",
      "error",
    );
    return;
  }

  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    currentSession = session || null;
    currentUser = session?.user || null;
    updateAuthUi(currentUser);
    if (event === "PASSWORD_RECOVERY") {
      isWaitingForPasswordRecovery = false;
      setAuthMode("password-reset");
      openSheet(authSheet);
      setAuthStatus("Введите\u00a0новый пароль и\u00a0повторите его.", "success");
      return;
    }
    if (event === "SIGNED_IN" && (isWaitingForPasswordRecovery || hasPasswordRecoveryUrl())) {
      isWaitingForPasswordRecovery = false;
      setAuthMode("password-reset");
      openSheet(authSheet);
      setAuthStatus("Введите\u00a0новый пароль и\u00a0повторите его.", "success");
      return;
    }
    if (currentUser && event === "SIGNED_IN") {
      await loadRemoteWorkspace({ mergeLocalData: false });
      hasLoadedRemoteWorkspace = true;
      startRemoteSync();
      if (arrivedFromSignupConfirmation || hasSignupConfirmationUrl()) {
        setAuthMode("sign-in");
        openSheet(authSheet);
        setAuthStatus("Аккаунт подтвержден. Вы уже в своем кабинете.", "success");
        clearAuthUrl();
      } else if (authMode === "sign-in" && authSheet.classList.contains("is-open")) {
        closeSheets();
      }
    }
    if (!currentUser && event === "SIGNED_OUT") {
      hasLoadedRemoteWorkspace = false;
      stopRemoteSync();
    }
  });

  const { data } = await supabaseClient.auth.getSession();
  currentSession = data.session || null;
  currentUser = data.session?.user || null;
  updateAuthUi(currentUser);
  if (currentUser) {
    await loadRemoteWorkspace({ mergeLocalData: false });
    hasLoadedRemoteWorkspace = true;
    startRemoteSync();
  }

  if (currentUser && hasPasswordRecoveryUrl()) {
    isWaitingForPasswordRecovery = false;
    setAuthMode("password-reset");
    openSheet(authSheet);
    setAuthStatus("Введите\u00a0новый пароль и\u00a0повторите его.", "success");
  } else if (currentUser && (arrivedFromSignupConfirmation || hasSignupConfirmationUrl())) {
    setAuthMode("sign-in");
    openSheet(authSheet);
    setAuthStatus("Аккаунт подтвержден. Вы уже в своем кабинете.", "success");
    clearAuthUrl();
  }
}

async function getSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }
  const hasLibrary = await ensureSupabaseLibrary();
  if (!hasLibrary || !window.supabase?.createClient) {
    return null;
  }
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

async function ensureSupabaseLibrary() {
  if (window.supabase?.createClient) {
    return true;
  }
  if (!supabaseLoadPromise) {
    supabaseLoadPromise = (async () => {
      await waitForSupabaseGlobal(1200);
      if (window.supabase?.createClient) {
        return true;
      }
      for (const src of SUPABASE_CDN_URLS) {
        const loaded = await loadExternalScript(src);
        if (loaded && window.supabase?.createClient) {
          return true;
        }
      }
      return false;
    })();
  }
  return supabaseLoadPromise;
}

function waitForSupabaseGlobal(timeoutMs = 2500) {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const tick = () => {
      if (window.supabase?.createClient || Date.now() - startedAt >= timeoutMs) {
        resolve(Boolean(window.supabase?.createClient));
        return;
      }
      window.setTimeout(tick, 50);
    };
    tick();
  });
}

function loadExternalScript(src) {
  return new Promise((resolve) => {
    const existing = [...document.scripts].find((script) => script.src === src);
    if (existing && !existing.dataset.alinexaFailed) {
      waitForSupabaseGlobal(1800).then(resolve);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(Boolean(window.supabase?.createClient));
    script.onerror = () => {
      script.dataset.alinexaFailed = "true";
      resolve(false);
    };
    document.head.append(script);
  });
}

function updateAuthUi(user) {
  const displayName = getUserDisplayName(user);
  document.body.classList.toggle("is-authenticated", Boolean(user));
  accountButton.textContent = user ? getUserInitials(user) : "IN";
  accountButton.setAttribute("aria-label", user ? `Кабинет ${displayName}` : "Войти в аккаунт");
  if (accountName) {
    accountName.hidden = !user;
    accountName.textContent = user ? displayName : "";
  }
  signOutButton.hidden = !user || authMode === "sign-up" || authMode === "password-reset";
  if (user) {
    authEmailInput.value = user.email || "";
    if (authMode !== "password-reset") {
      setAuthStatus(`Кабинет: ${displayName}. E-mail: ${user.email}.`, "success");
    }
  }
}

function getUserDisplayName(user) {
  if (!user) {
    return "пользователя";
  }
  const meta = user.user_metadata || {};
  const fullName = [meta.first_name, meta.last_name].filter(Boolean).join(" ").trim();
  return fullName || meta.full_name || meta.login || user.email || "пользователя";
}

function getUserInitials(user) {
  const meta = user?.user_metadata || {};
  const parts = [meta.first_name, meta.last_name].filter(Boolean);
  if (parts.length) {
    return parts.map((part) => part.slice(0, 1)).join("").slice(0, 2).toUpperCase();
  }
  return (meta.login || user?.email || "IN").slice(0, 2).toUpperCase();
}

async function loadRemoteWorkspace({ mergeLocalData = false } = {}) {
  if (!supabaseClient || !currentUser) {
    return;
  }

  const { data, error } = await fetchRemoteWorkspace();

  if (error) {
    setAuthStatus(`Вход выполнен, но доска не загрузилась из облака: ${error.message}`, "error");
    return;
  }

  if (!data) {
    isApplyingRemoteWorkspace = true;
    state = createPrivateEmptyBoard();
    quickColumnId = state.columns[0]?.id || "";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    isApplyingRemoteWorkspace = false;
    markLocalWorkspaceChanged();
    render();
    await saveRemoteWorkspace();
    return;
  }

  isApplyingRemoteWorkspace = true;
  const localBoard = normalizeBoard(state);
  const remoteBoard = data.board?.columns && data.board?.cards ? normalizeBoard(data.board) : null;
  const localHasContent = mergeLocalData && hasUserBoardContent(localBoard);
  const remoteHasContent = remoteBoard && hasUserBoardContent(remoteBoard);
  const shouldMerge = Boolean(
    localHasContent && remoteHasContent && remoteBoard && !areBoardsEqual(localBoard, remoteBoard),
  );
  const shouldSeedRemote = Boolean(localHasContent && remoteBoard && !remoteHasContent);
  if (remoteBoard) {
    state = shouldMerge ? mergeBoards(localBoard, remoteBoard) : shouldSeedRemote ? localBoard : remoteBoard;
    quickColumnId = state.columns[0]?.id || "";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  if (data.theme) {
    theme = normalizeTheme(data.theme);
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    applyTheme(theme);
  }
  if (Array.isArray(data.labels)) {
    labels = data.labels.map((label, index) => normalizeLabelObject(label, index)).filter(Boolean);
    if (!labels.length) {
      labels = structuredClone(defaultLabels);
    }
    localStorage.setItem(LABELS_KEY, JSON.stringify(labels));
  }
  isApplyingRemoteWorkspace = false;
  const remoteTime = Date.parse(data.updated_at || "") || 0;
  remoteWorkspaceUpdatedAt = data.updated_at || "";
  if (remoteTime) {
    localWorkspaceUpdatedAt = remoteTime;
    localStorage.setItem(LOCAL_UPDATED_KEY, String(localWorkspaceUpdatedAt));
  }
  if (!shouldMerge && !shouldSeedRemote) {
    hasUnsavedLocalChanges = false;
  }
  render();
  if (shouldMerge || shouldSeedRemote) {
    markLocalWorkspaceChanged();
    await saveRemoteWorkspace();
  }
}

async function syncRemoteWorkspace() {
  if (!supabaseClient || !currentUser) {
    return;
  }

  if (hasUnsavedLocalChanges) {
    await saveRemoteWorkspace();
    return;
  }

  const { data, error } = await fetchRemoteWorkspace("updated_at");

  if (error || !data?.updated_at || data.updated_at === remoteWorkspaceUpdatedAt) {
    return;
  }

  if (!isSavingRemoteWorkspace) {
    await loadRemoteWorkspace({ mergeLocalData: false });
  }
}

function startRemoteSync() {
  stopRemoteSync();
  remoteSyncTimer = setInterval(syncRemoteWorkspace, 1200);
}

function stopRemoteSync() {
  clearInterval(remoteSyncTimer);
  remoteSyncTimer = null;
}

function queueRemoteWorkspaceSave() {
  if (isApplyingRemoteWorkspace || !supabaseClient || !currentUser) {
    return;
  }
  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(saveRemoteWorkspace, 450);
}

async function getAccessToken() {
  if (currentSession?.access_token) {
    return currentSession.access_token;
  }
  const { data } = await supabaseClient.auth.getSession();
  currentSession = data.session || null;
  currentUser = currentSession?.user || currentUser;
  return currentSession?.access_token || "";
}

async function fetchRemoteWorkspace(select = "board,theme,labels,updated_at") {
  const token = await getAccessToken();
  if (!token || !currentUser) {
    return { data: null, error: new Error("Нет активной сессии. Войдите в аккаунт еще раз.") };
  }

  const params = new URLSearchParams({
    select,
    user_id: `eq.${currentUser.id}`,
    limit: "1",
  });
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${WORKSPACE_TABLE}?${params}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) {
      return { data: null, error: new Error(body?.message || body?.msg || `Supabase ${response.status}`) };
    }
    return { data: Array.isArray(body) ? body[0] || null : body, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function upsertRemoteWorkspace(payload) {
  const token = await getAccessToken();
  if (!token || !currentUser) {
    return { data: null, error: new Error("Нет активной сессии. Войдите в аккаунт еще раз.") };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${WORKSPACE_TABLE}?on_conflict=user_id`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) {
      return { data: null, error: new Error(body?.message || body?.msg || `Supabase ${response.status}`) };
    }
    return { data: Array.isArray(body) ? body[0] || null : body, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function saveRemoteWorkspace() {
  if (!supabaseClient || !currentUser) {
    return;
  }

  if (isSavingRemoteWorkspace) {
    hasQueuedRemoteSaveAfterCurrent = true;
    return;
  }

  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = null;
  isSavingRemoteWorkspace = true;
  try {
  const boardToSave = normalizeBoard(state);
  const themeToSave = await getRemoteSafeTheme();
  const saveStartedAt = Date.now();
  const payload = {
    user_id: currentUser.id,
    board: boardToSave,
    theme: themeToSave,
    labels,
    updated_at: new Date(saveStartedAt).toISOString(),
  };
  const { data, error } = await upsertRemoteWorkspace(payload);
  isSavingRemoteWorkspace = false;

  if (error) {
    setAuthStatus(`Доска сохранена на этом устройстве, но не ушла в облако: ${error.message}`, "error");
    return;
  }
  remoteWorkspaceUpdatedAt = data?.updated_at || payload.updated_at;
  localWorkspaceUpdatedAt = Date.parse(remoteWorkspaceUpdatedAt) || Date.now();
  localStorage.setItem(LOCAL_UPDATED_KEY, String(localWorkspaceUpdatedAt));
  hasUnsavedLocalChanges = false;
  } finally {
    isSavingRemoteWorkspace = false;
  }
  if (hasQueuedRemoteSaveAfterCurrent) {
    hasQueuedRemoteSaveAfterCurrent = false;
    await saveRemoteWorkspace();
  }
}

function openAuthSheet() {
  setAuthMode("sign-in");
  openSheet(authSheet);
  if (!currentUser) {
    focusFieldAtSheetStart(authSheet, authEmailInput);
  }
}

function openRegistrationSheet() {
  setAuthMode("sign-up");
  openSheet(authSheet);
  focusFieldAtSheetStart(authSheet, authEmailInput);
}

function handleAuthSubmit(event) {
  if (authMode === "sign-up") {
    return signUpWithEmail(event);
  }
  if (authMode === "password-reset") {
    return saveNewPassword(event);
  }
  return signInWithEmail(event);
}

function toggleAuthMode() {
  setAuthMode(authMode === "sign-in" ? "sign-up" : "sign-in");
}

function setAuthMode(mode) {
  authMode = mode;
  const isSignUp = authMode === "sign-up";
  const isPasswordReset = authMode === "password-reset";
  const isSignedIn = Boolean(currentUser) && !isSignUp && !isPasswordReset;
  authForm.classList.toggle("is-sign-up", isSignUp);
  authForm.classList.toggle("is-password-reset", isPasswordReset);
  authForm.classList.toggle("is-signed-in", isSignedIn);
  authTitle.textContent = isPasswordReset ? "Новый пароль" : isSignUp ? "Регистрация" : "Личный кабинет";
  authSheet.setAttribute("aria-label", authTitle.textContent);
  authEmailLabel.hidden = isPasswordReset;
  authEmailInput.required = !isPasswordReset;
  authNameGrid.hidden = !isSignUp;
  authFirstNameInput.required = isSignUp;
  authLastNameInput.required = isSignUp;
  authPasswordText.textContent = isPasswordReset ? "Новый пароль" : "Пароль";
  authPasswordRepeatLabel.hidden = !isSignUp && !isPasswordReset;
  authPasswordRepeatInput.required = isSignUp || isPasswordReset;
  if (!isSignUp && !isPasswordReset) {
    authPasswordRepeatInput.value = "";
  }
  authPasswordInput.autocomplete = isSignUp || isPasswordReset ? "new-password" : "current-password";
  signInButton.textContent = isPasswordReset ? "Сохранить пароль" : isSignUp ? "Зарегистрироваться" : "Войти";
  signUpButton.textContent = "Регистрация";
  signUpButton.hidden = true;
  resetPasswordButton.hidden = isSignUp || isPasswordReset || isSignedIn;
  signOutButton.hidden = !currentUser || isSignUp || isPasswordReset;
  setAuthStatus(
    isPasswordReset
      ? "Введите\u00a0новый пароль и\u00a0повторите его."
      : isSignUp
      ? "Создайте аккаунт: e-mail, имя, фамилия и\u00a0пароль дважды."
      : isSignedIn
      ? `Кабинет: ${getUserDisplayName(currentUser)}. E-mail: ${currentUser.email}.`
      : "Войдите в\u00a0аккаунт через e-mail и\u00a0пароль.",
    isSignedIn ? "success" : "",
  );
}

async function signInWithEmail(event) {
  event.preventDefault();
  if (!(await ensureAuthReady())) {
    return;
  }

  const email = authEmailInput.value.trim();
  const password = authPasswordInput.value;
  if (!validateAuthFields(email, password)) {
    return;
  }

  setAuthBusy(true);
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  setAuthBusy(false);
  if (error) {
    setAuthStatus(`Войти не получилось: ${translateAuthError(error.message)}`, "error");
    return;
  }
  authPasswordInput.value = "";
  authPasswordRepeatInput.value = "";
  setAuthStatus("Вход выполнен.", "success");
  closeSheets();
}

async function signUpWithEmail(event) {
  event?.preventDefault();
  if (!(await ensureAuthReady())) {
    return;
  }

  const email = authEmailInput.value.trim();
  const firstName = normalizeProfileValue(authFirstNameInput.value, 40);
  const lastName = normalizeProfileValue(authLastNameInput.value, 40);
  const password = authPasswordInput.value;
  const passwordRepeat = authPasswordRepeatInput.value;
  if (!validateAuthFields(email, password) || !validateRepeatedPassword(password, passwordRepeat)) {
    return;
  }
  if (!validateSignUpProfile(firstName, lastName)) {
    return;
  }

  setAuthBusy(true);
  const { data, error } = await registerWithEmail(email, password, { firstName, lastName });
  setAuthBusy(false);
  if (error) {
    setAuthStatus(`Регистрация не прошла: ${translateAuthError(error.message)}`, "error");
    return;
  }
  if (isExistingUserSignup(data)) {
    setAuthMode("sign-in");
    setAuthStatus("Такой пользователь уже создан. Войдите через e-mail и пароль или восстановите пароль.", "error");
    return;
  }
  authPasswordInput.value = "";
  authPasswordRepeatInput.value = "";
  authFirstNameInput.value = "";
  authLastNameInput.value = "";
  if (data?.session?.user) {
    currentUser = data.session.user;
    currentSession = data.session;
    updateAuthUi(currentUser);
    await loadRemoteWorkspace({ mergeLocalData: false });
    hasLoadedRemoteWorkspace = true;
    startRemoteSync();
    setAuthMode("sign-in");
    setAuthStatus("Регистрация выполнена. Вы уже в своем кабинете.", "success");
    return;
  }
  setAuthStatus("Регистрация выполнена. Подтвердите свой аккаунт по ссылке на электронной почте.", "success");
}

async function registerWithEmail(email, password, profile) {
  try {
    const result = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: APP_URL,
        data: buildUserMetadata(profile),
      },
    });
    if (!result.error || !isNetworkLikeAuthError(result.error.message)) {
      return result;
    }
  } catch (error) {
    if (!isNetworkLikeAuthError(error.message)) {
      return { error };
    }
  }

  return registerWithEmailFetch(email, password, profile);
}

async function registerWithEmailFetch(email, password, profile) {
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup?redirect_to=${encodeURIComponent(APP_URL)}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, data: buildUserMetadata(profile) }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        error: new Error(data.msg || data.message || data.error_description || data.error || `HTTP ${response.status}`),
      };
    }
    return { data, error: null };
  } catch (error) {
    return { error };
  }
}

function isExistingUserSignup(data) {
  const user = data?.user;
  if (!user) {
    return false;
  }
  return Array.isArray(user.identities) && user.identities.length === 0;
}

function buildUserMetadata({ firstName, lastName }) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  return {
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
  };
}

function normalizeProfileValue(value, maxLength) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function validateSignUpProfile(firstName, lastName) {
  if (!firstName) {
    setAuthStatus("Введите имя.", "error");
    authFirstNameInput.focus();
    return false;
  }
  if (!lastName) {
    setAuthStatus("Введите фамилию.", "error");
    authLastNameInput.focus();
    return false;
  }
  return true;
}

async function saveNewPassword(event) {
  event.preventDefault();
  if (!(await ensureAuthReady())) {
    return;
  }

  const password = authPasswordInput.value;
  const passwordRepeat = authPasswordRepeatInput.value;
  if (!validateRepeatedPassword(password, passwordRepeat) || !validateAuthFields("reset@alinexa.ru", password)) {
    return;
  }

  setAuthBusy(true);
  const hasRecoverySession = await ensurePasswordRecoverySession();
  if (!hasRecoverySession) {
    setAuthBusy(false);
    setAuthStatus(
      "Пароль не сохранен: ссылка восстановления устарела или открылась не полностью. Нажмите «Сброс пароля» еще раз и откройте новое письмо.",
      "error",
    );
    return;
  }
  const { error } = await supabaseClient.auth.updateUser({ password });
  setAuthBusy(false);
  if (error) {
    setAuthStatus(`Пароль не сохранен: ${translateAuthError(error.message)}`, "error");
    return;
  }

  authPasswordInput.value = "";
  authPasswordRepeatInput.value = "";
  clearPasswordRecoveryMarker();
  setAuthMode("sign-in");
  setAuthStatus("Пароль обновлен. Теперь можно входить с новым паролем.", "success");
}

async function ensurePasswordRecoverySession() {
  const { data } = await supabaseClient.auth.getSession();
  if (data?.session) {
    currentSession = data.session;
    currentUser = data.session.user || null;
    return true;
  }

  const recoveryParams = getRecoveryUrlParams();
  const accessToken = recoveryParams.get("access_token");
  const refreshToken = recoveryParams.get("refresh_token");
  if (accessToken && refreshToken) {
    const { data: sessionData, error } = await supabaseClient.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    if (!error && sessionData?.session) {
      currentSession = sessionData.session;
      currentUser = sessionData.session.user || null;
      return true;
    }
  }

  const code = recoveryParams.get("code");
  if (code && supabaseClient.auth.exchangeCodeForSession) {
    const { data: sessionData, error } = await supabaseClient.auth.exchangeCodeForSession(code);
    if (!error && sessionData?.session) {
      currentSession = sessionData.session;
      currentUser = sessionData.session.user || null;
      return true;
    }
  }

  return false;
}

function getRecoveryUrlParams() {
  const params = new URLSearchParams(window.location.search || "");
  const hash = (window.location.hash || "").replace(/^#/, "");
  const hashParams = new URLSearchParams(hash);
  hashParams.forEach((value, key) => params.set(key, value));
  return params;
}

function hasPasswordRecoveryUrl() {
  const value = `${window.location.hash || ""}${window.location.search || ""}`;
  const isRecoveryLink = /type=recovery|auth=recovery|recovery/i.test(value);
  const hasAuthCode = /(?:[?#&])code=/.test(value);
  return isRecoveryLink || (hasAuthCode && sessionStorage.getItem("alinexa-password-recovery") === "1");
}

function hasSignupConfirmationUrl() {
  const value = `${window.location.hash || ""}${window.location.search || ""}`;
  const params = getRecoveryUrlParams();
  if (!value || hasPasswordRecoveryUrl()) {
    return false;
  }
  return params.get("type") === "signup" || params.has("access_token") || /(?:[?#&])code=/.test(value);
}

function clearAuthUrl() {
  if (window.history?.replaceState) {
    window.history.replaceState({}, document.title, APP_URL);
  }
}

function markPasswordRecoveryRequest() {
  sessionStorage.setItem("alinexa-password-recovery", "1");
  isWaitingForPasswordRecovery = true;
}

function clearPasswordRecoveryMarker() {
  sessionStorage.removeItem("alinexa-password-recovery");
  isWaitingForPasswordRecovery = false;
}

async function sendPasswordResetEmail() {
  if (!(await ensureAuthReady())) {
    return;
  }

  const email = authEmailInput.value.trim();
  if (!email) {
    setAuthStatus("Введите e-mail для восстановления пароля.", "error");
    return;
  }

  setAuthBusy(true);
  markPasswordRecoveryRequest();
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${APP_URL}?auth=recovery`,
  });
  setAuthBusy(false);
  if (error) {
    clearPasswordRecoveryMarker();
    setAuthStatus(error.message, "error");
    return;
  }
  setAuthStatus("Письмо для восстановления пароля отправлено.", "success");
}

async function signOut(event) {
  event?.preventDefault();
  event?.stopPropagation?.();
  if (isSigningOut) {
    return;
  }
  isSigningOut = true;
  setAuthBusy(true);
  currentUser = null;
  currentSession = null;
  clearPrivateWorkspaceFromThisDevice();
  authPasswordInput.value = "";
  authPasswordRepeatInput.value = "";
  authForm.classList.remove("is-signed-in");
  updateAuthUi(null);
  setAuthMode("sign-in");
  setAuthStatus("Вы вышли из аккаунта. Доска очищена на этом устройстве.", "success");
  closeSheets();
  setAuthBusy(false);
  try {
    if (supabaseClient) {
      await Promise.race([
        supabaseClient.auth.signOut({ scope: "local" }),
        new Promise((resolve) => setTimeout(resolve, 1200)),
      ]);
    }
  } finally {
    currentUser = null;
    currentSession = null;
    clearPrivateWorkspaceFromThisDevice();
    authPasswordInput.value = "";
    authPasswordRepeatInput.value = "";
    authForm.classList.remove("is-signed-in");
    updateAuthUi(null);
    setAuthMode("sign-in");
    setAuthStatus("Вы вышли из аккаунта. Доска очищена на этом устройстве.", "success");
    closeSheets();
    setAuthBusy(false);
    isSigningOut = false;
  }
}

function clearPrivateWorkspaceFromThisDevice() {
  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = null;
  stopRemoteSync();
  hasLoadedRemoteWorkspace = false;
  remoteWorkspaceUpdatedAt = "";
  localWorkspaceUpdatedAt = 0;
  activeCardId = null;
  activeColumnId = null;
  quickColumnId = defaultBoard.columns[0]?.id || "";
  state = createPrivateEmptyBoard();
  labels = structuredClone(defaultLabels);
  theme = { ...defaultTheme };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  localStorage.setItem(LABELS_KEY, JSON.stringify(labels));
  localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  localStorage.removeItem(LOCAL_UPDATED_KEY);
  applyTheme(theme);
  render();
}

async function ensureAuthReady() {
  if (supabaseClient) {
    return true;
  }
  supabaseClient = await getSupabaseClient();
  if (supabaseClient) {
    return true;
  }
  setAuthStatus(
    "Не удалось загрузить подключение к Supabase. Обновите страницу и попробуйте еще раз.",
    "error",
  );
  return false;
}

function setAuthStatus(message, tone = "") {
  authStatus.textContent = message;
  authStatus.classList.toggle("is-success", tone === "success");
  authStatus.classList.toggle("is-error", tone === "error");
}

function validateAuthFields(email, password) {
  if (!email || !email.includes("@")) {
    setAuthStatus("Введите корректный e-mail.", "error");
    return false;
  }
  if (!password || password.length < 8) {
    setAuthStatus("Пароль должен быть минимум 8 символов.", "error");
    return false;
  }
  return true;
}

function validateRepeatedPassword(password, passwordRepeat) {
  if (!passwordRepeat) {
    setAuthStatus("Повторите пароль для регистрации.", "error");
    authPasswordRepeatInput.focus();
    return false;
  }
  if (password !== passwordRepeat) {
    setAuthStatus("Пароли не совпадают. Введите одинаковый пароль дважды.", "error");
    authPasswordRepeatInput.focus();
    return false;
  }
  return true;
}

function setAuthBusy(isBusy) {
  [signInButton, signUpButton, resetPasswordButton, signOutButton].forEach((button) => {
    button.disabled = isBusy;
  });
  if (isBusy) {
    setAuthStatus("Отправляю запрос...", "");
  }
}

function isNetworkLikeAuthError(message = "") {
  return /load failed|failed to fetch|network|abort/i.test(message);
}

function translateAuthError(message) {
  if (/429|rate limit|too many|over_email_send_rate_limit|email rate/i.test(message)) {
    return "сейчас Supabase ограничил отправку писем. Подождите немного и попробуйте еще раз, либо подключите свой SMTP для писем Alinexa.";
  }
  if (isNetworkLikeAuthError(message)) {
    return "не удалось связаться с Supabase. Обновите страницу по свежей ссылке и попробуйте еще раз. Если повторяется, вероятнее всего сработал лимит отправки писем.";
  }
  if (/already registered|already been registered|User already/i.test(message)) {
    return "этот e-mail уже зарегистрирован. Попробуйте войти или сбросить пароль.";
  }
  if (/invalid login credentials|invalid credentials|invalid_grant/i.test(message)) {
    return "неверный e-mail или пароль. Если аккаунт уже создан, проверьте пароль или нажмите «Сброс пароля».";
  }
  if (/email not confirmed|not confirmed|confirm/i.test(message)) {
    return "почта еще не подтверждена. Откройте письмо Alinexa и нажмите ссылку подтверждения.";
  }
  if (/user not found|no user/i.test(message)) {
    return "аккаунт с таким e-mail не найден. Сначала пройдите регистрацию.";
  }
  if (/invalid email/i.test(message)) {
    return "некорректный e-mail.";
  }
  if (/password/i.test(message)) {
    return "пароль не подходит требованиям. Используйте минимум 8 символов.";
  }
  return message;
}

function openCardSheet(cardId = null, columnId = quickColumnId) {
  activeCardId = cardId;
  const card = state.cards.find((item) => item.id === cardId);

  sheetTitle.textContent = card ? "Редактировать карточку" : "Новая карточка";
  sheetTitle.innerHTML = card
    ? '<span class="sheet-title-main">Ð ÐµÐ´Ð°ÐºÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ</span><span class="sheet-title-sub">ÐºÐ°Ñ€Ñ‚Ð¾Ñ‡ÐºÑƒ</span>'
    : '<span class="sheet-title-main">ÐÐ¾Ð²Ð°Ñ</span><span class="sheet-title-sub">ÐºÐ°Ñ€Ñ‚Ð¾Ñ‡ÐºÐ°</span>';
  sheetTitle.innerHTML = card
    ? '<span class="sheet-title-main">&#1056;&#1077;&#1076;&#1072;&#1082;&#1090;&#1080;&#1088;&#1086;&#1074;&#1072;&#1090;&#1100;</span><span class="sheet-title-sub">&#1082;&#1072;&#1088;&#1090;&#1086;&#1095;&#1082;&#1091;</span>'
    : '<span class="sheet-title-main">&#1053;&#1086;&#1074;&#1072;&#1103;</span><span class="sheet-title-sub">&#1082;&#1072;&#1088;&#1090;&#1086;&#1095;&#1082;&#1072;</span>';
  cardTitleInput.value = card?.title || "";
  cardDescriptionInput.value = card?.description || "";
  cardColumnInput.value = card?.columnId || columnId || state.columns[0]?.id;
  cardLabelInput.value = card?.label || labels[0]?.id || "product";
  cardFocusInput.checked = Boolean(card?.focus);
  cardStatusInput.value = card?.status || (card?.focus ? "today" : "planned");
  cardDateInput.value = card?.plannedDate || "";
  cardTimeInput.value = card?.plannedTime || "";
  cardReminderInput.checked = Boolean(card?.reminderEnabled);
  updateCardReminderStatus();
  deleteCardButton.hidden = !card;
  openSheet(cardSheet);
  focusFieldAtSheetStart(cardSheet, cardTitleInput);
}

function openColumnSheet(columnId = null) {
  activeColumnId = columnId;
  const column = state.columns.find((item) => item.id === columnId);
  columnSheetTitle.textContent = column ? "Редактировать колонку" : "Новая колонка";
  columnTitleInput.value = column?.title || "";
  deleteColumnButton.hidden = !column;
  deleteColumnButton.disabled = false;
  deleteColumnButton.textContent = "Удалить";
  saveColumnButton.textContent = column ? "Сохранить" : "Добавить колонку";
  openSheet(columnSheet);
  focusFieldAtSheetStart(columnSheet, columnTitleInput);
}

function openSearchSheet() {
  searchInput.value = "";
  renderSearch();
  openSheet(searchSheet);
  focusFieldAtSheetStart(searchSheet, searchInput);
}

function openThemeSheet() {
  renderBackgroundChoices();
  syncThemeInputs(theme);
  markSelectedPreset();
  openSheet(themeSheet);
}

function openLabelsSheet() {
  renderLabelsEditor();
  newLabelInput.value = "";
  openSheet(labelsSheet);
  newLabelInput.focus();
}

function openVoiceSheet() {
  renderColumnOptions();
  voiceColumnInput.value = quickColumnId || state.columns[0]?.id;
  voiceLabelInput.value = labels[0]?.id || "product";
  voiceFocusInput.checked = true;
  voiceStatusInput.value = "today";
  setVoiceState("Готов к диктовке", "Нажмите кнопку и говорите. Текст попадет в карточку.");
  openSheet(voiceSheet);
  if (!window.matchMedia?.("(pointer: coarse)")?.matches && window.innerWidth >= 860) {
    focusFieldAtSheetStart(voiceSheet, voiceTextInput);
  }
}

function openSheet(sheet) {
  document.querySelectorAll(".sheet").forEach((item) => {
    item.classList.remove("is-open");
    item.setAttribute("aria-hidden", "true");
  });
  scrimEl.hidden = false;
  sheet.scrollTop = 0;
  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");
}

function updateVisualViewportHeight() {
  const height = window.visualViewport?.height || window.innerHeight;
  document.documentElement.style.setProperty("--visual-viewport-height", `${height}px`);
}

function focusFieldAtSheetStart(sheet, field) {
  sheet.scrollTop = 0;
  requestAnimationFrame(() => {
    sheet.scrollTop = 0;
    field.focus({ preventScroll: true });
    keepFieldVisibleInSheet(sheet, field);
    setTimeout(() => keepFieldVisibleInSheet(sheet, field), 280);
  });
}

function keepFieldVisibleInSheet(sheet, field) {
  const sheetRect = sheet.getBoundingClientRect();
  const fieldRect = field.getBoundingClientRect();
  if (fieldRect.top - sheetRect.top < 86 || fieldRect.bottom > sheetRect.bottom - 18) {
    field.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function closeSheets() {
  stopRecognition();
  document.querySelectorAll(".sheet").forEach((item) => {
    item.classList.remove("is-open");
    item.setAttribute("aria-hidden", "true");
  });
  scrimEl.hidden = true;
  activeCardId = null;
  activeColumnId = null;
}

async function saveCard(event) {
  event.preventDefault();
  const reminderEnabled = cardReminderInput.checked;
  const changedAt = Date.now();
  const payload = {
    title: cardTitleInput.value.trim(),
    description: cardDescriptionInput.value.trim(),
    columnId: cardColumnInput.value,
    label: cardLabelInput.value,
    focus: cardFocusInput.checked,
    status: cardStatusInput.value,
    plannedDate: cardDateInput.value,
    plannedTime: cardTimeInput.value,
    reminderEnabled,
    updatedAt: changedAt,
  };

  if (!payload.title) {
    return;
  }

  if (reminderEnabled && (!payload.plannedDate || !payload.plannedTime)) {
    cardReminderStatus.textContent = "Выберите дату и время, чтобы включить e-mail напоминание.";
    cardReminderStatus.classList.add("is-error");
    return;
  }

  if (reminderEnabled) {
    requestReminderPermission().catch(() => "failed");
  }

  if (activeCardId) {
    const previousCard = state.cards.find((card) => card.id === activeCardId);
    const movedToNewColumn = previousCard && previousCard.columnId !== payload.columnId;
    const nextOrder = movedToNewColumn ? getNextOrder(payload.columnId) : previousCard?.order;
    state.cards = state.cards.map((card) =>
      card.id === activeCardId ? { ...card, ...payload, order: nextOrder ?? card.order ?? 0 } : card,
    );
    state = normalizeBoard(state);
  } else {
    state.cards.push({
      id: crypto.randomUUID(),
      ...payload,
      order: getNextOrder(payload.columnId),
      createdAt: changedAt,
    });
  }

  quickColumnId = payload.columnId;
  const savePromise = persist({ immediate: true });
  render();
  closeSheets();
  await savePromise;
}

async function saveColumn(event) {
  event.preventDefault();
  const title = columnTitleInput.value.trim();
  if (!title) {
    return;
  }

  if (activeColumnId) {
    state.columns = state.columns.map((column) =>
      column.id === activeColumnId ? { ...column, title } : column,
    );
    const savePromise = persist({ immediate: true });
    render();
    closeSheets();
    await savePromise;
    return;
  }

  const id = `column-${crypto.randomUUID()}`;
  state.columns.push({ id, title, color: getNextColumnColor() });
  quickColumnId = id;
  const savePromise = persist({ immediate: true });
  render();
  closeSheets();
  await savePromise;
}

async function deleteActiveColumn() {
  if (!activeColumnId) {
    return;
  }

  if (state.columns.length <= 1) {
    return;
  }

  const cardsInColumn = state.cards.filter((card) => card.columnId === activeColumnId);
  if (cardsInColumn.length) {
    const wantsDelete = confirm("Удалить колонку вместе с карточками?");
    if (!wantsDelete) {
      return;
    }
    cardsInColumn.forEach((card) => markCardDeleted(card.id));
    state.cards = state.cards.filter((card) => card.columnId !== activeColumnId);
  }

  state.columns = state.columns.filter((column) => column.id !== activeColumnId);
  quickColumnId = state.columns[0]?.id || "";
  const savePromise = persist({ immediate: true });
  render();
  closeSheets();
  await savePromise;
}

async function deleteActiveCard(event) {
  event?.preventDefault();
  if (!activeCardId) {
    return;
  }
  markCardDeleted(activeCardId);
  state.cards = state.cards.filter((card) => card.id !== activeCardId);
  state = normalizeBoard(state);
  const savePromise = persist({ immediate: true });
  render();
  closeSheets();
  await savePromise;
}

async function saveVoiceCard(event) {
  event.preventDefault();
  const text = voiceTextInput.value.trim();
  if (!text) {
    setVoiceState("Текста пока нет", "Надиктуйте мысль или введите ее вручную.");
    return;
  }

  const voiceTask = splitVoiceTaskText(text);
  const createdAt = Date.now();
  state.cards.push({
    id: crypto.randomUUID(),
    columnId: voiceColumnInput.value,
    title: voiceTask.title,
    description: voiceTask.description,
    label: voiceLabelInput.value,
    focus: voiceFocusInput.checked,
    status: voiceStatusInput.value,
    order: getNextOrder(voiceColumnInput.value),
    createdAt,
    updatedAt: createdAt,
  });

  quickColumnId = voiceColumnInput.value;
  const savePromise = persist({ immediate: true });
  render();
  clearVoiceText();
  closeSheets();
  await savePromise;
}

function resetBoard() {
  const wantsReset = confirm("Сбросить доску к стартовому шаблону?");
  if (!wantsReset) {
    return;
  }
  state = normalizeBoard(defaultBoard);
  quickColumnId = state.columns[0]?.id || "";
  persist();
  render();
  closeSheets();
}

function saveTheme(event) {
  event.preventDefault();
  theme = readThemeInputs();
  applyTheme(theme);
  persistTheme({ immediate: true });
  markSelectedPreset();
  closeSheets();
}

function resetTheme() {
  previewTheme(defaultTheme);
  theme = { ...defaultTheme };
  persistTheme({ immediate: true });
  renderBackgroundChoices();
}

function previewTheme(nextTheme) {
  syncThemeInputs(nextTheme);
  theme = { ...nextTheme };
  applyTheme(theme);
  persistTheme();
  markSelectedPreset(theme);
  renderBackgroundChoices();
}

function previewThemeFromInputs() {
  theme = readThemeInputs();
  applyTheme(theme);
  persistTheme();
  markSelectedPreset(theme);
}

function syncThemeInputs(nextTheme) {
  accentColorInput.value = nextTheme.accent;
  bgColorInput.value = nextTheme.bg;
  panelColorInput.value = nextTheme.panel;
  inkColorInput.value = nextTheme.ink;
}

function readThemeInputs() {
  return {
    accent: accentColorInput.value,
    bg: bgColorInput.value,
    panel: panelColorInput.value,
    ink: inkColorInput.value,
    background: theme.background,
    customBackground: theme.customBackground,
  };
}

function markSelectedPreset(nextTheme = readThemeInputs()) {
  document.querySelectorAll("[data-preset]").forEach((button) => {
    const preset = themePresets[button.dataset.preset];
    const isSelected =
      preset.accent === nextTheme.accent &&
      preset.bg === nextTheme.bg &&
      preset.panel === nextTheme.panel &&
      preset.ink === nextTheme.ink;
    button.classList.toggle("is-selected", isSelected);
  });
}

function renderBackgroundChoices() {
  backgroundGrid.innerHTML = "";
  backgroundPresets.forEach((preset) => {
    const button = document.createElement("button");
    button.className = "background-choice";
    button.type = "button";
    button.style.setProperty("--choice-bg", preset.css);
    button.classList.toggle("is-selected", theme.background === preset.id && !theme.customBackground);
    button.setAttribute("aria-label", `Выбрать фон ${preset.id}`);
    button.addEventListener("click", () => {
      theme = { ...theme, background: preset.id, customBackground: "" };
      applyTheme(theme);
      persistTheme({ immediate: true });
      renderBackgroundChoices();
    });
    backgroundGrid.append(button);
  });
}

function uploadBackground(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  resizeImageFile(file)
    .then((dataUrl) => {
    theme = {
      ...theme,
      background: "custom",
      customBackground: dataUrl,
    };
    applyTheme(theme);
    persistTheme({ immediate: true });
    renderBackgroundChoices();
    backgroundFileInput.value = "";
    })
    .catch(() => {
      backgroundFileInput.value = "";
    });
}

function resizeImageFile(file, maxSize = 1200, quality = 0.62) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("error", reject);
    reader.addEventListener("load", () => {
      resizeDataUrl(String(reader.result || ""), maxSize, quality).then(resolve).catch(reject);
    });
    reader.readAsDataURL(file);
  });
}

function resizeDataUrl(dataUrl, maxSize = 1200, quality = 0.62) {
  return new Promise((resolve, reject) => {
    if (!dataUrl.startsWith("data:image/") || dataUrl.length < 650000) {
      resolve(dataUrl);
      return;
    }

    const image = new Image();
    image.addEventListener("error", reject);
    image.addEventListener("load", () => {
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) {
        resolve(dataUrl);
        return;
      }
      context.drawImage(image, 0, 0, width, height);
      let compressed = canvas.toDataURL("image/jpeg", quality);
      if (compressed.length > 900000 && maxSize > 720) {
        resizeDataUrl(compressed, 720, 0.56).then(resolve).catch(reject);
        return;
      }
      resolve(compressed.length < dataUrl.length ? compressed : dataUrl);
    });
    image.src = dataUrl;
  });
}

async function getRemoteSafeTheme() {
  if (!theme.customBackground || theme.customBackground.length < 650000) {
    return theme;
  }

  try {
    const compressed = await resizeDataUrl(theme.customBackground);
    if (compressed !== theme.customBackground) {
      theme = { ...theme, customBackground: compressed };
      localStorage.setItem(THEME_KEY, JSON.stringify(theme));
      applyTheme(theme);
    }
  } catch {
    theme = { ...theme, background: "mist", customBackground: "" };
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    applyTheme(theme);
  }

  return theme;
}

function saveLabels(event) {
  event.preventDefault();
  labels = readLabelsEditor();
  persistLabels();
  renderLabelOptions();
  render();
  closeSheets();
}

function resetLabels() {
  labels = structuredClone(defaultLabels);
  persistLabels();
  renderLabelsEditor();
  renderLabelOptions();
  render();
}

function renderLabelsEditor() {
  labelsList.innerHTML = "";
  labels.forEach((label) => {
    const row = document.createElement("div");
    row.className = "label-editor-row";
    row.dataset.labelId = label.id;
    row.innerHTML = `
      <input class="label-color-input" type="color" value="${escapeHtml(label.color)}" aria-label="Цвет метки ${escapeHtml(label.name)}" />
      <input class="label-name-input" type="text" maxlength="22" value="${escapeHtml(label.name)}" aria-label="Название метки" required />
      <button class="label-delete-button" type="button" aria-label="Удалить метку">×</button>
    `;
    const deleteButton = row.querySelector(".label-delete-button");
    const isUsed = state.cards.some((card) => card.label === label.id);
    deleteButton.disabled = isUsed || labels.length <= 1;
    deleteButton.title = isUsed ? "Эта метка используется в карточках" : "";
    deleteButton.addEventListener("click", () => {
      labels = labels.filter((item) => item.id !== label.id);
      renderLabelsEditor();
      renderLabelOptions();
    });
    labelsList.append(row);
  });
}

function readLabelsEditor() {
  const rows = [...labelsList.querySelectorAll(".label-editor-row")];
  const nextLabels = rows.map((row, index) => {
    const previous = labels.find((label) => label.id === row.dataset.labelId);
    return {
      id: previous?.id || `label-${crypto.randomUUID()}`,
      name: normalizeLabel(row.querySelector(".label-name-input").value, `Метка ${index + 1}`),
      color: normalizeHex(row.querySelector(".label-color-input").value, previous?.color || pickLabelColor(index)),
    };
  });
  return nextLabels.length ? nextLabels : structuredClone(defaultLabels);
}

function addLabelDraft() {
  const name = normalizeLabel(newLabelInput.value, `Метка ${labels.length + 1}`);
  labels = readLabelsEditor();
  labels.push({
    id: `label-${crypto.randomUUID()}`,
    name,
    color: pickLabelColor(labels.length),
  });
  newLabelInput.value = "";
  renderLabelsEditor();
  renderLabelOptions();
}

function getLabelName(label) {
  return getLabelById(label)?.name || label;
}

function getLabelColor(label) {
  return getLabelById(label)?.color || "#e2e8f0";
}

function getLabelById(labelId) {
  return labels.find((label) => label.id === labelId);
}

function toggleVoiceRecognition(target) {
  if (isRecording && recognitionTarget === target) {
    stopRecognition();
    return;
  }

  startRecognition(target);
}

function startRecognition(target) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    setVoiceState(
      "Диктовка недоступна",
      "Этот браузер не поддерживает распознавание речи. Можно вставить текст вручную.",
    );
    return;
  }

  stopRecognition();
  recognitionTarget = target;
  committedVoiceText =
    target === "description"
      ? [cardTitleInput.value.trim(), cardDescriptionInput.value.trim()].filter(Boolean).join(" ")
      : voiceTextInput.value.trim();
  recognition = new SpeechRecognition();
  recognition.lang = "ru-RU";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    isRecording = true;
    setRecordingUi(true, target);
    setVoiceState("Слушаю", "Говорите спокойно. Можно остановить запись этой же кнопкой.");
  };

  recognition.onresult = (event) => {
    let finalText = "";
    let interimText = "";
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const transcript = event.results[index][0].transcript.trim();
      if (event.results[index].isFinal) {
        finalText += ` ${transcript}`;
      } else {
        interimText += ` ${transcript}`;
      }
    }

    if (finalText) {
      committedVoiceText = joinVoiceText(committedVoiceText, finalText);
    }

    writeVoiceText(target, joinVoiceText(committedVoiceText, interimText));
  };

  recognition.onerror = (event) => {
    const messages = {
      "not-allowed": "Браузер не дал доступ к микрофону.",
      "no-speech": "Речь не распознана. Попробуйте сказать чуть ближе к микрофону.",
      network: "Не удалось подключить распознавание речи.",
    };
    setVoiceState("Запись остановлена", messages[event.error] || "Попробуйте начать диктовку еще раз.");
  };

  recognition.onend = () => {
    isRecording = false;
    setRecordingUi(false, target);
    recognition = null;
    recognitionTarget = null;
  };

  try {
    recognition.start();
  } catch {
    setVoiceState("Не получилось начать", "Закройте запись и попробуйте снова.");
  }
}

function stopRecognition() {
  if (recognition) {
    recognition.stop();
  }
  isRecording = false;
  setRecordingUi(false, recognitionTarget);
}

function setRecordingUi(recording, target) {
  recordVoiceButton.classList.toggle("is-recording", recording && target === "voice-card");
  recordVoiceButton.setAttribute("aria-pressed", String(recording && target === "voice-card"));
  dictateDescriptionButton.classList.toggle("is-recording", recording && target === "description");
  dictateDescriptionButton.querySelector("strong").textContent =
    recording && target === "description" ? "Остановить диктовку" : "Надиктовать задачу";
}

function writeVoiceText(target, text) {
  if (target === "description") {
    writeDictatedTaskToCardForm(text);
    return;
  }
  voiceTextInput.value = text.slice(0, voiceTextInput.maxLength || 900);
}

function joinVoiceText(base, addition) {
  return [base, addition.trim()].filter(Boolean).join(" ").replace(/\s+/g, " ").trimStart();
}

function setVoiceState(status, hint) {
  voiceStatus.textContent = status;
  voiceHint.textContent = hint;
}

function clearVoiceText() {
  voiceTextInput.value = "";
  committedVoiceText = "";
  setVoiceState("Готов к диктовке", "Нажмите кнопку и говорите. Текст попадет в карточку.");
}

function createTitleFromVoice(text) {
  return splitVoiceTaskText(text).title;
}

function splitVoiceTaskText(text) {
  const cleanText = text.replace(/\s+/g, " ").trim();
  if (!cleanText) {
    return { title: "", description: "" };
  }

  const titleLimit = 80;
  const descriptionLimit = Number(cardDescriptionInput?.maxLength) || 260;
  if (cleanText.length <= titleLimit) {
    return { title: cleanText, description: "" };
  }

  const words = cleanText.split(" ");
  const titleWords = [];
  let titleLength = 0;

  for (const word of words) {
    const nextLength = titleLength + word.length + (titleWords.length ? 1 : 0);
    if (titleWords.length >= 10 || nextLength > titleLimit) {
      break;
    }
    titleWords.push(word);
    titleLength = nextLength;
  }

  const title = titleWords.join(" ") || cleanText.slice(0, titleLimit).trim();
  const description = cleanText.slice(title.length).trim();

  return {
    title,
    description: description.slice(0, descriptionLimit),
  };
}

function writeDictatedTaskToCardForm(text) {
  const task = splitVoiceTaskText(text);
  cardTitleInput.value = task.title.slice(0, cardTitleInput.maxLength || 80);
  cardDescriptionInput.value = task.description.slice(0, cardDescriptionInput.maxLength || 260);
}

function renderSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const matches = state.cards.filter((card) => {
    const column = state.columns.find((item) => item.id === card.columnId);
    const haystack = `${card.title} ${card.description} ${getLabelName(card.label)} ${column?.title || ""}`;
    return haystack.toLowerCase().includes(query);
  });

  searchResults.innerHTML = "";
  if (!query) {
    searchResults.innerHTML = '<div class="empty-state">Начните вводить текст</div>';
    return;
  }

  if (matches.length === 0) {
    searchResults.innerHTML = '<div class="empty-state">Ничего не найдено</div>';
    return;
  }

  matches.forEach((card) => {
    const column = state.columns.find((item) => item.id === card.columnId);
    const result = document.createElement("button");
    result.className = "search-result";
    result.type = "button";
    result.innerHTML = `
      <strong>${escapeHtml(card.title)}</strong>
      <span>${escapeHtml(column?.title || "Без колонки")} · ${escapeHtml(getLabelName(card.label))}</span>
    `;
    result.addEventListener("click", () => openCardSheet(card.id));
    searchResults.append(result);
  });
}

function onDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add("is-over");
}

function onDragLeave(event) {
  event.currentTarget.classList.remove("is-over");
}

function onDrop(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData("text/plain");
  const columnId = event.currentTarget.dataset.columnId;
  const dropIndex = getDropIndex(event.currentTarget, event.clientY, cardId);
  event.currentTarget.classList.remove("is-over");

  moveCardToPosition(cardId, columnId, dropIndex);
  quickColumnId = columnId;
  persist({ immediate: true });
  render();
}

function moveCardToPosition(cardId, columnId, dropIndex) {
  const movingCard = state.cards.find((card) => card.id === cardId);
  if (!movingCard) {
    return;
  }

  const changedAt = Date.now();
  const sourceColumnId = movingCard.columnId;
  const otherCards = state.cards.filter((card) => card.id !== cardId);
  const targetCards = otherCards.filter((card) => card.columnId === columnId).sort(sortCards);
  const safeIndex = Math.max(0, Math.min(dropIndex ?? targetCards.length, targetCards.length));
  const movedCard = { ...movingCard, columnId, updatedAt: changedAt };
  targetCards.splice(safeIndex, 0, movedCard);

  const reorderedTargetCards = targetCards.map((card, index) => ({ ...card, order: index, updatedAt: changedAt }));
  const targetIds = new Set(reorderedTargetCards.map((card) => card.id));
  state.cards = otherCards
    .filter((card) => !targetIds.has(card.id))
    .concat(reorderedTargetCards);
  state = normalizeBoard(state);
  const affectedColumns = new Set([sourceColumnId, columnId]);
  state.cards = state.cards.map((card) =>
    affectedColumns.has(card.columnId) ? { ...card, updatedAt: changedAt } : card,
  );
}

function getDropIndex(list, clientY, draggedCardId) {
  const cards = [...list.querySelectorAll(".task-card:not(.is-dragging):not(.is-lifted)")].filter(
    (card) => card.dataset.cardId !== draggedCardId,
  );

  const afterCard = cards.find((card) => {
    const rect = card.getBoundingClientRect();
    return clientY < rect.top + rect.height / 2;
  });

  return afterCard ? cards.indexOf(afterCard) : cards.length;
}

function getNextOrder(columnId) {
  return state.cards.filter((card) => card.columnId === columnId).length;
}

function sortCards(a, b) {
  const orderA = Number.isFinite(a.order) ? a.order : Number.MAX_SAFE_INTEGER;
  const orderB = Number.isFinite(b.order) ? b.order : Number.MAX_SAFE_INTEGER;
  return orderA - orderB || (a.createdAt || 0) - (b.createdAt || 0);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeHex(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;
}

function normalizeBackgroundId(value, fallback) {
  if (value === "custom") {
    return value;
  }
  return backgroundPresets.some((preset) => preset.id === value) ? value : fallback;
}

function getBackgroundCss(nextTheme) {
  if (nextTheme.customBackground) {
    return `linear-gradient(rgba(248, 250, 252, 0.72), rgba(248, 250, 252, 0.78)), url("${nextTheme.customBackground}")`;
  }

  const preset = backgroundPresets.find((item) => item.id === nextTheme.background) || backgroundPresets[0];
  return preset.css;
}

function normalizeLabel(value, fallback) {
  const label = String(value || "").trim();
  return label ? label.slice(0, 22) : fallback;
}

function normalizeLabelObject(label, index) {
  if (!label || typeof label !== "object") {
    return null;
  }

  const id = String(label.id || `label-${index}`).trim();
  return {
    id,
    name: normalizeLabel(label.name, `Метка ${index + 1}`),
    color: normalizeHex(label.color, pickLabelColor(index)),
  };
}

function pickLabelColor(index) {
  const colors = ["#bae6fd", "#ddd6fe", "#bbf7d0", "#fed7aa", "#fecdd3", "#fde68a", "#c7d2fe", "#a7f3d0"];
  return colors[index % colors.length];
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixColors(fromHex, toHex, amount) {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);
  return rgbToHex({
    r: from.r + (to.r - from.r) * amount,
    g: from.g + (to.g - from.g) * amount,
    b: from.b + (to.b - from.b) * amount,
  });
}

function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
