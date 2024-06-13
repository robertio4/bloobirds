import React from 'react';

import { TagType } from '@bloobirds-it/types';

import { ListTag } from '../../listTag';
import styles from './listTagWrapper.module.css';

type ListTagWrapperProps = {
  tags: TagType[];
  handleClick: (params: any) => void;
  type: string;
};

export const ListTagWrapper = ({ tags, handleClick, type }: ListTagWrapperProps) => {
  return (
    <>
      {tags &&
        tags.map((tag, index) => {
          const key = `tag-${tag.id || index}`;
          return (
            <div className={styles._tag__container} key={`tag-${key}`}>
              <ListTag handleClick={handleClick} tag={tag} type={type} />
            </div>
          );
        })}
    </>
  );
};
