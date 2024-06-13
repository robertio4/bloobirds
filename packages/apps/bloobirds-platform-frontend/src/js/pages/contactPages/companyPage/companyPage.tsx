import React from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

import { WrappedCadenceTable } from '../../../components/cadenceTable/wrappedCadenceTable';
import { useCadenceControl, useDocumentTitle } from '../../../hooks';
import { useNewCadenceTableEnabled } from '../../../hooks/useFeatureFlags';
import useSendToSales from '../../../hooks/useSendToSales';
import { getTextFromLogicRole, getValueFromLogicRole } from '../../../utils/bobjects.utils';
import CadenceTableOld from '../cadenceTable/cadenceTableOld';
import styles from '../contactPage.module.css';
import { useContactBobjects } from '../contactPageContext';
import ContactTabs from '../contactTabs/contactTabs';
import LeadList from '../leadList/leadList';
import SendToSalesModal from '../sendToSalesModal/sendToSalesModal';
import TasksBox from '../tasksBox/tasksBox';
import CompanyCard from './companyCard/companyCard';

const getCompanyName = (company: any) =>
  getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);

const CompanyPage = (props: { parentRef: any }) => {
  const contactBobjects = useContactBobjects();
  const { isOpen: isSendToSalesOpen, closeSendToSalesModal } = useSendToSales();
  useDocumentTitle(getCompanyName(contactBobjects?.active));
  const { openCadenceControl } = useCadenceControl();
  const isNewCadenceTableEnabled = useNewCadenceTableEnabled();

  return (
    <div>
      <div className={styles._info__container}>
        <div className={styles._info__row}>
          <div className={styles._infoCard__container}>
            {contactBobjects?.active ? (
              <CompanyCard bobject={contactBobjects.active} />
            ) : (
              <Skeleton variant="rect" width={328} height={435} />
            )}
          </div>
          <div className={styles._info__column}>
            {contactBobjects?.leads ? (
              <TasksBox hasChangedTheBobject={contactBobjects.hasActiveBobjectUpdated} />
            ) : (
              <Skeleton height={96} width="100%" variant="rect" />
            )}
            <div className={styles._leadList__container}>
              {contactBobjects?.leads ? (
                <LeadList
                  bobjectType="Company"
                  leads={contactBobjects?.leads}
                  company={contactBobjects?.company}
                />
              ) : (
                <Skeleton variant="rect" width="100%" height={323} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles._cadence__row}>
        <div className={styles._cadence__container}>
          {!isNewCadenceTableEnabled ? (
            contactBobjects?.active && contactBobjects?.leads ? (
              <CadenceTableOld
                offsetDays={-2}
                bobject={contactBobjects?.active}
                handleClickTitle={(step: any) =>
                  openCadenceControl({
                    bobjectToSet: contactBobjects?.active,
                    previousStep: false,
                    step,
                  })
                }
              />
            ) : (
              <Skeleton width="100%" height={264} variant="rect" />
            )
          ) : (
            <WrappedCadenceTable
              bobject={{
                id: contactBobjects?.urlBobject.id,
                companyId: null,
                relatedBobjectIds: contactBobjects?.relatedBobjectIds,
                ...(contactBobjects?.active
                  ? {
                      assignedTo: getValueFromLogicRole(
                        contactBobjects.active,
                        COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
                      ),
                      cadenceId: getValueFromLogicRole(
                        contactBobjects.active,
                        COMPANY_FIELDS_LOGIC_ROLE.CADENCE,
                      ),
                      targetMarket: getValueFromLogicRole(
                        contactBobjects.active,
                        COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
                      ),
                    }
                  : {
                      assignedTo: null,
                      cadenceId: null,
                      targetMarket: null,
                    }),
              }}
              leads={contactBobjects?.leads?.map(lead => ({
                id: lead.id,
                fullName: getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
              }))}
              openCadenceControl={(step: any) =>
                openCadenceControl({
                  bobjectToSet: contactBobjects?.active,
                  previousStep: false,
                  step,
                })
              }
            />
          )}
        </div>
      </div>
      <ContactTabs {...props} />
      {isSendToSalesOpen && <SendToSalesModal open onClose={closeSendToSalesModal} />}
    </div>
  );
};

export default CompanyPage;
