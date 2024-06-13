import React from 'react';

import { COMPANY_FIELDS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

import { BobjectPill } from '../../../../../../../components/filter/field/pill';
import { useRouter } from '../../../../../../../hooks';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
} from '../../../../../../../utils/bobjects.utils';
import { companyTaskUrl } from '../../../../../../_constants/routes';
import styles from './taskCard.module.css';

export const AddLeadTaskCard = ({ bobject }) => {
  const { history } = useRouter();
  const company = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
  if (company) {
    const companyName = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
    const taskUrl = companyTaskUrl(company?.id.value, bobject);
    const active = history.location.pathname.startsWith(taskUrl);
    const handleAction = () => {
      history.push(taskUrl);
    };
    return (
      <div className={active ? styles.rootActive : styles.root} onClick={handleAction}>
        <div className={styles.label} style={{ backgroundColor: 'var(--verySoftBanana)' }} />
        <div className={styles.header_root}>
          <p className={styles.header_text}>
            <span style={{ float: 'right' }}>
              <BobjectPill bobject={company} fieldDescriptor="COMPANY__MR_RATING" />
            </span>
          </p>
        </div>
        <div className={styles.body_root}>
          <p data-test={`Tab-addLeadsTab-${companyName}`} className={styles.body_text}>
            {companyName}
          </p>
        </div>
      </div>
    );
  }

  return null;
};
