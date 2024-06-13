import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import AddQcToLeadModal from '../../../../components/addQcToLeadModal/addQcToLeadModal';
import { useSelectedLead } from '../../../../hooks/useSelectedLead';
import styles from './emptyCard.module.css';

const EmptyCard = () => {
  const { selectedLead: activeLead } = useSelectedLead();
  const [openAddModal, setOpenAddModal] = useState(false);
  return (
    <>
      <div className={styles._container}>
        <div className={styles._add_button__container} onClick={() => setOpenAddModal(true)}>
          <Icon name="add" size="30" />
        </div>
        <Text size="s" color="bloobirds" uppercase>
          Add qualified company
        </Text>
      </div>
      {openAddModal && (
        <AddQcToLeadModal
          open={openAddModal}
          handleClose={() => setOpenAddModal(false)}
          lead={activeLead}
        />
      )}
    </>
  );
};

export default EmptyCard;
