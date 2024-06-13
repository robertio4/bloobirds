import { StrDict } from '@bloobirds-it/types';
import { PermissionType } from '@bloobirds-it/types';
import { atom, useRecoilState } from 'recoil';

import { useEntity } from '../../../../hooks';
import { USER_PERMISSIONS } from '../constants/users.constants';

type ModalInfoType = {
  id: string;
  name: string;
  email: string;
  userPermissions: string;
  employeeRole: string;
  userRoles: string;
  editAll: string;
  assignable: string;
  shortname: string;
  color: string;
};

const isCreationModalAtom = atom({
  key: 'createEditUserIsCreationModalAtom',
  default: false,
});

const modalInfoAtom = atom({
  key: 'createEditUserModalAtom',
  default: {},
});

export const useCreateEditUserModal = () => {
  const [modalOpen, setModalOpen] = useRecoilState(isCreationModalAtom);
  const [modalInfo, setModalInfo] = useRecoilState<ModalInfoType | StrDict>(modalInfoAtom);
  const employeeRoles = useEntity('employeeRoles')?.all();

  const handleReset = () => {
    setModalInfo({});
  };

  const handleOpenCreateEditUserModal = ({ user }) => {
    const isAccountAdmin = user?.roles?.some(role => role.name === 'Account Admin');
    const hasEditAll = user?.permissions.some(perm => perm.enumName === USER_PERMISSIONS.EDIT_ALL);
    if (user) {
      setModalInfo({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        userPermissions: user?.permissions.map(perm => perm.id),
        employeeRole: employeeRoles?.find(role => role.name === user.employeeRole)?.id,
        userRoles: isAccountAdmin
          ? user?.roles?.find(role => role.name === 'Account Admin')?.id
          : user.roles[0]?.id,
        editAll: hasEditAll,
        assignable: user?.assignable,
        shortname: user?.shortname,
        color: user?.color,
        whatsappAutoSyncEnabled: user?.autoSyncWhatsappPermission === PermissionType.FORCED,
        selectSignatureEnabled: user?.selectSignaturesPermission === PermissionType.FORCED,
        autoInsertSignatureEnabled: user?.autoInsertSignaturePermission === PermissionType.FORCED,
      });
    }
    setModalOpen(true);
  };

  const handleCloseUserModal = () => {
    handleReset();
    setModalOpen(false);
  };

  return {
    modalOpen,
    modalInfo,
    handleOpenCreateEditUserModal,
    handleCloseUserModal,
  };
};
