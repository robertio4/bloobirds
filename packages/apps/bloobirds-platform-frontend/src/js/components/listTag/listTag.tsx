import React from 'react';

import { IconType, Tag, Tooltip } from '@bloobirds-it/flamingo-ui';
import { TagType } from '@bloobirds-it/types';

import { ellipsis } from '../../utils/strings.utils';

const MAX_LENGTH = 12;

type ListTagProps = {
  handleClick: (tag: TagType) => void;
  tag: TagType;
  active?: boolean;
  type?: string;
};

export const ListTag = ({ active = false, handleClick = () => {}, tag, type }: ListTagProps) => {
  if (!tag) {
    return null;
  }
  let tagProps;

  if (type === 'add') {
    tagProps = {
      active: true,
      iconLeft: 'add' as IconType,
      onClick: () => handleClick(tag),
    };
  } else if (type === 'filter') {
    tagProps = {
      active,
      onClick: () => handleClick(tag),
    };
  } else {
    tagProps = {
      active: false,
      iconLeft: 'cross' as IconType,
      onClickLeft: () => handleClick(tag),
    };
  }

  const { value: text = '' } = tag;
  const contentWithEllipsis = (
    <Tooltip title={text.toUpperCase()} position="top">
      <Tag {...tagProps}>{ellipsis(text, MAX_LENGTH)}</Tag>
    </Tooltip>
  );
  const contentWithoutEllipsis = <Tag {...tagProps}>{text}</Tag>;
  const needsEllipsis = text && text.length > MAX_LENGTH;

  return needsEllipsis ? contentWithEllipsis : contentWithoutEllipsis;
};
