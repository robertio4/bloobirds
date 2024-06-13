import { SalesforceTabs } from '@bloobirds-it/types';

import SubhomeHeader from '../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import SubhomeLayout, { useSubhomeContext } from '../../layouts/subhomeLayout/subhomeLayout';
import { ViewPropsType } from '../views';
import { MeetingsTabFilters } from './filters/meetingsTabFilters';
import { MeetingsTabList } from './list/meetingsTabList';

const MeetingsTabContent = ({ parentRef }: ViewPropsType) => {
  const { query, isLoading } = useSubhomeContext();
  return (
    <>
      <MeetingsTabFilters />
      {Object.keys(query).length > 0 ? (
        <MeetingsTabList parentRef={parentRef} isLoading={isLoading} />
      ) : null}
    </>
  );
};

export default function MeetingsTab(props: ViewPropsType) {
  return (
    <SubhomeLayout defaultTab={SalesforceTabs.MEETINGS}>
      <SubhomeHeader />
      <MeetingsTabContent {...props} />
    </SubhomeLayout>
  );
}
