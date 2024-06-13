import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactShadowRoot from 'react-shadow-root';

import {
  Button,
  CircularBadge,
  createToast,
  Dropdown,
  Icon,
  Label,
  Spinner,
  Text,
  Tooltip,
  useHover,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useMessagingTemplate, useUserSearch } from '@bloobirds-it/hooks';
import { EditableTemplateType, MessagingTemplate, TEMPLATE_TYPES } from '@bloobirds-it/types';
import clsx from 'clsx';

import { useIsTemplateOwner } from '../../hooks/useIsTemplateOwner';
import resetSalesforceStyles from '../../utils/resetSalesforceCSSs.module.css';
import { TemplateInformation } from '../handleTemplate/components/templateFormHeader';
import { PlaybookConfirmationModal } from '../playbookConfirmationModal/playbookConfirmationModal';
import Metric from './metric/metric';
import styles from './templateDetail.module.css';

const TemplateHeader = ({
  name,
  isBattlecard,
  isOfficial,
  visibility,
  createdBy,
  type,
  cadenceUsages,
  templateStatistics,
  ...template
}: MessagingTemplate) => {
  const { users } = useUserSearch() || {};
  const author = users?.find(user => user.id === createdBy);
  const isEmail = type === TEMPLATE_TYPES.EMAIL;
  const [anchorRef, isHovering] = useHover();
  const { ref, visible: infoVisible, setVisible: setInfoVisible } = useVisible(false, anchorRef);
  const { t } = useTranslation('translation', { keyPrefix: 'extendedScreen.templateDetail' });

  useEffect(() => {
    setInfoVisible(isHovering);
  }, [isHovering]);

  return (
    <div className={styles.header}>
      <Text size="m" weight="bold">
        {name}
      </Text>
      <div className={styles.headerIcons}>
        {isEmail && cadenceUsages > 0 && (
          <Label
            size="small"
            color="verySoftPurple"
            textColor="purple"
            uppercase={false}
            overrideStyle={{ maxWidth: '142px', letterSpacing: 0.5 }}
          >
            {t('usedInXCadences', { count: cadenceUsages || 0 })}
          </Label>
        )}
        {visibility && (
          <Label
            size="small"
            color="verySoftPurple"
            textColor="purple"
            uppercase={false}
            overrideStyle={{ maxWidth: '77px' }}
          >
            <span className={styles.visibilityLabel}>
              <Icon name={visibility === 'PUBLIC' ? 'unlock' : 'lock'} color="purple" size={16} />
              {visibility === 'PUBLIC' ? t('public') : t('private')}
            </span>
          </Label>
        )}
        {isBattlecard && (
          <Tooltip title={t('battleCard')} position="top">
            <Icon name="battlecards" color="purple" />
          </Tooltip>
        )}
        {isOfficial && (
          <Tooltip title={t('official')} position="top">
            <Icon name="bookmark" color="purple" />
          </Tooltip>
        )}
        {template?.format === 'HTML' && (
          <Tooltip title={t('html')} position="top">
            <Icon name="coding" color="purple" />
          </Tooltip>
        )}
        <Dropdown
          anchor={
            <div ref={anchorRef} className={styles.dropdownAnchorWrapper}>
              <Icon name="infoFilled" color="darkBloobirds" size={20} />
            </div>
          }
          visible={infoVisible}
          ref={ref}
          zIndex={20001}
        >
          <div className={styles.dropdownWrapper}>
            <TemplateInformation
              template={{
                createdBy,
                ...template,
              }}
            />
          </div>
        </Dropdown>
        {author && (
          <div className={styles._assigned_to}>
            <Tooltip title={`${t('author')}: ${author?.name}`} position="top">
              <CircularBadge
                size="s"
                color="lightPeanut"
                style={{ color: 'var(--white)', fontSize: '9px' }}
                backgroundColor={author?.color || 'lightPeanut'}
              >
                {author?.shortname || 'U'}
              </CircularBadge>
            </Tooltip>
          </div>
        )}
        {!!template?.taskTitle && (
          <div className={styles.step_banner}>
            <Tooltip title={template?.taskTitle} position="top">
              <Label
                size={'small'}
                uppercase={false}
                color={'verySoftTangerine'}
                textColor="tangerine"
                overrideStyle={{
                  height: '22px',
                  display: 'flex',
                  padding: '4px',
                }}
              >
                {template.taskTitle}
              </Label>
            </Tooltip>
          </div>
        )}
      </div>
      {isEmail && templateStatistics && Object.keys(templateStatistics).length !== 0 && (
        <div className={styles.statistics}>
          <Metric name="USED_COUNT" value={templateStatistics.USED_COUNT} />
          <Metric name="OPENED_RATE" value={templateStatistics.OPENED_RATE} />
          <Metric name="CLICKED_RATE" value={templateStatistics.CLICKED_RATE} />
          <Metric name="REPLIED_RATE" value={templateStatistics.REPLIED_RATE} />
        </div>
      )}
    </div>
  );
};

