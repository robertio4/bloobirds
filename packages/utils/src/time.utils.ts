export const segToTime = (duration, format = 'hh:mm:ss') => {
  if (!duration) {
    throw new Error('duration parameter is required');
  }

  if (duration > 86400) {
    throw new Error('duration should be less than one day');
  }
  let formatedTime;
  let seconds: string | number = Math.floor(duration % 60);
  let minutes: string | number = Math.floor((duration / 60) % 60);
  let hours: string | number = Math.floor((duration / (60 * 60)) % 24);

  if (format === 'hh:mm:ss') {
    hours = hours < 10 && hours > 0 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    formatedTime = hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  } else if (format === 'hhh mmm sss') {
    const hoursText = hours > 0 ? `${hours}h` : '';
    const minutesText = minutes > 0 ? `${minutes}m` : '';
    const secondsText = seconds > 0 ? `${seconds}s` : '';

    if (hoursText) {
      formatedTime = hoursText;
    }

    if (formatedTime && minutesText) {
      formatedTime = `${formatedTime} ${minutesText}`;
    } else if (minutesText) {
      formatedTime = minutesText;
    }

    if (formatedTime && secondsText) {
      formatedTime = `${formatedTime} ${secondsText}`;
    } else if (secondsText) {
      formatedTime = secondsText;
    }
  }

  return formatedTime;
};
