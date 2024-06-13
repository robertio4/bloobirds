import { useTranslation } from 'react-i18next';

import { Icon, Modal, ModalCloseIcon, ModalHeader, Text } from '@bloobirds-it/flamingo-ui';
import { LightAttachmentList } from '@bloobirds-it/light-attachment-list';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getTextFromLogicRole, getValueFromLogicRole } from '@bloobirds-it/utils';

import EmailModalRow from '../emailModalRow/emailModalRow';
import styles from './previewActivityEmailModal.module.css';

const PreviewActivityEmailModal = ({ activity, onClose }: { activity: any; onClose: any }) => {
  if (!activity) return null;

  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.previewActivityModal',
  });

  const subject = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT);
  const body = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  const activityAttachedFiles = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES,
  );
  const activityAttachments = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHMENTS,
  );
  const parsedAttachedFiles = activityAttachedFiles && JSON.parse(activityAttachedFiles);
  const parsedAttachments = activityAttachments && JSON.parse(activityAttachments);

  return (
    <Modal open onClose={onClose}>
      <div className={styles.container}>
        <ModalHeader className={styles.header} variant="gradient" color="bloobirds">
          <div className={styles.title}>
            <Icon color="white" name="mail" size={24} />
            <Text color="white" size="m">
              {t('title')}: {subject}
            </Text>
          </div>
          <ModalCloseIcon variant="gradient" onClick={onClose} />
        </ModalHeader>
        <EmailModalRow>
          <div
            style={{ width: '100%', padding: 0, userSelect: 'none' }}
            dangerouslySetInnerHTML={{ __html: subject }}
          />
        </EmailModalRow>
        <div className={styles.editor}>
          <div
            style={{ padding: '16px 20px', maxHeight: 500, minHeight: 200 }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
        {parsedAttachedFiles && parsedAttachedFiles?.length > 0 && (
          <div className={styles.attachments}>
            <LightAttachmentList
              files={parsedAttachedFiles}
              betterAttachments={parsedAttachments}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PreviewActivityEmailModal;
