import React, { useCallback, useEffect, useState } from 'react';

import { IconButton, Portal } from '@bloobirds-it/flamingo-ui';
import PropTypes from 'prop-types';

import { withWrappers } from '../../../misc/utils';
import { FiltersSettings } from '../../filtersModal/filtersSettings/filtersSettings';
import StepCategories from './stepCategories';
import StepFields from './stepFields';
import { useViewEditionContext } from './viewEdition.context';
import styles from './viewEditionModal.module.css';

const STEPS = {
  categories: StepCategories,
  fields: StepFields,
};

const ViewEditionModal = ({ handleCloseModal, modalType }) => {
  const { setModalType, displaySettings, setDisplaySettings } = useViewEditionContext();
  const [step, setStep] = useState('categories');
  const [bobjectType, setBobjectType] = useState();
  const [open, setOpen] = useState(false);
  const [fromBobjectType, setFromBobjectType] = useState();

  useEffect(() => {
    if (modalType) {
      setModalType(modalType);
      setOpen(true);
    }
  }, [open, modalType]);

  const goToStep = useCallback(
    (stepName, bt, fromBt) => {
      setStep(stepName);
      setBobjectType(bt);
      setFromBobjectType(fromBt);
    },
    [setStep, setBobjectType, fromBobjectType],
  );

  const StepComponent = STEPS[step];

  const onCloseModal = useCallback(() => {
    handleCloseModal();
  }, []);

  return (
    <>
      {open && (
        <Portal>
          <div
            aria-labelledby="add-element-modal-title"
            aria-describedby="add-element-modal-description"
            className={styles._overlay}
            onClick={() => handleCloseModal()}
          />

          <div className={styles._container}>
            {!displaySettings && (
              <>
                <div className={styles._close_button}>
                  <IconButton
                    name="settings"
                    onClick={() => setDisplaySettings(true)}
                    color="bloobirds"
                  />
                  <IconButton name="cross" onClick={onCloseModal} color="peanut" />
                </div>
                <StepComponent
                  bobjectType={bobjectType}
                  fromBobjectType={fromBobjectType}
                  goToStep={goToStep}
                  handleCloseModal={onCloseModal}
                />
              </>
            )}
            {displaySettings && (
              <FiltersSettings onBack={() => setDisplaySettings(false)} onClose={onCloseModal} />
            )}
          </div>
        </Portal>
      )}
    </>
  );
};

ViewEditionModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};

export default withWrappers({ router: true })(ViewEditionModal);
