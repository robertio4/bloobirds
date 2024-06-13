import { Tag } from '../saveEditModal.typing';

export const findExistingTags = (tagToFind: string, tags: Tag[]) => {
  const regex = new RegExp(`${tagToFind}.*`, 'i');
  return tagToFind && tags?.filter(tag => regex.test(tag.value));
};

export const findThisTag = (tagToFind: string, tags: Tag[]) =>
  tagToFind && tags?.filter(tag => tagToFind.toLowerCase() === tag.value.toLowerCase());

export const createOrFindTags = (tags: Tag[], tagToCreate: string): Tag => {
  const tagsFiltered = findExistingTags(tagToCreate, tags);
  if (tagsFiltered && tagsFiltered.length > 0) {
    return tagsFiltered[0];
  }
  return {
    id: undefined,
    value: tagToCreate,
  };
};
