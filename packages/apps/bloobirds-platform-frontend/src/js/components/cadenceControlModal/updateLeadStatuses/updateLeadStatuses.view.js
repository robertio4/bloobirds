import {
  Button,
  ModalContent,
  ModalFooter,
  Skeleton,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { useActiveOpportunities } from '../../../hooks/useActiveOpportunities';
import { useCadenceControl } from '../../../hooks/useCadenceControl';
import { useLeads } from '../../../hooks/useLeads';
import { isCompany, isOpportunity } from '../../../utils/bobjects.utils';
import { isDiscarded, isNurturing } from '../../../utils/lead.utils';
import { STEPS } from '../cadenceControlModal.machine';
import LeadCard from './leadCard';
import styles from './updateLeadStatuses.module.css';

const UpdateLeadStatusesStep = ({ handleBack, handleSave }) => {
  const { createToast } = useToasts();
  const { activeOpportunities: opportunities } = useActiveOpportunities();
  const { bobject, step } = useCadenceControl();
  const {
    leads,
    updateLeadsByCompany,
    updateLeadsByOpportunity,
    patchLead,
    resetLeads,
    isLoaded: isLeadsLoaded,
  } = useLeads('cadenceControl');
  const hasPreviousStep = step !== STEPS.UPDATE_LEADS_STATUSES;
  const methods = useForm();
  const { formState } = methods;
  const { isDirty, dirtyFields } = formState;

  useEffect(() => {
    if (bobject && isCompany(bobject)) {
      updateLeadsByCompany(bobject?.id.value);
    } else if (bobject && isOpportunity(bobject)) {
      updateLeadsByOpportunity(bobject);
    }
  }, [bobject]);

  const onSubmit = async data => {
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
        }),
      );

      createToast({ type: 'success', message: 'Changes successfully saved' });
    }

    handleSave();
  };

  useEffect(() => () => resetLeads(), []);

  return (
    <FormProvider {...methods}>
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
              {isLeadsLoaded ? (
                leads?.map(lead => (
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
            {hasPreviousStep && (
              <Button dataTest="formBack" variant="clear" onClick={handleBack}>
                Back
              </Button>
            )}
            <div className={styles._button_save_wrapper}>
              <Button dataTest="Form-Save" type="submit">
                Save
              </Button>
            </div>
          </div>
        </ModalFooter>
      </form>
    </FormProvider>
  );
};

export default UpdateLeadStatusesStep;
