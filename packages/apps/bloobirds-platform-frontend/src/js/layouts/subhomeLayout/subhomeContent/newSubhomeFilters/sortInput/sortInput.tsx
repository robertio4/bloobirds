import React, { ReactElement } from 'react';
import { useSubhomeFilters } from '../../../../../hooks/useSubhomeFilters';

const SortInput = ({ children }: { children: ReactElement }) => {
  const { sort, setSort } = useSubhomeFilters();
  if (!React.isValidElement(children)) return null;

  return (
    <>
      {React.cloneElement(children, {
        ...(children.props as any),
        value: sort,
        onChange: (value: string) => {
          setSort(value);
        },
      })}
    </>
  );
};

export default SortInput;
