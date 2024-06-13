import { ServiceApi } from '../../../../../misc/api/service';
import { RELATIVE_DATES_OPTIONS } from '../../../viewEditionModal/viewEdition.constants';
import { SaveListBody, SaveListParams, Tag } from './saveEditModal.typing';
import { BobjectTableColumn } from '../../../useBobjectTable';

const getSelectedColumns = (columns: BobjectTableColumn[]) => {
  return columns.map(column => ({
    bobjectFieldId: column,
  }));
};

export const getFilters = (filters: any) => {
  if (!filters) {
    return undefined;
  }
  return Object.getOwnPropertyNames(filters).map(key => {
    let values = filters[key];
    const searchType = filters[key][0].type;
    if (!Array.isArray(values) && values !== undefined && values !== null) {
      values = [values.value ? values.value : values];
    }
    if ((values[0].value || values[0].value === '') && !Array.isArray(values[0].value)) {
      if (
        searchType === 'RANGE__SEARCH__BETWEEN' ||
        searchType === 'RANGE__SEARCH__BETWEEN__DATES'
      ) {
        values =
          Object.keys(RELATIVE_DATES_OPTIONS).includes(values[0].value?.type) ||
          Object.keys(RELATIVE_DATES_OPTIONS).includes(values[0].value)
            ? [values[0].value.type || values[0].value]
            : [
                values[0].value.start || values[0].value.split(',')[0],
                values[0].value.end || values[0].value.split(',')[1],
              ];
      } else if (searchType.match('^__\\w*__$')) {
        values = [searchType];
      } else {
        values = [values[0].value];
      }
    } else {
      values = values[0].value || [values[0]];
    }
    return {
      bobjectFieldId: key,
      values: values || null,
      searchType: searchType || '',
    };
  });
};

const getTags = (tags: Tag[]) => tags.map(tag => tag.value);

const makeBody = ({
  id,
  bobjectType,
  filter,
  columns,
  viewName,
  sort,
  viewVisibility,
  tags,
  sortDirection,
}: SaveListParams): SaveListBody => ({
  id,
  type: bobjectType,
  filters: getFilters(filter),
  columns: getSelectedColumns(columns),
  name: viewName,
  sort,
  visibility: viewVisibility,
  tags: getTags(tags),
  sortDirection,
});

export const saveView = (
  props: SaveListParams,
  goToView: (id: string) => void,
  handleCloseModal: () => void,
  loadViewFromPayload: (payload: any) => void,
) =>
  ServiceApi.request({
    url: '/service/view/bobjectview',
    method: 'POST',
    body: makeBody({ ...props, id: undefined }),
  }).then(payload => {
    handleCloseModal();
    loadViewFromPayload(payload);
    goToView(payload.bobjectView.id);
  });

export const editView = (
  props: SaveListParams,
  goToView: (id: string) => void,
  handleCloseModal: () => void,
  loadViewFromPayload: (payload: any) => void,
) =>
  ServiceApi.request({
    url: '/service/view/bobjectview',
    method: 'POST',
    body: makeBody(props),
  }).then(payload => {
    handleCloseModal();
    loadViewFromPayload(payload);
    goToView(payload.bobjectView.id);
  });

type DeleteViewProps = {
  id: string;
  history: any;
  handleCloseModal: () => void;
};
export const deleteView = ({ id, history, handleCloseModal }: DeleteViewProps) => {
  ServiceApi.request({
    url: `/service/view/bobjectview/${id}`,
    method: 'DELETE',
  }).then(() => {
    handleCloseModal();
    history.push('/app/cl/lists');
  });
};
