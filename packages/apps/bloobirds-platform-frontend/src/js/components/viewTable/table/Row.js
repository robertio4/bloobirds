import React, { useState } from 'react';

import { Skeleton, Text } from '@bloobirds-it/flamingo-ui';
import { TableRow } from '@material-ui/core';
import classNames from 'clsx';
import { format } from 'date-fns';

import Cell from '../../bobjectTable/table/layout/Cell';
import LinkRow from '../../bobjectTable/table/layout/linkRow';
import { getViewUrl } from '../../bobjectTable/utils/bobjectTable.utils';
import { ListTag } from '../../listTag';
import styles from './row.module.css';

const renderTags = ({ expandTags, tags, setExpandTags }) => {
  if (tags.length >= 3 && !expandTags) {
    return (
      <>
        {tags.slice(0, 2).map(tag => (
          <span key={`tag-${tag}`} className={styles._tag__container}>
            <ListTag tag={{ value: tag }} type="filter" />
          </span>
        ))}
        <div
          className={styles._more_options__container}
          onClick={e => {
            e.stopPropagation();
            setExpandTags(true);
          }}
        >
          <Text color="bloobirds" size="m">{`+${tags.length - 2}`}</Text>
        </div>
      </>
    );
  }
  const tagClass = classNames(styles._tag__container, {
    [styles._tag_expanded__container]: expandTags,
  });
  return (
    <div className={styles._expanded_tags_container}>
      {tags.map(tag => (
        <span key={`tag-${tag}`} className={tagClass}>
          <ListTag tag={{ value: tag }} type="filter" />
        </span>
      ))}
    </div>
  );
};

const dataDisplay = (element, column) => {
  if (column.key === 'tags') {
    const [expandTags, setExpandTags] = useState(false);
    return renderTags({ expandTags, tags: element[column.key], setExpandTags });
  }
  if (column.key === 'updateDateTime' || column.key === 'creationDateTime') {
    const date = new Date(element[column.key]);
    return format(date, 'MMMM do, yyyy');
  }
  return element[column.key];
};

export const Row = props => {
  const { element, columns } = props;

  return (
    <TableRow
      className={styles.row}
      component={linkProps => (
        <LinkRow linkProps={linkProps} url={getViewUrl(element)}>
          {linkProps.children}
        </LinkRow>
      )}
    >
      {columns.map(column => (
        <Cell key={column.key}>{dataDisplay(element.bobjectView, column)}</Cell>
      ))}
    </TableRow>
  );
};

export const SkeletonRow = ({ columns }) => (
  <TableRow className={styles.row}>
    {columns?.map(c => (
      <Cell key={c.header}>
        <Skeleton height={16} variant="text" width="100%" />
      </Cell>
    ))}
  </TableRow>
);
