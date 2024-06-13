import React, { Fragment, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  Button,
  CardBody,
  CardButton,
  CardContent,
  CardHeader,
  CardHoverButtons,
  CardLeft,
  CardRight,
  CircularBadge,
  Icon,
  IconButton,
  Label,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectField } from '@bloobirds-it/types';
import { getTextFromLogicRole, isHtml } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import {
  APP_CL_COMPANIES,
  companyUrl,
  leadUrl,
  opportunityUrl,
} from '../../../app/_constants/routes';
import { getLeadName } from '../../../components/activitySection/activityItem/activityItem.utils';
import DateText from '../../../components/activitySection/activityItem/dateText';
import { DateGroupHeader } from '../../../components/activitySection/activityList/activityList.view';
import AddLeadToActivityModal from '../../../components/addLeadToActivityModal';
import { CompanyNameLink } from '../../../components/bobjectNameLinks/companyName';
import { LeadNameLink } from '../../../components/bobjectNameLinks/leadName';
import BulkActionToast from '../../../components/bulkActionToast/bulkActionToast';
import CardIcon from '../../../components/cardIcon/cardIcon';
import { STEPS } from '../../../components/contactFlowModal/contactFlowModal.machine';
import { InboxBulkActionsTooltip } from '../../../components/discoveryTooltips/inboxTourTooltips/inboxBulkActionsTooltip';
import { InboxCardsTooltip } from '../../../components/discoveryTooltips/inboxTourTooltips/inboxCardsTooltip';
import { NoInboxCardsTooltip } from '../../../components/discoveryTooltips/inboxTourTooltips/noInboxCardsTooltip';
import OpportunityIcon from '../../../components/opportunityIcon/opportunityIcon';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { MIXPANEL_EVENTS } from '../../../constants/mixpanel';
import { useEntity, useOpenContactFlow, useRouter } from '../../../hooks';
import { useActivityDone } from '../../../hooks/useActivity';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import SubhomeCard from '../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import SubhomeEmptyContent from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { isUrl } from '../../../misc/utils';
import { addActivityDateGrouping } from '../../../utils/activities.utils';
import { api } from '../../../utils/api';
import {
  ActivityParentsInterface,
  getActivityParents,
  getFieldByLogicRole,
  getObjectIdFromId,
  getValueFromLogicRole,
} from '../../../utils/bobjects.utils';
import { segToTime } from '../../../utils/time.utils';
import { DateExtendedBobject } from '../../subhomePages/salesPage/meetings/meetingsContent';
import styles from '../inboxPage.module.css';
import { NewCallsFilters } from './newCallsFilters';
import { NewCallsFooter } from './newCallsFooter';
import { useInboxActivitiesCalls, useInboxCallsPage } from './useInboxCalls';

type CallDirectionKeys = keyof typeof ACTIVITY_DIRECTION;
type CallDirection = typeof ACTIVITY_DIRECTION[CallDirectionKeys];

const callDirectionText = ({ direction, phone }: { direction: CallDirection; phone: string }) => {
  if (phone) {
    if (direction === 'Outgoing') {
      return ` to ${phone}`;
    }
    if (direction === 'Incoming' || direction === 'Missed') {
      return ` from ${phone}`;
    }
  }
  return '';
};

const getActivityUrl = ({
  lead,
  company,
  opportunity,
}: Record<'lead' | 'company' | 'opportunity', BobjectField>) => {
  if (lead) {
    return company?.value
      ? `${APP_CL_COMPANIES}/${getObjectIdFromId(company.value)}?leadId=${getObjectIdFromId(
          lead.value,
        )}`
      : `/app/cl/leads/${getObjectIdFromId(lead.value)}`;
  }
  if (opportunity && company) {
    return `/app/cl/companies/${getObjectIdFromId(company.value)}/opportunities/${getObjectIdFromId(
      opportunity.value,
    )}`;
  }
  if (company) {
    return `/app/cl/companies/${getObjectIdFromId(company.value)}`;
  }
  return '';
};

interface CallCardProps {
  call: Bobject;
  showNextLine: boolean;
  handleOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setSelectedCall: React.Dispatch<SetStateAction<Bobject>>;
}

