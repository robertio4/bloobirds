import React, { useEffect } from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';

import { WrappedCadenceTable } from '../../../components/cadenceTable/wrappedCadenceTable';
import { useUserSettings } from '../../../components/userPermissions/hooks';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { useCadenceControl, useDocumentTitle } from '../../../hooks';
import { useNewCadenceTableEnabled } from '../../../hooks/useFeatureFlags';
import { useSelectedLead } from '../../../hooks/useSelectedLead';
import useSendToSales from '../../../hooks/useSendToSales';
import { getValueFromLogicRole } from '../../../utils/bobjects.utils';
import CadenceTableOld from '../cadenceTable/cadenceTableOld';
import styles from '../contactPage.module.css';
import { useContactBobjects } from '../contactPageContext';
import ContactTabs from '../contactTabs/contactTabs';
import LeadTableActions from '../leadTableActions/leadTableActions';
import SendToSalesModal from '../sendToSalesModal/sendToSalesModal';
import TasksBox from '../tasksBox/tasksBox';
import LeadCard from './leadCard/leadCard';

interface LeadPageProps {
  parentRef: any;
}

const getLeadFullName = (lead: any) =>
  getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
  getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);

const LeadPage = (props: LeadPageProps) => {
  const { resetSelectedLead } = useSelectedLead();
  const contactBobjects = useContactBobjects();
  const { isOpen: isSendToSalesOpen, closeSendToSalesModal } = useSendToSales();
  const { openCadenceControl } = useCadenceControl();
  const isNewCadenceTableEnabled = useNewCadenceTableEnabled();
  const settings = useUserSettings();
  const userId = settings?.user?.id;

  useDocumentTitle(getLeadFullName(contactBobjects?.active));
  const InfoCard = LeadCard;

  useEffect(
    () => () => {
      resetSelectedLead();
    },
    [],
  );

  return (
    <div>
      <div className={styles._info__container}>
        <div className={styles._info__row}>
          <div className={styles._infoCard__container}>
            {contactBobjects?.active ? (
              <InfoCard bobject={contactBobjects?.active} />
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
            <>
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
                      activeUserId={userId}
                      bobject={{
                        id: contactBobjects?.urlBobject.id,
                        companyId: getValueFromLogicRole(
                          contactBobjects.active,
                          LEAD_FIELDS_LOGIC_ROLE.COMPANY,
                        ),
                        ...(contactBobjects?.active
                          ? {
                              assignedTo: getValueFromLogicRole(
                                contactBobjects.active,
                                LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
                              ),
                              cadenceId: getValueFromLogicRole(
                                contactBobjects.active,
                                LEAD_FIELDS_LOGIC_ROLE.CADENCE,
                              ),
                              targetMarket: null,
                            }
                          : {
                              assignedTo: null,
                              cadenceId: null,
                              targetMarket: null,
                            }),
                      }}
                      leads={[]}
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
              <LeadTableActions bobjectType="Lead" leads={[contactBobjects?.active]} />
            </>
          </div>
        </div>
      </div>
      <ContactTabs {...props} />
      {isSendToSalesOpen && <SendToSalesModal open onClose={closeSendToSalesModal} />}
    </div>
  );
};

export default LeadPage;
