import React, { useEffect, useState } from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';

import { useNewCadenceTableEnabled } from '../../../../../hooks/useFeatureFlags';
import styles from '../../styles/usersPage.module.css';
import { CheckboxListItem } from './checkboxListItem';
import { SectionInterface } from './types/permissions';

export const PermissionsModalSection = ({
  sections,
  sectionTitle,
  selectAllHandle,
  values,
  updateValue,
}: {
  sections: SectionInterface[];
  sectionTitle: string;
  selectAllHandle?: string;
  values: string[];
  updateValue: (value: string[]) => void;
}) => {
  const entriesIds = sections && Object.entries(sections)?.map(item => item[1]?.id);
  const [selectAll, setSelectAll] = useState(values?.length === entriesIds?.length);
  const isNewCadenceTableEnabled = useNewCadenceTableEnabled();
  const isOtoAccount = useIsOTOAccount();

  useEffect(() => {
    setSelectAll(values?.length === entriesIds?.length);
  }, [values]);

  let sectionNames: Record<string, string> = {
    EDIT_ALL: 'Edit all -  Allow user to edit and contact objects not assigned to them',
    DOWNLOAD_LIST: 'Download lists',
    VIEW_INBOUND_TAB: 'Inbound tab',
    VIEW_INBOX: 'Inbox tab',
    VIEW_OUTBOX_TAB: 'Outbox tab',
    VIEW_ASSIGN_TAB: 'Assign tab',
    VIEW_PROSPECT_TAB: 'Prospect tab',
    VIEW_SALES_TAB: 'Sales tab',
    VIEW_DASHBOARDS_TAB: 'Dashboards',
    VIEW_ADD_QC_TAB: 'Add QC tab',
    VIEW_CADENCES: isNewCadenceTableEnabled ? 'Create cadences' : 'Cadences tab',
    CUSTOM_TASK: 'Create custom tasks',
    BULK_ACTIONS: 'Bulk Actions',
    VIEW_REPORTS: 'Reports (Companies, leads, opportunity, activity and tasks lists)',
    WHATSAPP_BUSINESS_ADMIN: 'Whatsapp Business inbox admin',
  };

  if (isOtoAccount) {
    sectionNames = {
      ...sectionNames,
      USER_ACTIVITY_VISIBILITY: 'Conversations made by other account users',
    };
  }

  return (
    <div className={styles._section}>
      <div className={styles._last_section}>
        <div className={styles._section_header}>
          <Text size="m" color="peanut" weight="bold">
            {sectionTitle}
          </Text>
          <Text size="m" color="peanut" weight="bold">
            Allow
          </Text>
        </div>
        {selectAllHandle && (
          <CheckboxListItem
            size="small"
            value={selectAll}
            onChange={value => {
              updateValue(
                value
                  ? Object.entries(sections)?.map(field => {
                      return field[1]?.id;
                    })
                  : [],
              );
            }}
          >
            {selectAllHandle}
          </CheckboxListItem>
        )}
        {sections?.map(option => {
          if (!sectionNames[option?.enumName]) {
            return <></>;
          }
          const fieldId = option?.id;
          return (
            <CheckboxListItem
              size="small"
              key={fieldId}
              value={values?.includes(fieldId)}
              onChange={value => {
                updateValue(
                  value && !values?.includes(fieldId)
                    ? [...values, fieldId]
                    : values.filter(v => v !== fieldId),
                );
              }}
            >
              {sectionNames[option?.enumName]}
            </CheckboxListItem>
          );
        })}
      </div>
    </div>
  );
};
