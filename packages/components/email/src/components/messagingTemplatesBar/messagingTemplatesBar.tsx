import React from 'react';

import { Icon, Item, Section, Select, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useMessagingTemplates } from '@bloobirds-it/hooks';
import { MessagingTemplate, TEMPLATE_TYPES } from '@bloobirds-it/types';
import truncate from 'lodash/truncate';

import styles from './messagingTemplatesBar.module.css';

interface MessagingTemplatesSelectProps {
  value?: string;
  onChange: (template: MessagingTemplate) => void;
  user: any;
}

function MessagingTemplatesBar({ value, onChange, user }: MessagingTemplatesSelectProps) {
  const { messagingTemplates } = useMessagingTemplates({
    name: null,
    segmentationValues: {},
    type: TEMPLATE_TYPES.EMAIL,
    page: 0,
    size: 200,
    visibility: null,
    onlyMine: false,
  });
  const privateTemplates = messagingTemplates.filter(
    (template: MessagingTemplate) => template?.createdBy === user?.id,
  );
  const publicTemplates = messagingTemplates.filter(
    (template: MessagingTemplate) => template.visibility === 'PUBLIC',
  );

  return (
    <div className={styles.container}>
      <div className={styles.select}>
        <div className={styles.label}>
          <Tooltip
            title="Current email content will be replaced by template without the ability of going back"
            position="bottom"
          >
            <Icon name="infoFilled" color="darkBloobirds" size={20} />
          </Tooltip>
          <Text size="xs" color="softPeanut">
            Template:
          </Text>
        </div>
        <Select
          borderless={false}
          size="small"
          width="256px"
          placeholder="Email Template"
          value={value}
          onChange={templateId => {
            const emailTemplate = messagingTemplates.find((x: any) => x?.id === templateId);
            onChange(emailTemplate);
          }}
        >
          <Section id="my-templates">My templates</Section>
          {privateTemplates.map((messagingTemplate: any) => (
            <Item key={messagingTemplate.id} section="my-templates" value={messagingTemplate.id}>
              {truncate(messagingTemplate.name, { length: 32 })}
            </Item>
          ))}
          <Section id="team-templates">Team templates</Section>
          {publicTemplates.map((messagingTemplate: any) => (
            <Item key={messagingTemplate.id} section="team-templates" value={messagingTemplate.id}>
              {truncate(messagingTemplate.name, { length: 32 })}
            </Item>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default MessagingTemplatesBar;
