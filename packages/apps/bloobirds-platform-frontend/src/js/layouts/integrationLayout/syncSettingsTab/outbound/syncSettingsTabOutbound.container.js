import React, { useEffect, useMemo, useState } from 'react';

import { CRM } from '../../../../constants/integrations';
import { useActiveUser, useEntity, usePicklistValues } from '../../../../hooks';
import { useHubspotIntegration } from '../../../../hooks/useHubspotIntegration';
import { RestApi } from '../../../../misc/api/rest';
import { changeActiveTrigger, saveTriggerSetting } from '../../../../utils/integration.utils';
import SyncSettingsTabOutbound from './syncSettingsTabOutbound.view';

const SyncStatusTabContainer = ({
  activityTrigger,
  leadTrigger,
  companyTrigger,
  meetingTrigger,
  salesforceUsers,
  dealsPipeline,
  crm,
  disconnectIntegration,
  activeIntegration,
  opportunityTrigger,
}) => {
  const { updateTriggers } = useHubspotIntegration();
  const { activeAccount } = useActiveUser();
  const [accountTriggers, setAccountTriggers] = useState(undefined);
  const [refreshTriggers, setRefreshTriggers] = useState(true);

  const leadStatus = usePicklistValues({ picklistLogicRole: 'LEAD__STATUS' });
  const companyStatus = usePicklistValues({ picklistLogicRole: 'COMPANY__STATUS' });
  const callResults = usePicklistValues({ picklistLogicRole: 'ACTIVITY__CALL_RESULT' });
  const reducedCallResults = useMemo(
    () =>
      callResults?.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.value]: { name: curr.value, logicRole: curr.logicRole ? curr.logicRole : curr.id },
        }),
        {},
      ),
    [callResults],
  );
  const filteredLeadStatus = useMemo(() => leadStatus?.filter(status => status.enabled), [
    leadStatus,
  ]);
  const filteredCompanyStatus = useMemo(() => companyStatus?.filter(status => status.enabled), [
    companyStatus,
  ]);
  const standardTriggers = useEntity('standardTriggers')
    ?.all()
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr.name]: curr.id,
      }),
      {},
    );

  useEffect(() => {
    if (refreshTriggers) {
      RestApi.search({
        entity: 'accountBobjectTriggers',
        query: {
          accountId: activeAccount.id,
        },
      }).then(response => {
        setAccountTriggers(
          response?._embedded.accountBobjectTriggers.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.standardTrigger]: {
                jsonConfig: JSON.parse(curr.jsonConfig),
                active: curr.active,
                id: curr.id,
              },
            }),
            {},
          ),
        );
        updateTriggers(
          response?._embedded.accountBobjectTriggers.reduce(
            (acc, curr) => ({
              ...acc,
              [Object.keys(standardTriggers).find(
                key => standardTriggers[key] === curr.standardTrigger,
              )]: {
                jsonConfig: JSON.parse(curr.jsonConfig),
                active: curr.active,
                id: curr.id,
              },
            }),
            {},
          ),
        );
        setRefreshTriggers(false);
      });
    }
  }, [refreshTriggers, standardTriggers]);

  const handleSubmit = save => {
    if (standardTriggers) {
      const triggers = accountTriggers;
      if (save?.triggerLead) {
        const triggerLead = triggers[standardTriggers[leadTrigger]];
        const triggerCompany = triggers[standardTriggers[companyTrigger]];
        RestApi.patch({
          entity: 'accountBobjectTriggers',
          id: triggerLead.id,
          body: {
            jsonConfig: JSON.stringify(save.triggerLead),
          },
        }).then(() => {
          if (triggerCompany) {
            RestApi.patch({
              entity: 'accountBobjectTriggers',
              id: triggerCompany.id,
              body: {
                jsonConfig: JSON.stringify({
                  ...triggerCompany.jsonConfig,
                  ...save?.triggerLead,
                }),
              },
            }).then(() => {
              setRefreshTriggers(true);
            });
          }
          setRefreshTriggers(true);
        });
        saveTriggerSetting(leadTrigger, save?.triggerLead, crm);
      }
      if (save?.triggerCompany) {
        const triggerCompany =
          Array.isArray(triggers) &&
          Array.isArray(standardTriggers) &&
          triggers[standardTriggers[companyTrigger]];
        if (triggerCompany) {
          RestApi.patch({
            entity: 'accountBobjectTriggers',
            id: triggerCompany.id,
            body: {
              jsonConfig: JSON.stringify({
                ...triggerCompany?.jsonConfig,
                ...save?.triggerCompany,
              }),
            },
          }).then(() => {
            setRefreshTriggers(true);
          });
          saveTriggerSetting(
            companyTrigger,
            {
              ...triggerCompany?.jsonConfig,
              ...save?.triggerCompany,
            },
            crm,
          );
        }
      }

      if (save.triggerActivities) {
        const triggerActivity = triggers[standardTriggers[activityTrigger]];
        RestApi.patch({
          entity: 'accountBobjectTriggers',
          id: triggerActivity.id,
          body: {
            jsonConfig: JSON.stringify(save.triggerActivities),
          },
        }).then(() => {
          setRefreshTriggers(true);
        });
        saveTriggerSetting(activityTrigger, save?.triggerActivities, crm);
      }

      if (save.triggerCompany) {
        const triggerCompany = triggers[standardTriggers[companyTrigger]];
        RestApi.patch({
          entity: 'accountBobjectTriggers',
          id: triggerCompany.id,
          body: {
            jsonConfig: JSON.stringify(save.triggerCompany),
          },
        }).then(() => {
          setRefreshTriggers(true);
        });
        saveTriggerSetting(companyTrigger, save?.triggerCompany, crm);
      }
      if (save.triggerMeeting) {
        const triggerMeeting = triggers[standardTriggers[meetingTrigger]];
        RestApi.patch({
          entity: 'accountBobjectTriggers',
          id: triggerMeeting.id,
          body: {
            jsonConfig: JSON.stringify(save.triggerMeeting?.jsonConfig),
            active: save.triggerMeeting?.active,
          },
        }).then(() => {
          setRefreshTriggers(true);
        });
        changeActiveTrigger(meetingTrigger, save.triggerMeeting?.active);
        saveTriggerSetting(meetingTrigger, save?.triggerMeeting?.jsonConfig, crm);
      }
      if (save?.triggerOpportunity) {
        const triggerOpportunity = triggers[standardTriggers[opportunityTrigger]];
        RestApi.patch({
          entity: 'accountBobjectTriggers',
          id: triggerOpportunity.id,
          body: {
            jsonConfig: JSON.stringify(save.triggerOpportunity),
          },
        }).then(() => {
          setRefreshTriggers(true);
        });
        saveTriggerSetting(opportunityTrigger, save?.triggerOpportunity, crm);
      }
      if (save?.userEmail) {
        if (crm === CRM.SALESFORCE) {
          RestApi.patch({
            entity: 'integrationSalesforces',
            id: activeIntegration?.id,
            body: {
              salesforceUser: save?.userEmail,
            },
          }).then(() => {
            setRefreshTriggers(true);
          });
        } else {
          RestApi.patch({
            entity: 'integrationHubspots',
            id: activeIntegration?.id,
            body: {
              legacyToken: save?.userEmail,
            },
          }).then(() => {
            setRefreshTriggers(true);
          });
        }
      }
    }
  };
  return (
    <>
      {standardTriggers && accountTriggers && (
        <SyncSettingsTabOutbound
          handleSubmit={handleSubmit}
          accountTriggers={accountTriggers}
          standardTriggers={standardTriggers}
          salesforceUsers={salesforceUsers}
          leadStatus={filteredLeadStatus}
          callResults={reducedCallResults}
          dealPipeline={dealsPipeline}
          disconnectIntegration={disconnectIntegration}
          activeIntegration={activeIntegration}
          triggerActivity={activityTrigger}
          triggerLead={leadTrigger}
          crm={crm}
          triggerMeeting={meetingTrigger}
          triggerOpportunity={opportunityTrigger}
          triggerCompany={companyTrigger}
          companyStatus={filteredCompanyStatus}
        />
      )}
    </>
  );
};
export default SyncStatusTabContainer;
