import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Sidebar, SidebarItem, SidebarSection } from '@bloobirds-it/flamingo-ui';
import {
  useCadenceV2Enabled,
  useNoStatusOppSetting,
  useWhatsappEnabled,
} from '@bloobirds-it/hooks';
import { APP_PLAYBOOK_CADENCES, UserPermission } from '@bloobirds-it/types';

import {
  APP_PLAYBOOK_BUYER_PERSONAS,
  APP_PLAYBOOK_CADENCES_EDIT,
  APP_PLAYBOOK_CUSTOM_TASKS,
  APP_PLAYBOOK_MESSAGING_EMAIL,
  APP_PLAYBOOK_MESSAGING_EMAIL_FORM,
  APP_PLAYBOOK_MESSAGING_LINKEDIN,
  APP_PLAYBOOK_MESSAGING_LINKEDIN_FORM,
  APP_PLAYBOOK_MESSAGING_PITCH,
  APP_PLAYBOOK_MESSAGING_PITCH_FORM,
  APP_PLAYBOOK_MESSAGING_QQ,
  APP_PLAYBOOK_MESSAGING_QQ_FORM,
  APP_PLAYBOOK_MESSAGING_QQ_SCORES,
  APP_PLAYBOOK_MESSAGING_SEGMENTATION,
  APP_PLAYBOOK_MESSAGING_SNIPPET,
  APP_PLAYBOOK_MESSAGING_SNIPPET_FORM,
  APP_PLAYBOOK_MESSAGING_WORKFLOWS,
  APP_PLAYBOOK_PRODUCTS,
  APP_PLAYBOOK_PRODUCTS_CATEGORIES,
  APP_PLAYBOOK_SALES_PIPELINE,
  APP_PLAYBOOK_SCENARIOS,
  APP_PLAYBOOK_TARGET_MARKET,
  APP_PLAYBOOK_MESSAGING_WHATSAPP,
  APP_PLAYBOOK_MESSAGING_WHATSAPP_FORM,
} from '../../../app/_constants/routes';
import { useUserSettings } from '../../../components/userPermissions/hooks';
import { useRouter } from '../../../hooks';
import {
  useFullSalesEnabled,
  useNewCadenceTableEnabled,
  useSnippetsEnabled,
} from '../../../hooks/useFeatureFlags';
import { useSidebar } from '../../../hooks/useSidebar';
import SessionManagerFactory from '../../../misc/session';

export const PAGES_ROUTES = {
  TARGET_MARKETS: APP_PLAYBOOK_TARGET_MARKET,
  BUYER_PERSONAS: APP_PLAYBOOK_BUYER_PERSONAS,
  SCENARIOS: APP_PLAYBOOK_SCENARIOS,
  CADENCES: APP_PLAYBOOK_CADENCES,
  CUSTOM_TASKS: APP_PLAYBOOK_CUSTOM_TASKS,
  CADENCES_EDIT: APP_PLAYBOOK_CADENCES_EDIT,
  MESSAGING_SEGMENTATION: APP_PLAYBOOK_MESSAGING_SEGMENTATION,
  SNIPPETS: APP_PLAYBOOK_MESSAGING_SNIPPET,
  SNIPPETS_FORM: APP_PLAYBOOK_MESSAGING_SNIPPET_FORM,
  PITCHES: APP_PLAYBOOK_MESSAGING_PITCH,
  PITCHES_FORM: APP_PLAYBOOK_MESSAGING_PITCH_FORM,
  EMAIL: APP_PLAYBOOK_MESSAGING_EMAIL,
  EMAIL_FORM: APP_PLAYBOOK_MESSAGING_EMAIL_FORM,
  LINKEDIN: APP_PLAYBOOK_MESSAGING_LINKEDIN,
  LINKEDIN_FORM: APP_PLAYBOOK_MESSAGING_LINKEDIN_FORM,
  WHATSAPP: APP_PLAYBOOK_MESSAGING_WHATSAPP,
  WHATSAPP_FORM: APP_PLAYBOOK_MESSAGING_WHATSAPP_FORM,
  QQ: APP_PLAYBOOK_MESSAGING_QQ,
  QQ_FORM: APP_PLAYBOOK_MESSAGING_QQ_FORM,
  QQ_SCORES: APP_PLAYBOOK_MESSAGING_QQ_SCORES,
  AUTOMATIONS_WORKFLOWS: APP_PLAYBOOK_MESSAGING_WORKFLOWS,
  PRODUCTS: APP_PLAYBOOK_PRODUCTS,
  PRODUCTS_CATEGORIES: APP_PLAYBOOK_PRODUCTS_CATEGORIES,
  SALES_PIPELINE: APP_PLAYBOOK_SALES_PIPELINE,
};

