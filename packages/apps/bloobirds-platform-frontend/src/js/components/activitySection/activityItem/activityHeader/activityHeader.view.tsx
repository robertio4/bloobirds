import React from 'react';

import {
  Button,
  CircularBadge,
  Icon,
  IconButton,
  Label,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  CADENCE_TYPES_VALUES_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { checkIsSalesBobject, getReferencedBobject } from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

import { opportunityUrl as createOpportunityUrl } from '../../../../app/_constants/routes';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  BOUNCED_EMAIL_VALUES_LOGIC_ROLE,
  DATA_SOURCES,
  IS_AUTOMATED_EMAIL_VALUES,
  MEETING_MAIN_TYPE_VALUES,
  REPORTED_VALUES_LOGIC_ROLE,
  TYPES_STATUS_VALUES_LOGIC_ROLE,
} from '../../../../constants/activity';
import {
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
} from '../../../../constants/opportunity';
import {
  useActivity,
  useBobjectDetails,
  useEntity,
  useLeads,
  useOpenContactFlow,
  useRouter,
} from '../../../../hooks';
import { useCadences } from '../../../../hooks/useCadences';
import { useLinkedinChatModal } from '../../../../hooks/useLinkedinChatModal';
import {
  getFieldByLogicRole,
  getReferencedBobjectFromLogicRole,
  getRelatedBobjectTypeName,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { replaceVariables } from '../../../../utils/strings.utils';
import { segToTime } from '../../../../utils/time.utils';
import { LeadNameLink } from '../../../bobjectNameLinks/leadName';
import CardIcon from '../../../cardIcon/cardIcon';
import { STEPS } from '../../../contactFlowModal/contactFlowModal.machine';
import OpportunityIcon from '../../../opportunityIcon/opportunityIcon';
import ActivityEmailActions from '../activityEmailActions/activityEmailActions';
import {
  createCallTitle,
  createEmailTitle,
  getActivityUserName,
  getLeadName,
} from '../activityItem.utils';
import ContextMenu from '../contextMenu';
import DateText from '../dateText';
import styles from './activityHeader.module.css';

const OPPORTUNITY_ACTIVITY_TEXT = {
  [TYPES_STATUS_VALUES_LOGIC_ROLE.OPPORTUNITY_CREATED]:
    'Opportunity ##OPPORTUNITY_NAME## created with ##USER_NAME##',
  OPPORTUNITY_STATUS_CLOSED: 'Opportunity ##OPPORTUNITY_NAME## closed',
  [TYPES_STATUS_VALUES_LOGIC_ROLE.NEW_LEAD_ADDED_TO_OPPORTUNITY]:
    'Lead ##LEAD_NAME## added to Opportunity ##OPPORTUNITY_NAME##',
  [TYPES_STATUS_VALUES_LOGIC_ROLE.OPPORTUNITY_STATUS_CHANGED]:
    'Opportunity status changed to ##OPPORTUNITY_STATUS## ##OPPORTUNITY_NAME##',
  [TYPES_STATUS_VALUES_LOGIC_ROLE.OPPORTUNITY_ASSIGNED]:
    '##OPPORTUNITY_NAME## Opportunity assigned to ##ASSIGNED_TO##',
  [TYPES_STATUS_VALUES_LOGIC_ROLE.NEW_LEAD_CREATED]: 'New lead created ##LEAD_NAME##',
  [TYPES_STATUS_VALUES_LOGIC_ROLE.OPPORTUNITY_SALESFORCE_STAGE_CHANGED]:
    'Opportunity salesforce stage changed to ##SALESFORCE_STAGE##',
};

const CADENCE_ACTIVITY_TEXT = {
  [CADENCE_TYPES_VALUES_LOGIC_ROLE.RESCHEDULE]:
    '##USER_NAME## rescheduled the cadence: ##CADENCE_NAME##',
  [CADENCE_TYPES_VALUES_LOGIC_ROLE.CONFIGURE]:
    '##USER_NAME## configured the cadence: ##CADENCE_NAME##',
  [CADENCE_TYPES_VALUES_LOGIC_ROLE.STARTED]: '##USER_NAME## started the cadence: ##CADENCE_NAME##',
  [CADENCE_TYPES_VALUES_LOGIC_ROLE.STOPPED]: '##USER_NAME## stopped the cadence: ##CADENCE_NAME##',
  [CADENCE_TYPES_VALUES_LOGIC_ROLE.ENDED]: 'The cadence: ##CADENCE_NAME## has ended',
};

const MEETING_ACTIVITY_TEXT = {
  [ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING]: 'Meeting arranged ##LEAD_NAME##',
};

const CallActivityHeader = ({ bobject }: { bobject: Bobject<BobjectTypes.Activity> }) => {
  const direction = getTextFromLogicRole(
    bobject,
    ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION,
  ) as typeof ACTIVITY_DIRECTION[keyof typeof ACTIVITY_DIRECTION];
  const isMissed = direction === ACTIVITY_DIRECTION.MISSED;
  const phone = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const callResult = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT);
  const source = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.SOURCE);
  const duration = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION);
  const title = createCallTitle({ direction, phone });
  const callUser = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const users = useEntity('users');
  const cardUser = users?.get(callUser);

  return (
    <>
      <CardIcon name="phone" color={isMissed ? 'tomato' : 'melon'} direction={direction} />
      <div className={styles._titles_container}>
        <p className={styles._main_title}>{title}</p>
        <LeadNameLink bobject={bobject} />
        <OpportunityIcon bobject={bobject} />
        {duration && (
          <div className={styles._duration_wrapper}>
            <Text color="softPeanut" size="s">
              {segToTime(duration)}
            </Text>
          </div>
        )}
        {callResult && (
          <div className={styles._call_result_wrapper}>
            {callResult && <p className={styles._call_result_text}>{callResult}</p>}
          </div>
        )}
        <div className={styles._source_wrapper}>
          <Text className={styles._callCard_body__source} size="s" color="softPeanut">
            {source}
          </Text>
        </div>
        {cardUser && (
          <div className={styles._user_icon}>
            <Tooltip title={`User: ${cardUser?.name}`} position="top">
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
      </div>
    </>
  );
};

const EmailActivityHeader = ({ bobject }: { bobject: Bobject }) => {
  const direction = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const user = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const leadEmail = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_LEAD);
  const subjectEmail = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT);
  const isBouncedEmail =
    getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.IS_BOUNCED_EMAIL)?.valueLogicRole ===
    BOUNCED_EMAIL_VALUES_LOGIC_ROLE.YES;
  const isAutomated =
    getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL)?.valueLogicRole ===
    IS_AUTOMATED_EMAIL_VALUES.YES;
  const title = createEmailTitle({ direction, user, leadEmail, subjectEmail });

  return (
    <>
      <CardIcon
        name={isAutomated ? 'autoMail' : 'mail'}
        color="tangerine"
        direction={isAutomated ? undefined : direction}
      />
      <div className={styles._titles_container}>
        <p className={styles._main_title}>{title}</p>
        <LeadNameLink bobject={bobject} />
        <OpportunityIcon bobject={bobject} />
      </div>
      {isBouncedEmail && (
        <div className={styles._bounced_label}>
          <Label
            color="lightTomato"
            textColor="tomato"
            overrideStyle={{ padding: '4px' }}
            uppercase={false}
          >
            Bounced
          </Label>
        </div>
      )}
    </>
  );
};

