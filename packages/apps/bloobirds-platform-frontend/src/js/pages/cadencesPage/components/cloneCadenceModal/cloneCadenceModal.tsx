import {
  Button,
  Callout,
  Icon,
  Input,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import {
  useActiveUserSettings,
  useCadenceV2Enabled,
  useFullSalesEnabled,
  useRouter,
} from '@bloobirds-it/hooks';
import mixpanel from 'mixpanel-browser';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { APP_CADENCES_EDIT, APP_PLAYBOOK_CADENCES_EDIT, BOBJECT_TYPES } from '@bloobirds-it/types';
import { forceSelectedEntitiesCacheRefresh } from '../../../../hooks/entities/useEntity.utils';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import styles from './cloneCadenceModal.module.css';
import CadenceIcon from '../../../../components/cadenceControlModal/cadenceIcon';
// @ts-ignore
import { useCadences } from '@bloobirds-it/cadence';

export const CloneCadenceModal = ({ cadence, onClose, refresh }: any) => {
  const bobjectTypes = useBobjectTypes();
  const { settings } = useActiveUserSettings();
  const isFullSalesEnabled = useFullSalesEnabled(settings?.account?.id);
  const cadenceV2Enabled = useCadenceV2Enabled(settings?.account?.id);

  const { clone } = useCadences({ bobjectTypeName: cadence?.bobjectType, accountId: settings?.account?.id });

  const { history } = useRouter();

  const methods = useForm({ defaultValues: cadence });

  const BOBJECT_TYPES_ALLOWED = [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD];

  if (isFullSalesEnabled) {
    BOBJECT_TYPES_ALLOWED.push(BOBJECT_TYPES.OPPORTUNITY);
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createToast } = useToasts();

  const onSave = (values: any) => {
    setIsSubmitting(true);
    const valuesToSave = {
      name: values?.name,
      bobjectTypeToClone: values?.bobjectType || cadence?.bobjectType,
      cadenceId: cadence?.id,
    };
    clone(valuesToSave)
      .then((response: any) => {
        createToast({ message: 'Cadence cloned successfully', type: 'success' });
        forceSelectedEntitiesCacheRefresh(['bobjectPicklistFieldValues']);
        refresh();
        mixpanel.track(MIXPANEL_EVENTS.CADENCE_CLONED);
        setIsSubmitting(false);
        onClose();
        history.push(
          `${cadenceV2Enabled ? APP_CADENCES_EDIT : APP_PLAYBOOK_CADENCES_EDIT}?cadence=${
            response?.data?.id
          }&name=${response?.data?.name}&bobjectType=${response?.data?.bobjectType}`,
        );
      })
      .catch(() => {
        setIsSubmitting(false);
        methods.setError('name', {
          message: 'Another cadence with the same name already exists',
          type: 'validate',
        });
      });
  };
  const hasCadenceBobjectType = !!methods.watch('bobjectType');

  return (
    <Modal open onClose={() => {}}>
      <FormProvider {...methods}>
        <ModalHeader color="lightBloobirds">
          <div className={styles._title__container}>
            <Icon size={24} color="bloobirds" name="cadence" />
            <Text size="l">Clone cadence</Text>
          </div>
          <ModalCloseIcon color="peanut" onClick={onClose} />
        </ModalHeader>
        <ModalContent>
          <Text size="m" color="peanut">
            Are you sure you want to clone “Inbound Direct request”?
          </Text>
          <Text size="m" color="softPeanut">
            Select whether you want to use it with companies or opportunities.
          </Text>
          <Controller
            name="name"
            rules={{ required: 'This field is required' }}
            render={({ onChange, value }) => (
              <Input
                placeholder="Cadence name"
                name="cadenceName"
                onChange={onChange}
                error={methods.errors.name?.message}
                value={value}
                className={styles._main_info__input}
                width="100%"
                color="bloobirds"
              />
            )}
          />
          <Controller
            name="bobjectType"
            rules={{
              required: 'This field is required',
            }}
            render={({ onChange, value }) => (
              <div>
                <Select
                  error={methods.errors.bobjectType?.message}
                  placeholder="Clone cadence for"
                  size="medium"
                  onChange={onChange}
                  value={value}
                  width="100%"
                >
                  {bobjectTypes
                    ?.all()
                    //@ts-ignore
                    ?.filter(bt => BOBJECT_TYPES_ALLOWED.includes(bt.name))
                    ?.map(type => {
                      if (!isFullSalesEnabled && type.name === 'Opportunity') {
                        return null;
                      }
                      return (
                        <Item value={type.id} key={`type-${type?.id}`}>
                          {type.name}
                        </Item>
                      );
                    })}
                </Select>
              </div>
            )}
          />
          {hasCadenceBobjectType && (
            <div className={styles._cadence_callout__container}>
              <Callout withoutIcon={true} width="100%">
                <div className={styles._cadence_callout__wrapper}>
                  <CadenceIcon color="softBloobirds" />
                  <Text size="m">
                    👉 After cloning a cadence from a different object, remember to check the{' '}
                    <b>selected email</b> field and <b>template variables</b>.
                  </Text>
                </div>
              </Callout>
            </div>
          )}
        </ModalContent>
        <ModalFooter>
          <Button variant="clear" color="softBloobirds" onClick={onClose}>
            CANCEL
          </Button>
          <Button color="bloobirds" onClick={methods.handleSubmit(onSave)}>
            {isSubmitting ? <Spinner name="loadingCircle" size={16} color="white" /> : <>CLONE</>}
          </Button>
        </ModalFooter>
      </FormProvider>
    </Modal>
  );
};
