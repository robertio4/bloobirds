import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  CardBody,
  CardButton,
  CardContent,
  CardHeader,
  CardHoverButtons,
  CardLeft,
  CardRight,
  CircularBadge,
  Icon,
  Spinner,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';
import { formatDate, generateDatePrefix, getDateTimestampString } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isSameDay, isValid, parse } from 'date-fns';

import { parseEmailPixels } from '../../../components/activitySection/activityItem/activityItem.utils';
import DateText from '../../../components/activitySection/activityItem/dateText';
import { CompanyNameLink } from '../../../components/bobjectNameLinks/companyName';
import { LeadNameLink } from '../../../components/bobjectNameLinks/leadName';
import CardIcon from '../../../components/cardIcon/cardIcon';
import { STEPS } from '../../../components/contactFlowModal/contactFlowModal.machine';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  DIRECTION_VALUES_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { useEntity, useOpenContactFlow, useRouter } from '../../../hooks';
import { useActivityDone } from '../../../hooks/useActivity';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import SubhomeCard from '../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import {
  getActivityParents,
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../utils/bobjects.utils';
import { isHtml } from '../../../utils/strings.utils';
import styles from './linkedin.module.css';
import { getActivityUrl } from './linkedinCard.utils';

const addMessageGrouping = (items, t) =>
  items.map((item, index) => {
    const date = new Date(getValueFromLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
    const itemDirection = getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)
      ?.valueLogicRole;
    const reportedStatus = getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)
      ?.valueLogicRole;
    const previous = items[index - 1];
    const previousItemDate =
      previous && new Date(getValueFromLogicRole(previous, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
    const formattedDay = isValid(date) ? formatDate(date, 'MMM do, yyyy') : '';
    const dateDay = isValid(date) ? parse(formattedDay, 'MMM do, yyyy', new Date()) : '';
    const hashDate = getDateTimestampString(date);
    const isReported = (value, direction) =>
      value === REPORTED_VALUES_LOGIC_ROLE.YES ||
      direction === DIRECTION_VALUES_LOGIC_ROLE.OUTGOING;

    return {
      ...item,
      messageDate: {
        isFirstOfDay: !previousItemDate || !isSameDay(date, previousItemDate),
        day: dateDay,
        formattedDate: formattedDay,
        prefix: generateDatePrefix(date, true, t),
        hashDate,
      },
      messageStatus: {
        isReported: isReported(reportedStatus, itemDirection),
      },
    };
  });

const PAGE_SIZE = 10;

export const LinkedinConversationCard = ({ messages, leadId, messageDate }) => {
  const { t } = useTranslation();
  const { save } = useUserHelpers();
  const [messageCollapsed, setMessageCollapsed] = useState(true);
  const { history } = useRouter();
  const { openAtStep } = useOpenContactFlow();
  const { showToast } = useActivityDone();
  const lastMessage = messages[messages.length - 1];
  const lastMessageText =
    lastMessage && getTextFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const lastMessageDate =
    lastMessage && getTextFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const lastMessageDateHash = getDateTimestampString(new Date(lastMessageDate));
  const lastMessageThread =
    lastMessage && getTextFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.LINKEDIN_THREAD);
  const conversationRef = useRef();
  const parsedMessages = addMessageGrouping(messages, t);
  const isHtmlMessage = lastMessageText && isHtml(lastMessageText);
  const [page, setPage] = useState(1);
  const beginIndex = parsedMessages?.length - page * PAGE_SIZE;
  const paginatedMessages = parsedMessages.slice(
    beginIndex >= 0 ? beginIndex : 0,
    parsedMessages?.length,
  );
  const hasNextPage = parsedMessages?.length > paginatedMessages?.length;
  const notReportedMessages = parsedMessages.filter(message => !message?.messageStatus?.isReported);
  const hasNotReportedMessages = notReportedMessages?.length > 0;
  const linkedinUser = getValueFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const users = useEntity('users');
  const cardUser = users?.get(linkedinUser);
  const isAccountAdmin = useIsAccountAdmin();

  const goToLinkedinConversationPage = () => {
    window.open(`https://www.linkedin.com/${lastMessageThread}`, '_blank');
  };

  const markAllAsRead = () => {
    showToast(true, notReportedMessages);
  };

  useEffect(() => {
    if (conversationRef?.current && !messageCollapsed) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversationRef, messageCollapsed]);

  useEffect(() => {
    if (page > 1 && conversationRef?.current && !messageCollapsed) {
      conversationRef.current.scrollTop = 50;
    }
  }, [messageCollapsed, page]);

  return (
    <>
      {messageDate?.isFirstOfDay && (
        <header className={styles._header} id={lastMessageDateHash}>
          <Text color="peanut" weight="medium" size="s" inline>
            {messageDate?.prefix}
          </Text>
          <Text color="softPeanut" size="s" inline>
            {messageDate?.formattedDate}
          </Text>
        </header>
      )}
      <SubhomeCard
        key={leadId}
        dataTest={`linkedin-conversation-card-${leadId}`}
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
          save(UserHelperKeys.LINK_FIRST_MESSAGE_LINKEDIN);
          setMessageCollapsed(!messageCollapsed);
        }}
      >
        <CardHeader>
          <CardLeft>
            <CardIcon name="linkedin" color="darkBloobirds" />
          </CardLeft>
          <CardBody>
            <Text size="s" weight="bold" className={styles._card_body__text}>
              Linkedin conversation with
            </Text>
            <LeadNameLink bobject={lastMessage} className={styles._card_body__bobjectLink} />
            <Text color="bloobirds" size="s">
              -
            </Text>
            <CompanyNameLink bobject={lastMessage} className={styles._card_body__bobjectLink} />
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
            {lastMessageDate && (
              <div className={styles._date_text_wrapper}>
                <DateText date={lastMessageDate} />
              </div>
            )}
          </CardRight>
          <CardHoverButtons>
            <Tooltip title="Mark as read" position="top" trigger="hover">
              <CardButton
                disabled={!hasNotReportedMessages}
                variant="secondary"
                iconLeft="checkDouble"
                onClick={markAllAsRead}
              />
            </Tooltip>
            <Tooltip title="Report result" position="top" trigger="hover">
              <CardButton
                variant="secondary"
                iconLeft="thumbsUp"
                disabled={!hasNotReportedMessages}
                onClick={() => {
                  const parents = getActivityParents(lastMessage);
                  const url = getActivityUrl(parents);
                  history.push(`${url}?showContactFlow=${lastMessage?.id.objectId}`);
                  const messagesId = notReportedMessages?.map(message => message?.id?.objectId);
                  openAtStep(messagesId, STEPS.CHANGE_STATUS, 'REPORT_RESULT');
                }}
              />
            </Tooltip>
            <CardButton iconLeft="send" onClick={goToLinkedinConversationPage}>
              Reply
            </CardButton>
          </CardHoverButtons>
        </CardHeader>
        <CardContent>
          <div className={styles._card_content}>
            {!messageCollapsed ? (
              <>
                <Icon name="chevronDown" color="softPeanut" size={12} />
                <div
                  className={styles._messages_wrapper}
                  ref={conversationRef}
                  id="conversationContent"
                >
                  <InfiniteScroll
                    dataLength={paginatedMessages.length}
                    hasMore={hasNextPage}
                    next={() => setPage(page + 1)}
                    inverse
                    scrollThreshold={0.75}
                    scrollableTarget="conversationContent"
                    loader={
                      <div className={styles._spinner_wrapper}>
                        <Spinner name="dots" />
                      </div>
                    }
                    height="100%"
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                  >
                    <div className={styles._conversation_wrapper}>
                      {paginatedMessages.map(message => {
                        const messageText = getTextFromLogicRole(
                          message,
                          ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY,
                        );
                        const messageDirection = getTextFromLogicRole(
                          message,
                          ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION,
                        );

                        return (
                          <>
                            {message.messageDate?.isFirstOfDay && (
                              <div className={styles._date_separator}>
                                <Text color="softPeanut" size="s" align="center">
                                  {message?.messageDate?.formattedDate}
                                </Text>
                              </div>
                            )}
                            <div
                              className={clsx(styles._message, {
                                [styles._message_incoming]:
                                  messageDirection === ACTIVITY_DIRECTION.INCOMING,
                                [styles._message_outgoing]:
                                  messageDirection === ACTIVITY_DIRECTION.OUTGOING,
                              })}
                            >
                              <Text size="s">{messageText}</Text>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </InfiniteScroll>
                </div>
              </>
            ) : (
              <div className={styles._collapsed_message}>
                <Icon name="chevronRight" color="softPeanut" size={12} />
                {isHtmlMessage ? (
                  <div
                    className={styles._html_message}
                    dangerouslySetInnerHTML={{ __html: parseEmailPixels(lastMessageText) }}
                  />
                ) : (
                  <Text size="s">{lastMessageText}</Text>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </SubhomeCard>
    </>
  );
};
