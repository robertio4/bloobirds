import React, { useState } from 'react';
import {
  Button,
  IconInputPicker,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalSection,
  Spinner,
} from '@bloobirds-it/flamingo-ui';
import styles from '../../styles/fieldsPage.module.css';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../hooks/entities/useEntity.utils';
import { useUserSettings } from '../../../../../components/userPermissions/hooks';
import { useBobjectFieldGroupsCleaning } from '../../../../../hooks/useBobjectFieldGroups';
import { api } from '../../../../../utils/api';
import { mutate } from 'swr';

const REFRESHED_ENTITIES = [
  'bobjectFields',
  'bobjectPicklistFieldValues',
  'bobjectGlobalPicklists',
];

export const GroupModal = ({ handleClose, group, isCreation, refresh }) => {
  const settings = useUserSettings();
  const [isLoading, setIsLoading] = useState();
  const { cleanCachedBobjectGroups } = useBobjectFieldGroupsCleaning();
  const methods = useForm({ defaultValues: group });

  const handleReset = () => {
    methods.setValue('name', '');
  };

  const handleCloseModal = () => {
    handleReset();
    setIsLoading(false);
    handleClose();
  };

  const handleSave = async values => {
    setIsLoading(true);

    const valuesToSave = {
      ...values,
      account: `/accounts/${settings.account.id}`,
    };

    if (isCreation) {
      await api.post('/entities/bobjectFieldGroups', valuesToSave);
    }
    if (!isCreation) {
      await api.patch(`/entities/bobjectFieldGroups/${group?.id}`, valuesToSave);
    }
    refresh();
    cleanCachedBobjectGroups();
    handleCloseModal();
    forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
    mutate('/entities/bobjectFieldGroups');
  };

  return (
    <Modal
      width={600}
      title={`${isCreation ? 'Create ' : 'Update '}Field Group`}
      open
      onClose={handleClose}
    >
      <FormProvider {...methods}>
        <ModalContent>
          <ModalSection title="Main information" icon="company">
            <div className={styles._inputs_groups}>
              <Controller
                name="name"
                rules={{
                  required: 'This field is required',
                }}
                render={({ onChange, value }) => (
                  <div className={styles._name_group}>
                    <Input
                      error={methods.errors.name?.message}
                      placeholder="Name*"
                      size="medium"
                      width="100%"
                      onChange={onChange}
                      value={value}
                    />
                  </div>
                )}
              />
              <Controller
                name="icon"
                render={({ onChange, value }) => (
                  <div className={styles._icon_input_group}>
                    <IconInputPicker onChange={onChange} value={value} searchable width="100%" />
                  </div>
                )}
              />
            </div>
          </ModalSection>
        </ModalContent>
        <ModalFooter>
          <div>
            <Button onClick={handleCloseModal} variant="clear">
              CANCEL
            </Button>
          </div>
          <Button onClick={methods.handleSubmit(handleSave)}>
            {isLoading ? <Spinner color="white" /> : 'SAVE VALUES'}
          </Button>
        </ModalFooter>
      </FormProvider>
    </Modal>
  );
};
