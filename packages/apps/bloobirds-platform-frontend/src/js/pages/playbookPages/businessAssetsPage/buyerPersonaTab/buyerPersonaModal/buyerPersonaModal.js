import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  Button,
  Callout,
  Input,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
  Select,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import {
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarImage,
  EditorToolbarListsSection,
  EditorToolbarSection,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  serialize,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import { UserHelperKeys, BOBJECT_TYPES } from '@bloobirds-it/types';
import { mutate } from 'swr';

import { useUserSettings } from '../../../../../components/userPermissions/hooks';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../../constants/lead';
import { useEntity } from '../../../../../hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../hooks/entities/useEntity.utils';
import { useEntityActions } from '../../../../../hooks/entities/useEntityActions';
import { useCadences } from '../../../../../hooks/useCadences';
import { useDependencies, useDependenciesFilters } from '../../../../../hooks/useDependencies';
import { useSteppableModal } from '../../../../../hooks/useSteppableModal';
import { useUserHelpers } from '../../../../../hooks/useUserHelpers';
import { randomizeColor } from '../../../../../utils/styles.utils';
import { REFRESHED_ENTITIES } from '../../businessAssetsPage.constants';
import styles from '../../businessAssetsPage.module.css';
import { SegmentationTable } from '../segmentationTable/segmentationTable';

export const BuyerPersonaModal = ({ handleClose, isCreation }) => {
  const totalSteps = 2;
  const { currentStep, handleReset, handleAdvanceStep, modalInfo } = useSteppableModal({
    totalSteps,
  });
  const methods = useForm({ defaultValues: modalInfo[1] });
  const [isLoading, setIsLoading] = useState();
  const settings = useUserSettings();
  const bobjectFields = useEntity('bobjectFields');
  const icpField = bobjectFields.findBy('logicRole')(LEAD_FIELDS_LOGIC_ROLE.ICP);
  const { dependencies } = useDependencies('fieldValueConditions');
  const { setDependenciesFilters } = useDependenciesFilters('fieldValueConditions');
  const { handleUpdateEntity, handleCreateEntity } = useEntityActions();
  const { cadences } = useCadences(BOBJECT_TYPES.LEAD);
  const plugins = useRichTextEditorPlugins();
  const { save } = useUserHelpers();

  const handleCloseModal = () => {
    handleReset();
    handleClose();
  };

  const handleSkip = () => {
    handleCloseModal();
    save(UserHelperKeys.ADD_FIRST_BUYER_PERSONA);
    mutate('/idealCustomerProfiles');
  };

  useEffect(() => {
    setDependenciesFilters({
      requiredParentFieldId: icpField?.id,
      requiredValueId: modalInfo[1]?.id,
    });
  }, [modalInfo]);

  const handleSaveBuyerPersona = values => {
    setIsLoading(true);
    const currentValues = values;
    const shortNameLetters = values.name.replace(/[^a-zA-Z ]/g, ' ').split(' ');
    const shortName =
      shortNameLetters.length >= 2
        ? shortNameLetters[0].slice(0, 1).toUpperCase() +
          shortNameLetters[1].slice(0, 1).toUpperCase()
        : shortNameLetters[0].slice(0, 2).toUpperCase();
    const valuesToSave = {
      ...currentValues,
      cadence: `/cadences/${values.cadence}`,
      account: `/accounts/${settings.account.id}`,
      shortname: shortName,
      color: modalInfo[1]?.color || randomizeColor(),
      description: serialize(values?.description, {
        format: 'AST',
        plugins,
      }),
    };
    if (modalInfo[1] && modalInfo[1]?.id) {
      handleUpdateEntity({
        id: modalInfo[1]?.id,
        entityName: 'idealCustomerProfiles',
        body: valuesToSave,
        label: 'Buyer Persona',
        callback: ({ response, error }) => {
          if (error) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            handleAdvanceStep(response);
            mutate('/idealCustomerProfiles');
            forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
          }
        },
      });
    } else {
      handleCreateEntity({
        entityName: 'idealCustomerProfiles',
        body: valuesToSave,
        label: 'Buyer Persona',
        callback: ({ response, error }) => {
          if (error) {
            setIsLoading(false);
            mutate('/idealCustomerProfiles');
            forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
          } else {
            setIsLoading(false);
            handleAdvanceStep(response);
          }
        },
      });
      save(UserHelperKeys.ADD_FIRST_BUYER_PERSONA);
    }
  };

  const handleSaveLastStep = () => {
    setIsLoading(true);
    handleSkip();
    setIsLoading(false);
  };

  return (
    <Modal open onClose={handleSkip} width={800}>
      <ModalHeader variant="gradient" color="purple">
        <ModalTitle variant="gradient" icon="people">
          <Text size={16} inline color="white">
            {isCreation ? 'Create' : 'Edit'} Buyer Persona | Step {currentStep} / {totalSteps}{' '}
          </Text>
        </ModalTitle>
        <ModalCloseIcon variant="gradient" onClick={handleCloseModal} />
      </ModalHeader>
      {currentStep === 1 && (
        <>
          <FormProvider {...methods}>
            <ModalContent>
              <ModalSection title="Main information" icon="people">
                <div className={styles._main_info__section}>
                  <Text size={16} className={styles._main_info__text}>
                    Select a name that is representative of this buyer persona on its own
                  </Text>
                  <Text size={14} color="softPeanut">
                    E.g.: Sales Manager
                  </Text>
                  <Controller
                    name="name"
                    rules={{
                      required: 'This field is required',
                    }}
                    render={({ onChange, value }) => (
                      <div className={styles._main_info__input}>
                        <Input
                          error={methods.errors.name?.message}
                          placeholder="Name*"
                          size="medium"
                          width="100%"
                          onChange={onChange}
                          value={value}
                          color="purple"
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="cadence"
                    render={({ onChange, value }) => (
                      <div className={styles._main_info__input}>
                        <Select
                          error={methods.errors.cadence?.message}
                          placeholder="Cadence by default"
                          size="medium"
                          width="100%"
                          onChange={onChange}
                          color="purple"
                          value={value}
                        >
                          <Item value={null} key="none" dataTest="buyer-persona-without-cadence">
                            None
                          </Item>
                          {cadences?.map(cadence => (
                            <Item value={cadence.id} key={cadence.id} dataTest={`${cadence.name}`}>
                              {cadence.name}
                            </Item>
                          ))}
                        </Select>
                      </div>
                    )}
                  />
                  <Controller
                    name="description"
                    render={({ onChange, value }) => (
                      <div className={styles._main_info__input}>
                        <Text color="softPeanut" size="s" className={styles._description__title}>
                          Description
                        </Text>
                        <RichTextEditor
                          defaultValue={value}
                          placeholder="Add your description here..."
                          plugins={plugins}
                          width="100%"
                          onChange={onChange}
                        >
                          {editor => (
                            <div className={styles._editor__container}>
                              <EditorToolbar>
                                <EditorToolbarControlsSection />
                                <EditorToolbarFontStylesSection />
                                <EditorToolbarTextMarksSection />
                                <EditorToolbarListsSection />
                                <EditorToolbarSection>
                                  <EditorToolbarImage />
                                </EditorToolbarSection>
                              </EditorToolbar>
                              <div className={styles._editor__container_ast}>{editor}</div>
                            </div>
                          )}
                        </RichTextEditor>
                      </div>
                    )}
                  />
                </div>
              </ModalSection>
            </ModalContent>
            <ModalFooter>
              <Button onClick={handleCloseModal} variant="clear" color="lightPurple">
                CANCEL
              </Button>
              <Button onClick={methods.handleSubmit(handleSaveBuyerPersona)} color="purple">
                {isLoading ? <Spinner color="white" /> : 'SAVE AND CONTINUE'}
              </Button>
            </ModalFooter>
          </FormProvider>
        </>
      )}
      <>
        {currentStep === 2 && (
          <>
            <ModalContent>
              <ModalSection title="Segmentation" icon="filter">
                <div className={styles._main_info__section}>
                  <div className={styles._section__container}>
                    {isCreation && (
                      <div className={styles._callout__container}>
                        <Callout closable icon="questionCircle">
                          <Text weight="bold" size="m">
                            Ask yourself what characteristics this group of people share.
                          </Text>
                          <Text weight="bold" size="s" className={styles._callout__text}>
                            <br /> Are they from the same position level?
                            <br /> Which power of decision they have in the sales process?
                            <br /> Are they of a specific business area?
                          </Text>
                          <Text size="s" className={styles._callout__text}>
                            This set of filters will help you categorise and pre-filter your
                            messaging, your cadences and your results in reporting.
                          </Text>
                        </Callout>
                      </div>
                    )}
                    <Text size={16} className={styles._main_info__text}>
                      Select which fields should filtered when selecting this buyer persona.
                    </Text>
                    <Text size={14} color="softPeanut">
                      E.g.: Sales Manager use to have a Manager or DIrector Function, and the
                      Champion Byuing role
                    </Text>
                    <div className={styles._segmentation__table__container}>
                      {modalInfo[1] ? (
                        <SegmentationTable
                          parentField={icpField}
                          modalInfo={modalInfo}
                          dependencies={dependencies}
                        />
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  </div>
                </div>
              </ModalSection>
            </ModalContent>
            <ModalFooter>
              <div>
                <Button onClick={handleSkip} variant="clear" color="lightPurple">
                  SKIP
                </Button>
              </div>
              <Button onClick={handleSaveLastStep} color="purple">
                {isLoading ? <Spinner color="white" /> : 'SAVE'}
              </Button>
            </ModalFooter>
          </>
        )}
      </>
    </Modal>
  );
};
