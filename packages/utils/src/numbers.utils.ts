export function toHoursAndMinutes(totalMinutes: number) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours > 0 ? hours + 'hr ' : ''}${minutes > 0 ? minutes + 'min' : ''}`;
}

export function getHoursMinutesSeconds(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSecondsAfterHours = totalSeconds % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const seconds = remainingSecondsAfterHours % 60;

  return { hours, minutes, seconds };
}

export function parseCurrency(amount) {
  return new Intl.NumberFormat(navigator?.language || 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount as number);
}
