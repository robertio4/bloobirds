import React from 'react';
import PropTypes from 'prop-types';
import { bobjectModel } from '../../../../misc/model/bobjectFieldsModel';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import {
  CRM,
  HUBSPOT,
  SALESFORCE,
  SALESFORCE_OBJECT_TYPES,
  HUBSPOT_OBJECT_TYPES_MAPPINGS,
} from '../../../../constants/integrations';
import useHubspot from '../../../../hooks/useHubspot';
import useSalesforce from '../../../../hooks/useSalesforce';
import IntegrationDetail from './integrationDetail';
import styles from './integrationDetailGroup.module.css';

const IntegrationDetailGroup = ({ bobject }) => {
  const bobjectType = bobject.id?.typeName;
  const { salesforceIntegration } = useSalesforce();
  const { hubspotIntegration } = useHubspot();
  const fullBobject = bobjectModel(bobject);
  const getExternalIdByIntegrationType = integrationType => {
    if (
      [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD, BOBJECT_TYPES.OPPORTUNITY].includes(bobjectType)
    ) {
      if (integrationType === CRM.HUBSPOT) {
        return {
          id: fullBobject?.findByLogicRole(HUBSPOT[`${bobjectType.toUpperCase()}_ID_FIELD`])?.text,
          type: HUBSPOT_OBJECT_TYPES_MAPPINGS[bobjectType?.toUpperCase()],
        };
      }
      if (bobjectType === BOBJECT_TYPES.COMPANY) {
        return {
          id: fullBobject?.findByLogicRole(SALESFORCE.ACCOUNT_ID_FIELD)?.text,
          type: SALESFORCE_OBJECT_TYPES.ACCOUNT,
        };
      }
      if (bobjectType === BOBJECT_TYPES.OPPORTUNITY) {
        return {
          id: fullBobject?.findByLogicRole(SALESFORCE.OPPORTUNITY_ID_FIELD)?.text,
          type: SALESFORCE_OBJECT_TYPES.OPPORTUNITY,
        };
      }
      const leadId = fullBobject?.findByLogicRole(SALESFORCE.LEAD_ID_FIELD)?.text;
      const contactId = fullBobject?.findByLogicRole(SALESFORCE.CONTACT_ID_FIELD)?.text;
      if (contactId) return { id: contactId, type: SALESFORCE_OBJECT_TYPES.CONTACT };
      if (leadId) return { id: leadId, type: SALESFORCE_OBJECT_TYPES.LEAD };
    }
    return undefined;
  };
  return (
    <div className={styles.integrationDetailsContainer}>
      {hubspotIntegration?.id && (
        <IntegrationDetail
          integration={hubspotIntegration}
          iconColor="tangerine"
          bobjectType={bobjectType}
          bobjectId={bobject?.id?.objectId}
          externalId={getExternalIdByIntegrationType(CRM.HUBSPOT)?.id}
          externalObjectType={getExternalIdByIntegrationType(CRM.HUBSPOT)?.type}
        />
      )}
      {salesforceIntegration?.id && (
        <IntegrationDetail
          integration={salesforceIntegration}
          iconColor="softBloobirds"
          bobjectType={bobjectType}
          bobjectId={bobject?.id?.objectId}
          externalId={getExternalIdByIntegrationType(CRM.SALESFORCE)?.id}
          externalObjectType={getExternalIdByIntegrationType(CRM.SALESFORCE)?.type}
        />
      )}
    </div>
  );
};

IntegrationDetailGroup.propTypes = {
  bobject: PropTypes.object,
};

export default IntegrationDetailGroup;
