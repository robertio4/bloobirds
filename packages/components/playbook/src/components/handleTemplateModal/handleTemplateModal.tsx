import React, { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { createToast, IconButton, IconType, Modal, Text } from '@bloobirds-it/flamingo-ui';
import { useMessagingTemplate, useUserHelpers } from '@bloobirds-it/hooks';
import { useAttachedFiles, useAttachedLinks } from '@bloobirds-it/misc';
import {
  ExtensionHelperKeys,
  TEMPLATE_TYPES,
  TemplateStage,
  UserHelperTooltipsKeys,
} from '@bloobirds-it/types';
import { recoverScrollOfBox, removeScrollOfBox } from '@bloobirds-it/utils';

import { useCadencesUsingTemplate } from '../../hooks/useCadencesUsingTemplate';
import { useSnippets } from '../../hooks/useSnippets';
import { SegmentationForm } from '../handleTemplate/components/segmentationForm';
import { TemplateInformation } from '../handleTemplate/components/templateFormHeader';
import {
  defaultTemplate,
  getSegmentationValuesToSendToDB,
  parseSegmentationValues,
  Template,
} from '../handleTemplate/handleTemplate.utils';
import {
  OpenMode,
  PlaybookConfirmationModal,
} from '../playbookConfirmationModal/playbookConfirmationModal';
import { HandleTemplateModalFooter } from './components/handleTemplateModalFooter';
import { TemplateModalForm } from './components/templateModalForm';
import styles from './handleTemplateModal.module.css';

interface TemplateInfoType {
  key: string;
  icon: IconType;
  hasBattleCard?: boolean;
}

const TemplateDisplayInfo: Record<string, TemplateInfoType> = {
  [TEMPLATE_TYPES.EMAIL]: {
    key: 'emailTemplate',
    icon: 'mail',
    hasBattleCard: false,
  },
  [TEMPLATE_TYPES.PITCH]: {
    key: 'pitchTemplate',
    icon: 'chat',
    hasBattleCard: true,
  },
  [TEMPLATE_TYPES.SNIPPET]: {
    key: 'snippetTemplate',
    icon: 'snippet',
    hasBattleCard: true,
  },
  [TEMPLATE_TYPES.LINKEDIN]: {
    key: 'linkedinTemplate',
    icon: 'linkedin',
    hasBattleCard: false,
  },
  [TEMPLATE_TYPES.WHATSAPP]: {
    key: 'whatsappTemplate',
    icon: 'whatsapp',
    hasBattleCard: false,
  },
};

export const HandleTemplateModal = ({ handleClose, template, contextValues }) => {
  const isEditing = !!template?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openConfirmModalMode, setOpenConfirmModalMode] = useState<OpenMode>('');
  const { cadencesUsingTemplate } = useCadencesUsingTemplate(template?.id);

  const defaultStage = useMemo(() => {
    if (isEditing) {
      return contextValues.stage === 'PROSPECTING'
        ? { stage: TemplateStage.Prospecting }
        : contextValues;
    } else {
      return { stage: TemplateStage.All };
    }
  }, [template?.id, contextValues?.stage]);

  const defaultValues: Template = {
    ...defaultTemplate,
    ...defaultStage,
    ...template,
    segmentationValues: parseSegmentationValues(template?.segmentationValues, template?.stage),
  };

  const { attachedFiles, removeAttachedFile, uploadAttachedFile } = useAttachedFiles();
  const { attachedLinks, removeAttachedLink } = useAttachedLinks();
  const { t } = useTranslation('translation', { keyPrefix: 'playbook' });
  const modalInfo = TemplateDisplayInfo[template?.type];

  const formMethods = useForm<Template>({ defaultValues });
  const {
    handleSubmit,
    formState: { isDirty },
  } = formMethods;
  const { mutate: mutateSnippets } = useSnippets();

  const { deleteMessagingTemplate, saveMessagingTemplate } = useMessagingTemplate(template?.id);
  const { has, save, saveCustom } = useUserHelpers();

  const saveHelpers = (type: TEMPLATE_TYPES) => {
    if (type === TEMPLATE_TYPES.SNIPPET && !has(ExtensionHelperKeys.PLAYBOOK_SNIPPETS_TOOLTIP)) {
      save(ExtensionHelperKeys.PLAYBOOK_SNIPPETS_TOOLTIP);
    }
    if (!has(UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP)) {
      saveCustom({
        key: UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP,
        data: new Date().toISOString(),
      });
    }
  };

  async function onSubmit(data: Template) {
    setIsSubmitting(true);
    const newMessagingTemplate = {
      ...data,
      ...(isEditing ? { id: template?.id } : {}),
      name: data.name[0].children?.[0].text,
      subject: data.subject ? JSON.stringify(data.subject) : '',
      ...(data.shortcut ? { shortcut: data.shortcut } : {}),
      content: data.content ? JSON.stringify(data.content) : '',
      segmentationValues: getSegmentationValuesToSendToDB(data.segmentationValues, data.stage),
      visibility: data.visibility,
      type: template?.type ?? TEMPLATE_TYPES.EMAIL,
      format: 'AST',
      mediaFileIds: attachedFiles?.length > 0 ? attachedFiles.map(file => file.id) : [],
    };
    if (!isEditing) {
      saveHelpers(template?.type ?? TEMPLATE_TYPES.EMAIL);
    }
    const res = await saveMessagingTemplate(newMessagingTemplate);
    setIsSubmitting(false);
    if (res === 409) {
      createToast({
        type: 'error',
        message: t('handleTemplate.toasts.nameAlreadyExists'),
      });
    } else {
      createToast({
        type: 'success',
        message: t('handleTemplate.toasts.success'),
      });
      window.dispatchEvent(new CustomEvent('PLAYBOOK_FEED'));
      if (template?.type === TEMPLATE_TYPES.SNIPPET) {
        mutateSnippets();
      }
      contextValues?.onSaveCallback?.();
      handleClose();
    }
  }

  const handleDelete = () => {
    deleteMessagingTemplate(template?.id).then(res => {
      if (res.status === 200) {
        createToast({ type: 'success', message: t('handleTemplate.toasts.deleteSuccess') });
        if (template?.type === TEMPLATE_TYPES.SNIPPET) mutateSnippets();
      } else {
        console.error(res);
      }
      window.dispatchEvent(new CustomEvent('PLAYBOOK_FEED'));
      contextValues?.onDeleteCallback?.();
    });
  };

  const handleConfirm = () => {
    switch (openConfirmModalMode) {
      case 'Save':
        handleSubmit(
          data => onSubmit(data),
          err => console.log('error', err),
        )();
        break;
      case 'Discard':
        handleClose();
        break;
      case 'Delete':
        handleClose();
        handleDelete();
    }
    setOpenConfirmModalMode('');
  };

  const handleCloseModal = () => {
    if (isDirty) {
      setOpenConfirmModalMode('Discard');
    } else {
      handleClose();
    }
  };

  return (
    <Modal open={true} onClose={handleCloseModal} width={1106}>
      <div
        className={styles.modal_email_container}
        onMouseEnter={removeScrollOfBox}
        onMouseLeave={recoverScrollOfBox}
      >
        <div className={styles.container_email}>
          <div className={styles._header__container}>
            <div className={styles._header__info}>
              <div className={styles._header_companyName}>
                <IconButton name={modalInfo?.icon} size={24} color="purple" />
                <Text size="m" weight="regular" color="purple">
                  {isEditing ? t('templateForm.edit') : t('templateForm.create')}{' '}
                  {t(modalInfo?.key)?.toLowerCase()}
                </Text>
              </div>
            </div>
            <div className={styles._header_icons}>
              <IconButton name="cross" size={24} onClick={handleCloseModal} color="purple" />
            </div>
          </div>
          <div className={styles._modal_body_container}>
            {/*// @ts-ignore*/}
            <FormProvider {...formMethods}>
              <div className={styles._form_container}>
                <TemplateModalForm template={template} uploadAttachedFile={uploadAttachedFile} />
                <div className={styles._footer}>
                  <HandleTemplateModalFooter
                    attachedFiles={attachedFiles}
                    removeAttachedFile={removeAttachedFile}
                    attachedLinks={attachedLinks}
                    removeAttachedLink={removeAttachedLink}
                    isSubmitting={isSubmitting}
                    isEditing={isEditing}
                    openConfirmationModal={action => {
                      if (isDirty || action === 'Delete') {
                        setOpenConfirmModalMode(action);
                      } else {
                        handleClose();
                      }
                    }}
                  />
                </div>
              </div>
              <div className={styles._annex_wrapper}>
                {isEditing && (
                  <>
                    <Text size="m" weight="bold">
                      {t('templateForm.templateInformation')}
                    </Text>
                    <TemplateInformation template={template} />
                  </>
                )}
                <Text size="m" weight="bold">
                  {t('segmentationFilter.segmentation')}
                </Text>
                <SegmentationForm canBeBattlecard={modalInfo?.hasBattleCard} />
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
      <PlaybookConfirmationModal
        openMode={openConfirmModalMode}
        onAccept={handleConfirm}
        onClose={() => setOpenConfirmModalMode('')}
        cadencesUsingTemplate={cadencesUsingTemplate}
      />
    </Modal>
  );
};
