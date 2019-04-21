export const getTotalSeconds = (mins: number) => mins * 60;
export const secondsToTime = (time: number) => {
  let minutes: any = Math.floor(time / 60);
  let seconds: any = time - minutes * 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return minutes + ':' + seconds;
};