const CallCard = ({ call, showNextLine, handleOpenModal, setSelectedCall }: CallCardProps) => {
  const { createToast } = useToasts();
  const hasSalesEnabled = useFullSalesEnabled();
  const direction = getTextFromLogicRole(
    call,
    ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION,
  ) as CallDirection;
  const callSID = getTextFromLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.SID);
  const phone = getTextFromLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const callSource = getTextFromLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.SOURCE);
  const directionText = callDirectionText({
    direction,
    phone,
  });
  const date = getTextFromLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const duration = getValueFromLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION);
  const note = getValueFromLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const noteToShow = isHtml(note) ? <div dangerouslySetInnerHTML={{ __html: note }} /> : note;
  const isReported =
    getFieldByLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED).valueLogicRole ===
    REPORTED_VALUES_LOGIC_ROLE.YES;
  const recordCall = getTextFromLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);
  const isMissed = direction === ACTIVITY_DIRECTION.MISSED;
  const { history } = useRouter();
  const { openAtStep } = useOpenContactFlow();
  const leadName = getLeadName(call);
  const activityCompany = getFieldByLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityLead = getFieldByLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const isAccountAdmin = useIsAccountAdmin();
  const callUser = getValueFromLogicRole(call, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const users = useEntity('users');
  const cardUser = users?.get(callUser);

  const handleOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (activityOpportunity) {
      const url = opportunityUrl(
        hasSalesEnabled ? undefined : activityCompany?.id.objectId,
        activityOpportunity?.id.objectId,
      );
      history.push(url, { event: e });
    } else if (activityLead) {
      const url = leadUrl(activityLead, activityCompany);
      history.push(url, { event: e });
    } else if (activityCompany) {
      const url = companyUrl(activityCompany);
      history.push(url, { event: e });
    }
  };

  const getSignedCallRecordingUrl = async () => {
    const oldRecordingRegex = /^(https:\/\/record-calls.bloobirds.com\/)(.{34})/g;
    let callSid = recordCall;
    const itsADeprecatedRecordingLink = recordCall?.match(oldRecordingRegex);
    if (!itsADeprecatedRecordingLink && isUrl(recordCall)) {
      return recordCall;
    }
    if (recordCall && itsADeprecatedRecordingLink) {
      callSid = recordCall.split('/').at(-1);
    } else {
      callSid = recordCall.split('/')[1];
    }
    const signedUrl = await api.get(`/calls/whiteLabel/calls/${callSid}/recording`);
    if (signedUrl.status === 200) {
      return signedUrl.data.url;
    } else {
      throw new Error('Failed to get signed url');
    }
  };

  return (
    <SubhomeCard
      hasNextCard={showNextLine}
      key={callSID}
      onClick={e => handleOnClick(e)}
      dataTest={`call-card-${callSID}`}
    >
      <CardHeader>
        <CardLeft>
          <CardIcon name="phone" color={isMissed ? 'tomato' : 'melon'} direction={direction} />
        </CardLeft>
        <CardBody>
          <Text size="s" weight="bold" className={styles._callCard_body__text}>
            {direction} call
          </Text>
          {directionText && (
            <div
              onClick={event => {
                event.stopPropagation();
                event.preventDefault();
              }}
            >
              <Text className={styles._callCard_body__text} size="s">
                {directionText}
              </Text>
            </div>
          )}
          <LeadNameLink bobject={call} className={styles._callCard_body__bobjectLink} />
          <CompanyNameLink
            bobject={call}
            className={styles._callCard_body__bobjectLink}
            prefix={undefined}
          />
          <OpportunityIcon bobject={call} />
          {duration && (
            <div className={styles._duration_wrapper}>
              <Text color="softPeanut" size="s">
                {segToTime(duration)}
              </Text>
            </div>
          )}
          <Text className={styles._callCard_body__source} size="s" color="softPeanut">
            {callSource}
          </Text>
          {isAccountAdmin && cardUser && (
            <div className={styles._assigned_circle}>
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
        </CardBody>
        <CardRight>
          {recordCall && (
            <div data-test="Icon-record" className={styles._button_record_container}>
              <Icon name="voicemail" size={24} />
            </div>
          )}
          {date && (
            <div className={styles._date_text_wrapper}>
              <DateText date={date} />
            </div>
          )}
          {isReported && (
            <div data-test="Icon-thumbsUp" className={styles._button_reported_container}>
              <IconButton name="thumbsUp" color="melon" size={16} />
            </div>
          )}
          <div />
        </CardRight>
        {!leadName || !isReported ? (
          <CardHoverButtons>
            {recordCall && (
              <div data-test="Icon-record" className={styles._button_record_container}>
                <IconButton
                  name="voicemail"
                  size={24}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    getSignedCallRecordingUrl()
                      .then(url => {
                        window.open(url, '_blank');
                      })
                      .catch(() => {
                        createToast({
                          message: 'Failed to get the recording, it may have been deleted',
                          type: 'error',
                        });
                      });
                  }}
                />
              </div>
            )}
            {!isReported && (activityLead || activityCompany || activityOpportunity) && (
              <CardButton
                variant="secondary"
                iconLeft="thumbsUp"
                onClick={() => {
                  const parents = getActivityParents(call) as ActivityParentsInterface;
                  const url = getActivityUrl(parents);
                  mixpanel.track(MIXPANEL_EVENTS.CALL_REPORTED_RESULT_FROM_INBOX);
                  history.push(`${url}?showContactFlow=${call?.id.objectId}`);
                  openAtStep(call?.id.objectId, STEPS.CALL_RESULTS, STEPS.CALL_RESULTS);
                }}
              >
                Report Result
              </CardButton>
            )}
            {!leadName && (
              <CardButton
                variant="secondary"
                iconLeft="personAdd"
                className={styles._add_person}
                onClick={e => {
                  mixpanel.track(MIXPANEL_EVENTS.ASSIGN_LEAD_PHONE_MODAL);
                  e.stopPropagation();
                  e.preventDefault();
                  handleOpenModal(true);
                  setSelectedCall(call);
                }}
              >
                Assign
              </CardButton>
            )}
          </CardHoverButtons>
        ) : (
          <></>
        )}
      </CardHeader>
      {note ? (
        <CardContent>
          <Text size="xs">
            <b>Note:</b> {noteToShow}
          </Text>
        </CardContent>
      ) : (
        <></>
      )}
    </SubhomeCard>
  );
};

