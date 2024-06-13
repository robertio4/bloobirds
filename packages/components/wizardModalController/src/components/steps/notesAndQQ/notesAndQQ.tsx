import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  ModalContent,
  ModalFooter,
  Spinner,
  Text,
  TextArea,
} from '@bloobirds-it/flamingo-ui';
import { useQualifyingQuestions } from '@bloobirds-it/hooks';
import {
  deserialize,
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  serialize,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  TemplateStage,
} from '@bloobirds-it/types';
import { getFieldByLogicRole, isHtml } from '@bloobirds-it/utils';
import { DefaultWizardsModalParams, useWizardContext } from '@bloobirds-it/wizard-modal-context';
import sortBy from 'lodash/sortBy';

import { useActivityRelatedInfo } from '../../../hooks/useActivityRelatedInfo';
import { useNoteStepData } from '../../../hooks/useNoteStepData';
import { useContactFlowData } from '../../modals/contactFlowModal/hooks/useContactFlowData';
import QualifiyingQuestionsPlaceholder from './QQPlaceholder/qualifyingQuestionPlaceholder';
import styles from './notesAndQQ.module.css';
import { QualifyingQuestion } from './qualifyingQuestion/qualifyingQuestion';

interface NoteWizardsModalParams extends DefaultWizardsModalParams {
  showNotes?: boolean;
}

export function NoteRichTextEditor({ note, onChange }: { note: string; onChange: any }) {
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });
  const { t } = useTranslation();

  return (
    <div className={styles._note}>
      <RichTextEditor
        defaultValue={note}
        plugins={plugins}
        placeholder={t('wizards.steps.notesAndQQs.placeholder')}
        onChange={onChange}
        style={{
          padding: '12px 28px 4px 28px',
        }}
      >
        {editor => (
          <>
            <div className={styles.editorContent}>{editor}</div>
            <NoteRichTextEditorToolbar />
          </>
        )}
      </RichTextEditor>
    </div>
  );
}

const NoteRichTextEditorToolbar = React.memo(() => (
  <div className={styles.toolbar}>
    <EditorToolbar backgroundColor="white">
      <EditorToolbarControlsSection color="peanut" />
      <EditorToolbarFontStylesSection color="peanut" />
      <EditorToolbarTextMarksSection color="peanut" />
      <EditorToolbarListsSection color="peanut" />
    </EditorToolbar>
  </div>
));

