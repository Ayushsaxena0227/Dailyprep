export function getUserId() {
  let stored = localStorage.getItem("userEmailOrId");
  if (stored) return stored;
  const guestId = `guest-${Math.random().toString(36).substring(2, 10)}`;
  localStorage.setItem("userEmailOrId", guestId);
  return guestId;
}
