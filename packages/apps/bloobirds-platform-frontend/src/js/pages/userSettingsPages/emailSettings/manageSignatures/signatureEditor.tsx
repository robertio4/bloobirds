import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Input, Text, TextArea, useToasts } from '@bloobirds-it/flamingo-ui';
import { SignatureProps, useSignatures, useUserHelpers } from '@bloobirds-it/hooks';
import {
  deserialize,
  serialize,
  useRichTextEditorPlugins,
  RichTextEditor,
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarImage,
  EditorToolbarListsSection,
  EditorToolbarSection,
  EditorToolbarTextMarksSection,
} from '@bloobirds-it/rich-text-editor';
import { APP_MANAGEMENT_USER, UserHelperKeys } from '@bloobirds-it/types';
import { createParagraph, isHtml } from '@bloobirds-it/utils';
import * as Sentry from '@sentry/react';
import clsx from 'clsx';
import { TFunction } from 'i18next';

import { validateHtml } from '../../../../utils/strings.utils';
import styles from './manageSignatures.module.css';

enum SignatureFormat {
  Visual = 'bloobirdsEditor',
  HTML = 'html',
}

const NoSelectedSignature = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.noSignatureSelected}>
      <Text size="xxl">👈</Text>
      <div>
        <Text size="m" color="softPeanut" align="center">
          {t('userSetings.email.signature.noSelected.title')}
        </Text>
        <Text size="m" color="softPeanut" align="center" weight="bold">
          {t('userSetings.email.signature.noSelected.subtitle')}
        </Text>
      </div>
    </div>
  );
};
const CheckSignatureSettings = () => {
  const { t } = useTranslation();
  const { save } = useUserHelpers();
  return (
    <div className={styles.noSignatureSelected}>
      <Text size="xxl"> ✅ </Text>
      <div>
        <Text size="m" color="softPeanut" align="center">
          {t('userSetings.email.signature.checkSignatureSettings.title')}
        </Text>
        <Text size="m" color="softPeanut" align="center" weight="bold">
          {t('userSetings.email.signature.checkSignatureSettings.subtitle')}
        </Text>

        <Button
          variant="primary"
          size="small"
          uppercase={false}
          onClick={() => {
            save(UserHelperKeys.SET_YOUR_EMAIL_SIGNATURE);
            window.open(APP_MANAGEMENT_USER + '?tab=EMAIL');
          }}
        >
          {t('userSetings.email.signature.checkSignatureSettings.button')}
        </Button>
      </div>
    </div>
  );
};

const isDirtyEditor = (data: SignatureProps, newSignature: SignatureProps) => {
  return newSignature?.signature !== data.signature;
};

const saveHtmlSignature = (value: string, createToast: (config: any) => string, t: TFunction) => {
  {
    const normalizedSignature = validateHtml(value, true);
    if (!normalizedSignature) {
      createToast({
        type: 'error',
        message: t('userSetings.email.signature.htmlInvalid'),
      });
      return;
    }

    return normalizedSignature;
  }
};

const saveRichTextSignature = (value: string, serializePlugins: any) => {
  return serialize(value, { format: 'AST', plugins: serializePlugins });
};

