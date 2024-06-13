import { Spinner } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import { OrderedField } from '../../../../../../hooks/useOrderedFields';
import { Source } from '../../../../contactDetails/contactDetailSource/contactDetailSource';
import { NoFieldsSelectedToDisplay } from '../../../../contactDetails/noFieldsSelectedToDisplay/noFieldsSelectedToDisplay';
import { NoSyncedBobject } from '../../../../contactDetails/noSyncedBobject/noSyncedBobject';
import { useExtensionContext } from '../../../../context';
import styles from '../contactViewDetails.module.css';
import { ContactViewDetailsField } from './contactViewDetailsField';

export const ContactViewDetailsFields = ({
  fields,
  isLoading,
  openExtendedScreen,
  salesforceId,
  source,
}: {
  fields: OrderedField[];
  isLoading: boolean;
  openExtendedScreen: () => void;
  salesforceId?: string;
  source?: Source;
}) => {
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();

  const detailContentClasses = clsx(styles.detail_content, {
    [styles.detail_content_sidePeek]: sidePeekEnabled,
  });

  return !isLoading ? (
    <>
      {fields?.length > 0 ? (
        <div className={detailContentClasses}>
          {fields.map(field => (
            <ContactViewDetailsField
              key={field?.fieldId}
              field={field}
              sidePeekEnabled={sidePeekEnabled}
            />
          ))}
        </div>
      ) : salesforceId || source === Source.bloobirds ? (
        <div className={styles.detail_content}>
          <NoFieldsSelectedToDisplay hasButton onClick={openExtendedScreen} />
        </div>
      ) : (
        <div className={styles.detail_content}>
          <NoSyncedBobject />
        </div>
      )}
    </>
  ) : (
    <div className={styles.loadingSpinner}>
      <Spinner name="loadingCircle" />
    </div>
  );
};
