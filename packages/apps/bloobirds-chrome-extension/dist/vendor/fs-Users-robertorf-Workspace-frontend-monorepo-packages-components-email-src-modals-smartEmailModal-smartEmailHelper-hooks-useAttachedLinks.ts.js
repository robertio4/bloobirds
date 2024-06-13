import { atom, useRecoilState, useResetRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
const attachedLinksAtom = atom({
  key: "attachedLinksAtom",
  default: []
});
export const useAttachedLinks = () => {
  const [attachedLinks, setAttachedLinks] = useRecoilState(attachedLinksAtom);
  const resetAttachedLinks = useResetRecoilState(attachedLinksAtom);
  const uploadAttachedLink = (file) => {
    const alreadyAttached = attachedLinks.filter((link) => link.title === file.title && link.link === file.link)?.length > 0;
    if (!alreadyAttached) {
      setAttachedLinks([...attachedLinks, ...[file]]);
    }
  };
  const removeAttachedLink = (linkToRemove) => {
    setAttachedLinks(
      attachedLinks.filter(
        (link) => link.title !== linkToRemove.title && link.link !== linkToRemove.link
      )
    );
  };
  return {
    attachedLinks,
    setAttachedLinks,
    uploadAttachedLink,
    resetAttachedLinks,
    removeAttachedLink
  };
};
