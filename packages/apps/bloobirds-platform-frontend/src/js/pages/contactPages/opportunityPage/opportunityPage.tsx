import React, { useMemo } from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { LEAD_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

import { WrappedCadenceTable } from '../../../components/cadenceTable/wrappedCadenceTable';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';
import { useCadenceControl, useDocumentTitle } from '../../../hooks';
import { useFullSalesEnabled, useNewCadenceTableEnabled } from '../../../hooks/useFeatureFlags';
import {
  getOpportunityLeadsIds,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../utils/bobjects.utils';
import CadenceTableOld from '../cadenceTable/cadenceTableOld';
import styles from '../contactPage.module.css';
import { useContactBobjects } from '../contactPageContext';
import ContactTabs from '../contactTabs/contactTabs';
import LeadList from '../leadList/leadList';
import TasksBox from '../tasksBox/tasksBox';
import OpportunityCard from './opportunityCard/opportunityCard';

const getOpportunityName = (opp: any) =>
  getValueFromLogicRole(opp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);

const OpportunityPage = (props: { parentRef: any }) => {
  const contactBobjects = useContactBobjects();
  const hasSalesEnabled = useFullSalesEnabled();
  const { openCadenceControl } = useCadenceControl();
  const isNewCadenceTableEnabled = useNewCadenceTableEnabled();

  useDocumentTitle(getOpportunityName(contactBobjects?.active));

  const filteredLeads = useMemo(() => {
    const oppLeads = getOpportunityLeadsIds(contactBobjects?.active);
    const filteredLeads = contactBobjects?.leads?.filter(lead =>
      oppLeads?.includes(lead?.id?.value),
    );
    return filteredLeads?.map(lead => {
      const role = contactBobjects?.active?.fields?.find(
        (field: any) => field?.value === lead?.id?.value,
      );
      return {
        ...lead,
        contactRole: role?.logicRole,
      };
    });
  }, [contactBobjects?.leads, contactBobjects?.active]);

  return (
    <div>
      <div className={styles._info__container}>
        <div className={styles._info__row}>
          <div className={styles._infoCard__container}>
            {contactBobjects?.active ? (
              <OpportunityCard bobject={contactBobjects?.active} />
            ) : (
              <Skeleton variant="rect" width={328} height={435} />
            )}
          </div>
          <div className={styles._info__column}>
            {contactBobjects?.active ? (
              <TasksBox hasChangedTheBobject={contactBobjects.hasActiveBobjectUpdated} />
            ) : (
              <Skeleton height={96} width="100%" variant="rect" />
            )}

            <div className={styles._leadList__container}>
              {contactBobjects?.leads || hasSalesEnabled ? (
                <LeadList
                  bobjectType="Opportunity"
                  leads={filteredLeads || []}
                  company={contactBobjects.company}
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
                companyId: getValueFromLogicRole(
                  contactBobjects.active,
                  OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY,
                ),
                ...(contactBobjects?.active
                  ? {
                      assignedTo: getValueFromLogicRole(
                        contactBobjects.active,
                        OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
                      ),
                      cadenceId: getValueFromLogicRole(
                        contactBobjects.active,
                        OPPORTUNITY_FIELDS_LOGIC_ROLE.CADENCE,
                      ),
                      targetMarket: null,
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
    </div>
  );
};

export default OpportunityPage;
