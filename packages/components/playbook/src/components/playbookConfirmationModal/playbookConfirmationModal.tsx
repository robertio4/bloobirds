import { useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  IconType,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';

import { useCadencesUsingTemplate } from '../../hooks/useCadencesUsingTemplate';
import styles from './playbookConfirmationModal.module.css';

function ConfirmationModalHeader({
  icon,
  text,
  onClose,
}: {
  icon: IconType;
  text: string;
  onClose;
}) {
  return (
    <ModalHeader variant="gradient" color="purple" className={styles.modal_header}>
      <ModalTitle variant="gradient">
        <div className={styles.modal_title}>
          <Icon color="purple" name={icon} size={24} />
          <Text color="purple" size="m">
            {text}
          </Text>
        </div>
      </ModalTitle>
      <ModalCloseIcon size="small" onClick={onClose} color="purple" />
    </ModalHeader>
  );
}

interface EditTemplateConfirmationModalProps {
  openMode: 'Save' | '';
  onClose;
  onAccept;
  cadencesUsingTemplate: NonNullable<any[]>;
}

function EditTemplateConfirmationModal(props: EditTemplateConfirmationModalProps) {
  const { openMode, onClose, onAccept, cadencesUsingTemplate } = props;
  const { t } = useTranslation();

  if (!cadencesUsingTemplate || cadencesUsingTemplate?.length === 0) {
    onAccept();
    return null;
  } else {
    return (
      <Modal open={!!openMode} onClose={onClose} width={640}>
        <ConfirmationModalHeader
          icon="autoMail"
          text={t('playbook.handleTemplate.confirmation.saveExisting')}
          onClose={onClose}
        />
        <ModalContent>
          <Text color="softPeanut" size="s" className={styles.modal_text}>
            {t('playbook.handleTemplate.edit.text', { count: cadencesUsingTemplate?.length ?? 0 })}
          </Text>
          {cadencesUsingTemplate && (
            <div className={styles.cadences}>
              {cadencesUsingTemplate?.map(
                cadence =>
                  'name' in cadence && (
                    <div key={cadence.id} className={styles.cadence}>
                      <Icon name={'circle'} color="lightPurple" />
                      <Text color="softPeanut" size="s">
                        {cadence.name}
                      </Text>
                    </div>
                  ),
              )}
            </div>
          )}
        </ModalContent>
        <ModalFooter>
          <div className={styles.buttons}>
            <Button variant="clear" color="purple" onClick={onClose}>
              {t('playbook.handleTemplate.cancel')}
            </Button>
            <div className={styles.buttons_right}>
              <Button variant="primary" color="purple" onClick={onAccept}>
                {t('playbook.handleTemplate.accept')}
              </Button>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

interface DeleteConfirmationModalProps {
  openMode: 'Delete' | '';
  cadencesUsingTemplate;
  templateId?;
  onClose;
  onAccept;
}

function DeleteConfirmationModal(props: DeleteConfirmationModalProps) {
  const { openMode, cadencesUsingTemplate: outsideCadences, templateId, onClose, onAccept } = props;
  const { cadencesUsingTemplate: cadences, isValidating } = useCadencesUsingTemplate(templateId);
  const { t } = useTranslation();

  const cadencesUsingTemplate = outsideCadences || cadences;
  if (isValidating) {
    return null;
  } else if (cadencesUsingTemplate && cadencesUsingTemplate.length) {
    return (
      <Modal open={!!openMode} onClose={onClose} width={640}>
        <ConfirmationModalHeader icon="trashFull" text="Delete template" onClose={onClose} />
        <ModalContent>
          <Text color="softPeanut" size="s" className={styles.modal_text}>
            {t('playbook.handleTemplate.delete.text', {
              count: cadencesUsingTemplate?.length ?? 0,
            })}
          </Text>
          {cadencesUsingTemplate && (
            <div className={styles.cadences}>
              {cadencesUsingTemplate?.map(
                cadence =>
                  'name' in cadence && (
                    <div key={cadence.id} className={styles.cadence}>
                      <Icon name={'circle'} color="lightPurple" />
                      <Text color="softPeanut" size="s">
                        {cadence.name}
                      </Text>
                    </div>
                  ),
              )}
            </div>
          )}
        </ModalContent>
        <ModalFooter>
          <div className={styles.button_end}>
            <Button variant="primary" color="purple" onClick={onClose}>
              {t('playbook.handleTemplate.close')}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  } else {
    return (
      <DiscardConfirmationModal
        openMode={openMode}
        templateId={templateId}
        onClose={onClose}
        onAccept={onAccept}
      />
    );
  }
}

interface DiscardConfirmationModalProps {
  openMode: 'Discard' | 'Delete' | '';
  templateId;
  onClose;
  onAccept;
}

function DiscardConfirmationModal(props: DiscardConfirmationModalProps) {
  const { openMode, templateId, onClose, onAccept } = props;
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.handleTemplate' });

  return (
    <Modal open={!!openMode} onClose={onClose} width={500}>
      <ConfirmationModalHeader
        icon="cross"
        text={t(`${openMode?.toLowerCase()}.titleWithValue`, {
          value: templateId ? 'template' : 'changes',
        })}
        onClose={onClose}
      />
      <ModalContent>
        <Text size="s" className={styles.modal_text_delete}>
          {openMode === 'Discard' ? t('discard.changesNotSaved') : t('discard.aboutToDelete')}
          <Text htmlTag="span" size="s" weight="bold">
            {t('discard.noUndone')}
          </Text>{' '}
          {t('discard.sure')}
        </Text>
      </ModalContent>
      <ModalFooter>
        <div className={styles.buttons}>
          <Button variant="clear" color="purple" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button variant="primary" color="tomato" onClick={onAccept}>
            {t(`${openMode?.toLowerCase()}.title`)}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export type OpenMode = 'Save' | 'Delete' | 'Discard' | '';
interface PlaybookConfirmationModalProps {
  openMode: OpenMode;
  cadencesUsingTemplate?;
  templateId?;
  onClose;
  onAccept;
}

export function PlaybookConfirmationModal({
  openMode = '',
  cadencesUsingTemplate = [],
  templateId = '',
  onAccept = () => {},
  onClose = () => {},
}: PlaybookConfirmationModalProps) {
  switch (openMode) {
    case 'Save':
      return (
        <EditTemplateConfirmationModal
          openMode={openMode}
          cadencesUsingTemplate={cadencesUsingTemplate}
          onAccept={onAccept}
          onClose={onClose}
        />
      );
    case 'Delete':
      return (
        <DeleteConfirmationModal
          openMode={openMode}
          cadencesUsingTemplate={cadencesUsingTemplate}
          templateId={templateId}
          onAccept={onAccept}
          onClose={onClose}
        />
      );
    case 'Discard':
      return (
        <DiscardConfirmationModal
          openMode={openMode}
          templateId={templateId}
          onAccept={onAccept}
          onClose={onClose}
        />
      );
    default:
      return null;
  }
}
