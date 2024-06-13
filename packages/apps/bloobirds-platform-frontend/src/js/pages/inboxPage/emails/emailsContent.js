import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
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
  IconButton,
  Label,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useBaseSetEmailVariablesValues, useMinimizableModals } from '@bloobirds-it/hooks';
import { BobjectTypes } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { companyUrl, leadUrl, opportunityUrl } from '../../../app/_constants/routes';
import { parseEmailPixels } from '../../../components/activitySection/activityItem/activityItem.utils';
import DateText from '../../../components/activitySection/activityItem/dateText';
import { DateGroupHeader } from '../../../components/activitySection/activityList/activityList.view';
import { CompanyNameLink } from '../../../components/bobjectNameLinks/companyName';
import { LeadNameLink } from '../../../components/bobjectNameLinks/leadName';
import BulkActionToast from '../../../components/bulkActionToast/bulkActionToast';
import CardIcon from '../../../components/cardIcon/cardIcon';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { EMAIL_MODE } from '../../../constants/email';
import { MIXPANEL_EVENTS } from '../../../constants/mixpanel';
import { useActivity, useEntity, useRouter } from '../../../hooks';
import { useActivityDone } from '../../../hooks/useActivity';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import SubhomeCard from '../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import SubhomeEmptyContent from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { addActivityDateGrouping } from '../../../utils/activities.utils';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../utils/bobjects.utils';
import { removeHtmlTags } from '../../../utils/email.utils';
import { isHtml } from '../../../utils/strings.utils';
import styles from './emails.module.css';
import { NewEmailsFilters } from './newEmailsFilters';
import { NewEmailsFooter } from './newEmailsFooter';
import { useInboxActivitiesEmails, useInboxEmailsPage } from './useInboxEmails';

const EmailCard = ({ email, showNextLine }) => {
  const [messageCollapsed, setMessageCollapsed] = useState(true);
  const { openMinimizableModal } = useMinimizableModals();
  const hasSalesEnabled = useFullSalesEnabled();
  const { reportedActivityResult } = useActivity('activityCard');
  const direction = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const date = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const subject = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT);
  const note = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const message = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const isHtmlMessage = message && isHtml(message);

  const isReported =
    getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole ===
    REPORTED_VALUES_LOGIC_ROLE.YES;
  const { history } = useRouter();
  const activityCompany = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityLead = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const isAccountAdmin = useIsAccountAdmin();
  const emailUser = getValueFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const users = useEntity('users');
  const cardUser = users?.get(emailUser);
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const titleRef = useRef();

  const showTooltip =
    // @ts-ignore
    titleRef?.current?.firstChild?.firstChild?.offsetWidth <
    // @ts-ignore
    titleRef?.current?.firstChild?.firstChild?.scrollWidth;

  const handleOpenEmailModal = async event => {
    mixpanel.track(
      direction === ACTIVITY_DIRECTION.INCOMING
        ? MIXPANEL_EVENTS.EMAIL_REPLIED_FROM_INBOX
        : MIXPANEL_EVENTS.EMAIL_SENT_ANOTHER_FROM_INBOX,
    );
    event.preventDefault();
    event.stopPropagation();
    setEmailVariablesValue({
      company: activityCompany,
      lead: activityLead,
      opportunity: activityOpportunity,
    });
    const templateSubject = getValueFromLogicRole(
      email,
      ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT,
      true,
    );
    openMinimizableModal({
      type: 'email',
      title: removeHtmlTags(templateSubject),
      data: {
        template: {
          content: '',
          subject: templateSubject,
        },
        mode: EMAIL_MODE.REPLY,
        activity: email,
        company: activityCompany,
        lead: activityLead,
        leads: [],
        pageBobjectType: BobjectTypes.Lead,
      },
    });
  };

  const handleOnClick = e => {
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

  const markAsReported = () => {
    reportedActivityResult({
      activityId: email?.id.objectId,
      valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES,
    });
  };

  return (
    <SubhomeCard
      hasNextCard={showNextLine}
      onClick={e => handleOnClick(e)}
      dataTest={`email-card-${email?.id.objectId}`}
    >
      <CardHeader>
        <CardLeft>
          <CardIcon name="mail" color="tangerine" direction={direction} />
        </CardLeft>
        <CardBody>
          <CompanyNameLink bobject={email} className={styles._emailCard_body__bobjectLink} />
          <LeadNameLink bobject={email} className={styles._emailCard_body__bobjectLink} />
          <div ref={titleRef} className={styles._emailCard_body__title}>
            <Tooltip title={showTooltip ? subject : undefined} position="top">
              <Text size="s" weight="bold" className={styles._emailCard_body__text}>
                {subject}
              </Text>
            </Tooltip>
          </div>
          {isAccountAdmin && cardUser && (
            <div className={styles._assigned_circle}>
              <Tooltip title={cardUser?.name} position="top">
                <CircularBadge
                  size="s"
                  color="lightPeanut"
                  style={{ color: 'var(--white)', fontSize: '9px' }}
                  backgroundColor={cardUser?.color || 'lightPeanut'}
                >
                  {cardUser?.shortname || cardUser?.email || 'U'}
                </CircularBadge>
              </Tooltip>
            </div>
          )}
        </CardBody>
        <CardRight>
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

        <CardHoverButtons>
          {!isReported && direction === ACTIVITY_DIRECTION.INCOMING && (
            <>
              <Tooltip title="Mark as read" trigger="hover" position="top">
                <CardButton
                  variant="secondary"
                  onClick={e => {
                    mixpanel.track(MIXPANEL_EVENTS.EMAIL_MARKED_AS_READ_FROM_INBOX);
                    e.stopPropagation();
                    markAsReported();
                  }}
                  iconLeft="checkDouble"
                />
              </Tooltip>
            </>
          )}
          <CardButton size="small" onClick={handleOpenEmailModal} iconLeft="send">
            {direction === ACTIVITY_DIRECTION.INCOMING ? 'Reply' : 'Send another email'}
          </CardButton>
        </CardHoverButtons>
      </CardHeader>
      {message || note ? (
        <CardContent>
          <div className={styles._card_content}>
            {message && (
              <div
                className={clsx(styles._message_wrapper, {
                  [styles._message_collapsed]: messageCollapsed,
                })}
              >
                <IconButton
                  onClick={event => {
                    event.stopPropagation();
                    event.preventDefault();
                    setMessageCollapsed(!messageCollapsed);
                  }}
                  name="chevronRight"
                  color="softPeanut"
                  size={12}
                />
                {isHtmlMessage ? (
                  <div
                    className={styles._html_message}
                    dangerouslySetInnerHTML={{ __html: parseEmailPixels(message) }}
                  />
                ) : (
                  <Text size="s">{message}</Text>
                )}
              </div>
            )}
            {note && (
              <div className={styles._note_wrapper}>
                <Text size="xs">
                  <b>Note:</b> {note}
                </Text>
              </div>
            )}
          </div>
        </CardContent>
      ) : (
        <></>
      )}
    </SubhomeCard>
  );
};

