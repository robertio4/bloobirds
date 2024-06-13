import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  Button,
  Callout,
  CheckItem,
  Icon,
  Input,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
  MultiSelect,
  Select,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import {
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  serialize,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import { UserHelperKeys, BOBJECT_TYPES } from '@bloobirds-it/types';
import { mutate } from 'swr';

import { useUserSettings } from '../../../../../components/userPermissions/hooks';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../../constants/lead';
import { useEntity } from '../../../../../hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../hooks/entities/useEntity.utils';
import { useEntityActions } from '../../../../../hooks/entities/useEntityActions';
import { useBobjectTypes } from '../../../../../hooks/useBobjectTypes';
import { useCadences } from '../../../../../hooks/useCadences';
import {
  useDependencies,
  useDependenciesActions,
  useDependenciesFilters,
} from '../../../../../hooks/useDependencies';
import { useSteppableModal } from '../../../../../hooks/useSteppableModal';
import { useUserHelpers } from '../../../../../hooks/useUserHelpers';
import { randomizeColor } from '../../../../../utils/styles.utils';
import { REFRESHED_ENTITIES } from '../../businessAssetsPage.constants';
import styles from '../../businessAssetsPage.module.css';
import { SegmentationTable } from '../../buyerPersonaTab/segmentationTable/segmentationTable';

export const TargetMarketModal = ({ handleClose, isCreation }) => {
  const totalSteps = 2;
  const { currentStep, handleReset, handleAdvanceStep, modalInfo } = useSteppableModal({
    totalSteps,
  });
  const methods = useForm({ defaultValues: modalInfo[1] });
  const [isLoading, setIsLoading] = useState();
  const settings = useUserSettings();
  const bobjectTypes = useBobjectTypes();
  const companyId = bobjectTypes?.findBy('name')(BOBJECT_TYPES.COMPANY).id;
  const { cadences } = useCadences(BOBJECT_TYPES.COMPANY);
  const bobjectFields = useEntity('bobjectFields');
  const targetMarketField = bobjectFields.findBy('logicRole')(
    COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  );
  const icpField = bobjectFields.findBy('logicRole')(LEAD_FIELDS_LOGIC_ROLE.ICP);
  const idealCustomerProfiles = useEntity('idealCustomerProfiles')?.all();
  const { dependencies } = useDependencies('fieldValueConditions');
  const { handleSaveDependency } = useDependenciesActions();
  const { setDependenciesFilters } = useDependenciesFilters('fieldValueConditions');
  const icpDependencies = dependencies
    ?.find(dep => dep?.childField?.name === icpField?.id)
    ?.fieldValuesToDisplay?.flatMap(value => value?.name);
  const { handleUpdateEntity, handleCreateEntity } = useEntityActions();
  const [selectedBuyerPersonas, setSelectedBuyerPersonas] = useState(icpDependencies);
  const plugins = useRichTextEditorPlugins({
    images: false,
  });
  const { save } = useUserHelpers();

  const handleCloseModal = () => {
    handleReset();
    handleClose();
    setSelectedBuyerPersonas();
  };

  const handleSkip = () => {
    handleCloseModal();
    save(UserHelperKeys.CREATE_FIRST_TARGET_MARKET);
    mutate('/targetMarket');
  };

  useEffect(() => {
    setDependenciesFilters({
      requiredParentFieldId: targetMarketField?.id,
      requiredValueId: modalInfo[1]?.id,
    });
  }, [modalInfo]);

  useEffect(() => {
    setSelectedBuyerPersonas(icpDependencies);
  }, [dependencies]);

  const handleSaveTargetMarket = values => {
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
        entityName: 'targetMarkets',
        body: valuesToSave,
        label: 'Target Market',
        callback: ({ response, error }) => {
          if (error) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            handleAdvanceStep(response);
            mutate('/targetMarket');
            forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
          }
        },
      });
    } else {
      handleCreateEntity({
        entityName: 'targetMarkets',
        body: valuesToSave,
        label: 'Target Market',
        callback: ({ response, error }) => {
          if (error) {
            setIsLoading(false);
            mutate('/targetMarket');
            forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
          } else {
            setIsLoading(false);
            handleAdvanceStep(response);
          }
        },
      });
    }
  };

  const handleSaveLastStep = () => {
    setIsLoading(true);
    if (selectedBuyerPersonas) {
      handleSaveDependency(
        'fieldValueConditions',
        {
          requiredParentFieldId: targetMarketField?.id,
          requiredValueId: modalInfo ? modalInfo[1]?.id : null,
          childFieldId: icpField?.id,
          fieldValuesToDisplayId: selectedBuyerPersonas,
        },
        () => {
          handleClose();
          handleReset();
          setIsLoading(false);
          setSelectedBuyerPersonas();
        },
      );
      save(UserHelperKeys.CREATE_FIRST_TARGET_MARKET);
    } else {
      handleSkip();
      setIsLoading(false);
    }
  };
  return (
    <Modal open onClose={handleSkip} width={800}>
      <ModalHeader variant="gradient" color="purple">
        <ModalTitle variant="gradient">
          <div className={styles._title__container}>
            <Icon name="company" color="white" className={styles._icon} />
            <Text size={16} inline color="white">
              {isCreation ? 'Create' : 'Edit'} Target Market | Step {currentStep} / {totalSteps}{' '}
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon variant="gradient" onClick={handleCloseModal} />
      </ModalHeader>
      {currentStep === 1 && (
        <>
          <FormProvider {...methods}>
            <ModalContent>
              <ModalSection title="Main information" icon="company">
                <div className={styles._main_info__section}>
                  <Text size={16} className={styles._main_info__text}>
                    Select a name that is representative of this target on its own
                  </Text>
                  <Text size={14} color="softPeanut">
                    E.g.: B2B Retail LATAM
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
                    rules={{
                      required: 'This field is required',
                    }}
                    render={({ onChange, value }) => (
                      <div className={styles._main_info__input}>
                        <Select
                          error={methods.errors.cadence?.message}
                          placeholder="Cadence by default*"
                          size="medium"
                          width="100%"
                          onChange={onChange}
                          color="purple"
                          value={value}
                        >
                          {cadences
                            ?.filter(cadence => cadence?.bobjectType === companyId)
                            ?.map(cadence => (
                              <Item
                                value={cadence.id}
                                key={cadence.id}
                                dataTest={`${cadence.name}`}
                              >
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
                          style={{
                            fontFamily: 'Proxima Nova Soft',
                          }}
                        >
                          {editor => (
                            <div className={styles._editor__container}>
                              <EditorToolbar id="signature">
                                <EditorToolbarControlsSection />
                                <EditorToolbarFontStylesSection />
                                <EditorToolbarTextMarksSection />
                                <EditorToolbarListsSection />
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
              <Button onClick={methods.handleSubmit(handleSaveTargetMarket)} color="purple">
                {isLoading ? <Spinner name="loadingCircle" color="white" /> : 'SAVE AND CONTINUE'}
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
                            Ask yourself what characteristics this group of companies share.
                          </Text>
                          <Text weight="bold" size="s" className={styles._callout__text}>
                            <br /> Are they from the same countries?
                            <br /> Are they of the same industry type?
                            <br /> Are they of a specific tier or billing level?
                            <br /> Do they share a common product-to-sell?
                          </Text>
                          <Text size="s" className={styles._callout__text}>
                            This set of filters will help you categorise and pre-filter your
                            messaging, your cadences and your results in reporting.
                          </Text>
                        </Callout>
                      </div>
                    )}
                    <Text size={16} className={styles._main_info__text}>
                      Select which fields should filtered when selecting this target market
                    </Text>
                    <Text size={14} color="softPeanut">
                      E.g.: For B2B Retail LATAM selects Mexico & Brazil in the country field.
                    </Text>
                    <div className={styles._segmentation__table__container}>
                      {modalInfo[1] ? (
                        <SegmentationTable
                          parentField={targetMarketField}
                          modalInfo={modalInfo}
                          dependencies={dependencies?.filter(
                            dep => dep?.childField?.name !== icpField?.id,
                          )}
                        />
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  </div>
                  <div className={styles._section__container}>
                    <Text size={16} className={styles._main_info__text}>
                      Select the Buyer personas of this target
                    </Text>
                    <Text size={14} color="softPeanut">
                      E.g.: For B2B Retail LATAM will be Sales Manager and CEO.
                    </Text>
                    <MultiSelect
                      selectAllOption
                      onChange={value => setSelectedBuyerPersonas(value)}
                      value={selectedBuyerPersonas}
                      className={styles._multiselect__container}
                      width={400}
                      color="purple"
                      placeholder="Buyer personas"
                    >
                      {idealCustomerProfiles?.map(icp => (
                        <CheckItem key={icp.id} value={icp.id}>
                          {icp.name}
                        </CheckItem>
                      ))}
                    </MultiSelect>
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
                {' '}
                {isLoading ? <Spinner name="loadingCircle" color="white" /> : 'SAVE'}
              </Button>
            </ModalFooter>
          </>
        )}
      </>
    </Modal>
  );
};
