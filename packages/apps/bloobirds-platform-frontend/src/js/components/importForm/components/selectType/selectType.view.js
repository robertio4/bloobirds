import React, { useMemo } from 'react';
import { Select, Item, Text, Callout } from '@bloobirds-it/flamingo-ui';
import styles from './selectType.module.css';
import { useImportForm } from '../../hooks/useImportForm';
import { ImportOptionsSection } from '../importOptionsSection/ImportOptionsSection';
import { useEntity } from '../../../../hooks';

const SelectTypeView = ({ bobjectTypes }) => {
  const { bobjectType, setBobjectType } = useImportForm();
  const link =
    'https://support.bloobirds.com/hc/en-us/articles/360011329800-How-to-prepare-your-data-to-be-imported';
  const imports = useEntity('importHistories')?.all();
  const ongoingImports = useMemo(
    () => imports?.filter(imp => imp.status === 'Ongoing').length > 0,
    [imports],
  );

  return (
    <div className={styles._root}>
      {ongoingImports && (
        <Callout variant="alert">
          There is already an ongoing import. To prevent errors please make sure that objects of the
          new import are not related to objects of the ongoing import.
        </Callout>
      )}
      <h2 className={styles._title}>What would you like to do?</h2>
      <div className={styles._wrapper}>
        <p className={styles._text}>
          In Bloobirds, we have different objects (types of data) to organise your data. Common
          objects are leads, companies, opportunities, tasks and activities. To create, update, or
          delete many objects at the same time, you simply need to upload an excel file that
          contains the required information. Before your first upload, please make sure to check our{' '}
          <a href={link}>
            <Text size="m" color="bloobirds" inline>
              {' knowledge base '}
            </Text>
          </a>{' '}
          for easy instructions on how to prepare for an import.
        </p>
      </div>

      <div className={styles._inputs}>
        <ImportOptionsSection />
        <div className={styles._textContainer}>
          <Text size="m">What is the object type?</Text>
        </div>
        <Select
          value={bobjectType?.id}
          placeholder="Object type"
          width="100%"
          onChange={value => {
            setBobjectType(bobjectTypes.find(o => o.id === value));
          }}
        >
          {bobjectTypes?.map(bobjectTypeItem => (
            <Item key={bobjectTypeItem.id} value={bobjectTypeItem.id}>
              {bobjectTypeItem.name}
            </Item>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectTypeView;
