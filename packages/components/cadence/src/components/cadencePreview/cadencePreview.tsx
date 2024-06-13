import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useClickAway } from 'react-use';
import { useVirtual } from 'react-virtual';

import { Dropdown, Icon, IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';
import { removeHtmlTags } from '@bloobirds-it/utils';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';

import { useCadenceSteps } from '../../hooks/useCadenceSteps';
import { PreviewTemplateModal } from '../previewTemplateModal/previewTemplateModal';
import styles from './cadencePreview.module.css';

const ACTIONS_ICONS = {
  PHONE_CALL: {
    name: 'phone',
    color: 'melon',
  },
  EMAIL: {
    name: 'mail',
    color: 'tangerine',
  },
  LINKEDIN_MESSAGE: {
    name: 'linkedin',
    color: 'darkBloobirds',
  },
  AUTOMATED_EMAIL: {
    name: 'autoMail',
    color: 'tangerine',
  },
  CUSTOM_TASK: {
    name: 'taskAction',
    color: 'bloobirds',
  },
};

const ACTIONS_NAME = {
  PHONE_CALL: 'call',
  EMAIL: 'email',
  LINKEDIN_MESSAGE: 'linkedin',
  AUTOMATED_EMAIL: 'auto-mail',
  CUSTOM_TASK: 'task',
};

const cadenceActionTypesExtension = [
  {
    enumName: 'PHONE_CALL',
    name: 'Phone Call',
    key: 'phoneCall',
    autoEmail: false,
  },
  {
    enumName: 'EMAIL',
    name: 'Email',
    key: 'email',
    autoEmail: false,
  },
  {
    enumName: 'LINKEDIN_MESSAGE',
    name: 'LinkedIn Message',
    key: 'linkedinMessage',
    autoEmail: false,
  },
  {
    enumName: 'AUTOMATED_EMAIL',
    name: 'Automated email',
    key: 'automatedEmail',
    autoEmail: true,
  },
];

const cadenceActionTypesWebapp = [
  {
    enumName: 'PHONE_CALL',
    name: 'Phone Call',
    key: 'phoneCall',
    autoEmail: false,
  },
  {
    enumName: 'EMAIL',
    name: 'Email',
    key: 'email',
    autoEmail: false,
  },
  {
    enumName: 'AUTOMATED_EMAIL',
    name: 'Automated email',
    key: 'automatedEmail',
    autoEmail: true,
  },
  {
    enumName: 'LINKEDIN_MESSAGE',
    name: 'LinkedIn Message',
    key: 'linkedinMessage',
    autoEmail: false,
  },
  {
    enumName: 'CUSTOM_TASK',
    name: 'Custom Task',
    key: 'customTask',
    autoEmail: false,
  },
];

const CadenceCircle = ({
  actions,
  action,
  displayDropdown,
  openDropdown,
  closeDropdown,
  setPreviewTemplate,
}: {
  actions: any;
  action: any;
  displayDropdown: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  setPreviewTemplate: ({ open, templateId }: { open: boolean; templateId: string }) => void;
}) => {
  const { customTasks } = useCustomTasks({ disabled: true });
  const actionToCheck = actions?.find(actionPerDay =>
    actionPerDay?.actionTypes?.includes(action?.enumName),
  );

  const isAutoEmail = actionToCheck?.actionTypes?.includes('AUTOMATED_EMAIL');
  const isCustomTask = actionToCheck?.actionTypes?.includes('CUSTOM_TASK');

  const handleClick = () => {
    if (isAutoEmail && actionToCheck?.emailTemplateId) {
      const templateId = actionToCheck.emailTemplateId;

      setPreviewTemplate({ open: true, templateId });
    }
  };

  const numOfActions = actions.filter(a => a.actionTypes.includes(action?.enumName)).length;
  const ref = useRef();
  useClickAway(ref, closeDropdown);
  return actionToCheck ? (
    isCustomTask ? (
      <Dropdown
        visible={displayDropdown}
        anchor={
          <span
            className={clsx(styles._marker, styles[`_marker_${action?.enumName.toLowerCase()}`], {
              [styles._hover_cursor]: isAutoEmail,
            })}
            ref={ref}
            onClick={displayDropdown ? closeDropdown : openDropdown}
          >
            {numOfActions > 1 ? numOfActions : undefined}
          </span>
        }
      >
        <div className={styles.custom_tasks_dropdown} ref={ref}>
          {actions.map(ac => {
            const customTask = customTasks?.find(ct => ct.id === ac.customTaskId);
            return customTask ? (
              <div
                key={`custom_task-${ac.customTaskId}`}
                className={styles.custom_tasks_dropdown_task}
              >
                <div className={styles.custom_tasks_dropdown_task_icon}>
                  <span
                    className={clsx(styles._marker)}
                    style={{ borderColor: `var(--${customTask.iconColor})` }}
                  >
                    <Icon name={customTask.icon} color={customTask.iconColor} />
                  </span>
                </div>
                <div>
                  <Text size="xxs">{customTask.name}</Text>
                  <Text size="xxs" color="softPeanut">
                    {customTask.description}
                  </Text>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </Dropdown>
    ) : (
      <Tooltip title={removeHtmlTags(actionToCheck.description)} position="bottom">
        <span
          className={clsx(styles._marker, styles[`_marker_${action?.enumName.toLowerCase()}`], {
            [styles._hover_cursor]: isAutoEmail,
          })}
          onClick={handleClick}
        />
      </Tooltip>
    )
  ) : null;
};

export const CadencePreview = ({
  cadenceId,
  isChromeExtension = false,
  fullWidth = false,
}: {
  cadenceId: string;
  isChromeExtension?: boolean;
  fullWidth?: boolean;
}) => {
  const { steps: cadenceSteps } = useCadenceSteps(cadenceId);
  const [days, setDays] = useState([]);
  const [displayDropdown, setDisplayDropdown] = useState<string>(undefined);
  const [numberOfDays, setNumberOfDays] = useState(10);
  const sliderRef = useRef();
  const [mouseDown, setMouseDown] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState({ open: false, templateId: null });
  const { t } = useTranslation('translation', { keyPrefix: 'cadence.cadencePreview' });

  const cadenceActionTypes = isChromeExtension
    ? cadenceActionTypesExtension
    : cadenceActionTypesWebapp;

  useEffect(() => {
    if (!isEqual(days, cadenceSteps)) setDays(cadenceSteps);
  }, [cadenceSteps]);

  useEffect(() => {
    if (days?.length > 0) {
      const daysNumbers = days.map(day => day?.dayNumber);
      const maxNumberOfDay = Math.max(...daysNumbers) + 1;

      setNumberOfDays(maxNumberOfDay < 10 ? 10 : maxNumberOfDay);
    }
  }, [days]);

  const startDragging = e => {
    setMouseDown(true);
    // @ts-ignore
    sliderRef.current.startX = e.pageX - sliderRef.current.offsetLeft;
    // @ts-ignore
    sliderRef.current.currentScrollLeft = sliderRef.current.scrollLeft;
  };

  const dragging = e => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    // @ts-ignore
    const x = e.pageX - sliderRef.current.offsetLeft;
    // @ts-ignore
    const scroll = x - sliderRef.current.startX;
    // @ts-ignore
    sliderRef.current.scrollLeft = sliderRef.current.currentScrollLeft - scroll;
  };

  const stopDragging = () => {
    setMouseDown(false);
  };

  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: numberOfDays || 0,
    parentRef: sliderRef,
    estimateSize: React.useCallback(() => 68, []),
    overscan: 5,
  });

  const onScrollTo = index => {
    columnVirtualizer.scrollToIndex(index, { align: 'end' });
  };

  function handleClose() {
    setPreviewTemplate({ open: false, templateId: undefined });
  }

  const rowClasses = clsx(styles._row, { [styles._row_extension]: isChromeExtension });

  return (
    <div
      className={styles._container}
      style={fullWidth ? { maxWidth: `calc(${columnVirtualizer.totalSize}px + 178px)` } : undefined}
    >
      <div className={clsx(styles._column, styles._first_column)}>
        <div className={rowClasses} />
        {cadenceActionTypes?.map(cadenceAction => {
          const actionConfig = ACTIONS_ICONS[cadenceAction?.enumName];
          return (
            <div className={rowClasses} key={cadenceAction?.enumName}>
              <Icon name={actionConfig?.name || 'noteAction'} color={actionConfig?.color} />
              <Text size="xs" color="softPeanut" uppercase>
                {t(ACTIONS_NAME[cadenceAction?.enumName] || cadenceAction?.name)}
              </Text>
            </div>
          );
        })}
      </div>
      <div>
        <div className={rowClasses}>
          <IconButton
            name="chevronFirst"
            color="bloobirds"
            size={16}
            onClick={() => onScrollTo(0)}
            disabled={numberOfDays <= 10}
          />
        </div>
        {cadenceActionTypes?.map((type, index) => (
          <div key={`empty-row-left-${index}`} className={rowClasses} />
        ))}
      </div>
      <div
        className={styles._scrollable}
        ref={sliderRef}
        onMouseDown={startDragging}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={dragging}
      >
        <div
          style={{
            width: `${columnVirtualizer.totalSize}px`,
            height: '100%',
            position: 'relative',
          }}
        >
          {columnVirtualizer.virtualItems.map(virtualColumn => {
            const day = virtualColumn?.index + 1;
            const actions = days?.filter(
              currentDay => currentDay?.dayNumber === virtualColumn.index,
            );

            return (
              <div
                key={virtualColumn.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${virtualColumn.size}px`,
                  transform: `translateX(${virtualColumn.start}px)`,
                }}
                className={styles._column}
                id={`day-${day}`}
              >
                <div className={rowClasses}>
                  <Text size="xxs" color="softPeanut">
                    {`${t('day')} ${day}`}
                  </Text>
                </div>
                {cadenceActionTypes?.map(action => {
                  const key = `day-${day}-action-${action.name}`;
                  return (
                    <div className={rowClasses} key={`action-${action?.enumName}`}>
                      <CadenceCircle
                        action={action}
                        actions={actions}
                        displayDropdown={displayDropdown === `day-${day}-action-${action.name}`}
                        openDropdown={() => setDisplayDropdown(key)}
                        closeDropdown={() => setDisplayDropdown(undefined)}
                        setPreviewTemplate={setPreviewTemplate}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles._column}>
        <div className={rowClasses}>
          <IconButton
            name="chevronLast"
            color="bloobirds"
            size={16}
            onClick={() => onScrollTo(numberOfDays - 1)}
            disabled={numberOfDays <= 10}
          />
        </div>
        {cadenceActionTypes?.map((types, index) => (
          <div key={`empty-row-right-${index}`} className={rowClasses} />
        ))}
      </div>
      {previewTemplate.open && (
        <PreviewTemplateModal templateId={previewTemplate.templateId} onClose={handleClose} />
      )}
    </div>
  );
};
