import React, { useEffect } from 'react';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconButton, IconType, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { MyEditor } from '@bloobirds-it/rich-text-editor';
import { ExtensionHelperKeys, SmartEmailTab } from '@bloobirds-it/types';
import clsx from 'clsx';

import { useSmartEmailModal } from '../smartEmailModal';
import { GeneralSEETooltip } from './components/tooltips/generalTooltip/generalSEETooltip';
import { SmartEmailHelperLayout } from './pages/smartEmailHelperTabs';
import { emailHelperTabs } from './smartEmailHelper.constants';
import styles from './smartEmailHelper.module.css';

export interface SmartEmailHelperProps {
  hasAttachments: boolean;
  hasLinks: boolean;
  setOpenPreview: (open: boolean) => void;
  control: Control<any>;
  bodyEditor: MyEditor;
  error: boolean;
  format: string;
  htmlContent: string;
}

const SmartEmailHelper = (props: SmartEmailHelperProps) => {
  const {
    hasAttachments,
    hasLinks,
    setOpenPreview,
    control,
    bodyEditor,
    error,
    format,
    htmlContent,
  } = props;
  const {
    selectedTab,
    setSelectedTab,
    tooltipVisible,
    slotsData: { calendarSlotsVisible },
    hasTimeSlotsEnabled,
  } = useSmartEmailModal();
  const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.tabs' });
  const emailHelperTabsTmp = emailHelperTabs();
  const { saveCustom, has } = useUserHelpers();
  const hasBeenSaved = has(ExtensionHelperKeys.SEE_GENERAL_TOOLTIP);
  const hasSeenInfoBanner = has(ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER);
  const handleSwitchTab = (tab: SmartEmailTab) => {
    if (
      selectedTab === SmartEmailTab.CLOSED_DEALS &&
      tab !== SmartEmailTab.CLOSED_DEALS &&
      !hasSeenInfoBanner
    )
      saveCustom({
        key: ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER,
        data: 'Initial step viewed',
      });
    setSelectedTab(tab);
  };

  useEffect(() => {
    setOpenPreview(selectedTab === SmartEmailTab.PREVIEW);
  }, [selectedTab]);

  return (
    <div
      className={clsx(styles._container, {
        [styles._container_with_attachments]: hasAttachments,
        [styles._container_with_links]: hasLinks,
        [styles._container_with_links_and_attachments]: hasAttachments && hasLinks,
      })}
    >
      <SmartEmailHelperLayout
        tab={selectedTab}
        tabProps={{
          control: control,
          bodyEditor: bodyEditor,
          error: error,
          hasAttachments: hasAttachments,
          format: format,
          htmlContent: htmlContent,
        }}
      />
      {(!calendarSlotsVisible || !hasTimeSlotsEnabled) && (
        <div className={styles._tab_navigator}>
          <GeneralSEETooltip visible={tooltipVisible} hasBeenSaved={hasBeenSaved} />
          <div className={styles._tab_navigator_menu}>
            {Object.keys(emailHelperTabsTmp).map((tab: SmartEmailTab, idx) => {
              return (
                emailHelperTabsTmp[tab]?.visible && (
                  <Tooltip key={tab} title={t(emailHelperTabsTmp[tab].key)} position="top">
                    <div
                      key={emailHelperTabsTmp[tab].icon + '-' + idx}
                      className={clsx(styles._tab_navigator_menu_item, {
                        [styles._tab_navigator_menu_item_selected]: tab === selectedTab,
                      })}
                    >
                      <IconButton
                        size={32}
                        dataTest={`SEE-TabNav-${emailHelperTabsTmp[tab].dataTest}`}
                        key={emailHelperTabsTmp[tab].dataTest}
                        name={emailHelperTabsTmp[tab].icon as IconType}
                        color={tab === selectedTab ? 'bloobirds' : 'verySoftBloobirds'}
                        onClick={() => {
                          handleSwitchTab(tab);
                        }}
                      />
                    </div>
                  </Tooltip>
                )
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartEmailHelper;
