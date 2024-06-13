import React from 'react';
import { Button, Modal, ModalContent, ModalFooter, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import styles from './stopCadenceModal.module.css';
import useStopCadence from '../../hooks/useStopCadence';
import { isTask } from '../../utils/bobjects.utils';
import { getTaskReferenceBobject } from '../../utils/tasks.utils';

const StopCadenceModal = ({ handleClose, open }: { handleClose: () => void; open: boolean }) => {
  const { stopCadence, isSubmitting, bobject } = useStopCadence();
  const isBulkAction = bobject.length > 0;
  const sampleBobject = isBulkAction ? bobject[0] : bobject;
  const bobjectToWorkWith = isTask(sampleBobject)
    ? getTaskReferenceBobject(sampleBobject)
    : sampleBobject;
  const bobjectType = bobjectToWorkWith?.id?.typeName;

  return (
    <Modal
      title={isBulkAction ? 'Stop cadences' : 'Stop cadence'}
      open={open}
      onClose={handleClose}
      width={640}
    >
      <ModalContent>
        <div className={styles.text}>
          {isBulkAction ? (
            <Text size="m" align="center">
              You&apos;re about to{' '}
              <b>
                stop the cadence of {bobject?.length}{' '}
                {bobject.length > 1
                  ? bobjectType?.endsWith('y')
                    ? bobjectType?.toLowerCase().replace(/.$/, 'ies')
                    : bobjectType?.toLowerCase() + 's'
                  : bobjectType?.toLowerCase()}
                .
              </b>
              <br />
              <b>This action cannot be undone, are you sure you want to continue?</b>
            </Text>
          ) : (
            <Text size="m" align="center">
              You&apos;re about to <b>stop the cadence of this {bobjectType?.toLowerCase()}.</b>
              <br />
              <b>This action cannot be undone, are you sure you want to continue?</b>
            </Text>
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="tomato" onClick={stopCadence}>
          {isSubmitting ? <Spinner color="white" size={14} name="loadingCircle" /> : 'Stop cadence'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default StopCadenceModal;
