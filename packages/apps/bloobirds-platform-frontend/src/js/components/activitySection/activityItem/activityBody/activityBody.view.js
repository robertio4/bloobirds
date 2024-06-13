import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';
import { serialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  TYPES_STATUS_VALUES_LOGIC_ROLE,
} from '../../../../constants/activity';
import {
  OPPORTUNITY_STATUS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '../../../../constants/opportunity';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../../utils/bobjects.utils';
import { isHtml } from '../../../../utils/strings.utils';
import { parseEmailPixels } from '../activityItem.utils';
import styles from './activityBody.module.css';
import HtmlMessage from './htmlMessage';
import InboundFieldGrid from './inboundFieldGrid';
import { MeetingCardBody } from './meetingCardBody/meetingCardBody';
import OpportunityCardBody from './opportunityCardBody';
import TextMessage from './textMessage';

const opportunityFieldWithCard = [TYPES_STATUS_VALUES_LOGIC_ROLE.OPPORTUNITY_CREATED];

const Body = ({ bobject }) => {
  const type = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)?.valueLogicRole;
  const plugins = useRichTextEditorPlugins({
    rawHTMLBlock: true,
    replyHistory: true,
    keepDivs: true,
  });

  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND) {
    return <InboundFieldGrid bobject={bobject} />;
  }

  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS) {
    const statusField = getFieldByLogicRole(bobject, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS)
      ?.valueLogicRole;
    const opportunityField = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY);
    const opportunity = opportunityField?.referencedBobject;
    const opportunityStatus = getFieldByLogicRole(
      opportunity,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
    );
    let isClosed = false;
    if (
      statusField === TYPES_STATUS_VALUES_LOGIC_ROLE.OPPORTUNITY_STATUS_CHANGED &&
      (opportunityStatus?.valueLogicRole === OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST ||
        opportunityStatus?.valueLogicRole === OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON)
    ) {
      isClosed = true;
    }

    if (opportunityFieldWithCard.includes(statusField) || isClosed) {
      return <OpportunityCardBody opportunity={opportunity} />;
    }
  }

  let message = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  if (message && type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL) {
    if (
      message?.includes('"type":"p"') &&
      typeof message === 'string' &&
      typeof JSON.parse(message) === 'object'
    ) {
      message = serialize(message, {
        format: 'AST',
        plugins,
      });
    }

    const isHtmlMessage = isHtml(message);
    return isHtmlMessage ? <HtmlMessage value={message} /> : <TextMessage value={message} />;
  }

  if (type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING) {
    return <MeetingCardBody meeting={bobject} />;
  }

  return null;
};

const ActivityBody = ({ bobject }) => {
  const note = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const aircallNote = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.AIRCALL_NOTE);
  const type = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)?.valueLogicRole;

  const noteToShow = isHtml(note) ? (
    <div dangerouslySetInnerHTML={{ __html: parseEmailPixels(note) }} />
  ) : (
    note
  );
  return (
    <div className={styles._body}>
      <Body bobject={bobject} />
      {type !== ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING && note && note !== 'null' && (
        <div className={styles._note_message}>
          <Text color="peanut" size="xs">
            Note: {noteToShow}
          </Text>
        </div>
      )}
      {aircallNote && aircallNote !== '' && (
        <div className={styles._note_message}>
          <Text color="peanut" size="xs">
            Aircall Note: {aircallNote}
          </Text>
        </div>
      )}
    </div>
  );
};

export default ActivityBody;