const CallsList = () => {
  const { activities, isLoading, totalMatching, resetItems } = useInboxActivitiesCalls();
  const [openModal, setOpenModal] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);
  const { hasNextPage, loadNextPage, setHasNextPage } = useInboxCallsPage();
  const { showToast } = useActivityDone();
  const { t } = useTranslation();
  const filteredActivities = useMemo(
    () => addActivityDateGrouping(activities, 'ACTIVITY__TIME', t),
    [activities],
  );

  const hasQSGEnabled = useQuickStartEnabled();

  useEffect(() => {
    if (filteredActivities?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [filteredActivities, totalMatching]);

  useEffect(
    () => () => {
      resetItems();
    },
    [],
  );
  const markAllAsRead = () => {
    mixpanel.track(MIXPANEL_EVENTS.CALL_MARKED_ALL_AS_READ_FROM_INBOX);
    showToast(true, filteredActivities);
  };
  return (
    <>
      {!isLoading && filteredActivities.length === 0 ? (
        <>
          <SubhomeEmptyContent />
          {hasQSGEnabled && <NoInboxCardsTooltip defaultTooltipVisible />}
        </>
      ) : (
        <>
          {hasQSGEnabled && <InboxCardsTooltip defaultTooltipVisible />}
          <InfiniteScroll
            dataLength={filteredActivities.length}
            hasMore={hasNextPage}
            className={styles._list_wrapper}
            next={loadNextPage}
            scrollThreshold={0.75}
            scrollableTarget="subhomeContent"
            loader={<SubhomeContentSkeleton visible />}
          >
            {filteredActivities.map((call: DateExtendedBobject, index: number) => {
              const nextBobject = filteredActivities[index + 1];
              const showNextLine = nextBobject && !nextBobject?.activityDate.isFirstOfDay;
              return (
                <Fragment key={call.id.value}>
                  <div className={styles._list_header}>
                    {call.activityDate.isFirstOfDay && <DateGroupHeader bobject={call} />}
                    {index === 0 && (
                      <div className={styles._counter__button}>
                        {hasQSGEnabled && <InboxBulkActionsTooltip defaultTooltipVisible />}
                        <Label size="small">{`${totalMatching} results`}</Label>
                        <Button
                          inline
                          iconLeft="thumbsUp"
                          variant="secondary"
                          onClick={markAllAsRead}
                        >
                          MARK ALL AS REPORTED
                        </Button>
                      </div>
                    )}
                  </div>
                  <CallCard
                    call={call}
                    showNextLine={showNextLine}
                    handleOpenModal={setOpenModal}
                    setSelectedCall={setCurrentCall}
                  />
                </Fragment>
              );
            })}
          </InfiniteScroll>
          <>
            <NewCallsFooter />
            <AddLeadToActivityModal
              open={openModal}
              handleClose={() => setOpenModal(false)}
              activity={currentCall}
            />
            <BulkActionToast />
          </>
        </>
      )}
    </>
  );
};

export function CallsContent() {
  return (
    <>
      <NewCallsFilters />
      <CallsList />
    </>
  );
}
