import React from 'react';
import { Button, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useIsAccountAdmin } from '../../../../../hooks/usePermissions';
import { useBobjectTable } from '../../../useBobjectTable';
import styles from '../saveEdit.module.css';
import { SaveEditActions } from '../saveEditButton.typing';
import { saveModalProps } from '../saveEditButton';

type ListDropdownProps = {
  openSaveEditModal: (open: saveModalProps) => void;
  openConfirmation: () => void;
};
export const ListDropdown = ({ openSaveEditModal, openConfirmation }: ListDropdownProps) => {
  const isAdmin = useIsAccountAdmin();
  const { query } = useBobjectTable();
  const haveFiltersBeenChanged = !!Object.keys(query).length;
  return (
    <>
      <div className={styles._save_edit_lists}>
        <Text size="s" weight="heavy">
          Default view
        </Text>
        <div className={styles._save_edit_text}>
          {isAdmin ? (
            <Text size="s">
              This is a Bloobirds standard view. <br />
              These defaults will be applied to the entire account. <br />
            </Text>
          ) : (
            <Text size="m">
              This is a Bloobirds standard view or or a view created by an account admin. Save as
              new list to keep your changes.{' '}
            </Text>
          )}
        </div>
        <div className={styles._save_edit_lists_buttons}>
          <Tooltip
            title={
              isAdmin && haveFiltersBeenChanged
                ? 'Filters cannot be saved in default views. Try removing them or saving as a new list.'
                : ''
            }
            position={'top'}
          >
            <Button disabled={!isAdmin || haveFiltersBeenChanged} onClick={openConfirmation}>
              Save
            </Button>
          </Tooltip>
          <Button variant="secondary" onClick={() => openSaveEditModal(SaveEditActions.SAVE)}>
            Save as new
          </Button>
        </div>
      </div>
    </>
  );
};
