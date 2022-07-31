export function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
  return formatter.format(date);
}
