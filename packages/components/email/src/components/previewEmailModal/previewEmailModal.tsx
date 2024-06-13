import { Icon, Modal, ModalCloseIcon, ModalHeader, Text } from '@bloobirds-it/flamingo-ui';
import { AttachmentList } from '@bloobirds-it/misc';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

import EmailModalRow from '../emailModalRow/emailModalRow';
import styles from './previewEmailModal.module.css';
import { useTranslation } from "react-i18next";

type PreviewEmailProps = {
  templateName: string;
  subject: string;
  content: string;
  mediaFiles: any[];
};

export const fetchPreviewEmail = async (url: string): Promise<PreviewEmailProps> => {
  if (url) {
    const response = await api.get<PreviewEmailProps>(url);
    return response.data;
  }
};

const usePreviewEmail = (taskId: string): PreviewEmailProps => {
  const { data } = useSWR(
    taskId ? `/messaging/automatedEmail/preview/${taskId}` : null,
    fetchPreviewEmail,
  );
  return data;
};

const PreviewEmailModal = ({ taskId, onClose }: { taskId: string; onClose: any }) => {
  const data = usePreviewEmail(taskId);

  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.previewActivityModal',
  });

  const { templateName, subject, content, mediaFiles } = data || {};

  if (!taskId || !data) return null;

  return (
    <Modal open onClose={onClose}>
      <div className={styles.container}>
        <ModalHeader className={styles.header} variant="gradient" color="bloobirds">
          <div className={styles.title}>
            <Icon color="white" name="mail" size={24} />
            <Text color="white" size="m">
              {t('title')}: {templateName}
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
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        {mediaFiles?.length > 0 && <AttachmentList files={mediaFiles} />}
      </div>
    </Modal>
  );
};

export default PreviewEmailModal;
