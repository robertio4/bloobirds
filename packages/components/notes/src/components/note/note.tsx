import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@bloobirds-it/flamingo-ui';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { getFieldByLogicRole, getTextFromLogicRole } from '@bloobirds-it/utils';

import { NoteForm } from '../noteForm/noteForm';
import styles from './note.module.css';

export interface NoteProps {
  activity?: Bobject;
  title?: string;
  content?: any;
  mainNote?: string;
  relatedCompany?: Bobject;
  relatedLead?: Bobject;
  relatedOpportunity?: Bobject;
  accountId: string;
  onSave?: (id?: string) => void;
  bodyPlaceholder?: string;
  alternativeFooter?: JSX.Element;
}

/**
 * This is the main note wrapper that will take the data and initialize the noteForm
 * You must send an activity if you want to be on edition mode.
 * @constructor
 */
export const Note = (props: NoteProps) => {
  const {
    activity: propsActivity,
    title,
    content,
    mainNote,
    relatedCompany: defaultRelatedCompany,
    relatedLead: defaultRelatedLead,
    relatedOpportunity: defaultRelatedOpportunity,
    bodyPlaceholder,
    accountId,
    onSave,
    alternativeFooter,
  } = props;

  const activity = useMemo(() => propsActivity, [propsActivity]);
  const { t } = useTranslation('translation', { keyPrefix: 'notes' });
  const [unmountNote, setUnmountNote] = useState(false);
  const getTitle = () => {
    if (activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL) {
      const direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
      return direction === 'Outgoing' ? t('outgoingCall') : t('incomingCall');
    } else {
      return getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
    }
  };

  const noteContent = content || getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const noteMainNoteValue =
    mainNote || getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE);

  const relatedCompany = !activity
    ? defaultRelatedCompany
    : getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  const relatedCompanyName = getTextFromLogicRole(relatedCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME);

  const relatedLead = !activity
    ? defaultRelatedLead
    : getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const relatedLeadName = getTextFromLogicRole(relatedLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);

  const relatedOpportunity = !activity
    ? defaultRelatedOpportunity
    : getFieldByLogicRole(activity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME)?.referencedBobject;
  const relatedOpportunityName = getTextFromLogicRole(
    relatedOpportunity,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  );

  const defaultRelated = relatedLead
    ? relatedLead?.id?.value
    : relatedCompany
    ? relatedCompany?.id?.value
    : relatedOpportunity
    ? relatedOpportunity?.id?.value
    : null;
  const defaultName = relatedLead
    ? // @ts-ignore
      relatedLead?.fullName || relatedLeadName || t('untitledLead')
    : relatedCompany
    ? // @ts-ignore
      relatedCompany?.name || relatedCompanyName || t('untitledCompany')
    : relatedOpportunity
    ? // @ts-ignore
      relatedOpportunity?.name || relatedOpportunityName || t('untitledOpportunity')
    : null;

  useEffect(() => {
    setUnmountNote(true);
    setTimeout(() => {
      setUnmountNote(false);
    }, 1);
  }, [activity]);

  //Check if the activity is a meeting and if it has a note
  const activityType = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
    ?.valueLogicRole;
  const noteTitle = title || getTitle();

  const copilotAnalysis = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS);

  return !unmountNote ? (
    <NoteForm
      activityType={activityType}
      accountId={accountId}
      title={noteTitle}
      content={noteContent}
      mainNote={noteMainNoteValue}
      activityId={activity?.id}
      related={defaultRelated}
      relatedName={defaultName}
      onSave={onSave}
      bodyPlaceholder={bodyPlaceholder}
      alternativeFooter={alternativeFooter}
      copilotAnalysis={copilotAnalysis}
    />
  ) : (
    <div className={styles.loading}>
      <Spinner name="loadingCircle" />
    </div>
  );
};
