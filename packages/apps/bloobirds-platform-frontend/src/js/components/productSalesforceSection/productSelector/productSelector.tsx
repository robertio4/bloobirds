import { Item, Select, Tooltip } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import useSWR from 'swr';
import { useController, useFormContext } from 'react-hook-form';
import { api } from '../../../utils/api';
import styles from '../productSalesforceSection.module.css';
import { PRODUCT_FIELDS_LOGIC_ROLE } from '../../../constants/product';

export const ProductSelector = ({ pricebookId, mode }: { pricebookId: string; mode: string }) => {
  const { data } = useSWR(
    '/utils/service/salesforce/availableProducts?pricebookId=' + pricebookId,
    url => api.get(url, {}),
  );
  const { control, setValue, getValues } = useFormContext();

  const orderedProducts = data?.data?.sort((a: any, b: any) => {
    if (a.Name > b.Name) {
      return 1;
    }
    if (a.Name < b.Name) {
      return -1;
    }
    return 0;
  });

  const {
    field: { value: pricebookEntryValue },
  } = useController({
    name: PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ENTRY_ID,
    control,
    defaultValue:
      mode === 'EDIT'
        ? getValues()[PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ENTRY_ID]
        : 'create-new',
  });

  useController({
    name: PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRODUCT_ID,
    control,
  });
  const onChange = (v: any) => {
    if (v === 'create-new') {
      setValue(PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ENTRY_ID, 'create-new');
    } else {
      const product = orderedProducts?.find((p: any) => p?.Id === v);
      setValue(PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ENTRY_ID, product?.Id);
      setValue(PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRODUCT_ID, product?.Product2?.Id);
    }
  };

  return (
    <div className={styles.select2}>
      <Tooltip
        title={
          mode === 'EDIT' &&
          "You can't change Product reference in an already created product in Salesforce"
        }
        position="top"
      >
        <Select
          value={pricebookEntryValue}
          onChange={onChange}
          className={styles.select}
          placeholder="Salesforce product *"
          disabled={mode === 'EDIT'}
        >
          <Item value="create-new" key="create-new">
            + Create a new one
          </Item>
          {orderedProducts?.map((pricebook: any) => (
            <Item value={pricebook?.Id} key={pricebook?.Id}>
              {pricebook?.Name}
            </Item>
          ))}
        </Select>
      </Tooltip>
    </div>
  );
};
