import React, { useEffect, useState } from 'react';
import styles from '../filtersModal.module.css';
import { Button, Checkbox, IconButton, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useFiltersSettings } from '../../../hooks/useFiltersModal';
export const FiltersSettings = ({
  onBack,
  onClose,
}: {
  onBack: () => void;
  onClose: () => void;
}) => {
  const { showHiddenValuesReports, showHiddenValuesDashboards, save } = useFiltersSettings();

  const [reports, setReports] = useState<boolean>(showHiddenValuesReports);
  const [dashboards, setDashboards] = useState<boolean>(showHiddenValuesDashboards);
  const { createToast } = useToasts();
  const saveSettings = () => {
    if (reports !== showHiddenValuesReports || dashboards !== showHiddenValuesDashboards) {
      save(reports, dashboards);
    }
    createToast({ message: 'Settings have been updated', type: 'success' });
    onBack();
  };

  useEffect(() => {
    setDashboards(showHiddenValuesDashboards);
    setReports(showHiddenValuesReports);
  }, [showHiddenValuesDashboards, showHiddenValuesReports]);

  return (
    <>
      <div className={styles._categories_content}>
        <div className={styles._header_wrapper}>
          <Button iconLeft="arrowLeft" size="small" variant="clear" onClick={onBack}>
            Back
          </Button>
          <div className={styles._header_icons}>
            <IconButton name="cross" size={24} color="peanut" onClick={onClose} />
          </div>
        </div>
        <div className={styles.settings_content}>
          <Text size="l">Display disabled values on lists</Text>
          <Text size="s" color="softPeanut" className={styles.settings_info}>
            <strong>Hiding disabled</strong> values means that you will no longer be able to{' '}
            <strong>filter by</strong> them on reports and/or dashboards. However,{' '}
            <strong>total results won’t be affected</strong> by this change.
          </Text>
          <Checkbox checked={reports} onClick={value => setReports(value)} size="small">
            Show disabled values in Reports
          </Checkbox>
          <Checkbox checked={dashboards} onClick={value => setDashboards(value)} size="small">
            Show disabled values in Dashboards
          </Checkbox>
        </div>
      </div>
      <div className={styles.settings_footer}>
        <Button expand className={styles.settings_button} onClick={saveSettings}>
          Save settings
        </Button>
      </div>
    </>
  );
};