const PlaybookSidebar = () => {
  const {
    account,
    user: { permissions },
  } = useUserSettings();
  const { history, pathname } = useRouter();
  const [currentPage, setCurrentPage] = useState(pathname || PAGES_ROUTES.CADENCES);
  const roleManager = SessionManagerFactory().getRoleManager();
  const { isCollapsed, toggle, collapse } = useSidebar();
  const hasSalesEnabled = useFullSalesEnabled();
  const isNoStatusOppSetting = useNoStatusOppSetting();
  const hasSnippetsEnabled = useSnippetsEnabled();
  const cadenceV2Enabled = useCadenceV2Enabled(account?.id);
  const canViewCadences = permissions.includes(UserPermission.VIEW_CADENCES);
  const canCreateCustomTasks = permissions.includes(UserPermission.CUSTOM_TASK);
  const canViewCustomTasks = canCreateCustomTasks && useNewCadenceTableEnabled();
  const hasWhatsappEnabled = useWhatsappEnabled(account?.id);
  const { t } = useTranslation();
  useEffect(() => {
    setCurrentPage(pathname);
    if (pathname === PAGES_ROUTES.CADENCES_EDIT) {
      collapse();
    }
  }, [pathname]);

  const handleClick = (to: string) => {
    setCurrentPage(to);
    history.push(to);
  };

  return (
    <Sidebar color="purple" title="My Playbook" onCollapseChange={toggle} collapsed={isCollapsed}>
      {(roleManager.isAccountAdmin() || canViewCadences) && (
        <>
          <SidebarSection title="Playbook Set-Up" color="lightPurple">
            {roleManager.isAccountAdmin() && (
              <>
                <SidebarItem
                  color="purple"
                  icon="company"
                  onClick={() => handleClick(PAGES_ROUTES.TARGET_MARKETS)}
                  selected={currentPage === PAGES_ROUTES.TARGET_MARKETS}
                >
                  {t('common.targetMarket_other')}
                </SidebarItem>
                <SidebarItem
                  color="purple"
                  icon="people"
                  onClick={() => handleClick(PAGES_ROUTES.BUYER_PERSONAS)}
                  selected={currentPage === PAGES_ROUTES.BUYER_PERSONAS}
                >
                  {t('common.buyerPersona_other')}
                </SidebarItem>
                <SidebarItem
                  color="purple"
                  icon="compass"
                  onClick={() => handleClick(PAGES_ROUTES.SCENARIOS)}
                  selected={currentPage === PAGES_ROUTES.SCENARIOS}
                >
                  {t('common.scenario_other')}
                </SidebarItem>
              </>
            )}
            {canViewCadences && !cadenceV2Enabled && (
              <SidebarItem
                color="purple"
                icon="cadence"
                onClick={() => handleClick(PAGES_ROUTES.CADENCES)}
                selected={currentPage === PAGES_ROUTES.CADENCES}
              >
                {t('common.cadence')}
              </SidebarItem>
            )}
            {canViewCustomTasks && (
              <SidebarItem
                color="purple"
                icon="taskAction"
                onClick={() => handleClick(PAGES_ROUTES.CUSTOM_TASKS)}
                selected={currentPage === PAGES_ROUTES.CUSTOM_TASKS}
                dataTest="custom-tasks-sidebar-item"
              >
                {t('common.customTask_other')}
              </SidebarItem>
            )}

            {roleManager.isAccountAdmin() && (
              <>
                <SidebarItem
                  color="purple"
                  icon="sliders"
                  onClick={() => handleClick(PAGES_ROUTES.MESSAGING_SEGMENTATION)}
                  selected={currentPage === PAGES_ROUTES.MESSAGING_SEGMENTATION}
                >
                  {t('common.messagingSegmentation')}
                </SidebarItem>
                <SidebarItem
                  color="purple"
                  icon="zap"
                  onClick={() => handleClick(PAGES_ROUTES.AUTOMATIONS_WORKFLOWS)}
                  selected={currentPage === PAGES_ROUTES.AUTOMATIONS_WORKFLOWS}
                >
                  {t('common.automation_other')}
                </SidebarItem>
                {hasSalesEnabled && !isNoStatusOppSetting && (
                  <SidebarItem
                    icon="fileOpportunity"
                    color="purple"
                    onClick={() => handleClick(PAGES_ROUTES.SALES_PIPELINE)}
                    selected={currentPage === PAGES_ROUTES.SALES_PIPELINE}
                  >
                    {t('common.salesPipeline')}
                  </SidebarItem>
                )}
              </>
            )}
          </SidebarSection>
        </>
      )}
      <SidebarSection title="Messaging" color="lightPurple">
        {hasSnippetsEnabled && (
          <SidebarItem
            color="purple"
            icon="snippet"
            onClick={() => handleClick(PAGES_ROUTES.SNIPPETS)}
            selected={[PAGES_ROUTES.SNIPPETS, PAGES_ROUTES.SNIPPETS_FORM].includes(currentPage)}
          >
            {t('common.snippet_other')}
          </SidebarItem>
        )}
        <SidebarItem
          color="purple"
          icon="alignLeft"
          onClick={() => handleClick(PAGES_ROUTES.PITCHES)}
          selected={[PAGES_ROUTES.PITCHES, PAGES_ROUTES.PITCHES_FORM].includes(currentPage)}
        >
          {hasSnippetsEnabled ? t('common.pitch_other') : t('playbook.pitchesAndSnippets')}
        </SidebarItem>
        <SidebarItem
          color="purple"
          icon="mail"
          onClick={() => handleClick(PAGES_ROUTES.EMAIL)}
          selected={[PAGES_ROUTES.EMAIL, PAGES_ROUTES.EMAIL_FORM].includes(currentPage)}
        >
          {t('common.emailTemplate', { count: 2 })}
        </SidebarItem>
        <SidebarItem
          color="purple"
          icon="linkedin"
          onClick={() => handleClick(PAGES_ROUTES.LINKEDIN)}
          selected={[PAGES_ROUTES.LINKEDIN, PAGES_ROUTES.LINKEDIN_FORM].includes(currentPage)}
        >
          {t('common.linkedInTemplate_other')}
        </SidebarItem>
        {hasWhatsappEnabled && (
          <SidebarItem
            color="purple"
            icon="whatsapp"
            onClick={() => handleClick(PAGES_ROUTES.WHATSAPP)}
            selected={[PAGES_ROUTES.WHATSAPP, PAGES_ROUTES.WHATSAPP_FORM].includes(currentPage)}
          >
            {t('common.whatsappTemplate_other')}
          </SidebarItem>
        )}
        <SidebarItem
          color="purple"
          icon="chatSupport"
          onClick={() => handleClick(PAGES_ROUTES.QQ)}
          selected={[PAGES_ROUTES.QQ, PAGES_ROUTES.QQ_FORM, PAGES_ROUTES.QQ_SCORES].includes(
            currentPage,
          )}
        >
          {t('common.qualifyingQuestion_other')}
        </SidebarItem>
      </SidebarSection>
      {hasSalesEnabled && roleManager.isAccountAdmin() && (
        <SidebarSection title="Products Book" color="lightPurple">
          <SidebarItem
            color="purple"
            icon="assignBoard"
            onClick={() => handleClick(PAGES_ROUTES.PRODUCTS)}
            selected={currentPage === PAGES_ROUTES.PRODUCTS}
          >
            {t('common.product_other')}
          </SidebarItem>
          <SidebarItem
            color="purple"
            icon="tag"
            onClick={() => handleClick(PAGES_ROUTES.PRODUCTS_CATEGORIES)}
            selected={currentPage === PAGES_ROUTES.PRODUCTS_CATEGORIES}
          >
            {t('common.category_other')}
          </SidebarItem>
        </SidebarSection>
      )}
    </Sidebar>
  );
};

export default PlaybookSidebar;
