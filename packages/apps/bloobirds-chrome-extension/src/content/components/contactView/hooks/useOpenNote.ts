import { useMinimizableModals } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE,
  ExtensionCompany,
  ExtensionOpportunity,
  LinkedInLead,
} from '@bloobirds-it/types';

import { ExtendedContextTypes } from '../../../../types/extendedContext';
import { useExtensionContext } from '../../context';

export const useOpenNote = (
  item: ExtensionOpportunity | ExtensionCompany | LinkedInLead,
  mainNoteData,
  setVisible,
) => {
  const { useGetDataModel, setExtendedContext } = useExtensionContext();
  const dataModel = useGetDataModel();

  const {
    openMinimizableModal,
    minimizableModals,
    openMinimizableModalById,
  } = useMinimizableModals();

  const openNoteModal = () => {
    setVisible(false);

    const find = minimizableModals?.find(
      modal =>
        modal?.type === 'note' &&
        modal?.data?.isNewNote &&
        modal?.data?.[item?.id?.typeName]?.id.value === item?.id.value,
    );
    if (find) {
      openMinimizableModalById(find.id);
    } else {
      openMinimizableModal({
        type: 'note',
        data: {
          [item?.id?.typeName?.toLowerCase()]: item,
          isNewNote: true,
          location: 'bubble',
        },
      });
    }
  };

  const openMainNoteModal = () => {
    setVisible(false);

    const bobjectFieldsData = {};
    mainNoteData?.data?.fields.forEach(field => {
      bobjectFieldsData[field.logicRole || field.name] = field.value;
    });
    const activityMainNoteYes = dataModel?.findValueByLogicRole(
      ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES,
    );
    const isMainNote =
      bobjectFieldsData[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] === activityMainNoteYes?.id;

    setExtendedContext({
      type: ExtendedContextTypes.NOTE_DETAILS,
      bobject: mainNoteData?.data,
      extraInfo: {
        bobjectId: mainNoteData?.data?.id?.value,
        [item?.id?.typeName?.toLowerCase()]: item,
        originallyMainNote: isMainNote,
        location: 'bubble',
        ...bobjectFieldsData,
      },
    });
  };

  return {
    openNoteModal,
    openMainNoteModal,
  };
};
