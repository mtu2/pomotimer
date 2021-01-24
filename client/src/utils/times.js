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
  const minutesString = minutes < 10 ? "0" + minutes : minutes;

  return hours > 12
    ? `${hours - 12}:${minutesString}pm`
    : `${hours}:${minutesString}am`;
}

// Enty Modal Functions
export function getMinutesFromSeconds(seconds) {
  // e.g. 130 -> 2
  return Math.floor(seconds / 60);
}
export function getSecondsMinusMinutes(seconds) {
  // e.g. 130 -> 10
  return seconds - getMinutesFromSeconds(seconds) * 60;
}
export function formatDateToDayMonthYear(date) {
  // e.g. Date object --> 01/10/2021
  const dateObj = new Date(date);
  const months = dateObj.getMonth() + 1;
  const monthsString = months < 10 ? "0" + months : months;

  return `${dateObj.getDate()}/${monthsString}/${dateObj.getFullYear()}`;
}
export function formatDateToHourMinSec(date) {
  // e.g. Date object --> 13:54:23
  // e.g. Date object --> 02:03:30
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const hoursString = hours < 10 ? "0" + hours : hours;
  const minutesString = minutes < 10 ? "0" + minutes : minutes;
  const secondsString = seconds < 10 ? "0" + seconds : seconds.toString();

  return `${hoursString}:${minutesString}:${secondsString}`;
}
export function calcDate(hms, date, errorDate = new Date()) {
  // e.g. "01:20:30", "20/1/2021"
  try {
    const dateObj = new Date();
    const hmsArr = hms.split(":");
    const dateArr = date.split("/");

    if (
      hmsArr[0] < 0 ||
      23 < hmsArr[0] ||
      hmsArr[1] < 0 ||
      59 < hmsArr[1] ||
      hmsArr[2] < 0 ||
      59 < hmsArr[2] ||
      dateArr[0] < 1 ||
      31 < dateArr[0] ||
      dateArr[1] < 1 ||
      12 < dateArr[1] ||
      dateArr[2] < 2010 ||
      2030 < dateArr[2]
    ) {
      throw new Error("Input not valid");
    }

    dateObj.setFullYear(dateArr[2]);
    dateObj.setMonth(dateArr[1] - 1);
    dateObj.setDate(dateArr[0]);

    dateObj.setSeconds(hmsArr[2]);
    dateObj.setMinutes(hmsArr[1]);
    dateObj.setHours(hmsArr[0]);

    return dateObj;
  } catch (err) {
    return errorDate;
  }
}
