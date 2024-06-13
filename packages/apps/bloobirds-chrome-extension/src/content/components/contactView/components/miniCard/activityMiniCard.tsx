import { useTranslation } from 'react-i18next';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import {
  Card,
  CardBody,
  CardContent,
  CardHeader,
  CardHoverButtons,
  CardRight,
  Icon,
  Text,
  Tooltip,
  useHover,
} from '@bloobirds-it/flamingo-ui';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  BobjectWithDate,
} from '@bloobirds-it/types';
import {
  convertHtmlToString,
  getFieldByLogicRole,
  getReferencedBobject,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import clsx from 'clsx';

import { ExtendedContextTypes } from '../../../../../types/extendedContext';
import { useExtensionContext } from '../../../context';
import { MiniCardActivityButtons } from './cardButtons/miniCardActivityButtons';
import { BobjectName } from './components/bobjectName';
import { ScheduledDateTime } from './components/cardDates';
import styles from './miniCard.module.css';

export const ActivityMiniCard = ({
  activity,
  hasNextCard,
  sidePeekEnabled,
  minimized,
}: {
  activity: BobjectWithDate;
  hasNextCard?: boolean;
  sidePeekEnabled?: boolean;
  minimized?: boolean;
}) => {
  const { t } = useTranslation();
  const {
    setExtendedContext,
    useGetActiveBobject,
    refreshExtendedScreenBobject,
  } = useExtensionContext();
  const { openWizard, resetWizardProperties } = useWizardContext();
  const activeBobject = useGetActiveBobject();
  const [ref, isHovering] = useHover();

  const activityTitle = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  const lead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject as Bobject<BobjectTypes.Lead>;
  const calendarNote = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE);
  const scheduledDatetime = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const referenceBobject = getReferencedBobject(activity);

  const assignee = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO);

  const containerClasses = clsx(styles.container, {
    [styles.containerSidePeek]: sidePeekEnabled,
    [styles.containerMinimized]: minimized,
  });

  const cardButtonsClasses = clsx(styles.cardButtons, {
    [styles.cardButtonsSidePeekMinimized]: sidePeekEnabled && minimized,
    [styles.cardButtonsSidePeek]: sidePeekEnabled,
    [styles.cardButtonsBubble]: !sidePeekEnabled,
  });

  const titleClasses = clsx(styles.activityTitle, {
    [styles.activityTitleMinimized]: minimized,
  });

  const openMeetingDetail = () => {
    setExtendedContext({
      type: ExtendedContextTypes.MEETING_DETAILS,
      bobject: activity,
    });
  };

  const isCompanyActiveBobject = activeBobject?.id?.typeName === BobjectTypes.Company;

  const shouldShowLeadName = isCompanyActiveBobject && !!lead;
  const isSingleLine = !calendarNote && !shouldShowLeadName;
  const hasThirdLine = calendarNote && shouldShowLeadName;

  return (
    <>
      <div className={containerClasses} ref={ref} onClick={openMeetingDetail}>
        <Card size="small" expand>
          <CardHeader>
            <CardBody>
              <div className={styles.meetingIcon}>
                <Icon size={sidePeekEnabled ? 20 : 18} name="calendar" color="tomato" />
              </div>
              <Tooltip
                title={activityTitle?.length > (!sidePeekEnabled ? 70 : 22) && activityTitle}
                position="top"
              >
                <Text
                  className={titleClasses}
                  size="xs"
                  ellipsis={sidePeekEnabled ? 70 : 22}
                  weight="bold"
                >
                  {activityTitle}
                </Text>
              </Tooltip>
              <div className={styles.rightSide}>
                <ScheduledDateTime isOverdue={false} scheduledDateTime={scheduledDatetime} />
              </div>
            </CardBody>
            <div className={cardButtonsClasses}>
              <CardHoverButtons size="small" customBackgroundColor="white">
                {isHovering && (
                  <MiniCardActivityButtons
                    activity={activity}
                    setOpenedModal={b => {
                      if (b) {
                        openWizard(WIZARD_MODALS.MEETING_RESULT, activity, {
                          onSaveCallback: refreshExtendedScreenBobject,
                          referenceBobject,
                        });
                      } else {
                        resetWizardProperties(WIZARD_MODALS.MEETING_RESULT);
                      }
                    }}
                  />
                )}
              </CardHoverButtons>
            </div>
          </CardHeader>
          {!minimized ? (
            <>
              {!isSingleLine ? (
                <CardContent>
                  {calendarNote ? (
                    <Text className={styles.verticalEllipsis} size="xs">
                      <b>{t('common.note')}: </b>
                      {convertHtmlToString(calendarNote)}
                    </Text>
                  ) : (
                    shouldShowLeadName && <BobjectName bobject={lead} isBold />
                  )}
                  {!hasThirdLine && (
                    <CardRight>
                      <AssigneeComponent value={assignee} />
                    </CardRight>
                  )}
                </CardContent>
              ) : (
                <></>
              )}
              {hasThirdLine ? (
                <CardContent>
                  <BobjectName bobject={lead} style={{ marginLeft: '0px' }} isBold />
                  <CardRight>
                    <AssigneeComponent value={assignee} />
                  </CardRight>
                </CardContent>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </Card>
        {hasNextCard && <div className={styles._dashed_line} />}
      </div>
    </>
  );
};
