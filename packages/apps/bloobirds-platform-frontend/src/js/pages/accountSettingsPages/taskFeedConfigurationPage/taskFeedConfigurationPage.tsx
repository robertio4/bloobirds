import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Item, MultiSelect, Select } from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import { UserType } from '@bloobirds-it/types';
import { toLower } from 'lodash';
import useSWR from 'swr';

import { useUserSettings } from '../../../components/userPermissions/hooks';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import { AccountSettingsSection } from '../../../layouts/accountSettingsLayout/accountSettingsSection/accountSettingsSection';
import SessionManagerFactory from '../../../misc/session';
import { api } from '../../../utils/api';
import { toSentenceCase } from '../../../utils/strings.utils';
import NoPermissionsPage from '../../noPermissionsPage';
import styles from './styles/taskFeedConfigurationPage.module.css';

/**
 * {
 *     "dateFilterEnabled": true,
 *     "canSeeImportance": false,
 *     "sortableFieldIds": [],
 *     "sortingStrategyIds": [],
 *     "extraFieldIds": [],
 *     "filtrableFields": []
 * }
 * */
const TaskFeedConfigurationComponent = () => {
  const [dateFilterEnabled, setDateFilterEnabled] = useState(true);
  const [canSeeImportance, setCanSeeImportance] = useState(false);
  const [sortableFieldIds, setSortableFieldIds] = useState([]);
  const [sortingStrategyIds, setSortingStrategyIds] = useState([]);
  const [extraFieldIds, setExtraFieldIds] = useState([]);
  const [filtrableFields, setFiltrableFields] = useState([]);
  const [jsonOutput, setJsonOutput] = useState('');

  const taskFeedConfig = useSWR('/utils/task-feed-configuration', () =>
    api.get('/utils/task-feed-configuration').then(response => response.data),
  );

  useEffect(() => {
    setDateFilterEnabled(taskFeedConfig.data?.dateFilterEnabled);
    setCanSeeImportance(taskFeedConfig.data?.canSeeImportance);
    setSortableFieldIds(taskFeedConfig.data?.sortableFields.map(field => field.id));
    setSortingStrategyIds(taskFeedConfig.data?.sortingStrategies.map(strategy => strategy.id));
    setExtraFieldIds(taskFeedConfig.data?.extraFieldsShownOnEachCard.map(field => field.id));
    setFiltrableFields(
      taskFeedConfig.data?.filtrableFields.map(field => {
        return {
          fieldId: field.fieldId,
          fieldName: field.fieldName,
          type: field.type,
          referenceFieldId: field.referenceFieldId,
        };
      }) || [],
    );
  }, [taskFeedConfig.data]);

  const datamodel = useDataModel();

  const taskFields = datamodel?.getFieldsByBobjectType('Task');
  const companyFields = datamodel?.getFieldsByBobjectType('Company');
  const leadFields = datamodel?.getFieldsByBobjectType('Lead');
  const opportunityFields = datamodel?.getFieldsByBobjectType('Opportunity');

  const fileds = {
    COMPANY: companyFields,
    LEAD: leadFields,
    OPPORTINITY: opportunityFields,
    TASK: taskFields,
  };

  const addFilter = () => {
    setFiltrableFields([
      ...filtrableFields,
      { fieldId: null, fieldName: '', type: 'BY_FIELD', referenceFieldId: null },
    ]);
  };

  const updateFilterType = (index, value) => {
    const newFiltrableFields = [...filtrableFields];
    newFiltrableFields[index].field.type = value;
    setFiltrableFields(newFiltrableFields);
  };

  const updateFilterField = (index, value) => {
    const newFiltrableFields = [...filtrableFields];
    newFiltrableFields[index].value = value;
    setFiltrableFields(newFiltrableFields);
  };

  const updateFilterReferenceField = (index, value) => {
    // Implementation depends on your requirements
  };

  const generateJSON = () => {
    const output = {
      dateFilterEnabled,
      canSeeImportance,
      sortableFieldIds,
      sortingStrategyIds,
      extraFieldIds,
      filtrableFields,
    };
    setJsonOutput(JSON.stringify(output, null, 2));
  };

  return (
    <div>
      <div>
        <label>Date Filter Enabled: </label>
        <input
          type="checkbox"
          checked={dateFilterEnabled}
          onChange={e => setDateFilterEnabled(e.target.checked)}
        />
      </div>
      <div>
        <label>Can See Importance: </label>
        <input
          type="checkbox"
          checked={canSeeImportance}
          onChange={e => setCanSeeImportance(e.target.checked)}
        />
      </div>
      <div>
        <label>Todo / Sortable Field: </label>
        <MultiSelect
          size="small"
          placeholder="Select field"
          value={sortableFieldIds}
          onChange={value => setSortableFieldIds(value)}
        ></MultiSelect>
      </div>
      <div>
        <label>Todo / Sorting Strategy: </label>
        <MultiSelect
          size="small"
          placeholder="Select field"
          value={sortingStrategyIds}
          onChange={value => setSortingStrategyIds(value)}
        ></MultiSelect>
      </div>
      <div>EXTRA FIELDS:</div>
      <div>
        <label>Task Fields: </label>
        <MultiSelect
          size="small"
          placeholder="Select field"
          value={extraFieldIds}
          onChange={value => setExtraFieldIds(value)}
        >
          {taskFields?.map((field, index) => (
            <Item key={index} value={field.id}>
              {field.name}
            </Item>
          ))}
        </MultiSelect>
      </div>
      <div>
        <label>Company Fields: </label>
        <MultiSelect
          size="small"
          placeholder="Select field"
          value={extraFieldIds}
          onChange={value => setExtraFieldIds(value)}
        >
          {companyFields?.map((field, index) => (
            <Item key={index} value={field.id}>
              {field.name}
            </Item>
          ))}
        </MultiSelect>
      </div>
      <div>
        <label>Lead Fields: </label>
        <MultiSelect
          size="small"
          placeholder="Select field"
          value={extraFieldIds}
          onChange={value => setExtraFieldIds(value)}
        >
          {leadFields?.map((field, index) => (
            <Item key={index} value={field.id}>
              {field.name}
            </Item>
          ))}
        </MultiSelect>
      </div>
      <div>
        <label>Opportunity Fields: </label>
        <MultiSelect
          size="small"
          placeholder="Select field"
          value={extraFieldIds}
          onChange={value => setExtraFieldIds(value)}
        >
          {opportunityFields?.map((field, index) => (
            <Item key={index} value={field.id}>
              {field.name}
            </Item>
          ))}
        </MultiSelect>
      </div>
      <div>
        <button className={styles.button} onClick={addFilter}>
          Add Filter
        </button>
        {filtrableFields?.map((filter, index) => {
          return (
            <div key={index} className={styles.formField}>
              <span>Filter {filter.id}</span>
              <Select
                placeholder="Select filterType"
                value={filter.type}
                onChange={value => updateFilterType(index, value)}
                size="small"
              >
                {['DATE', 'BY_FIELD', 'BY_REFERENCE_FIELD', 'OBJECT', 'OWNER', 'STATUS'].map(
                  (filterType, index) => {
                    return (
                      <Item key={index} value={filterType}>
                        {filterType}
                      </Item>
                    );
                  },
                )}
              </Select>
              {filter.field === 'BY_FIELD' && (
                <Select
                  placeholder="Select field"
                  value={filter.field}
                  onChange={value => updateFilterField(index, value)}
                  size="small"
                >
                  {taskFields?.map((field, index) => (
                    <Item key={index} value={field.id}>
                      {field.name}
                    </Item>
                  ))}
                </Select>
              )}
              {filter.field === 'BY_REFERENCE_FIELD' && (
                <>
                  <Select
                    placeholder="Select reference field"
                    value={filter.field.referenceFieldId}
                    onChange={value => updateFilterReferenceField(index, value)}
                  >
                    {taskFields
                      ?.filter(field => field.fieldType === 'REFERENCE')
                      .map((field, index) => (
                        <Item key={index} value={field.id}>
                          {field.name}
                        </Item>
                      ))}
                  </Select>
                  {/*<Select
                    placeholder="Select field"
                    value={filter.field}
                    onChange={value => updateFilterField(index, value)}
                    size="small"
                  >
                    {fileds[field.getReferenceType].map(
                      (field, index) => (
                        <Item key={index} value={field.id}>
                          {field.name}
                        </Item>
                      ))}
                  </Select>*/}
                </>
              )}
            </div>
          );
        })}
      </div>
      <button className={styles.button} onClick={generateJSON}>
        Generate JSON
      </button>
      {jsonOutput && <pre className={styles.jsonOutput}>{jsonOutput}</pre>}
    </div>
  );
};

