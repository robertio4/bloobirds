import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Skeleton,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../constants/lead';
import { useActiveOpportunities } from '../../hooks/useActiveOpportunities';
import { useLeads } from '../../hooks';
import { isDiscarded, isNurturing } from '../../utils/lead.utils';
import LeadCard from '../cadenceControlModal/updateLeadStatuses/leadCard/leadCard.view';
import styles from './updateLeadStatusesModal.module.css';

export const UpdateLeadStatusesModal = ({
  onClose,
  handleSave,
  leads,
}: {
  onClose?: () => void;
  handleSave?: () => void;
  leads?: any;
}) => {
  const { createToast } = useToasts();
  const { activeOpportunities: opportunities } = useActiveOpportunities();
  const { patchLead } = useLeads();
  const methods = useForm();
  const { formState } = methods;
  const { isDirty, dirtyFields } = formState;

  const onSubmit = async (data: {
    [key: string]: {
      status: string;
      opportunity: string;
      reason: string;
      sales: '' | 'SALES_';
    };
  }) => {
    if (data && isDirty) {
      const leadToSave = Object.keys(dirtyFields);
      const dataToSave = Object.keys(data)
        .filter(key => leadToSave.includes(key))
        .map(key => ({ ...data[key], id: key }));

      await Promise.all(
        dataToSave.map(lead => {
          const newData = {
            [LEAD_FIELDS_LOGIC_ROLE[`${lead.sales}STATUS`]]: lead.status,
            [LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITY]:
              lead.opportunity !== 'none' ? lead.opportunity : null,
          };

          if (isDiscarded(lead.status)) {
            newData[LEAD_FIELDS_LOGIC_ROLE[`${lead.sales}DISCARDED_REASONS`]] = lead.reason;
          } else if (isNurturing(lead.status)) {
            newData[LEAD_FIELDS_LOGIC_ROLE[`${lead.sales}NURTURING_REASONS`]] = lead.reason;
          }

          return patchLead(lead?.id, newData);
        }) || [],
      );

      createToast({ type: 'success', message: 'Changes successfully saved' });
    }
    if (handleSave) {
      handleSave();
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal open onClose={onClose} width={1020}>
        <ModalHeader>
          <ModalTitle>Update Lead statuses</ModalTitle>
          <ModalCloseIcon onClick={onClose} />
        </ModalHeader>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ModalContent>
            <div className={styles._section_title__wrapper}>
              <Text dataTest="Text-Modal-LeadStatus" size="m" weight="medium" color="peanut">
                Review the status of all leads and whether they should be assigned to a cadence
              </Text>
            </div>
            <div className={styles._section__wrapper}>
              <div className={styles._table__header}>
                <div className={styles._column_1}>
                  <Text color="softPeanut" size="s">
                    Lead name
                  </Text>
                </div>
                <div className={styles._column_2}>
                  <Text color="softPeanut" size="s">
                    Lead status
                  </Text>
                  <Text color="softPeanut" size="s">
                    Nurturing / Discarded reason
                  </Text>
                </div>
              </div>
              <div className={styles._table__body}>
                {leads ? (
                  leads?.map((lead: any) => (
                    <LeadCard key={lead?.id} lead={lead} opportunities={opportunities} />
                  ))
                ) : (
                  <Skeleton variant="rect" height={50} width="100%" />
                )}
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <div className={styles._buttons__wrapper}>
              <div className={styles._button_save_wrapper}>
                <Button dataTest="Form-Save" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </FormProvider>
  );
};
