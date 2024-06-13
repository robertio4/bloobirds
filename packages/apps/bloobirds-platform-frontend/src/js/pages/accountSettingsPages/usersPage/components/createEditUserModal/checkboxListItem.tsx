import React, { SyntheticEvent } from 'react';

import { Text, Checkbox } from '@bloobirds-it/flamingo-ui';
import { CheckboxProps } from '@material-ui/core/Checkbox';

import styles from '../../styles/usersPage.module.css';

interface CheckboxControllerProps {
  value: boolean;
  onChange: (status: boolean, event: SyntheticEvent<Element, Event>) => void;
  children?: string;
  size?: CheckboxProps['size'];
}

export const CheckboxListItem = (props: CheckboxControllerProps) => {
  return (
    <div className={styles._checkbox_list_item}>
      <Text size="m">{props.children}</Text>
      <Checkbox size={props.size} checked={props.value} onClick={props.onChange} />
    </div>
  );
};
