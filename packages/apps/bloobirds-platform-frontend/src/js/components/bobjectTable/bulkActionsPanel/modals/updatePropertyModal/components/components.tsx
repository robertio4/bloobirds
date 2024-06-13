import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import styles from './components.css';

export const UpdateIcon = () => {
  return (
    <div className={styles._update_icon}>
      <Icon name="edit" size={50} className={styles._update_icon_icon} />
      <Text weight={'medium'} size={'xl'} className={styles._update_icon_title}>
        Update
      </Text>
    </div>
  );
};

export const AddProperty = ({
  isDisabled,
  onClick,
}: {
  isDisabled: boolean;
  onClick: () => void;
}) => {
  return (
    <div className={styles._add_property}>
      <Button variant="clear" iconLeft="add" disabled={isDisabled} onClick={onClick}>
        ADD PROPERTY TO UPDATE
      </Button>
    </div>
  );
};

export const InfoExtra = () => {
  return (
    <div className={styles._add_property}>
      <Text size={'s'} color={'softPeanut'}>
        💡 For deleting <b>properties</b>
        {` select "None" or type `}
        <b>#deletevalue</b>
      </Text>
    </div>
  );
};