const NoteAndQQ = ({
  handleNext,
  handleBack,
  handleSkip,
  buttonsConfig,
  wizardKey,
  showNotes,
}: NoteWizardsModalParams) => {
  const { getWizardProperties } = useWizardContext();
  const { bobject: activity, referenceBobject } = getWizardProperties(wizardKey);
  const { activityLead, activityCompany } = useActivityRelatedInfo(wizardKey);
  const { noteStepData, setNoteStepData } = useNoteStepData();
  const { handleSubmit } = useContactFlowData();
  const [qualifyingQuestionsToSave, setQualifyingQuestionsToSave] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isAST, setIsAST] = useState(false);
  const bobjectStage = activityLead
    ? getFieldByLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole
    : getFieldByLogicRole(activityCompany, COMPANY_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole;
  const stage =
    bobjectStage === LEAD_STAGE_LOGIC_ROLE.SALES || bobjectStage === COMPANY_STAGE_LOGIC_ROLE.SALES
      ? TemplateStage.Sales
      : TemplateStage.Prospecting;
  const { t } = useTranslation();

  const bobjectType = !activityLead ? 'Company' : 'Lead';
  const { isLoading, qualifyingQuestions, updateQualifyingQuestionsValue } = useQualifyingQuestions(
    {
      enabled: true,
      stage,
      segmentationValues: {},
      bobjectType,
    },
  );
  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : true;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;

  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });

  useEffect(() => {
    if (activity && !noteStepData && showNotes) {
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

  const saveAndNext = async () => {
    setIsSubmitting(true);
    if (noteStepData?.value) {
      const data = {
        [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: isAST
          ? serialize(noteStepData?.value, {
              format: 'AST',
              plugins,
            })
          : noteStepData?.value,
      };
      handleSubmit({ activity, data });
    }
    if (qualifyingQuestionsToSave?.length > 0) {
      updateQualifyingQuestionsValue(referenceBobject, qualifyingQuestionsToSave).then(() => {
        setIsSubmitting(false);
        setHasChanges(false);
      });
    }
    handleNext();
  };

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
      rows={15}
      placeholder={!noteStepData?.value ? t('wizards.steps.notesAndQQs.addANote') : null}
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
    <div className={styles.wrapper}>
      <ModalContent>
        <div data-test="Text-Modal-Note&amp;QQ" className={styles._content__wrapper}>
          <>
            {showNotes && (
              <section className={styles.column}>
                <header className={styles.sectionHeader}>
                  <Icon name="chat" size={24} color="softPeanut" />
                  <Text size="m" color="softPeanut" weight="medium" htmlTag="h2">
                    {t('wizards.steps.notesAndQQs.howWasTheCall')}
                  </Text>
                </header>
                <div className={styles._section__wrapper}>{textarea}</div>
              </section>
            )}
            <section className={showNotes ? styles.column : styles.columnOnyQQs}>
              <header className={styles.sectionHeader}>
                <Icon name="chat" size={24} color="softPeanut" />
                <Text size="m" color="softPeanut" weight="medium" htmlTag="h2">
                  {t('wizards.steps.notesAndQQs.fillTheQQs')}
                </Text>
              </header>
              <div className={styles._section__wrapper}>
                {isLoading ? (
                  <QualifiyingQuestionsPlaceholder width={400} />
                ) : (
                  <>
                    {sortBy(qualifyingQuestions, 'question').map(({ id, ...props }) => {
                      const qqFieldValue = referenceBobject?.rawBobject
                        ? //@ts-ignore
                          referenceBobject.rawBobject?.[id]
                        : referenceBobject?.raw?.contents?.[id];
                      const currentValue = qualifyingQuestionsToSave.find(
                        ({ id: qqId }) => qqId === id,
                      )?.value;
                      const qqValue = currentValue || qqFieldValue;

                      return (
                        <QualifyingQuestion
                          {...props}
                          key={id}
                          value={qqValue}
                          showNotes={showNotes}
                          onChange={(value: string) => {
                            const shouldRemoveQQToSave = (qqFieldValue || '') === value;
                            const qqCleaned = qualifyingQuestionsToSave.filter(
                              ({ id: qqId }) => qqId !== id,
                            );
                            const qqToSave = shouldRemoveQQToSave
                              ? qqCleaned
                              : [
                                  ...qqCleaned,
                                  {
                                    id,
                                    value,
                                    bobjectId: referenceBobject?.id?.objectId,
                                  },
                                ];
                            setQualifyingQuestionsToSave(qqToSave);

                            if (!hasChanges) {
                              setHasChanges(true);
                            }

                            if (qqToSave.length === 0) {
                              setHasChanges(false);
                            }
                          }}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </section>
          </>
        </div>
      </ModalContent>
      <ModalFooter>
        {hasPreviousStep && (
          <Button
            variant="clear"
            onClick={() => {
              setHasChanges(false);
              setQualifyingQuestionsToSave([]);
              handleBack();
            }}
            className={styles.back_button}
          >
            {buttonsConfig?.previousButtonTitle || t('wizards.common.back')}
          </Button>
        )}
        {showSkipButton && (
          <Button
            variant="secondary"
            onClick={() => handleSkip(openCadenceControlOnClose)}
            className={styles.skip_button}
          >
            {t('wizards.common.skipWizard')}
          </Button>
        )}
        <Button dataTest="Form-Save" onClick={saveAndNext}>
          {isSubmitting ? (
            <Spinner color="white" size={14} name="loadingCircle" />
          ) : (
            buttonsConfig?.nextButtonTitle || t('wizards.common.next')
          )}
        </Button>
      </ModalFooter>
    </div>
  );
};

export default NoteAndQQ;
