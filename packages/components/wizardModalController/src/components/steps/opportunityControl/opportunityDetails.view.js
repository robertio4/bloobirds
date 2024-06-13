import React, { useMemo } from 'react';

import { Label, Text } from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import { ellipsis, formatDate } from '@bloobirds-it/utils';

import styles from './opportunityDetails.module.css';

const OpportunityDetails = ({ opportunity }) => {
  const dataModel = useDataModel();
  const statusDataModelField = dataModel?.findFieldByLogicRole('OPPORTUNITY__STATUS');
  const parsedOpportunity = useMemo(
    () => ({
      nameField: opportunity.name,
      amount: opportunity.amount,
      status: statusDataModelField
        ? statusDataModelField.values.find(value => value.id === opportunity.status)
        : null,
      closeDate: opportunity.closeDate,
      // type: getFieldByName(opportunity, 'Type'),
      creationDate: opportunity.creationDateTime,
    }),
    [opportunity],
  );

  const amountDataModelField = dataModel?.findFieldByLogicRole('OPPORTUNITY__AMOUNT');
  const amountFieldPrefix = amountDataModelField ? amountDataModelField?.prefix : '€';

  return (
    <div className={styles._container}>
      <div className={styles._title__container}>
        <Text dataTest="Text-opportunityName" size="l" align="center">
          &quot;{parsedOpportunity.nameField}&quot;
        </Text>
      </div>
      <div className={styles._content__container}>
        <div className={styles._tag__container}>
          <div className={styles._tag__content}>
            <Text dataTest="Text-opportunityAmount" weight="bold" align="center" size="xxxl">
              {`${amountFieldPrefix}${Number(parsedOpportunity?.amount).toFixed(2)}`}
            </Text>
            <Text align="center" size="s" htmlTag="span">
              {parsedOpportunity.type}
            </Text>
          </div>
        </div>
        {parsedOpportunity.status?.name && (
          <div className={styles._status__container}>
            <Label
              dataTest="opportunityStatus"
              overrideStyle={{
                color: parsedOpportunity?.status.textColor,
                backgroundColor: parsedOpportunity?.status.backgroundColor,
                borderColor: 'var(--white)',
              }}
            >
              {ellipsis(parsedOpportunity?.status?.name, 26)}
            </Label>
          </div>
        )}
      </div>
      <div className={styles._creationDate__container}>
        <Text size="s" color="softPeanut">
          {`Created ${formatDate(
            new Date(parsedOpportunity?.creationDate),
            "MMM dd 'at' hh:mm OOO",
          )}`}
        </Text>
      </div>
    </div>
  );
};

export default OpportunityDetails;
