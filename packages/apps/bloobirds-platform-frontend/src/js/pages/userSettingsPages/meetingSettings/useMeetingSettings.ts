import { useState } from 'react';
import { ACTION_TYPES } from './meetingSettings';
import { useMeetingLink } from '../../../hooks/useMeetingLinks';
import { MeetingLink } from '../../../typings/messaging';

export enum MeetingModalType {
  'EDIT&CREATE' = 'EDIT&CREATE',
  DELETE = 'DELETE',
}

const defaultProps: { entity: any; openedModal: keyof typeof MeetingModalType } = {
  entity: undefined,
  openedModal: undefined,
};
export const useMeetingSettings = () => {
  const [modalInfo, setModalInfo] = useState(defaultProps);
  const { deleteById, setAsDefault } = useMeetingLink();

  function handleEntity(actionType: ACTION_TYPES, entity?: any) {
    switch (actionType) {
      case ACTION_TYPES.ADD:
        setModalInfo({ ...modalInfo, openedModal: 'EDIT&CREATE' });
        break;
      case ACTION_TYPES.EDIT:
        break;
      case ACTION_TYPES.STAR:
        return setAsDefault(entity.id);
      case ACTION_TYPES.DELETE:
        return deleteById(modalInfo?.entity?.id);
    }
  }

  return {
    modalInfo,
    setModalInfo,
    openedModal: modalInfo.openedModal,
    onCreate: () => handleEntity(ACTION_TYPES.ADD),
    onStar: (entity: MeetingLink) => handleEntity(ACTION_TYPES.STAR, entity),
    onDelete: () => handleEntity(ACTION_TYPES.DELETE),
    closeModals: () => {
      setModalInfo(defaultProps);
    },
  };
};
