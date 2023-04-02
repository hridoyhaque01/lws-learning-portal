export default function getLocalDate(date) {
  const dateStr = date;
  const dateObj = new Date(dateStr);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const formattedDateStr = dateObj.toLocaleDateString("en-US", options);
  return formattedDateStr;
}
