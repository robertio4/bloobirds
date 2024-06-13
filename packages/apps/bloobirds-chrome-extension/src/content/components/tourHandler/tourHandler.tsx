import { CSSProperties, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import { IconType, Portal } from '@bloobirds-it/flamingo-ui';
import {
  useActiveAccountId,
  useLocalStorage,
  useNewCadenceTableEnabled,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import { ContactViewSubTab, ExtensionHelperKeys, LocalStorageKeys } from '@bloobirds-it/types';

import { ContactViewFooterTab } from '../contactView/components/contactViewFooter/contactViewFooter';
import { useContactViewContext } from '../contactView/context/contactViewContext';
import { useExtensionContext } from '../context';
import { ActionsComponent } from './components/actionsComponent/actionsComponent';
import { SliderControls } from './components/sliderControls/sliderControls';
import { TourStep } from './components/tourSteps/tourStep';
import { TourSteps } from './components/tourSteps/tourSteps';
import { stepDefinitions, stepElementIds } from './tourHandler.constants';
import styles from './tourHandler.module.css';

const tourSteps = [
  ContactViewSubTab.OVERVIEW,
  ContactViewSubTab.ACTIVITIES,
  ContactViewSubTab.TASKS,
  ContactViewSubTab.PLAYBOOK,
  'ACTIONS',
] as const;

const tourStepsIconDictionary: Record<ContactViewSubTab | 'ACTIONS', IconType> = {
  [ContactViewSubTab.OVERVIEW]: 'assignBoard',
  [ContactViewSubTab.ACTIVITIES]: 'activity',
  [ContactViewSubTab.TASKS]: 'checkDouble',
  [ContactViewSubTab.PLAYBOOK]: 'magic',
  ACTIONS: 'calendarphone',
} as const;

function getElementPosition(tourStepIndex: number): CSSProperties {
  const isActionsStep = tourSteps[tourStepIndex] === 'ACTIONS';
  const selector = `contact-view-${!isActionsStep ? ContactViewSubTab.OVERVIEW : 'ACTIONS'}-tab`;
  const element = document.querySelector(`[data-test= "${selector}"]`);
  const elementVerticalPosition = element?.getBoundingClientRect()?.top + (isActionsStep ? 95 : 0);

  const elementHorizontalPosition = document
    .querySelector('[data-test= "contact-view-Overview-tab"]')
    ?.getBoundingClientRect()?.left;

  if (!elementVerticalPosition || !elementHorizontalPosition) return null;

  return {
    position: 'absolute',
    top: `${elementVerticalPosition - 200}px`,
    left: `${elementHorizontalPosition - 240}px`,
  };
}
export const TourHandler = () => {
  const { setActiveSubTab } = useContactViewContext();
  const { get } = useLocalStorage();
  const { has, save } = useUserHelpers();
  const { t } = useTranslation();
  const [tourStepIndex, setTourStepIndex] = useState<number>(0);
  const [tourVisible, setTourVisible] = useState<boolean>(true);

  function closeModal() {
    save(ExtensionHelperKeys.TOUR_DONE);
    setTourVisible(false);
  }

  const inheritedStyle = getElementPosition(tourStepIndex);

  function handleChangeStep(position: number) {
    setTourStepIndex(position);
    setActiveSubTab(
      (tourSteps[position] !== 'ACTIONS'
        ? tourSteps[position]
        : ContactViewSubTab.OVERVIEW) as ContactViewSubTab,
    );
  }

  if (tourVisible && !has(ExtensionHelperKeys.TOUR_DONE) && get(LocalStorageKeys.IsMenuOpen)) {
    return (
      <>
        <Portal>
          <div className={styles.overlay}>
            <div>
              <div
                className={styles.modal}
                {...(inheritedStyle ? { style: { ...inheritedStyle } } : {})}
              >
                <TourSteps position={tourStepIndex} setPosition={setTourStepIndex}>
                  {Object.values(stepDefinitions).map((stepDefinition, index) => (
                    <TourStep key={index} t={t} handleClose={closeModal} {...stepDefinition} />
                  ))}
                </TourSteps>
                <SliderControls
                  length={Object.keys(stepElementIds).length}
                  setPosition={handleChangeStep}
                  position={tourStepIndex}
                  closeModal={closeModal}
                />
              </div>
            </div>
          </div>
        </Portal>
        <OverlayDigger selectedStep={tourSteps[tourStepIndex]} />
      </>
    );
  } else {
    return null;
  }
};

const OverlayHighlight = ({ selectedStep }: { selectedStep: ContactViewSubTab | 'ACTIONS' }) => {
  switch (selectedStep) {
    case ContactViewSubTab.OVERVIEW:
    case ContactViewSubTab.ACTIVITIES:
    case ContactViewSubTab.TASKS:
    case ContactViewSubTab.PLAYBOOK:
      return (
        <ContactViewFooterTab
          name={selectedStep}
          icon={tourStepsIconDictionary[selectedStep]}
          onClick={() => null}
          color="bloobirds"
          selected={selectedStep}
        />
      );
    case 'ACTIONS':
      return <ActionsComponent />;
  }
};

function hasMountedPlaceholder(element) {
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i] as HTMLElement;
    if (child.id === 'tour-handler-portal') {
      return true;
    }
  }
  return false;
}
const OverlayDigger = ({ selectedStep }: { selectedStep: typeof tourSteps[number] }) => {
  const { useGetSidePeekEnabled } = useExtensionContext();
  const isSidepeekEnabled = useGetSidePeekEnabled();
  const accountId = useActiveAccountId();
  const hasCustomTaskEnabled = useNewCadenceTableEnabled(accountId);

  const portalContainerRef = useRef(null);
  const selector = `contact-view-${selectedStep}-tab`;

  const element = document.querySelector(`[data-test= "${selector}"]`);
  const elementPosition = element?.getBoundingClientRect();

  useEffect(() => {
    const placeholderElement = document.createElement('div');
    placeholderElement?.setAttribute('id', 'tour-handler-portal');
    portalContainerRef.current = placeholderElement;
    if (element && !hasMountedPlaceholder(element)) {
      element?.appendChild(portalContainerRef.current);
    }
  }, [element]);

  if (!portalContainerRef.current) return null;

  const sidepeekCorrection = Math.floor(
    (window.innerWidth * 0.3 - (hasCustomTaskEnabled ? 338 : 296)) / 2,
  );

  const portalStyleProps: Partial<CSSProperties> = {
    position: 'fixed',
    left:
      elementPosition?.left +
      (selectedStep === 'ACTIONS' && isSidepeekEnabled ? sidepeekCorrection : 0),
    top: elementPosition?.top - (selectedStep === 'ACTIONS' ? 7 : 0),
    background: 'white',
    zIndex: 104,
    ...(selectedStep === 'ACTIONS' ? { height: '48px' } : {}),
  };

  return ReactDOM.createPortal(
    <Portal>
      <div style={portalStyleProps}>
        <OverlayHighlight selectedStep={selectedStep} />
      </div>
    </Portal>,
    portalContainerRef.current,
  );
};
