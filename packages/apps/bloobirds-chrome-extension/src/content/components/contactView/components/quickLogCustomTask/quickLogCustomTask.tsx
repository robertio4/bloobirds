import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Dropdown, Icon, Section, Text } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks, useQuickLogActivity, useUserHelpers } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  CustomTask,
  ExtensionBobject,
  ExtensionHelperKeys,
  LinkedInLead,
  MessagesEvents,
  UserPermission,
} from '@bloobirds-it/types';
import { baseUrls, recoverScrollOfBox, removeScrollOfBox } from '@bloobirds-it/utils';

import { useExtensionContext } from '../../../context';
import { ContactViewAction } from '../contactViewActions/contactViewActions';
import styles from './quickLogCustomTask.module.css';

type Props = {
  isDisabled: boolean;
  bobject: Bobject | ExtensionBobject;
  leads: Array<Bobject> | Array<LinkedInLead>;
  visibilityProps: {
    ref: React.MutableRefObject<any>;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  };
  size?: 'small' | 'medium';
};

const QuickLogCustomTask = ({ isDisabled, bobject, leads, visibilityProps }: Props) => {
  const { visible, setVisible, ref } = visibilityProps;
  const { customTasks } = useCustomTasks({ disabled: false });
  const { has, save } = useUserHelpers();
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const permissions = settings?.user?.permissions;
  const canConfigureCustomTasks = permissions.includes(UserPermission.CUSTOM_TASK);
  const { openQuickLogModal } = useQuickLogActivity();
  const { t } = useTranslation('translation', {
    keyPrefix: 'sidePeek.contactViewActions.quickLogCustomTask',
  });

  const orderedCustomTasks = customTasks?.sort((a, b) => b.ordering - a.ordering);

  useEffect(() => {
    if (visible) {
      removeScrollOfBox();
    }

    if (!visible) {
      recoverScrollOfBox();
    }
  }, [visible]);

  const redirectToCustomTaskPlaybook = () => {
    const baseUrl = baseUrls[process.env.NODE_ENV];

    window.open(`${baseUrl}/app/playbook/custom-tasks`, '_blank');
  };

  return (
    <>
      <Dropdown
        ref={ref}
        visible={visible}
        position="top"
        style={{ width: '218px', height: '255px' }}
        anchor={
          <ContactViewAction
            color="grape"
            icon="zap"
            onClick={() => setVisible(true)}
            isDisabled={isDisabled}
            tooltip={t('tooltip')}
          />
        }
      >
        <div className={styles.container}>
          <Section>{t('sectionTitle')}</Section>
          <div>
            {orderedCustomTasks?.length === 0 ? (
              <div className={styles.no_tasks}>
                <Icon name="slash" color="softPeanut" size={24} />
                <Text size="xxs" align="center">
                  {t('noCustomTasksCreated')}
                </Text>
                {canConfigureCustomTasks && (
                  <Button
                    onClick={redirectToCustomTaskPlaybook}
                    iconRight="arrowRight"
                    variant="clear"
                    size="small"
                    uppercase={false}
                    expand
                  >
                    {t('configureCustomTasks')}
                  </Button>
                )}
                {!canConfigureCustomTasks && (
                  <Text size="xxs" weight="bold">
                    {t('askYourManager')}
                  </Text>
                )}
              </div>
            ) : (
              <>
                {orderedCustomTasks?.map((customTask: CustomTask) => {
                  const { id, name, icon, iconColor } = customTask;
                  return (
                    <div
                      key={id}
                      className={styles.item}
                      onClick={() => {
                        setVisible(false);
                        openQuickLogModal({
                          customTask,
                          leads,
                          selectedBobject: bobject,
                          onSubmit: () => {
                            if (!has(ExtensionHelperKeys.CUSTOM_TASKS)) {
                              save(ExtensionHelperKeys.CUSTOM_TASKS);
                            }
                            window.dispatchEvent(
                              new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                                detail: { type: BobjectTypes.Activity },
                              }),
                            );
                            window.dispatchEvent(
                              new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                                detail: { type: bobject?.id?.typeName },
                              }),
                            );
                          },
                        });
                      }}
                    >
                      <div className={styles.icon}>
                        <Icon name={icon} color={iconColor} />
                      </div>
                      <div className={styles.title}>{name}</div>
                    </div>
                  );
                })}
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
                      {t('addNewCustomTasks')}
                    </Button>
                  </div>
                ) : (
                  <div className={styles.footer}>
                    <Text size="xxs" align="center">
                      {t('missingSome')}
                    </Text>
                    <Text size="xxs" weight="bold" align="center">
                      {t('askYourManager')}
                    </Text>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Dropdown>
    </>
  );
};

export default QuickLogCustomTask;
