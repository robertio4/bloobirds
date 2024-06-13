import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

import { APP_TASKS_PROSPECTING } from '../../../app/_constants/routes';
import { useRouter } from '../../../hooks';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './prospectingTooltips.module.css';

export const OnCadenceTooltip = () => {
  const { history } = useRouter();
  const { save, has } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const isTour = !useHasQueryParam('fromGuide');

  const shouldBeShown =
    has(UserHelperTooltipsKeys.START_TO_FINISH) &&
    has(UserHelperTooltipsKeys.COMPANIES_AND_LEADS_TOOLTIP) &&
    hasQSGEnabled &&
    !has(UserHelperTooltipsKeys.ON_CADENCE_DISCOVERY_TOOLTIP) &&
    isTour;

  function handleClick() {
    history.push(`${APP_TASKS_PROSPECTING}/onCadence?tour=true`);
    save(UserHelperTooltipsKeys.ON_CADENCE_DISCOVERY_TOOLTIP);
  }

  return (
    <span onClick={handleClick} className={styles._on_cadence_tooltip}>
      {shouldBeShown && <DiscoveryTooltip.DiscoveryDefaultAnchor />}
    </span>
  );
};
