import { useTranslation } from 'react-i18next';

import { DisplayBlock } from '@bloobirds-it/types';
import { api, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR, { KeyedMutator } from 'swr';

const fetchDisplayBlock = async ([key, language]): Promise<DisplayBlock> => {
  const response = await api.get<DisplayBlock>(
    `/utils/service/info-display-block/${key}/${language}`,
  );
  return response.data;
};

export const useGetInfoDisplayBlockByKey: (
  key: string,
) => {
  tooltipContent: DisplayBlock | null;
  isLoading: boolean;
} = (key: string) => {
  const { i18n } = useTranslation();
  const language = i18n.language || 'en';

  const { data: tooltipContent, isLoading } = useSWR<DisplayBlock>(
    [key, language],
    fetchDisplayBlock,
    { use: [keepPreviousResponse] },
  );

  return {
    tooltipContent,
    isLoading,
  };
};

const fetchAllDisplayBlocks = async () => {
  const response = await api.get<DisplayBlock[]>('/utils/service/info-display-block/all');
  return response.data;
};

export const useAllInfoDisplayBlocks: () => {
  infoDisplayBlocks: DisplayBlock[] | null;
  mutate: KeyedMutator<DisplayBlock[]>;
} = () => {
  const { data, mutate } = useSWR('/utils/service/info-display-block/all', fetchAllDisplayBlocks, {
    use: [keepPreviousResponse],
  });

  return {
    infoDisplayBlocks: data || [],
    mutate,
  };
};
