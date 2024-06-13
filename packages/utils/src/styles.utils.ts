// colors with some colors remove to avoid some light colors to appear
export const colors = {
  darkBloobirds: '#0077b5',
  bloobirds: '#1991ff',
  lightBloobirds: '#cde2f6',
  darkGray: '#484848',
  gray: '#b8b8b8',
  peanut: '#464f57',
  softPeanut: '#94a5ba',
  banana: '#ffbd19',
  softBanana: '#ffd166',
  melon: '#63ba00',
  softMelon: '#b4de85',
  grape: '#42da9c',
  softGrape: '#81ecc0',
  tangerine: '#ff8433',
  softTangerine: '#ffa366',
  seagreen: '#50ecac',
  tomato: '#f5245b',
  softTomato: '#ff6685',
  condition: '#8e8e8e',
  softCondition: '#b3b3b3',
  extraDarkBackground: '#606871',
  extraMeeting: '#F53158',
  extraCall: '#63BA00',
};

export const softColors = {
  softBanana: '#ffd166',
  softBloobirds: '#43a3fd',
  softGrape: '#81ecc0',
  softMelon: '#b4de85',
  softPeanut: '#94a5ba',
  softPurple: '#5b67ea',
  softTangerine: '#ffa366',
  softTomato: '#ff6685',
};

export const randomizeColor = () => {
  const pantones = Object.values(colors);
  return pantones[Math.floor(Math.random() * Object.keys(colors).length)];
};

export const randomizeColorName = () => {
  const pantones = Object.keys(colors);
  return pantones[Math.floor(Math.random() * Object.keys(colors).length)];
};

export const randomizeColorNameN = (n: number) => {
  const pantones = Object.keys(colors);
  return pantones[Math.floor((Math.random() * Object.keys(colors).length) % n)];
};

export const getColorByIndex = (index: number) => {
  const pantones = Object.values(colors);
  return pantones[index % pantones.length];
};

export const isSizeNumber = size => size && !isNaN(size);
