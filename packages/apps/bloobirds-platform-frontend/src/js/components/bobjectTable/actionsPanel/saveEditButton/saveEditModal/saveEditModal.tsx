import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router';

import {
  Button,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Tag,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, TagType } from '@bloobirds-it/types';
import Modal from '@material-ui/core/Modal';

import { useEntity, useRouter } from '../../../../../hooks';
import { useUserHelpers } from '../../../../../hooks/useUserHelpers';
import { ListTag } from '../../../../listTag';
import { TagsModal } from '../../../../tagsModal/tagsModal';
import { changeLogicRolesToIds, excludedViewTypes } from '../../../context/bobjectTable.utils';
import { useBobjectTable } from '../../../useBobjectTable';
import { SaveEditActions } from '../saveEditButton.typing';
import styles from './saveEditModal.module.css';
import { deleteView, editView, saveView } from './saveEditModal.utils';

const DEFAULT_TAGS: TagType[] = [
  {
    id: undefined,
    value: 'Quality and Control',
  },
  {
    id: undefined,
    value: 'Inbound',
  },
  {
    id: undefined,
    value: 'Liquidity',
  },
  {
    id: undefined,
    value: 'Insights',
  },
  {
    id: undefined,
    value: 'Results',
  },
];

const findTag = (tagToSearch: { value: string }, tags: { value: string }[]) =>
  tags.some(tag => tag.value.toLowerCase() === tagToSearch.value.toLowerCase());

export const SaveEditModal = ({
  handleCloseModal,
  mode,
}: {
  handleCloseModal: () => void;
  mode: SaveEditActions;
}) => {
  const {
    bobjectType,
    columns,
    direction,
    loadViewFromPayload,
    query,
    sort,
    view: { name, id, visibility, tags },
    viewType,
    setIsModified,
  } = useBobjectTable();
  const { history } = useRouter();
  const location = useLocation();
  const { save: saveHelpers } = useUserHelpers();
  const { createToast } = useToasts();
  const bobjectFields = useEntity('bobjectFields');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');

  const isSaveNewMode = mode === SaveEditActions.SAVE;
  const entityName = viewType === 'MEETINGS' ? 'Meetings' : bobjectType;
  const [viewName, setViewName] = useState(
    name && !isSaveNewMode && viewType !== 'MEETINGS' ? name : `New ${entityName} list`,
  );
  const [viewVisibility, setViewVisibility] = useState(visibility || 'PUBLIC');
  const [selectedTags, setSelectedTags] = useState(tags);
  const [showTagsModal, openTagsModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const save = isSaveNewMode ? saveView : editView;
  const {
    view: { tags: tagsState },
  } = useBobjectTable();

  const removeTag = useCallback(
    tagToRemove => {
      setSelectedTags(selectedTags.filter(tag => tag.value !== tagToRemove.value));
    },
    [selectedTags, setSelectedTags],
  );

  const addTag = useCallback(
    tagToAdd => {
      const isTagInList = findTag(tagToAdd, selectedTags);
      const listOfTags = !isTagInList ? [...selectedTags, tagToAdd] : [...selectedTags];

      setSelectedTags(listOfTags);
    },
    [selectedTags, setSelectedTags],
  );

  const isDeletable = id && !Object.keys(excludedViewTypes).includes(viewType);

  return (
    // @ts-ignore TODO: material-ui
    <Modal open onClose={handleCloseModal}>
      <div className={styles._container}>
        <div className={styles._header}>
          <div className={styles._title}>
            <Text size="xl" weight="regular">
              {isSaveNewMode
                ? 'Create new List'
                : mode === SaveEditActions.UPDATE
                ? 'Update List'
                : 'Edit List Details'}
            </Text>
          </div>
          <div className={styles._close_button}>
            <IconButton name="cross" onClick={handleCloseModal} color="bloobirds" size={40} />
          </div>
        </div>
        <div className={styles._content}>
          <div className={styles._list_name}>
            <Input
              placeholder="List name*"
              onChange={value => setViewName(value)}
              value={viewName}
              error={!viewName && 'Required'}
              width={'300'}
            />
          </div>
          <div className={styles._visibility}>
            <Text size="m" weight="regular" color="gray">
              Who can view and edit?
            </Text>
            <div className={styles._visibility_options}>
              <RadioGroup
                // @ts-ignore
                onChange={checkedValue => setViewVisibility(checkedValue)}
                value={viewVisibility}
              >
                <Radio value="PRIVATE" expand>
                  Only me
                </Radio>
                <Radio value="PUBLIC" expand>
                  Everyone
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <div className={styles._tags_list}>
            <Text size="m" weight="regular" color="gray">
              Tags
            </Text>
            <div className={styles._tags_items}>
              <div className={styles._add_tag_button}>
                <Tag iconLeft="add" active onClick={() => openTagsModal(true)}>
                  Add tag
                </Tag>
              </div>
              {selectedTags &&
                selectedTags.map((tag, index) => {
                  const key = `tag-${tag.id || index}`;
                  return (
                    <div className={styles._tag__container} key={key}>
                      <ListTag handleClick={removeTag} tag={tag} />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className={styles._footer}>
            <Button color="bloobirds" variant="tertiary" onClick={handleCloseModal}>
              Cancel
            </Button>
            {isDeletable && !isSaveNewMode && (
              <Button
                color="tomato"
                variant="tertiary"
                onClick={() => deleteView({ handleCloseModal, history, id })}
              >
                Delete list
              </Button>
            )}
            <Button
              variant="primary"
              disabled={isSubmitting || !viewName}
              onClick={() => {
                setIsSubmitting(true);
                save(
                  {
                    id,
                    bobjectType,
                    filter: changeLogicRolesToIds({
                      query,
                      bobjectFields,
                      bobjectPicklistFieldValues,
                    }),
                    columns,
                    viewName,
                    sort,
                    viewVisibility,
                    tags: selectedTags,
                    sortDirection: direction,
                  },
                  (newId: string) => history.push(`${location.pathname}?viewId=${newId}`),
                  handleCloseModal,
                  loadViewFromPayload,
                ).finally(() => {
                  setIsSubmitting(false);
                  setIsModified(false);
                  saveHelpers(UserHelperKeys.CREATE_FIRST_LIST);
                  createToast({
                    type: 'success',
                    message: !isSaveNewMode ? 'List updated!' : 'List created!',
                  });
                });
              }}
            >
              SAVE
            </Button>
          </div>
        </div>
        {showTagsModal && (
          <TagsModal
            selectedTags={selectedTags}
            removeTag={removeTag}
            addTag={addTag}
            handleCloseModal={() => openTagsModal(false)}
            tagsState={tagsState}
            defaultTags={DEFAULT_TAGS}
          />
        )}
      </div>
    </Modal>
  );
};
