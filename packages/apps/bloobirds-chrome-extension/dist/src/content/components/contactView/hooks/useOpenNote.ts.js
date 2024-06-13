import { useMinimizableModals } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
export const useOpenNote = (item, mainNoteData, setVisible) => {
  const { useGetDataModel, setExtendedContext } = useExtensionContext();
  const dataModel = useGetDataModel();
  const {
    openMinimizableModal,
    minimizableModals,
    openMinimizableModalById
  } = useMinimizableModals();
  const openNoteModal = () => {
    setVisible(false);
    const find = minimizableModals?.find(
      (modal) => modal?.type === "note" && modal?.data?.isNewNote && modal?.data?.[item?.id?.typeName]?.id.value === item?.id.value
    );
    if (find) {
      openMinimizableModalById(find.id);
    } else {
      openMinimizableModal({
        type: "note",
        data: {
          [item?.id?.typeName?.toLowerCase()]: item,
          isNewNote: true,
          location: "bubble"
        }
      });
    }
  };
  const openMainNoteModal = () => {
    setVisible(false);
    const bobjectFieldsData = {};
    mainNoteData?.data?.fields.forEach((field) => {
      bobjectFieldsData[field.logicRole || field.name] = field.value;
    });
    const activityMainNoteYes = dataModel?.findValueByLogicRole(
      ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES
    );
    const isMainNote = bobjectFieldsData[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] === activityMainNoteYes?.id;
    setExtendedContext({
      type: ExtendedContextTypes.NOTE_DETAILS,
      bobject: mainNoteData?.data,
      extraInfo: {
        bobjectId: mainNoteData?.data?.id?.value,
        [item?.id?.typeName?.toLowerCase()]: item,
        originallyMainNote: isMainNote,
        location: "bubble",
        ...bobjectFieldsData
      }
    });
  };
  return {
    openNoteModal,
    openMainNoteModal
  };
};
