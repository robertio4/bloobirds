import { useTranslation } from 'react-i18next';

import {
  Card,
  CardBody,
  CardButton,
  CardContent,
  CardHeader,
  CardHoverButtons,
  CardLeft, CardRight,
  IconButton,
  Spinner,
  Text,
  Tooltip
} from "@bloobirds-it/flamingo-ui";
import { isSameDay, isValid, parse } from 'date-fns';
import CardIcon from '../../../../../cardIcon/cardIcon';
import styles from '../inboxPage.module.css';
import {
  api,
  generateDatePrefix,
  getDateTimestampString,
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isHtml,
  parseEmailPixels,
} from '@bloobirds-it/utils';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  GroupedLinkedInMessage,
  BobjectTypes,
  DIRECTION_VALUES_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { NameComponent } from '../../../../../card/fieldTypeComponent';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useExtensionContext } from '../../../../../context';
import { ExtendedContextTypes } from '../../../../../../../types/extendedContext';
import { TFunction } from 'i18next';
import { AssigneeComponent } from "@bloobirds-it/bobjects";
import { getI18nSpacetimeLng } from "@bloobirds-it/internationalization";


const addMessageGrouping = (items: any[], t: TFunction, language:string) =>
  items.map((item, index) => {
    const date = new Date(getValueFromLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
    const itemDirection = getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)
      ?.valueLogicRole;
    const reportedStatus = getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)
      ?.valueLogicRole;
    const previous = items[index - 1];
    const previousItemDate =
      previous && new Date(getValueFromLogicRole(previous, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
    const formatStr = t('dates.standardDate');
    const formattedDay = isValid(date) ? getI18nSpacetimeLng(language, date).format(formatStr) : '';
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

const PAGE_SIZE = 8;
const ESTIMATED_PAGE_HEIGHT = 386;

export const LinkedinCard = ({
  messages,
  leadId,
  isLastDayItem,
}: {
  messages: GroupedLinkedInMessage[];
  leadId: string;
  isLastDayItem: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const [hasBeenRead, setHasBeenRead] = useState<boolean>(false);
  const [readClicked, setReadClicked] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { useGetSettings, setContactViewBobjectId, setExtendedContext } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const assignee = messages?.length > 0 && getFieldByLogicRole(messages?.[0], ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const [messageCollapsed, setMessageCollapsed] = useState<boolean>(true);
  const lastMessage = messages[messages.length - 1];
  const lastMessageText =
    lastMessage && getTextFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const lastMessageThread =
    lastMessage && getTextFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.LINKEDIN_THREAD);
  const conversationRef = useRef();
  const parsedMessages: GroupedLinkedInMessage[] = addMessageGrouping(messages, t, i18n.language);
  const isHtmlMessage = lastMessageText && isHtml(lastMessageText);
  const [page, setPage] = useState(1);
  const beginIndex = parsedMessages?.length - page * PAGE_SIZE;
  const activityCompany = getFieldByLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityLead = getFieldByLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(
    lastMessage,
    ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  )?.referencedBobject;
  const paginatedMessages = parsedMessages.slice(
    beginIndex >= 0 ? beginIndex : 0,
    parsedMessages?.length,
  );
  const hasNextPage = parsedMessages?.length > paginatedMessages?.length;
  const notReportedMessages = parsedMessages.filter(message => !message?.messageStatus?.isReported);
  const hasNotReportedMessages = notReportedMessages?.length > 0;
  const leadField = getFieldByLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  function handleHideAndComplete() {
    setIsLoading(false);
    setTimeout(() => {
      setHasBeenRead(true);
      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
    }, 750);
  }

  const goToLinkedinConversationPage = () => {
    window.open(`https://www.linkedin.com/${lastMessageThread}`, '_blank');
  };

  const markAllAsRead = (e: any) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsLoading(true);
    const activitiesId = notReportedMessages?.map(activity => activity?.id.objectId);
    let activitiesData = {};
    activitiesId.forEach(activityId => {
      activitiesData = {
        ...activitiesData,
        [activityId]: { [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES },
      };
    });
    api.patch(`/bobjects/${accountId}/Activity/bulk`, activitiesData).then(handleHideAndComplete);
  };
  // @ts-ignore
  const conversationElement = conversationRef.current?.children[0]?.children[0];

  useEffect(() => {
    if (conversationRef?.current && !messageCollapsed) {
      // @ts-ignore
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversationRef, messageCollapsed]);

  useEffect(() => {
    if (page > 1 && conversationRef?.current && !messageCollapsed) {
      conversationElement.scrollTop += ESTIMATED_PAGE_HEIGHT - 100 / page;
    }
  }, [messageCollapsed, page]);

  const onCardClick = () => {
    setContactViewBobjectId(
      activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value,
    );

    setExtendedContext({
      type: ExtendedContextTypes.LINKEDIN_THREAD,
      bobject: lastMessage,
    });
  };

  return (
    <div
      className={clsx(styles.container_linkedin, {
        [styles.hasBeenRead]: hasBeenRead && !isLastDayItem,
      })}
      style={{ height: messageCollapsed ? '100%' : '100%' }}
    >
      <Card
        key={leadId}
        size="small"
        expand
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
          onCardClick();
        }}
      >
        <CardHeader forceButtonVisibility={readClicked}>
          <CardLeft>
            <CardIcon size="xs" name="linkedin" color="darkBloobirds" />
          </CardLeft>
          <CardBody>
            <Text size="xs" weight="bold" className={styles._card_body__text}>
              {t('extension.card.conversationWith')}
            </Text>
            <NameComponent
              value={leadField.referencedBobject}
              bobject={lastMessage}
              showIcon={false}
            />
          </CardBody>
          <CardRight><AssigneeComponent value={assignee} /></CardRight>
          <CardHoverButtons size="small">
            <Tooltip title={t('extension.card.openLinkedin')} position="top">
              <CardButton
                iconLeft="linkedin"
                variant="secondary"
                onClick={goToLinkedinConversationPage}
              />
            </Tooltip>
            {hasNotReportedMessages ? (
              <Tooltip title={t('extension.card.markAsRead')} position="top">
                <CardButton
                  size="small"
                  disabled={!hasNotReportedMessages}
                  iconLeft={isLoading ? undefined : 'checkDouble'}
                  color={readClicked ? 'verySoftMelon' : 'bloobirds'}
                  className={clsx(styles._mark_as_read, {
                    [styles._mark_as_read_clicked]: readClicked,
                  })}
                  onClick={e => {
                    setReadClicked(true);
                    markAllAsRead(e);
                  }}
                >
                  {isLoading && (
                    <div>
                      <Spinner name="loadingCircle" size={10} color="melon" />
                    </div>
                  )}
                </CardButton>
              </Tooltip>
            ) : (
              <div className={styles._button_reported_container}>
                <CardButton size="small" variant="clear" iconLeft="checkDouble" color="melon" />
              </div>
            )}
          </CardHoverButtons>
        </CardHeader>
        <CardContent>
          <div className={styles._card_content_linkedin}>
            {!messageCollapsed ? (
              <>
                <div className={styles._button}>
                  <IconButton
                    name="chevronDown"
                    color="softPeanut"
                    size={12}
                    onClick={event => {
                      event.stopPropagation();
                      event.preventDefault();
                      setMessageCollapsed(true);
                    }}
                  />
                </div>
                <div
                  className={styles._messages_wrapper}
                  ref={conversationRef}
                  id="conversationContent"
                >
                  <InfiniteScroll
                    key={paginatedMessages[0]?.id?.value}
                    dataLength={paginatedMessages.length}
                    hasMore={hasNextPage}
                    next={() => setPage(page + 1)}
                    height={217}
                    scrollThreshold={0.75}
                    inverse={true}
                    scrollableTarget="conversationContent"
                    loader={
                      <div className={styles._spinner_wrapper}>
                        <Spinner name="dots" />
                      </div>
                    }
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
                                <Text color="softPeanut" size="xs" align="center">
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
                              <Text size="xs">
                                {messageText === 'undefined'
                                  ? t('extension.card.messageNotParse')
                                  : messageText}
                              </Text>
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
                <div>
                  <IconButton
                    name="chevronRight"
                    color="softPeanut"
                    size={12}
                    onClick={event => {
                      event.stopPropagation();
                      event.preventDefault();
                      setMessageCollapsed(false);
                    }}
                  />
                </div>
                {isHtmlMessage ? (
                  <div
                    className={styles._html_message_linkedin}
                    dangerouslySetInnerHTML={{ __html: parseEmailPixels(lastMessageText) }}
                  />
                ) : (
                  <Text size="xs" className={styles._linkedin_message}>
                    {lastMessageText === 'undefined'
                      ? t('extension.card.messageNotParse')
                      : lastMessageText}
                  </Text>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
