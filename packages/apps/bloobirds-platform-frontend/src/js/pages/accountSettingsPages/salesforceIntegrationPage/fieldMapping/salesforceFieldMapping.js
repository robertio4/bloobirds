import React from 'react';
import FieldMapping from '../../../../layouts/integrationLayout/fieldMappingTab';
import { useParams } from 'react-router';
import { CRM } from '../../../../constants/integrations';

const SalesforceFieldMapping = () => {
  const { mappingName } = useParams();
  const link = 'https://support.bloobirds.com/hc/en-us/articles/360017740559';
  const mappings = [
    {
      name: 'ACTIVITY__SALESFORCE',
      bobjectType: 'Activity',
      sobjectType: 'Task',
      accountTrigger: 'ACTIVITY__SALESFORCE',
      text: 'Sync Bloobirds activities with Salesforce tasks',
      title: 'Activity mapping',
      paramName: 'activity',
    },
    {
      name: 'LEAD__SALESFORCE',
      bobjectType: 'Lead',
      sobjectType: 'Lead',
      accountTrigger: 'LEAD__SALESFORCE',
      text: 'Sync Bloobirds leads with Salesforce leads',
      title: 'Lead mapping',
      paramName: 'lead',
    },
    {
      name: 'LEAD_COMPANY__SALESFORCE',
      bobjectType: 'Lead',
      sobjectType: 'Lead',
      accountTrigger: '',
      text: 'Sync inbound company from Salesforce leads',
      title: 'Lead Company mapping',
      paramName: 'lead_company',
    },
    {
      name: 'CONTACT__SALESFORCE',
      bobjectType: 'Lead',
      sobjectType: 'Contact',
      accountTrigger: 'LEAD__SALESFORCE',
      text: 'Sync Bloobirds leads with Salesforce contacts',
      title: 'Contact mapping',
      paramName: 'contact',
    },
    {
      name: 'COMPANY__SALESFORCE',
      bobjectType: 'Company',
      sobjectType: 'Account',
      accountTrigger: 'COMPANY__SALESFORCE',
      text: 'Sync Bloobirds companies with Salesforce accounts',
      title: 'Company mapping',
      paramName: 'company',
    },
    {
      name: 'MEETING__SALESFORCE',
      bobjectType: 'Activity',
      sobjectType: 'Event',
      accountTrigger: 'MEETING__SALESFORCE',
      text: 'Sync Bloobirds meetings with Salesforce events',
      title: 'Meeting mapping',
      paramName: 'meeting',
    },
    {
      name: 'OPPORTUNITY__SALESFORCE',
      bobjectType: 'Opportunity',
      sobjectType: 'Opportunity',
      accountTrigger: 'OPPORTUNITY__SALESFORCE',
      text: 'Sync Bloobirds opportunities with Salesforce opportunities',
      title: 'Opportunity mapping',
      paramName: 'opportunity',
    },
    {
      name: 'CAMPAIGN_MEMBERS__SALESFORCE',
      bobjectType: 'Activity',
      sobjectType: 'CampaignMember',
      accountTrigger: 'ACTIVITY__SALESFORCE',
      text: 'Sync Bloobirds Inbound activities with Salesforce Campaign Members',
      title: 'Campaign member mapping',
      paramName: 'activity',
    },
  ];

  const initMapping = mappings.find(map => mappingName === map.paramName) || mappings[0];

  return (
    <FieldMapping crm={CRM.SALESFORCE} mappings={mappings} initMapping={initMapping} link={link} />
  );
};
export default SalesforceFieldMapping;