const SignatureEditor = ({
  data,
  setSignatureSelected,
  setIsEditorDirty,
  isQSG = false,
}: {
  data: SignatureProps;
  setSignatureSelected: (signature: SignatureProps) => void;
  setIsEditorDirty: (isDirty: boolean) => void;
  isQSG?: boolean;
}) => {
  const [newSignature, setNewSignature] = useState<SignatureProps>();
  const [error, setError] = useState<string>();
  const { signature, name, rawHtml } = newSignature ?? data;
  const { addSignature, updateSignature } = useSignatures();
  const titleRef = useRef<HTMLInputElement>();
  const deserializePlugins = useRichTextEditorPlugins({
    replaceParagraphs: true,
  });
  const serializePlugins = useRichTextEditorPlugins();
  const { createToast } = useToasts();
  const { t } = useTranslation();
  const { save } = useUserHelpers();
  const signatureFormats = [SignatureFormat.Visual, SignatureFormat.HTML];

  const parseUserSignature = () => {
    try {
      if (signature) {
        if (rawHtml) {
          if (typeof signature !== 'string') {
            return serialize(signature, {
              format: 'AST',
              plugins: deserializePlugins,
            });
          }
          return signature;
        } else {
          if (typeof signature === 'string') {
            if (isHtml(signature)) {
              return deserialize(signature, { format: 'HTML', plugins: deserializePlugins });
            } else {
              return createParagraph(signature);
            }
          }
          return signature;
        }
      } else {
        return '';
      }
    } catch (error) {
      createToast({
        type: 'error',
        message: t('userSetings.email.signature.richTextInvalid'),
      });
      Sentry.captureException(error, {
        tags: {
          module: 'signatureEditor',
        },
        extra: {
          signature,
        },
      });
      return '';
    }
  };

  const userSignature = parseUserSignature();

  useEffect(() => {
    setNewSignature(data);
  }, [data]);

  useEffect(() => {
    if (newSignature?.name && error) {
      setError(undefined);
    }
  }, [newSignature?.name]);

  useEffect(() => {
    if (newSignature) {
      const dirtyEditor = isDirtyEditor(data, newSignature);
      setIsEditorDirty(dirtyEditor);
    }
  }, [newSignature]);

  useEffect(() => {
    if (newSignature?.id === '' && titleRef.current) {
      titleRef.current.querySelector('input').focus();
    }
  }, [newSignature?.id]);

  const saveSignature = async () => {
    if (!newSignature.name) {
      setError(t('userSetings.email.signature.nameRequired'));
      return;
    }

    const signature = newSignature.signature;
    let signatureFormatted: string;
    if (newSignature.rawHtml) {
      signatureFormatted = saveHtmlSignature(signature, createToast, t);
    } else {
      signatureFormatted = saveRichTextSignature(signature, serializePlugins);
    }

    const newSignagureFormatted = {
      ...newSignature,
      signature: signatureFormatted,
    };
    if (!newSignature.id) {
      setSignatureSelected(await addSignature(newSignagureFormatted));
    } else {
      setSignatureSelected(updateSignature(newSignagureFormatted));
    }
    createToast({ type: 'success', message: t('userSetings.email.signature.saved') });
    save(UserHelperKeys.SET_YOUR_EMAIL_SIGNATURE);
  };

  return (
    <div className={styles.signatureSelected}>
      <div className={styles.title}>
        <div>
          <Input
            innerRef={titleRef}
            width="100%"
            borderless
            placeholder={t('userSetings.email.signature.namePlaceholder')}
            size="labeled"
            value={name}
            onChange={value => setNewSignature({ ...newSignature, name: value })}
          />
          {error && (
            <Text size="xxs" color="tomato" className={styles.error}>
              {error}
            </Text>
          )}
        </div>
        {signatureFormats.map(format => (
          <Button
            key={format}
            variant={
              (rawHtml && format === SignatureFormat.HTML) ||
              (!rawHtml && format === SignatureFormat.Visual)
                ? 'primary'
                : 'secondary'
            }
            size="small"
            uppercase={false}
            className={clsx({
              [styles.signatureFormatButtonRight]: format === SignatureFormat.HTML,
              [styles.signatureFormatButtonLeft]: format === SignatureFormat.Visual,
            })}
            onClick={() => {
              const newData = { ...newSignature, rawHtml: !rawHtml };
              setNewSignature(newData);
              setSignatureSelected(newData);
            }}
          >
            {t('userSetings.email.signature.' + format)}
          </Button>
        ))}
      </div>
      <div className={clsx(styles.content, { [styles.contentExpand]: isQSG })}>
        {rawHtml ? (
          <>
            <div className={styles.separator} />
            <TextArea
              minRows={16}
              maxRows={20}
              width="100%"
              height="100%"
              placeholder={t('userSetings.email.signature.htmlPlaceholder')}
              value={userSignature}
              onChange={(value: string) => {
                const newData = { ...newSignature, signature: value };
                setNewSignature(newData);
                setSignatureSelected(newData);
              }}
            />
          </>
        ) : (
          <RichTextEditor
            plugins={deserializePlugins}
            id={`signature${newSignature?.id}`}
            defaultValue={userSignature}
            onChange={(value: string) => {
              const newData = { ...newSignature, signature: value };
              setNewSignature(newData);
              setSignatureSelected(newData);
            }}
            style={{ height: '100%' }}
          >
            {(editor: any) => (
              <>
                <div className={styles.toolbar}>
                  <EditorToolbar id="signature" backgroundColor="var(--peanut) !important">
                    <EditorToolbarControlsSection />
                    <EditorToolbarFontStylesSection enableChangeSize />
                    <EditorToolbarTextMarksSection enableChangeColor />
                    <EditorToolbarListsSection />
                    <EditorToolbarSection>
                      <EditorToolbarImage />
                    </EditorToolbarSection>
                  </EditorToolbar>
                </div>
                <div>{editor}</div>
              </>
            )}
          </RichTextEditor>
        )}
      </div>
      <div className={styles.actions}>
        <Button
          variant="tertiary"
          size="small"
          uppercase={false}
          onClick={() => setSignatureSelected(null)}
        >
          {t('userSetings.email.signature.discard')}
        </Button>
        <div className={styles.rightActions}>
          <Button
            variant="primary"
            size="small"
            uppercase={false}
            onClick={saveSignature}
            disabled={!!error}
          >
            {t('userSetings.email.signature.save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const SignatureContainer = ({
  signature: data,
  setSignatureSelected,
  setIsEditorDirty,
  isQSG,
}: {
  signature: SignatureProps | undefined;
  setSignatureSelected: (signature: SignatureProps) => void;
  setIsEditorDirty: (isDirty: boolean) => void;
  isQSG: boolean;
}) => (
  <>
    {data ? (
      <SignatureEditor
        data={data}
        setSignatureSelected={setSignatureSelected}
        setIsEditorDirty={setIsEditorDirty}
        isQSG={isQSG}
      />
    ) : isQSG ? (
      <CheckSignatureSettings />
    ) : (
      <NoSelectedSignature />
    )}
  </>
);
