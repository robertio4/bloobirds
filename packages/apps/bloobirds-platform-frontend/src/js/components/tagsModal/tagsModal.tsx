import React, { useEffect, useRef, useState } from 'react';

import { TagType } from '@bloobirds-it/types';
import Modal from '@material-ui/core/Modal';

import { useEntity } from '../../hooks';
import { ListTagWrapper } from './listTagWrapper/listTagWrapper';
import styles from './tagsModal.module.css';
import { createOrFindTags, findExistingTags, findThisTag } from './tagsModal.utils';

type TagsModalProps = {
  handleCloseModal: () => void;
  selectedTags: TagType[];
  addTag: (tag: TagType) => void;
  removeTag: (tag: TagType) => void;
  tagsState: any;
  defaultTags?: TagType[];
};

export const TagsModal = ({
  handleCloseModal,
  selectedTags,
  addTag,
  removeTag,
  tagsState,
  defaultTags = [],
}: TagsModalProps) => {
  const [findTag, setFindTag] = useState('');
  const tagsEntity = useEntity('tags');
  const all = tagsEntity?.all();
  let allTagsFiltered = tagsEntity && [...all];

  const getDefaultTags = () => {
    selectedTags.forEach(selectedTag => {
      defaultTags = defaultTags?.filter(tag => tag.value !== selectedTag.value);
    });

    return defaultTags;
  };
  const [shownTags, setShownTags] = useState(getDefaultTags());

  const onNewTagAddition = (tag: string, tagsToCheck: TagType[]) => {
    const newTag = createOrFindTags(tagsToCheck, tag);
    addTag(newTag);
    setFindTag('');
  };

  const onReset = () => {
    const defaultTags = getDefaultTags();
    setShownTags(defaultTags);
  };

  useEffect(() => {
    selectedTags.forEach(selectedTag => {
      allTagsFiltered = allTagsFiltered?.filter(tag => tag.id !== selectedTag.id);
    });
    const defaultTags = getDefaultTags();
    setShownTags(defaultTags);
  }, [selectedTags]);

  const textareaRef = useRef(null);

  useEffect(() => {
    const { current: textareaInput } = textareaRef;

    if (textareaInput) {
      textareaInput.focus();
    }
  });

  return (
    // @ts-ignore TODO: material-ui
    <Modal open onClose={handleCloseModal}>
      <div className={styles._container}>
        <div className={styles._header}>
          <textarea
            className={styles._search_tag}
            placeholder="Create or find a tag"
            ref={textareaRef}
            onChange={e => {
              const {
                target: { value },
              } = e;
              setFindTag(value);

              if (!value) {
                onReset();
                return;
              }

              const existingTags = findExistingTags(value, allTagsFiltered);
              const thisTag = findThisTag(value, allTagsFiltered);

              setShownTags(
                thisTag?.length > 0 ? existingTags : existingTags.concat({ id: undefined, value }),
              );
            }}
            onKeyDown={e => {
              const {
                // @ts-ignore
                target: { value },
                shiftKey,
                keyCode,
              } = e;
              if (keyCode === 13 && shiftKey === false) {
                e.preventDefault();
                onNewTagAddition(value, tagsState);
              }
            }}
            value={findTag}
          />
        </div>
        <div className={styles._body}>
          <div className={styles._tags_selected_container}>
            <ListTagWrapper tags={selectedTags} handleClick={removeTag} type={'remove'} />
          </div>
          {shownTags && shownTags.length > 0 && (
            <div className={styles._tags_suggestions}>
              <ListTagWrapper
                tags={shownTags}
                handleClick={tagClicked => {
                  onNewTagAddition(tagClicked.value, tagsState);
                }}
                type="add"
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
