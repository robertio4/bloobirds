import React, { FC, useState } from 'react';

import { Dropdown, IconButton, Item, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES, Bobject, BobjectField, BobjectType } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';
import { mutate } from 'swr';

import AddQcToLeadModal from '../../../../components/addQcToLeadModal/addQcToLeadModal';
import AssignUserModal from '../../../../components/assignUserModal/assignUserModal';
import useChangeStatus from '../../../../components/changeStatusModal/useChangeStatus';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_HIGH_PRIORITY_LOGIC_ROLE,
  LEAD_OPT_OUT_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
} from '../../../../constants/lead';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useBobjectDetails, useBobjectFormVisibility, useEntity } from '../../../../hooks';
import useAssignUser from '../../../../hooks/useAssignUser';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { BobjectApi } from '../../../../misc/api/bobject';
import {
  getFieldByLogicRole,
  getFieldsByLogicRoles,
  getTextFromLogicRole,
  getValueFromLogicRole,
  hasRequiredMissing,
} from '../../../../utils/bobjects.utils';
import InfoCardTemplate from '../../infoCardTemplate/infoCardTemplate';
import { getOtherFields } from '../../infoCardTemplate/infoCardTemplate.utils';

interface LeadCardProps {
  bobject: Bobject;
}

const {
  ASSIGNED_TO,
  BUYING_ROLE,
  COMPANY,
  FULL_NAME,
  FUNCTION,
  HIGH_PRIORITY,
  ICP,
  MR_RATING,
  JOB_TITLE,
  LINKEDIN_URL,
  OPT_OUT,
  POSITION_ROLE,
  SALES_STATUS,
  SOURCE,
  STAGE,
  STATUS,
}: {
  ASSIGNED_TO: string;
  BUYING_ROLE: string;
  COMPANY: string;
  FULL_NAME: string;
  FUNCTION: string;
  HIGH_PRIORITY: string;
  ICP: string;
  MR_RATING: string;
  OPT_OUT: string;
  JOB_TITLE: string;
  LINKEDIN_URL: string;
  POSITION_ROLE: string;
  SALES_STATUS: string;
  SOURCE: string;
  STAGE: string;
  STATUS: string;
} = LEAD_FIELDS_LOGIC_ROLE;

const REQUIRED_FIELDS = [
  ASSIGNED_TO,
  BUYING_ROLE,
  COMPANY,
  FULL_NAME,
  FUNCTION,
  HIGH_PRIORITY,
  ICP,
  MR_RATING,
  OPT_OUT,
  JOB_TITLE,
  LINKEDIN_URL,
  POSITION_ROLE,
  SALES_STATUS,
  SOURCE,
  STAGE,
  STATUS,
] as Array<string>;

const ACTIVE_STATUS = [
  LEAD_STATUS_LOGIC_ROLE.ON_PROSPECTION,
  LEAD_STATUS_LOGIC_ROLE.CONTACTED,
  LEAD_STATUS_LOGIC_ROLE.ENGAGED,
  LEAD_STATUS_LOGIC_ROLE.NURTURING,
  LEAD_STATUS_LOGIC_ROLE.MEETING,
];

const INACTIVE_SALES_VALUES = ['On Hold', 'Discarded', 'Client'];

const ContextualMenu = ({ bobject, highPriority }: { bobject: Bobject; highPriority: boolean }) => {
  const { ref: dropdownRef, visible, setVisible } = useVisible(false);
  const { isOpen: isAssignUserOpen, openAssignUserModal } = useAssignUser();
  const [openAddModal, setOpenAddModal] = useState(false);

  const handlePrioritizeLead = () => {
    const fieldName = LEAD_FIELDS_LOGIC_ROLE.HIGH_PRIORITY;

    const data = {
      [fieldName]: `${fieldName}_${highPriority ? 'NO' : 'YES'}`,
    };
    BobjectApi.request()
      .bobjectType(BOBJECT_TYPES.LEAD)
      .partialSet({ bobjectId: bobject?.id?.objectId, data });
  };
  return (
    <>
      <Dropdown
        ref={dropdownRef}
        visible={visible}
        anchor={
          <IconButton
            name="moreOpenholesVertical"
            color="softPeanut"
            onClick={event => {
              event.stopPropagation();
              setVisible(!visible);
            }}
          />
        }
      >
        <Item
          icon="zap"
          onClick={(value, event) => {
            mixpanel.track(MIXPANEL_EVENTS.CHANGE_LEAD_STATUS_MODAL_OPENED, {
              'From pill': false,
            });
            event.stopPropagation();
            setVisible(false);
            handlePrioritizeLead();
          }}
        >
          <Text size="s" inline>
            {highPriority ? 'Unmark as High priority' : 'Mark as High priority'}
          </Text>
        </Item>
        <Item
          icon="deliver"
          onClick={(v, e) => {
            e.stopPropagation();
            setVisible(false);
            setOpenAddModal(true);
          }}
        >
          <Text size="s" inline>
            Assign to other company
          </Text>
        </Item>
        <Item
          icon="personArrow"
          onClick={(value, event) => {
            mixpanel.track(MIXPANEL_EVENTS.REASSIGN_LEAD_ACTION_CLICKED_ON_DELIVERED_TAB);
            event.stopPropagation();
            setVisible(false);
            openAssignUserModal({ bobject });
          }}
        >
          Reassign
        </Item>
      </Dropdown>
      {!!openAddModal && (
        <AddQcToLeadModal
          lead={bobject}
          leadId={bobject?.id?.objectId}
          open
          handleClose={() => setOpenAddModal(undefined)}
        />
      )}
      {isAssignUserOpen && <AssignUserModal />}
    </>
  );
};

