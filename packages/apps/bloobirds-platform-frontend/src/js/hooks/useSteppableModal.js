import { useEffect } from 'react';

import { deserialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { atom, useRecoilState } from 'recoil';

import { useBobjectTypes } from './useBobjectTypes';
import { useCadences } from './useCadences';

const steppableModalAtom = atom({
  key: 'steppableModalAtom',
  default: {},
});

const stepsAtom = atom({
  key: 'steppableModalsAtom',
  default: 1,
});

const isCreationModalAtom = atom({
  key: 'steppableModalIsCreationModalAtom',
  default: false,
});

export const useSteppableModal = ({ totalSteps, initialStep = 1 }) => {
  const [currentStep, setCurrentStep] = useRecoilState(stepsAtom);
  const [modalInfo, setModalInfo] = useRecoilState(steppableModalAtom);

  const handleReset = () => {
    setModalInfo({});
    setCurrentStep(initialStep);
  };

  const handleAdvanceStep = info => {
    if (totalSteps === currentStep) {
      handleReset();
    } else {
      setModalInfo({
        ...modalInfo,
        [currentStep]: {
          ...info,
        },
      });
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  return {
    currentStep,
    modalInfo,
    setModalInfo,
    handleAdvanceStep,
    handleReset,
    handleBack,
  };
};

const targetMarketModalOpen = atom({
  key: 'targetMarketModalOpen',
  default: false,
});

export const useOpenTargetMarketModal = () => {
  const { setModalInfo, handleReset } = useSteppableModal({ totalSteps: 2 });
  const { cadences } = useCadences(BOBJECT_TYPES.COMPANY);
  const companyTypeId = useBobjectTypes()?.findBy('name')(BOBJECT_TYPES.COMPANY)?.id;
  const [modalOpen, setModalOpen] = useRecoilState(targetMarketModalOpen);
  const [isCreation, setIsCreation] = useRecoilState(isCreationModalAtom);
  const plugins = useRichTextEditorPlugins({
    replaceParagraphs: true,
  });

  const handleOpenCreateEditModal = ({ targetMarket, isCreationType }) => {
    if (targetMarket) {
      setModalInfo({
        1: {
          id: targetMarket?.id,
          name: targetMarket?.name,
          color: targetMarket?.color,
          cadence: cadences
            ?.filter(cadence => cadence?.name === targetMarket?.defaultCadence)
            .find(cadence => cadence.bobjectType === companyTypeId)?.id,
          description: targetMarket.description
            ? deserialize(targetMarket.description, { format: 'HTML', plugins })
            : undefined,
        },
      });
    }
    setIsCreation(isCreationType);
    setModalOpen(true);
  };

  const handleCloseTargetMarketModal = () => {
    handleReset();
    setModalOpen(false);
  };

  return {
    modalOpen,
    isCreation,
    handleOpenCreateEditModal,
    handleCloseTargetMarketModal,
  };
};

export const useOpenScenarioModal = () => {
  const { setModalInfo, handleReset } = useSteppableModal({ totalSteps: 1 });
  const [isCreation, setIsCreation] = useRecoilState(isCreationModalAtom);
  const [modalOpen, setModalOpen] = useRecoilState(targetMarketModalOpen);
  const plugins = useRichTextEditorPlugins({
    replaceParagraphs: true,
  });

  const handleOpenCreateEditModal = ({ scenario, isCreationType }) => {
    if (scenario) {
      setModalInfo({
        1: {
          id: scenario?.id,
          name: scenario?.name,
          color: scenario?.color,
          description: scenario.description
            ? deserialize(scenario.description, { format: 'HTML', plugins })
            : undefined,
        },
      });
    }
    setIsCreation(isCreationType);
    setModalOpen(true);
  };

  const handleCloseTargetMarketModal = () => {
    handleReset();
    setModalOpen(false);
  };

  return {
    modalOpen,
    isCreation,
    handleOpenCreateEditModal,
    handleCloseTargetMarketModal,
  };
};

export const useOpenBuyerPersonaModal = () => {
  const { setModalInfo, handleReset } = useSteppableModal({ totalSteps: 2 });
  const [modalOpen, setModalOpen] = useRecoilState(targetMarketModalOpen);
  const [isCreation, setIsCreation] = useRecoilState(isCreationModalAtom);
  const { cadences } = useCadences(BOBJECT_TYPES.LEAD);
  const plugins = useRichTextEditorPlugins({
    replaceParagraphs: true,
  });

  const handleOpenCreateEditModal = ({ buyerPersona, isCreationType }) => {
    if (buyerPersona) {
      setModalInfo({
        1: {
          id: buyerPersona?.id,
          name: buyerPersona?.name,
          color: buyerPersona?.color,
          description: buyerPersona.description
            ? deserialize(buyerPersona.description, { format: 'HTML', plugins })
            : undefined,
          cadence: cadences?.find(cadence => cadence?.name === buyerPersona?.defaultCadence)?.id,
        },
      });
    }
    setIsCreation(isCreationType);
    setModalOpen(true);
  };

  const handleCloseBuyerPersonaModal = () => {
    handleReset();
    setModalOpen(false);
  };

  return {
    modalOpen,
    isCreation,
    handleOpenCreateEditModal,
    handleCloseBuyerPersonaModal,
  };
};
