/**
 * General Dictionary / Object (key - value) type
 *
 * @template T - Type of the value
 */
export type Dictionary<T> = { [key: string]: T };

/**
 * String indexed Matrix type
 */
export type Matrix<T> = { [key: string]: { [key: string]: T } };

/**
 * String Dictionary / Object (key - value) type
 */
export type StrDict = Dictionary<string>;

export type IndexedMap<Keys, Type> = {
  [P in keyof Keys]: Type;
};
