import React from 'react';
import FieldMapping from '../../../../layouts/integrationLayout/fieldMappingTab';
import { CRM } from '../../../../constants/integrations';

const HubspotFieldMapping = () => {
  const link = 'https://support.bloobirds.com/hc/en-us/articles/360018712399';
  const mappings = [
    {
      name: 'LEAD__HUBSPOT',
      bobjectType: 'Lead',
      accountTrigger: 'LEAD__HUBSPOT',
      text: 'Sync Bloobirds leads with HubSpot contacts',
      title: 'Contact mapping',
      hubsject: 'Lead',
    },
    {
      name: 'COMPANY__HUBSPOT',
      bobjectType: 'Company',
      accountTrigger: 'COMPANY__HUBSPOT',
      text: 'Sync Bloobirds companies with HubSpot accounts',
      title: 'Company mapping',
      hubsject: 'Company',
    },
    {
      name: 'MEETING__HUBSPOT',
      bobjectType: 'Deal',
      accountTrigger: 'MEETING__HUBSPOT',
      text: 'Sync Bloobirds meetings with HubSpot events',
      title: 'Deal mapping',
      hubsject: 'Deal',
    },
    {
      name: 'HUBSPOT_FORM_SUBMISSIONS',
      bobjectType: 'Activity',
      accountTrigger: undefined,
      text: 'Map Form Submissions to Inbound Activities',
      title: 'Form Submissions',
      hubsject: 'Lead',
    },
    {
      name: 'OPPORTUNITY__HUBSPOT',
      bobjectType: 'Deal',
      accountTrigger: 'OPPORTUNITY__HUBSPOT',
      text: 'Sync Bloobirds opportunities with HubSpot deals',
      title: 'Opportunity mapping',
      hubsject: 'Deal',
    },
  ];

  const sobjectMap = {
    LEAD__HUBSPOT: 'Contact',
    CONTACT__HUBSPOT: 'Contact',
    ACTIVITY__HUBSPOT: 'Task',
    MEETING__HUBSPOT: 'Deal',
    COMPANY__HUBSPOT: 'Account',
    OPPORTUNITY__HUBSPOT: 'Deal',
  };
  return (
    <FieldMapping
      crm={CRM.HUBSPOT}
      mappings={mappings}
      initMapping={mappings[0]}
      link={link}
      sobjectMap={sobjectMap}
    />
  );
};
export default HubspotFieldMapping;
