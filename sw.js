// KT service worker: shows message notifications on Android and handles taps on them.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

// Pass-through fetch handler (keeps older Chrome versions happy about installability).
self.addEventListener("fetch", () => {});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const c of list){
        if ("focus" in c) return c.focus();
      }
      return self.clients.openWindow(self.registration.scope);
    })
  );
});
