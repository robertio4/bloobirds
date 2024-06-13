import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@bloobirds-it/flamingo-ui';
import { useMinimizableModals } from '@bloobirds-it/hooks';
import { Bobject, ExtensionBobject } from '@bloobirds-it/types';

const CreateTaskButton = ({
  bobject,
  location = 'bubble',
  displayCondition = true,
  className,
}: {
  bobject?: Bobject | ExtensionBobject;
  location: 'bubble' | 'leftBar';
  displayCondition?: boolean;
  className?: string;
}) => {
  const { openMinimizableModal } = useMinimizableModals();
  const { t } = useTranslation();

  function handleAddTask(e) {
    e.stopPropagation();
    e.preventDefault();
    openMinimizableModal({
      type: 'task',
      data: {
        ...(bobject ? { [bobject.id.typeName.toLowerCase()]: bobject } : {}),
        location: location,
      },
    });
  }
  return (
    displayCondition && (
      <Button iconLeft="plus" size="small" onClick={handleAddTask} className={className} />
    )
  );
};

export default CreateTaskButton;
