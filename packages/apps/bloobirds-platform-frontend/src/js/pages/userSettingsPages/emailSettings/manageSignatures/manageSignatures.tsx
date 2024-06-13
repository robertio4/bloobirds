import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';
import {
  usePreventWindowUnload,
  SignatureProps,
  useSignatures,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import { serialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import { UserHelperKeys } from '@bloobirds-it/types';
import { isExpanded } from '@udecode/plate';
import clsx from 'clsx';

import ListSignatures from './listSignatures';
import styles from './manageSignatures.module.css';
import { SignatureContainer } from './signatureEditor';
import DirtyModal from './signatureModal';

const getSignature = (signature: any, plugins: any) => {
  if (typeof signature === 'object') {
    return serialize(signature, {
      format: 'AST',
      plugins: plugins,
    });
  }
  return signature?.replace(/\n/g, '<br>');
};

const EmptySignature = ({
  setSignatureSelected,
}: {
  setSignatureSelected: (signature: SignatureProps) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.noSignatureSelected}>
      <Text size="xxl">😕</Text>
      <div>
        <Text size="m" color="softPeanut" align="center">
          {t('userSetings.email.signature.noCreated.title')}
        </Text>
        <Text size="m" color="softPeanut" align="center" weight="bold">
          {t('userSetings.email.signature.noCreated.subtitle')}
        </Text>
      </div>
      <Button
        variant="primary"
        size="small"
        uppercase={false}
        onClick={() => {
          setSignatureSelected({
            id: '',
            name: '',
            signature: '',
            rawHtml: true,
            default: false,
          });
        }}
      >
        {t('userSetings.email.signature.noCreated.button')}
      </Button>
    </div>
  );
};

const NewSignatureButton = ({ isEditorDirty, setOpenDirtyModal, signatureSelectedState }) => {
  const { signatureSelected, setSignatureSelected } = signatureSelectedState;
  const { t } = useTranslation();

  return (
    <Button
      expand
      className={styles.bottomButton}
      variant="secondary"
      iconLeft="plus"
      size="small"
      uppercase={false}
      onClick={() => {
        if (isEditorDirty) {
          setOpenDirtyModal(true);
        } else {
          setSignatureSelected({
            id: '',
            name: '',
            signature: '',
            rawHtml: true,
            default: false,
          });
        }
      }}
      disabled={signatureSelected?.id === ''}
    >
      {t('userSetings.email.signature.new')}
    </Button>
  );
};

const ManageSignatures = ({ isQSG = false }: { isQSG?: boolean }) => {
  const [signatureSelected, setSignatureSelected] = useState<SignatureProps>();
  const [isEditorDirty, setIsEditorDirty] = useState(false);
  const [openDirtyModal, setOpenDirtyModal] = useState(isEditorDirty);
  const { data: signatures } = useSignatures();
  const { t } = useTranslation();
  const deserializePlugins = useRichTextEditorPlugins({
    replaceParagraphs: true,
  });

  usePreventWindowUnload(isEditorDirty);

  return (
    <>
      <div
        className={clsx(styles.container, {
          [styles.containerFlex]: isQSG,
          [styles.hasSignatureQSG]: isQSG && !signatureSelected,
        })}
      >
        {!isQSG && (
          <div className={styles.leftBar}>
            <ListSignatures
              signatureSelected={signatureSelected}
              setSignatureSelected={setSignatureSelected}
            />
            <div className={styles.bottomButtons}>
              <NewSignatureButton
                isEditorDirty={isEditorDirty}
                setOpenDirtyModal={setOpenDirtyModal}
                signatureSelectedState={{
                  signatureSelected,
                  setSignatureSelected,
                }}
              />
            </div>
          </div>
        )}
        <div className={clsx(styles.centerContent, { [styles.centerContentExpand]: isQSG })}>
          {(!signatures || signatures.length === 0) && !signatureSelected ? (
            <EmptySignature setSignatureSelected={setSignatureSelected} />
          ) : (
            <SignatureContainer
              signature={signatureSelected}
              setSignatureSelected={setSignatureSelected}
              setIsEditorDirty={setIsEditorDirty}
              isQSG={isQSG}
            />
          )}
        </div>
      </div>
      {signatureSelected && signatureSelected?.rawHtml && signatureSelected?.signature && (
        <>
          <Text color="peanut" size="s" weight="medium">
            {t('userSetings.email.signature.preview')}
          </Text>
          <div className={clsx(styles.preview, { [styles.previewExpand]: isQSG })}>
            <div
              dangerouslySetInnerHTML={{
                __html: getSignature(signatureSelected?.signature, deserializePlugins),
              }}
            />
          </div>
        </>
      )}
      {openDirtyModal && (
        <DirtyModal
          title={t('userSetings.email.signature.dirtyModal.title')}
          icon={'save'}
          onClose={() => setOpenDirtyModal(false)}
          onContinue={() => {
            setIsEditorDirty(false);
            setOpenDirtyModal(false);
            setSignatureSelected({
              id: '',
              name: '',
              signature: '',
              rawHtml: true,
              default: false,
            });
          }}
        >
          <>
            <Text size="m" align="center">
              {t('userSetings.email.signature.dirtyModal.text')}
            </Text>
            <Text size="m" align="center">
              <b>{t('userSetings.email.signature.dirtyModal.question')}</b>
            </Text>
          </>
        </DirtyModal>
      )}
    </>
  );
};

export default ManageSignatures;
