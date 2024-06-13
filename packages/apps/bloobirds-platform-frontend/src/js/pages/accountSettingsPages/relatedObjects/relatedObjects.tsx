import React from 'react';
import { useTranslation } from 'react-i18next';

import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import NoPermissionsPage from '../../noPermissionsPage';
import { RelatedObjectsTable } from './relatedObjectsTable';

export const RelatedObjects = () => {
  const isAccountAdmin = useIsAccountAdmin();
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.relatedObjects',
  });

  if (!isAccountAdmin) {
    return <NoPermissionsPage />;
  }

  return (
    <AccountSettingsLayout title={t('title')} subtitle={t('subtitle')}>
      <RelatedObjectsTable />
    </AccountSettingsLayout>
  );
};
