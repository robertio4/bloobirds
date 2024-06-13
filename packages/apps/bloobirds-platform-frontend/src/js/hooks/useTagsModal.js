import { atom, useRecoilState } from 'recoil';

const tagsModalOpen = atom({
  key: 'tagsModalOpenAtom',
  default: false,
});

const valuesToRenderAtom = atom({
  key: 'valuesToRenderAtom',
  default: [],
});

const areValuesAtom = atom({
  key: 'areValuesTagsAtom',
  default: false,
});

const extraTextAtom = atom({
  key: 'extraTextAtom',
  default: '',
});

export const useTagsModal = () => {
  const [openTagsModal, setOpenTagsModal] = useRecoilState(tagsModalOpen);
  const [valuesToRender, setValuesToRender] = useRecoilState(valuesToRenderAtom);
  const [areValues, setAreValues] = useRecoilState(areValuesAtom);
  const [extraText, setExtraText] = useRecoilState(extraTextAtom);

  const handleOpenTagsModal = (values, isValues, extra) => {
    setExtraText(extra);
    setAreValues(isValues);
    setValuesToRender(values);
    setOpenTagsModal(true);
  };

  const handleClose = () => {
    setValuesToRender(null);
    setOpenTagsModal(false);
  };

  return {
    areValues,
    openTagsModal,
    valuesToRender,
    extraText,
    handleOpenTagsModal,
    handleClose,
  };
};
