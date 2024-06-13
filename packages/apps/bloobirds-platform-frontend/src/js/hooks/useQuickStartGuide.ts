import { useTranslation } from 'react-i18next';

import { useActiveUserSettings, useCadenceV2Enabled, useIsOTOAccount } from '@bloobirds-it/hooks';
import {
  getAdminQuickStartGuideBlocks,
  getQuickStartGuideBlocks,
  UserPermission,
} from '@bloobirds-it/types';

import { useUserSettings } from '../components/userPermissions/hooks';
import { qsgTourKeys } from '../components/welcomeScreensModal/components/quickStartGuideBlocks/otoConnectionsGuide';
import { useIsAccountAdmin } from './usePermissions';
import { useUserHelpers } from './useUserHelpers';

export const useQuickStartEnabled = () => {
  const { user } = useUserSettings() || { user: {} };

  return !user?.skipQuickStartGuide;
};

export const useQuickStartGuideCompleted = () => {
  const { helpers } = useUserHelpers();
  const isAccountAdmin = useIsAccountAdmin();
  const isOTOAccount = useIsOTOAccount();
  const { settings } = useActiveUserSettings();
  const cadencesV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const { t } = useTranslation();

  const QSGBlocks = isOTOAccount
    ? qsgTourKeys(t)
    : isAccountAdmin
    ? getAdminQuickStartGuideBlocks(hasCadencePermission, cadencesV2Enabled)
    : getQuickStartGuideBlocks(hasCadencePermission, cadencesV2Enabled);
  const QSGGoals = QSGBlocks.flatMap(block =>
    'goals' in block ? block?.goals.map(goal => goal.key) : block?.key,
  );
  if (isOTOAccount) {
    return QSGGoals.filter(goal => helpers && !Object.keys(helpers).includes(goal))?.length === 0;
  } else if (helpers) {
    const remainingGoals = QSGGoals.filter(goal => helpers && !Object.keys(helpers).includes(goal));
    return remainingGoals?.length < 2;
  } else {
    return false;
  }
};

export const useQuickStartGuideCompletedAggregation = () => {
  const { helpers } = useUserHelpers();
  const isAccountAdmin = useIsAccountAdmin();
  const { settings } = useActiveUserSettings();
  const { t } = useTranslation();
  const isOTOAccount = useIsOTOAccount();

  const cadencesV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const QSGBlocks = isOTOAccount
    ? qsgTourKeys(t)
    : isAccountAdmin
    ? getAdminQuickStartGuideBlocks(hasCadencePermission, cadencesV2Enabled)
    : getQuickStartGuideBlocks(hasCadencePermission, cadencesV2Enabled);
  const QSGGoals = QSGBlocks.flatMap(block =>
    'goals' in block ? block?.goals.map(goal => goal.key) : block?.key,
  );
  const completedGoals = QSGGoals.filter(goal => Object.keys(helpers || {}).includes(goal));

  return completedGoals?.length;
};
