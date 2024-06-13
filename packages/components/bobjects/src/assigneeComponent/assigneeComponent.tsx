import { CircularBadge, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useUserSearch } from '@bloobirds-it/hooks';
import { BobjectField } from '@bloobirds-it/types';

import styles from './card.module.css';

export const AssigneeComponent = ({
  value,
  extra,
  size = 's',
}: {
  value: BobjectField | string;
  extra?: string;
  size?: 'small' | 'medium' | 'large' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
}) => {
  const users = useUserSearch();
  const author = users?.users?.find(user =>
    typeof value === 'string' ? user?.id === value : user?.id === value?.value,
  );
  const title = extra ? extra + author?.name : author?.name;

  return (
    <div className={styles._assigned_circle}>
      <Tooltip title={title || 'Unassigned'} position="top">
        <CircularBadge
          size={size}
          color="lightPeanut"
          style={{
            color: author?.color ? 'var(--white)' : 'var(--peanut)',
            fontSize: '8px',
          }}
          backgroundColor={author?.color || 'lightPeanut'}
        >
          {author?.shortname || 'U'}
        </CircularBadge>
      </Tooltip>
    </div>
  );
};
