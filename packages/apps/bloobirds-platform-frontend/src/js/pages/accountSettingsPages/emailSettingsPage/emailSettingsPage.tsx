import React from 'react';
import NoPermissionsPage from '../../noPermissionsPage';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import EmailSettingsForm from './emailSettingsForm/emailSettingsForm';

const EmailSettingsPage = ({tab}: {tab: string}) => {
  const isAccountAdmin = useIsAccountAdmin();

  if (!isAccountAdmin) {
    return <NoPermissionsPage />;
  }

  return <EmailSettingsForm tab={tab} />;
};

export default EmailSettingsPage;
