import SessionManagerFactory from '../../../misc/session';
import { WebApi } from '../../../misc/api/web';
import { saveAs } from '../../../misc/utils';
import { ServiceApi } from '../../../misc/api/service';
import { api } from '../../../utils/api';

export const searchBulk = (dispatch, action, page, pageRow, textQuery) => {
  api
    .get(
      `/bobjects/bulkAction/search?page=${page || 0}&pageSize=${pageRow || 25}${
        textQuery ? `&textQuery=${textQuery}` : ''
      }`,
    )
    .then(response => dispatch({ type: action, data: response?.data }));
};

export const searchRestApi = (dispatch, action, page, pageRow, textQuery) => {
  ServiceApi.request({
    url: `/service/import/history/search?page=${page || 0}&pageSize=${pageRow || 25}${
      textQuery ? `&textQuery=${textQuery}` : ''
    }`,
    method: 'GET',
  }).then(data => dispatch({ type: action, data }));
};

export const downloadImport = (id, name, reportType) => {
  api
    .get(`/bobjects/bulkAction/${id}/download/${reportType}`, {
      responseType: 'blob',
    })
    .then(response => {
      const blob = new Blob([response?.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
      });
      name = name.replaceAll('.', '_');
      name = name.replaceAll(' ', '_');
      saveAs(blob, name);
    });
};
