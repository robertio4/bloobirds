import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Modal, ModalCloseIcon, ModalHeader, Text } from '@bloobirds-it/flamingo-ui';
import { deserialize, serialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import { MessagingTemplate } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

import AttachmentList from '../attachmentList/attachmentList';
import styles from './previewTemplateModal.module.css';

interface EmailModalRowProps {
  children: any;
}

function EmailModalRow({ children }: EmailModalRowProps) {
  return <div className={styles.container}>{children}</div>;
}

export default EmailModalRow;

const fetchMessagingTemplate = async (url: string) => {
  const { data } = await api.get(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {},
  });
  return data;
};

export const PreviewTemplateModal = ({
  templateId,
  onClose,
}: {
  templateId: string;
  onClose: any;
}) => {
  const [messagingTemplate, setMessagingTemplate] = useState<MessagingTemplate>();

  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    rawHTMLBlock: true,
    replyHistory: true,
  });

  const subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    singleLine: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
  });

  useEffect(() => {
    if (templateId) {
      fetchMessagingTemplate(`/messaging/messagingTemplates/${templateId}`).then(
        (data: MessagingTemplate) => {
          setMessagingTemplate(data);
        },
      );
    }
  }, [templateId, setMessagingTemplate]);

  const propsSubject = {
    format: messagingTemplate?.format,
    plugins: subjectPlugins,
  };
  const deserializeSubject = deserialize(messagingTemplate?.subject, propsSubject);
  const htmlSubject = serialize(deserializeSubject, propsSubject);

  const propsBody = {
    format: messagingTemplate?.format,
    plugins: bodyPlugins,
  };
  const deserializeContent = deserialize(messagingTemplate?.content, propsBody);
  const htmlBody = serialize(deserializeContent, propsBody);
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.previewTemplateModal',
  });

  return (
    <>
      {messagingTemplate && (
        <Modal open onClose={onClose}>
          <div className={styles.container}>
            <ModalHeader className={styles.header} variant="gradient" color="bloobirds">
              <div className={styles.title}>
                <Icon color="white" name="mail" size={24} />
                <Text color="white" size="m">
                  {t('title')} {messagingTemplate?.name}
                </Text>
              </div>
              <ModalCloseIcon variant="gradient" onClick={onClose} />
            </ModalHeader>
            <EmailModalRow>
              <div
                style={{ width: '100%', padding: 0, userSelect: 'none' }}
                dangerouslySetInnerHTML={{ __html: htmlSubject }}
              />
            </EmailModalRow>
            <div className={styles.editor}>
              <div
                style={{ padding: '16px 20px', maxHeight: 500, minHeight: 200, marginBottom: 40 }}
                dangerouslySetInnerHTML={{ __html: htmlBody }}
              />
            </div>
            {messagingTemplate?.mediaFiles.length > 0 && (
              //@ts-ignore
              <AttachmentList files={messagingTemplate?.mediaFiles} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};
