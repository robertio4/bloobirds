import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  Button,
  Icon,
  Input,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
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
import { UserHelperKeys } from '@bloobirds-it/types';
import { mutate } from 'swr';

import { useUserSettings } from '../../../../../components/userPermissions/hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../hooks/entities/useEntity.utils';
import { useEntityActions } from '../../../../../hooks/entities/useEntityActions';
import { useSteppableModal } from '../../../../../hooks/useSteppableModal';
import { useUserHelpers } from '../../../../../hooks/useUserHelpers';
import { randomizeColor } from '../../../../../utils/styles.utils';
import { REFRESHED_ENTITIES } from '../../businessAssetsPage.constants';
import styles from '../../businessAssetsPage.module.css';

export const ScenarioModal = ({ handleClose, isCreation }) => {
  const totalSteps = 1;
  const { handleReset, modalInfo } = useSteppableModal({
    totalSteps,
  });
  const methods = useForm({ defaultValues: modalInfo[1] });
  const [isLoading, setIsLoading] = useState();
  const settings = useUserSettings();
  const { handleUpdateEntity, handleCreateEntity } = useEntityActions();
  const plugins = useRichTextEditorPlugins();
  const { save } = useUserHelpers();

  const handleCloseModal = () => {
    handleReset();
    handleClose();
  };

  const handleSaveScenario = values => {
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
        entityName: 'useCases',
        body: valuesToSave,
        label: 'Scenarios',
        callback: ({ error }) => {
          if (error) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            mutate('/useCases');
            forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
            handleCloseModal();
          }
        },
      });
    } else {
      handleCreateEntity({
        entityName: 'useCases',
        body: valuesToSave,
        label: 'Scenarios',
        callback: ({ error }) => {
          if (error) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            handleCloseModal();
            mutate('/useCases');
            forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
          }
        },
      });
      save(UserHelperKeys.DEFINE_FIRST_SCENARIO);
    }
  };

  return (
    <Modal open onClose={handleCloseModal}>
      <ModalHeader variant="gradient" color="purple">
        <ModalTitle variant="gradient">
          <div className={styles._title__container}>
            <Icon name="compass" color="white" className={styles._icon} />
            <Text size={16} inline color="white">
              {isCreation ? 'Create' : 'Edit'} Scenario{' '}
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon variant="gradient" onClick={handleCloseModal} />
      </ModalHeader>
      <>
        <FormProvider {...methods}>
          <ModalContent>
            <ModalSection title="Main information" icon="compass">
              <div className={styles._main_info__section}>
                <Text size={16} className={styles._main_info__text}>
                  Select a name that is representative of this scenario on its own
                </Text>
                <Text size={14} color="softPeanut">
                  E.g.: Doing outbound with CRM
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
                            <EditorToolbar id="signature">
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
            <Button onClick={methods.handleSubmit(handleSaveScenario)} color="purple">
              {isLoading ? <Spinner color="white" /> : 'SAVE'}
            </Button>
          </ModalFooter>
        </FormProvider>
      </>
    </Modal>
  );
};
