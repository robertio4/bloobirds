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
import { useDataModel, useNotifications } from '@bloobirds-it/hooks';
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
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  CALL_RESULTS_LOGIC_ROLE,
  MIXPANEL_EVENTS,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { getFieldByLogicRole, isHtml } from '@bloobirds-it/utils';
import { EVENTS, useWizardContext, WizardsModalParams } from '@bloobirds-it/wizard-modal-context';
import mixpanel from 'mixpanel-browser';

import { useActivityRelatedInfo } from '../../../hooks/useActivityRelatedInfo';
import { useCallResultStepData } from '../../../hooks/useCallResultStepData';
import { useNoteStepData } from '../../../hooks/useNoteStepData';
import { useContactFlowData } from '../../modals/contactFlowModal/hooks/useContactFlowData';
import CallInfo from '../../shared/callInfo/callInfo';
import styles from './callResultOpp.module.css';

const isCorrectContact = (logicRole: string) =>
  logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;

function NoteRichTextEditor({ note, onChange }: { note: string; onChange: any }) {
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });
  const { t } = useTranslation('translation', { keyPrefix: 'wizards.steps.callResultOpp' });

  return (
    <div className={styles._note}>
      <RichTextEditor
        defaultValue={note}
        plugins={plugins}
        placeholder={t('placeholder')}
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

interface CallResultOppWizard extends WizardsModalParams {
  handleNext?: (isCorrectContact: boolean) => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
  // hasLeads: boolean;
}
const CallResultOpportunity = ({
  handleBack,
  handleSkip,
  buttonsConfig,
  wizardKey,
  send,
  machineContext,
}: CallResultOppWizard) => {
  const [callResults, setCallResults] = useState([]);
  const [isAST, setIsAST] = useState(false);
  const { getWizardProperties, hasCustomWizardsEnabled } = useWizardContext();
  const { bobject: activity } = getWizardProperties(wizardKey);
  const { referenceBobjectIsSales } = useActivityRelatedInfo(wizardKey);
  const dataModel = useDataModel();
  const {
    callResultStepData,
    setCallResultStepData,

    callResultsPicklistValues,
  } = useCallResultStepData(activity, dataModel, null);
  const { noteStepData, setNoteStepData } = useNoteStepData();
  const { handleSubmit } = useContactFlowData();
  const { t } = useTranslation('translation', { keyPrefix: 'wizards.steps.callResultOpp' });
  const { t: commonT } = useTranslation('translation', { keyPrefix: 'wizards.common' });

  const { removeNotificationByObjectId } = useNotifications();
  function deleteRelatedNotification(activity) {
    if (activity) {
      removeNotificationByObjectId(activity?.id?.objectId);
    }
  }
  function handleNext(correctContact: boolean) {
    deleteRelatedNotification(activity);
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_NEXT_IN_WIZARD_STEP_ + 'CALL_RESULTS_OPP');
    send(EVENTS.NEXT, {
      isCorrectContact: correctContact,
      isLeadInSalesStage: referenceBobjectIsSales,
    });
  }

  //const [notificationId] = useSharedState('notificationId');
  const correctContact = callResultsPicklistValues.find(
    result => result.logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT,
  );
  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : false;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;

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
      [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: isAST
        ? serialize(noteStepData?.value, {
            format: 'AST',
            plugins,
          })
        : noteStepData?.value,
    };
    if (
      !hasCustomWizardsEnabled ||
      machineContext?.wizardConfig?.markReportedAtStart === true ||
      machineContext?.wizardConfig?.markReportedAtStart === undefined
    ) {
      data[ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED] = REPORTED_VALUES_LOGIC_ROLE.YES;
    }
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
      rows={16}
      placeholder={!noteStepData?.value ? t('addANote') : null}
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
        <CallInfo activity={activity} />
        <div className={styles._section__wrapper}>
          <div className={styles._section_title__wrapper}>
            <Text dataTest="Text-Modal-CallResultOpp" size="m" weight="medium" color="peanut">
              {t('ableToContact')}
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
              {t('yes')}
            </Chip>
            <Chip dataTest="Opportunity-No" value="no">
              {t('no')}
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
              {buttonsConfig?.previousButtonTitle || commonT('back')}
            </Button>
          )}
          {showSkipButton && (
            <Button
              variant="secondary"
              onClick={() => handleSkip(openCadenceControlOnClose)}
              className={styles.skip_button}
            >
              {commonT('skipWizard')}
            </Button>
          )}
          <Button
            dataTest="Form-Next"
            onClick={saveAndNext}
            disabled={!callResultStepData?.callResult?.logicRole}
          >
            {buttonsConfig?.nextButtonTitle || commonT('next')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default CallResultOpportunity;