export interface TemplateDetailProps {
  template: EditableTemplateType;
  extended: boolean;
  dialerButtons?: React.ReactNode;
  backButtonAction: () => void;
  insertButtonAction?: (template: MessagingTemplate) => void;
  replaceButtonAction?: (template: MessagingTemplate) => void;
  setSelectedTemplate?: (template: EditableTemplateType) => void;
  onlyReadable?: boolean;
}

export const TemplateDetail = ({
  template,
  extended,
  backButtonAction,
  dialerButtons,
  insertButtonAction = () => {},
  replaceButtonAction = () => {},
  setSelectedTemplate,
  onlyReadable = false,
}: TemplateDetailProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef();
  const isSnippet = template.type === TEMPLATE_TYPES.SNIPPET;

  const { deleteMessagingTemplate } = useMessagingTemplate(template?.id);

  const isOwner = useIsTemplateOwner(template);

  const handleDelete = () => {
    deleteMessagingTemplate(template?.id).then(res => {
      // @ts-ignore
      if (res.error) {
        console.error(res);
      } else {
        createToast({ type: 'success', message: 'Template deleted successfully' });
      }
      setIsModalOpen(false);
      backButtonAction();
      window.dispatchEvent(new CustomEvent('PLAYBOOK_FEED'));
    });
  };

  const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.playbookTab.header' });

  return (
    <div className={styles.container}>
      {!template ? (
        <div className={styles.loading}>
          <Spinner name="loadingCircle" />
        </div>
      ) : (
        <>
          {extended && (
            <div
              className={clsx({
                [styles.buttons]: !dialerButtons,
                [styles.dialerButtons]: !!dialerButtons,
              })}
            >
              <Button
                iconLeft="arrowLeft"
                size="small"
                color="purple"
                onClick={backButtonAction as (e: React.MouseEvent<HTMLElement, MouseEvent>) => void}
                variant="clear"
                uppercase={false}
              >
                {t('back')}
              </Button>
              {!dialerButtons ? (
                <div className={styles.buttons_right}>
                  {!onlyReadable && (
                    <>
                      <Tooltip
                        title={isOwner ? t('deleteTemplate') : t('userCantEdit')}
                        position="top"
                      >
                        <Button
                          iconLeft="trashFull"
                          size="small"
                          color={isOwner ? 'tomato' : 'softPeanut'}
                          variant="secondary"
                          onClick={() => setIsModalOpen(true)}
                          disabled={!isOwner}
                        />
                      </Tooltip>
                      <Tooltip
                        title={isOwner ? t('editTemplate') : t('userCantEdit')}
                        position="top"
                      >
                        {template?.format === 'AST' && (
                          <Button
                            iconLeft="edit"
                            size="small"
                            color={isOwner ? 'purple' : 'softPeanut'}
                            variant="secondary"
                            onClick={() => setSelectedTemplate({ ...template, edit: true })}
                            disabled={!isOwner}
                          />
                        )}
                      </Tooltip>
                      {!isSnippet && template?.format !== 'HTML' && (
                        <Tooltip title={t('insertTemplate')} position="top">
                          <Button
                            iconLeft="fileInsert"
                            size="small"
                            color="purple"
                            variant="secondary"
                            onClick={() => insertButtonAction(template)}
                          />
                        </Tooltip>
                      )}
                    </>
                  )}
                  <Button
                    iconLeft={isSnippet ? 'fileInsert' : 'sendEmailInvitation'}
                    size="small"
                    color="purple"
                    onClick={() =>
                      isSnippet ? insertButtonAction(template) : replaceButtonAction(template)
                    }
                    variant="primary"
                    uppercase={false}
                  >
                    {isSnippet ? t('insert') : t('use')}
                  </Button>
                </div>
              ) : (
                <div className={styles.buttons_right}>{dialerButtons}</div>
              )}
            </div>
          )}
          <div className={styles.contentGeneralWrapper}>
            <TemplateHeader {...template} />
            <div>
              <ReactShadowRoot>
                <div
                  ref={ref}
                  className={clsx(styles.templateBody, resetSalesforceStyles.salesforceReset)}
                  style={{ overflow: 'auto' }}
                  dangerouslySetInnerHTML={{
                    __html:
                      template?.format === 'HTML' ? template?.content : template?.previewContent,
                  }}
                />
              </ReactShadowRoot>
            </div>
          </div>
          <PlaybookConfirmationModal
            openMode={isModalOpen && 'Delete'}
            templateId={template?.id}
            onClose={() => setIsModalOpen(false)}
            onAccept={handleDelete}
          />
        </>
      )}
    </div>
  );
};
