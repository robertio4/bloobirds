import React, { useEffect } from 'react';
import { Checkbox, Divider } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';
import {
  AccountSettingsSection,
  AccountSettingsSectionContent,
  AccountSettingsSectionSubtitle,
  AccountSettingsSectionTitle,
} from '../../../../../layouts/accountSettingsLayout/accountSettingsSection/accountSettingsSection';
import { useWorkflow } from '../context/workflowsContext';
import styles from './settingsTab.module.css';
import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';

const WorkflowSettingsPage = () => {
  const {
    updateRunOnlyOnce,
    updateAnyoneCanEdit,
    state: { runOnlyOnce, isEnabled, anyoneCanEdit, isLocked },
  } = useWorkflow();

  useEffect(() => {
    mixpanel.track(MIXPANEL_EVENTS.WORKFLOW_CLICKED_ON_SETTINGS_PAGE);
  }, []);

  return (
    <>
      <AccountSettingsSection>
        <AccountSettingsSectionTitle>
          Do you want to trigger only once every object in this workflow?
        </AccountSettingsSectionTitle>
        <AccountSettingsSectionSubtitle>
          <div className={styles._subtitle_run_once}>
            This trigger will only fire once for each object that matches the trigger criteria.
          </div>
        </AccountSettingsSectionSubtitle>
        <AccountSettingsSectionContent>
          <Checkbox
            disabled={isEnabled || isLocked}
            onClick={() => updateRunOnlyOnce(!runOnlyOnce)}
            checked={runOnlyOnce}
          >
            Trigger only once per object
          </Checkbox>
        </AccountSettingsSectionContent>
      </AccountSettingsSection>
      <Divider />
      <AccountSettingsSection>
        <div className={styles._edit_header}>
          <AccountSettingsSectionTitle>
            Do you want to allow other users to edit this workflow?
          </AccountSettingsSectionTitle>
        </div>
        <AccountSettingsSectionSubtitle>
          <div className={styles._subtitle_run_once}>
            Workflow edition will become available to all users.
          </div>
        </AccountSettingsSectionSubtitle>
        <AccountSettingsSectionContent>
          <Checkbox
            disabled={isEnabled || isLocked}
            onClick={() => {
              updateAnyoneCanEdit(!anyoneCanEdit);
            }}
            checked={anyoneCanEdit}
          >
            Allow other users to edit the workflow
          </Checkbox>
        </AccountSettingsSectionContent>
        <div className={styles._bottom_filler} />
      </AccountSettingsSection>
    </>
  );
};

export default WorkflowSettingsPage;
