import React from 'react';
import SyncSettingsCard from '../../syncSettingsCard/syncSettingsCard';
import CheckBoxCard from '../checkBoxCard/checkBoxCard';
import { capitalize } from 'lodash/string';

const DeleteSyncSettingsView = ({ crm, config, setConfig, save, saveDisabled }) => {
  const handleClickCheckbox = value => {
    setConfig('deleteObjects', value);
  };

  return (
    <SyncSettingsCard
      icon="trashFull"
      title="Deleting objects"
      crm={crm}
      onSave={() => save('delete')}
      isDisabled={saveDisabled}
    >
      <CheckBoxCard
        text={`If objects are deleted in ${capitalize(crm)}, delete them also in Bloobirds`}
        value={config.deleteObjects}
        onChange={handleClickCheckbox}
        size="small"
      />
    </SyncSettingsCard>
  );
};
export default DeleteSyncSettingsView;
