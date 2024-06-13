import React from 'react';

import { Button, Modal, ModalContent, ModalFooter } from '@bloobirds-it/flamingo-ui';
import { PluralBobjectTypes } from '@bloobirds-it/types';

import styles from '../../../../changeStatusModal/changeStatusModal.module.css';
import { useBulkActionsFeedbackModal } from '../feedbackModal/useBulkActionsFeedbackModal';
import { InfoExtra, UpdateIcon } from './components/components';
import { UpdateProperty } from './components/updateProperty/updateProperty';
import { useInternalUpdateProperty } from './components/updateProperty/useInternalUpdateProperty';
import useUpdatePropertyModal from './useUpdatePropertyModal';

const UpdatePropertyModal = () => {
  const { bobjects, closeUpdatePropertyModal } = useUpdatePropertyModal();
  const { toggleModalVisibility } = useBulkActionsFeedbackModal();
  const { shouldDisableButton, sendPropertiesToBE, useAllItems } = useInternalUpdateProperty();
  if (!bobjects || bobjects.length === 0) {
    return null;
  }
  const bobjectType = bobjects[0].id.typeName;
  const objectsLength =
    useAllItems && typeof useAllItems !== 'boolean' ? useAllItems?.totalItems : bobjects?.length;
  const bobjectTypeName =
    bobjects.length > 1 ? PluralBobjectTypes[bobjectType].toLowerCase() : bobjectType.toLowerCase();

  const handleUpdateProperties = () => {
    sendPropertiesToBE(bobjectType, bobjects);
    closeUpdatePropertyModal();
    toggleModalVisibility();
  };

  return (
    <Modal
      open
      onClose={closeUpdatePropertyModal}
      title={`Bulk Edit in ${objectsLength} ${bobjectTypeName}`}
    >
      <ModalContent>
        <UpdateIcon />
        <UpdateProperty bobjectType={bobjectType} />
        <InfoExtra />
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          <Button variant="clear" color="tomato" onClick={closeUpdatePropertyModal}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProperties} disabled={shouldDisableButton}>
            Update
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default UpdatePropertyModal;
