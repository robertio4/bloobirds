import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import { SearchAssignUserDropdown } from '@bloobirds-it/assign-user';
import { AssigneeComponent } from '@bloobirds-it/bobjects';
import {
  Card,
  CardBody,
  CardButton,
  CardContent,
  CardHeader,
  CardLeft,
  CardRight,
  Icon,
  IconButton,
  IconType,
  Spinner,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useUserSearch } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  BobjectTypes,
  DIRECTION_VALUES_LOGIC_ROLE,
  GroupedLinkedInMessage,
  MessagesEvents,
  REPORTED_VALUES_LOGIC_ROLE,
  SalesforceTabs,
} from '@bloobirds-it/types';
import {
  api,
  formatDate,
  generateDatePrefix,
  getDateTimestampString,
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isHtml,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isSameDay, isToday, isValid, parse } from 'date-fns';
import { TFunction } from 'i18next';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { ExtendedContextTypes } from '../../../../../../../types/extendedContext';
import { NameComponent } from '../../../../../card/fieldTypeComponent';
import CardIcon from '../../../../../cardIcon/cardIcon';
import { useExtensionContext } from '../../../../../context';
import styles from '../inboxPage.module.css';

const PAGE_SIZE = 8;

export const IconLabel = ({
  iconName,
  label,
}: {
  iconName: IconType;
  label: string | JSX.Element;
}) => {
  return label ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Icon name={iconName} color="verySoftBloobirds" size={16} />
      <Text size="xs" color="peanut" className={styles.iconLabel_text}>
        {label}
      </Text>
    </div>
  ) : (
    <></>
  );
};
const addMessageGrouping = (items: any[], t: TFunction) =>
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

