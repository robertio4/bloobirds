import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  Icon,
  Modal,
  ModalContent,
  ModalFooter,
  Text,
  Button,
  ModalTitle,
  ModalCloseIcon,
  ModalHeader,
  Item,
  Select,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { mutate } from 'swr';

import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { api } from '../../../../utils/api';
import { indefiniteArticle, toTitleCase } from '../../../../utils/strings.utils';
import styles from './actionsModal.module.css';

const ActionsModal = ({ isModalOpen, step, actionsAvailable, driver, integrationName }) => {
  const isCreate = !step;
  const modalTitle = 'New Action';
  let bobjectTypes = useBobjectTypes()
    .all()
    .filter(type => type.name !== 'Task');
  const isSalesEnabled = useFullSalesEnabled();
  if (!isSalesEnabled) {
    bobjectTypes = bobjectTypes.filter(type => type.name !== BOBJECT_TYPES.OPPORTUNITY);
  }
  const actions = ['CREATE', 'UPDATE', 'DELETE'];
  const { createToast } = useToasts();
  const methods = useForm({ defaultValues: step });
  const handleSubmit = () => {
    const bobject = methods.watch('bobjectType');
    const action = methods.watch('action');
    const trigger = `${bobject}:${action}`;
    const requestBody = { actionName: methods.watch('reaction'), bloobirdsTrigger: trigger };
    const url = `/integrations/manager/drivers/${driver}/actions`;
    if (!isCreate) {
      const bloobirdsTrigger = `${step.bobjectType}:${step.action}`;
      const data = { actionId: step.id, bloobirdsTrigger, actionName: step.reaction };
      api.delete(url, { data });
    }
    api.post(url, requestBody).then(() => {
      createToast({
        type: 'success',
        message: isCreate ? 'Action created successfully' : 'Action edited successfully',
      });
      isModalOpen(false);
      mutate(`${url}/subscribed`);
    });
  };

  return (
    <Modal width={640} open onClose={() => isModalOpen(false)}>
      <FormProvider {...methods}>
        <ModalHeader variant="primary">
          <ModalTitle variant="primary">
            <div className={styles._title__container}>
              <Icon name="zap" color="bloobirds" className={styles._icon} />
              <Text size={16} inline color="peanut">
                {modalTitle}
              </Text>
            </div>
          </ModalTitle>
          <ModalCloseIcon variant="primary" color="peanut" onClick={() => isModalOpen(false)} />
        </ModalHeader>
        <ModalContent>
          <div className={styles._steps__section}>
            <div className={styles._step}>
              <Text className={styles._step__text} size="m" color="softPeanut" weight="regular">
                When
              </Text>
              <Controller
                name="bobjectType"
                as={
                  <Select placeholder="An Object" size="medium" borderless={false}>
                    {bobjectTypes &&
                      bobjectTypes.map(bobjectType => (
                        <Item
                          key={bobjectType?.name}
                          dataTest={bobjectType?.name}
                          value={bobjectType?.name}
                        >
                          {`${indefiniteArticle(bobjectType.name)} ${bobjectType.name}`}
                        </Item>
                      ))}
                  </Select>
                }
              />
            </div>
            <div className={styles._step}>
              <Text className={styles._step__text} size="m" color="softPeanut" weight="regular">
                Is
              </Text>
              <Controller
                name="action"
                as={
                  <Select placeholder="Bloobirds action" size="medium" borderless={false}>
                    {actions &&
                      actions.map(action => (
                        <Item key={action} dataTest={action} value={action}>
                          {`${toTitleCase(action)}d`}
                        </Item>
                      ))}
                  </Select>
                }
              />
            </div>
            <div className={styles._step}>
              <Text className={styles._step__text} size="m" color="softPeanut" weight="regular">
                Then
              </Text>
              <Controller
                name="reaction"
                as={
                  <Select
                    placeholder={`${integrationName} action`}
                    size="medium"
                    borderless={false}
                  >
                    {actionsAvailable?.map(reaction => (
                      <Item key={reaction} dataTest={reaction} value={reaction.value}>
                        {toTitleCase(reaction.label)}
                      </Item>
                    ))}
                  </Select>
                }
              />
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            variant="clear"
            onClick={() => {
              isModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </ModalFooter>
      </FormProvider>
    </Modal>
  );
};
export default ActionsModal;
