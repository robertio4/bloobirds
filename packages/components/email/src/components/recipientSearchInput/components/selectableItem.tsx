import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { CircularBadge, Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import { Contact } from '../recipientSearchInput';
import styles from '../recipientSearchInput.module.css';

export const SelectableItem = ({
  contact,
  selectContact,
  setSelectedIndex,
  selectedIndex,
  index,
  isOutsider = false,
}: {
  contact: Contact;
  selectContact: (contact: Contact) => void;
  setSelectedIndex;
  selectedIndex;
  index;
  isOutsider?: boolean;
}) => {
  const ref = useRef();
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.recipientSearchInput',
  });

  if (index === selectedIndex && ref && ref.current) {
    // @ts-ignore
    ref.current.scrollIntoView({
      block: 'nearest',
    });
  }

  return (
    <Tooltip title={isOutsider && t('selectableItemTooltip')} position="top">
      <div
        key={contact.email}
        ref={ref}
        role="option"
        aria-selected={index === selectedIndex}
        id={`${contact.email}-option`}
        className={styles.item}
        onMouseEnter={() => {
          setSelectedIndex(index);
        }}
        onMouseDown={event => {
          event.preventDefault();
          selectContact(contact);
        }}
      >
        <CircularBadge
          size="medium"
          style={{ color: 'white', backgroundColor: 'var(--lightPeanut)' }}
        >
          {/*@ts-ignore*/}
          <Icon name={isOutsider ? 'warning' : contact.icon} />
        </CircularBadge>
        <div>
          <Text color="bloobirds" size="s" weight="medium">
            {contact.name}
          </Text>
          <Text color="softPeanut" size="s">
            {contact.email}
          </Text>
        </div>
      </div>
    </Tooltip>
  );
};
