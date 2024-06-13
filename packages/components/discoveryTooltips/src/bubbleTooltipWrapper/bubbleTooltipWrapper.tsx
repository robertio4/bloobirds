import React from 'react';

import { useLocalStorage, useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys, LocalStorageKeys } from '@bloobirds-it/types';

export const BubbleTooltipWrapper = ({
  children,
  alwaysVisible = false,
}: {
  children: JSX.Element;
  alwaysVisible?: boolean;
}) => {
  const { get } = useLocalStorage();
  const { has } = useUserHelpers();

  return get(LocalStorageKeys.IsMenuOpen) &&
    (alwaysVisible || has(ExtensionHelperKeys.TOUR_DONE)) ? (
    children
  ) : (
    <></>
  );
};
