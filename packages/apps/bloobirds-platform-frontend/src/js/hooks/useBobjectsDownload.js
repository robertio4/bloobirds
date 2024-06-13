import { addQueryParamsFromTypes } from '../components/bobjectTable/context/bobjectTable.utils';
import { BobjectApi } from '../misc/api/bobject';
import { useState } from 'react';
import { useEntity } from './entities/useEntity';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import { atom, useRecoilState } from 'recoil';
import { useBobjectTypes } from './useBobjectTypes';

const modalOpenAtom = atom({
  key: 'downloadConfirmationModalOpen',
  default: false,
});

const formatAtom = atom({
  key: 'downloadDataFormat',
  default: undefined,
});

export const useBobjectsDownload = () => {
  const entityBobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const fieldTypes = useEntity('fieldTypes');
  const { createToast } = useToasts();
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useRecoilState(modalOpenAtom);
  const [downloadFormat, setDownloadFormat] = useRecoilState(formatAtom);

  const handleDownload = ({ query, format, columns, bobjectType }) => {
    const bobjectTypeEntity = bobjectTypes?.findBy('name')(bobjectType);
    setLoading(true);
    setDownloadFormat(format);
    if (bobjectTypeEntity && query && bobjectTypes && fieldTypes && entityBobjectFields) {
      const finalQuery = addQueryParamsFromTypes(query, bobjectTypeEntity, entityBobjectFields);
      BobjectApi.request()
        .bobjectType(bobjectTypeEntity.name)
        .downloadSearch({
          query: finalQuery,
          // You have to pass a list of bobjects or a list of Ids
          columns: columns?.map(column => (column?.id ? column.id : column)),
          formFields: true,
          format,
          pageSize: 1000,
          injectReferences: true,
        })
        .then(() => {
          setLoading(false);
          setModalOpen(true);
        })
        .catch(() => {
          createToast({ message: 'There was an error downloading the list', type: 'error' });
          setLoading(false);
        });
    }
  };

  return {
    isLoading,
    handleDownload,
    isModalOpen,
    setModalOpen,
    downloadFormat,
  };
};
