import React from 'react';
import { Item, ModalSection, Select, Tooltip } from '@bloobirds-it/flamingo-ui';
import useSWR from 'swr';
import { useController, useFormContext } from 'react-hook-form';
import { api } from '../../utils/api';
import { PRODUCT_FIELDS_LOGIC_ROLE } from '../../constants/product';
import styles from './productHubspotSection.module.css';

export const ProductHubspotSection = ({ mode }: { mode: string }) => {
  const { data } = useSWR('/utils/hubspot/product', url => api.get(url, {}));

  const { control, errors } = useFormContext();
  const {
    field: { ref, value, onChange },
  } = useController({
    name: PRODUCT_FIELDS_LOGIC_ROLE.HUBSPOT_PRODUCT_ID,
    control,
    rules: { required: true },
  });

  return (
    <div className={styles._grid}>
      <ModalSection title="Hubspot information" icon="hubspot">
        <div ref={ref} style={{ width: 'calc(50% - 8px)' }} className={styles.select2}>
          <Tooltip
            title={
              mode === 'EDIT' &&
              "You can't change the product related in an already created product in Hubspot"
            }
            position="top"
          >
            <Select
              value={value}
              onChange={onChange}
              disabled={mode === 'EDIT' && value}
              className={styles.select}
              placeholder="Hubspot product *"
              error={
                errors[PRODUCT_FIELDS_LOGIC_ROLE.HUBSPOT_PRODUCT_ID] && 'This field is required'
              }
            >
              <Item value="create-new" key="create-new">
                + Create a new one
              </Item>
              {data?.data?.map((product: any) => (
                <Item value={product?.id} key={product?.id}>
                  {product?.properties?.name}
                </Item>
              ))}
            </Select>
          </Tooltip>
        </div>
      </ModalSection>
    </div>
  );
};
