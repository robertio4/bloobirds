import React, { useEffect, useMemo, useState } from 'react';

import { Button, Tag, Text, useHover } from '@bloobirds-it/flamingo-ui';
import { CadenceTagType, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
// @ts-ignore
import { v4 as uuid } from 'uuid';

import { useQueryParam } from '../../../../../hooks/useQueryParams';
import { useManageCadenceList } from '../../../components/cadenceList/useManageCadenceList';
import AutoSizeTag from './autoSizeTag';
import styles from './cadenceTagsBlock.module.css';
import { useCadenceTags } from './useCadenceTags';

type CadenceTagsBlockProps = { canEditCadence: boolean; cadenceTags: string[] };
function getTagWithId(tag: string | CadenceTagType) {
  if (typeof tag === 'string') {
    return { name: tag, id: uuid() };
  }
  return tag;
}

export const CadenceTagsBlock = ({ canEditCadence, cadenceTags = [] }: CadenceTagsBlockProps) => {
  const [selectedTags, setSelectedTags] = useState<CadenceTagType[]>([]);
  const { cadenceTags: allCadenceTags } = useCadenceTags();
  const [addTagVisible, setAddTagVisible] = useState(false);
  const cadenceId = useQueryParam('cadence');
  const {
    selectedTags: filterSelectedTags,
    setSelectedTags: setFilterSelectedTags,
  } = useManageCadenceList();

  const handelAddTags = async (tags: CadenceTagType[]) => {
    setSelectedTags(tags);
    const parsedTags = tags.map(t => t.name);
    return await api.put<Array<CadenceTagType>>(
      `/messaging/cadences/${cadenceId}/tags`,
      parsedTags,
    );
  };

  const onAddCallback = async (tag: string | CadenceTagType) => {
    setAddTagVisible(false);
    if (typeof tag === 'string' && !tag?.length) return;
    const tagsToSet = [...selectedTags, getTagWithId(tag)];
    await handelAddTags(tagsToSet);
  };

  const handleRemoveTag = async (tag: CadenceTagType) => {
    const tagsToSet = selectedTags.filter(t => t.name !== tag.name);
    if (filterSelectedTags?.includes(tag.name)) {
      setFilterSelectedTags(filterSelectedTags.filter((t: CadenceTagType) => t !== tag.name));
    }
    await handelAddTags(tagsToSet);
  };

  const unSelectedCadenceTags = useMemo(
    () => allCadenceTags.filter(tag => !selectedTags.map(t => t?.name).includes(tag?.name)),
    [selectedTags, allCadenceTags],
  );

  useEffect(() => {
    const parsedCadenceTags = cadenceTags.reduce((acc, tag) => {
      const foundTag = allCadenceTags.find(t => t.name === tag);
      if (foundTag) {
        acc.push(foundTag);
      }
      return acc;
    }, []);
    setSelectedTags(parsedCadenceTags);
  }, [cadenceTags, allCadenceTags]);

  return (
    <>
      <div className={styles.container}>
        <Text color="peanut" size="s" className={styles.title}>
          Tags:
        </Text>
        {selectedTags?.length > 0 ? (
          selectedTags.map((tag: CadenceTagType, idx: number) => (
            <CadenceTag key={tag?.id + '_' + idx} tag={tag} handleRemoveTag={handleRemoveTag} />
          ))
        ) : (
          <Text color="softPeanut" size="s" className={styles.title}>
            Add tags to filter your cadences
          </Text>
        )}
        {addTagVisible ? (
          <AutoSizeTag cadenceTags={unSelectedCadenceTags} onAddCallback={onAddCallback} />
        ) : (
          <Button
            disabled={!canEditCadence}
            variant="clear"
            iconLeft="plus"
            size="small"
            onClick={() => {
              setAddTagVisible(true);
              mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ADD_CADENCE_TAG);
            }}
            uppercase={false}
          >
            Add tag
          </Button>
        )}
      </div>
    </>
  );
};

export const CadenceTag = ({
  tag,
  handleRemoveTag,
  handleAddTag,
}: {
  tag: CadenceTagType;
  handleAddTag?: (tag: CadenceTagType) => void;
  handleRemoveTag?: (tag: CadenceTagType) => void;
}) => {
  const [ref, isHovering] = useHover();

  return (
    <div
      ref={ref}
      className={clsx(styles.tagWrapper, { [styles.tagWrapperClickable]: handleAddTag })}
      onClick={handleAddTag ? () => handleAddTag(tag) : undefined}
    >
      <Tag
        iconLeft={handleAddTag ? 'plus' : undefined}
        uppercase={false}
        active={handleAddTag && isHovering}
      >
        {tag.name}
      </Tag>
      {handleRemoveTag && isHovering && (
        <Button
          variant="clear"
          iconLeft="cross"
          color="veryLightBloobirds"
          className={styles.deleteTagButton}
          onClick={
            handleRemoveTag
              ? () => {
                  handleRemoveTag(tag);
                  mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_REMOVE_CADENCE_TAG);
                }
              : undefined
          }
        />
      )}
    </div>
  );
};
