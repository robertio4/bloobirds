import { useLayoutEffect, useState } from 'react';
import { useRouter } from '../useRouter';
import qs from 'query-string';
import isEqual from 'lodash/isEqual';

const defaultParser = value => (value && typeof value !== 'string' ? JSON.parse(value) : value);
const defaultEncoder = value =>
  value && typeof value !== 'string' ? JSON.stringify(value) : value;

export const useQueryStringState = (
  key,
  defaultValue,
  parser = defaultParser,
  encoder = defaultEncoder,
) => {
  const { history } = useRouter();

  const [memoryState, setMemoryState] = useState(() => {
    const urlValue = parser(qs.parse(window.location.search)[key]);
    if (urlValue) {
      return urlValue;
    }
    if (defaultValue) {
      return defaultValue;
    }
    return undefined;
  });

  const setState = newValue => {
    const oldQuery = qs.parse(window.location.search);
    const newQuery = { ...oldQuery, [key]: encoder(newValue) };
    setMemoryState(newValue);
    history.replace({ search: qs.stringify(newQuery) });
  };

  useLayoutEffect(() => {
    const oldQuery = qs.parse(window.location.search);

    if (memoryState && !oldQuery[key] && !isEqual(memoryState, oldQuery[key])) {
      const newQuery = { ...oldQuery, [key]: encoder(memoryState) };
      history.replace({ search: qs.stringify(newQuery) });
    }
  }, []);

  return [memoryState, setState];
};
