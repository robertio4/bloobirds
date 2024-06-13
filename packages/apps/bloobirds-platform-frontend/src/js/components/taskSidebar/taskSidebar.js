import React, { useRef } from 'react';
import styles from './taskSidebar.module.css';
import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useHover, useRouter } from '../../hooks';
import { useRouteMatch } from 'react-router';
import { isCompanyTasksPage, isMatchingRoute } from '../../utils/pages.utils';

export const TaskTab = ({
  children,
  icon,
  counter,
  route,
  colors = {},
  onClick = () => {},
  name,
}) => {
  const { history, pathname } = useRouter();
  const isSelected =
    isMatchingRoute(route, pathname) ||
    useRouteMatch(route) ||
    (isCompanyTasksPage(pathname) && isCompanyTasksPage(route));
  const outsideRef = useRef();
  const [, isHover] = useHover({ outsideRef });
  const isHighlighted = isSelected || isHover;
  return (
    <div
      className={styles._task__container}
      style={isHighlighted ? { backgroundColor: `var(--${colors.basic})` } : {}}
      onClick={() => {
        onClick();
        history.push(route);
      }}
      ref={outsideRef}
      data-test={`Button-Task-${name}`}
    >
      <Icon name={icon} color={isHighlighted ? colors.contrast : 'peanut'} />
      {counter > 0 && (
        <div className={styles._task__counter}>{counter < 100 ? counter : '+99'}</div>
      )}
      <Text
        dataTest={name}
        size="xs"
        color={colors.isDark && isHighlighted ? colors.contrast : 'peanut'}
      >
        {children}
      </Text>
    </div>
  );
};

const TaskSidebar = ({ children }) => <div className={styles._container}>{children}</div>;

export default TaskSidebar;
