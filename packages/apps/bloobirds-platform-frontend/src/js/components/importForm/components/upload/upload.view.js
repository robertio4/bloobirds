import React from 'react';
import ImportFileSection from '../importFileSection';
import styles from './upload.module.css';
import { useImportForm } from '../../hooks/useImportForm';
import { saveAs } from '../../../../misc/utils';
import {
  Input,
  Button,
  Item,
  Text,
  IconButton,
  Dropdown,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { api } from '../../../../utils/api';
import useSWR from 'swr';

const Upload = () => {
  const { bobjectType, action, importName, setImportName } = useImportForm();
  const { ref, visible: dropdownVisible, setVisible } = useVisible();
  const { data: importTemplatesRequest } = useSWR('importTemplates', () =>
    api.get('/bobjects/bulkAction/templates'),
  );
  const importTemplates =
    importTemplatesRequest?.data?.templates.filter(t => t.bobjectType.id === bobjectType.id) || [];

  const downloadDataModel = () => {
    api
      .get(`/bobjects/bulkAction/${bobjectType.name}/${action}`, {
        responseType: 'blob',
      })
      .then(response => {
        const blob = new Blob([response?.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
        });
        saveAs(blob, `DATA_MODEL_${bobjectType.name.toUpperCase()}_${action}`);
      });
  };

  return (
    <div className={styles._root}>
      <div className={styles._list}>
        <h2 className={styles._title}>Upload your files</h2>
      </div>
      <div className={styles._list}>
        <ol>
          <li>Download an excel file: </li>
          <ol type="a">
            <li>
              For creating new objects, download a template file{' '}
              {!importTemplates ||
                (importTemplates.length === 0 && (
                  <span className={styles._download} onClick={downloadDataModel}>
                    here
                  </span>
                ))}
            </li>
            <li>
              For updating or deleting objects, first create a list in Bloobirds which includes all
              objects. Afterward, download this list.
            </li>
          </ol>
          <li>Edit your excel file</li>
          <li>Give your action a name (e.g. New leads - Trade Fair May 2021)</li>
          <li>Upload your new file with the required changes</li>
        </ol>
        <p className={styles._text}>
          Note: If you want to delete values that currently exist in Bloobirds, please write
          #deletevalue in the cell that you would like to delete.
        </p>
      </div>
      {importTemplates.length > 0 && (
        <div className={styles._list}>
          <Dropdown
            ref={ref}
            visible={dropdownVisible}
            anchor={
              <Button
                className={styles.download_button}
                variant="clear"
                iconLeft="download"
                onClick={setVisible}
              >
                Download the {bobjectType.name} templates
              </Button>
            }
          >
            {importTemplates.map(template => (
              <Item
                key={template.id}
                value={template.id}
                onClick={async (value, event) => {
                  event.preventDefault();
                  const templateUrl = await api.get(
                    `/bobjects/bulkAction/templates/${template.id}`,
                  );
                  const link = document.createElement('a');
                  link.href = templateUrl.data.url;
                  link.download = template.name;
                  link.addEventListener(
                    'click',
                    () => {
                      requestAnimationFrame(() => {
                        URL.revokeObjectURL(link.href);
                        link.remove();
                      });
                    },
                    false,
                  );
                  link.dispatchEvent(new MouseEvent('click'));
                }}
              >
                <div className={styles._tempaltesItem}>
                  <Text size="s">{template.name}</Text>
                  <IconButton name={'download'} className={styles._templateDownloadButton} />
                </div>
              </Item>
            ))}
          </Dropdown>
        </div>
      )}
      <div className={styles._importNameInput}>
        <Input
          width="100%"
          onChange={value => setImportName(value)}
          placeholder="Name your action"
          value={importName}
        />
      </div>
      <ImportFileSection />
    </div>
  );
};

export default Upload;
