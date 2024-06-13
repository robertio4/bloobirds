import { SalesforceTabs } from '@bloobirds-it/types';

import SubhomeHeader from '../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import SubhomeLayout from '../../layouts/subhomeLayout/subhomeLayout';
import { ViewPropsType } from '../views';
import OutboxTabContent from './outboxTabContent';

export default function OutboxTab(props: ViewPropsType) {
  return (
    <SubhomeLayout defaultTab={SalesforceTabs.OUTBOX}>
      <SubhomeHeader />
      <OutboxTabContent {...props} />
    </SubhomeLayout>
  );
}
