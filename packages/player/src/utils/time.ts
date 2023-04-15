/**
 * convert time into hh:mm:ss
 */
export function formatTimeHms(time: number) {
  if (isNaN(time)) {
    return "--:--:--";
  }

  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

/**
 * convert time into hh:mm:ss
 */
export function formatTimeMs(time: number) {
  if (isNaN(time)) {
    return "--:--";
  }

  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function formatTime2(time1: number, time2: number) {
  if (isNaN(time1) || isNaN(time2) || time2 < 3600) {
    return `${formatTimeMs(time1)}/${formatTimeMs(time2)}`;
  } else {
    return `${formatTimeHms(time1)}/${formatTimeHms(time2)}`;
  }
}
