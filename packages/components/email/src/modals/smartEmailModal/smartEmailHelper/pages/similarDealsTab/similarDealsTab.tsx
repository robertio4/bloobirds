//@ts-ignore
import styles from './similarDeals.module.css';
import { useSmartEmailModal } from '../../../smartEmailModal';
import { SimilarDealsContent } from './similaDealsContent/similarDealsContent';

export const SimilarDealsTab = () => {
  const { similarDealsHook, activeBobject } = useSmartEmailModal();

  return (
    <div className={styles._wrapper}>
      <SimilarDealsContent activeBobject={activeBobject} similarDealsHook={similarDealsHook} />
    </div>
  );
};
