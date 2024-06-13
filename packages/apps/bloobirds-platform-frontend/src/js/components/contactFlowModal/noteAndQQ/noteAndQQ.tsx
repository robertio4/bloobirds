import React, { useEffect, useState } from 'react';

import {
  Button,
  ModalContent,
  ModalFooter,
  ModalSection,
  Spinner,
  TextArea,
} from '@bloobirds-it/flamingo-ui';
import { ButtonsStepConfig } from '@bloobirds-it/types';
import clsx from 'clsx';
import { sortBy } from 'lodash';

import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../constants/activity';
import {
  useContactFlow,
  useLeads,
  useMessagingFilterOptions,
  useQualifyingQuestions,
} from '../../../hooks';
import { useContactBobjects } from '../../../pages/contactPages/contactPageContext';
import { getFieldById, getFieldByLogicRole } from '../../../utils/bobjects.utils';
import QualifyingQuestion from '../../qualifyingQuestions/qualifyingQuestion/qualifyingQuestion';
import QualifiyingQuestionsPlaceholder from '../../qualifyingQuestions/qualifyingQuestionsPlaceholder/qualifiyingQuestionsPlaceholder';
import { useUserSettings } from '../../userPermissions/hooks';
import styles from './noteAndQQ.module.css';

const NoteAndQQ = ({
  handleNext,
  handleBack,
  handleSkip,
  buttonsConfig,
}: {
  handleNext: () => void;
  handleBack?: () => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
  buttonsConfig?: ButtonsStepConfig;
}) => {
  const { activity, noteStepData, setNoteStepData, updateActivity } = useContactFlow();
  const [qualifyingQuestionsToSave, setQualifyingQuestionsToSave] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { company } = useContactBobjects();
  const { leads } = useLeads('contactFlow');
  const stage = 'PROSPECT';
  const bobjectType = leads.length === 0 ? 'Company' : 'Lead';
  const messagingFilters = useMessagingFilterOptions(stage);
  const [alreadySelected, setAlreadySelected] = useState(false);
  const [segmentationValues, setSegmentationValues] = useState({});
  const settings = useUserSettings();
  const {
    isLoading,
    qualifyingQuestions,
    updateQualifyingQuestionsValueInBulk,
  } = useQualifyingQuestions({
    enabled: true,
    stage,
    segmentationValues,
    bobjectType,
  });
  const lead = leads[0];

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;

  useEffect(() => {
    if (activity && !noteStepData) {
      const noteField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);

      setNoteStepData({
        value: noteField.text,
        fieldId: noteField.name,
      });
    }
  }, [activity]);

  useEffect(() => {
    if (!alreadySelected) {
      const newFiltersValue = {} as Record<string, string[]>;
      messagingFilters.forEach((filter: { id: string }) => {
        const companyField = getFieldById(company, filter.id)?.value;
        const leadField = getFieldById(lead, filter.id)?.value;
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
  }, [company, lead, messagingFilters.length]);

  const saveAndNext = async () => {
    setIsSubmitting(true);
    if (noteStepData?.value) {
      const data = {
        [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: noteStepData?.value,
      };
      await updateActivity(activity?.id.objectId, data);
    }
    if (qualifyingQuestionsToSave?.length > 0) {
      await updateQualifyingQuestionsValueInBulk(bobjectType, qualifyingQuestionsToSave).then(
        () => {
          setIsSubmitting(false);
          setHasChanges(false);
        },
      );
    }
    handleNext();
  };

  const textarea = (
    <TextArea
      value={noteStepData?.value}
      rows={16}
      placeholder={!noteStepData?.value ? 'Add a note' : null}
      width="100%"
      onChange={value =>
        setNoteStepData({
          ...noteStepData,
          value,
        })
      }
    />
  );

  // That's disgusting, I know, it's made for the business
  const shouldSeeTheNotes = settings?.account?.id !== 'l4kLMfwjJ8sDqsrW';

  return (
    <>
      <ModalContent>
        <div data-test="Text-Modal-Note&amp;QQ" className={styles._content__wrapper}>
          <>
            {shouldSeeTheNotes && (
              <ModalSection size="l" title="How was the call?" icon="chat">
                <div className={styles._section__wrapper}>{textarea}</div>
              </ModalSection>
            )}
            <ModalSection
              size="l"
              title="Fill in the qualifying questions"
              icon="chat"
              className={clsx({
                [styles._full_section]: !shouldSeeTheNotes,
              })}
            >
              <div
                className={styles._section__wrapper}
                style={{
                  width: shouldSeeTheNotes ? null : '100%',
                }}
              >
                {isLoading ? (
                  <QualifiyingQuestionsPlaceholder width={400} />
                ) : (
                  <>
                    {sortBy(qualifyingQuestions, 'question').map(({ id, ...props }) => {
                      const qqFieldValue = getFieldById(lead || company, id)?.value;
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
                                    bobjectId: lead?.id.objectId || company?.id.objectId,
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
            </ModalSection>
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
            {buttonsConfig?.previousButtonTitle || 'Back'}
          </Button>
        )}
        {showSkipButton && (
          <Button
            variant="secondary"
            onClick={() => handleSkip(openCadenceControlOnClose)}
            className={styles.skip_button}
          >
            Skip
          </Button>
        )}
        <Button dataTest="Form-Save" onClick={saveAndNext}>
          {isSubmitting ? (
            <Spinner color="white" size={14} name="loadingCircle" />
          ) : (
            buttonsConfig?.nextButtonTitle || 'Save and continue'
          )}
        </Button>
      </ModalFooter>
    </>
  );
};

export default NoteAndQQ;
