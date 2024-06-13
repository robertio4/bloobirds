import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Icon, IconButton, Modal, ModalFooter, Text } from '@bloobirds-it/flamingo-ui';
import { useMinimizableModal } from '@bloobirds-it/hooks';
import keys from 'lodash/keys';
import omit from 'lodash/omit';

import { useBobjectForm, usePicklistValues, useRouter } from '../../../hooks';
import BobjectFormSkeleton from '../../bobjectForm/bobjectFormSkeleton';
import Section from '../../bobjectForm/section';
import styles from './bobjectForm.module.css';

const BobjectFormModal = ({
  id,
  bobjectType,
  type,
  defaultValues,
  defaultRelatedValues,
  additionalValues,
  hasPermission,
  loading,
  sectionsForm,
  savedData,
}) => {
  const { history } = useRouter();
  const {
    openConfirmModal,
    closeModal,
    open,
    minimize,
    data: { company, lead },
  } = useMinimizableModal(id);

  const defaultValuesToUse = useMemo(
    () => savedData?.values || { ...defaultValues, ...defaultRelatedValues },
    [id],
  );

  const methods = useForm({ defaultValues: defaultValuesToUse });
  const { basicSaveBobject } = useBobjectForm({ generateSections: false });
  const hasCompany = !!company;
  const { isValid, submitCount, isSubmitting } = methods.formState;
  const canSave = (submitCount === 0 || isValid) && (hasPermission || !hasCompany);
  const activityTypes = usePicklistValues({ picklistLogicRole: 'ACTIVITY__TYPE' });

  useEffect(() => {
    methods.reset(defaultValuesToUse);
  }, [defaultValuesToUse]);

  const onSubmit = async () => {
    const extraDefaultValues = omit(defaultValuesToUse, keys(methods.getValues()));
    const valuesToUse = {
      ...methods.getValues(),
      ...extraDefaultValues,
    };
    const activityTypeToSend = bobjectType === 'Activity' && {
      ACTIVITY__TYPE: activityTypes.find(activityType => activityType?.value === type)?.id,
    };
    const valuesToSend = { ...valuesToUse, ...activityTypeToSend };
    await basicSaveBobject(valuesToSend, additionalValues, 'CREATE', bobjectType, {
      type,
      company,
    });
    closeModal();
  };

  const handleMinimize = () => {
    const activityTypeToSend = bobjectType === 'Activity' && {
      ACTIVITY__TYPE: activityTypes.find(activityType => activityType?.value === type)?.id,
    };
    const values = {
      ...defaultValues,
      ...activityTypeToSend,
      ...methods.getValues(),
    };
    // Looks weird but is needed to be compatible with old minimizable modals
    minimize({ data: { data: { values, sections: sectionsForm, company } } });
  };

  const handleRedirect = () => {
    history.push(company.url);
    handleMinimize();
  };

  return (
    <Modal open={open} onClose={() => closeModal(id)} variant="primary">
      <div className={styles._header__container}>
        <div className={styles._header__info}>
          <div className={styles._header_companyName} onClick={handleRedirect}>
            <Icon name="company" />
            <Text size="m" weight="regular" htmlTag="span" color="bloobirds">
              {company?.name || lead?.name}
            </Text>
            <Icon name="externalLink" size={20} color="bloobirds" />
          </div>
          <Text dataTest={`Text-Modal-New${type}`} size="s" weight="medium">
            New {type}
          </Text>
        </div>
        <div>
          <IconButton name="minus" size={20} onClick={handleMinimize} />
          <IconButton name="cross" size={24} onClick={() => closeModal(id)} />
        </div>
      </div>
      <div className={styles._container}>
        {loading ? (
          <BobjectFormSkeleton />
        ) : (
          <FormProvider {...methods}>
            {sectionsForm.map(section => (
              <Section
                key={section.title}
                {...section}
                defaultValues={defaultValues}
                hideActivityType
                isRequiredBeforeMeeting={section.title === 'Required information to close Meeting'}
                modalBobjectType={bobjectType}
              />
            ))}
          </FormProvider>
        )}
      </div>
      <ModalFooter>
        <div className={styles._footer__container}>
          <div className={styles._footerActions__container}>
            <span>
              <Button
                dataTest="Form-Cancel"
                disabled={isSubmitting}
                variant="clear"
                color="bloobirds"
                onClick={() => openConfirmModal()}
              >
                Cancel
              </Button>
            </span>
            <span>
              <Button
                dataTest="Form-Save"
                onClick={methods.handleSubmit(onSubmit)}
                disabled={isSubmitting || !canSave}
              >
                Save
              </Button>
            </span>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default BobjectFormModal;
