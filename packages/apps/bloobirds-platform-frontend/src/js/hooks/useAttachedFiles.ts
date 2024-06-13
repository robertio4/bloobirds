import { useState } from 'react';

import { useToasts } from '@bloobirds-it/flamingo-ui';
// @ts-ignore
import { v4 as generateRandomId } from 'uuid';

import { AttachedFile, MediaFile } from '../typings/messaging';
import { api } from '../utils/api';

const uploadFile = async ({
  file,
  createToast,
  setAttachedFiles,
  internalId,
}: {
  file: File;
  createToast: ({ message, type }: { message: any; type: any }) => void;
  setAttachedFiles: (param: any) => void;
  internalId: string;
}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('visible', 'true');

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
        id: response.data.id,
        internalId,
        name: file.name,
        uploading: false,
      });
      return newAttachFiles;
    });
  } else if (
    response.status === 500 &&
    response.data?.message.includes('SizeLimitExceededException')
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

function useAttachedFiles() {
  const { createToast } = useToasts();
  const [attachedFiles, setAttachedFiles] = useState<Array<AttachedFile>>([]);

  const uploadAttachedFile = async (files: File[]) => {
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

export default useAttachedFiles;
