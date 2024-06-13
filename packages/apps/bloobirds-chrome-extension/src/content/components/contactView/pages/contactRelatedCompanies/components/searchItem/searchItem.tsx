import { CircularBadge, IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './searchItem.module.css';

export const SearchItem = ({
  company: { name, website, targetMarket },
  handleOnClick,
  handleDelete,
}: {
  company: {
    name: string;
    website: string;
    targetMarket: { name: string; color: string; shortName: string };
  };
  handleOnClick?: () => void;
  handleDelete?: (childCompany: any) => void;
}) => {
  return (
    <div className={styles._search_item_card}>
      <div className={styles._search_item_container} onClick={handleOnClick}>
        <div className={styles._circular_badge_wrapper}>
          <Tooltip title={targetMarket?.name} trigger="hover" position="top">
            <CircularBadge
              size="medium"
              style={{
                backgroundColor: targetMarket?.color || 'var(--verySoftPeanut)',
                color: 'white',
                height: '32px',
                width: '32px',
              }}
            >
              {targetMarket?.shortName || '?'}
            </CircularBadge>
          </Tooltip>
        </div>
        <div>
          <div className={styles._search_item_text}>
            <Text size="s">{name}</Text>
            <Text size="xs" color="softPeanut">
              {website}
            </Text>
          </div>
        </div>
      </div>
      {handleDelete && <IconButton name="cross" color="softPeanut" onClick={handleDelete} />}
    </div>
  );
};
