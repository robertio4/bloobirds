import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';

import { Button, Text } from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';

import { SearchPeopleSvg } from '../../../../assets/svg';
import AddQcToLeadModal from '../../../components/addQcToLeadModal/addQcToLeadModal';
import { BuyerPersonasButton } from '../../../components/buyerPersonasButton/buyerPersonasButton';
import BuyerPersonasModal from '../../../components/buyerPersonasModal/buyerPersonasModal';
import { useBobjectFormCreation } from '../../../hooks';
import { useBuyerPersonasModal } from '../../../hooks/useBuyerPersonasModal';
import { useSelectedLead } from '../../../hooks/useSelectedLead';
import { useSelectedOpportunity } from '../../../hooks/useSelectedOpportunity';
import { useContactBobjects } from '../../../pages/contactPages/contactPageContext';
import { Bobject, BobjectType } from '../../../typings/bobjects';
import LeadTableActions from '../leadTableActions/leadTableActions';
import AddLeadToOpportunityModal from './addLeadToOppModal';
import LeadCard from './leadCard/leadCard';
import styles from './leadList.module.css';

function AddLeadButton(props: {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  bobjectType: BobjectType;
}) {
  return (
    <Button dataTest="formCreate" variant="clear" iconLeft="addCircle" onClick={props.onClick}>
      {props.bobjectType === BOBJECT_TYPES.OPPORTUNITY ? 'Add lead to this opp' : 'Add Lead'}
    </Button>
  );
}

const LeadList = ({
  bobjectType,
  leads,
  company,
}: {
  bobjectType: BobjectType;
  leads: Bobject[];
  company: Bobject;
}) => {
  const parentRef = useRef();
  const { openAddLead, openAddLeadWithOpportunity } = useBobjectFormCreation();
  const { leads: companyLeads } = useContactBobjects();
  const [bobjectModal, setBobjectModal] = useState<Bobject>();
  const [openAddLeadToOpportunity, setOpenAddLeadToOpportunity] = useState(false);
  const { isOpen: isOpenBuyerPersonasModal, closeBuyerPersonasModal } = useBuyerPersonasModal();
  const { updateSelectedLead, selectedLead, resetSelectedLead } = useSelectedLead();
  const { selectedOpportunity } = useSelectedOpportunity();

  useEffect(() => {
    if (leads?.length > 0 && !selectedLead) {
      updateSelectedLead(leads[0]);
    } else if (!leads.some(lead => lead?.id?.value === selectedLead?.id?.value)) {
      resetSelectedLead();
    } else if (selectedLead && leads?.find(lead => lead?.id?.value === selectedLead?.id?.value)) {
      updateSelectedLead(leads?.find(lead => lead?.id?.value === selectedLead?.id?.value));
    }
  }, [leads, selectedLead]);

  const rowVirtualizer = useVirtual({
    size: leads?.length,
    parentRef,
    estimateSize: useCallback(() => 56, []),
    overscan: 3,
  });

  return (
    <div className={styles._container}>
      <div className={styles._title__container}>
        <Text size="s" color="softPeanut">
          {`Leads ${leads.length}`}
        </Text>
      </div>
      <div className={styles._cards__container}>
        {leads.length > 0 ? (
          <>
            <div
              style={{
                width: '100%',
                height: 220,
                overflow: 'auto',
              }}
              ref={parentRef}
            >
              <div
                style={{
                  height: `${rowVirtualizer.totalSize}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {rowVirtualizer.virtualItems.map(virtualRow => {
                  const lead = leads[virtualRow.index];
                  return (
                    <div
                      key={virtualRow.index}
                      ref={virtualRow.measureRef}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <LeadCard
                        lead={lead}
                        openAddQcToLeadModal={() => setBobjectModal(lead)}
                        key={lead?.id.value}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={styles._buttons_wrapper}>
                <AddLeadButton
                  bobjectType={bobjectType}
                  onClick={() => {
                    if (bobjectType === BOBJECT_TYPES.OPPORTUNITY) {
                      //TODO: Leads of the opportunity
                      if (companyLeads?.length > 0) {
                        setOpenAddLeadToOpportunity(true);
                      } else {
                        openAddLeadWithOpportunity({
                          bobject: selectedOpportunity,
                        });
                      }
                    } else {
                      openAddLead({ bobject: company });
                    }
                  }}
                />
                <div className={styles._buyer_personas_button}>
                  <BuyerPersonasButton textBefore="Keep in mind your" />
                </div>
                {!!bobjectModal && (
                  <AddQcToLeadModal
                    lead={bobjectModal}
                    open
                    handleClose={() => setBobjectModal(undefined)}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className={styles._withoutLeads__container}>
            <SearchPeopleSvg />
            <Text size="m" align="center" color="softPeanut">
              Still no leads added to this {bobjectType}, start adding the first one.
            </Text>
            <AddLeadButton
              bobjectType={bobjectType}
              onClick={() => {
                if (bobjectType === BOBJECT_TYPES.OPPORTUNITY) {
                  //TODO: Leads of the opportunity
                  if (companyLeads?.length > 0) {
                    setOpenAddLeadToOpportunity(true);
                  } else {
                    openAddLeadWithOpportunity({
                      bobject: selectedOpportunity,
                    });
                  }
                } else {
                  openAddLead({ bobject: company });
                }
              }}
            />
            <BuyerPersonasButton />
          </div>
        )}
      </div>
      <LeadTableActions bobjectType={bobjectType} leads={leads} />
      {openAddLeadToOpportunity && (
        <AddLeadToOpportunityModal
          handleClose={() => setOpenAddLeadToOpportunity(false)}
          leads={leads}
        />
      )}
      {isOpenBuyerPersonasModal && (
        <BuyerPersonasModal company={company} handleCloseModal={closeBuyerPersonasModal} />
      )}
    </div>
  );
};

export default LeadList;
