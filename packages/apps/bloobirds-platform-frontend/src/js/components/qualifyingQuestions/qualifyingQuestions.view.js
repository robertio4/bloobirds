import React, { useEffect, useMemo, useState } from 'react';

import { Button, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import clsx from 'clsx';
import { sortBy } from 'lodash';

import useActiveMessagingFilters from '../../hooks/useActiveMessagingFilters';
import useHasCompanyEditPermissions from '../../hooks/useHasCompanyEditPermissions';
import { useQualifyingQuestions } from '../../hooks/useQualifyingQuestions';
import { useSelectedLead } from '../../hooks/useSelectedLead';
import { useContactBobjects } from '../../pages/contactPages/contactPageContext';
import BannerPlaybook from '../../pages/contactPages/contactTabs/messagingTabs/messagingTab/bannerPlaybook';
import { getFieldById, getOpportunityLeadsIds, isOpportunity } from '../../utils/bobjects.utils';
import { useUserSettings } from '../userPermissions/hooks';
import QualifyingQuestion from './qualifyingQuestion/qualifyingQuestion';
import styles from './qualifyingQuestions.module.css';
import QualifiyingQuestionsPlaceholder from './qualifyingQuestionsPlaceholder/qualifiyingQuestionsPlaceholder';

const EmptyContainer = ({ children }) => (
  <div className={styles.emptyContainer}>
    <Text size="m" align="center" color="softPeanut">
      {children}
    </Text>
  </div>
);

const QualifyingQuestionsList = () => {
  const { leads: companyLeads, company, isValidating, active } = useContactBobjects();
  const { selectedLead } = useSelectedLead();
  const hasPermission = useHasCompanyEditPermissions();
  const filters = useActiveMessagingFilters();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const isOpportunityBobject = isOpportunity(active);
  const opportunityLeads = useMemo(() => {
    const oppLeads = getOpportunityLeadsIds(active);
    const filteredLeads = companyLeads?.filter(lead => oppLeads?.includes(lead?.id?.value));
    return filteredLeads?.map(lead => {
      const role = active?.fields?.find(field => field?.value === lead?.id?.value);
      return {
        ...lead,
        contactRole: role?.logicRole,
      };
    });
  }, [companyLeads, active]);
  const settings = useUserSettings();
  const {
    user: { dialerType },
  } = settings;

  const leads = isOpportunityBobject ? opportunityLeads : companyLeads;
  const bobjectType = !leads?.length ? BOBJECT_TYPES.COMPANY : BOBJECT_TYPES.LEAD;
  const [qualifyingQuestionsToSave, setQualifyingQuestionsToSave] = useState([]);
  const {
    qualifyingQuestions,
    updateQualifyingQuestionsValueInBulk,
    isLoading,
  } = useQualifyingQuestions({
    ...filters,
    enabled: true,
    bobjectType,
  });

  useEffect(() => {
    if (isValidating) {
      setQualifyingQuestionsToSave([]);
    }
  }, [isValidating]);

  if (qualifyingQuestions?.length === 0 && !isLoading) {
    return (
      <EmptyContainer>There are no qualifying questions. Try another combination.</EmptyContainer>
    );
  }

  return (
    <div className={styles.qualifyingQuestionList}>
      {isLoading ? (
        <QualifiyingQuestionsPlaceholder />
      ) : (
        <>
          {sortBy(qualifyingQuestions, 'question').map(({ id, ...props }, index) => {
            const qqFieldValue = getFieldById(selectedLead || company, id)?.value;
            const currentValue = qualifyingQuestionsToSave.find(({ id: qqId }) => qqId === id)
              ?.value;
            const qqValue = currentValue || qqFieldValue;

            return (
              <QualifyingQuestion
                {...props}
                disabled={!hasPermission}
                key={id}
                value={qqValue}
                onChange={value => {
                  const valueToSave = value;
                  const shouldRemoveQQToSave = (qqFieldValue || '') === valueToSave;
                  const qqCleaned = qualifyingQuestionsToSave.filter(({ id: qqId }) => qqId !== id);
                  const qqToSave = shouldRemoveQQToSave
                    ? qqCleaned
                    : [
                        ...qqCleaned,
                        {
                          id,
                          value: valueToSave,
                          bobjectId: selectedLead?.id.objectId || company?.id.objectId,
                        },
                      ];
                  setQualifyingQuestionsToSave(qqToSave);

                  if (!hasChanges) {
                    setHasChanges(true);
                  }

                  if (qqToSave.length === 0) {
                    setHasChanges(false);
                  }
                }}
              />
            );
          })}
        </>
      )}
      {hasChanges && (
        <div
          className={clsx(styles.footbar, {
            [styles.footbar_displaced]:
              dialerType === 'AIRCALL_DIALER' || dialerType === 'JUST_CALL_DIALER',
          })}
        >
          <Button
            variant="secondary"
            color="purple"
            onClick={() => {
              setHasChanges(false);
              setQualifyingQuestionsToSave([]);
            }}
          >
            Cancel
          </Button>
          <Button
            color="purple"
            onClick={() => {
              setIsSubmitting(true);
              const qqToSave = qualifyingQuestionsToSave.map(question => {
                return {
                  ...question,
                  value: question?.value === 'none' ? '' : question?.value,
                };
              });
              updateQualifyingQuestionsValueInBulk(bobjectType, qqToSave).then(() => {
                setIsSubmitting(false);
                setHasChanges(false);
              });
            }}
          >
            {isSubmitting ? <Spinner color="white" size={14} name="loadingCircle" /> : 'Save'}
          </Button>
        </div>
      )}
    </div>
  );
};

const QualifyingQuestions = () => (
  <section>
    <BannerPlaybook />
    <QualifyingQuestionsList />
  </section>
);

export default QualifyingQuestions;
