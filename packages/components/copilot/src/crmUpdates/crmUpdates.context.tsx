import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useSalesforceDataModel } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  COMPANY_FIELDS_LOGIC_ROLE,
  CRMFieldUpdate,
  CRMUpdates,
  Dictionary,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  StrDict,
} from '@bloobirds-it/types';
import {
  api,
  getReferencedBobjectFromLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '@bloobirds-it/utils';
import useSWR from 'swr';

import { EntityUpdates, ObjectWithUpdates, SuggestedFieldUpdate } from './crmUpdates.types';
import { buildSobjectListUpdates, sobjectArrayQuery } from './crmUpdates.utils';

export type CRMUpdatesModalContext = {
  updates: Dictionary<EntityUpdates>;
  acceptSuggestion: ({
    entity,
    objectId,
    fieldName,
    value,
  }: {
    entity: string;
    objectId: string;
    fieldName: string;
    value: string;
  }) => void;
  discardSuggestion: ({
    entity,
    objectId,
    fieldName,
  }: {
    entity: string;
    objectId: string;
    fieldName: string;
  }) => void;
  resetSuggestion: ({
    entity,
    objectId,
    fieldName,
  }: {
    entity: string;
    objectId: string;
    fieldName: string;
  }) => void;
  acceptAllSuggestions: (entity?: string) => void;
  discardAllSuggestions: (entity?: string) => void;
  resetAllSuggestions: (entity?: string) => void;
};

const CrmUpdatesContext = createContext<Partial<CRMUpdatesModalContext>>(null);

interface BuildCRMUpdates {
  updates: Dictionary<EntityUpdates>;
  setUpdates: (newUpdates: Dictionary<EntityUpdates>) => void;
  hasUpdates: boolean;
  totalUpdates: number;
}

export const useBuildCRMUpdates = (
  activity: Bobject,
  onUpdatesLoaded?: (hasUpdates: boolean) => void,
): BuildCRMUpdates => {
  const { data: crmUpdates } = useSWR(
    `/copilot/transcript/crm-updates/${activity?.id.objectId}`,
    () =>
      api
        .get<CRMUpdates>(`/copilot/transcript/crm-updates/${activity?.id.objectId}`)
        .then(response => response.data),
  );
  const company = getReferencedBobjectFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  const lead = getReferencedBobjectFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const oppIdsFieldValue = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.LEAD_OPPORTUNITIES);

  const [opportunities, setOpportunities] = useState<Bobject[]>([]);

  useEffect(() => {
    if (oppIdsFieldValue?.length > 0) {
      Promise.all(
        Array.isArray(oppIdsFieldValue)
          ? oppIdsFieldValue.map(oppId =>
              api.get<Bobject>(`/bobjects/${oppId}/form`).then(res => res.data),
            )
          : [api.get<Bobject>(`/bobjects/${oppIdsFieldValue}/form`).then(res => res.data)],
      ).then(opps => setOpportunities(opps));
    }
  }, [oppIdsFieldValue]);

  const accountSuggestedUpdatesFields: CRMFieldUpdate[] = crmUpdates?.updates?.filter(
    update => update.entity === 'Account',
  );
  const contactSuggestedUpdatesFields: CRMFieldUpdate[] = crmUpdates?.updates?.filter(
    update => update.entity === 'Contact',
  );
  const opportunitySuggestedUpdatesFields: CRMFieldUpdate[] = crmUpdates?.updates?.filter(
    update => update.entity === 'Opportunity',
  );

  const accountSfdcId = getTextFromLogicRole(
    company,
    // @ts-ignore
    COMPANY_FIELDS_LOGIC_ROLE.SALESFORCE_ACCOUNT_ID,
  );
  // @ts-ignore
  const contactSfdcId = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.SALESFORCE_CONTACT_ID);

  const companyMap: Dictionary<{ name: string }> = accountSfdcId
    ? {
        [accountSfdcId]: { name: getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME) },
      }
    : {};

  const leadMap: Dictionary<{ name: string }> = contactSfdcId
    ? {
        [contactSfdcId]: { name: getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) },
      }
    : {};

  const opportunityMap = opportunities.reduce<Dictionary<{ name: string }>>((acc, opportunity) => {
    const sfdcId = getTextFromLogicRole(
      opportunity,
      // @ts-ignore
      OPPORTUNITY_FIELDS_LOGIC_ROLE.SALESFORCE_OPPORTUNITY_ID,
    );
    if (sfdcId) {
      acc[sfdcId] = { name: getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME) };
    }
    return acc;
  }, {});

  const { data: accountData } = useSWR<Array<StrDict>>(
    crmUpdates &&
      accountSfdcId &&
      `/utils/service/salesforce/query?=${sobjectArrayQuery(
        accountSuggestedUpdatesFields,
        'Account',
        Object.keys(companyMap),
      )}`,
    async key =>
      api
        .post(key, {
          query: sobjectArrayQuery(
            accountSuggestedUpdatesFields,
            'Account',
            Object.keys(companyMap),
          ),
        })
        .then(response => response.data),
  );
  const { data: contactData } = useSWR<Array<StrDict>>(
    crmUpdates &&
      contactSfdcId &&
      `/utils/service/salesforce/query?=${sobjectArrayQuery(
        contactSuggestedUpdatesFields,
        'Contact',
        Object.keys(leadMap),
      )}`,
    async key =>
      api
        .post(key, {
          query: sobjectArrayQuery(contactSuggestedUpdatesFields, 'Contact', Object.keys(leadMap)),
        })
        .then(response => response.data),
  );

  const { data: opportunitiesData } = useSWR<Array<StrDict>>(
    crmUpdates &&
      Object.keys(opportunityMap || {})?.length > 0 &&
      `/utils/service/salesforce/query?=${sobjectArrayQuery(
        opportunitySuggestedUpdatesFields,
        'Opportunity',
        Object.keys(opportunityMap),
      )}`,
    async key =>
      api
        .post(key, {
          query: sobjectArrayQuery(
            opportunitySuggestedUpdatesFields,
            'Opportunity',
            Object.keys(opportunityMap),
          ),
        })
        .then(response => response.data),
  );
  const salesforceDataModel = useSalesforceDataModel();

  const [updates, setUpdates] = useState<Dictionary<EntityUpdates>>({
    Account: { objects: {}, loaded: false },
    Contact: { objects: {}, loaded: false },
    Opportunity: { objects: {}, loaded: false },
  });

  useEffect(() => {
    if (accountData && salesforceDataModel && accountSuggestedUpdatesFields && companyMap) {
      if (!updates?.Account?.loaded) {
        setUpdates({
          ...updates,
          Account: {
            objects: buildSobjectListUpdates(
              accountData,
              salesforceDataModel?.types?.account,
              accountSuggestedUpdatesFields,
              companyMap,
              'Account',
            ),
            loaded: true,
          },
        });
      }
    }
  }, [accountData, salesforceDataModel, accountSuggestedUpdatesFields, companyMap]);

  useEffect(() => {
    if (contactData && salesforceDataModel && contactSuggestedUpdatesFields && leadMap) {
      if (!updates?.Contact?.loaded) {
        setUpdates({
          ...updates,
          Contact: {
            objects: buildSobjectListUpdates(
              contactData,
              salesforceDataModel?.types?.contact,
              contactSuggestedUpdatesFields,
              leadMap,
              'Contact',
            ),
            loaded: true,
          },
        });
      }
    }
  }, [contactData, salesforceDataModel, contactSuggestedUpdatesFields, leadMap]);

  useEffect(() => {
    if (
      opportunitiesData &&
      salesforceDataModel &&
      opportunitySuggestedUpdatesFields &&
      opportunityMap
    ) {
      if (!updates?.Opportunity?.loaded) {
        setUpdates({
          ...updates,
          Opportunity: {
            objects: buildSobjectListUpdates(
              opportunitiesData,
              salesforceDataModel?.types?.opportunity,
              opportunitySuggestedUpdatesFields,
              opportunityMap,
              'Opportunity',
            ),
            loaded: true,
          },
        });
      }
    }
  }, [opportunitiesData, salesforceDataModel, opportunitySuggestedUpdatesFields, opportunityMap]);

  const totalUpdates = useMemo(() => {
    return Object.values(updates)
      .filter((entity: EntityUpdates) => entity.loaded)
      .reduce<number>((acc: number, entity: EntityUpdates) => {
        return (
          acc +
          (Object.values(entity.objects).reduce((ac: number, object: ObjectWithUpdates) => {
            return ac + (object.updates.length as number);
          }, 0) as number)
        );
      }, 0);
  }, [updates]);

  useEffect(() => {
    if (totalUpdates > 0 && onUpdatesLoaded) {
      onUpdatesLoaded(totalUpdates > 0);
    }
  }, [totalUpdates]);

  return {
    updates,
    setUpdates,
    totalUpdates,
    hasUpdates: totalUpdates > 0,
  };
};

