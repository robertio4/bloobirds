import { Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import styles from './noResultsPage.module.css';

export interface NoResultsProps {
  title: string;
  description: string;
  actionButton?: JSX.Element;
  sidePeekEnabled?: boolean;
}

export const NoResultsPage = ({
  title,
  description,
  actionButton,
  sidePeekEnabled,
}: NoResultsProps) => {
  const containerClasses = clsx(styles.container, {
    [styles.container_sidePeek]: sidePeekEnabled && window.innerHeight > 800,
  });

  return (
    <div className={containerClasses}>
      <Text size="m" color="peanut" weight="heavy" align="center">
        {title}
      </Text>
      <Text size="s" color="softPeanut" align="center">
        {description}
      </Text>
      {actionButton}
    </div>
  );
};

export default NoResultsPage;
