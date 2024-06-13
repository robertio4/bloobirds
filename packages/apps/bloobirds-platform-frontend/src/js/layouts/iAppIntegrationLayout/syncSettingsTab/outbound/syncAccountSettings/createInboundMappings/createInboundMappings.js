import React, { useState } from 'react';
import { useSalesforceIntegration } from '../../../../../../hooks/useSalesforceIntegration';
import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import styles from './createInboundMappings.module.css';
import CreateInboundMappingsModal from '../createInboundMappingsModal/createInboundMappingsModal';

const CreateInboundMappings = () => {
  return (
    <div className={styles._container}>
      <Text size={'m'} color={'peanut'} weight={'bold'}>
        Sync direction
      </Text>
      <div className={styles._content}>
        <div className={styles._textArea}>
          <Text size={'m'} color={'softPeanut'}>
            Current model
          </Text>
          <Icon name="arrowRight" color="softPeanut" size="24" />
          <div className={styles._direction}>
            <Text size={'m'} color={'peanut'} weight={'bold'}>
              Bloobirds
            </Text>
            <Icon name="arrowRight" color="softPeanut" size="18" />
            <Text size={'m'} color={'peanut'} weight={'bold'}>
              Salesforce
            </Text>
          </div>
        </div>
        <CreateInboundMappingsModal />
      </div>
    </div>
  );
};

export default CreateInboundMappings;
