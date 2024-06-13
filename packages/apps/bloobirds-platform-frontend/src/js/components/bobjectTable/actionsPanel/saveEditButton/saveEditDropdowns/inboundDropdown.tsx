import React from 'react';
import { Button, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { usePicklistValues } from '../../../../../hooks';
import { api } from '../../../../../utils/api';
import { useBobjectTable } from '../../../useBobjectTable';
import { useIsAccountAdmin } from '../../../../../hooks/usePermissions';
import { useBobjectFieldByLogicRole } from '../../../../../hooks/useBobjectFieldByLogicRole';
import styles from '../saveEdit.module.css';

export const InboundDropdown = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const { createToast } = useToasts();
  const { columns, view, setIsModified } = useBobjectTable();
  const isAdmin = useIsAccountAdmin();
  const filterFieldId = useBobjectFieldByLogicRole(`LEAD__REQUIRES_${view.name}`)?.id;
  const filterFieldValue = usePicklistValues({
    picklistLogicRole: `LEAD__REQUIRES_${view.name}`,
  }).find(o => o.value === 'Yes')?.id;
  const updatedColumns = columns.reduce((acc, column) => [...acc, { bobjectFieldId: column }], []);
  const handleSaveChanges = () => {
    api
      .post('/utils/service/view/bobjectview', {
        name: view.name,
        id: view.id,
        columns: updatedColumns,
        type: view.name,
        tags: [],
        filters: [
          {
            bobjectFieldId: filterFieldId,
            searchType: 'EXACT__SEARCH',
            values: [filterFieldValue],
          },
        ],
        visibility: 'PUBLIC',
      })
      .then(() =>
        createToast({
          type: 'success',
          message: 'Default view updated!',
        }),
      );
    closeDropdown();
    setIsModified(false);
  };
  return (
    <div className={styles._save_edit_confirmation}>
      <Text size="s" weight="heavy">
        Default view
      </Text>
      <div className={styles._save_edit_text}>
        {isAdmin ? (
          <Text size="s">
            This is a Bloobirds standard view. <br />
            By saving this view these columns will be applied as default to the entire account.{' '}
            <br />
            Filters won’t be saved.
          </Text>
        ) : (
          <Text size="m">
            This is a Bloobirds standard view or created by an account admin. You don’t have
            permissions to do this action.{' '}
          </Text>
        )}
      </div>
      <div className={styles._save_edit_buttons}>
        <Button variant="tertiary" onClick={() => closeDropdown()}>
          Cancel
        </Button>
        <Button disabled={!isAdmin} onClick={handleSaveChanges}>
          Save
        </Button>
      </div>
    </div>
  );
};
