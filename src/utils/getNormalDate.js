export default function getNormalDate(date) {
  const dateObj = new Date(date);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDateStr = dateObj
    .toLocaleDateString("en-US", options)
    .replace(/(\d)(st|nd|rd|th)/, "$1")
    .replace(",", "");
  return formattedDateStr;
}
