import React from 'react';
import { Item, ModalSection, Select, Tooltip } from '@bloobirds-it/flamingo-ui';
import useSWR from 'swr';
import { useController, useFormContext } from 'react-hook-form';
import { api } from '../../utils/api';
import { PRODUCT_FIELDS_LOGIC_ROLE } from '../../constants/product';
import styles from './productSalesforceSection.module.css';
import { ProductSelector } from './productSelector/productSelector';
import { useEntity } from '../../hooks';

export const ProductSalesforceSection = ({ mode }: { mode: string }) => {
  const { data } = useSWR('/utils/service/salesforce/pricebooks', url => api.get(url, {}));
  const integrationTriggerConfigs = useEntity('integrationTriggerConfigs');

  const defaultPricebookConfig = integrationTriggerConfigs
    ?.all()
    ?.find((config: any) => config?.key === 'defaultPricebookId');
  const { control, watch, errors } = useFormContext();
  const {
    field: { ref, value, onChange },
  } = useController({
    name: PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ID,
    control,
    rules: { required: true },
    defaultValue: defaultPricebookConfig?.value,
  });
  const pricebookSelected = watch(PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ID);

  return (
    <div className={styles._grid}>
      <ModalSection title="Salesforce information" icon="salesforce">
        <div ref={ref} style={{ width: 'calc(50% - 8px)' }} className={styles.select2}>
          <Tooltip
            title={
              mode === 'EDIT' &&
              "You can't change Pricebook in an already created product in Salesforce"
            }
            position="top"
          >
            <Select
              value={value}
              onChange={onChange}
              disabled={mode === 'EDIT'}
              className={styles.select}
              placeholder="Salesforce Pricebook *"
              error={
                errors[PRODUCT_FIELDS_LOGIC_ROLE.SALESFORCE_PRICEBOOK_ID] &&
                'This field is required'
              }
            >
              {data?.data?.map((pricebook: any) => (
                <Item value={pricebook?.Id} key={pricebook?.Id}>
                  {pricebook?.Name}
                </Item>
              ))}
            </Select>
          </Tooltip>
        </div>
        {pricebookSelected && <ProductSelector pricebookId={pricebookSelected} mode={mode} />}
      </ModalSection>
    </div>
  );
};
