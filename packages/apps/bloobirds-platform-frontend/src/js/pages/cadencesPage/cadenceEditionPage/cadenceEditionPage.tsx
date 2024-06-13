import React, { useEffect, useState } from 'react';

import { useCadences, useCadenceSteps } from '@bloobirds-it/cadence';
import { Button } from '@bloobirds-it/flamingo-ui';
import { useCadenceV2Enabled } from '@bloobirds-it/hooks';
import {
  APP_CADENCES_MANAGE,
  APP_PLAYBOOK_CADENCES,
  BobjectTypes,
  UserPermission,
} from '@bloobirds-it/types';

import { useUserSettings } from '../../../components/userPermissions/hooks';
import { useRouter } from '../../../hooks';
import useModalVisibility from '../../../hooks/useModalVisibility';
import { useQueryParam } from '../../../hooks/useQueryParams';
import { useSidebar } from '../../../hooks/useSidebar';
import CadencesLayout from '../../../layouts/cadencesLayout/cadencesLayout';
import SessionManagerFactory from '../../../misc/session';
import NoPermissionsPage from '../../noPermissionsPage';
import {
  CADENCE_EDIT_PERMISSIONS,
  CreateEditCadenceSettings,
} from '../components/createEditCadenceSettings/createEditCadenceSettings';
import { CreateEditStepModal } from '../components/createEditStepModal/createEditStepModal';
import DeleteCadenceStepModal from '../components/deleteCadenceStepModal/deleteCadenceStepModal';
import CadenceEditionContent from './cadenceEditionContent/cadenceEditionContent';
import CadenceEditionHeader from './cadenceEditionHeader/cadenceEditionHeader';
import styles from './cadenceEditionPage.module.css';
import StatisticsBlock from './statisticsBlock/statisticsBlock';

export const CadenceEditionPage = () => {
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fromUrl = useQueryParam('from');
  const id = useQueryParam('cadence', true);
  const bobjectType = useQueryParam('bobjectType', true) as BobjectTypes;
  const SessionManager = SessionManagerFactory();
  const { cadences, refreshCadences } = useCadences({
    bobjectTypeName: bobjectType,
    accountId: SessionManager?.getAccount()?.id,
  });
  const cadence = cadences?.find((cadenceElement: any) => cadenceElement?.id === id);
  const cadenceStatistics = cadence?.statistics;
  const canEditCadence =
    SessionManager.getRoleManager()?.isAccountAdmin() ||
    SessionManager.getUser()?.id === cadence?.ownerId ||
    cadence?.editMode === CADENCE_EDIT_PERMISSIONS.EVERYONE;
  const { history } = useRouter();
  const { steps } = useCadenceSteps(id);
  const { toggle } = useSidebar();
  const { isOpen: isDeleteStepModalOpen, closeModal: onCloseDeleteStepModal } = useModalVisibility(
    'deleteCadenceStep',
  );

  const settings = useUserSettings();
  const accountId = settings?.account?.id;
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const cadenceV2Enabled = useCadenceV2Enabled(accountId);

  const handleBack = () => {
    history.push(fromUrl || (cadenceV2Enabled ? APP_CADENCES_MANAGE : APP_PLAYBOOK_CADENCES), {
      state: bobjectType,
    });
    toggle();
  };

  useEffect(() => {
    refreshCadences();
  }, []);

  if (!hasCadencePermission || !cadenceV2Enabled) {
    return <NoPermissionsPage />;
  }

  return (
    <CadencesLayout>
      <>
        <Button
          className={styles._back__button}
          variant="clear"
          onClick={handleBack}
          color="bloobirds"
          iconLeft="arrowLeft"
        >
          Back to cadences
        </Button>
        <div className={styles._statistics_callout}>
          <StatisticsBlock cadenceStatistics={cadenceStatistics} />

          <div className={styles._cadence__form__content}>
            <CadenceEditionHeader
              id={id}
              cadence={cadence}
              canEditCadence={canEditCadence}
              setIsModalOpen={setIsModalOpen}
            />
            <CadenceEditionContent
              steps={steps}
              bobjectType={bobjectType}
              canEditCadence={canEditCadence}
              refreshCadences={refreshCadences}
              setIsStepModalOpen={setIsStepModalOpen}
            />
          </div>
        </div>
        {isStepModalOpen && (
          <CreateEditStepModal
            bobjectType={bobjectType}
            refreshCadences={refreshCadences}
            onClose={() => setIsStepModalOpen(false)}
          />
        )}
        {isModalOpen && (
          <CreateEditCadenceSettings
            cadence={cadence}
            refreshCadences={refreshCadences}
            onClose={() => setIsModalOpen(false)}
            bobjectType={bobjectType}
          />
        )}
        {isDeleteStepModalOpen && (
          <DeleteCadenceStepModal
            refreshCadences={refreshCadences}
            onClose={onCloseDeleteStepModal}
          />
        )}
      </>
    </CadencesLayout>
  );
};
