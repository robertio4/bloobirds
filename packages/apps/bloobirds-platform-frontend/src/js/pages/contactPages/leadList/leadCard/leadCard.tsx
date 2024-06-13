import React, { useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardLeft,
  CardRight,
  CircularBadge,
  ColorType,
  Dropdown,
  Icon,
  IconButton,
  IconType,
  Item,
  Label,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';
import { formatDateAsText } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import BobjectName from '../../../../components/bobjectName';
import useChangeStatus from '../../../../components/changeStatusModal/useChangeStatus';
import { SalesLabel } from '../../../../components/salesLabel/salesLabel';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_HIGH_PRIORITY_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
} from '../../../../constants/lead';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  useBobjectDetails,
  useCadenceControl,
  useDialerVisibility,
  useEntity,
  useHover,
  useLeads,
  useQueryStringState,
  useRouter,
} from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useHasCadenceStarted } from '../../../../hooks/useHasCadenceStarted';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { useSelectedLead } from '../../../../hooks/useSelectedLead';
import { BobjectApi } from '../../../../misc/api/bobject';
import { Bobject, BobjectField } from '../../../../typings/bobjects';
import {
  getFieldsByLogicRoles,
  getOpportunityNamesFromLead,
  getOpportunityNamesTitle,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { isOpportunityPage } from '../../../../utils/pages.utils';
import { AutoAssignCadenceDropdown } from '../../components/autoAssignCadenceDropdown';
import { useContactBobjects } from '../../contactPageContext';
import styles from './leadCard.module.css';

const FIELDS_TO_RENDER = Object.seal({
  attempts: {
    singular: '',
    plural: '',
    icon: 'check',
    color: '' as ColorType,
  },
  touches: {
    singular: '',
    plural: '',
    icon: 'checkDouble',
    color: 'bloobirds' as ColorType,
  },
  date: {
    icon: 'calendar',
    color: '' as ColorType,
  },
});

const {
  ASSIGNED_TO,
  HIGH_PRIORITY,
  FULL_NAME,
  SALES_STATUS,
  STAGE,
  STATUS,
  OPT_OUT,
} = LEAD_FIELDS_LOGIC_ROLE;

const REQUIRED_FIELDS = [
  ASSIGNED_TO,
  HIGH_PRIORITY,
  FULL_NAME,
  SALES_STATUS,
  STAGE,
  STATUS,
  OPT_OUT,
];

function LeadCardField({
  value,
  fieldName,
  size,
  onCadenceHovered,
  tooltipText,
  onCadenceSettings,
}: {
  value: any;
  fieldName: keyof typeof FIELDS_TO_RENDER;
  size?: string;
  onCadenceHovered?: any;
  tooltipText: string;
  onCadenceSettings?: any;
}) {
  const stopped = fieldName.includes('inactive');

  return (
    <div
      className={styles._field}
      onClick={onCadenceHovered ? () => onCadenceSettings() : () => {}}
    >
      {fieldName.includes('Cadence') ? (
        <span
          data-test={stopped ? 'Dot-Cadence-Grey' : 'Dot-Cadence-Green'}
          className={clsx(styles._status, {
            [styles._status_started]: !stopped,
          })}
        />
      ) : (
        <Icon
          name={FIELDS_TO_RENDER[fieldName]?.icon as IconType}
          color={(FIELDS_TO_RENDER[fieldName]?.color || 'softPeanut') as ColorType}
          size={16}
        />
      )}
      <Tooltip title={tooltipText} position={!!tooltipText && 'top'}>
        <Text
          dataTest={`Lead ${fieldName} count`}
          size={size || 'xs'}
          color={stopped ? 'softPeanut' : 'peanut'}
          ellipsis={20}
        >
          {value}
        </Text>
      </Tooltip>
      {onCadenceHovered && (
        <div className={styles._gear_icon} onClick={() => onCadenceSettings()}>
          <Icon dataTest="Cadence-Gear" name="settings" size={16} />
        </div>
      )}
    </div>
  );
}

const patchOpp = (oppId: string, data: { [x: number]: any }) =>
  BobjectApi.request().bobjectType('Opportunity').partialSet({ bobjectId: oppId, data });

const LeadCard = ({
  lead,
  openAddQcToLeadModal,
}: {
  lead: Bobject;
  openAddQcToLeadModal: () => void;
}) => {
  const users = useEntity('users');
  const idealCustomerProfiles = useEntity('idealCustomerProfiles');
  const leadCadenceName = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.CADENCE);
  const [leadICP, setLeadICP] = useState(
    idealCustomerProfiles?.get(getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP)),
  );
  const [divRef, isHover] = useHover();

  const { ref, visible, setVisible } = useVisible(false);
  const { ref: dropdownRef, visible: dropdownVisible, setVisible: setDropdownVisible } = useVisible(
    false,
  );
  const { selectedLead, updateSelectedLead } = useSelectedLead();
  const { isOpen: isDialerOpen } = useDialerVisibility();
  const [, setUrlLeadId] = useQueryStringState('leadId');
  const { isSmallDesktop, isMediumDesktop } = useMediaQuery();
  const isSmallOrMediumDesktop = isSmallDesktop || isMediumDesktop;
  const isDialerOpenInSmallDesktop = isDialerOpen && (isSmallDesktop || isMediumDesktop);
  const { openChangeStatusModal } = useChangeStatus();
  const { patchLead } = useLeads();
  const { openCadenceControl } = useCadenceControl();
  const { openBobjectDetails } = useBobjectDetails();
  const { pathname } = useRouter();
  const isOppPage = isOpportunityPage(pathname);
  const contactBobjects = useContactBobjects();
  const fields = lead && getFieldsByLogicRoles(lead, REQUIRED_FIELDS);

  const {
    [ASSIGNED_TO]: leadAssignedTo = {},
    [HIGH_PRIORITY]: leadHighPriority = {},
    [FULL_NAME]: leadName = {},
    [SALES_STATUS]: leadSalesStatus = {},
    [STAGE]: leadStage = {},
    [STATUS]: leadProspectStatus = {},
    [OPT_OUT]: optOutField = {},
  }: { [x: string]: BobjectField | object } = fields || {};
  const leadRole = contactBobjects?.active?.fields?.find(
    (field: BobjectField) => field?.value === lead?.id?.value,
  )?.logicRole;
  const { t } = useTranslation();
  const removeFromOppDisabled = leadRole === OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT;
  const { hasStarted } = useHasCadenceStarted(lead);
  const numberOfAttempts = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_COUNT);
  const numberOfTouches = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.TOUCHES_COUNT);
  const lastAttempt = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY, true);
  const lastTouch = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.TOUCHES_LAST_DAY, true);
  const leadLinkedInUrl = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL);
  const leadSalesNavUrl = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.SALES_NAV_URL);
  const cardUser = users?.get(leadAssignedTo?.value);
  const leadIsHighPriority = leadHighPriority?.valueLogicRole === LEAD_HIGH_PRIORITY_LOGIC_ROLE.YES;
  const leadLinkedinRole = getValueFromLogicRole(
    lead,
    LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_JOB_TITLE,
    true,
  );
  const handleCadenceControl = () =>
    openCadenceControl({
      bobjectToSet: lead,
      previousStep: false,
      ...(hasStarted ? {} : { step: 'CONFIGURE_CADENCE' }),
    });

  const hasSalesEnabled = useFullSalesEnabled();
  const leadIsInSalesStage = leadStage?.valueLogicRole === LEAD_STAGE_LOGIC_ROLE.SALES;
  const leadStatus = leadIsInSalesStage ? leadSalesStatus : leadProspectStatus;
  const { opportunities } = useContactBobjects();

  useLayoutEffect(() => {
    if (idealCustomerProfiles && !leadICP) {
      setLeadICP(
        idealCustomerProfiles.get(getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP)),
      );
    }
  }, [idealCustomerProfiles, leadICP]);

  const handlePriorizeLead = () => {
    patchLead(lead?.id?.objectId, {
      [LEAD_FIELDS_LOGIC_ROLE.HIGH_PRIORITY]: leadIsHighPriority
        ? null
        : LEAD_HIGH_PRIORITY_LOGIC_ROLE.YES,
    });
  };

  const handleRemoveFromOpp = () => {
    patchOpp(contactBobjects?.active?.id?.objectId, {
      [lead?.contactRole]: null,
    });
  };

  const opportunityNames = useMemo(() => {
    return getOpportunityNamesFromLead(opportunities, lead);
  }, []);

  return (
    <div
      ref={divRef}
      className={clsx(styles._card__container, {
        [styles._container__selected]: selectedLead?.id?.value === lead?.id?.value,
        [styles._container__selected_sales]:
          selectedLead?.id?.value === lead?.id?.value && leadIsInSalesStage && hasSalesEnabled,
        [styles._container__selected_prospect]:
          selectedLead?.id?.value === lead?.id?.value && !leadIsInSalesStage && hasSalesEnabled,
        [styles._container__hovered]: isHover,
        [styles._container__clickable]: isHover,
      })}
    >
      <Card
        onClick={() => {
          setUrlLeadId(lead?.id?.value);
          updateSelectedLead(lead);
        }}
      >
        <CardHeader>
          <CardLeft>
            {leadICP ? (
              <Tooltip title={leadICP.name} trigger="hover" position="top">
                <CircularBadge
                  size="m"
                  style={{
                    backgroundColor: leadICP?.color || 'var(--verySoftPeanut)',
                    height: '30px',
                    width: '30px',
                    color: 'white',
                  }}
                >
                  {leadICP?.shortname ||
                    getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL) ||
                    ''}
                </CircularBadge>
              </Tooltip>
            ) : (
              <CircularBadge
                size="m"
                style={{
                  backgroundColor: 'var(--verySoftPeanut)',
                  color: 'white',
                  height: '30px',
                  width: '30px',
                  fontSize: 20,
                }}
              >
                ?
              </CircularBadge>
            )}
          </CardLeft>
          <CardBody>
            <div
              className={styles._name__wrapper}
              style={{ width: isSmallDesktop ? '160px' : isMediumDesktop ? '206px' : '255px' }}
            >
              <div
                className={styles._name__container}
                style={{ maxWidth: isSmallDesktop ? '160px' : isMediumDesktop ? '206px' : '255px' }}
              >
                <BobjectName
                  ellipsisChar={isSmallDesktop ? 15 : isMediumDesktop ? 20 : 25}
                  field={leadName}
                  bobject={lead}
                  type={BobjectTypes.Lead}
                />
                <Text
                  size="xs"
                  color="softPeanut"
                  ellipsis={isHover ? 20 : isSmallDesktop ? 20 : isMediumDesktop ? 35 : 40}
                  className={clsx(styles.jobTitle, {
                    [styles.jobTitle__small]: isSmallOrMediumDesktop,
                  })}
                >
                  {leadLinkedinRole}
                </Text>
              </div>{' '}
              {isHover && (
                <div className={styles._preview__button__wrapper}>
                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      openBobjectDetails({ id: lead?.id.value });
                    }}
                    size="small"
                    variant="secondary"
                    uppercase={false}
                    iconLeft={isSmallOrMediumDesktop && 'eye'}
                  >
                    {isSmallOrMediumDesktop ? '' : 'Preview'}
                  </Button>
                </div>
              )}
            </div>
            <div className={clsx(styles._counts__container, styles._s_hidden)}>
              <LeadCardField
                value={`${parseInt(numberOfAttempts, 10) || 0} ${
                  numberOfAttempts === 1
                    ? FIELDS_TO_RENDER.attempts.singular
                    : FIELDS_TO_RENDER.attempts.plural
                }`}
                fieldName="attempts"
                tooltipText="Number of attempts"
              />
              <LeadCardField
                value={`${parseInt(numberOfTouches, 10) || 0} ${
                  numberOfTouches === 1
                    ? FIELDS_TO_RENDER.touches.singular
                    : FIELDS_TO_RENDER.touches.plural
                }`}
                fieldName="touches"
                tooltipText="Number of touches"
              />
            </div>
            <div className={clsx(styles._dates__container, styles._m_hidden)}>
              <LeadCardField
                value={formatDateAsText({
                  text: lastAttempt,
                  patternFormat: isSmallDesktop
                    ? '{month-short} {date}'
                    : '{month-short} {date} {year}',
                  t,
                })}
                fieldName="date"
                tooltipText="Last attempt"
              />
              <LeadCardField
                value={formatDateAsText({
                  text: lastTouch,
                  patternFormat: isSmallDesktop
                    ? '{month-short} {date}'
                    : '{month-short} {date} {year}',
                  t,
                })}
                fieldName="date"
                tooltipText="Last touch"
              />
            </div>
            {!isDialerOpenInSmallDesktop && (
              <div className={styles._cadence_container}>
                {(isHover || dropdownVisible) && !hasStarted ? (
                  <Dropdown
                    ref={dropdownRef}
                    width="100%"
                    visible={dropdownVisible}
                    arrow={true}
                    anchor={
                      <Button
                        iconLeft="playOutline"
                        size="small"
                        variant="secondary"
                        onClick={e => {
                          e.stopPropagation();
                          leadAssignedTo?.value
                            ? handleCadenceControl()
                            : setDropdownVisible(!dropdownVisible);
                        }}
                      >
                        Start
                      </Button>
                    }
                  >
                    <AutoAssignCadenceDropdown
                      bobject={lead}
                      setDropdownVisible={setDropdownVisible}
                    />
                  </Dropdown>
                ) : (
                  <LeadCardField
                    value={leadCadenceName || 'No active Cadence'}
                    fieldName={hasStarted ? 'activeCadenceName' : 'inactiveCadenceName'}
                    size="s"
                    onCadenceHovered={isHover}
                    onCadenceSettings={handleCadenceControl}
                    tooltipText={leadCadenceName ?? 'No active cadence'}
                  />
                )}
              </div>
            )}
          </CardBody>
          <CardRight>
            {!isDialerOpenInSmallDesktop && (
              <>
                <div className={clsx(styles._m_hidden, styles._icons__wrapper)}>
                  {opportunityNames && opportunityNames?.length > 0 && (
                    <div className={styles._icon__container}>
                      <Tooltip title={getOpportunityNamesTitle(opportunityNames)} position="top">
                        <Icon name="fileOpportunity" size={18} color="softPeanut" />
                      </Tooltip>
                    </div>
                  )}
                  {leadIsHighPriority && (
                    <div className={styles._icon__container}>
                      <Tooltip title="High priority lead" position="top">
                        <Icon name="zap" size={18} color="banana" />
                      </Tooltip>
                    </div>
                  )}
                  {leadLinkedInUrl || leadSalesNavUrl ? (
                    <div
                      className={styles._icon__container}
                      onClick={() => window.open(leadLinkedInUrl || leadSalesNavUrl, '_blank')}
                    >
                      <Tooltip
                        title={`Open lead in ${leadLinkedInUrl ? 'Linkedin' : 'Sales Navigator'}`}
                        position="top"
                      >
                        <Icon name="linkedin" size={18} />
                      </Tooltip>
                    </div>
                  ) : (
                    <div
                      className={styles._icon__container}
                      onClick={() =>
                        window.open(
                          'https://linkedin.com/search/results/all/?keywords=' +
                            leadName?.value +
                            '&origin=GLOBAL_SEARCH_HEADER&sid=Y5G',
                          '_blank',
                        )
                      }
                    >
                      {/* linkedin.com/search/results/all/?keywords=pol%20garrido&origin=GLOBAL_SEARCH_HEADER&sid=Y5G*/}
                      <Tooltip title={`Search lead on Linkedin`} position="top">
                        <Icon name="linkedin" size={18} color="softPeanut" />
                      </Tooltip>
                    </div>
                  )}
                </div>
                {hasSalesEnabled && (
                  <div
                    className={clsx(styles._status__container, {
                      [styles._s_hidden]: isSmallDesktop,
                    })}
                  >
                    <SalesLabel isSalesStage={leadIsInSalesStage} contracted />
                  </div>
                )}
                <div
                  className={clsx(styles._status__container, {
                    [styles._s_hidden]: isSmallDesktop,
                  })}
                >
                  <Label
                    dataTest={leadStatus?.logicRole}
                    overrideStyle={{
                      backgroundColor: leadStatus?.valueBackgroundColor,
                      color: leadStatus?.valueTextColor,
                      borderColor: leadStatus?.valueOutlineColor,
                    }}
                    hoverStyle={{
                      backgroundColor: leadStatus?.valueBackgroundColor,
                      color: leadStatus?.valueTextColor,
                      borderColor: leadStatus?.valueOutlineColor,
                      opacity: '65%',
                    }}
                    onClick={() => {
                      mixpanel.track(MIXPANEL_EVENTS.CHANGE_LEAD_STATUS_MODAL_OPENED, {
                        'From pill': true,
                      });
                      openChangeStatusModal(lead);
                    }}
                  >
                    {leadStatus?.text}
                  </Label>
                </div>
                {leadAssignedTo && cardUser && (
                  <div className={styles._icon__container}>
                    <Tooltip title={cardUser?.name} position="top">
                      <CircularBadge
                        size="s"
                        color="lightPeanut"
                        style={{ color: 'var(--white)', fontSize: '9px' }}
                        backgroundColor={cardUser?.color || 'lightPeanut'}
                      >
                        {cardUser?.shortname || 'U'}
                      </CircularBadge>
                    </Tooltip>
                  </div>
                )}
              </>
            )}
            <Dropdown
              ref={ref}
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
                  event.stopPropagation();
                  setVisible(false);
                  handlePriorizeLead();
                }}
              >
                <Icon name="zap" size={14} />{' '}
                <Text size="s" inline className={styles._lead_dropdown_element}>
                  {leadIsHighPriority ? 'Unmark as High priority' : 'Mark as High priority'}
                </Text>
              </Item>
              <Item
                onClick={(v, e) => {
                  e.stopPropagation();
                  setVisible(false);
                  openAddQcToLeadModal();
                }}
              >
                <Icon name="deliver" size={14} />{' '}
                <Text size="s" inline className={styles._lead_dropdown_element}>
                  Assign to other company
                </Text>
              </Item>
              <Item
                onClick={(value, event) => {
                  event.stopPropagation();
                  mixpanel.track(MIXPANEL_EVENTS.CHANGE_LEAD_STATUS_MODAL_OPENED, {
                    'From pill': false,
                  });
                  setVisible(false);
                  openChangeStatusModal(lead);
                }}
              >
                <Icon name="edit" size={14} />{' '}
                <Text size="s" inline className={styles._lead_dropdown_element}>
                  Change status
                </Text>
              </Item>
              {isOppPage && (
                <Tooltip
                  position="top"
                  title={
                    removeFromOppDisabled &&
                    'You cannot remove the Primary contact from the opportunity'
                  }
                >
                  <Item
                    disabled={removeFromOppDisabled}
                    onClick={(v, e) => {
                      if (!removeFromOppDisabled) {
                        handleRemoveFromOpp();
                        e.stopPropagation();
                        setVisible(false);
                      }
                    }}
                  >
                    <Icon name="cross" size={14} color="tomato" />
                    <Text
                      size="s"
                      inline
                      className={styles._lead_dropdown_element}
                      color={removeFromOppDisabled ? 'verySoftPeanut' : 'peanut'}
                    >
                      Remove from Opportunity
                    </Text>
                  </Item>
                </Tooltip>
              )}
            </Dropdown>
          </CardRight>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LeadCard;
