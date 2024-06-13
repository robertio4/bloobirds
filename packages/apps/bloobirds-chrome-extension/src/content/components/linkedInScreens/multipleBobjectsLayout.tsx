import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Icon, Input, Text } from '@bloobirds-it/flamingo-ui';
import { useActiveAccountId, useSearchBobjects } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LinkedInCompany,
  LinkedInLead,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { getTextFromLogicRole } from '@bloobirds-it/utils';

import { useCreationForm } from '../../../hooks/useCreationForm';
import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeaderCircularBadge,
} from '../bubbleWindow/bubbleWindow';
import { LinkBobjectCard, LinkBobjectCardProps } from '../linkBobjectCard/linkBobjectCard';
import { CreateItHereCallToAction } from './multipleLeadsPage';
import styles from './styles.module.css';

export const MultipleBobjectsPage = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return <BubbleWindow>{children}</BubbleWindow>;
};

const parseBobjectToLinkedInBobject = (bobject: Bobject) => {
  const bobjectType = bobject.id.typeName;
  let bobjectToReturn: any = { bobjectType: bobject.id.typeName, id: bobject.id };
  if (bobjectType === BobjectTypes.Lead) {
    bobjectToReturn = {
      ...bobjectToReturn,
      fullName: getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
      jobTitle: getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE),
      email: getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.EMAIL),
      phone: getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.PHONE),
    };
  } else if (bobjectType === BobjectTypes.Company) {
    bobjectToReturn = {
      ...bobjectToReturn,
      companyName: getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME),
      website: getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE),
    };
  } else if (bobjectType === BobjectTypes.Opportunity) {
    bobjectToReturn = {
      ...bobjectToReturn,
      name: getTextFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
      amount: getTextFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT),
    };
  }
  return bobjectToReturn;
};

const List: {
  (props: {
    bobjects: LinkedInLead[] | LinkedInCompany[] | Bobject[];
    searchValueController?: [string, React.Dispatch<React.SetStateAction<string>>];
    itemExtraProps?: Omit<LinkBobjectCardProps, 'bobject'>;
  }): JSX.Element;
  (props: { children: JSX.Element }): JSX.Element;
} = ({ bobjects, itemExtraProps, searchValueController, children }) => {
  const [searchValue, setSearchValue] = searchValueController || [];
  const accountId = useActiveAccountId();
  const { t } = useTranslation();
  const { t: bobjectT } = useTranslation();
  const { results } = useSearchBobjects({ searchValue, accountId });

  const itemsToDisplay = searchValue?.length > 0 ? results : bobjects;

  return (
    <BubbleWindowContent className={styles._textWrapperMultipleLeads}>
      {children ? (
        children
      ) : (
        <>
          <Text size="s" color="peanut" className={styles._text}>
            <Trans
              i18nKey="sidePeek.duplicatesLayout.possibleMatches"
              values={{
                count: itemsToDisplay?.length,
                bobjectType: bobjectT(
                  `bobjectTypes.${bobjects[0]?.id?.typeName?.toLowerCase() ?? 'lead'}`,
                ),
              }}
            />
          </Text>
          <div className={styles._leadManagementWrapper}>
            {searchValueController && (
              <Input
                width="100%"
                placeholder={`${t('common.search')} ...`}
                onChange={setSearchValue}
                value={searchValue}
                defaultValue={searchValue}
                className={styles.input}
                icon="search"
              />
            )}
            {itemsToDisplay?.length > 0 ? (
              <div className={styles._leadListWrapper}>
                {itemsToDisplay.map((bobject, index) => {
                  const isBobject = bobject?.raw;
                  let parsedBobject = bobject;
                  if (isBobject) {
                    parsedBobject = parseBobjectToLinkedInBobject(bobject);
                  }
                  return (
                    <LinkBobjectCard
                      key={
                        index + (bobject?.id?.value ? bobject.id.value : bobject?.rawBobject?.id)
                      }
                      bobject={parsedBobject}
                      {...itemExtraProps}
                    />
                  );
                })}
              </div>
            ) : searchValue?.length > 0 ? (
              <div className={styles.noResults}>
                <Icon size={36} color="softPeanut" name="searchNone" />
                <Text size="m" align="center" color="softPeanut">
                  {t('sidePeek.duplicatesLayout.noResults', { searchValue })}
                </Text>
                <Text size="m" align="center" color="softPeanut">
                  {t('sidePeek.duplicatesLayout.tryOtherTerms')}
                </Text>
              </div>
            ) : (
              <div className={styles.noResults}>
                <Icon size={36} color="softPeanut" name="search" />
                <Text size="m" align="center" color="softPeanut">
                  {t('sidePeek.duplicatesLayout.searchOnDB')}
                </Text>
              </div>
            )}
          </div>
        </>
      )}
    </BubbleWindowContent>
  );
};

const Footer = ({ children }: { children?: JSX.Element }) => {
  const { setCreateLead } = useCreationForm();
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.duplicatesLayout' });
  return (
    <BubbleWindowFooter className={styles._buttons}>
      {children ? (
        children
      ) : (
        <>
          <CreateItHereCallToAction />
          <Button iconLeft="send" expand onClick={() => setCreateLead(true)}>
            {t('createNewLead')}
          </Button>
        </>
      )}
    </BubbleWindowFooter>
  );
};

const Header = ({ children }: { children?: JSX.Element }) => (
  <>
    <BubbleWindowHeaderCircularBadge
      title="?"
      backgroundColor="var(--lightBloobirds)"
      color="darkBloobirds"
      titleColor="darkBloobirds"
      borderColor="darkBloobirds"
    />
    {children}
  </>
);

export const MultipleBobjectsLayout = Object.assign(MultipleBobjectsPage, {
  Header,
  List,
  Footer,
});
