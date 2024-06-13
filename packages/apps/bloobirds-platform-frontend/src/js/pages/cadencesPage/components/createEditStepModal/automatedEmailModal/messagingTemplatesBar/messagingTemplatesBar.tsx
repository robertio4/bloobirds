import React from 'react';

import { Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import { BobjectType } from '@bloobirds-it/types';
import { truncate } from 'lodash';

import useAutomationEmailTemplates from '../../../../../../hooks/useAutomationEmailTemplates';
import styles from './messagingTemplatesBar.module.css';

interface MessagingTemplatesSelectProps {
  value?: string;
  onChange: (id: string) => void;
}

function MessagingTemplatesBar({ value, onChange }: MessagingTemplatesSelectProps) {
  const { messagingTemplates } = useAutomationEmailTemplates();

  return (
    <div className={styles.container}>
      <div className={styles.select}>
        <div className={styles.label}>
          <Text size="xs" color="softPeanut">
            Template:
          </Text>
        </div>
        <Select
          autocomplete
          borderless={false}
          size="small"
          width="256px"
          placeholder="Email Template"
          value={value}
          onChange={onChange}
        >
          {messagingTemplates.map((messagingTemplate: any) => (
            <Item
              key={messagingTemplate.id}
              label={messagingTemplate.name}
              value={messagingTemplate.id}
            >
              {truncate(messagingTemplate.name, { length: 32 })}
            </Item>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default MessagingTemplatesBar;
