import { useEffect, useMemo } from 'react';
import { useWatch, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactShadowRoot from 'react-shadow-root';

import { Banner } from '@bloobirds-it/banner';
import { useDebouncedCallback } from '@bloobirds-it/hooks';
import { serialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import { api, parseEmailPixels, createParagraph } from '@bloobirds-it/utils';
import clsx from 'clsx';
import useSWR from 'swr';

import salesforceResetStyles from '../../../../../utils/resetSalesforceCSSs.module.css';
import { useSmartEmailModal } from '../../../smartEmailModal';
import { useAttachedLinks } from '../../hooks/useAttachedLinks';
import { prepareBodyToBeSerialized } from '../../utils/smartEmailHelper.utils';
import styles from './previewTab.module.css';

export interface PreviewTabProps {
  control: Control<any>;
  error: boolean;
  hasAttachments: boolean;
  format: string;
  htmlContent: string;
}

const ASTPreview = ({ body, subject }: { body: string; subject: string }) => {
  const { attachedLinks } = useAttachedLinks();
  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true,
    snippets: true,
  });

  const previewSubject = useMemo(() => serialize(subject), [subject]);

  const bodyDeserialized = serialize(prepareBodyToBeSerialized(attachedLinks, body), {
    format: 'AST',
    plugins: bodyPlugins,
  });
  const previewBody = useMemo(() => parseEmailPixels(bodyDeserialized), [body]);

  return (
    <>
      <div
        className={styles.preview_subject_wrapper}
        dangerouslySetInnerHTML={{ __html: previewSubject }}
      />
      <div className={styles.preview_body_wrapper}>
        <div
          className={styles.preview_body_text_wrapper}
          dangerouslySetInnerHTML={{ __html: previewBody }}
        />
      </div>
    </>
  );
};

function HTMLPreview({ body, subject }: { body: string; subject: string }) {
  const { activeBobject } = useSmartEmailModal();

  function fetchPreviewEmail() {
    return api.post('/messaging/emails/preview', {
      subject: JSON.stringify(createParagraph(subject)),
      body,
      bobjectId: activeBobject?.id?.value,
      format: 'HTML',
    });
  }

  const previewSubject = useMemo(() => serialize(subject), [subject]);

  const { data, mutate } = useSWR(
    `/messaging/emails/preview/${activeBobject.id?.value}`,
    fetchPreviewEmail,
  );

  const debouncedMutate = useDebouncedCallback(mutate, 2000, [mutate]);

  useEffect(() => {
    //debounced mutate of 2s
    debouncedMutate();
  }, [activeBobject, body, subject]);

  return (
    <>
      <div
        className={clsx(styles.preview_subject_wrapper, salesforceResetStyles.salesforceReset)}
        dangerouslySetInnerHTML={{ __html: previewSubject }}
      />
      <div className={styles.preview_body_wrapper}>
        {/* @ts-ignore */}
        <ReactShadowRoot>
          <div
            className={clsx(
              styles.preview_body_text_wrapper,
              salesforceResetStyles.salesforceReset,
            )}
            dangerouslySetInnerHTML={{ __html: data?.data?.body }}
          />
        </ReactShadowRoot>
      </div>
    </>
  );
}

export const PreviewTab = ({
  previewTabProps: { control, error, hasAttachments, format, htmlContent },
}: {
  previewTabProps: PreviewTabProps;
}) => {
  const subject = useWatch({ control, name: 'subject' });
  const body = useWatch({ control, name: 'body' });

  const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.previewTab.banner' });

  const previewClasses = clsx(styles.preview, {
    [styles.preview__attachments]: hasAttachments,
  });

  return (
    <div className={previewClasses}>
      <div className={styles._header_callout_preview}>
        <Banner type={error ? 'error' : 'success'} icon="eye">
          {error ? t('error') : t('standard')}
        </Banner>
      </div>
      <div className={styles.preview_text_wrapper}>
        {format === 'AST' ? (
          <ASTPreview body={body} subject={subject} />
        ) : (
          <HTMLPreview body={htmlContent} subject={subject} />
        )}
      </div>
    </div>
  );
};
