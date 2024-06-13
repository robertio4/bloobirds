import React, { FC } from 'react';

import {
  Action,
  Button,
  Dropdown,
  Icon,
  Item,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useQuickLogActivity, useCustomTasks } from '@bloobirds-it/hooks';
import { Bobject, CustomTask, UserPermission } from '@bloobirds-it/types';

import { APP_PLAYBOOK_CUSTOM_TASKS } from '../../../../app/_constants/routes';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { useRouter } from '../../../../hooks';
import styles from '../leadTableActions.module.css';

type QuickLogActionProps = {
  leads: any[];
  selectedLead: Bobject;
};
export const QuickLogAction: FC<QuickLogActionProps> = ({ leads, selectedLead }) => {
  const { ref, visible, setVisible } = useVisible();
  const { customTasks } = useCustomTasks({ disabled: false });
  const { history } = useRouter();
  const {
    user: { permissions },
  } = useUserSettings();
  const canConfigureCustomTasks = permissions.includes(UserPermission.CUSTOM_TASK);
  const { openQuickLogModal } = useQuickLogActivity();

  const redirectToCustomTaskPlaybook = () => {
    history.push(APP_PLAYBOOK_CUSTOM_TASKS);
  };

  const orderedCustomTasks = customTasks?.sort((a, b) => b.ordering - a.ordering);

  return (
    <>
      <Dropdown
        ref={ref}
        visible={visible}
        anchor={
          <Tooltip title="Quick activity log" position="top">
            <Action
              icon="zap"
              color="grape"
              dataTest="quickLogAction"
              onClick={() => setVisible(!visible)}
            />
          </Tooltip>
        }
      >
        <div className={styles.quickAction_container}>
          <Text size="xs" color="softPeanut">
            Log quick activity with one click
          </Text>
          {orderedCustomTasks && orderedCustomTasks.length > 0 && (
            <>
              {orderedCustomTasks.map((customTask: CustomTask) => (
                <Item
                  key={customTask.id}
                  icon={customTask.icon}
                  className={styles.custom_task_item}
                  iconColor={customTask.iconColor}
                  onClick={() => {
                    setVisible(false);
                    openQuickLogModal({
                      customTask,
                      leads,
                      selectedBobject: selectedLead,
                    });
                  }}
                >
                  {customTask.name}
                </Item>
              ))}
              {canConfigureCustomTasks ? (
                <div className={styles.add_new_custom_task}>
                  <Button
                    iconRight="plus"
                    variant="clear"
                    size="small"
                    uppercase={false}
                    expand
                    onClick={redirectToCustomTaskPlaybook}
                  >
                    Add new custom tasks
                  </Button>
                </div>
              ) : (
                <div className={styles.footer}>
                  <Text size="xxs" align="center">
                    Missing some custom activity to log?
                  </Text>
                  <Text size="xxs" weight="bold" align="center">
                    Ask your manager to create a custom task type
                  </Text>
                </div>
              )}
            </>
          )}
          {orderedCustomTasks && orderedCustomTasks.length === 0 && (
            <div className={styles.quickAction_no_tasks}>
              <Icon name="slash" color="softPeanut" size={24} />
              <Text size="xxs" align="center">
                There are no custom tasks created or enabled. In order to select this step make sure
                to have at least one custom type available.
              </Text>
              {canConfigureCustomTasks ? (
                <Button
                  onClick={redirectToCustomTaskPlaybook}
                  iconRight="arrowRight"
                  variant="clear"
                  size="small"
                  uppercase={false}
                  expand
                >
                  Configure custom tasks
                </Button>
              ) : (
                <Text size="xxs" weight="bold">
                  Ask your manager to create a custom task type
                </Text>
              )}
            </div>
          )}
        </div>
      </Dropdown>
    </>
  );
};
