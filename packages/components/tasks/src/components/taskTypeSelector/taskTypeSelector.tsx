import React, { useEffect } from 'react';

import {
  Button,
  ColorType,
  Dropdown,
  Icon,
  IconType,
  Section,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import {
  useActiveAccountId,
  useActiveUserSettings,
  useCustomTasks,
  useNewCadenceTableEnabled,
} from '@bloobirds-it/hooks';
import { CustomTask, UserPermission } from '@bloobirds-it/types';
import { baseUrls } from '@bloobirds-it/utils';
import clsx from 'clsx';

import styles from './taskTypeSelector.module.css';
import { useTranslation } from "react-i18next";

interface TaskType {
  value?: string;
  name: string;
  icon?: IconType;
  iconColor?: ColorType;
}

export const TaskTypeSelector = ({
  value,
  onChange,
  isWebapp,
}: {
  value: string;
  onChange: (value: any) => void;
  isWebapp: boolean;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'tasks.taskTypeSelector' });

  const taskTypes: TaskType[] = [
    {
      icon: 'checkDouble',
      name: t('task'),
      value: 'TASK',
      iconColor: 'bloobirds',
    },
    {
      icon: 'phone',
      name: t('call'),
      value: 'CALL',
      iconColor: 'extraCall',
    },
    {
      icon: 'mail',
      name: t('email'),
      value: 'EMAIL',
      iconColor: 'tangerine',
    },
  ];
  const accountId = useActiveAccountId();
  const customTaskEnabled = useNewCadenceTableEnabled(accountId);
  const { visible, setVisible, ref } = useVisible();
  const { customTasks } = useCustomTasks();
  const [selectedValue, setSelectedValue] = React.useState<TaskType>();
  const [taskTypesWithCustom, setTaskTypesWithCustom] = React.useState<TaskType[]>(taskTypes);
  const { settings } = useActiveUserSettings();
  const permissions = settings?.user?.permissions;
  const canConfigureCustomTasks = permissions.includes(UserPermission.CUSTOM_TASK);
  const redirectToCustomTaskPlaybook = () => {
    const baseUrl = baseUrls[process.env.NODE_ENV];
    window.open(`${baseUrl}/app/playbook/custom-tasks`, '_blank');
  };

  useEffect(() => {
    if (customTaskEnabled) {
      setTaskTypesWithCustom([
        ...taskTypes,
        ...(customTasks
          ? customTasks?.map((custom: CustomTask) => ({
              icon: custom.icon,
              name: custom.name,
              value: custom.id,
              iconColor: custom.iconColor,
            }))
          : []),
      ]);
    }
  }, [customTasks]);

  useEffect(() => {
    const selectedTask = taskTypesWithCustom.find(task => task.value === value);
    setSelectedValue(selectedTask);
  }, [value, taskTypesWithCustom, customTasks]);

  return (
    <>
      <Dropdown
        ref={ref}
        visible={visible}
        position="top"
        style={{ width: '218px', maxHeight: '255px' }}
        anchor={
          <button className={styles.taskButton} onClick={() => setVisible(true)}>
            <div className={clsx(styles.iconContainer, { [styles.iconContainer_long]: isWebapp })}>
              {selectedValue ? (
                <>
                  <Icon name={selectedValue?.icon} size={20} color={selectedValue?.iconColor} />
                  <Text inline size="m" color="peanut" weight="bold">
                    {selectedValue?.name}
                  </Text>
                </>
              ) : (
                <>
                  <Icon name="checkDouble" size={20} color="bloobirds" />
                  <Text inline size="m" color="peanut" weight="bold">
                    {t('task')}
                  </Text>
                </>
              )}{' '}
              <Icon name="chevronDown" size={16} color="softPeanut" />
            </div>
          </button>
        }
      >
        <div className={styles.container}>
          <Section>{t('taskTypes')}</Section>
          <div>
            {
              <>
                {taskTypesWithCustom?.map(({ value, name, icon, iconColor }) => {
                  return (
                    <div
                      key={value}
                      className={styles.item}
                      onClick={() => {
                        setVisible(false);
                        onChange(value);
                      }}
                    >
                      <div className={styles.icon}>
                        <Icon name={icon} color={iconColor} />
                      </div>
                      <div className={styles.title}>{name}</div>
                    </div>
                  );
                })}
                {customTaskEnabled &&
                  (canConfigureCustomTasks ? (
                    <div className={styles.add_new_custom_task}>
                      <Button
                        iconRight="plus"
                        variant="clear"
                        size="small"
                        uppercase={false}
                        expand
                        onClick={redirectToCustomTaskPlaybook}
                      >
                        {t('addNew')}
                      </Button>
                    </div>
                  ) : (
                    <div className={styles.footer}>
                      <Text size="xxs" align="center">
                        {t('missingTask')}
                      </Text>
                      <Text size="xxs" weight="bold" align="center">
                        {t('askYourManager')}
                      </Text>
                    </div>
                  ))}
              </>
            }
          </div>
        </div>
      </Dropdown>
    </>
  );
};
