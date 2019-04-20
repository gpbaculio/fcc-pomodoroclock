export const getTotalSeconds = (mins: number) => mins * 60;
export const secondsToTime = (seconds: number) => {
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const minute = m >= 0 && m < 10 ? `0${m}` : `${m}`;
  const second = s >= 0 && s < 10 ? `0${s}` : `${s}`;

  return `${minute}:${second}`;
};
