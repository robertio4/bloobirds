import React from 'react';

import { Button, Divider, Dropdown, Icon, Item, useVisible } from '@bloobirds-it/flamingo-ui';

import { APP_CL_IMPORT, APP_CL_IMPORT_HISTORY } from '../../../../app/_constants/routes';
import { useMediaQuery, useRouter } from '../../../../hooks';
import { useImportForm } from '../../../importForm/hooks/useImportForm';
import style from './importButton.module.css';

const ImportDropdown = ({ showImport }) => {
  const { history } = useRouter();
  const { ref, visible, setVisible } = useVisible(false);
  const { clearImportData } = useImportForm();

  const handleBulkActions = () => {
    showImport();
    setVisible(false);
    clearImportData();
    history.push(APP_CL_IMPORT);
  };

  const { isSmallDesktop } = useMediaQuery();
  let iconProps;
  if (!isSmallDesktop) {
    iconProps = {
      iconRight: visible ? 'chevronUp' : 'chevronDown',
    };
  }

  return (
    <div className={style._container}>
      <Dropdown
        ref={ref}
        visible={visible}
        arrow={false}
        anchor={
          <Button variant="secondary" {...iconProps} onClick={() => setVisible(!visible)}>
            {!isSmallDesktop ? 'Bulk Actions' : <Icon name="file" size={16} />}
          </Button>
        }
      >
        <Item onClick={() => handleBulkActions()}>Import, update, or delete objects</Item>
        <Divider />
        <Item onClick={() => history.push(APP_CL_IMPORT_HISTORY)}>History of bulk actions</Item>
      </Dropdown>
    </div>
  );
};

export default ImportDropdown;
