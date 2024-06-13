import React from 'react';
import { useTranslation } from 'react-i18next';

import { Chip, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useIsB2CAccount } from '@bloobirds-it/hooks';
import { MIXPANEL_EVENTS } from '@bloobirds-it/types';
import classNames from 'clsx';
import mixpanel from 'mixpanel-browser';

import { SearchType } from '../recipientSearchInput';
import styles from '../recipientSearchInput.module.css';

const getTooltipText = ({ hasCompany, hasValuesAdded, hasNoEmailsLeftOnContext, t }) => {
  if (!hasCompany) {
    return !hasValuesAdded ? t('cannotSearchEmailsInCopmany') : t('currentEmailDoesNotHaveCompany');
  } else if (hasNoEmailsLeftOnContext) {
    return t('allRelatedEmailsHaveBeenAdded');
  } else {
    return null;
  }
};

export const DropdownHeader = ({
  hasValuesAdded,
  searchType,
  hasCompany,
  hasNoEmailsLeftOnContext,
  handleDropdownChipClick,
  allCoworkersAdded,
}: {
  hasValuesAdded: boolean;
  searchType: SearchType;
  hasCompany: boolean;
  hasNoEmailsLeftOnContext: boolean;
  handleDropdownChipClick: (type: SearchType) => void;
  allCoworkersAdded: boolean;
}) => {
  const isB2CAccount = useIsB2CAccount();
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.recipientSearchInput.header',
  });
  const tooltip = getTooltipText({ hasValuesAdded, hasCompany, hasNoEmailsLeftOnContext, t });
  const disableContextSearch = !hasCompany || hasNoEmailsLeftOnContext;
  return (
    <div className={styles.chipGroupDiv}>
      {!isB2CAccount && (
        <div
          className={classNames({
            [styles.chipSelected]: searchType === SearchType.relatedBobjects,
          })}
        >
          <Tooltip title={tooltip} position="top">
            <Chip
              size="small"
              disabled={disableContextSearch}
              variant={disableContextSearch ? 'primary' : 'secondary'}
              selected={searchType === SearchType.relatedBobjects}
              onClick={() => {
                handleDropdownChipClick(SearchType.relatedBobjects);
                mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEARCH_EMAIL_OPTIONS);
              }}
            >
              {t('searchInCompany')}
            </Chip>
          </Tooltip>
        </div>
      )}
      <div
        className={classNames({
          [styles.chipSelected]: searchType === SearchType.globalSearch,
        })}
      >
        <Chip
          size="small"
          selected={searchType === SearchType.globalSearch}
          onClick={() => {
            handleDropdownChipClick(SearchType.globalSearch);
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEARCH_EMAIL_OPTIONS);
          }}
        >
          {t('searchEverywhere')}
        </Chip>
      </div>
      <div
        className={classNames({
          [styles.chipSelected]: searchType === SearchType.companySearch,
        })}
      >
        <Chip
          size="small"
          variant={allCoworkersAdded ? 'primary' : 'secondary'}
          disabled={allCoworkersAdded}
          selected={searchType === SearchType.companySearch}
          onClick={() => {
            handleDropdownChipClick(SearchType.companySearch);
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEARCH_EMAIL_OPTIONS);
          }}
        >
          {t('coworkersEmails')}
        </Chip>
      </div>
    </div>
  );
};