const useIsInactive = (bobject: Bobject) => {
  const isInactive = getTextFromLogicRole(bobject, 'LEAD__IS_INACTIVE');
  const status = getFieldByLogicRole(bobject, 'LEAD__STATUS');
  const stage = getFieldByLogicRole(bobject, 'LEAD__STAGE');
  const salesStatus = getFieldByLogicRole(bobject, 'LEAD__SALES_STATUS');
  const isStatusActive =
    stage.valueLogicRole === 'LEAD__STAGE__SALES'
      ? !INACTIVE_SALES_VALUES.includes(salesStatus.text)
      : ACTIVE_STATUS.includes(status.valueLogicRole);

  return isInactive === 'Yes' && isStatusActive;
};

const LeadCard: FC<LeadCardProps> = ({ bobject }) => {
  const { openBobjectDetails } = useBobjectDetails();
  const { openChangeStatusModal } = useChangeStatus();
  const { openEditModal } = useBobjectFormVisibility();
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const bobjectConditionalFields = useEntity('bobjectConditionalFields');
  const isInactive = useIsInactive(bobject);

  const fields = bobject && getFieldsByLogicRoles(bobject, REQUIRED_FIELDS);
  const otherFields = getOtherFields({
    bobjectType: BOBJECT_TYPES.LEAD,
    bobjectFields,
    bobjectTypes,
    bobject,
  });
  const hasRequiredMissingInformation = hasRequiredMissing({
    bobjectType: BOBJECT_TYPES.LEAD as BobjectType,
    bobjectFields,
    bobjectTypes,
    bobject,
    bobjectConditionalFields,
  });
  const {
    [ASSIGNED_TO]: assignToField = {},
    [BUYING_ROLE]: buyingRoleField = {},
    [COMPANY]: companyNameField = {},
    [FULL_NAME]: leadNameField = {},
    [FUNCTION]: functionField = {},
    [HIGH_PRIORITY]: highPriorityField = {},
    [ICP]: icpField = {},
    [MR_RATING]: mrRatingField = {},
    [JOB_TITLE]: jobTitleField = {},
    [LINKEDIN_URL]: linkedinUrlField = {},
    [OPT_OUT]: optOutField = {},
    [POSITION_ROLE]: positionRoleField = {},
    [SALES_STATUS]: salesStatusField = {},
    [SOURCE]: sourceField = {},
    [STAGE]: stageField = {},
    [STATUS]: statusField = {},
  } = fields || ({} as { [key: string]: BobjectField });

  const isHighPriority = highPriorityField.valueLogicRole === LEAD_HIGH_PRIORITY_LOGIC_ROLE.YES;
  const otherFieldsCompleted = [...otherFields];
  const status =
    stageField?.valueLogicRole === LEAD_STAGE_LOGIC_ROLE.SALES ? salesStatusField : statusField;
  const isOptOut = optOutField?.valueLogicRole === LEAD_OPT_OUT_LOGIC_ROLE.YES;
  return (
    <InfoCardTemplate
      bobject={bobject}
      assignTo={assignToField}
      name={
        leadNameField
          ? leadNameField
          : getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true)
      }
      onStatusClick={() => {
        mixpanel.track(MIXPANEL_EVENTS.CHANGE_LEAD_STATUS_MODAL_OPENED);
        openChangeStatusModal(bobject);
      }}
      stage={stageField}
      status={status}
      hasRequiredMissing={hasRequiredMissingInformation}
      otherFields={otherFieldsCompleted}
      optOut={isOptOut}
      highPriority={isHighPriority}
      handleOnClickName={() => {
        openBobjectDetails({ id: bobject.id.value });
      }}
      handleOnClickEdit={() =>
        openEditModal({ bobject, onSuccess: () => mutate(`/Lead/${bobject?.id?.objectId}/form`) })
      }
      bobjectName={BOBJECT_TYPES.LEAD}
      isInactive={isInactive}
      requiredFields={{
        buyingRole: buyingRoleField,
        company: companyNameField,
        function: functionField,
        icp: icpField,
        mrRating: mrRatingField,
        jobTitle: jobTitleField,
        linkedinUrl: linkedinUrlField,
        positionRole: positionRoleField,
        sourceField: sourceField,
      }}
      contextualMenu={<ContextualMenu bobject={bobject} highPriority={isHighPriority} />}
    />
  );
};

export default LeadCard;
