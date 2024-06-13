import { withStyles } from '@material-ui/core/styles';
import { Checkbox } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import Cell from './Cell';

const styles = {
  checkbox: {
    padding: '16px 12px 16px 12px',
  },
};

const CheckboxWithStyles = () => {
  return (
    <Cell actions={() => {}} dataTest="checkbox-cell" className={styles.checkbox}>
      <Checkbox
        size={'small'}
        checked={false}
        onClick={(value, event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
      />
    </Cell>
  );
};

//@ts-ignore
export default withStyles(styles)(CheckboxWithStyles);