export const CRMUpdatesProvider = ({
  activity,
  children,
  onUpdatesChange,
}: {
  activity: Bobject;
  onUpdatesChange?: (updates: Dictionary<EntityUpdates>) => void;
  children: React.ReactNode;
}) => {
  const { updates, setUpdates } = useBuildCRMUpdates(activity);

  useEffect(() => {
    if (onUpdatesChange) {
      onUpdatesChange(updates);
    }
  }, [updates]);
  const acceptSuggestion = ({
    entity,
    objectId,
    fieldName,
    value,
  }: {
    entity: string;
    objectId?: string;
    fieldName: string;
    value: string;
  }) => {
    const field = updates[entity].objects[objectId].updates.find(f => f.name === fieldName);

    field.status = 'accepted';
    field.acceptedValue = value;
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };

  const discardSuggestion = ({
    entity,
    objectId,
    fieldName,
  }: {
    entity: string;
    objectId?: string;
    fieldName: string;
  }) => {
    const field = updates[entity].objects[objectId].updates.find(f => f.name === fieldName);

    field.status = 'discarded';
    field.acceptedValue = undefined;
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };

  const resetSuggestion = ({
    entity,
    objectId,
    fieldName,
  }: {
    entity: string;
    objectId?: string;
    fieldName: string;
  }) => {
    const field = updates[entity].objects[objectId].updates.find(f => f.name === fieldName);

    field.status = 'base';
    field.acceptedValue = undefined;
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };
  //TODO extract and refactor when theres time
  const acceptAllSuggestions = (entity?: string) => {
    if (entity) {
      Object.values(updates[entity]?.objects).forEach((object: ObjectWithUpdates) =>
        object.updates?.forEach((field: SuggestedFieldUpdate) => {
          field.status = 'accepted';
          field.acceptedValue = field.suggestedValue;
        }),
      );
    } else {
      Object.values(updates).forEach((entityUpdates: EntityUpdates) =>
        Object.values(entityUpdates.objects).forEach((object: ObjectWithUpdates) =>
          object.updates?.forEach((field: SuggestedFieldUpdate) => {
            field.status = 'accepted';
            field.acceptedValue = field.suggestedValue;
          }),
        ),
      );
    }

    setUpdates(JSON.parse(JSON.stringify(updates)));
  };

  const discardAllSuggestions = (entity?: string) => {
    if (entity) {
      Object.values(updates[entity]?.objects).forEach((object: ObjectWithUpdates) =>
        object.updates?.forEach((field: SuggestedFieldUpdate) => {
          field.status = 'discarded';
          field.acceptedValue = undefined;
        }),
      );
    } else {
      Object.values(updates).forEach((entityUpdates: EntityUpdates) =>
        Object.values(entityUpdates.objects).forEach((object: ObjectWithUpdates) =>
          object.updates?.forEach((field: SuggestedFieldUpdate) => {
            field.status = 'discarded';
            field.acceptedValue = undefined;
          }),
        ),
      );
    }
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };

  const resetAllSuggestions = (entity?: string) => {
    if (entity) {
      Object.values(updates[entity]?.objects).forEach((object: ObjectWithUpdates) =>
        object.updates?.forEach((field: SuggestedFieldUpdate) => {
          field.status = 'base';
          field.acceptedValue = undefined;
        }),
      );
    } else {
      Object.values(updates).forEach((entityUpdates: EntityUpdates) =>
        Object.values(entityUpdates.objects).forEach((object: ObjectWithUpdates) =>
          object.updates?.forEach((field: SuggestedFieldUpdate) => {
            field.status = 'base';
            field.acceptedValue = undefined;
          }),
        ),
      );
    }
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };

  const value: CRMUpdatesModalContext = {
    updates,
    acceptSuggestion,
    acceptAllSuggestions,
    discardAllSuggestions,
    discardSuggestion,
    resetAllSuggestions,
    resetSuggestion,
  };

  return <CrmUpdatesContext.Provider value={value}>{children}</CrmUpdatesContext.Provider>;
};

export const useCrmUpdatesModal = () => {
  const context = useContext(CrmUpdatesContext);
  if (!context) {
    throw new Error('useCrmUpdatesModal must be used within a CRMUpdatesModalProvider');
  }
  return context;
};

export const withCRMUpdatesProvider = Component => ({
  activity,
  isBubble,
}: {
  activity: Bobject;
  isBubble?: boolean;
}) => (
  <CRMUpdatesProvider activity={activity}>
    <Component isBubble={isBubble} />
  </CRMUpdatesProvider>
);
