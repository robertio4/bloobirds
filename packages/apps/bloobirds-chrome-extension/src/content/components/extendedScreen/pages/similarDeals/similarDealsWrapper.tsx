import { SimilarDealsContent, useSimilarDeals } from '@bloobirds-it/email';
import { Bobject } from '@bloobirds-it/types';

import { useExtensionContext } from '../../../context';
import styles from './similarDealsWrapper.module.css';

const SimilarDealsWrapper = ({ company }: { company: Bobject }) => {
  const { useGetSettings, useGetSidePeekEnabled } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const isSidePeekEnabled = useGetSidePeekEnabled();

  const similarDealsHook = useSimilarDeals(accountId, company?.id.objectId);

  return (
    <div className={styles._wrapper}>
      <SimilarDealsContent
        activeBobject={company}
        similarDealsHook={similarDealsHook}
        isBubble={!isSidePeekEnabled}
      />
    </div>
  );
};

export default SimilarDealsWrapper;
