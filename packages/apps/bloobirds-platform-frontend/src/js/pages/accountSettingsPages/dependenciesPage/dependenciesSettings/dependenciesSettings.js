import React, { useState } from 'react';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import styles from './dependenciesSettings.module.css';
import {
  TableHead,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Tag,
  Text,
  IconButton,
  Button,
} from '@bloobirds-it/flamingo-ui';
import { useDependencies, useDependenciesActions } from '../../../../hooks/useDependencies';
import NewDependencyRow from '../newDependencyRow';
import { DependenciesFilters } from '../dependenciesFilters/dependenciesFilters';
import { SearchLogs } from '../../../../../assets/svg';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { useTagsModal } from '../../../../hooks/useTagsModal';

const DependencyRow = ({
  condition,
  isValueDependency = false,
  saveDependency,
  removeDependency,
}) => {
  const [isEdition, setIsEdition] = useState();
  const getOptions = () => {
    const commonOptions = {
      requiredParentFieldId: condition?.requiredParentField?.name,
      requiredValueId: condition?.requiredValue?.name,
    };
    if (isValueDependency) {
      return {
        ...commonOptions,
        childFieldId: condition?.childField?.name,
        fieldValuesToDisplayId: condition?.fieldValuesToDisplay?.map(value => value?.name),
      };
    }
    return {
      ...commonOptions,
      fieldsToDisplayId: condition?.fieldsToDisplay?.map(field => field?.name),
    };
  };
  const options = getOptions();
  const { handleOpenTagsModal } = useTagsModal();

  return (
    <>
      {isEdition ? (
        <NewDependencyRow
          isEdition
          setIsEdition={setIsEdition}
          editionOptions={options}
          isValueDependency={isValueDependency}
          handleCloseRow={() => setIsEdition(false)}
          saveDependency={saveDependency}
          removeDependency={removeDependency}
        />
      ) : (
        <TableRow>
          <TableCell>
            <div>
              {condition?.requiredParentField.label} -{' '}
              <Text htmlTag="span" size="s" color="softPeanut">
                {condition?.requiredParentField.bobjectType}
              </Text>
            </div>
          </TableCell>
          <TableCell>{condition?.requiredValue.label}</TableCell>
          {isValueDependency ? (
            <TableCell>{condition?.childField.label}</TableCell>
          ) : (
            <TableCell>
              <div className={styles.__tags_row__container}>
                {condition?.fieldsToDisplay?.slice(0, 2).map(field => (
                  <span key={field.id} className={styles._value__tag}>
                    <Tag uppercase={false}>{field.label}</Tag>
                  </span>
                ))}
                <span
                  className={styles._number__tags}
                  onClick={() => handleOpenTagsModal(condition?.fieldsToDisplay, false)}
                >
                  {condition.fieldsToDisplay.length > 2 &&
                    `+${condition.fieldsToDisplay.length - 2}`}
                </span>
              </div>
            </TableCell>
          )}
          {isValueDependency && (
            <TableCell>
              <div className={styles.__tags_row__container}>
                {condition?.fieldValuesToDisplay?.slice(0, 2).map(fieldValue => (
                  <span key={fieldValue.id} className={styles._value__tag}>
                    <Tag uppercase={false}>{fieldValue.label}</Tag>
                  </span>
                ))}
                <span
                  className={styles._number__tags}
                  onClick={() => handleOpenTagsModal(condition?.fieldValuesToDisplay, true)}
                >
                  {condition.fieldValuesToDisplay.length > 2 &&
                    `+${condition.fieldValuesToDisplay.length - 2}`}
                </span>
              </div>
            </TableCell>
          )}
          <TableCell>
            <IconButton
              name="edit"
              size={20}
              className={styles.__edit__button}
              onClick={() => setIsEdition(true)}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const DependenciesSettings = ({ isValueDependency = false }) => {
  const [createRow, setCreateRow] = useState();
  const handleCloseRow = () => {
    setCreateRow(false);
  };
  const { dependencies } = useDependencies(
    isValueDependency ? 'fieldValueConditions' : 'fieldConditions',
    handleCloseRow,
  );
  const { handleSaveDependency, removeDependency } = useDependenciesActions();

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="eye">
            Field {isValueDependency ? 'Value' : ''} dependencies
          </AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle>
            Manage here the visibility of {isValueDependency ? 'values' : 'fields'} in your forms
            based on parent field values
          </AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight>
          <Button iconLeft="plus" onClick={() => setCreateRow(true)}>
            Create new dependency
          </Button>
        </AccountSettingsTabHeaderRight>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <AccountSettingsTableContainer>
          <DependenciesFilters dependencies={dependencies} isValueDependency={isValueDependency} />
          {dependencies?.length > 0 || createRow ? (
            <Table className={styles.__table_row__container}>
              <TableHead>
                <TableCell>Parent field</TableCell>
                <TableCell>Conditioning value</TableCell>
                <TableCell>{isValueDependency ? 'Child field' : 'Child fields'}</TableCell>
                {isValueDependency && <TableCell>Values to be displayed</TableCell>}
                <TableCell />
              </TableHead>
              <TableBody>
                {createRow && (
                  <NewDependencyRow
                    isValueDependency={isValueDependency}
                    handleCloseRow={handleCloseRow}
                    saveDependency={handleSaveDependency}
                  />
                )}
                {dependencies?.map((condition, index) => (
                  <DependencyRow
                    key={`condition-${index}`}
                    removeDependency={removeDependency}
                    condition={condition}
                    isValueDependency={isValueDependency}
                    saveDependency={handleSaveDependency}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className={styles._sync_logs_content}>
              <SearchLogs className={styles._sync_logs_content_img} />
              <Text size="xl" weight="bold" align="center" color="softPeanut">
                No conditions could be found
              </Text>
              <Text size="m" align="center" weight="regular" color="softPeanut">
                It seems there&apos;s no results for the following conditions you are searching.
              </Text>
            </div>
          )}
        </AccountSettingsTableContainer>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default DependenciesSettings;
