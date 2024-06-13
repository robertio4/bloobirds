import { v4 as generateRandomId } from "/vendor/.vite-deps-uuid.js__v--488548d2.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { atom, useRecoilState, useResetRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
const uploadFile = async ({
  file,
  createToast,
  setAttachedFiles,
  internalId,
  visible = "false"
}) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("visible", visible);
  const response = await api.post("/messaging/mediaFiles", formData, {
    validateStatus: () => true,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  if (response.status === 201) {
    setAttachedFiles((attachFiles) => {
      const newAttachFiles = attachFiles?.filter((prevFile) => prevFile.name !== file.name);
      newAttachFiles.push({
        id: response.data?.id,
        internalId,
        name: file.name,
        uploading: false
      });
      return newAttachFiles;
    });
  } else if (response.status === 500 && response.data?.message?.includes("SizeLimitExceededException")) {
    setAttachedFiles((attachFiles) => {
      return attachFiles?.filter((prevFile) => prevFile.name !== file.name);
    });
    createToast({
      message: `File exceeds maximum allowed size of 15MB`,
      type: "error"
    });
  } else {
    setAttachedFiles((attachFiles) => {
      return attachFiles?.filter((prevFile) => prevFile.name !== file.name);
    });
    createToast({ message: "Failed to upload attachment", type: "error" });
  }
};
function useAttachedFiles() {
  const { createToast } = useToasts();
  const [attachedFiles, setAttachedFiles] = useState([]);
  const uploadAttachedFile = async (files, visible = false) => {
    const originalAttachedFiles = [...attachedFiles];
    const internalId = generateRandomId();
    const newFiles = files.map((file) => ({
      id: null,
      internalId,
      name: file.name,
      uploading: true
    }));
    setAttachedFiles([...originalAttachedFiles, ...newFiles]);
    files.forEach((file) => {
      uploadFile({
        file,
        createToast,
        setAttachedFiles,
        internalId,
        visible: visible ? "true" : "false"
      });
    });
  };
  const removeAttachedFile = (attachedFileId) => {
    setAttachedFiles(attachedFiles.filter((file) => file.id !== attachedFileId));
  };
  const syncAttachments = (mediaFiles) => {
    const newAttachedFiles = mediaFiles?.map((mediaFile) => ({
      id: mediaFile.id,
      internalId: generateRandomId(),
      name: mediaFile.name,
      uploading: false
    }));
    setAttachedFiles(newAttachedFiles);
  };
  return {
    attachedFiles,
    uploadAttachedFile,
    removeAttachedFile,
    syncAttachments
  };
}
const attachedLinksAtom = atom({
  key: "attachedLinksAtom-old",
  default: []
});
const useAttachedLinks = () => {
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
export { useAttachedFiles, useAttachedLinks };
