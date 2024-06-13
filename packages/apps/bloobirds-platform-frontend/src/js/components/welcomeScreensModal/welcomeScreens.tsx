import React, { useState } from 'react';

import {
  useActiveAccountSettings,
  useIsOTOAccount,
  usePreventWindowUnload,
} from '@bloobirds-it/hooks';
import { UserHelperKeys } from '@bloobirds-it/types';

import { useIsAccountAdmin } from '../../hooks/usePermissions';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import { AdminWelcomeScreens } from './welcomeScreens/adminWelcomeScreens';
import { OTOWelcomeScreens } from './welcomeScreens/otoWelcomeScreens';
import { UserWelcomeScreens } from './welcomeScreens/userWelcomeScreens';

export const WelcomeScreens = () => {
  const [openModal, setOpenModal] = useState(true);
  const isAdmin = useIsAccountAdmin();
  const { save } = useUserHelpers();
  const { isLoading } = useActiveAccountSettings();
  const isOTO = useIsOTOAccount();

  usePreventWindowUnload(openModal);

  const handleFinish = () => {
    setOpenModal(false);
    save(UserHelperKeys.COMPLETE_WELCOME_SCREEN);
  };

  if (isLoading) return null;
  const WelcomeScreens = (() => {
    if (isOTO) {
      return <OTOWelcomeScreens />;
    } else if (isAdmin) {
      return <AdminWelcomeScreens />;
    } else {
      return <UserWelcomeScreens />;
    }
  })();

  return React.cloneElement(WelcomeScreens, { openModal, handleFinish });
};

export default WelcomeScreens;