const LinkedinActivityHeader = ({ bobject }) => {
  const direction = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const title = `LinkedIn message ${direction === 'Outgoing' ? 'sent' : 'received'}`;
  const source = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.DATA_SOURCE)
    ?.valueLogicRole;
  const { openLinkedinChat } = useLinkedinChatModal();
  const activityLead = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const linkedInActivityUser = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const users = useEntity('users');
  const cardUser = users?.get(linkedInActivityUser);

  return (
    <>
      <CardIcon name="linkedin" color="bloobirds" direction={direction} />
      <div className={styles._titles_container}>
        <p className={styles._main_title}>{title}</p>
        <LeadNameLink bobject={bobject} />
        <OpportunityIcon bobject={bobject} />
        {source === DATA_SOURCES.CHROME_EXTENSION && (
          <div className={styles._button_conversation_container}>
            <Button
              iconLeft="chat"
              variant="secondary"
              size="small"
              uppercase={false}
              onClick={() => openLinkedinChat({ lead: activityLead })}
            >
              View conversation
            </Button>
          </div>
        )}
        {cardUser && (
          <div className={styles._user_icon}>
            <Tooltip title={`User: ${cardUser?.name}`} position="top">
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
      </div>
    </>
  );
};

const MeetingActivityHeader = ({ bobject }) => {
  const typeLogicRole = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
    ?.valueLogicRole;
  const meetingUser = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const meetingType = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);
  const calendarSynced = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.UNIQUE_NYLAS_ID);
  const users = useEntity('users');
  const cardUser = users?.get(meetingUser);
  const headerText = replaceVariables(MEETING_ACTIVITY_TEXT[typeLogicRole], {
    LEAD_NAME: <LeadNameLink bobject={bobject} prefix=" with" />,
  });

  return (
    <>
      <CardIcon name="calendar" color="tomato" />
      <div className={styles._titles_container}>
        <p className={clsx(styles._main_title, styles._meeting_header_text)}>
          <Text size="s" htmlTag="span" weight="bold">
            {headerText}
          </Text>
        </p>
        <OpportunityIcon bobject={bobject} />
        {cardUser && (
          <div className={styles._user_icon}>
            <Tooltip title={`User: ${cardUser?.name}`} position="top">
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
        {meetingType && (
          <Label
            overrideStyle={{
              padding: '3px 4px',
              color: 'var(--peanut)',
              marginLeft: '8px',
            }}
            uppercase={false}
          >
            {meetingType}
          </Label>
        )}
        {calendarSynced && (
          <div className={styles.calendar_icon}>
            <Tooltip
              title="This is an event synced with your calendar, changes on Bloobirds or in your calendar will be automatically synced"
              position="top"
            >
              <Icon name="calendarSync" color="bloobirds" size={18} />
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
};

const NoteActivityHeader = ({ bobject }) => (
  <>
    <CardIcon name="edit" color="banana" />
    <div className={styles._titles_container}>
      <p className={styles._main_title}>Note</p>
      <LeadNameLink bobject={bobject} />
      <OpportunityIcon bobject={bobject} />
    </div>
  </>
);

const CustomTaskActivityHeader = ({ bobject }) => {
  const customTaskField = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const { customTasks } = useCustomTasks({ disabled: true });
  const customTask = customTasks?.find(ct => ct.id === customTaskField.value);
  if (!customTask) {
    return null;
  }
  return (
    <>
      <CardIcon name={customTask.icon} color={customTask.iconColor} />
      <div className={styles._titles_container}>
        <p className={styles._main_title}>
          <Text size="s" htmlTag="span" weight="bold">
            {customTask.name}
          </Text>
        </p>
        <LeadNameLink bobject={bobject} />
        <OpportunityIcon bobject={bobject} />
      </div>
    </>
  );
};

const CadenceActivityHeader = ({ bobject }: { bobject: Bobject<BobjectTypes.Activity> }) => {
  const bobjectTypeName = getRelatedBobjectTypeName(bobject);
  const cadenceId = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CADENCE)?.value;
  const { cadences } = useCadences(bobjectTypeName, true);
  const activityCadence = cadences?.find(cadence => cadence?.id === cadenceId);
  const userName = getActivityUserName(bobject);
  const cadenceTypeLogicRole = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CADENCE_TYPE)
    ?.valueLogicRole;
  const text = CADENCE_ACTIVITY_TEXT[cadenceTypeLogicRole];
  const headerText = replaceVariables(text, {
    CADENCE_NAME: (
      <Text size="s" htmlTag="span" key={activityCadence?.name || uuid()}>
        {activityCadence?.name}
      </Text>
    ),
    USER_NAME: (
      <Text size="s" htmlTag="span" key={userName}>
        {userName}
      </Text>
    ),
  });

  return (
    <>
      <CardIcon name="cadence" color="peanut" />
      <div className={styles._titles_container}>
        <p className={styles._main_title}>
          <Text size="s" htmlTag="span" weight="bold">
            {headerText}
          </Text>
        </p>
      </div>
    </>
  );
};

const InboundActivityHeader = ({ bobject }) => {
  const inboundForm = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.INBOUND_FORM_NAME);
  const inboundFormName = inboundForm ? `from "${inboundForm}"` : '';
  const headerText = replaceVariables(
    'New Inbound activity submitted ##INBOUND_FORM## ##LEAD_NAME##',
    {
      INBOUND_FORM: (
        <Text size="s" htmlTag="span">
          {inboundFormName}
        </Text>
      ),
      LEAD_NAME: <LeadNameLink bobject={bobject} />,
    },
  );

  return (
    <>
      <CardIcon name="download" color="banana" />
      <div className={styles._titles_container}>
        <p className={clsx(styles._main_title, styles._inbound_header_text)}>
          <Text size="s" htmlTag="span" weight="bold">
            {headerText}
          </Text>
          <OpportunityIcon bobject={bobject} />
        </p>
      </div>
    </>
  );
};

const CompanyStatusActivityHeader = ({ bobject }: { bobject: Bobject<BobjectTypes.Activity> }) => {
  const title = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.STATUS_TITLE);
  const dataSource = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.SOURCE);
  const dataSourceName =
    dataSource?.valueLogicRole === DATA_SOURCES.WEB_APP
      ? 'bloobirds automation or user direct update'
      : dataSource?.text;

  return (
    <>
      <CardIcon name="company" color="darkGray" />
      <div className={styles._titles_container}>
        <p className={styles._main_title}>{title}</p>
        <LeadNameLink bobject={bobject} />
        <OpportunityIcon bobject={bobject} />
        {dataSourceName && (
          <Tooltip title={'This change has been made by ' + dataSourceName} position="top">
            <Icon name="infoFilled" size={20} color="softPeanut" />
          </Tooltip>
        )}
      </div>
    </>
  );
};

