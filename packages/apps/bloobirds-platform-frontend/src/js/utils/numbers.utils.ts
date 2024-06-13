export function toHoursAndMinutes(totalMinutes: number) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours > 0 ? hours + 'hr ' : ''}${minutes > 0 ? minutes + 'min' : ''}`;
}
