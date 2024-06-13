import React, { useState } from 'react';

import {
  Button,
  Icon,
  Radio,
  RadioGroup,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, Bobject } from '@bloobirds-it/types';

import { STEPS } from '../../../components/cadenceControlModal/cadenceControlModal.machine';
import { useUserSettings } from '../../../components/userPermissions/hooks';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { useCadenceControl, useCompany, useLeads } from '../../../hooks';
import SessionManagerFactory from '../../../misc/session';
import { useContactBobjects } from '../contactPageContext';
import styles from './autoAssignCadenceDropdown.module.css';

function assignCompany(
  company: Bobject,
  updateCompany: (object: string, query: object) => Promise<void>,
  createToast: (paras: { message: string; type: 'success' }) => void,
  user: { id: any },
) {
  const objectId = company?.id?.objectId;
  updateCompany(objectId, {
    [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: user?.id,
  }).then(() =>
    createToast({
      message: 'User assigned successfully!',
      type: 'success',
    }),
  );
}

export const AutoAssignCadenceDropdown = ({
  bobject,
  setDropdownVisible,
}: {
  bobject: Bobject;
  handleCadenceControl: () => void;
  setDropdownVisible: (value: boolean) => void;
}) => {
  const settings = useUserSettings();
  const [assignType, setAssignType] = useState<string>();
  const contactBobjects = useContactBobjects();
  const user = SessionManagerFactory().getUser();
  const { createToast } = useToasts();
  const { patchLeads, patchLead } = useLeads('auto-assign-cadence');
  const { updateCompany } = useCompany('auto-assign-cadence');
  const bobjectType = bobject?.id?.typeName;
  const hasLeads = contactBobjects?.leads?.length > 0;
  const contactCompany = contactBobjects?.company;
  const { openCadenceControl } = useCadenceControl();
  const updateData = {
    [bobjectType?.toUpperCase() + '__ASSIGNED_TO']: user?.id,
  };
  const shouldShowOptions =
    (hasLeads && bobjectType === BobjectTypes.Company) ||
    (contactCompany && bobjectType === BobjectTypes.Lead);

  const handleSubmit = () => {
    if (bobjectType === BobjectTypes.Lead) {
      const objectId = bobject?.id?.objectId;
      patchLead(objectId, updateData).then(() => {
        if (assignType === 'partial') {
          createToast({
            message: 'Lead assigned successfully!',
            type: 'success',
          });
        } else {
          assignCompany(contactCompany, updateCompany, createToast, user);
        }
        openCadenceControl({
          bobjectToSet: bobject,
          previousStep: false,
          step: STEPS.CONFIGURE_CADENCE,
        });
      });
    } else {
      assignCompany(contactCompany, updateCompany, createToast, user);
      if (assignType !== 'partial' && hasLeads) {
        let bobjectsData = {};
        contactBobjects?.leads
          .map(b => b?.id.objectId)
          .forEach(id => {
            bobjectsData = {
              ...bobjectsData,
              [id]: {
                [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: user?.id,
              },
            };
          });
        if (!settings?.settings?.propagateAssignedFromCompanyToLeadEnabled) {
          patchLeads(bobjectsData).then(() => {
            createToast({
              message: 'Leads Assigned successfully!',
              type: 'success',
            });
          });
        }
      }
      openCadenceControl({
        bobjectToSet: bobject,
        previousStep: false,
        step: STEPS.CONFIGURE_CADENCE,
      });
    }
    setDropdownVisible(false);
  };

  const getModalText = () => {
    switch (bobjectType) {
      case BobjectTypes.Company:
        return ['Assign company', 'Assign company & leads'];
      case BobjectTypes.Lead:
        return ['Assign lead', 'Assign company & lead'];
    }
  };

  const radioText = getModalText();

  return (
    <div className={styles._auto_assign_dropdown}>
      <Text size="s" align="center" className={styles._auto_assign_text}>
        This {bobjectType?.toLowerCase()} should be assigned in order to enroll it in a cadence.{' '}
        <b>Do you want to assign it to you and continue?</b>
      </Text>
      {shouldShowOptions && (
        <div className={styles._radio_group}>
          <RadioGroup
            defaultValue="all"
            onChange={value => {
              setAssignType(value);
            }}
          >
            <Radio value="all" size="small" expand={true}>
              {radioText[1]}
              <Tooltip
                title="If the company is already assigned, then it will be reassigned to you"
                position="top"
              >
                <Icon name="info" size={16} />
              </Tooltip>
            </Radio>
            <Radio value="partial" size="small" expand={true}>
              {radioText[0]}
            </Radio>
          </RadioGroup>
        </div>
      )}
      <Button size="small" onClick={handleSubmit}>
        Assign & Start
      </Button>
    </div>
  );
};
