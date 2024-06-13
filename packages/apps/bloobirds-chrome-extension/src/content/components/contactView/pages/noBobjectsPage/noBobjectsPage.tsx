import React from 'react';
import { Trans } from 'react-i18next';

import { Icon, IconType, Text } from '@bloobirds-it/flamingo-ui';
import { ContactViewTab } from '@bloobirds-it/types';

import styles from './noBobjectsPage.module.css';

interface NoBobjectsPageContent {
  icon: IconType;
  text: string | JSX.Element;
}

const noBobjectsPageContent: { [x in ContactViewTab]: NoBobjectsPageContent } = {
  [ContactViewTab.COMPANY]: {
    icon: 'company',
    text: <Trans i18nKey="sidePeek.noObjectsPage.noCompanyFound" />,
  },
  [ContactViewTab.LEAD]: {
    icon: 'person',
    text: <Trans i18nKey="sidePeek.noObjectsPage.noLeadFound" />,
  },
  [ContactViewTab.OPPORTUNITY]: {
    icon: 'fileOpportunity',
    text: <Trans i18nKey="sidePeek.noObjectsPage.noOppFound" />,
  },
  [ContactViewTab.RELATED_COMPANIES]: {
    icon: 'child',
    text: <Trans i18nKey="sidePeek.noObjectsPage.noCompanyRelatedFound" />,
  },
};

const NoBobjectsPage = ({
  contactPage,
  children,
}: {
  contactPage: ContactViewTab;
  children?: React.ReactNode;
}) => {
  const pageContent = noBobjectsPageContent[contactPage];

  return (
    <div className={styles.container}>
      <Icon name={pageContent.icon} size={48} color="softPeanut" />
      <Text color="softPeanut" size="m" align="center">
        {pageContent.text}
      </Text>
      {React.isValidElement(children) && children}
    </div>
  );
};

export default NoBobjectsPage;
