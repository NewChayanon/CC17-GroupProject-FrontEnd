export function getDayOfWeek(dateString) {
  // Split the date string into components
  const [day, month, year] = dateString.split("/").map(Number);

  // Create a Date object (note: month is zero-based in JavaScript Date)
  const date = new Date(year, month - 1, day);

  // Array of day names
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Get the day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayIndex = date.getDay();

  // Return the corresponding day name
  return dayNames[dayIndex];
}
