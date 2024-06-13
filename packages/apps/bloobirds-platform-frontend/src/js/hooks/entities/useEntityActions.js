import { RestApi } from '../../misc/api/rest';
import { useToasts } from '@bloobirds-it/flamingo-ui';

export const useEntityActions = () => {
  const { createToast } = useToasts();
  const handleCreateEntity = ({ entityName, label, body, callback = () => {} }) => {
    RestApi.create({
      entity: entityName,
      body,
    })
      .then(res => {
        if (res?.response?.status > 400) {
          callback({
            response: res.response,
            error: true,
          });
        } else {
          callback({
            response: res,
            error: false,
          });
        }
      })
      .catch(err => {
        if (err.response.status === 409) {
          callback({
            response: err.response,
            error: true,
          });
          createToast({
            message: `This ${label} already exists, please use a new one!`,
            type: 'error',
          });
        } else {
          callback({
            response: err.response,
            error: true,
          });
          createToast({
            message: `There was an error creating the ${label}, please try again!`,
            type: 'error',
          });
        }
      });
  };

  const handleUpdateEntity = ({ id, entityName, label, body, callback = () => {} }) => {
    RestApi.patch({
      id,
      entity: entityName,
      body,
    })
      .then(res => {
        if (res?.response?.status > 400) {
          callback({
            response: res.response,
            error: true,
          });
        } else {
          callback({
            response: res,
            error: false,
          });
        }
      })
      .catch(err => {
        if (err.response.status === 409) {
          callback({
            response: err.response,
            error: true,
          });
          createToast({
            message: `This ${label} already exists, please use one of the existing ones!`,
            type: 'error',
          });
        } else {
          callback({
            response: err.response,
            error: true,
          });
          createToast({
            message: `There was an error updating the ${label}, please try again!`,
            type: 'error',
          });
        }
      });
  };

  const handleDeleteEntity = ({ id, entityName, label, callback = () => {} }) => {
    RestApi.delete({
      id,
      entity: entityName,
    })
      .then(res => {
        callback({
          response: res,
          error: false,
        });
      })
      .catch(err => {
        callback({
          response: err.response,
          error: true,
        });
        createToast({
          message: `There was an error deleting the ${label}, please try again!`,
          type: 'error',
        });
      });
  };

  return {
    handleCreateEntity,
    handleUpdateEntity,
    handleDeleteEntity,
  };
};