const OpportunityStatusActivityHeader = ({ bobject, opportunity }) => {
  const { history } = useRouter();
  const userName = getActivityUserName(bobject);
  const leadName = getLeadName(bobject);
  const opportunityName = getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  const salesforceStage = getTextFromLogicRole(
    opportunity,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.SALESFORCE_OPPORTUNITY_STAGE,
  );
  const dataSource = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.SOURCE);
  const dataSourceName =
    dataSource?.valueLogicRole === DATA_SOURCES.WEB_APP
      ? 'bloobirds automation or user direct update'
      : dataSource?.text;
  const opportunityStatusChangeTo = getFieldByLogicRole(
    bobject,
    ACTIVITY_FIELDS_LOGIC_ROLE.CHANGED_TO,
  );
  const opportunityStatus = getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS);
  const opportunityAssignedTo = getTextFromLogicRole(
    opportunity,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  );
  let typeStatus = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.STATUS_TYPE)
    ?.valueLogicRole;
  const { openBobjectDetails } = useBobjectDetails();

  if (
    typeStatus === TYPES_STATUS_VALUES_LOGIC_ROLE.OPPORTUNITY_STATUS_CHANGED &&
    (opportunityStatus?.valueLogicRole === OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST ||
      opportunityStatus?.valueLogicRole === OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON)
  ) {
    typeStatus = 'OPPORTUNITY_STATUS_CLOSED';
  }

  const handleOpportunityClick = () => {
    const companyField = getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY);
    const companyId = companyField.value.split('/')[2];
    const opportunityId = opportunity.id.objectId;
    const opportunityUrl = createOpportunityUrl(companyId, opportunityId);
    document.querySelector('#content').scroll({ top: 0, behavior: 'smooth' });
    history.push(opportunityUrl);
  };

  const handleLeadClick = () => {
    const activityLead = getReferencedBobjectFromLogicRole(
      bobject,
      ACTIVITY_FIELDS_LOGIC_ROLE.LEAD,
    );
    openBobjectDetails({ id: activityLead?.id.value, showContactButton: true });
  };

  const title = replaceVariables(OPPORTUNITY_ACTIVITY_TEXT[typeStatus], {
    OPPORTUNITY_NAME: (
      <span className={styles._link_wrapper} onClick={handleOpportunityClick}>
        <Text size="s" htmlTag="span" color="bloobirds">
          {opportunityName}
        </Text>
      </span>
    ),
    SALESFORCE_STAGE: (
      <Text size="s" htmlTag="span">
        {salesforceStage}
      </Text>
    ),
    OPPORTUNITY_STATUS: (
      <Text size="s" htmlTag="span">
        {opportunityStatusChangeTo?.text}
      </Text>
    ),
    USER_NAME: (
      <Text size="s" htmlTag="span">
        {userName}
      </Text>
    ),
    LEAD_NAME: (
      <span className={styles._link_wrapper} onClick={handleLeadClick}>
        <Text size="s" htmlTag="span" color="bloobirds">
          {leadName}
        </Text>
      </span>
    ),
    ASSIGNED_TO: (
      <Text size="s" htmlTag="span">
        {opportunityAssignedTo}
      </Text>
    ),
  });

  return (
    <>
      <CardIcon name="fileOpportunity" color="darkGray" />
      <div className={styles._titles_container}>
        <p className={clsx(styles._main_title, styles._opp_status_header_text)}>
          <Text size="s" htmlTag="span" weight="bold">
            {title}
          </Text>
        </p>
        {dataSourceName && (
          <Tooltip title={'This change has been made by ' + dataSourceName} position="top">
            <Icon name="infoFilled" size={20} color="softPeanut" />
          </Tooltip>
        )}
      </div>
    </>
  );
};

