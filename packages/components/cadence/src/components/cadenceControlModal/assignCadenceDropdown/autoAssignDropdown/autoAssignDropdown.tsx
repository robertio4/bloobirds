import React, { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useClickAway } from 'react-use';

import {
  Button,
  Dropdown,
  Icon,
  Radio,
  RadioGroup,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useMediaQuery } from '@bloobirds-it/hooks';
import { BobjectTypes, FIELDS_LOGIC_ROLE, MainBobjectTypes } from '@bloobirds-it/types';
import { getValueFromLogicRole } from '@bloobirds-it/utils';

import {
  AssignCadenceDropdownProps,
  AutoAssignDropdownContentProps,
} from '../assignCadenceDropdown.types';
import styles from './autoAssignDropdown.module.css';
import { useAutoAssignBobjets } from './useAutoAssignBobjets';

export const DropdownContent = ({
  activeUserId: userId,
  activeBobject,
  contactBobjects,
  setDropdownVisible,
  callback,
}: AutoAssignDropdownContentProps) => {
  const [assignType, setAssignType] = useState('all');
  const { assignBobjects } = useAutoAssignBobjets(userId);
  const bobjectType = activeBobject?.id?.typeName;
  const hasLeads = contactBobjects?.leads?.length > 0;
  const contactCompany = contactBobjects?.company;
  const { t } = useTranslation();

  const shouldShowOptions =
    (hasLeads && bobjectType === BobjectTypes.Company) ||
    (contactCompany && bobjectType === BobjectTypes.Lead);

  const handleSubmit = () => {
    assignBobjects({ contactBobjects, activeBobject: activeBobject, mode: assignType, callback });
    setDropdownVisible(false);
  };

  const getModalText = () => {
    switch (bobjectType) {
      case BobjectTypes.Company:
        return [
          t('cadence.cadenceControlModal.assignCadenceDropdown.assignCompany'),
          t('cadence.cadenceControlModal.assignCadenceDropdown.assignCompanyAndLeads'),
        ];
      case BobjectTypes.Lead:
        return [
          t('cadence.cadenceControlModal.assignCadenceDropdown.assignLead'),
          t('cadence.cadenceControlModal.assignCadenceDropdown.assignLeadAndCompany'),
        ];
    }
  };

  const radioText = getModalText();

  return (
    <div className={styles._auto_assign_dropdown}>
      <Text size="s" align="center" className={styles._auto_assign_text}>
        <Trans
          i18nKey="cadence.cadenceControlModal.assignCadenceDropdown.title"
          values={{ bobjectType: t(`bobjectTypes.${bobjectType.toLowerCase()}`) }}
        />
      </Text>
      {shouldShowOptions && (
        <div className={styles._radio_group}>
          <RadioGroup
            defaultValue="all"
            onChange={value => {
              setAssignType(value);
            }}
          >
            <Radio value="all" size="small" expand={true}>
              {radioText[1]}
              <Tooltip
                title={t('cadence.cadenceControlModal.assignCadenceDropdown.tooltip')}
                position="top"
              >
                <Icon name="info" size={16} />
              </Tooltip>
            </Radio>
            <Radio value="partial" size="small" expand={true}>
              {radioText[0]}
            </Radio>
          </RadioGroup>
        </div>
      )}
      <Button size="small" onClick={handleSubmit}>
        {t('cadence.cadenceControlModal.assignCadenceDropdown.assignStart')}
      </Button>
    </div>
  );
};

//TODO this is duplicated in the components folder
export const AutoAssignDropdown = ({
  activeUserId,
  callback,
  contactBobjects,
  activeBobject,
  children,
  actionsDisabled,
}: AssignCadenceDropdownProps) => {
  const { ref, visible, setVisible } = useVisible();
  const dropdownRef = useRef();
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceControlModal.assignCadenceDropdown',
  });
  const { t: bobjectTypeT } = useTranslation();
  const bobjectType = activeBobject?.id?.typeName as MainBobjectTypes;
  const assignedToValue =
    'assignedTo' in activeBobject
      ? activeBobject?.assignedTo
      : getValueFromLogicRole(activeBobject, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
  const isAssigned = !!assignedToValue;

  useClickAway(dropdownRef, () => {
    setVisible(false);
  });

  const { isSmallDesktop } = useMediaQuery();

  function handleOnClick() {
    if (actionsDisabled) return;
    else if (isAssigned) {
      callback();
    } else {
      setVisible(!visible);
    }
  }
  // The id from this div is important, used for styling purpose
  return (
    <div className={styles._button_wrapper} id="startCadenceButton">
      <Dropdown
        ref={dropdownRef}
        width="100%"
        visible={visible}
        arrow={true}
        anchor={
          children ? (
            <Tooltip
              title={
                actionsDisabled &&
                t('noPermissionsTooltip', { bobjectType: bobjectTypeT(bobjectType.toLowerCase()) })
              }
              position="top"
            >
              {React.cloneElement(children, { onClick: handleOnClick })}
            </Tooltip>
          ) : (
            <Button
              dataTest="Cadence-Start"
              size="small"
              variant="secondary"
              iconLeft="play"
              onClick={() => {
                isAssigned ? callback() : setVisible(!visible);
              }}
            >
              {!isSmallDesktop && t('start')}
            </Button>
          )
        }
      >
        <DropdownContent
          activeUserId={activeUserId}
          activeBobject={activeBobject}
          contactBobjects={contactBobjects}
          setDropdownVisible={setVisible}
          callback={callback}
        />
      </Dropdown>
    </div>
  );
};