const EmailsList = () => {
  const { activities, isLoading, totalMatching, resetItems } = useInboxActivitiesEmails();
  const { hasNextPage, loadNextPage, setHasNextPage } = useInboxEmailsPage();
  const { showToast } = useActivityDone();
  const { t } = useTranslation();

  const filteredActivities = useMemo(
    () => addActivityDateGrouping(activities, ACTIVITY_FIELDS_LOGIC_ROLE.TIME, t),
    [activities],
  );

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
    mixpanel.track(MIXPANEL_EVENTS.EMAIL_MARKED_ALL_AS_READ_FROM_INBOX);
    showToast(true, filteredActivities);
  };
  return (
    <>
      {!isLoading && filteredActivities.length === 0 ? (
        <SubhomeEmptyContent />
      ) : (
        <>
          <InfiniteScroll
            dataLength={filteredActivities.length}
            hasMore={hasNextPage}
            className={styles._list_wrapper}
            next={loadNextPage}
            scrollThreshold={0.75}
            scrollableTarget="subhomeContent"
            loader={<SubhomeContentSkeleton visible />}
          >
            {filteredActivities.map((email, index) => {
              const nextBobject = filteredActivities[index + 1];
              const showNextLine = nextBobject && !nextBobject?.activityDate.isFirstOfDay;
              return (
                <Fragment key={email.id.value}>
                  <div className={styles._list_header}>
                    {email.activityDate.isFirstOfDay && <DateGroupHeader bobject={email} />}
                    {index === 0 && (
                      <div className={styles._counter__button}>
                        <Label size="small">{`${totalMatching} results`}</Label>
                        <Button
                          inline
                          iconLeft="checkDouble"
                          variant="secondary"
                          onClick={markAllAsRead}
                        >
                          MARK ALL AS READ
                        </Button>
                      </div>
                    )}
                  </div>
                  <EmailCard email={email} showNextLine={showNextLine} />
                </Fragment>
              );
            })}
          </InfiniteScroll>
          <NewEmailsFooter />
          <BulkActionToast />
        </>
      )}
    </>
  );
};

export function EmailsContent() {
  return (
    <>
      <NewEmailsFilters />
      <EmailsList />
    </>
  );
}
