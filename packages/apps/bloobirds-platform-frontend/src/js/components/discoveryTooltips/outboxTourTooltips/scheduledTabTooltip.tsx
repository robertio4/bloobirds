import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

import { APP_TASKS_OUTBOX_SECTION } from '../../../app/_constants/routes';
import { useRouter } from '../../../hooks';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './outboxTooltips.module.css';

export const ScheduledTabTooltip = () => {
  const { save, has } = useUserHelpers();

  const hasBeenOpened = has(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_PAGE);
  const { history } = useRouter();
  const { slug }: { slug: string } = useParams();

  useEffect(() => {
    if (slug === 'scheduledEmails') save(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_PAGE);
  }, [slug]);
  const isTour = !useHasQueryParam('fromGuide') || useHasQueryParam('tour') === 'true';

  return (
    <>
      {!hasBeenOpened &&
      slug !== 'scheduledEmails' &&
      has(UserHelperTooltipsKeys.OUTBOX_AUTOMATED_BULK) &&
      isTour ? (
        <div
          className={styles._anchor_wrapper}
          onClick={() => {
            save(UserHelperTooltipsKeys.OUTBOX_SCHEDULED_PAGE);
            history.push(APP_TASKS_OUTBOX_SECTION.replace(':slug', 'scheduledEmails'));
          }}
        >
          <DiscoveryTooltip.DiscoveryDefaultAnchor />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
