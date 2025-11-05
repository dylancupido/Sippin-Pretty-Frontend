const STORAGE_KEY = "app_notifications";

export const getNotifications = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addNotification = (message) => {
  const newNotification = {
    id: Date.now(),
    message,
  };
  const existing = getNotifications();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...existing, newNotification])
  );
};

export const removeNotification = (id) => {
  const existing = getNotifications();
  const updated = existing.filter((n) => n.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
