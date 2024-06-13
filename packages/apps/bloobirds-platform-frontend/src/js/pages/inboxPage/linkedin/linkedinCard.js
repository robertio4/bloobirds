import {
  CardBody,
  CardButton,
  CardContent,
  CardHeader,
  CardHoverButtons,
  CardLeft,
  CardRight,
  CircularBadge,
  IconButton,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import React, { useState } from 'react';
import { companyUrl, leadUrl, opportunityUrl } from '../../../app/_constants/routes';
import { parseEmailPixels } from '../../../components/activitySection/activityItem/activityItem.utils';
import DateText from '../../../components/activitySection/activityItem/dateText';
import { CompanyNameLink } from '../../../components/bobjectNameLinks/companyName';
import { LeadNameLink } from '../../../components/bobjectNameLinks/leadName';
import CardIcon from '../../../components/cardIcon/cardIcon';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { useEntity, useOpenContactFlow, useRouter } from '../../../hooks';
import { STEPS } from '../../../components/contactFlowModal/contactFlowModal.machine';
import SubhomeCard from '../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import {
  getActivityParents,
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../utils/bobjects.utils';
import { isHtml } from '../../../utils/strings.utils';
import { getActivityUrl } from './linkedinCard.utils';
import styles from './linkedin.module.css';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';

export const LinkedinCard = ({ linkedin, showNextLine }) => {
  const [messageCollapsed, setMessageCollapsed] = useState(true);
  const hasSalesEnabled = useFullSalesEnabled();
  const direction = getTextFromLogicRole(linkedin, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const date = getTextFromLogicRole(linkedin, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const note = getValueFromLogicRole(linkedin, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const message = getTextFromLogicRole(linkedin, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const isReported =
    getFieldByLogicRole(linkedin, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole ===
    REPORTED_VALUES_LOGIC_ROLE.YES;
  const { history } = useRouter();
  const { openAtStep } = useOpenContactFlow();
  const activityCompany = getFieldByLogicRole(linkedin, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityLead = getFieldByLogicRole(linkedin, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(linkedin, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const isHtmlMessage = message && isHtml(message);
  const linkedinUser = getValueFromLogicRole(linkedin, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const users = useEntity('users');
  const cardUser = users?.get(linkedinUser);
  const isAccountAdmin = useIsAccountAdmin();

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

  return (
    <SubhomeCard
      hasNextCard={showNextLine}
      key={linkedin?.id.bobject}
      onClick={e => handleOnClick(e)}
      dataTest={`linkedin-card-${linkedin?.id.objectId}`}
    >
      <CardHeader>
        <CardLeft>
          <CardIcon name="linkedin" color="darkBloobirds" direction={direction} />
        </CardLeft>
        <CardBody>
          <Text size="s" weight="bold" className={styles._card_body__text}>
            Linkedin message {direction === ACTIVITY_DIRECTION.INCOMING ? 'received' : 'sent'}
          </Text>
          <LeadNameLink bobject={linkedin} className={styles._card_body__bobjectLink} />
          <CompanyNameLink bobject={linkedin} className={styles._card_body__bobjectLink} />
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

        {!isReported && direction === ACTIVITY_DIRECTION.INCOMING ? (
          <CardHoverButtons>
            {!isReported && (
              <CardButton
                variant="secondary"
                iconLeft="thumbsUp"
                onClick={() => {
                  const parents = getActivityParents(linkedin);
                  const url = getActivityUrl(parents);
                  history.push(`${url}?showContactFlow=${linkedin?.id.objectId}`);
                  openAtStep(linkedin?.id.objectId, STEPS.CHANGE_STATUS, 'REPORT_RESULT');
                }}
              >
                Report Result
              </CardButton>
            )}
          </CardHoverButtons>
        ) : (
          <></>
        )}
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
                  name={messageCollapsed ? 'chevronRight' : 'chevronDown'}
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
