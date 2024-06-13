import React, { useEffect } from 'react';

import { useGetUserHelpers } from '../../hooks/useUserHelpers';
import { ServiceApi } from '../../misc/api/service';
import { PERMISSIONS_FETCH_DATA_ERROR, PERMISSIONS_FETCH_DATA_SUCCESS } from './actions';
import UserSettingsContext from './context';
import reducer from './reducer';

export const UserPermissionContext = ({ children }) => {
  const [state, dispatch] = reducer();
  const { helpers } = useGetUserHelpers();

  const reloadUserSettings = () => {
    ServiceApi.request({
      url: '/service/users/settings',
      method: 'GET',
    })
      .then(data => dispatch({ type: PERMISSIONS_FETCH_DATA_SUCCESS, data }))
      .catch(error => dispatch({ type: PERMISSIONS_FETCH_DATA_ERROR, error }));
  };
  useEffect(reloadUserSettings, []);
  const newState = !state.dataFetch
    ? { ...state }
    : { ...state, data: { ...state.data, userHelpers: helpers } };

  return (
    <UserSettingsContext.Provider
      value={{
        state: { ...newState },
        dispatch,
        reloadUserSettings,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};
