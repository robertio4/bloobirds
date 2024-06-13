import { assign, isUndefined, pickBy } from 'lodash';

export const sliceObject = (object: { [key: string]: any }, start: number, end: number) => {
  const objectKeys = Object.keys(object);
  const keys = objectKeys.splice(start, end);

  return keys.map(key => object[key]);
};

export const mergeRemovingUndefined = (...values: { [key: string]: any }[]) => {
  const undefinedKeys = values.flatMap(obj =>
    Object.keys(obj).filter(key => isUndefined(obj[key])),
  );

  return pickBy(assign({}, ...values), (value, key) => !undefinedKeys.includes(key));
};

export const isObject = (obj: any) =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);
export const isEmptyObject = (obj: { [key: string]: any } = {}) => Object.keys(obj).length === 0;

export const isEqual = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) => {
  if (isObject(obj1) && isObject(obj2)) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  return false;
};

const mergeTwoObjectsRecursive = (
  a: { [key: string]: any },
  b: { [key: string]: any },
): { [key: string]: any } => {
  const result: { [key: string]: any } = {};
  for (const key in a) {
    if (isObject(a[key]) && isObject(b[key])) {
      result[key] = mergeTwoObjectsRecursive(a[key], b[key]);
    }
  }
  return { ...a, ...b, ...result };
};

export const mergeTwoObjects = (
  a: { [key: string]: any },
  b: { [key: string]: any },
): { [key: string]: any } => {
  if (isObject(a) && isObject(b)) {
    return mergeTwoObjectsRecursive(a, b);
  } else if (isObject(a)) {
    return a;
  } else if (isObject(b)) {
    return b;
  } else return undefined;
};

export const haveSameContentArrays = (a: any[], b: any[], sameOrder = true): boolean => {
  if (a === b) {
    return true;
  }
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  if (sameOrder) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
  } else {
    for (let i = 0; i < a.length; i++) {
      if (!a.includes(b[i]) || !b.includes(a[i])) {
        return false;
      }
    }
  }
  return true;
};
