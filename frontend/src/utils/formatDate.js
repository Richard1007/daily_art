export function getFormattedDate() {
    const now = new Date();
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formatted = now.toLocaleDateString("en-US", options);
  
    const day = now.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
  
    return formatted.replace(String(day), `${day}${suffix}`);
  }
  