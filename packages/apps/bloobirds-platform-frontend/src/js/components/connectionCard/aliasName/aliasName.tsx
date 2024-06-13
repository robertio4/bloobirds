import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Input, Text } from '@bloobirds-it/flamingo-ui';
import { useEmailConnections } from '@bloobirds-it/hooks';

import { useHover } from '../../../hooks';
import { isEmail } from '../../../misc/utils';
import { NylasAlias } from '../../../typings/connections';
import styles from './aliasName.module.css';

export const AliasName = ({ alias }: { alias: NylasAlias }) => {
  const [isEdition, setIsEdition] = useState<boolean>();
  const [emailAlias, setEmailAlias] = useState<string>(alias?.emailAlias);
  const [ref, isHover] = useHover();
  const { removeAlias, updateAlias } = useEmailConnections();
  const [error, setError] = useState<boolean>(false);

  const { t } = useTranslation();
  useEffect(() => {
    if (emailAlias?.length > 0 && !isEmail(emailAlias)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [emailAlias]);

  const handleUpdateAlias = () => {
    updateAlias(alias.id, {
      emailAlias: emailAlias,
    });
    setIsEdition(false);
  };

  const handleRemoveAlias = () => {
    removeAlias(alias.id);
  };

  return (
    <div ref={ref} className={styles.container}>
      {isEdition ? (
        <>
          <Input
            value={emailAlias}
            onChange={setEmailAlias}
            size="small"
            error={error && t('validation.email')}
          />
          <IconButton name="check" size={16} onClick={handleUpdateAlias} />
        </>
      ) : (
        <Text key={alias?.id} size="xs">
          {alias?.emailAlias}
        </Text>
      )}
      {isHover && (
        <>
          {!isEdition && <IconButton name="edit" size={16} onClick={() => setIsEdition(true)} />}
          <IconButton name="cross" color="tomato" size={16} onClick={handleRemoveAlias} />
        </>
      )}
    </div>
  );
};
