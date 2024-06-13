import React from 'react';
import { useTranslation } from 'react-i18next';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, UserHelperTooltipsKeys } from '@bloobirds-it/types';

import homeFiltersTooltip from '../../../assets/tooltipImages/homeFiltersTooltip.png';
import { useQuickStartEnabled } from '../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import styles from './meetingForm.modules.css';

export const HomeFiltersTooltip = ({
  defaultTooltipVisible,
  handlerRef,
}: {
  defaultTooltipVisible: boolean;
  handlerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { save, has } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const { t } = useTranslation();
  return (
    <span className={styles._home_filters_tooltip}>
      {hasQSGEnabled && !has(UserHelperTooltipsKeys.SHOW_QSG_FILTER) && (
        <DiscoveryTooltip
          title={t('home.centerContent.homeFiltersTooltip.discovery')}
          isPersistent
          visible={defaultTooltipVisible}
          anchor={<div />}
          position="right-start"
          height="260px"
        >
          <DiscoveryTooltip.TooltipImage className={styles._home_filters_image}>
            <img src={homeFiltersTooltip} width={230} alt={'calendar'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter
            description={t('home.centerContent.homeFiltersTooltip.footer')}
          >
            <div ref={handlerRef}>
              <DiscoveryTooltip.TooltipButton
                isMainButton
                onClick={() => {
                  save(UserHelperKeys.ENABLE_KPI_METRICS);
                  save(UserHelperTooltipsKeys.SHOW_QSG_FILTER);
                }}
              >
                {t('common.ok')}
              </DiscoveryTooltip.TooltipButton>
            </div>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      )}
    </span>
  );
};
