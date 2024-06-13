import { useState } from 'react';

import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { InactiveModal } from '@bloobirds-it/inactive-handling';

import { useExtensionContext } from '../../../../../context';
import styles from '../../wizardHelper.module.css';

export const InactiveBobjectHelper = () => {
  const { useGetActiveBobject, useGetDataModel } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const [open, setOpen] = useState<boolean>();
  const dataModel = useGetDataModel();

  return (
    <div>
      <Text size="xs" color="peanut" className={styles.wizard__title} weight="bold">
        ⚠ Inactive {activeBobject?.id?.typeName}
      </Text>
      <Button
        size="medium"
        variant="tertiary"
        expand
        className={styles.start_cadence}
        onClick={() => setOpen(true)}
      >
        {' '}
        <Icon name="bookmark" color="bloobirds" size={12} />
        Choose next step
      </Button>
      {open && (
        <InactiveModal
          handleClose={() => setOpen(false)}
          bobject={activeBobject}
          dataModel={dataModel}
        />
      )}
    </div>
  );
};
