/**
 * Flat map an array of object by key.
 */
export const flatMapByKey = (arr, key) => arr.flatMap(item => item[key] ?? []);

export const checkEmptyText = ({
  type,
  children,
}: {
  type: string;
  children: { [text: string]: string }[];
}) => {
  if (type === 'p') {
    return children[0].text.trim() === '';
  }
  return false;
};
