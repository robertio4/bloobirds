import { useCustomTasks } from '@bloobirds-it/hooks';
import { CustomTask } from '@bloobirds-it/types';

interface UseReferenceEntityFormField {
  entity: 'customTask';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useReferencedEntityValues = (entity: string) => {
  const { customTasks }: { customTasks: CustomTask[] | undefined } = useCustomTasks({
    disabled: false,
  });

  return customTasks ? customTasks.map(ct => ({ value: ct.id, name: ct.name })) : [];
};

export const useReferenceEntityFormField = ({ entity }: UseReferenceEntityFormField) => {
  const values = useReferencedEntityValues(entity);

  return {
    options: values,
  };
};
