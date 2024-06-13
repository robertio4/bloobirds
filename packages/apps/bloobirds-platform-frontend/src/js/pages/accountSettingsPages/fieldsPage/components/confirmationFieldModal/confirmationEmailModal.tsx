import useSWR from 'swr';
import {
  Button,
  Icon,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { api } from '../../../../../utils/api';
import { useRouter } from '../../../../../hooks';
import styles from '../../../../../layouts/messagingSectionLayout/messagingTemplateFormLayout/messagingTemplateForm/messagingTemplateForm.module.css';
import { PAGES_ROUTES } from '../../../../playbookPages/sidebar/sidebar';
import { BobjectField } from '../../../../../typings/bobjects';

interface ConfirmationModalProps {
  onClose: () => void;
  field: BobjectField;
  onDiscard?: () => void;
}

function ConfirmationEmailModal({ onClose, field }: ConfirmationModalProps) {
  const { data: cadences } = useSWR(
    field ? `/messaging/cadences/emailFields/${field.id}/cadenceUsages` : null,
    url =>
      api.get(url, {
        headers: { 'Content-Type': 'application/json' },
        data: {},
      }),
  );
  const { history } = useRouter();

  const cadencesUsingEmailField = cadences?.data?.cadences;
  return (
    <Modal open onClose={onClose} width={640}>
      <ModalHeader variant="gradient" color="purple" className={styles.modal_header}>
        <ModalTitle variant="gradient">
          <div className={styles.modal_title}>
            <Icon color="purple" name="autoMail" size={24} />
            <Text color="peanut" size="s">
              Email field in cadence
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon size="small" onClick={onClose} color="purple" />
      </ModalHeader>
      <ModalContent>
        <Text color="softPeanut" size="s" className={styles.modal_text}>
          This field cannot be delete because is being used in {cadencesUsingEmailField?.length}{' '}
          cadence(s), if you want to delete it unlink the field from these cadences.
        </Text>
        {cadencesUsingEmailField && (
          <ul>
            {cadencesUsingEmailField?.map(cadence => (
              <li key={cadence.id}>
                <Text color="softPeanut" size="s">
                  {cadence.name}
                </Text>
              </li>
            ))}
          </ul>
        )}
      </ModalContent>
      <ModalFooter>
        <div />
        <div>
          <Button
            variant="secondary"
            color="lightPurple"
            onClick={() => history.push(PAGES_ROUTES.CADENCES)}
            className={styles.secondary_button}
          >
            Go to Cadences
          </Button>
          <Button variant="primary" color="purple" onClick={onClose}>
            Close
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default ConfirmationEmailModal;
