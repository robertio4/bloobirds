import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { ContactViewTab, ExtensionCompany } from '@bloobirds-it/types';

import { BubbleWindow } from '../../../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../../../context';
import { CompanyBriefCard } from '../../components/companyBriefCard/companyBriefCard';
import { CompanyBriefHeader } from '../../components/companyBriefHeader/companyBriefHeader';
import { ContactViewContent } from '../../components/contactViewContent/contactViewContent';
import NoBobjectsPage from '../noBobjectsPage/noBobjectsPage';
import { HandleBobjectRelationsModal } from './components/handleBobjectRelationsModal';
import styles from './contactRelatedCompanies.module.css';

const AddParentCompanyButton = ({
  size,
  onClick,
}: {
  size: 'small' | 'medium';
  onClick: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <Button
      size={size}
      variant="secondary"
      iconLeft="addCircle"
      uppercase={false}
      onClick={onClick}
    >
      <Text color="bloobirds" size={size === 'small' ? 'xs' : 's'}>
        {size === 'small'
          ? t('sidePeek.noObjectsPage.addParentCompany')
          : t('sidePeek.noObjectsPage.addRelationship')}
      </Text>
    </Button>
  );
};

const CompaniesDisplay = ({ companies }: { companies: ExtensionCompany[] }) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(companies.length <= 3);
  const companiesToShow = showAll ? companies : companies.slice(0, 3);
  return (
    <div className={styles._companies_display}>
      {companiesToShow.map(company => (
        <CompanyBriefCard key={company.id.objectId} company={company} />
      ))}
      {!showAll && (
        <Button variant="clear" onClick={() => setShowAll(true)} uppercase={false}>
          {t('common.showAll')}
        </Button>
      )}
    </div>
  );
};

const RelatedBobjectsView = ({
  company,
  parentCompany,
  childCompanies,
  setModalOpen,
  siblingCompanies,
  sidePeekEnabled,
}: {
  company: ExtensionCompany;
  parentCompany?: ExtensionCompany;
  childCompanies?: ExtensionCompany[];
  siblingCompanies?: ExtensionCompany[];
  setModalOpen: (value: string) => void;
  sidePeekEnabled?: boolean;
}) => {
  const defaultButtonProps = {
    size: 'small',
    variant: 'secondary',
    uppercase: false,
    className: styles.editRelationshipText,
  };
  const { t } = useTranslation();
  const longText = document.querySelector('#floating-menu')?.clientWidth > 470;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.relatedEntityBlock}>
          <div className={styles.infoHeader}>
            <Text size="xs" weight="bold" color="softPeanut" className={styles.sectionTitle}>
              {t('sidePeek.contactRelatedCompanies.parentCompany')}
            </Text>
            {!parentCompany ? (
              <AddParentCompanyButton size="small" onClick={() => setModalOpen('PARENT')} />
            ) : (
              <div className={styles.buttonContainer}>
                <Button
                  {...defaultButtonProps}
                  iconLeft="cross"
                  onClick={() => setModalOpen('DELETE_PARENT')}
                >
                  <Text size="xs" color="bloobirds">
                    {sidePeekEnabled && longText
                      ? t('sidePeek.contactRelatedCompanies.removeRelationships')
                      : t('sidePeek.contactRelatedCompanies.remove')}
                  </Text>
                </Button>
                <Button
                  {...defaultButtonProps}
                  iconLeft="refresh"
                  onClick={() => setModalOpen('PARENT')}
                >
                  <Text size="xs" color="bloobirds">
                    {sidePeekEnabled && longText
                      ? t('sidePeek.contactRelatedCompanies.replaceRelationships')
                      : t('sidePeek.contactRelatedCompanies.replace')}
                  </Text>
                </Button>
              </div>
            )}
          </div>
          <div className={styles.entitiesList}>
            {parentCompany && <CompanyBriefCard company={parentCompany} />}
            {siblingCompanies?.length > 1 && (
              <div className={styles.siblingsWrapper}>
                <div className={styles.siblingsTitle}>
                  <Icon name="child" color="softPeanut" size={16} />
                  <Text size="xs" color="softPeanut" weight="bold">
                    {t('sidePeek.contactRelatedCompanies.siblingCompanies')}
                  </Text>
                </div>
                <CompaniesDisplay
                  /* This should come filtered from the backend */
                  companies={siblingCompanies.filter(
                    ({ id: { objectId } }) => objectId !== company.id.objectId,
                  )}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.relatedEntityBlock}>
          <div className={styles.infoHeader}>
            <Text size="xs" weight="bold" color="softPeanut" className={styles.sectionTitle}>
              {t('sidePeek.contactRelatedCompanies.childCompanies')}
            </Text>
            <Button
              {...defaultButtonProps}
              iconLeft={childCompanies?.length ? 'edit' : 'addCircle'}
              onClick={() => setModalOpen('CHILD')}
            >
              <Text size="xs" color="bloobirds" weight="regular">
                {childCompanies?.length
                  ? sidePeekEnabled
                    ? t('sidePeek.contactRelatedCompanies.editChildCompanies')
                    : t('sidePeek.contactRelatedCompanies.editCompanies')
                  : t('sidePeek.contactRelatedCompanies.addChildCompanies')}
              </Text>
            </Button>
          </div>
          {childCompanies?.length > 0 && (
            <div className={styles.entitiesList}>
              <CompaniesDisplay companies={childCompanies} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const ContactRelatedCompanies = (props: {
  company: ExtensionCompany;
  parentCompany: ExtensionCompany;
  childCompanies: ExtensionCompany[];
  siblingCompanies: ExtensionCompany[];
}) => {
  const { setActiveBobject, useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();

  const [modalOpen, setModalOpen] = useState(undefined);

  const { company, parentCompany, childCompanies } = props;
  const hasRelatedCompanies = parentCompany || childCompanies?.length > 0;
  return (
    <BubbleWindow>
      {hasRelatedCompanies ? (
        <>
          <CompanyBriefHeader company={company} sidePeekEnabled={sidePeekEnabled} />
          <ContactViewContent fullWidth>
            <RelatedBobjectsView
              setModalOpen={setModalOpen}
              sidePeekEnabled={sidePeekEnabled}
              {...props}
            />
          </ContactViewContent>
        </>
      ) : (
        <NoBobjectsPage contactPage={ContactViewTab.RELATED_COMPANIES}>
          <AddParentCompanyButton size="medium" onClick={() => setModalOpen('INITIAL')} />
        </NoBobjectsPage>
      )}
      {modalOpen && (
        <HandleBobjectRelationsModal
          initialStep={modalOpen}
          data={props}
          handleCloseModal={(event, value) => {
            setActiveBobject(value || company);
            setModalOpen(undefined);
          }}
        />
      )}
    </BubbleWindow>
  );
};
