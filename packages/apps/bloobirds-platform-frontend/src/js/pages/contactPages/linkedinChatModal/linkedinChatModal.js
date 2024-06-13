import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  CircularBadge,
  Icon,
  IconButton,
  Portal,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { formatDate, generateDatePrefix, getDateTimestampString } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isSameDay, parse, isValid } from 'date-fns';

import BulkActionToast from '../../../components/bulkActionToast/bulkActionToast';
import { STEPS } from '../../../components/contactFlowModal/contactFlowModal.machine';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../../constants/lead';
import { useEntity, useOpenContactFlow, useRouter } from '../../../hooks';
import { useActivityDone } from '../../../hooks/useActivity';
import {
  useLinkedinChatConversation,
  useLinkedinChatModal,
} from '../../../hooks/useLinkedinChatModal';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../utils/bobjects.utils';
import styles from './linkedinChatModal.module.css';

const addMessageGrouping = (items, t) =>
  items.map((item, index) => {
    const date = new Date(getValueFromLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
    const reportedStatus = getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)
      ?.valueLogicRole;
    const previous = items[index - 1];
    const previousItemDate =
      previous && new Date(getValueFromLogicRole(previous, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
    const formattedDay = isValid(date) ? formatDate(date, 'MMM do, yyyy') : '';
    const dateDay = isValid(date) ? parse(formattedDay, 'MMM do, yyyy', new Date()) : '';
    const hashDate = getDateTimestampString(date);
    const isReported = value => value === REPORTED_VALUES_LOGIC_ROLE.YES;

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
        isReported: isReported(reportedStatus),
      },
    };
  });

const LinkedinChatModal = () => {
  const { t } = useTranslation();
  const { closeLinkedinChat, linkedinLead } = useLinkedinChatModal();
  const { showToast, isOpen: isOpenMarkAsDoneToast } = useActivityDone();
  const { openAtStep } = useOpenContactFlow();
  const { history, pathname } = useRouter();
  const conversationRef = useRef();
  const { items: messages, isLoading } = useLinkedinChatConversation({
    leadId: linkedinLead?.id.value,
  });
  const parsedMessages = addMessageGrouping(messages, t);
  const lastMessage = messages && messages[messages.length - 1];
  const idealCustomerProfiles = useEntity('idealCustomerProfiles');
  const [leadBuyerPersona, setLeadBuyerPersona] = useState(
    idealCustomerProfiles?.get(getValueFromLogicRole(linkedinLead, LEAD_FIELDS_LOGIC_ROLE.ICP)),
  );
  const leadFullName =
    getTextFromLogicRole(linkedinLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
    getTextFromLogicRole(linkedinLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const lastMessageThread =
    lastMessage && getTextFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.LINKEDIN_THREAD);
  const notReportedMessages = parsedMessages.filter(message => !message?.messageStatus?.isReported);
  const hasNotReportedMessages = notReportedMessages?.length > 0;
  const leadStage =
    linkedinLead && getFieldByLogicRole(linkedinLead, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole;
  const isLeadInSalesStage = leadStage === LEAD_STAGE_LOGIC_ROLE.SALES;

  useLayoutEffect(() => {
    if (idealCustomerProfiles && !leadBuyerPersona) {
      setLeadBuyerPersona(
        idealCustomerProfiles.get(getValueFromLogicRole(linkedinLead, LEAD_FIELDS_LOGIC_ROLE.ICP)),
      );
    }
  }, [idealCustomerProfiles, leadBuyerPersona]);

  const goToLinkedinConversationPage = () => {
    window.open(`https://www.linkedin.com/${lastMessageThread}`, '_blank');
  };

  const markAllAsRead = () => {
    showToast(true, notReportedMessages);
  };

  useEffect(() => {
    if (conversationRef?.current && !isLoading) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversationRef]);

  useEffect(
    () => () => {
      closeLinkedinChat();
    },
    [],
  );

  return (
    <Portal>
      <div aria-labelledby="linkedin-chat-modal" className={styles._container}>
        <div className={styles._content}>
          <div className={styles._header}>
            <div className={styles._lead_info_wrapper}>
              <div className={styles._buyer_persona}>
                <CircularBadge
                  size="medium"
                  style={{
                    backgroundColor: leadBuyerPersona?.color || 'var(--verySoftPeanut)',
                    color: 'white',
                  }}
                >
                  {leadBuyerPersona?.shortname || ''}
                </CircularBadge>
              </div>
              <div className={styles._lead_name}>
                <Text size="l">{leadFullName}</Text>
              </div>
              <Icon name="linkedin" color="darkBloobirds" />
              <div className={styles._actions}>
                <Button
                  variant="secondary"
                  size="small"
                  iconLeft="checkDouble"
                  disabled={!hasNotReportedMessages}
                  onClick={markAllAsRead}
                />
                <Button
                  variant="secondary"
                  iconLeft="thumbsUp"
                  size="small"
                  disabled={!hasNotReportedMessages}
                  onClick={() => {
                    history.push(`${pathname}?showContactFlow=${lastMessage?.id.objectId}`);
                    const messagesId = notReportedMessages?.map(message => message?.id?.objectId);
                    openAtStep(
                      messagesId,
                      isLeadInSalesStage ? STEPS.SALES_CHANGE_STATUS : STEPS.CHANGE_STATUS,
                      'REPORT_RESULT',
                    );
                  }}
                />
                <Button size="small" iconLeft="send" onClick={goToLinkedinConversationPage}>
                  Reply
                </Button>
              </div>
            </div>
            <IconButton name="cross" color="softPeanut" onClick={closeLinkedinChat} />
          </div>
          <div className={styles._body} ref={conversationRef} id="conversationContent">
            <div className={styles._conversation_wrapper}>
              {!isLoading ? (
                parsedMessages.map(message => {
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
                      {message?.messageDate?.isFirstOfDay && (
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
                })
              ) : (
                <div className={styles._spinner_wrapper}>
                  <Spinner name="dots" />
                </div>
              )}
            </div>
          </div>
          {isOpenMarkAsDoneToast && <BulkActionToast />}
        </div>
      </div>
    </Portal>
  );
};

export default LinkedinChatModal;
