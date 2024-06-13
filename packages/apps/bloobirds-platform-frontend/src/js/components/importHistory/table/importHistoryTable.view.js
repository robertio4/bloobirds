import React, { useState } from 'react';

import {
  Button,
  IconButton,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@bloobirds-it/flamingo-ui';
import { useEventSubscription } from '@bloobirds-it/plover';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import spacetime from 'spacetime';

import {
  APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS,
} from '../../../app/_constants/routes';
import { CRM } from '../../../constants/integrations';
import { useRouter } from '../../../hooks';
import useHubspot from '../../../hooks/useHubspot';
import useSalesforce from '../../../hooks/useSalesforce';
import { toSentenceCase } from '../../../utils/strings.utils';
import { useUserPermissions } from '../../userPermissions/hooks';
import { useImportHistoryContext } from '../stateManagement/context';
import { downloadImport } from '../stateManagement/service';
import Buttons from './buttons/buttons.view';
import styles from './importHistoryTable.module.css';

const ProgressBar = ({ importRecord }) => {
  const percentage = Math.min(
    Math.round(
      ((importRecord.failedObjects + importRecord.successObjects) / importRecord.totalObjects) *
        100,
    ),
    100,
  );

  return (
    <div className={styles._progressBar}>
      <p>{percentage}%</p>
      <div style={{ width: `${percentage}%` }} />
    </div>
  );
};

const shouldUpdateRow = (prevProps, nextProps) =>
  !(
    nextProps.hoveredRow !== prevProps.hoveredRow &&
    (nextProps.hoveredRow === nextProps.importRecord.id ||
      prevProps.hoveredRow === prevProps.importRecord.id)
  );

const getStatusLabelColor = importRecord => {
  switch (importRecord.status) {
    case 'Failed':
      return 'softTomato';
    case 'Ongoing':
      return 'softTangerine';
    case 'Stopped':
      return 'softTangerine';
    case 'Completed':
      if (importRecord.failedObjects > 0) {
        return 'banana';
      }
      return 'melon';
    default:
      return 'melon';
  }
};

const IntegrationButtons = ({
  salesforceIntegration,
  hubspotIntegration,
  onClickHubspot,
  onClickSalesforce,
}) => (
  <div style={{ paddingLeft: '8px' }}>
    {salesforceIntegration.active && (
      <IconButton name="salesforce" size="20px" onClick={onClickSalesforce} />
    )}
    {hubspotIntegration.active && (
      <IconButton name="hubspot" size="20px" onClick={onClickHubspot} />
    )}
  </div>
);

IntegrationButtons.propTypes = {
  hubspotIntegration: PropTypes.shape({}),
  onClickHubspot: PropTypes.func,
  onClickSalesforce: PropTypes.func,
  salesforceIntegration: PropTypes.shape({}),
};
const ImportRow = React.memo(
  ({ importRecord, hoveredRow, setHoveredRow, handleStopImports, hasBulkActionsEnabled }) => {
    const [doubleCheck, setDoubleCheck] = useState(false);
    const [confirmStop, setConfirmStop] = useState(false);
    const [importElement, setImportElement] = useState(importRecord);
    const { history } = useRouter();
    const { hubspotIntegration } = useHubspot();
    const { salesforceIntegration } = useSalesforce();
    const isBulkAction = importRecord?.source === 'BULK_ACTION' && importRecord.action !== 'RESYNC';
    const displayDownloadOriginalFile =
      hoveredRow !== importRecord.id || isBulkAction || importRecord.action === 'RESYNC';

    const getOnGoingStatus = data => {
      if (Number.parseInt(data.failCount) === Number.parseInt(data.total)) {
        return 'Failed';
      }
      if (
        Number.parseInt(data.failCount) + Number.parseInt(data.successCount) ===
        Number.parseInt(data.total)
      ) {
        return 'Completed';
      }
      return 'Ongoing';
    };

    const goToLogs = ({ status, integration }) => {
      const query = {
        page: 0,
        pageSize: 25,
        bobjectType: importRecord.bobjectType.toUpperCase(),
        dateRange: 'all_time',
        textSearch: importRecord.id,
        importId: importRecord.id,
        status,
      };
      const queryString = new URLSearchParams(query).toString();
      history.push(
        `${
          integration.type === CRM.SALESFORCE
            ? APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS
            : APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS
        }?${queryString}`,
        { event: importRecord },
      );
    };
    useEventSubscription('bulkAction', data => {
      if (data.bulkHistoryId === importRecord.id) {
        setImportElement(ie => ({
          ...ie,
          successObjects:
            Number.parseInt(data.successCount) > ie.successObjects
              ? Number.parseInt(data.successCount)
              : ie.successObjects,
          failedObjects:
            Number.parseInt(data.failCount) > ie.failedObjects
              ? Number.parseInt(data.failCount)
              : ie.failedObjects,
          status: getOnGoingStatus(data),
        }));
      }
    });

    return (
      <TableRow
        key={`import-${importRecord.id}-${importRecord.bobjectType}`}
        onHover={() => {
          if (!((hoveredRow === importRecord.id) === importRecord.id)) {
            setHoveredRow(importRecord.id);
          }
        }}
      >
        <TableCell className={styles._datetime_cell}>
          {spacetime(`${importRecord.creationDatetime}Z`).format('nice-short')}
        </TableCell>
        <TableCell className={styles._name_cell}>
          <span className={styles._cellTextBlue}>{importRecord.name} </span>
          <IconButton
            size={16}
            className={clsx(styles._icon_button, {
              [styles._hidden]: displayDownloadOriginalFile,
            })}
            name="download"
            onClick={() => downloadImport(importRecord.id, importRecord.name, 'IMPORT')}
          />
        </TableCell>
        {hasBulkActionsEnabled && (
          <TableCell className={styles._action_type_cell} width="118px">
            {toSentenceCase(importRecord.source.replace('_', ' ').toLowerCase())}
          </TableCell>
        )}
        <TableCell className={styles._import_type_cell} width="91px">
          {importRecord.action
            ? importRecord.action.charAt(0).toUpperCase().replace('_', ' ') +
              importRecord.action.slice(1).toLowerCase().replace('_', ' ')
            : 'Create'}
        </TableCell>
        <TableCell className={styles._object_type_cell} width="118px">
          {importRecord.bobjectType}
        </TableCell>
        <TableCell className={styles._status_cell} width="184px">
          {importElement.status === 'Ongoing' ? (
            <div className={styles._statusContainer}>
              <ProgressBar importRecord={importElement} />
              {doubleCheck ? (
                <>
                  {hoveredRow === importRecord.id && (
                    <Button
                      variant="clear"
                      iconLeft="cross"
                      color="tomato"
                      onClick={() => {
                        setDoubleCheck(false);
                        setConfirmStop(true);
                        importRecord.status = 'Stopped';
                        handleStopImports(importRecord.id);
                      }}
                      uppercase
                    >
                      sure?
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {hoveredRow === importRecord.id && !confirmStop && (
                    <Button
                      variant="clear"
                      iconLeft="cross"
                      color="bloobirds"
                      onClick={() => setDoubleCheck(true)}
                      uppercase
                    >
                      stop
                    </Button>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className={styles._label}>
              <Label color={getStatusLabelColor(importElement)}>{importElement.status}</Label>
            </div>
          )}
        </TableCell>
        <TableCell className={styles._success_cell} width="60px">
          <div className={styles._cellDownloadContainer}>
            <p
              className={
                importElement.successObjects > 0 && !isBulkAction
                  ? styles._cellTextBlue
                  : styles._cellTextBlack
              }
            >
              {importElement.successObjects}
            </p>
            {hoveredRow === importRecord.id && importRecord.successObjects > 0 && !isBulkAction && (
              <>
                {importRecord.action === 'RESYNC' ? (
                  <IntegrationButtons
                    salesforceIntegration={salesforceIntegration}
                    onClickSalesforce={() =>
                      goToLogs({ status: 'SUCCESS', integration: salesforceIntegration })
                    }
                    hubspotIntegration={hubspotIntegration}
                    onClickHubspot={() =>
                      goToLogs({ status: 'SUCCESS', integration: hubspotIntegration })
                    }
                  />
                ) : (
                  <Buttons
                    downloadImport={downloadImport}
                    imp={importElement}
                    reportType={'SUCCESS'}
                  />
                )}
              </>
            )}
          </div>
        </TableCell>
        <TableCell className={styles._error_cell} width="60px">
          <div className={styles._cellDownloadContainer}>
            <p
              className={
                importElement.failedObjects > 0 && !isBulkAction
                  ? styles._cellTextBlue
                  : styles._cellTextBlack
              }
            >
              {importElement.failedObjects}
            </p>
            {hoveredRow === importElement.id && importElement.failedObjects > 0 && (
              <>
                {importElement.action === 'RESYNC' ? (
                  <IntegrationButtons
                    salesforceIntegration={salesforceIntegration}
                    onClickSalesforce={() =>
                      goToLogs({ status: 'FAILED', integration: salesforceIntegration })
                    }
                    hubspotIntegration={hubspotIntegration}
                    onClickHubspot={() =>
                      goToLogs({ status: 'FAILED', integration: hubspotIntegration })
                    }
                  />
                ) : (
                  importElement.awsS3FailureFileKey && (
                    <Buttons
                      downloadImport={downloadImport}
                      imp={importElement}
                      reportType={'ERROR'}
                    />
                  )
                )}
              </>
            )}
          </div>
        </TableCell>
        <TableCell className={styles._imported_by_cell} width="118px">
          {importRecord.user}
        </TableCell>
        <TableCell className={styles._imported_by_cell} width="118px">
          {importRecord?.id}
        </TableCell>
      </TableRow>
    );
  },
  shouldUpdateRow,
);

const ImportHistoryTableView = ({ handleStopImport }) => {
  const { bulkActions: hasBulkActionsPermission } = useUserPermissions();
  const {
    state: { imports, importsUpdated },
  } = useImportHistoryContext();
  const [hoveredRow, setHoveredRow] = useState(undefined);
  return (
    <div onMouseLeave={() => setHoveredRow(undefined)}>
      <Table className={styles.tableContainer}>
        <TableHead>
          <TableCell className={styles._datetime_cell}>DATETIME</TableCell>
          <TableCell className={styles._name_cell}>NAME</TableCell>
          {hasBulkActionsPermission && (
            <TableCell className={styles._action_type_cell}>ACTION TYPE</TableCell>
          )}
          <TableCell className={styles._import_type_cell} width="91px">
            IMPORT TYPE
          </TableCell>
          <TableCell className={styles._object_type_cell} width="118px">
            OBJECT TYPE
          </TableCell>
          <TableCell className={styles._status_cell} width="118px">
            STATUS
          </TableCell>
          <TableCell className={styles._success_cell} width="60px">
            SUCCESS
          </TableCell>
          <TableCell className={styles._error_cell} width="60px">
            ERROR
          </TableCell>
          <TableCell className={styles._imported_by_cell} width="118px">
            IMPORTED BY
          </TableCell>
          <TableCell className={styles._imported_by_cell} width="118px">
            ID
          </TableCell>
        </TableHead>
        <TableBody>
          {importsUpdated &&
            imports?.map((importRecord, index) => (
              <ImportRow
                key={`import-row-${index}`}
                importRecord={importRecord}
                hoveredRow={hoveredRow}
                setHoveredRow={setHoveredRow}
                handleStopImports={handleStopImport}
                hasBulkActionsEnabled={hasBulkActionsPermission}
              />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ImportHistoryTableView;
