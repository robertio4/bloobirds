import { useEffect, useRef, useState } from 'react';

import { api } from '@bloobirds-it/utils';
import { debounce } from 'lodash';
import useSWR from 'swr';

export interface RelatedField {
  apiName: string;
  label: string;
  order: number;
}

export interface RelatedObjectsTableProps {
  title: string;
  id: string;
  icon: any;
  display: boolean;
  selectedFields: RelatedField[];
  availableFields: RelatedField[];
  objectApiName: RelatedField;
  objectType: string;
  objectTypeFieldRelated: string[];
  availableObjectTypeFieldRelated: string[];
}

export const useGetRelatedObjects = (selectedSobjectType?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const {
    data: relatedBobjects,
    error: swrError,
    isLoading: swrLoading,
  } = useSWR(
    selectedSobjectType
      ? `/utils/service/salesforce/relatedSobjectTypes/${selectedSobjectType}`
      : null,
    (url: string) => api.get(url).then(data => data?.data),
  );

  const [data, setData] = useState<RelatedObjectsTableProps[]>(relatedBobjects ?? []);
  const [hasNewRelations, setHasNewRelations] = useState<boolean>(null);
  const [filteredData, setFilteredData] = useState(data);
  const numberNewRelations = useRef(0);

  useEffect(() => {
    setData(relatedBobjects ?? []);
    setFilteredData(relatedBobjects ?? []);
  }, [relatedBobjects?.length, selectedSobjectType]);

  useEffect(() => {
    setLoading(false);
    setError(false);
    setOrder(null);
    setSearchInput('');
    setHasNewRelations(null);
    numberNewRelations.current = 0;
  }, [selectedSobjectType]);

  const handleReorder = () => {
    const newOrder = order === 'DESC' ? 'ASC' : 'DESC';
    setFilteredData(
      data?.sort((a: RelatedObjectsTableProps, b: RelatedObjectsTableProps) => {
        switch (newOrder) {
          case 'DESC':
            return a?.objectApiName?.label < b?.objectApiName?.label ? -1 : 1;
          case 'ASC':
            return a?.objectApiName?.label > b?.objectApiName?.label ? -1 : 1;
        }
      }),
    );
    setOrder(newOrder);
  };

  const searchData = (search: string) => {
    debounce((search: string) => {
      setFilteredData(
        data?.filter((bobject: RelatedObjectsTableProps) =>
          bobject?.objectApiName?.label?.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }, 500)(search);
  };

  const handleSearch = (search: string) => {
    setSearchInput(search);
    searchData(search);
  };

  const handleSyncNewObjects = async () => {
    setLoading(true);
    setError(false);
    try {
      setSearchInput('');
      setOrder(null);

      const newData = await api.get(
        `/utils/service/salesforce/relatedSobjectTypes/new/${selectedSobjectType}`,
      );

      setLoading(false);
      setData([...relatedBobjects, ...(newData?.data ?? [])]);
      setFilteredData([...relatedBobjects, ...(newData?.data ?? [])]);
      setHasNewRelations(
        numberNewRelations.current < newData?.data?.length && newData?.data?.length > 0,
      );
      numberNewRelations.current = newData?.data?.length;
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return {
    searchInput,
    order,
    hasNewRelations,
    data: filteredData,
    isLoading: swrLoading || loading,
    isError: swrError || error,
    handleReorder,
    handleSearch,
    handleSyncNewObjects,
  };
};
