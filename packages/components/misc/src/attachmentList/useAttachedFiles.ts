import { v4 as generateRandomId } from 'uuid';
import { api } from '@bloobirds-it/utils';
import { useState } from 'react';
import {
  AttachedFile,
  MediaFile,
  AttachedLink,
  AttachedFilesHookReturn,
} from '@bloobirds-it/types';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

const uploadFile = async ({
  file,
  createToast,
  setAttachedFiles,
  internalId,
  visible = 'false',
}: {
  file: File;
  createToast: ({ message, type }: { message: any; type: any }) => void;
  setAttachedFiles: (param: any) => void;
  internalId: string;
  visible?: 'true' | 'false';
}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('visible', visible);

  const response = await api.post('/messaging/mediaFiles', formData, {
    validateStatus: () => true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.status === 201) {
    setAttachedFiles((attachFiles: any) => {
      const newAttachFiles = attachFiles?.filter((prevFile: any) => prevFile.name !== file.name);
      newAttachFiles.push({
        id: response.data?.id,
        internalId,
        name: file.name,
        uploading: false,
      });
      return newAttachFiles;
    });
  } else if (
    response.status === 500 &&
    response.data?.message?.includes('SizeLimitExceededException')
  ) {
    setAttachedFiles((attachFiles: any) => {
      return attachFiles?.filter((prevFile: any) => prevFile.name !== file.name);
    });
    createToast({
      message: `File exceeds maximum allowed size of 15MB`,
      type: 'error',
    });
  } else {
    setAttachedFiles((attachFiles: any) => {
      return attachFiles?.filter((prevFile: any) => prevFile.name !== file.name);
    });
    createToast({ message: 'Failed to upload attachment', type: 'error' });
  }
};

// if return type changes, edit type (don't delete it), and look for conflicts
function useAttachedFiles(): AttachedFilesHookReturn {
  const { createToast } = useToasts();
  const [attachedFiles, setAttachedFiles] = useState<Array<AttachedFile>>([]);

  const uploadAttachedFile = async (files: File[], visible = false) => {
    const originalAttachedFiles = [...attachedFiles];
    const internalId = generateRandomId();
    const newFiles = files.map(file => ({
      id: null,
      internalId,
      name: file.name,
      uploading: true,
    }));
    setAttachedFiles([...originalAttachedFiles, ...newFiles]);

    files.forEach(file => {
      uploadFile({
        file,
        createToast,
        setAttachedFiles,
        internalId,
        visible: visible ? 'true' : 'false',
      });
    });
  };

  const removeAttachedFile = (attachedFileId?: string | null) => {
    setAttachedFiles(attachedFiles.filter(file => file.id !== attachedFileId));
  };

  const syncAttachments = (mediaFiles: Array<MediaFile>) => {
    const newAttachedFiles = mediaFiles?.map(mediaFile => ({
      id: mediaFile.id,
      internalId: generateRandomId(),
      name: mediaFile.name,
      uploading: false,
    }));
    setAttachedFiles(newAttachedFiles);
  };

  return {
    attachedFiles,
    uploadAttachedFile,
    removeAttachedFile,
    syncAttachments,
  };
}

const attachedLinksAtom = atom({
  key: 'attachedLinksAtom-old',
  default: [],
});

const useAttachedLinks = () => {
  const [attachedLinks, setAttachedLinks] = useRecoilState(attachedLinksAtom);
  const resetAttachedLinks = useResetRecoilState(attachedLinksAtom);

  const uploadAttachedLink = (file: AttachedLink) => {
    const alreadyAttached =
      attachedLinks.filter(link => link.title === file.title && link.link === file.link)?.length >
      0;
    if (!alreadyAttached) {
      setAttachedLinks([...attachedLinks, ...[file]]);
    }
  };

  const removeAttachedLink = (linkToRemove: AttachedLink) => {
    setAttachedLinks(
      attachedLinks.filter(
        link => link.title !== linkToRemove.title && link.link !== linkToRemove.link,
      ),
    );
  };

  return {
    attachedLinks,
    setAttachedLinks,
    uploadAttachedLink,
    resetAttachedLinks,
    removeAttachedLink,
  };
};

export { useAttachedFiles, useAttachedLinks };
