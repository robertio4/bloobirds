import React from 'react';

import { Dropdown, Icon, IconButton, Item, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES, Bobject } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import useChangeStatus from '../../../../components/changeStatusModal/useChangeStatus';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_HIGH_PRIORITY_LOGIC_ROLE,
  COMPANY_OPT_OUT_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
} from '../../../../constants/company';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useBobjectDetails, useBobjectFormVisibility, useEntity } from '../../../../hooks';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { BobjectApi } from '../../../../misc/api/bobject';
import {
  getFieldByLogicRole,
  getFieldsByLogicRoles,
  getTextFromLogicRole,
  hasRequiredMissing,
} from '../../../../utils/bobjects.utils';
import InfoCardTemplate from '../../infoCardTemplate/infoCardTemplate';
import { getOtherFields } from '../../infoCardTemplate/infoCardTemplate.utils';
import styles from './companyCard.module.css';

const {
  ASSIGNED_TO,
  HIGH_PRIORITY,
  MR_RATING,
  NAME,
  SALES_STATUS,
  STAGE,
  STATUS,
  TARGET_MARKET,
  OPT_OUT,
} = COMPANY_FIELDS_LOGIC_ROLE;

const REQUIRED_FIELDS = [
  ASSIGNED_TO,
  HIGH_PRIORITY,
  MR_RATING,
  OPT_OUT,
  NAME,
  SALES_STATUS,
  STAGE,
  STATUS,
  TARGET_MARKET,
];

const ACTIVE_STATUS = [
  COMPANY_STATUS_LOGIC_ROLE.ON_PROSPECTION,
  COMPANY_STATUS_LOGIC_ROLE.CONTACTED,
  COMPANY_STATUS_LOGIC_ROLE.ENGAGED,
  COMPANY_STATUS_LOGIC_ROLE.NURTURING,
  COMPANY_STATUS_LOGIC_ROLE.MEETING,
];

const INACTIVE_SALES_VALUES = ['On Hold', 'Discarded', 'Client'];

const ContextualMenu = ({ bobject, highPriority }) => {
  const { ref: dropdownRef, visible, setVisible } = useVisible(false);
  const handlePrioritizeCompany = () => {
    const fieldName = COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY;

    const data = {
      [fieldName]: `${fieldName}__${highPriority ? 'NO' : 'YES'}`,
    };
    BobjectApi.request()
      .bobjectType(BOBJECT_TYPES.COMPANY)
      .partialSet({ bobjectId: bobject?.id?.objectId, data });
  };

  return (
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
        onClick={(value, event) => {
          mixpanel.track(MIXPANEL_EVENTS.CHANGE_LEAD_STATUS_MODAL_OPENED, {
            'From pill': false,
          });
          event.stopPropagation();
          setVisible(false);
          handlePrioritizeCompany();
        }}
      >
        <Icon name="zap" size={14} />{' '}
        <Text size={14} inline className={styles._lead_dropdown_element}>
          {highPriority ? 'Unmark as High priority' : 'Mark as High priority'}
        </Text>
      </Item>
    </Dropdown>
  );
};

const useIsInactive = (bobject: Bobject) => {
  const isInactive = getTextFromLogicRole(bobject, 'COMPANY__IS_INACTIVE');
  const status = getFieldByLogicRole(bobject, 'COMPANY__STATUS');
  const stage = getFieldByLogicRole(bobject, 'COMPANY__STAGE');
  const salesStatus = getFieldByLogicRole(bobject, 'COMPANY__SALES_STATUS');
  const isStatusActive =
    stage.valueLogicRole === 'COMPANY__STAGE__SALES'
      ? !INACTIVE_SALES_VALUES.includes(salesStatus.text)
      : ACTIVE_STATUS.includes(status.valueLogicRole);

  return isInactive === 'Yes' && isStatusActive;
};

const CompanyCard = ({ bobject }) => {
  const { openBobjectDetails } = useBobjectDetails();
  const { openEditModal } = useBobjectFormVisibility();
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const bobjectConditionalFields = useEntity('bobjectConditionalFields');
  const { openChangeStatusModal } = useChangeStatus();
  const isInactive = useIsInactive(bobject);

  const fields = bobject && getFieldsByLogicRoles(bobject, REQUIRED_FIELDS);
  const otherFields = getOtherFields({
    bobjectType: BOBJECT_TYPES.COMPANY,
    bobjectFields,
    bobjectTypes,
    bobject,
  });
  const hasRequiredMissingInformation = hasRequiredMissing({
    bobjectType: BOBJECT_TYPES.COMPANY,
    bobjectFields,
    bobjectTypes,
    bobject,
    bobjectConditionalFields,
  });

  const {
    [ASSIGNED_TO]: assignToField = {},
    [HIGH_PRIORITY]: highPriorityField = {},
    [MR_RATING]: mrRatingField = {},
    [NAME]: companyNameField = {},
    [SALES_STATUS]: salesStatusField = {},
    [STAGE]: stageField = {},
    [STATUS]: statusField = {},
    [OPT_OUT]: optOutField = {},
    [TARGET_MARKET]: targetMarketField = {},
  } = fields || {};
  const status =
    stageField?.valueLogicRole === COMPANY_STAGE_LOGIC_ROLE.SALES ? salesStatusField : statusField;
  const targetMarkets = useEntity('targetMarkets');
  const targetMarketEntity = targetMarkets
    ? targetMarkets.get(targetMarketField?.value)
    : undefined;
  const isHighPriority = highPriorityField.valueLogicRole === COMPANY_HIGH_PRIORITY_LOGIC_ROLE.YES;
  const isOptOut = optOutField.valueLogicRole === COMPANY_OPT_OUT_LOGIC_ROLE.YES;

  return (
    <InfoCardTemplate
      assignTo={assignToField}
      requiredFields={{
        mrRating: mrRatingField,
        targetMarket: targetMarketEntity || {},
      }}
      bobject={bobject}
      mrRating={mrRatingField}
      name={companyNameField}
      onStatusClick={() => {
        mixpanel.track(MIXPANEL_EVENTS.CHANGE_COMPANY_STATUS_MODAL_OPENED);
        openChangeStatusModal(bobject);
      }}
      stage={stageField}
      status={status}
      optOut={isOptOut}
      hasRequiredMissing={hasRequiredMissingInformation}
      targetMarket={targetMarketEntity}
      otherFields={otherFields}
      highPriority={isHighPriority}
      handleOnClickName={() => {
        openBobjectDetails({ id: bobject?.id.value });
      }}
      handleOnClickEdit={() => openEditModal({ bobject })}
      bobjectName="Company"
      isInactive={isInactive}
      contextualMenu={<ContextualMenu bobject={bobject} highPriority={isHighPriority} />}
    />
  );
};

export default CompanyCard;
