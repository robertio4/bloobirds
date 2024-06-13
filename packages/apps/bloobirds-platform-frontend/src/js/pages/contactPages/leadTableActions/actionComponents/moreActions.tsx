import React, { FC, useState } from 'react';

import { Dropdown, IconButton, Item, useVisible } from '@bloobirds-it/flamingo-ui';
import { BobjectType, BobjectTypes } from '@bloobirds-it/types';

import { UpdateLeadStatusesModal } from '../../../../components/updateLeadStatusesModal/updateLeadStatusesModal';
import { isLeadPage } from '../../../../utils/pages.utils';

type LeadTableMoreActionsProps = {
  bobjectType: BobjectType;
  leads: any[];
  logActivity: () => void;
  newLead: () => void;
};
export const LeadTableMoreActions: FC<LeadTableMoreActionsProps> = ({
  bobjectType,
  leads,
  logActivity,
  newLead,
}) => {
  const { ref, visible, setVisible } = useVisible();
  const [leadStatusesModalOpen, setLeadStatusesModalOpen] = useState<boolean>();

  return (
    <>
      <Dropdown
        ref={ref}
        visible={visible}
        anchor={
          <IconButton
            name="moreOpenholes"
            color="softPeanut"
            dataTest="moreDropdown"
            onClick={() => setVisible(!visible)}
          />
        }
      >
        {bobjectType !== BobjectTypes.Lead && (
          <Item
            onClick={() => {
              setVisible(!visible);
              setLeadStatusesModalOpen(true);
            }}
            dataTest="updateLeadStatusOption"
            icon="edit"
            disabled={leads?.length === 0 || isLeadPage(location?.pathname)}
          >
            Update lead status
          </Item>
        )}
        <Item
          onClick={() => {
            setVisible(!visible);
            logActivity();
          }}
          dataTest="logActivityOption"
          icon="zap"
        >
          Log Activity
        </Item>
        {
          //!isLeadWithoutCompanyPage(pathname) && (
          bobjectType === BobjectTypes.Lead && (
            <Item
              onClick={() => {
                setVisible(!visible);
                newLead();
              }}
              icon="person"
            >
              New Lead
            </Item>
          )
        }
      </Dropdown>

      {leadStatusesModalOpen && (
        <UpdateLeadStatusesModal
          onClose={() => setLeadStatusesModalOpen(false)}
          handleSave={() => setLeadStatusesModalOpen(false)}
          leads={leads}
        />
      )}
    </>
  );
};
