import {
  CRM,
  CRM_DISPLAY_NAME,
  TRIGGER_MAPPING_NAMES,
} from '../../../../../constants/integrations';
import { Checkbox, Icon, Item, Select, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';

import SyncSettingsCard from '../../syncSettingsCard/syncSettingsCard';
import { api } from '../../../../../utils/api';
import styles from '../syncSettingsTabOutbound.module.css';
import { saveTriggerSetting } from '../../../../../utils/integration.utils';

export const SyncProductsCard = ({
  crm,
  integrationTriggerConfigs,
}: {
  crm: any;
  integrationTriggerConfigs: any;
}) => {
  // This is only used for products now, to be spread for rest of bobjects

  const createProductsConfig = integrationTriggerConfigs
    ?.all()
    ?.find(
      (config: any) =>
        config?.key === 'createProduct' && config?.crm?.toUpperCase() === crm.toUpperCase(),
    );
  const defaultPricebookConfig = integrationTriggerConfigs
    ?.all()
    ?.find((config: any) => config?.key === 'defaultPricebookId');

  const [createProducts, setCreateProducts] = useState<string>(createProductsConfig?.value);
  const [defaultPricebook, setDefaultPricebook] = useState(defaultPricebookConfig?.value);
  const [disabled, setDisabled] = useState(
    createProductsConfig?.value === createProducts &&
      defaultPricebook === defaultPricebookConfig?.value,
  );
  const { data: pricebooks } = useSWR(
    crm === CRM.SALESFORCE ? '/utils/service/salesforce/pricebooks' : null,
    url => api.get(url, {}),
  );
  const { createToast } = useToasts();
  // @ts-ignore
  const crmDisplayName = CRM_DISPLAY_NAME[crm];
  const selectorDisabled = createProducts === 'false';
  const handleSubmit = () => {
    api.patch('/entities/integrationTriggerConfigs/' + createProductsConfig?.id, {
      value: createProducts,
    });
    // eslint-disable-next-line
    crm === CRM.SALESFORCE &&
      api.patch('/entities/integrationTriggerConfigs/' + defaultPricebookConfig?.id, {
        value: defaultPricebook,
      });

    saveTriggerSetting(
      crm === 'HUBSPOT'
        ? TRIGGER_MAPPING_NAMES.PRODUCT__HUBSPOT
        : TRIGGER_MAPPING_NAMES.PRODUCT__SALESFORCE,
      {
        createProduct: JSON.stringify(createProducts),
        defaultPricebookId: JSON.stringify(defaultPricebook),
      },
      crm,
    );
    mutate('/entity/integrationTriggerConfigs');
    createToast({ message: 'Products settings saved!', type: 'success' });
    setDisabled(true);
  };

  return (
    <SyncSettingsCard
      onSave={handleSubmit}
      icon="assignBoard"
      title="Syncing Products"
      crm={crm}
      subtitle={undefined}
      isDisabled={disabled}
      email={undefined}
      disconnectIntegration={undefined}
    >
      <div className={styles._children_company_container}>
        <Checkbox
          checked={createProducts === 'true'}
          onClick={v => {
            setCreateProducts(!v ? 'false' : 'true');
            setDisabled(false);
          }}
          size="small"
        >
          Create Products from Bloobirds to {crmDisplayName} as Products
        </Checkbox>
        {crm === CRM.SALESFORCE && (
          <div className={styles._children_multiselect}>
            <Text color={selectorDisabled ? 'softPeanut' : 'peanut'} size="s" weight="bold">
              Select a default Pricebook where to create your products
            </Text>
            <Icon name="arrowRight" color="softPeanut" />
            <Select
              value={defaultPricebook}
              onChange={v => {
                setDefaultPricebook(v);
                setDisabled(false);
              }}
              className={styles.select}
              placeholder="Salesforce Pricebook *"
              size="small"
              borderless={false}
              width="200px"
              disabled={selectorDisabled}
            >
              {pricebooks?.data?.map((pricebook: any) => (
                <Item value={pricebook?.Id} key={pricebook?.Id}>
                  {pricebook?.Name}
                </Item>
              ))}
            </Select>
          </div>
        )}
      </div>
    </SyncSettingsCard>
  );
};
