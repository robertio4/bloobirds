import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon, Spinner, Tooltip, useVisible } from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserId,
  useActiveUserSettings,
  useDataModel,
  useSuggestedTemplates,
} from '@bloobirds-it/hooks';
import { HandleTemplateModal } from '@bloobirds-it/playbook/src';
import {
  BobjectId,
  Environment,
  PlaybookTab,
  PluralBobjectTypes,
  UserPermission,
  UserRole,
} from '@bloobirds-it/types';
import {
  api,
  insertTextWhatsApp,
  handleAddWhatsAppTemplate,
  forgeIdFieldsFromIdValue,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import { RecoilRoot } from 'recoil';
import useSWR, { SWRConfig } from 'swr';

import { useActiveMessagingNameFilter } from '../../../hooks/useMessagingTemplates';
import { TemplateSelector } from './templateSelector';
import styles from './templatesSelector.module.css';

export function getLeadById(bobjectIdFields) {
  const { data: lead, isLoading } = useSWR(
    `/linkedin/leads/${bobjectIdFields.objectId}`,
    async () =>
      api
        .get(
          `/linkedin/${PluralBobjectTypes[bobjectIdFields?.typeName]?.toLowerCase()}/${
            bobjectIdFields?.objectId
          }`,
        )
        .then(response => response.data),
  );

  return { lead, isLoading };
}

const WhatsappTemplateSelectorContent = ({ leadId }: { leadId: BobjectId['value'] }) => {
  const userId = useActiveUserId();
  const dataModel = useDataModel();
  const { settings } = useActiveUserSettings();
  const { visible, setVisible, ref } = useVisible(false);
  const { t, ready } = useTranslation('translation', { keyPrefix: 'templateSelector' });

  const [, setMessagingTemplateName] = useActiveMessagingNameFilter();
  const [editModal, setEditModal] = useState({ template: null, open: false });

  const bobjectIdObject: BobjectId = forgeIdFieldsFromIdValue(leadId);
  const { lead, isLoading } = getLeadById(bobjectIdObject);
  const stage = dataModel?.findValueById(lead?.stage);

  useEffect(() => {
    setMessagingTemplateName(null);
  }, []);

  const userName = settings?.user?.name;
  const userRoles = settings?.user?.roles;
  const userPermissions = settings?.user?.permissions;
  const isAdminUser =
    userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const hasEditAllPermissions = userPermissions?.includes(UserPermission.EDIT_ALL);

  const actionsDisabled =
    !isAdminUser && !hasEditAllPermissions && (userId !== lead?.assignedTo || !lead?.assignedTo);

  const suggestedTemplates = useSuggestedTemplates(lead, undefined, PlaybookTab.WHATSAPP);

  // Fill text if only one suggested template
  useEffect(() => {
    if (suggestedTemplates?.length === 1) {
      handleAdd({
        id: suggestedTemplates[0].id,
        fallbackContent: suggestedTemplates[0].previewContent,
        closeDropdown: false,
      });
    }

    if (suggestedTemplates?.length === 0) {
      // Delete animation class
      const badge = document.getElementById('badgeGroup');
      if (badge) {
        const classBadge = badge.classList;
        const classRunAnimation = Array.from(classBadge).find(className =>
          className.includes('wsRunAnimation'),
        );
        if (classRunAnimation) badge.classList.remove(classRunAnimation);
      }
    }
  }, [suggestedTemplates?.length]);

  const handleAdd = ({
    id,
    fallbackContent,
    closeDropdown = true,
  }: {
    id: string;
    fallbackContent: any;
    closeDropdown?: boolean;
  }) =>
    handleAddWhatsAppTemplate(
      id,
      fallbackContent,
      lead,
      userName,
      () => closeDropdown && setVisible(false),
    ).then(data => {
      if (data) {
        const openNewPage = true;
        insertTextWhatsApp(
          openNewPage,
          '#main .copyable-area [contenteditable="true"][role="textbox"]',
          //@ts-ignore
          lead.phoneNumbers?.[0],
          data,
        );
        setVisible(false);
      }
    });

  const classnames = clsx(styles.whatsAppContainer, {
    [styles.whatsAppContainerDisabled]: actionsDisabled,
    [styles.wsRunAnimation]: suggestedTemplates?.length > 0,
  });

  const whatsappData = {
    phoneNumber: lead?.phoneNumbers?.[0],
    isSameActiveLead: true,
    userName: settings?.user?.name,
    lead,
  };

  useEffect(() => {
    if (editModal?.open) setVisible(false);
  }, [editModal?.open]);

  if (isLoading || !lead) {
    return <Spinner name="loadingCircle" size={18} />;
  }

  return ready ? (
    <div className={styles.templateSelectorDropdown}>
      <Dropdown
        width={424}
        ref={ref}
        visible={visible}
        zIndex={20000}
        style={{ height: 620, padding: 0 }}
        anchor={
          <div
            id="badgeGroup"
            className={classnames}
            onClick={() => !actionsDisabled && setVisible(!visible)}
          >
            {isLoading || !lead ? (
              <Spinner name="loadingCircle" color="softPeanut" size={12} />
            ) : (
              <Tooltip title={actionsDisabled && t('permissions')} position="top">
                {/* @ts-ignore This takes the styles of whatsapp */}
                <Icon name="bBTemplate" color="icon" />
                {suggestedTemplates?.length > 0 && (
                  <div className={styles.badge}>{suggestedTemplates?.length}</div>
                )}
              </Tooltip>
            )}
          </div>
        }
      >
        <div className={styles.templateSelectorWrapper}>
          <TemplateSelector
            environment={Environment.WHATSAPP_TEMPLATE_SELECTOR}
            lead={lead}
            handleAdd={handleAdd}
            setEditModal={setEditModal}
            whatsappData={whatsappData}
            closeDropdown={() => setVisible(false)}
          />
        </div>
      </Dropdown>
      {editModal?.open && (
        <HandleTemplateModal
          template={editModal?.template}
          handleClose={() => {
            setVisible(true);
            setEditModal({ template: null, open: false });
          }}
          contextValues={{
            onSaveCallback: () => {
              setVisible(true);
            },
            onDeleteCallback: () => {
              setVisible(true);
              setEditModal({ template: null, open: false });
            },
            ...(stage ? { stage } : {}),
          }}
        />
      )}
    </div>
  ) : (
    <></>
  );
};

export const WhatsappTemplateSelector = ({ leadId }: { leadId: BobjectId['value'] }) => {
  if (!leadId) {
    return null;
  }

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      <RecoilRoot key="bb-whatsapp-template-selector">
        <Suspense fallback={<Spinner name="loadingCircle" size={18} />}>
          <WhatsappTemplateSelectorContent leadId={leadId} />
        </Suspense>
      </RecoilRoot>
    </SWRConfig>
  );
};
