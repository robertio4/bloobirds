import format from 'date-fns/format';

export const formatDateAsText = (text: any, patternFormat = 'MMMM do, yyyy') =>
  text ? format(new Date(text), patternFormat) : 'never';
