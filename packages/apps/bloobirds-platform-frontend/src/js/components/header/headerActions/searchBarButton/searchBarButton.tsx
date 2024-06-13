import React from 'react';

import { Button, Text } from '@bloobirds-it/flamingo-ui';
import { useGeneralSearchVisibility } from '@bloobirds-it/hooks';
import clsx from 'clsx';

import styles from './searchBarButton.module.css';

export const SearchBarButton = ({ shortPlaceholder = false }: { shortPlaceholder?: boolean }) => {
  const { toggleVisibility } = useGeneralSearchVisibility();

  const commandText = () => {
    if (shortPlaceholder) {
      return 'Search...';
    }

    if (navigator.appVersion.indexOf('Win') != -1) {
      return 'Search... (Ctrl + K)';
    } else if (navigator.appVersion.indexOf('Mac') != -1) {
      return 'Search... (Cmd⌘ + K)';
    }

    return `Search... `;
  };
  return (
    <Button
      size={'small'}
      variant={'alternative'}
      iconLeft={'search'}
      className={clsx(styles._searchButton, { [styles._shortVersion]: shortPlaceholder })}
      onClick={toggleVisibility}
    >
      <Text className={styles._searchButtonText} size={'xs'} color={'gray'}>
        {commandText()}
      </Text>
    </Button>
  );
};