const LeftActivityHeader = ({
  type,
  bobject,
}: {
  type: typeof ACTIVITY_TYPES_VALUES_LOGIC_ROLE[keyof typeof ACTIVITY_TYPES_VALUES_LOGIC_ROLE];
  bobject: Bobject<BobjectTypes.Activity>;
}) => {
  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL) {
    return <CallActivityHeader bobject={bobject} />;
  }

  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL) {
    return <EmailActivityHeader bobject={bobject} />;
  }

  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN) {
    return <LinkedinActivityHeader bobject={bobject} />;
  }

  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING) {
    return <MeetingActivityHeader bobject={bobject} />;
  }

  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE) {
    return <NoteActivityHeader bobject={bobject} />;
  }

  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND) {
    return <InboundActivityHeader bobject={bobject} />;
  }
  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE) {
    return <CadenceActivityHeader bobject={bobject} />;
  }

  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK) {
    return <CustomTaskActivityHeader bobject={bobject} />;
  }

  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS) {
    const opportunityField = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY);
    const activityTypeStatus = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.STATUS_TYPE)
      ?.valueLogicRole;
    const opportunity = opportunityField?.referencedBobject;
    if (
      opportunity &&
      (activityTypeStatus?.includes('OPPORTUNITY') ||
        activityTypeStatus === TYPES_STATUS_VALUES_LOGIC_ROLE.NEW_LEAD_CREATED)
    ) {
      return <OpportunityStatusActivityHeader bobject={bobject} opportunity={opportunity} />;
    }
    return <CompanyStatusActivityHeader bobject={bobject} />;
  }

  return null;
};

