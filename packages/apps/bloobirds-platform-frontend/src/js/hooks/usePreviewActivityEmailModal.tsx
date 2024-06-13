import { atom, useRecoilState } from 'recoil';

import useModalVisibility from './useModalVisibility';

const activityAtom = atom({
  key: 'activityIdToPreviewAtom',
  default: null,
});

/**
 * This hook is only used if you want to preview an ACTIVITY email, not a task
 */
export const usePreviewActivityEmailModal = () => {
  const [activityPreview, setActivityPreview] = useRecoilState(activityAtom);
  const { isOpen, closeModal, openModal } = useModalVisibility('previewActivityEmailModal');

  const handleOpenModal = ({ activity }: { activity: any }) => {
    setActivityPreview(activity);
    openModal();
  };

  const handleClose = () => {
    setActivityPreview(null);
    closeModal();
  };

  return {
    isOpen,
    handleOpenModal,
    handleClose,
    activity: activityPreview,
  };
};
