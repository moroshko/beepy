const dayFormatter = new Intl.DateTimeFormat("en-US", { day: "numeric" });
const shortMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
});
const yearFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);

  return `${dayFormatter.format(date)} ${shortMonthFormatter.format(
    date
  )} ${yearFormatter.format(date)}, ${timeFormatter.format(date)}`;
};
