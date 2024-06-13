export const getLocationFromTimeZone = timezone =>
  timezone?.slice(12)?.toString().replace(/\s/g, '_');
