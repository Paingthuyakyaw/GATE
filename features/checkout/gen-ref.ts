export function genRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  return (
    "GATE-" +
    Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join(
        "",
      ),
    ).join("-")
  );
}
