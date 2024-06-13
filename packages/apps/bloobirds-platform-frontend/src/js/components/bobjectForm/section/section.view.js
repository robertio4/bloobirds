import React, { useEffect, useMemo, useState } from 'react';
import Field from './field';
import { ModalSection } from '@bloobirds-it/flamingo-ui';
import { toCamelCase } from '../../../utils/strings.utils';
import styles from './section.module.css';
import { useFormContext } from 'react-hook-form';

const Section = ({
  title,
  icon,
  modalBobjectType,
  fields,
  hideActivityType,
  isRequiredBeforeMeeting,
  defaultValues,
  hasProducts,
  customTasks,
}) => {
  const [selectedCustomTask, setSelectedCustomTask] = useState(undefined);

  const hasWriteableFields = useMemo(() => fields.some(field => !field.readOnly), [fields]);

  const resultFields = useMemo(
    () =>
      isRequiredBeforeMeeting
        ? fields
        : fields.filter(field => !field.readOnly && !field.deprecated),
    [isRequiredBeforeMeeting, fields],
  );

  const { watch } = useFormContext();

  const selectedCustomTaskValue = watch('ACTIVITY__CUSTOM_TASK');

  useEffect(() => {
    const customTask = customTasks?.find(ct => ct.id === selectedCustomTaskValue);
    setSelectedCustomTask(customTask);
  }, [selectedCustomTaskValue]);

  if (!hasWriteableFields && !isRequiredBeforeMeeting) {
    return null;
  }

  if (resultFields.length === 0) {
    return null;
  }

  return (
    <div className={styles._grid}>
      <ModalSection title={title} icon={toCamelCase(icon)}>
        {resultFields.map(field => (
          <Field
            key={field.name}
            defaultValues={defaultValues}
            {...field}
            modalBobjectType={modalBobjectType}
            hideActivityType={hideActivityType}
            hasProducts={hasProducts}
            selectedCustomTask={selectedCustomTask}
          />
        ))}
      </ModalSection>
    </div>
  );
};

export default Section;
