import React, { useState } from 'react';
import { Dropdown, IconButton, IconType, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { toTitleCase } from '@bloobirds-it/utils';
import { SaveEditActions } from './saveEditButton.typing';
import styles from './saveEdit.module.css';
import { api } from '../../../../utils/api';
import WithTooltip from '../../../withTooltip/withTooltip';
import { SaveEditModal } from './saveEditModal/saveEditModal';
import { useBobjectTable } from '../../useBobjectTable';
import { SaveEditConfirmationModal } from './saveEditConfirmationModal/saveEditConfirmationModal';
import { forceSelectedEntitiesCacheRefresh } from '../../../../hooks/entities/useEntity.utils';
import { ListDropdown } from './saveEditDropdowns/listDropdown';
import { InboundDropdown } from './saveEditDropdowns/inboundDropdown';
import { excludedViewTypes } from '../../context/bobjectTable.utils';

export type saveModalProps = SaveEditActions | false;
interface SaveEditButtonProps {
  viewType: string;
  shouldContractElements: boolean;
}
/**
 * SaveEditButton: This component is used to save the current view of the table.
 *  - If there are no changes applied and the view is default, not button is shown
 *  - If there are no changes applied and the view is not default, the EDIT button is shown
 *  - If there are changes applied and the view is default, the SAVE button is shown
 *  - If there are changes applied and the view is not default, the UPDATE and the SAVE AS NEW button are shown
 *
 * -- EDIT and UPDATE buttons open Modal to update selected.
 *
 * -- SAVE AS NEW button opens Modal to save as new view.
 *
 * -- SAVE button opens Modal to choose if save as new or update default view.
 *
 * @param viewType
 * @param shouldContractElements
 * @constructor
 */
export const SaveEditButton = ({ viewType, shouldContractElements }: SaveEditButtonProps) => {
  const { view, isModified } = useBobjectTable();
  const [showModal, openModal] = useState<saveModalProps>(false);
  const isNotBobjectList = [
    excludedViewTypes.MQL,
    excludedViewTypes.SAL,
    excludedViewTypes.LEAD_WITHOUT_QC,
  ].includes(viewType);
  const isDefaultList = !view.id;
  const showDropdown = isNotBobjectList || isDefaultList;
  return (
    <div className={styles._save_edit_container}>
      {showModal && <SaveEditModal handleCloseModal={() => openModal(false)} mode={showModal} />}
      {showDropdown && (
        <SaveDropdown
          isInbound={isNotBobjectList}
          viewType={viewType}
          openModal={openModal}
          shouldContractElements={shouldContractElements}
        />
      )}
      {!isDefaultList && !isModified && (
        <SaveButton
          title="Edit"
          icon="edit"
          handleClick={() => openModal(SaveEditActions.EDIT)}
          shouldContractElements={shouldContractElements}
        />
      )}
      {!showDropdown && isModified && (
        <div className={styles.buttonsContainer}>
          <SaveButton
            title="Update"
            icon="refresh"
            handleClick={() => openModal(SaveEditActions.UPDATE)}
            shouldContractElements={shouldContractElements}
          />
          {!isNotBobjectList && (
            <SaveButton
              title="Save as new"
              icon="save"
              handleClick={() => openModal(SaveEditActions.SAVE)}
              shouldContractElements={shouldContractElements}
            />
          )}
        </div>
      )}
    </div>
  );
};

type SaveButtonProps = {
  title: string;
  icon: IconType;
  handleClick: () => void;
  shouldContractElements: boolean;
};
const SaveButton = ({ title, icon, handleClick, shouldContractElements }: SaveButtonProps) => {
  return (
    <WithTooltip isDisabled={shouldContractElements} title={title}>
      <IconButton className={styles._save_edit_anchor} name={icon} onClick={handleClick} size={16}>
        {!shouldContractElements && (
          <Text size="s" color="peanut">
            {title}
          </Text>
        )}
      </IconButton>
    </WithTooltip>
  );
};

type SaveDropdownProps = {
  isInbound: boolean;
  viewType: string;
  openModal: (open: saveModalProps) => void;
  shouldContractElements: boolean;
};
const SaveDropdown = ({
  isInbound,
  viewType,
  openModal,
  shouldContractElements,
}: SaveDropdownProps) => {
  const { ref, visible, setVisible } = useVisible(false);
  const { columns, setIsModified } = useBobjectTable();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleSave = () => {
    if (!isInbound) {
      const type = toTitleCase(viewType);
      const data = columns.map((column, index) => ({ id: column, order: index * 10 }));
      api
        .patch(`/utils/service/view/bobjectview/${type}/editDefaultView`, { columns: data })
        .then(() => {
          forceSelectedEntitiesCacheRefresh(['bobjectFields']);
          setIsModified(false);
        });
    }
  };
  return (
    <>
      <SaveEditConfirmationModal
        isOpen={isConfirmationOpen}
        handleClose={() => {
          setIsConfirmationOpen(false);
          setVisible(false);
        }}
        handleConfirm={handleSave}
      />
      <Dropdown
        ref={ref}
        anchor={
          <WithTooltip isDisabled={shouldContractElements} title="Save">
            <IconButton
              className={styles._save_edit_anchor}
              name="save"
              onClick={() => setVisible(true)}
              size={16}
            >
              {!shouldContractElements && (
                <Text size="s" color="peanut">
                  Save
                </Text>
              )}
            </IconButton>
          </WithTooltip>
        }
        visible={visible && !isConfirmationOpen}
      >
        {isInbound && <InboundDropdown closeDropdown={() => setVisible(false)} />}
        {!isInbound && (
          <ListDropdown
            openSaveEditModal={openModal}
            openConfirmation={() => setIsConfirmationOpen(true)}
          />
        )}
      </Dropdown>
    </>
  );
};
