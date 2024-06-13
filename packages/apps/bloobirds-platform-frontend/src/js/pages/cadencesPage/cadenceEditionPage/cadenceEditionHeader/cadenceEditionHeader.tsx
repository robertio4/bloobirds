import React, { useEffect, useState } from 'react';

import { CadencePreview } from '@bloobirds-it/cadence';
import { Icon, Label, Switch, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import { useQueryParam } from '../../../../hooks/useQueryParams';
import { api } from '../../../../utils/api';
import { CADENCE_EDIT_PERMISSIONS } from '../../components/createEditCadenceSettings/createEditCadenceSettings';
import styles from '../cadenceEditionPage.module.css';
import { CadenceTagsBlock } from './cadenceTags/cadenceTagsBlock';
import { CadenceObject } from "@bloobirds-it/types";

type CadenceEditionHeaderProps = {
  id: string;
  cadence: CadenceObject;
  canEditCadence: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const CadenceEditionHeader = ({ id, canEditCadence, ...props }: CadenceEditionHeaderProps) => {
  return (
    <>
      <CadenceInfoHeader canEditCadence={canEditCadence} {...props} />
      <CadenceTagsBlock canEditCadence={canEditCadence} cadenceTags={props?.cadence?.tags} />
      <div className={styles._cadence__preview}>
        {!canEditCadence && <div className={styles._disabled_overlay} />}
        <CadencePreview cadenceId={id} isChromeExtension={false} fullWidth={true} />
      </div>
    </>
  );
};

const CadenceInfoHeader = ({
  cadence,
  canEditCadence,
  setIsModalOpen,
}: Partial<CadenceEditionHeaderProps>) => {
  const isDefaultCadence = cadence?.defaultCadence;
  const [isEnabled, setIsEnabled] = useState(cadence?.enabled);
  const name = useQueryParam('name');
  const permissionsText =
    cadence?.editMode === CADENCE_EDIT_PERMISSIONS.EVERYONE
      ? {
          label: 'Editable by everyone',
          tooltip: 'Everyone will be able to edit it and make changes',
        }
      : {
          label: 'Editable by owner',
          tooltip: 'Only the owner is able to edit it and make changes',
        };

  const getStatusTooltip = () => {
    let text = '';

    if (isDefaultCadence) {
      text = 'The default cadence can not be disabled';
    }
    return text;
  };

  const handleToggleEnabled = async () => {
    await api.put(`/messaging/cadences/${cadence.id}/${isEnabled ? 'disable' : 'enable'}`);
    setIsEnabled(!isEnabled);
  };

  const handleOpenSettings = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setIsEnabled(cadence?.enabled);
  }, [cadence]);

  return (
    <div>
      <Text size="l" color="peanut">
        {cadence?.name || name}{' '}
        {isDefaultCadence && <Icon name="starChecked" color="softBanana" size={16} />}
      </Text>
      <span className={styles._right__actions} style={{ minWidth: '340px' }}>
        <Tooltip title={permissionsText.tooltip} position="top">
          <Label size="small" color="veryLightBloobirds" textColor="bloobirds" uppercase={false}>
            {permissionsText.label}
          </Label>
        </Tooltip>
        <div className={styles._settings_button__container}>
          <a
            className={clsx(styles._link__button, {
              [styles._disabled_link__button]: !canEditCadence,
            })}
            onClick={canEditCadence ? handleOpenSettings : null}
          >
            Settings
          </a>
          <Icon size={16} name="settings" color={canEditCadence ? 'bloobirds' : 'lightBloobirds'} />
        </div>
        <Tooltip title={getStatusTooltip()} position="top">
          <Switch
            checked={isEnabled}
            disabled={!canEditCadence || isDefaultCadence}
            onChange={handleToggleEnabled}
            color="bloobirds"
          />
        </Tooltip>

        <Text size="s" color="peanut">
          Enabled
        </Text>
      </span>
    </div>
  );
};

export default CadenceEditionHeader;
