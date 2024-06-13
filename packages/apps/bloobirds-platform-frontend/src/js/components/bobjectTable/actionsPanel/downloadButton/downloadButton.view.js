import React from 'react';
import {
  Dropdown,
  IconButton,
  Item,
  Spinner,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import styles from './downloadButton.module.css';
import { useBobjectsDownload } from '../../../../hooks/useBobjectsDownload';
import { useUserSettings } from '../../../userPermissions/hooks';
import WithTooltip from '../../../withTooltip/withTooltip';
import { useBobjectTable } from '../../useBobjectTable';

const DownloadButtonView = ({ shouldContractElements }) => {
  const { query, columns, bobjectType } = useBobjectTable();
  const { handleDownload, isLoading } = useBobjectsDownload();
  const { visible: dropdownView, setVisible: setDropdownView, ref } = useVisible(false);
  const settings = useUserSettings();
  const canDownloadLists = settings?.user?.permissions?.includes('DOWNLOAD_LIST');

  return (
    <div className={styles._download_button_container}>
      {isLoading ? (
        <Spinner name="loadingCircle" size={16} />
      ) : (
        <Dropdown
          ref={ref}
          visible={dropdownView}
          anchor={
            !canDownloadLists ? (
              <Tooltip
                title="You don’t have enough permissions to download lists, ask your admin to change it in case you need it!"
                position="top"
              >
                <WithTooltip isDisabled={shouldContractElements} title={'Download'}>
                  <IconButton
                    dataTest="disabledDownloadButton"
                    name="download"
                    disabled={true}
                    onClick={() => {}}
                    size={16}
                  >
                    {!shouldContractElements && (
                      <Text size="s" color="peanut">
                        Download
                      </Text>
                    )}
                  </IconButton>
                </WithTooltip>
              </Tooltip>
            ) : (
              <WithTooltip isDisabled={shouldContractElements} title={'Download'}>
                <IconButton
                  dataTest="downloadButton"
                  name="download"
                  onClick={() => setDropdownView(true)}
                  size={16}
                >
                  {!shouldContractElements && (
                    <Text size="s" color="peanut">
                      Download
                    </Text>
                  )}
                </IconButton>
              </WithTooltip>
            )
          }
        >
          <Item
            onClick={() => {
              handleDownload({ query, format: 'CSV', columns, bobjectType });
              setDropdownView(false);
            }}
          >
            Download in CSV
          </Item>
          <Item
            onClick={() => {
              handleDownload({ query, format: 'XLSX', columns, bobjectType });
              setDropdownView(false);
            }}
          >
            Download in XLSX
          </Item>
        </Dropdown>
      )}
    </div>
  );
};

export default DownloadButtonView;