export const WhatsAppCard = ({ messages }: { messages: any[] }) => {
  const { i18n, t } = useTranslation();
  const { settings } = useActiveUserSettings();
  const [hasBeenRead, setHasBeenRead] = useState<boolean>(false);
  const activity = messages[messages.length - 1];
  const [markAsDoneClicked, setMarkAsDoneClicked] = useState(false);
  const [messageCollapsed, setMessageCollapsed] = useState<boolean>(true);
  const messageSID = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.WHATSAPP_ID);
  const { setContactViewBobjectId, setExtendedContext } = useExtensionContext();
  const phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const parsedPhone = phone && parsePhoneNumberFromString(phone)?.formatInternational();
  const activityCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const messageDateTime =
    getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME) ||
    getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME);
  const activityCaseId = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CASE_ID);
  const activityCaseNumber = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CASE_NUMBER);
  const activityFromToday = isToday(new Date(messageDateTime));
  const format = activityFromToday
    ? '{time-24}'
    : i18n.language === 'en'
    ? '{time-24} {month-short} {date-ordinal}'
    : '{time-24} {date} {month-short}';
  const parsedDateTime = useGetI18nSpacetime(messageDateTime).format(format);
  const note = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const noteToShow = isHtml(note) ? <div dangerouslySetInnerHTML={{ __html: note }} /> : note;
  const assignee = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const media = getValueFromLogicRole(activity, 'ACTIVITY__ATTACHMENTS');

  const message = noteToShow || (media ? 'Message with media' : '');

  const onCardClick = () => {
    if (activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value) {
      setContactViewBobjectId(
        activityLead?.id?.value || activityOpportunity?.id?.value || activityCompany?.id?.value,
      );
      setExtendedContext({
        type: ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD,
        bobject: activity,
      });
    }
  };

  const handleClickOnCase = caseId => {
    window.open(settings?.account?.salesforceInstance + '/' + caseId, '_blank');
  };

  return (
    <div
      className={clsx(styles.container, {
        [styles.hasBeenRead]: hasBeenRead && !activity?.activityDate?.isLastOfDay,
      })}
      style={{ height: '100%' }}
    >
      <Card key={messageSID} expand size="small" onClick={onCardClick}>
        <CardHeader forceButtonVisibility={markAsDoneClicked}>
          <CardLeft>
            <CardIcon name="waBusiness" color={'melon'} size="xs" />
          </CardLeft>
          <CardBody>
            <div className={styles._callCard_body__wrap}>
              <Text size="xs" weight="bold" className={styles._callCard_body__text}>
                {t('leftBar.card.whatsapp.title')}
              </Text>
              {(activityLead || activityCompany) && (
                <>
                  <Text size="xs" weight="bold" className={styles._card_body__text}>
                    {t('leftBar.card.call.with')}
                  </Text>
                  <NameComponent
                    value={activityLead ?? activityCompany}
                    bobject={activity}
                    shrinkName={false}
                    showIcon={false}
                  />
                </>
              )}
            </div>
          </CardBody>
          <CardRight>
            <AssigneeComponent value={assignee} />
          </CardRight>
        </CardHeader>
        <CardContent>
          <div className={styles.div_not_collapsed}>
            {(parsedPhone || messageDateTime) && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <IconLabel iconName="agendaPerson" label={parsedPhone} />
                <IconLabel
                  iconName="clock"
                  label={t('leftBar.card.whatsapp.lastMessage') + ' ' + parsedDateTime}
                />
              </div>
            )}
            {activityCaseId && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span
                  onClick={e => {
                    e.stopPropagation();
                    handleClickOnCase(activityCaseId);
                  }}
                  className={styles.caseIcon}
                >
                  <Icon name={'briefcase'} color="verySoftBloobirds" size={16} />
                  <Text size="xs" color="bloobirds" className={styles.iconLabel_text}>
                    {'Nº' + activityCaseNumber}
                  </Text>
                </span>
              </div>
            )}
            {noteToShow && noteToShow !== 'null' && (
              <div className={styles._collapsed_message} style={{ marginBottom: '20px' }}>
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
                <Text className={styles._linkedin_message} size="xs">
                  {message}
                </Text>
              </div>
            )}
            <WhatsAppCardHoverActions
              activity={activity}
              setHasBeenRead={setHasBeenRead}
              markAsDoneClicked={markAsDoneClicked}
              setMarkAsDoneClicked={setMarkAsDoneClicked}
              messages={messages}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const WhatsAppCardHoverActions = ({
  activity,
  setHasBeenRead,
  markAsDoneClicked,
  setMarkAsDoneClicked,
  messages,
}) => {
  const { t } = useTranslation();
  const { useGetSettings } = useExtensionContext();
  const { setContactViewBobjectId, setExtendedContext } = useExtensionContext();
  const activityCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const messagePhoneFrom = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { ref, visible, setVisible } = useVisible();
  const hasObjectRelated = activityLead || activityCompany;
  const assignee = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const users = useUserSearch();
  const assigneeUser = users?.users?.find(user => user?.id === assignee?.id);
  const settings = useGetSettings();
  const accountId = settings?.account?.id;

  const handleOnLinkOrCreate = bobjectId => {
    messages.forEach(message => {
      api
        .patch(`/bobjects/${message?.id?.value}/raw`, {
          contents: {
            [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: bobjectId,
          },
          params: {},
        })
        .then(handleHideAndComplete);
    });
  };

  const searchOrCreateContactFlow = () => {
    const profileName = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT);
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ForceOpenExtension, {
        detail: {
          source: 'LEFTBAR',
          bobjects: [],
          info: {
            name: profileName,
            number: messagePhoneFrom,
            validatePhone: true,
            onCreate: handleOnLinkOrCreate,
            onSelect: handleOnLinkOrCreate,
          },
        },
      }),
    );
  };

  const handleHideAndComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
      setHasBeenRead(true);
    }, 750);
  };

  const handleRefreshUserAssigned = () => {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
    }, 750);
  };

  const markAsRead = event => {
    event.stopPropagation();
    event.preventDefault();
    setMarkAsDoneClicked(true);
    setIsLoading(true);
    messages.forEach(message => {
      api
        .patch(`/bobjects/${message?.id?.value}/raw`, {
          contents: {
            [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
          },
          params: {},
        })
        .then(handleHideAndComplete);
    });
  };

  const replyAction = event => {
    event.stopPropagation();
    event.preventDefault();
    if (activityLead?.id?.value || activityCompany?.id?.value) {
      setContactViewBobjectId(activityLead?.id?.value || activityCompany?.id?.value);
      setExtendedContext({
        type: ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD,
        bobject: activity,
      });
    }
  };

  return (
    <div
      className={clsx(styles.popup_buttons_wrapper, {
        [styles.visible_buttons]: markAsDoneClicked || visible,
      })}
    >
      <Tooltip
        title={
          hasObjectRelated
            ? t('leftBar.card.whatsapp.markAsRead')
            : t('leftBar.card.whatsapp.discardMessage')
        }
        position="top"
      >
        <CardButton
          uppercase={false}
          size="small"
          variant="secondary"
          className={clsx(styles.popup_button, {
            [styles._mark_as_read_clicked]: markAsDoneClicked,
          })}
          iconLeft={isLoading ? null : 'checkDouble'}
          onClick={markAsRead}
        >
          {isLoading ? (
            <div>
              <Spinner name="loadingCircle" size={10} color="melon" />
            </div>
          ) : hasObjectRelated ? (
            t('leftBar.card.whatsapp.markAsRead')
          ) : (
            t('common.discard')
          )}
        </CardButton>
      </Tooltip>
      {hasObjectRelated && messagePhoneFrom && (
        <Tooltip title={t('leftBar.card.whatsapp.replyButton')} position="top">
          <CardButton
            size="small"
            uppercase={false}
            color={'extraCall'}
            className={styles.popup_button}
            iconLeft={'waBusiness'}
            onClick={replyAction}
          >
            {t('leftBar.card.whatsapp.replyButton')}
          </CardButton>
        </Tooltip>
      )}
      {!hasObjectRelated && (
        <Tooltip title={t('leftBar.card.whatsapp.assignMessage')} position="top">
          <CardButton
            size="small"
            uppercase={false}
            variant="secondary"
            iconLeft={isLoading ? null : 'personAdd'}
            className={styles.popup_button}
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              searchOrCreateContactFlow();
            }}
          >
            {isLoading ? (
              <div>
                <Spinner name="loadingCircle" size={10} color="melon" />
              </div>
            ) : (
              t('leftBar.card.whatsapp.createContact')
            )}
          </CardButton>
        </Tooltip>
      )}
      <SearchAssignUserDropdown
        bobject={messages}
        accountId={accountId}
        assigneeUser={assigneeUser}
        visible={visible}
        setVisible={setVisible}
        ref={ref}
        onSave={handleRefreshUserAssigned}
        showCallout={false}
        subhomeTab={SalesforceTabs.INBOX}
        assignReferencedBobject={true}
      >
        <Tooltip
          title={t('leftBar.card.whatsapp.reassignMessage')}
          position="top"
          className={styles._tooltip_wrapper}
        >
          <CardButton
            uppercase={false}
            size="small"
            color={'bloobirds'}
            className={styles.popup_button}
            iconLeft={'deliver'}
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              setVisible(!visible);
            }}
          >
            {t('extension.card.reassign')}
          </CardButton>
        </Tooltip>
      </SearchAssignUserDropdown>
    </div>
  );
};
