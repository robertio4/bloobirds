import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Icon, Input, Text } from '@bloobirds-it/flamingo-ui';
import { useObjectCreationSettings, useSearchBobjects } from '@bloobirds-it/hooks';
import { ExtensionBobject, LinkedInLead } from '@bloobirds-it/types';

import { useCreationForm } from '../../../hooks/useCreationForm';
import { scrapLeadFullName } from '../../../utils/scrapper/profileScrapper';
import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeaderCircularBadge,
} from '../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../context';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import { LinkBobjectCard } from '../linkBobjectCard/linkBobjectCard';
import WhatsappBobjectCard from '../whatsappRenderer/layouts/components/card';
import styles from './styles.module.css';

export const CreateItHereCallToAction = ({ info, leadName }: { info?: any; leadName?: string }) => {
  const { t } = useTranslation();
  const { enabledObjectCreation } = useObjectCreationSettings();

  return (
    <div className={styles._createItHereCallToAction}>
      <Text size="l" color="peanut">
        {info
          ? t('sidePeek.multipleLeadsPage.footerInfo.title')
          : !enabledObjectCreation
          ? t('sidePeek.multipleLeadsPage.footerDisabledObjectCreation.title')
          : t('sidePeek.multipleLeadsPage.footerLinkedin.title')}
      </Text>
      <Text size="l" color="peanut" weight="heavy">
        {info
          ? t('sidePeek.multipleLeadsPage.footerInfo.description')
          : !enabledObjectCreation
          ? t('sidePeek.multipleLeadsPage.footerDisabledObjectCreation.description', {
              leadName,
            })
          : t('sidePeek.multipleLeadsPage.footerLinkedin.description')}
      </Text>
    </div>
  );
};

export interface MultipleLeadsProps {
  leads: LinkedInLead[];
  linkedInUrl?: string;
  salesNavigatorUrl?: string;
  setCurrentLead?: (lead: ExtensionBobject[]) => void;
  setExactMatch?: (exactMatch: boolean) => void;
  dataToUpdate?: { [x: string]: string };
  accountId?: string;
  sidePeekEnabled?: boolean;
  info?: {
    name: string;
    number: string;
    onSelect?: (bobjectId: string) => void;
  };
  leadName?: string;
}

export default (props: MultipleLeadsProps): JSX.Element => {
  const {
    leads,
    linkedInUrl,
    salesNavigatorUrl,
    setCurrentLead,
    setExactMatch,
    dataToUpdate,
    accountId,
    info,
    leadName,
  } = props;
  const { t } = useTranslation();
  const fullName = info?.name ?? scrapLeadFullName();
  const { setCreateLead, setSyncLead } = useCreationForm();
  const { setActiveBobject, setExtendedContext, setContactViewBobjectId } = useExtensionContext();
  const { setGoBack, setIsDuplicatePage, setShowBackButton } = useFloatingMenuContext();
  const [searchValue, setSearchValue] = useState<string>();
  const { results } = useSearchBobjects({ searchValue, accountId, bobjectTypes: ['Lead'] });
  const { enabledObjectCreation } = useObjectCreationSettings();

  const itemsToDisplay = searchValue?.length > 0 ? results : leads;

  useEffect(() => {
    setIsDuplicatePage(false);
    setShowBackButton(false);
    setGoBack(() => {
      setActiveBobject(null);
      setExtendedContext(null);
      setContactViewBobjectId(null);
    });
  }, []);

  useEffect(() => {
    if (leads?.length === 0 && !searchValue) {
      setSearchValue(fullName);
    }
  }, [leads, searchValue]);

  return (
    <BubbleWindow>
      <BubbleWindowHeaderCircularBadge
        title="?"
        backgroundColor="var(--lightBloobirds)"
        color="darkBloobirds"
        titleColor="darkBloobirds"
        borderColor="darkBloobirds"
      />
      <BubbleWindowContent className={styles._textWrapperMultipleLeads}>
        {info ? (
          <Text size="m" color="peanut" className={styles._text}>
            <Trans i18nKey="sidePeek.multipleLeadsPage.titleInfo" components={[<br key="0" />]} />
          </Text>
        ) : (
          <Text size="s" color="peanut" className={styles._text}>
            <Trans i18nKey="sidePeek.multipleLeadsPage.titleLinkedin" count={leads?.length ?? 0} />
          </Text>
        )}

        <div className={styles._leadManagementWrapper}>
          <Input
            width="100%"
            placeholder={`${t('common.search')} ...`}
            onChange={setSearchValue}
            value={searchValue}
            defaultValue={fullName}
            className={styles.input}
            icon="search"
          />
          {itemsToDisplay?.length > 0 ? (
            <div className={styles._leadListWrapper}>
              {itemsToDisplay.map((lead, index) =>
                info ? (
                  <WhatsappBobjectCard
                    key={index + (lead?.id?.value ?? lead?.rawBobject?.id)}
                    bobject={lead}
                    isLinkMode={true}
                    phoneNumber={info?.number}
                    onSelect={info?.onSelect}
                  />
                ) : (
                  <LinkBobjectCard
                    key={index + (lead?.id?.value ?? lead?.rawBobject?.id)}
                    bobject={lead}
                    linkedInUrl={linkedInUrl}
                    salesNavigatorURL={salesNavigatorUrl}
                    setCurrentBobject={setCurrentLead}
                    setExactMatch={setExactMatch}
                    dataToUpdate={dataToUpdate}
                  />
                ),
              )}
            </div>
          ) : searchValue?.length > 0 ? (
            <div className={styles.noResults}>
              <Icon size={36} color="softPeanut" name="searchNone" />
              <Text size="m" align="center" color="softPeanut">
                {t('sidePeek.multipleLeadsPage.noResultsFound', { searchValue })}
              </Text>
              <Text size="m" align="center" color="softPeanut">
                {t('sidePeek.multipleLeadsPage.otherSearchItem')}
              </Text>
            </div>
          ) : (
            <div className={styles.noResults}>
              <Icon size={36} color="softPeanut" name="search" />
              <Text size="m" align="center" color="softPeanut">
                {t('sidePeek.multipleLeadsPage.searchInDatabase')}
              </Text>
            </div>
          )}
        </div>
        <CreateItHereCallToAction info={info} leadName={leadName} />
      </BubbleWindowContent>
      <BubbleWindowFooter className={styles._buttons}>
        <Button
          iconLeft="send"
          expand
          onClick={() => (enabledObjectCreation ? setCreateLead(true) : setSyncLead(true))}
        >
          {enabledObjectCreation
            ? t('sidePeek.multipleLeadsPage.createNewLead')
            : t('sidePeek.multipleLeadsPage.createNewLeadDisabled')}
        </Button>
      </BubbleWindowFooter>
    </BubbleWindow>
  );
};
