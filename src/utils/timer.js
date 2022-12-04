export const millisecondsToHuman = ms => {
  let seconds = ms / 1000;
  let hours = parseInt(seconds / 3600);
  hours = String(hours).length <= 1 ? `0${hours}` : hours;
  seconds = seconds % 3600;
  let minutes = parseInt(seconds / 60);
  minutes = String(minutes).length <= 1 ? `0${minutes}` : minutes;
  seconds = Math.floor(seconds % 60);
  seconds = String(seconds).length <= 1 ? `0${seconds}` : seconds;
  return `${hours}:${minutes}:${seconds}`;
};

export const humanToMilliSeconds = event => {
  let daate = new Date(event.nativeEvent.timestamp);
  let result = daate.getHours();
  let min = daate.getMinutes();
  let sec = 0;
  let milli = (sec + 60 * min + 3600 * result) * 1000;
  return milli;
};
