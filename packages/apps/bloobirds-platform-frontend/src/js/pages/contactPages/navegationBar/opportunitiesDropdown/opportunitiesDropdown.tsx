import React, { FC, useMemo } from 'react';

import { Button, IconButton, Label, Text } from '@bloobirds-it/flamingo-ui';
import { useNoStatusOppSetting } from '@bloobirds-it/hooks';
import { Bobject, BOBJECT_TYPES } from '@bloobirds-it/types';

import { opportunityUrl } from '../../../../app/_constants/routes';
import BobjectName from '../../../../components/bobjectName';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  useBobjectDetails,
  useBobjectFormVisibility,
  useEntity,
  useHover,
  useRouter,
} from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { useSelectedOpportunity } from '../../../../hooks/useSelectedOpportunity';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { formatDateAsText } from '@bloobirds-it/utils';
import { ellipsis } from '../../../../utils/strings.utils';
import styles from './opportunitiesDropdown.module.css';
import { useTranslation } from "react-i18next";

const CLOSED_OPPORTUNITY_LOGIC_ROLES = Object.seal({
  OPPORTUNITY__STATUS__CLOSED_WON: 'OPPORTUNITY__STATUS__CLOSED_WON',
  OPPORTUNITY__STATUS__CLOSED_LOST: 'OPPORTUNITY__STATUS__CLOSED_LOST',
});

interface OpportunityCardProps {
  opportunity: Bobject;
  toggleDropdownVisibility: () => void;
}

const OpportunityCard: FC<OpportunityCardProps> = ({ opportunity, toggleDropdownVisibility }) => {
  const { history } = useRouter();
  const bobjectFields = useEntity('bobjectFields');
  const { openBobjectDetails } = useBobjectDetails();
  const { openEditModal } = useBobjectFormVisibility();
  const [divRef, isHover] = useHover();
  const { updateSelectedOpportunity } = useSelectedOpportunity();
  const isNoStatusOppSetting = useNoStatusOppSetting();
  const hasSalesEnabled = useFullSalesEnabled();
  const { isSmallDesktop } = useMediaQuery();
  const {t} = useTranslation();

  const parsedOpportunity = useMemo(
    () => ({
      nameField: getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
      amount: getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT),
      status: getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS),
      closeDate: getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE),
      company: getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY),
    }),
    [opportunity],
  );

  const amountFieldPrefix = useMemo(
    () => bobjectFields.findByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT)?.layoutNumberPrefix,
    [bobjectFields],
  );

  return (
    <div
      ref={divRef}
      data-test={`Opportunity-${parsedOpportunity.nameField.text}`}
      className={styles._card__container}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        const url = opportunityUrl(
          hasSalesEnabled ? undefined : parsedOpportunity.company.value.split('/')[2],
          opportunity.id.objectId,
        );
        history.push(url);
        updateSelectedOpportunity(opportunity);
        toggleDropdownVisibility();
      }}
    >
      <div className={styles._card__column}>
        <BobjectName
          field={parsedOpportunity.nameField}
          bobject={opportunity}
          type={BOBJECT_TYPES.OPPORTUNITY}
          ellipsisChar={21}
          toggleDropdown={toggleDropdownVisibility}
          canEdit={false}
        />
        <Text color="peanut" size="s" weight="bold">
          {parsedOpportunity.amount && `${amountFieldPrefix || '$'}${parsedOpportunity.amount}`}
        </Text>
      </div>
      {isHover ? (
        <div className={styles._hover_buttons_wrapper}>
          <IconButton
            name="edit"
            size={16}
            onClick={e => {
              e.stopPropagation();
              openEditModal({ bobject: opportunity });
              toggleDropdownVisibility();
            }}
          />
          <div className={styles._preview__button__wrapper}>
            <Button
              onClick={e => {
                e.stopPropagation();
                openBobjectDetails({ id: opportunity?.id.value });
                toggleDropdownVisibility();
              }}
              size="small"
              variant="secondary"
              uppercase={false}
              iconLeft={isSmallDesktop ? 'eye' : null}
            >
              {isSmallDesktop ? '' : 'Preview'}
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles._card__status}>
          {parsedOpportunity?.status.text && !isNoStatusOppSetting && (
            <Label
              overrideStyle={{
                color: parsedOpportunity.status.valueTextColor,
                backgroundColor: parsedOpportunity.status.valueBackgroundColor,
                borderColor: parsedOpportunity.status.valueBackgroundColor,
              }}
            >
              {ellipsis(parsedOpportunity.status.text, 26)}
            </Label>
          )}
        </div>
      )}
      <Text color="peanut" size="xs">
        Closes {formatDateAsText({ text: parsedOpportunity.closeDate, t })}
      </Text>
    </div>
  );
};

const OpportunitiesDropdown = ({ toggleVisibility, opportunities }) => {
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');

  const sortedOpportunities = useMemo(
    () =>
      opportunities?.reduce(
        (res, opportunity) => {
          const field = getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS);
          const valueStatusField = bobjectPicklistFieldValues?.get(field?.value);
          CLOSED_OPPORTUNITY_LOGIC_ROLES[valueStatusField?.logicRole]
            ? res.closed.push(opportunity)
            : res.open.push(opportunity);
          return res;
        },
        { closed: [], open: [] },
      ),
    [opportunities, bobjectPicklistFieldValues],
  );

  return (
    <div className={styles._dropdown__container}>
      {sortedOpportunities.open.length > 0 && (
        <>
          <div className={styles._header__container}>
            <Text uppercase size="s" color="softPeanut">
              Open Opportunities
            </Text>
          </div>
          {sortedOpportunities.open.map(opportunity => (
            <OpportunityCard
              opportunity={opportunity}
              toggleDropdownVisibility={toggleVisibility}
              key={opportunity.id.value}
            />
          ))}
        </>
      )}
      {sortedOpportunities.closed.length > 0 && (
        <>
          <div className={styles._header__container}>
            <Text uppercase size="s" color="softPeanut">
              Closed Opportunities
            </Text>
          </div>
          {sortedOpportunities.closed.map(opportunity => (
            <OpportunityCard
              opportunity={opportunity}
              toggleDropdownVisibility={toggleVisibility}
              key={opportunity.id.value}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default OpportunitiesDropdown;
