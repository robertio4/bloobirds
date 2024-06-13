import { useTranslation } from 'react-i18next';

import { AssignCadenceDropdown } from '@bloobirds-it/cadence';
import { Icon, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { UserPermission } from '@bloobirds-it/types';
import clsx from 'clsx';
import { TFunction } from 'i18next';

import { useExtensionContext } from '../../../../../context';
import styles from '../../wizardHelper.module.css';

const CadenceButton = ({
  isDisabled,
  isActive,
  sidePeekEnabled,
  onClick,
  t,
}: {
  isDisabled: boolean;
  isActive: boolean;
  sidePeekEnabled: boolean;
  onClick?: () => void;
  t: TFunction;
}) => (
  <div
    className={clsx(styles.cadenceNameWrapper, {
      [styles.cadenceNameDisabled]: isDisabled,
      [styles.cadenceNameActive]: isActive,
      [styles.cadenceNameSmall]: !sidePeekEnabled,
    })}
    onClick={onClick}
  >
    <Icon name={isActive ? 'pause' : 'play'} color={isActive ? 'grape' : 'bloobirds'} size={16} />
    <Text
      size={sidePeekEnabled ? 'xs' : 'xxs'}
      color={isDisabled ? 'lightPeanut' : isActive ? 'white' : 'bloobirds'}
      weight="heavy"
      inline
    >
      {isActive
        ? t('sidePeek.overview.wizardHelper.onCadence')
        : t('sidePeek.overview.wizardHelper.setCadence')}
    </Text>
    <Icon
      dataTest="Cadence-Gear"
      color={isActive ? 'white' : 'softPeanut'}
      name="settings"
      size={12}
    />
  </div>
);

const LoadingTasksDisplay = ({
  sidePeekEnabled,
  t,
}: {
  sidePeekEnabled: boolean;
  t: TFunction;
}) => (
  <div className={clsx(styles.cadenceNameWrapper, styles.loader)}>
    <Text size={sidePeekEnabled ? 'xs' : 'xxs'} color="white" weight="bold">
      {t('sidePeek.overview.wizardHelper.managingTasks')}
    </Text>
    <Spinner size={12} color="white" name="loadingCircle" />
  </div>
);

export const CadenceManagementButton = ({
  isActive,
  toggleCadenceControlVisibility,
  isDisabled,
  isProcessingTasks,
}) => {
  const {
    useGetSettings,
    useGetActiveBobject,
    useGetActiveBobjectContext,
    useGetSidePeekEnabled,
  } = useExtensionContext();
  const { t } = useTranslation();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const settings = useGetSettings();
  const activeBobject = useGetActiveBobject();
  const contactBobjects = useGetActiveBobjectContext();

  const hasPermissions =
    settings?.user?.accountAdmin && settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);

  return (
    <AssignCadenceDropdown
      activeUserId={settings?.user.id}
      contactBobjects={contactBobjects}
      callback={isDisabled ? undefined : toggleCadenceControlVisibility}
      activeBobject={activeBobject}
      actionsDisabled={isDisabled}
      hasPermissions={hasPermissions}
    >
      {isProcessingTasks ? (
        <LoadingTasksDisplay sidePeekEnabled={sidePeekEnabled} t={t} />
      ) : (
        <CadenceButton
          sidePeekEnabled={sidePeekEnabled}
          isActive={isActive}
          isDisabled={isDisabled}
          t={t}
        />
      )}
    </AssignCadenceDropdown>
  );
};