const getCallStep = (bobject: Bobject, isCall: boolean) => {
  const callResult = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT)
    ?.valueLogicRole;
  const referenceBobject = getReferencedBobject(bobject);
  const isReferencedBobjectInSales = checkIsSalesBobject(referenceBobject);
  if (callResult || !isCall) {
    return isReferencedBobjectInSales ? STEPS.SALES_CHANGE_STATUS : STEPS.CHANGE_STATUS;
  } else {
    return isReferencedBobjectInSales ? STEPS.CALL_RESULTS_OPP : STEPS.CALL_RESULTS;
  }
};

const ActivityHeader = ({
  bobject,
  hovered,
}: {
  bobject: Bobject<BobjectTypes.Activity>;
  hovered: boolean;
}) => {
  const { openWizard } = useWizardContext();
  const { openAtStep } = useOpenContactFlow();
  const { updateActivity } = useActivity('activityCard');
  const { updateSingleLead } = useLeads('contactFlow');
  const date = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const typeDesc = getTextFromLogicRole(
    bobject,
    ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
  ) as typeof ACTIVITY_TYPES[keyof typeof ACTIVITY_TYPES];
  const type = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
    ?.valueLogicRole as typeof ACTIVITY_TYPES_VALUES_LOGIC_ROLE[keyof typeof ACTIVITY_TYPES_VALUES_LOGIC_ROLE];
  const isIncomingActivity =
    getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION) ===
    ACTIVITY_DIRECTION.INCOMING;
  const isPinned = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.IS_PINNED) === 'Yes';
  const { createToast } = useToasts();
  const activityLead = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.value;
  const cadenceTypeLogicRole = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CADENCE_TYPE)
    ?.valueLogicRole;
  const showActionBar = hovered && type !== ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS;
  const showReportResult =
    (isIncomingActivity && type !== ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND) ||
    type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING ||
    type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  const isReported = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED) === 'Yes';
  const { setPinned } = useActivity('activityCard');
  const step = getCallStep(bobject, type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL);
  const meetingType = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);
  const isFirstMeeting =
    meetingType?.valueLogicRole === MEETING_MAIN_TYPE_VALUES.FIRST_MEETING ||
    !meetingType?.valueLogicRole;

  const markAsReported = () => {
    updateActivity(bobject?.id.objectId, {
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
    })
      .then(() => {})
      .then(() => {
        createToast({ message: 'Meeting successfully reported', type: 'success' });
      });
  };

  const ReportedButton = () =>
    isReported ? (
      <div data-test="Icon-ThumbsUp" className={styles._button_reported_container}>
        <Icon name="thumbsUp" color="melon" size={16} />
      </div>
    ) : (
      <div className={styles._button_report_container}>
        <Button
          dataTest="Activity-ReportResult"
          variant="secondary"
          size="small"
          iconLeft="thumbsUp"
          onClick={() => {
            if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING) {
              if (!isFirstMeeting) {
                markAsReported();
              } else {
                openWizard(WIZARD_MODALS.MEETING_RESULT, bobject);
              }
            } else {
              updateSingleLead(activityLead?.split('/')[2]);
              openAtStep(bobject?.id.objectId, step, 'REPORT_RESULT');
            }
          }}
        >
          {type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING && isFirstMeeting
            ? 'Report result'
            : 'Mark as done'}
        </Button>
      </div>
    );

  return (
    <header className={styles._header}>
      <div className={styles._header_left}>
        <LeftActivityHeader type={type} bobject={bobject} />
      </div>
      <div className={styles._header_right}>
        {showActionBar && <ActivityEmailActions bobject={bobject} />}
        {date && <DateText date={date} />}
        {showReportResult && <ReportedButton />}
        {type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE &&
          cadenceTypeLogicRole === CADENCE_TYPES_VALUES_LOGIC_ROLE.ENDED && (
            <Button
              dataTest="Cadence-Update"
              variant="secondary"
              size="small"
              onClick={() => {
                openAtStep(bobject?.id.objectId, STEPS.CHANGE_STATUS, 'UPDATE_CADENCE');
              }}
            >
              Update
            </Button>
          )}
        {isPinned && (
          <div className={styles._button_pinned_container}>
            <IconButton
              name="pin"
              onClick={() => setPinned(bobject.id.objectId, isPinned, typeDesc)}
              color="softPeanut"
              size={20}
            />
          </div>
        )}
        {type !== ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE &&
          type !== ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS && <ContextMenu bobject={bobject} />}
      </div>
    </header>
  );
};

export default ActivityHeader;
