import { useEffect } from 'react';

import { api, getFieldTextById } from '@bloobirds-it/utils';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useActiveUserSettings } from './useActiveUser';
import { useDataModel } from './useDataModel';

const emailVariablesAtom = atom({
  key: 'emailVariables',
  default: undefined,
});

const emailVariablesValuesAtom = atom({
  key: 'emailVariablesValues',
  default: {},
});

const getVariableValue = ({ dataModel, lead, company, opportunity, userName, variable }) => {
  switch (variable.type) {
    case 'company':
      if (company) {
        if (company.raw) {
          return getFieldTextById(company, variable.id);
        } else {
          if (variable.fieldType.includes('PICKLIST')) {
            const fieldValues = dataModel?.findValuesByFieldId(variable.id);
            return fieldValues.find(value => value.id === company[variable.id])?.name;
          } else return company[variable.id];
        }
      } else return null;
    case 'lead':
      if (lead) {
        if (lead.raw) {
          return getFieldTextById(lead, variable.id);
        } else {
          if (variable.fieldType.includes('PICKLIST')) {
            const fieldValues = dataModel?.findValuesByFieldId(variable.id);
            return fieldValues.find(value => value.id === lead[variable.id])?.name;
          } else return lead[variable.id];
        }
      } else return null;
    case 'opportunity':
      if (opportunity) {
        if (opportunity.raw) {
          return getFieldTextById(opportunity, variable.id);
        } else {
          if (variable.fieldType.includes('PICKLIST')) {
            const fieldValues = dataModel?.findValuesByFieldId(variable.id);
            return fieldValues.find(value => value.id === opportunity[variable.id])?.name;
          } else return opportunity[variable.id];
        }
      } else return null;
    case 'user':
      return userName;
    default:
      throw new Error(`Unsupported variable of type: '${variable.type}'`);
  }
};

const parseEmailVariables = bobjectTypes => {
  let variablesParsed = {};
  bobjectTypes?.forEach(type => {
    type?.fields?.forEach(field => {
      if (field?.isTemplateVariable) {
        const logicRole = field.logicRole;
        const typeName = type.name.toLowerCase();
        const fieldType = field.fieldType;

        const obj = {
          [typeName]: [
            ...(variablesParsed[typeName] || []),
            {
              id: field.id,
              type: typeName,
              name: field.name,
              logicRole,
              fieldType,
            },
          ],
        };
        variablesParsed = {
          ...variablesParsed,
          ...obj,
          SDR: [
            {
              id: 'user',
              name: 'Name',
              type: 'user',
              logicRole: 'USER__NAME',
            },
          ],
        };
      }
    });
  });

  return variablesParsed;
};

export const fetchBobjectFields = async (url): Promise<any> => {
  try {
    const { data } = await api.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {},
    });
    return data?._embedded;
  } catch (e) {
    return null;
  }
};

export const useBaseEmailVariables = () => {
  const [emailVariables, setEmailVariables] = useRecoilState(emailVariablesAtom);

  const dataModel = useDataModel();
  const bobjectTypes = dataModel?.findMainBobjectTypes();

  useEffect(() => {
    if (bobjectTypes) {
      const parsedVariables = parseEmailVariables(bobjectTypes);
      setEmailVariables(parsedVariables);
    }
  }, [dataModel]);

  return emailVariables;
};

export const useBaseEmailVariableValue = () => useRecoilValue(emailVariablesValuesAtom);

export const useBaseResetEmailVariablesValues = () => {
  const setEmailVariablesValues = useSetRecoilState(emailVariablesValuesAtom);
  return () => setEmailVariablesValues({});
};

export const useBaseSetEmailVariablesValues = () => {
  const emailVariables = useBaseEmailVariables();
  const { settings } = useActiveUserSettings();
  const dataModel = useDataModel();
  const userName = settings?.user?.name;
  const setEmailVariablesValues = useSetRecoilState(emailVariablesValuesAtom);
  const emailVariablesEntries = emailVariables && Object.entries(emailVariables);

  return ({ company, lead, opportunity }) => {
    const values = {};
    emailVariablesEntries?.forEach(([key, group]) => {
      // @ts-ignore
      values[key] = group?.map(variable => {
        const value = getVariableValue({
          dataModel,
          lead,
          company,
          opportunity,
          userName,
          variable,
        });

        return { ...variable, value };
      });
    });
    setEmailVariablesValues(values);
  };
};
