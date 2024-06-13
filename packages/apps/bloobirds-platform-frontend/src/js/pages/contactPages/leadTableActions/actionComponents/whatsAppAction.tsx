import React from 'react';

import { Action, Dropdown, Item, useVisible } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import { openWhatsAppWeb } from '@bloobirds-it/utils';

import { getFieldsByType } from '../../../../utils/bobjects.utils';
import styles from '../leadTableActions.module.css';

export const LeadTableWhatsAppAction = ({ selectedBobject }: { selectedBobject: Bobject }) => {
  const { ref, visible, setVisible } = useVisible();
  const bobjectPhoneNumbers =
    selectedBobject &&
    getFieldsByType(selectedBobject, 'PHONE')?.filter((phone: any) => !!phone.value);

  const displayDropdown = bobjectPhoneNumbers?.length > 1;

  return (
    <div className={styles.fakeTooltipClass}>
      {!displayDropdown ? (
        <Action
          icon="whatsapp"
          color="whatsapp"
          dataTest="whatsappButton"
          onClick={() => {
            openWhatsAppWeb(true, bobjectPhoneNumbers[0]?.value);
          }}
        />
      ) : (
        <Dropdown
          ref={ref}
          visible={visible}
          position="top"
          anchor={
            <Action
              icon="whatsapp"
              color="whatsapp"
              dataTest="whatsappButton"
              onClick={() => setVisible(visible => !visible)}
            />
          }
        >
          {bobjectPhoneNumbers?.map((phone: any) => (
            <Item
              className={styles._phone_item}
              key={`company-phone-${phone.value}`}
              value={phone.value}
              onClick={() => openWhatsAppWeb(true, phone.value)}
            >
              {phone.value}
            </Item>
          ))}
        </Dropdown>
      )}
    </div>
  );
};
