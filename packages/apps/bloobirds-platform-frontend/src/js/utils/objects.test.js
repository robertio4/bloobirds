import {
  sliceObject,
  mergeRemovingUndefined,
  haveSameContentArrays,
  mergeTwoObjects,
} from './objects.utils';

describe('sliceObject', () => {
  test('slices a key-value map starting at the start position index and ending at start + end - 1 position index', () => {
    const object = { test1: 'this', test2: 'is', test3: 'Sparta!', test4: '!!' };
    expect(sliceObject(object, 0, 4)).toStrictEqual(['this', 'is', 'Sparta!', '!!']);
  });

  test('', () => {
    const object = { test1: 'this', test2: 'is', test3: 'Sparta!', test4: '!!' };
    expect(sliceObject(object, 0, 2)).toStrictEqual(['this', 'is']);
  });

  test('', () => {
    const object = { test1: 'this', test2: 'is', test3: 'Sparta!', test4: '!!' };
    expect(sliceObject(object, 2, 2)).toStrictEqual(['Sparta!', '!!']);
  });

  test('', () => {
    const object = { test1: 'this', test2: 'is', test3: 'Sparta!', test4: '!!' };
    expect(sliceObject(object, 1, 1)).toStrictEqual(['is']);
  });
});

describe('mergeRemovingUndefined', () => {
  it('removes keys from undefined values', () => {
    const a = {
      foo: 'FOO',
      bar: 'BAR',
    };

    const b = {
      lol: 'LOL',
      bar: undefined,
    };

    const result = mergeRemovingUndefined(a, b);
    const expected = {
      foo: 'FOO',
      lol: 'LOL',
    };

    expect(result).toEqual(expected);
  });

  it('does not merge arrays', () => {
    const a = {
      items: ['a', 'b'],
    };

    const b = {
      items: ['b'],
    };

    const result = mergeRemovingUndefined(a, b);
    const expected = {
      items: ['b'],
    };

    expect(result).toEqual(expected);
  });
});

describe('mergeTwoObjects', () => {
  it('same key return second object', () => {
    const a = { 1: 1, 2: 4, 3: 6, 4: 3 };
    const b = { 1: 1, 2: 2, 3: 3, 4: 4 };
    const result = mergeTwoObjects(a, b);
    expect(result).toEqual(b);
  });

  it('same key with sub-object return second object', () => {
    const a = { 1: 1, 2: 4, 3: 6, 4: 3 };
    const b = { 1: 1, 2: { 8: 9 }, 3: 3, 4: 4 };
    const result = mergeTwoObjects(a, b);
    expect(result).toEqual(b);
  });

  it('same key with sub-object return sub-objects merged', () => {
    const a = { 1: 1, 2: { 6: 7 }, 3: 6, 4: 3 };
    const b = { 1: 1, 2: { 8: 9 }, 3: 3, 4: 4 };
    const expected = { 1: 1, 2: { 6: 7, 8: 9 }, 3: 3, 4: 4 };
    const result = mergeTwoObjects(a, b);
    expect(result).toEqual(expected);
  });

  it('same key with sub-object return sub-objects merged 2', () => {
    const a = { 1: 1, 2: { a: { 6: 7 } }, 3: { 4: 5 }, 4: 3 };
    const b = { 1: 1, 2: { 8: { 9: 'b' } }, 3: 3, 4: 4 };
    const expected = { 1: 1, 2: { a: { 6: 7 }, 8: { 9: 'b' } }, 3: 3, 4: 4 };
    const result = mergeTwoObjects(a, b);
    expect(result).toEqual(expected);
  });

  it('one object is empty, returns the other', () => {
    const a = {};
    const b = { 1: 1, 2: { 8: { 9: 'b' } }, 3: 3, 4: 4 };
    let result = mergeTwoObjects(a, b);
    expect(result).toEqual(b);
    result = mergeTwoObjects(b, a);
    expect(result).toEqual(b);
  });

  it('one object is not object, returns the other', () => {
    let a = [];
    const b = { 1: 1, 2: { 8: { 9: 'b' } }, 3: 3, 4: 4 };
    let result = mergeTwoObjects(a, b);
    expect(result).toEqual(b);
    result = mergeTwoObjects(b, a);
    expect(result).toEqual(b);
    a = 'string';
    result = mergeTwoObjects(a, b);
    expect(result).toEqual(b);
    result = mergeTwoObjects(b, a);
    expect(result).toEqual(b);
    a = 89;
    result = mergeTwoObjects(a, b);
    expect(result).toEqual(b);
    result = mergeTwoObjects(b, a);
    expect(result).toEqual(b);
    a = () => {};
    result = mergeTwoObjects(a, b);
    expect(result).toEqual(b);
    result = mergeTwoObjects(b, a);
    expect(result).toEqual(b);
  });
});

describe('haveSameContentArrays', () => {
  it('same array return true', () => {
    const a = [1, 2, 3, 4];
    const result = haveSameContentArrays(a, a);
    expect(result).toEqual(true);
  });

  it('copied array return true', () => {
    const a = [1, 2, 3, 4];
    const b = a;
    const result = haveSameContentArrays(a, b);
    expect(result).toEqual(true);
  });

  it('equal array return true', () => {
    const a = [1, 2, 3, 4];
    const b = [1, 2, 3, 4];
    const result = haveSameContentArrays(a, b);
    expect(result).toEqual(true);
  });

  it('different length array return false', () => {
    const a = [1, 2, 3, 4];
    const b = [1, 2, 3];
    const result = haveSameContentArrays(a, b);
    expect(result).toEqual(false);
  });

  it('different array return false', () => {
    const a = [1, 2, 3, 4];
    const b = [1, 2, 3, 5];
    const result = haveSameContentArrays(a, b);
    expect(result).toEqual(false);
  });

  it('different order array return false', () => {
    const a = [1, 2, 3, 4];
    const b = [1, 2, 4, 3];
    const result = haveSameContentArrays(a, b);
    expect(result).toEqual(false);
  });

  it('different order array return true when specified', () => {
    const a = [1, 2, 3, 4];
    const b = [1, 2, 4, 3];
    const result = haveSameContentArrays(a, b, false);
    expect(result).toEqual(true);
  });

  it('no array return false', () => {
    const a = [1, 2, 3, 4];
    const b = { 1: 1, 2: 2, 3: 3, 4: 4 };
    let result = haveSameContentArrays(a, b);
    expect(result).toEqual(false);
    result = haveSameContentArrays(b, a, false);
    expect(result).toEqual(false);
  });

  it('array of objects return false', () => {
    const a = [1, 2, 3, 4];
    const b = [{ 1: 1, 2: 2, 3: 3, 4: 4 }];
    let result = haveSameContentArrays(a, b);
    expect(result).toEqual(false);
    result = haveSameContentArrays(b, a, false);
    expect(result).toEqual(false);
  });
});
