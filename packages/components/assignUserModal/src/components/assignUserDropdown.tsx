import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Dropdown, Radio, RadioGroup, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';

import styles from './assignUser.module.css';
import useAssignUser from './useAssignUser';

export interface ContactViewDropdownActionProps {
  bobject: Bobject;
  accountId: string;
  userId: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  ref: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  setOpenModal: () => void;
  onSave: () => void;
}

const AssignUserDropdown = React.forwardRef<HTMLInputElement, ContactViewDropdownActionProps>(
  ({ bobject, accountId, userId, visible, setVisible, children, setOpenModal, onSave }, ref) => {
    const [autoAssign, setAutoAssign] = useState(true);
    const { isLoading, handleAssign } = useAssignUser(bobject, accountId);
    const { t } = useTranslation();

    const handleChanges = () => {
      if (autoAssign) {
        handleAssign(userId, () => setVisible(false), onSave);
      } else {
        setOpenModal();
      }
    };

    return (
      <Dropdown ref={ref} visible={visible} width={274} anchor={children}>
        <div className={styles._content__assign}>
          <Text size="xs" align="center">
            {t('assignUserModal.recommendation_a')}
          </Text>
          <Text size="xs" align="center" weight="heavy">
            {t('assignUserModal.recommendation_b')}
          </Text>
          <div className={styles._checkbox}>
            <RadioGroup defaultValue={autoAssign} onChange={setAutoAssign}>
              <Radio size="small" value={true} expand>
                {t('assignUserModal.me')}
              </Radio>
              <Radio size="small" value={false} expand>
                {t('assignUserModal.other')}
              </Radio>
            </RadioGroup>
          </div>
        </div>
        <div className={styles._assign_button_wrapper}>
          <Button
            disabled={isLoading}
            onClick={handleChanges}
            //@ts-ignore
            iconLeft={!isLoading && 'personAdd'}
            size="small"
            expand
          >
            {isLoading ? <Spinner name="loadingCircle" /> : t('common.assign')}
          </Button>
        </div>
      </Dropdown>
    );
  },
);

export { AssignUserDropdown };
