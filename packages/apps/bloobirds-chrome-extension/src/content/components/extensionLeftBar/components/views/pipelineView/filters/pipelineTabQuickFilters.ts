import { useTranslation } from 'react-i18next';

import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import { BobjectTypes, FIELDS_LOGIC_ROLE, QuickFilter, SearchType } from '@bloobirds-it/types';

import {
  ACTIVE_STATUS_LOGIC_ROLE,
  CONTACTED_STATUS_LOGIC_ROLE,
  DELIVERED_STATUS_LOGIC_ROLE,
  ENGAGED_STATUS_LOGIC_ROLE,
  MEETING_STATUS_LOGIC_ROLE,
  NURTURING_STATUS_LOGIC_ROLE,
  ON_PROSPECTION_STATUS_LOGIC_ROLE,
} from '../pipelineTab.constants';

export const pipelineTabQuickFilters = (tabBobject, dataModel): QuickFilter[] => {
  const { t } = useTranslation();
  const isNoStatusAccount = useIsNoStatusPlanAccount();

  let quickFilters = [];

  if (tabBobject === BobjectTypes.Company || tabBobject === BobjectTypes.Lead) {
    const statusLR = FIELDS_LOGIC_ROLE[tabBobject].STATUS;
    const statusField = dataModel?.findFieldByLogicRole(statusLR);

    const deliveredLR = DELIVERED_STATUS_LOGIC_ROLE[tabBobject];
    const deliveredField = statusField.values.find(a => a.logicRole === deliveredLR);

    const onProsprectionLR = ON_PROSPECTION_STATUS_LOGIC_ROLE[tabBobject];
    const onProsprectionField = statusField.values.find(a => a.logicRole === onProsprectionLR);

    const contactedLR = CONTACTED_STATUS_LOGIC_ROLE[tabBobject];
    const contactedField = statusField.values.find(a => a.logicRole === contactedLR);

    const engagedLR = ENGAGED_STATUS_LOGIC_ROLE[tabBobject];
    const engagedField = statusField.values.find(a => a.logicRole === engagedLR);

    const meetingLR = MEETING_STATUS_LOGIC_ROLE[tabBobject];
    const meetingField = statusField.values.find(a => a.logicRole === meetingLR);

    const nurturingLR = NURTURING_STATUS_LOGIC_ROLE[tabBobject];
    const nurturingField = statusField.values.find(a => a.logicRole === nurturingLR);

    const salesStatusLR = FIELDS_LOGIC_ROLE[tabBobject].SALES_STATUS;
    const salesStatusField = dataModel?.findFieldByLogicRole(salesStatusLR);

    const activeLR = ACTIVE_STATUS_LOGIC_ROLE[tabBobject];
    const activeField = salesStatusField.values.find(a => a.logicRole === activeLR);

    quickFilters = [
      ...(!isNoStatusAccount
        ? [
            {
              id: 'delivered',
              name: t('leftBar.quickFilters.delivered'),
              color: 'peanut',
              type: 'ORs',
              filters: [
                {
                  bobjectFieldId: statusField?.id,
                  values: [
                    {
                      bobjectPicklistValue: deliveredField?.id,
                      textValue: null,
                      searchType: SearchType.EXACT,
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      {
        id: 'activePipeline',
        name: t('leftBar.quickFilters.activePipeline'),
        color: 'peanut',
        type: 'ORs',
        filters: [
          {
            bobjectFieldId: salesStatusField?.id,
            values: [
              {
                bobjectPicklistValue: activeField?.id,
                textValue: null,
                searchType: SearchType.EXACT,
              },
            ],
          },
          {
            bobjectFieldId: statusField?.id,
            values: [
              {
                bobjectPicklistValue: onProsprectionField?.id,
                textValue: null,
                searchType: SearchType.EXACT,
              },
              {
                bobjectPicklistValue: contactedField?.id,
                textValue: null,
                searchType: SearchType.EXACT,
              },
              {
                bobjectPicklistValue: engagedField?.id,
                textValue: null,
                searchType: SearchType.EXACT,
              },
              {
                bobjectPicklistValue: meetingField?.id,
                textValue: null,
                searchType: SearchType.EXACT,
              },
              {
                bobjectPicklistValue: nurturingField?.id,
                textValue: null,
                searchType: SearchType.EXACT,
              },
            ],
          },
        ],
      },
    ];
  }

  return quickFilters;
};
