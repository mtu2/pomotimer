export function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  let minutesString = minutes > 0 ? minutes + ":" : "";
  let secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
  return minutesString + secondsString;
}
