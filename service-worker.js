self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = {};

  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = {
      body: event.data ? event.data.text() : "",
    };
  }

  const title = payload.title || "Alinexa";
  const options = {
    body: payload.body || "Напоминание по задаче",
    tag: payload.tag || "alinexa-reminder",
    renotify: true,
    requireInteraction: true,
    silent: false,
    timestamp: Date.now(),
    vibrate: [240, 80, 240],
    data: {
      url: payload.url || "/",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const opened = clients.find((client) => client.url.includes(self.location.origin));
      if (opened) {
        opened.focus();
        opened.navigate(url);
        return;
      }
      return self.clients.openWindow(url);
    }),
  );
});
