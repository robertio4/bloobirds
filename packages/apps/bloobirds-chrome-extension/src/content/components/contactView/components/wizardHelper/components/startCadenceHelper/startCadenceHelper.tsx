import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AssignCadenceDropdown, CadenceControlModal } from '@bloobirds-it/cadence';
import { Button, Icon, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { MIXPANEL_EVENTS, UserPermission } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { useExtensionContext } from '../../../../../context';
import { useContactViewContext } from '../../../../context/contactViewContext';
import styles from '../../wizardHelper.module.css';

export const StartCadenceHelper = ({ bobject, cadenceControlCallback, isLoading, minimized }) => {
  const [open, setOpen] = useState<boolean>();
  const {
    useGetActiveBobject,
    useGetActiveBobjectContext,
    useGetSettings,
    useGetSidePeekEnabled,
  } = useExtensionContext();
  const contactBobjects = useGetActiveBobjectContext();
  const activeBobject = useGetActiveBobject();
  const { actionsDisabled } = useContactViewContext();
  const settings = useGetSettings();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { t } = useTranslation();

  const titleClasses = clsx(styles.startCadence__container, {
    [styles.wizard__title_sidePeek]: sidePeekEnabled,
  });

  const startCadenceTitle = clsx(styles.wizardStartCadenceTitle, {
    [styles.wizardStartCadenceTitleMinimized]: minimized,
  });

  const startCadence = clsx(styles.start_cadence, {
    [styles.start_cadenceMinimized]: minimized,
  });

  const hasPermissions =
    settings?.user?.accountAdmin && settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);

  return (
    <>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Spinner color="white" name="loadingCircle" />
        </div>
      ) : (
        <div className={titleClasses}>
          <Text size="xs" color="white" className={startCadenceTitle} weight="bold">
            {t('sidePeek.overview.wizardHelper.nextStepSuggested')}
          </Text>
          <AssignCadenceDropdown
            activeUserId={settings?.user?.id}
            contactBobjects={contactBobjects}
            callback={() => {
              mixpanel.track(MIXPANEL_EVENTS.CLICK_START_CADENCE_FROM_CONTACT_VIEW_OTO);
              setOpen(true);
            }}
            activeBobject={activeBobject}
            actionsDisabled={actionsDisabled}
            hasPermissions={hasPermissions}
          >
            <Button
              size="medium"
              variant="tertiary"
              expand
              className={startCadence}
              disabled={actionsDisabled}
            >
              {' '}
              <Icon name="play" color="bloobirds" size={12} />
              {t('sidePeek.overview.wizardHelper.startCadence')}
            </Button>
          </AssignCadenceDropdown>
        </div>
      )}
      {open && (
        <CadenceControlModal
          bobject={bobject}
          setIsOpen={setOpen}
          initialStep={{ step: 'CONFIGURE_CADENCE', hadStartedCadence: false }}
          callbackOnSave={cadenceControlCallback}
        />
      )}
    </>
  );
};
