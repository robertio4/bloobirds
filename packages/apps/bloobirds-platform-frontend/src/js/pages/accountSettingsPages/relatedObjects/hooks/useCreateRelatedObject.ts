import { useTranslation } from 'react-i18next';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { api } from '@bloobirds-it/utils';

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

export const useCreateRelatedObjects = () => {
  const { createToast } = useToasts();
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.relatedObjects',
  });

  const handleUpdate = async (related: RelatedObjectsTableProps) => {
    let data;
    if (related.title && related?.objectTypeFieldRelated.length > 0) {
      try {
        if (!related.id) {
          data = await api.post(`/utils/service/salesforce/relatedSobjectTypes`, related);
          createToast({ message: t('relatedCreated'), type: 'success' });
        } else {
          data = await api.patch(
            `/utils/service/salesforce/relatedSobjectTypes/${related.id}`,
            related,
          );
          createToast({ message: t('relatedUpdated'), type: 'success' });
        }
      } catch (error) {
        createToast({ message: t('relatedError'), type: 'error' });
      }
    }

    return {
      data: data?.data ?? related,
      errors: {
        errorTitleField: !related.title,
        errorObjectTypeFieldRelated:
          !related.objectTypeFieldRelated || related.objectTypeFieldRelated.length === 0,
      },
    };
  };

  return {
    handleUpdate,
  };
};
