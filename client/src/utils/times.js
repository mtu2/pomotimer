export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const MONTHS_SHORT = [
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

export function formatSecToMinSec(seconds) {
  // e.g 130secs --> 2:10
  // e.g.20secs --> 20
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  const minutesString = minutes > 0 ? minutes + ":" : "";
  const secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
  return minutesString + secondsString;
}

export function formatSecToMinSec2(seconds) {
  // e.g 130secs --> 2:10
  // e.g.20secs --> 0:20
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  const minutesString = minutes + ":";
  const secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
  return minutesString + secondsString;
}

export function formatSecToHourMin(seconds) {
  // e.g 150min --> 2h 30m
  // e.g. 20min --> 0h 20m
  const hours = Math.floor(seconds / 3600);
  seconds = seconds - hours * 3600;
  const minutes = Math.floor(seconds / 60);

  const hoursString = `${hours}h `;
  const minutesString = `${minutes < 10 ? "0" + minutes : minutes.toString()}m`;
  return hoursString + minutesString;
}

export function formatDateToDayMonth(date) {
  // e.g. Date object --> Sun, 10 Jan
  const dateObj = new Date(date);
  const currentDateObj = new Date();

  if (
    dateObj.getDate() === currentDateObj.getDate() &&
    dateObj.getMonth() === currentDateObj.getMonth() &&
    dateObj.getFullYear() === currentDateObj.getFullYear()
  )
    return "Today";

  return `${DAYS_SHORT[dateObj.getDay()]}, ${dateObj.getDate()} ${
    MONTHS_SHORT[dateObj.getMonth()]
  }`;
}

export function formatDateToHourMin(date) {
  // e.g. Date object --> 1:54pm
  // e.g. Date object --> 10:30am
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const minutesAdj = minutes < 10 ? "0" + minutes : minutes.toString();

  return hours > 12
    ? `${hours - 12}:${minutesAdj}pm`
    : `${hours}:${minutesAdj}am`;
}
