import React, { useEffect } from 'react';

import { ModalSection } from '@bloobirds-it/flamingo-ui';
import { useSalesforceDataModel } from '@bloobirds-it/hooks';
import { FieldsEntity } from '@bloobirds-it/types';
import { Sobject } from '@bloobirds-it/utils';
import { CustomObjectField } from '@bloobirds-it/wizard-modal-context';
import { animated, config, useSpring } from '@react-spring/web';

import { ChangeStatusStepDataProps } from '../../../../hooks/useChangeStatusStepData';
import { SobjectMandatoryFields } from './components/sobjectMandatoryFields';

const dictionary: Record<Sobject, Record<'resourceField' | 'annexTitle', string>> = {
  Opportunity: {
    resourceField: 'opportunityStatus',
    annexTitle: 'Opportunity status dependencies',
  },
  Lead: { resourceField: 'leadStatus', annexTitle: 'Lead status dependencies' },
  Contact: { resourceField: 'leadStatus', annexTitle: 'Contact status dependencies' },
  Account: { resourceField: 'companyStatus', annexTitle: 'Company status dependencies' },
};

interface StatusRestrictionInterface {
  salesforceStatus: string;
  fields: { field: string; required: boolean }[];
}

type SalesforceStatusFieldsRequirements = {
  objectType: Sobject;
  statusRestrictions: StatusRestrictionInterface[];
}[];

function parseStatusRestrictions(
  salesforceStatusFieldsRequirements: StatusRestrictionInterface[],
  datamodelFields: FieldsEntity[],
) {
  return salesforceStatusFieldsRequirements.reduce((acc, restriction) => {
    acc[restriction.salesforceStatus] = restriction.fields
      .map(({ field, required }) => {
        const matchingField = datamodelFields?.find(({ name }) => name === field);
        if (!matchingField) return null;
        return {
          ...matchingField,
          required,
        };
      })
      ?.filter(Boolean);
    return acc;
  }, {});
}

function parseRequirements(
  salesforceStatusFieldsRequirements: SalesforceStatusFieldsRequirements,
  salesforceDataModelFields: ReturnType<typeof useSalesforceDataModel>['types'],
) {
  return salesforceStatusFieldsRequirements?.reduce((acc, sobject) => {
    const typeInfos = salesforceDataModelFields?.[sobject.objectType.toLowerCase()];
    acc[dictionary[sobject.objectType].resourceField] = parseStatusRestrictions(
      sobject.statusRestrictions,
      typeInfos?.fields,
    );
    return acc;
  }, {} as Record<keyof ChangeStatusStepDataProps, { [status: string]: CustomObjectField[] }>);
}
const initialAnimationStyle = {
  opacity: 0,
  x: 0,
  width: '0px',
  marginLeft: '0px',
  paddingLeft: '0px',
};
const finalAnimationStyle = {
  opacity: 1,
  x: 1,
  width: '216px',
  marginLeft: '20px',
  paddingLeft: '16px',
};

const animationProgress = [0, 0.12, 0.26, 0.32, 0.38, 0.5, 1];

export const AnimatedSidebar = ({
  changeStatusStepData: { companyStatus, leadStatus, opportunityStatus },
  salesforceStatusFieldsRequirements,
  crmObject,
}: {
  changeStatusStepData: ChangeStatusStepDataProps;
  salesforceStatusFieldsRequirements: SalesforceStatusFieldsRequirements;
  crmObject: string;
}) => {
  const salesforceDataModel = useSalesforceDataModel();
  const [animationStyle, animationApi] = useSpring(() => ({
    config: config.slow,
    from: initialAnimationStyle,
  }));

  const parsedRequirements = parseRequirements(
    salesforceStatusFieldsRequirements,
    salesforceDataModel?.types,
  );

  useEffect(() => {
    if (!parsedRequirements) return;
    if (
      parsedRequirements.opportunityStatus?.[opportunityStatus] ||
      parsedRequirements.leadStatus?.[leadStatus] ||
      parsedRequirements.companyStatus?.[companyStatus]
    ) {
      animationApi.start({
        to: finalAnimationStyle,
      });
    } else {
      animationApi.start({
        to: initialAnimationStyle,
      });
    }
  }, [opportunityStatus, leadStatus, companyStatus, !!parsedRequirements]);

  const animation = {
    scale: animationStyle.x.to({
      range: animationProgress,
      output: [1, 1.11, 0.9, 1.06, 1.03, 1, 1],
    }),
    width: animationStyle.x.to({
      range: animationProgress,
      output: ['0px', '0px', '0px', '0px', '0px', '200px', '216px'],
    }),
  };

  if (!parsedRequirements) return null;
  return (
    <animated.div
      style={{
        borderLeft: '1px solid var(--lightPeanut)',
        ...animationStyle,
        ...animation,
      }}
    >
      <div>
        <ModalSection title="Mandatory fields">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {parsedRequirements.companyStatus?.[companyStatus] && (
              <SobjectMandatoryFields
                iconName="company"
                title={dictionary.Account.annexTitle}
                statuses={parsedRequirements.companyStatus[companyStatus]}
                sobject="Account"
                selectedStatus={companyStatus}
              />
            )}
            {crmObject === 'Lead' && parsedRequirements.leadStatus?.[leadStatus] && (
              <SobjectMandatoryFields
                iconName="personBody"
                title={dictionary.Lead.annexTitle}
                statuses={parsedRequirements.leadStatus[leadStatus]}
                sobject="Lead"
                selectedStatus={leadStatus}
              />
            )}
            {crmObject === 'Contact' && parsedRequirements.leadStatus?.[leadStatus] && (
              <SobjectMandatoryFields
                iconName="sfdcContacts"
                title={dictionary.Contact.annexTitle}
                statuses={parsedRequirements.leadStatus[leadStatus]}
                sobject="Contact"
                selectedStatus={leadStatus}
              />
            )}
            {parsedRequirements.opportunityStatus?.[opportunityStatus] && (
              <SobjectMandatoryFields
                iconName="sfdcOpp"
                title={dictionary.Opportunity.annexTitle}
                statuses={parsedRequirements.opportunityStatus[opportunityStatus]}
                sobject="Opportunity"
                selectedStatus={opportunityStatus}
              />
            )}
          </div>
        </ModalSection>
      </div>
    </animated.div>
  );
};
