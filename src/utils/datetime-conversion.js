export function getDayOfWeek(dateString) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Array of days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the day of the week as a number (0-6)
  const dayIndex = date.getUTCDay(); // Use getUTCDay to ensure the correct day in UTC time
  console.log("this function is running");
  // Return the corresponding day of the week
  return daysOfWeek[dayIndex];
}

export function getMonthName(dateString) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Array of month names
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Get the month as a number (0-11)
  const monthIndex = date.getUTCMonth(); // Use getUTCMonth to ensure the correct month in UTC time

  // Return the corresponding month name
  return months[monthIndex];
}
export function getDateFromDateString(dateString) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Get the date of the month (1-31)
  const day = date.getUTCDate(); // Use getUTCDate to ensure the correct day in UTC time

  // Format the date as a two-digit string
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return formattedDay;
}

export function formatDateString(dateString) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Get the date of the month (1-31)
  const day = date.getUTCDate();
  // Get the month name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];

  // Get the full year
  const year = date.getUTCFullYear();

  // Format the date as a two-digit string
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  // Combine the parts into the desired format
  return `${formattedDay} ${month} ${year}`;
}

export function formatDateTime(input) {
  const inputDate = new Date(input);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Function to get the start of the week (Sunday) for a given date
  function getStartOfWeek(date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    start.setDate(date.getDate() - date.getDay());
    return start;
  }

  // Check if input date is today's date
  if (inputDate.toDateString() === today.toDateString()) {
    return inputDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Check if input date is yesterday's date
  if (inputDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // Check if input date is within this week
  const startOfWeek = getStartOfWeek(today);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  if (inputDate >= startOfWeek && inputDate <= endOfWeek) {
    return inputDate.toLocaleDateString("en-US", { weekday: "long" });
  }

  // If input date is older than this week
  return inputDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
