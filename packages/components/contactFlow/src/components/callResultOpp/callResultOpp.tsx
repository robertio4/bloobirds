import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Chip,
  ChipGroup,
  ModalContent,
  ModalFooter,
  Text,
  TextArea,
} from '@bloobirds-it/flamingo-ui';
import {
  RichTextEditor,
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarTextMarksSection,
  deserialize,
  serialize,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import { ACTIVITY_FIELDS_LOGIC_ROLE, REPORTED_VALUES_LOGIC_ROLE } from '@bloobirds-it/types';
import { getFieldByLogicRole, isHtml } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import { useContactFlow } from '../../hooks';
import { useContactFlowData } from '../../hooks/useContactFlowData';
import { CALL_RESULTS_LOGIC_ROLE } from '../../types/contactFlowTypes';
import CallInfo from '../callResult/components/callInfo/callInfo';
import styles from './callResultOpp.module.css';

const isCorrectContact = (logicRole: string) =>
  logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;

function NoteRichTextEditor({ note, onChange }: { note: string; onChange: any }) {
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });
  const { t } = useTranslation('translation', { keyPrefix: 'contactFlowModal.callResultOpp' });

  return (
    <div className={styles._note}>
      <RichTextEditor
        defaultValue={note}
        plugins={plugins}
        placeholder={t('notePlaceholder')}
        onChange={onChange}
        style={{
          padding: '12px 28px 4px 28px',
        }}
      >
        {editor => (
          <>
            <div className={styles.editorContent}>{editor}</div>
            <div className={styles.toolbar}>
              <EditorToolbar backgroundColor="white">
                <EditorToolbarControlsSection color="peanut" />
                <EditorToolbarFontStylesSection color="peanut" />
                <EditorToolbarTextMarksSection color="peanut" />
                <EditorToolbarListsSection color="peanut" />
              </EditorToolbar>
            </div>
          </>
        )}
      </RichTextEditor>
    </div>
  );
}

const CallResultOpportunity = ({
  handleNext,
  handleBack,
  handleSkip,
}: {
  handleNext: (isCorrectContact: boolean) => void;
  handleBack?: () => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
}) => {
  const [callResults, setCallResults] = useState([]);
  const [isAST, setIsAST] = useState(false);
  const {
    activity,
    callResultStepData,
    setCallResultStepData,
    noteStepData,
    setNoteStepData,
    callResultsPicklistValues,
    buttonStepConfig,
  } = useContactFlow();
  const { handleSubmit } = useContactFlowData();
  //const [notificationId] = useSharedState('notificationId');
  const correctContact = callResultsPicklistValues.find(
    result => result.logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT,
  );
  const showSkipButton =
    buttonStepConfig?.showSkipButton != undefined ? buttonStepConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonStepConfig?.hasPreviousStep != undefined ? buttonStepConfig?.hasPreviousStep : false;
  const openCadenceControlOnClose =
    buttonStepConfig?.openCadenceOnSkip != undefined ? buttonStepConfig?.openCadenceOnSkip : false;

  // That's awful, I know. But we should do it for cases that they change the no answer
  const noAnswer = callResultsPicklistValues.find(
    result =>
      result.logicRole === CALL_RESULTS_LOGIC_ROLE.NO_ANSWER || result?.name === 'No Answer',
  );
  //const removeNotification = useNotificationDelete();

  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });
  const { t } = useTranslation('translation', { keyPrefix: 'contactFlowModal.callResultOpp' });

  useEffect(() => {
    if (activity && !noteStepData) {
      const noteField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
      if (isHtml(noteField?.value)) {
        setNoteStepData({
          value: deserialize(noteField?.value, {
            format: 'HTML',
            plugins: plugins,
          }),
          fieldId: noteField?.name,
        });
        setIsAST(true);
      } else {
        setNoteStepData({
          value: noteField.text,
          fieldId: noteField.name,
        });
      }
    }
  }, [activity]);

  useEffect(() => {
    if (callResultsPicklistValues.length > 0 && callResults.length === 0) {
      setCallResults(callResultsPicklistValues);
    }
  }, [callResultsPicklistValues]);

  const saveAndNext = () => {
    const data = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT]: callResultStepData?.callResult.logicRole,
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
      [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: isAST
        ? serialize(noteStepData?.value, {
            format: 'AST',
            plugins,
          })
        : noteStepData?.value,
    };
    handleSubmit({ activity, data });
    /*    if (notificationId) {
      removeNotification(notificationId);
    }*/
    handleNext(isCorrectContact(callResultStepData?.callResult?.logicRole));
  };

  useEffect(() => {
    mixpanel.track('ENTERED_IN_CC_OPPORTUNITY_STEP1');
  }, []);

  useEffect(() => {
    if (!callResultStepData?.callResult?.logicRole) {
      setCallResultStepData({
        ...callResultStepData,
        /*@ts-ignore*/
        callResult: noAnswer,
      });
    }
  }, [callResultStepData?.callResult]);

  const textarea = isAST ? (
    <NoteRichTextEditor
      note={noteStepData?.value}
      onChange={value =>
        setNoteStepData({
          ...noteStepData,
          value,
        })
      }
    />
  ) : (
    <TextArea
      value={noteStepData?.value}
      minRows={16}
      maxRows={16}
      placeholder={!noteStepData?.value ? t('addNote') : null}
      width="100%"
      onChange={value =>
        setNoteStepData({
          ...noteStepData,
          value,
        })
      }
    />
  );

  return (
    <>
      <ModalContent>
        <CallInfo />
        <div className={styles._section__wrapper}>
          <div className={styles._section_title__wrapper}>
            <Text dataTest="Text-Modal-CallResultOpp" size="m" weight="medium" color="peanut">
              {t('title')}
            </Text>
          </div>
          <ChipGroup
            value={isCorrectContact(callResultStepData?.callResult?.logicRole) ? 'yes' : 'no'}
            onChange={value => {
              setCallResultStepData({
                ...callResultStepData,
                /*@ts-ignore*/
                callResult: value === 'yes' ? correctContact : noAnswer,
              });
            }}
          >
            <Chip dataTest="Opportunity-Yes" value="yes">
              {t('yes').toUpperCase()}
            </Chip>
            <Chip dataTest="Opportunity-No" value="no">
              {t('no').toUpperCase()}
            </Chip>
          </ChipGroup>
        </div>
        <div className={styles._section__wrapper}>
          <div className={styles._section_title__wrapper}>
            <Text size="m" weight="medium" color="peanut">
              {t('addInfo')}
            </Text>
          </div>
          {textarea}
        </div>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          {hasPreviousStep && (
            <Button variant="clear" onClick={handleBack} className={styles.back_button}>
              {buttonStepConfig?.previousButtonTitle || t('back')}
            </Button>
          )}
          {showSkipButton && (
            <Button
              variant="secondary"
              onClick={() => handleSkip(openCadenceControlOnClose)}
              className={styles.skip_button}
            >
              {t('skip')}
            </Button>
          )}
          <Button
            dataTest="Form-Next"
            onClick={saveAndNext}
            disabled={!callResultStepData?.callResult?.logicRole}
          >
            {buttonStepConfig?.nextButtonTitle || t('next')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default CallResultOpportunity;
