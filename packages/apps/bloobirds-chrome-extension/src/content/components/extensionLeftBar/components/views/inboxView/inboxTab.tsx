import { SalesforceTabs } from '@bloobirds-it/types';

import SubhomeHeader from '../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import SubhomeLayout, { useSubhomeContext } from '../../layouts/subhomeLayout/subhomeLayout';
import { ViewPropsType } from '../views';
import { InboxTabFilters } from './filters/inboxTabFilters';
import { InboxTabList } from './list/InboxTabsList';

const InboxTabContent = ({ parentRef }: ViewPropsType) => {
  const { query, setSelectedQuickFilter, isLoading } = useSubhomeContext();

  return (
    <>
      <InboxTabFilters
        onToggleSelected={quickFilterSelected => {
          setSelectedQuickFilter(quickFilterSelected);
        }}
      />
      {Object.keys(query).length > 0 ? (
        <InboxTabList parentRef={parentRef} isLoading={isLoading} />
      ) : null}
    </>
  );
};

export default function InboxTab(props: ViewPropsType) {
  return (
    <SubhomeLayout defaultTab={SalesforceTabs.INBOX}>
      <SubhomeHeader />
      <InboxTabContent {...props} />
    </SubhomeLayout>
  );
}
