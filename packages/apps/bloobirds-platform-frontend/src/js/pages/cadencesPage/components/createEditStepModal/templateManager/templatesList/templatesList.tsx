import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { ColorType, Icon, IconType, Item, Section, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { MessagingTemplate } from '@bloobirds-it/types';
import { redirectToMessagingSettings } from '@bloobirds-it/utils';

import styles from '../templateManager.module.css';

export const TemplatesList = ({
  templates,
  toggleVisibility,
  title,
  icon,
  titleColor,
  infoText,
  formKey,
}: {
  templates: MessagingTemplate[];
  toggleVisibility: () => void;
  title: string;
  icon: IconType;
  titleColor: ColorType;
  infoText?: string;
  formKey: string;
}) => {
  const { control, formState, clearErrors } = useFormContext();
  return (
    <>
      <Section>
        <div
          className={styles.titleSectionContainer}
          style={{ color: 'var(--' + titleColor + ')' }}
        >
          <Icon name={icon} size={16} color="softPeanut" />
          <Text size="s" color="softPeanut">
            {title}
          </Text>
          {infoText && (
            <Tooltip position="top" title={infoText}>
              <Icon name="info" color="bloobirds" size={12} />
            </Tooltip>
          )}
        </div>
      </Section>
      <div className={styles.templatesContainer}>
        {templates?.map((template, index) => (
          <Controller
            key={`templates.${formKey}.${index}`}
            name={`templates.${formKey}.id`}
            control={control}
            defaultValue={template.id}
            render={({ onChange }) => (
              <Item
                key={template.id}
                onClick={() => {
                  if (formState.errors?.checkedSelectTemplates)
                    clearErrors('checkedSelectTemplates');
                  onChange(template.id.trim());
                  toggleVisibility();
                }}
              >
                {template.name}
              </Item>
            )}
          />
        ))}
      </div>
    </>
  );
};

export const NoTemplatesFound = ({ type = 'linkedin' }) => {
  return (
    <div className={styles.noResultFound}>
      <Text color="softPeanut" size="s">
        No result found
      </Text>
      <span
        onClick={() => window.open(redirectToMessagingSettings(type), '_blank')}
        style={{ cursor: 'pointer' }}
      >
        <Text color="softPeanut" size="s" decoration="underline">
          + Add template
        </Text>
      </span>
    </div>
  );
};