const ScoringAlgorithmComponent = () => {
  const [initialScore, setInitialScore] = useState(0);
  const [rules, setRules] = useState([]);
  const [jsonOutput, setJsonOutput] = useState('');

  const operators = ['EQUALS', 'EMPTY', 'NON_EMPTY', 'RELATIVE_DATE', 'NOT_EQUALS'];
  const datamodel = useDataModel();
  const taskFields = datamodel?.getFieldsByBobjectType('Task');

  const addRule = () => {
    const newRule = {
      conditions: [],
      scoreChange: 0,
    };
    setRules([...rules, newRule]);
  };

  const addCondition = ruleIndex => {
    const newCondition = {
      field: '',
      referenceFieldId: '',
      referenceType: '',
      value: [],
      operator: 'EQUALS',
    };
    const newRules = [...rules];
    newRules[ruleIndex].conditions.push(newCondition);
    setRules(newRules);
  };

  const updateConditionField = (ruleIndex, conditionIndex, newValue) => {
    const newRules = [...rules];
    newRules[ruleIndex].conditions[conditionIndex].field = newValue;
    setRules(newRules);
  };

  const updateConditionReferenceFieldId = (ruleIndex, conditionIndex, newValue) => {
    const selectedField = taskFields.find(field => field.id === newValue);

    const newRules = [...rules];
    newRules[ruleIndex].conditions[conditionIndex].referenceFieldId = selectedField?.id || '';
    newRules[ruleIndex].conditions[conditionIndex].referenceType = toSentenceCase(
      toLower(selectedField?.referencesTo || ''),
    );
    setRules(newRules);
  };

  const updateConditionValue = (ruleIndex, conditionIndex, newValue) => {
    const newRules = [...rules];
    newRules[ruleIndex].conditions[conditionIndex].value = newValue;
    setRules(newRules);
  };

  const updateConditionOperator = (ruleIndex, conditionIndex, newValue) => {
    const newRules = [...rules];
    newRules[ruleIndex].conditions[conditionIndex].operator = newValue;
    setRules(newRules);
  };

  const updateRuleScoreChange = (ruleIndex, newValue) => {
    const newRules = [...rules];
    newRules[ruleIndex].scoreChange = newValue;
    setRules(newRules);
  };

  const generateJSON = () => {
    const scoringAlgorithm = {
      initialScore,
      rules,
    };
    // Remove the referenceType from the conditions
    scoringAlgorithm.rules.forEach(rule => {
      rule.conditions.forEach(condition => {
        delete condition.referenceType;
      });
    });
    setJsonOutput(JSON.stringify(scoringAlgorithm, null, 2));
  };

  return (
    <div>
      <button className={styles.button} onClick={addRule}>
        Add Rule
      </button>
      {rules.map((rule, ruleIndex) => (
        <div key={ruleIndex} className={styles.rule}>
          <div className={styles.ruleTitle}>Rule {ruleIndex + 1}</div>
          <label>Score Change: </label>
          <input
            type="number"
            value={rule.scoreChange}
            onChange={e => updateRuleScoreChange(ruleIndex, e.target.value)}
          />
          <button className={styles.button} onClick={() => addCondition(ruleIndex)}>
            Add Condition
          </button>
          {rule.conditions.map((condition, conditionIndex) => {
            return (
              <div key={conditionIndex} className={styles.formField}>
                <div>
                  <Select
                    placeholder="Select field"
                    value={condition.field}
                    onChange={value => updateConditionField(ruleIndex, conditionIndex, value)}
                    size="small"
                  >
                    {(condition.referenceFieldId !== ''
                      ? datamodel?.getFieldsByBobjectType(condition.referenceType)
                      : taskFields
                    )?.map((field, index) => (
                      <Item key={index} value={field.id}>
                        {field.name}
                      </Item>
                    ))}
                  </Select>
                </div>
                <div>
                  <Select
                    placeholder="Select reference field"
                    value={condition.referenceFieldId}
                    onChange={value =>
                      updateConditionReferenceFieldId(ruleIndex, conditionIndex, value)
                    }
                    size="small"
                  >
                    {taskFields
                      .filter(field => field.fieldType === 'REFERENCE')
                      .map((field, index) => (
                        <Item key={index} value={field.id}>
                          {field.name}
                        </Item>
                      ))}
                  </Select>
                </div>
                <div>
                  <Select
                    placeholder="Select Operator"
                    value={condition.operator}
                    onChange={value => updateConditionOperator(ruleIndex, conditionIndex, value)}
                    size="small"
                  >
                    {operators.map((operator, index) => (
                      <Item key={index} value={operator}>
                        {operator}
                      </Item>
                    ))}
                  </Select>
                </div>
                {condition.operator === 'RELATIVE_DATE' && (
                  <div>
                    <label>Value: </label>
                    <input
                      type="text"
                      pattern="^[+-]\s\d+\s(sec|min|hour|day)$"
                      title="Format: +|- number sec|min|hour|day"
                      onChange={e =>
                        updateConditionValue(ruleIndex, conditionIndex, e.target.value)
                      }
                    />
                  </div>
                )}
                {(condition.operator === 'EQUALS' || condition.operator === 'NOT_EQUALS') && (
                  <div>
                    <MultiSelect
                      size="small"
                      placeholder="Select value"
                      value={condition.value}
                      onChange={value => updateConditionValue(ruleIndex, conditionIndex, value)}
                    >
                      {datamodel?.findValuesByFieldId(condition.field)?.map((value, index) => (
                        <Item key={index} value={value.id}>
                          {value.name}
                        </Item>
                      ))}
                    </MultiSelect>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <button className={styles.button} onClick={generateJSON}>
        Generate JSON
      </button>
      {jsonOutput && <pre className={styles.jsonOutput}>{jsonOutput}</pre>}
    </div>
  );
};

const TaskFeedConfigurationPage = () => {
  const { t } = useTranslation();
  const settings = useUserSettings();
  const accountName = SessionManagerFactory().getAccount().name;

  if (settings?.user.type !== UserType.SUPPORT_USER) {
    return <NoPermissionsPage />;
  }

  return (
    <AccountSettingsLayout
      title={t('accountSettings.taskFeed.title', { accountName: accountName })}
      subtitle={t('accountSettings.taskFeed.subtitle')}
    >
      <AccountSettingsSection title="Task Feed Configuration">
        <div>Task Feed Configuration</div>
        <div>
          <ScoringAlgorithmComponent />
          <TaskFeedConfigurationComponent />
        </div>
      </AccountSettingsSection>
    </AccountSettingsLayout>
  );
};

export default TaskFeedConfigurationPage;
