import React, { ReactNode, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Button,
  CheckItem,
  Collapsible,
  Icon,
  Input,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  MultiSelect,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Switch,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { usePlaybookSegmentation } from '@bloobirds-it/hooks';
import { MessagingTemplate, TemplateStage } from '@bloobirds-it/types';

import { toSentenceCase } from '../../../../../../utils/strings.utils';
import styles from './templateDecisionModal.module.css';

export interface FormValuesTemplateDecisionModal {
  decision: string;
  name: string;
  stage: TemplateStage;
  visibility?: boolean;
  segmentationValues: Record<TemplateStage, { [fieldId: string]: string[] }>;
}

interface TemplateDecisionModalProps {
  existingTemplate?: MessagingTemplate;
  onSave: (value: FormValuesTemplateDecisionModal) => void;
  onClose: () => void;
  comeFromAutoEmail?: boolean;
}

function TemplateDecisionModal({
  existingTemplate,
  onClose,
  onSave,
  comeFromAutoEmail = false,
}: TemplateDecisionModalProps) {
  const isEdit = !!existingTemplate?.id;
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useFormContext();
  const selectedStage = watch('templates.emailTemplate.stage');
  const decision = watch('templates.emailTemplate.decision');

  const { segmentationFields } = usePlaybookSegmentation(selectedStage);
  useEffect(() => {
    if (!existingTemplate?.id) {
      setValue('templates.emailTemplate.decision', 'create');
    }
  }, []);

  return (
    <Modal open onClose={onClose}>
      <form onSubmit={handleSubmit(onSave)}>
        <ModalHeader className={styles.header} color="veryLightBloobirds">
          <div className={styles.title}>
            <Icon color="softBloobirds" name="mail" />
            <Text size="l" color="peanut">
              {isEdit ? 'Update or create a new template' : 'Save as a template'}
            </Text>
          </div>
          <ModalCloseIcon color="softBloobirds" onClick={onClose} />
        </ModalHeader>
        <ModalContent>
          <Text size="m" weight="bold">
            {isEdit
              ? 'Do you want to update the existing template or create a new one?'
              : 'Add a name for your new template'}
          </Text>
          {isEdit ? (
            <>
              <Text className={styles.description} size="s">
                When a <b>template is updated</b>, any changes that have been made{' '}
                <b>will be applied to the selected template globally</b>. When{' '}
                <b>creating a new one</b>, a copy of this template will be generated, public for
                everyone. These changes <b>will be applied immediately in active cadences.</b>
              </Text>
              <Controller
                name="templates.emailTemplate.decision"
                defaultValue="update"
                control={control}
                render={({ value, onChange }) => (
                  <div style={{ margin: '16px 0' }}>
                    <RadioGroup value={value} onChange={onChange}>
                      <Radio
                        expand
                        size="medium"
                        color="bloobirds"
                        backgroundColor="veryLightBloobirds"
                        value="update"
                      >
                        Update template for everyone
                      </Radio>
                      <Radio
                        expand
                        size="medium"
                        color="bloobirds"
                        backgroundColor="veryLightBloobirds"
                        value="create"
                      >
                        Save and create as new public template
                      </Radio>
                    </RadioGroup>
                  </div>
                )}
              />
            </>
          ) : (
            <Text className={styles.description} size="s">
              By <b>saving as new</b>, a new template will be created, public for everyone. These{' '}
              changes <b>will be applied immediately in active cadences.</b>
            </Text>
          )}
          {(!isEdit || decision === 'create') && (
            <div className={styles.inputWrapper}>
              <Controller
                name="templates.emailTemplate.name"
                control={control}
                defaultValue={isEdit ? `${existingTemplate?.name} Copy` : undefined}
                rules={{
                  required: 'A name for the template is required',
                }}
                render={({ value, onChange }) => (
                  <Input
                    value={value}
                    width="100%"
                    className={styles.input}
                    onChange={onChange}
                    error={errors.name?.message}
                    placeholder="Template name"
                  />
                )}
              />
            </div>
          )}
          <Collapsible
            title={
              <div className={styles.moreOptionsTitle}>
                <Text size="l">More options</Text>
              </div>
            }
            expanded={true}
            color="bloobirds"
          >
            <div className={styles.moreContent}>
              <div className={styles.moreContentSection}>
                <div className={styles.textMeContentWrapper}>
                  <Text size="s">
                    <b>Stage</b>
                  </Text>
                </div>
                <div className={styles.textMeContentWrapper}>
                  <Text size="s">
                    Stage enables to easily use your templates on the company or opportunity view
                    depending on the sales stage you are working
                  </Text>
                </div>
                <Controller
                  name="templates.emailTemplate.stage"
                  control={control}
                  defaultValue={existingTemplate?.stage || TemplateStage.Prospecting}
                  render={({ value, onChange }) => (
                    <div style={{ marginTop: 16 }}>
                      <Select
                        value={value}
                        width="100%"
                        onChange={onChange}
                        placeholder="Prospect stage"
                      >
                        <Item value={TemplateStage.Prospecting}>Prospect stage</Item>
                        <Item value={TemplateStage.Sales}>Sales stage</Item>
                        <Item value={TemplateStage.All}>Prospect and Sales stage</Item>
                      </Select>
                    </div>
                  )}
                />
              </div>
              {!comeFromAutoEmail && (
                <div className={styles.moreContentSection}>
                  <div className={styles.textMeContentWrapper}>
                    <Text size="s">
                      <b>Visibility</b>
                    </Text>
                  </div>
                  <Controller
                    name="templates.emailTemplate.visibility"
                    control={control}
                    defaultValue={true}
                    render={({ value, onChange }) => (
                      <div className={styles.visibility}>
                        <Switch onChange={onChange} checked={value} />
                        <div className={styles.visibilityText}>
                          <Text size="s">Visible for all team members? </Text>
                        </div>
                      </div>
                    )}
                  />
                </div>
              )}
              <div className={styles.moreContentSection}>
                <div className={styles.textMeContentWrapper}>
                  <Text size="s">
                    <b>Categorization</b>
                  </Text>
                </div>
                <Text size="s">
                  Categorizing enables you to easily filter your templates when contacting a lead.
                </Text>
                {segmentationFields &&
                  Object.entries(segmentationFields).map(([stage, messagingFilters]) => (
                    <div key={`segmantation-${stage}`} className={styles.segmentationBlock}>
                      {messagingFilters.length > 0 && selectedStage === TemplateStage.All && (
                        <Text size="xs" color="softPeanut">
                          {toSentenceCase(stage.toLowerCase())}
                        </Text>
                      )}
                      {messagingFilters.length > 0
                        ? messagingFilters.map(filter => (
                            <Controller
                              control={control}
                              key={filter.id}
                              name={`templates.emailTemplate.segmentationValues.${stage}.${filter.id}`}
                              defaultValue={
                                existingTemplate?.segmentationValues?.[stage]?.[filter.id]
                              }
                              render={({ value, onChange }) => (
                                <div style={{ marginTop: 8 }}>
                                  <MultiSelect
                                    width="100%"
                                    sortByChecked={false}
                                    onChange={onChange}
                                    placeholder={
                                      value?.length > 0 ? filter.name : `All ${filter.name}`
                                    }
                                    value={value}
                                  >
                                    {[
                                      <Item key="All" value="">
                                        All {filter.name}
                                      </Item>,
                                      ...(filter.values.map(
                                        (option: {
                                          isEnabled: boolean;
                                          id: React.Key;
                                          name: string & ReactNode;
                                        }) => (
                                          <CheckItem
                                            hidden={!option.isEnabled}
                                            key={option.id}
                                            value={option.id}
                                            label={option.name}
                                          >
                                            {option.name}
                                          </CheckItem>
                                        ),
                                      ) || []),
                                    ]}
                                  </MultiSelect>
                                </div>
                              )}
                            />
                          ))
                        : selectedStage === stage && (
                            <Text size="xs" color="softPeanut" className={styles.segmentationBlock}>
                              No categorization created for this stage
                            </Text>
                          )}
                    </div>
                  ))}
              </div>
            </div>
          </Collapsible>
        </ModalContent>
        <ModalFooter>
          <Button variant="tertiary" color="softBloobirds" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} variant="primary" color="bloobirds" type="submit">
            {isSubmitting ? <Spinner size={16} color="white" name="loadingCircle" /> : 'Continue'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default TemplateDecisionModal;
