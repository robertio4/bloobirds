import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { CheckItem, Item, MultiSelect, Select, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { usePlaybookSegmentation } from '@bloobirds-it/hooks';
import { toSentenceCase } from '@bloobirds-it/utils';

import { ControlledSwitch } from '../../../../components/controlledSwitch/controlledSwitch.view';
import {
  MessagingTemplateSidebar,
  MessagingTemplateSidebarSection,
} from '../../../../components/messagingTemplates/messagingTemplateSidebar/messagingTemplateSidebar';
import { useActiveUser } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import { TEMPLATE_TYPES } from '../../../../utils/templates.utils';
import styles from '../../messagingSectionLayout.module.css';

const SegmentationMultiSelect = ({ value, label, options, ...props }) => (
  <div style={{ marginTop: 8 }}>
    <MultiSelect
      {...props}
      width="100%"
      sortByChecked={false}
      placeholder={value?.length > 0 ? label : `All ${label}`}
      label={label}
      value={value}
      autocomplete={options?.length > 8}
      selectAllOption
    >
      {options.map(option => (
        <CheckItem hidden={!option.isEnabled} key={option.id} value={option.id} label={option.name}>
          {option.name}
        </CheckItem>
      ))}
    </MultiSelect>
  </div>
);

const MessagingSidebarSettings = ({ templateType, templateOwner, mode, content, templateId }) => {
  const { control, watch } = useFormContext();
  const { activeUser, activeAccount } = useActiveUser();
  const isFullSalesEnabled = useFullSalesEnabled();
  const isAdmin = useIsAccountAdmin();

  const selectedStage = watch('stage');
  const { segmentationFields, isLoading } = usePlaybookSegmentation(selectedStage);
  const isTheOwner = activeUser.id === templateOwner || !templateOwner;
  const isCloning = mode === 'CLONE';
  const canEdit = isTheOwner || isAdmin || isCloning;

  return (
    <MessagingTemplateSidebar>
      <MessagingTemplateSidebarSection
        hidden={!isFullSalesEnabled}
        title="Stage"
        description="Stage enables to easily use your templates on the company or opportunity view depending on the sales stage you are working"
      >
        <Controller
          name="stage"
          control={control}
          as={
            <Select>
              <Item value="PROSPECT">Prospect stage</Item>
              <Item value="SALES">Sales stage</Item>
              <Item value="ALL">Prospect and Sales stage</Item>
            </Select>
          }
        />
      </MessagingTemplateSidebarSection>
      <MessagingTemplateSidebarSection title="Options" description="Can choose more than one">
        <div className={styles.options_container}>
          {templateType === 'QUALIFYING_QUESTION' && (
            <div className={styles.switchQuestions}>
              <ControlledSwitch
                control={control}
                name="isRequiredBeforeMeeting"
                infoButton
                tooltip="When selecting this option, QQs will appear only on meetings with Companies, Leads or Opportunities that match the chosen categorization"
              >
                Required to close the meeting?
              </ControlledSwitch>
              <ControlledSwitch control={control} name="isLayoutReadOnly">
                Visible in forms?
              </ControlledSwitch>
            </div>
          )}
          {templateType !== 'QUALIFYING_QUESTION' && (
            <>
              <ControlledSwitch
                control={control}
                name="visibility"
                disabled={!canEdit}
                tooltip={canEdit ? '' : 'You can’t make private a template not owned by you'}
              >
                Visible for all team members
              </ControlledSwitch>
              <ControlledSwitch
                control={control}
                name="isOfficial"
                disabled={!isAdmin}
                tooltip={isAdmin ? '' : 'Only the account admins can set the Official Playbook'}
              >
                Official Playbook Template
              </ControlledSwitch>
            </>
          )}
          {[TEMPLATE_TYPES.SNIPPET, TEMPLATE_TYPES.PITCH].includes(templateType) && (
            <ControlledSwitch
              control={control}
              name="isBattlecard"
              disabled={!canEdit}
              tooltip={canEdit ? '' : 'You can’t edit a template not owned by you'}
            >
              Playbook Battlecard
            </ControlledSwitch>
          )}
        </div>
      </MessagingTemplateSidebarSection>
      <MessagingTemplateSidebarSection
        title="Categorization"
        description="Categorizing enables you to easily filter your templates when contacting a lead."
      >
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner name="loadingCircle" size={24} />
          </div>
        ) : (
          segmentationFields &&
          Object.entries(segmentationFields).map(([stage, messagingFilters]) => (
            <div key={`segmantation-${stage}`} className={styles.segmentationBlock}>
              {selectedStage === 'ALL' && (
                <Text size="xs" color="softPeanut">
                  {toSentenceCase(stage.toLowerCase())}
                </Text>
              )}
              {messagingFilters.map(filter => (
                <Controller
                  control={control}
                  key={filter.id}
                  name={`segmentationValues.${stage}.${filter.id}`}
                  as={<SegmentationMultiSelect options={filter.values} label={filter.name} />}
                />
              ))}
            </div>
          ))
        )}
      </MessagingTemplateSidebarSection>
    </MessagingTemplateSidebar>
  );
};

export default MessagingSidebarSettings;
