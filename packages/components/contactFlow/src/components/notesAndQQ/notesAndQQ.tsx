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
import { ACTIVITY_FIELDS_LOGIC_ROLE, TemplateStage } from '@bloobirds-it/types';
import { getFieldByLogicRole, isHtml } from '@bloobirds-it/utils';
import sortBy from 'lodash/sortBy';

import { useContactFlow } from '../../hooks';
import { useContactFlowData } from '../../hooks/useContactFlowData';
import QualifiyingQuestionsPlaceholder from './QQPlaceholder/qualifyingQuestionPlaceholder';
import styles from './notesAndQQ.module.css';
import { QualifyingQuestion } from './qualifyingQuestion/qualifyingQuestion';

export function NoteRichTextEditor({ note, onChange }: { note: string; onChange: any }) {
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });
  const { t } = useTranslation('translation', { keyPrefix: 'contactFlowModal.notesAndQQ' });

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

const NoteAndQQ = ({
  handleNext,
  handleBack,
  handleSkip,
}: {
  handleNext: () => void;
  handleBack?: () => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
}) => {
  const {
    activity,
    referenceBobject,
    activityLead,
    noteStepData,
    setNoteStepData,
    buttonStepConfig,
  } = useContactFlow();
  const { t } = useTranslation('translation', { keyPrefix: 'contactFlowModal.notesAndQQ' });

  const { handleSubmit } = useContactFlowData();
  const [qualifyingQuestionsToSave, setQualifyingQuestionsToSave] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isAST, setIsAST] = useState(false);
  const stage = TemplateStage.Prospecting;
  const bobjectType = !activityLead ? 'Company' : 'Lead';
  //const messagingFilters = useMessagingFilterOptions(stage);
  //const [alreadySelected, setAlreadySelected] = useState(false);
  //const [segmentationValues, setSegmentationValues] = useState({});
  //const { settings, mutate: reloadUserSettings } = useActiveUserSettings();
  const { isLoading, qualifyingQuestions, updateQualifyingQuestionsValue } = useQualifyingQuestions(
    {
      enabled: true,
      stage,
      segmentationValues: {},
      bobjectType,
    },
  );
  const showSkipButton =
    buttonStepConfig?.showSkipButton != undefined ? buttonStepConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonStepConfig?.hasPreviousStep != undefined ? buttonStepConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonStepConfig?.openCadenceOnSkip != undefined ? buttonStepConfig?.openCadenceOnSkip : false;

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

  /* useEffect(() => {
    if (!alreadySelected) {
      const newFiltersValue = {};
      messagingFilters.forEach(filter => {
        const companyField = getFieldById(activityCompany, filter.id)?.value;
        const leadField = getFieldById(activityLead, filter.id)?.value;
        const value = companyField || leadField;
        if (value) {
          newFiltersValue[filter.id] = [value];
        }
      });

      // Prevent qualifying question from updating the filters
      if (Object.keys(newFiltersValue).length !== 0) {
        setAlreadySelected(true);
      }

      setSegmentationValues(newFiltersValue);
    }
  }, [activityCompany, activityLead, messagingFilters.length]);*/

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
    <div className={styles.wrapper}>
      <ModalContent>
        <div data-test="Text-Modal-Note&amp;QQ" className={styles._content__wrapper}>
          <>
            <section className={styles.column}>
              <header className={styles.sectionHeader}>
                <Icon name="chat" size={24} color="softPeanut" />
                <Text size="m" color="softPeanut" weight="medium" htmlTag="h2">
                  {t('title')}
                </Text>
              </header>
              <div className={styles._section__wrapper}>{textarea}</div>
            </section>
            <section className={styles.column}>
              <header className={styles.sectionHeader}>
                <Icon name="chat" size={24} color="softPeanut" />
                <Text size="m" color="softPeanut" weight="medium" htmlTag="h2">
                  {t('fillQQ')}
                </Text>
              </header>
              <div className={styles._section__wrapper}>
                {isLoading ? (
                  <QualifiyingQuestionsPlaceholder width={400} />
                ) : (
                  <>
                    {sortBy(qualifyingQuestions, 'question').map(({ id, ...props }) => {
                      const qqFieldValue = referenceBobject?.rawBobject
                        ? referenceBobject.rawBobject?.[id]
                        : //@ts-ignore
                          referenceBobject?.raw?.contents?.[id];
                      const currentValue = qualifyingQuestionsToSave.find(
                        ({ id: qqId }) => qqId === id,
                      )?.value;
                      const qqValue = currentValue || qqFieldValue;

                      return (
                        <QualifyingQuestion
                          {...props}
                          key={id}
                          value={qqValue}
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
        <Button dataTest="Form-Save" onClick={saveAndNext}>
          {isSubmitting ? (
            <Spinner color="white" size={14} name="loadingCircle" />
          ) : (
            buttonStepConfig?.nextButtonTitle || t('saveAndContinue')
          )}
        </Button>
      </ModalFooter>
    </div>
  );
};

export default NoteAndQQ;
