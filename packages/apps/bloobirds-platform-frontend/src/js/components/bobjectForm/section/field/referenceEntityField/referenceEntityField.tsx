import React, { useCallback } from 'react';
import { BaseField}  from'../baseField/baseField.view';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { useReferenceEntityFormField } from '../../../../../hooks/useReferenceEntityFormField';

export const ReferenceEntityField = (props: any) => {
  const { options } = useReferenceEntityFormField(props.referenceEntity);
  const innerComponentGenerator = useCallback(
    rest => {
      return (
        <Select size="medium" {...rest}>
          {options.map(({ name, value }) => (
            <Item key={value} dataTest={value} value={value}>
              {name}
            </Item>
          ))}
        </Select>
      );
    },
    [props, options],
  );

  return <BaseField {...props} as={innerComponentGenerator} />;
};
