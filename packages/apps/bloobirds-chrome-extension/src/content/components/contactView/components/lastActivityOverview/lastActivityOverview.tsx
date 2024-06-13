import { useTranslation } from 'react-i18next';

import { Label, Text } from '@bloobirds-it/flamingo-ui';
import { useNewLastActivity } from '@bloobirds-it/hooks';
import { BobjectId, BobjectTypes, ContactViewSubTab, MainBobjectTypes } from '@bloobirds-it/types';
import { formatDateAsText } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { useExtensionContext } from '../../../context';
import { useContactViewContext } from '../../context/contactViewContext';
import { InfoDetailElement } from '../briefCardComponents/infoDetailElement';
import styles from './lastActivityOverview.module.css';
import { LastContactsView } from './lastContactsView/lastContactsView';

export interface LastActivityOverviewProps<T extends MainBobjectTypes> {
  bobjectId: BobjectId<T>;
  attemptsCount: string;
  lastAttempt: string;
  touchesCount: string;
  lastTouch: string;
  leadsIds?: BobjectId<BobjectTypes.Lead>['value'][];
  companyId?: BobjectId<BobjectTypes.Company>['value'];
}

export const LastActivityOverview = <T extends MainBobjectTypes>({
  bobjectId,
  attemptsCount,
  lastAttempt,
  lastTouch,
  touchesCount,
  leadsIds,
  companyId,
}: LastActivityOverviewProps<T>) => {
  const hasNewLastActivity = useNewLastActivity(bobjectId?.accountId);
  const { setActiveSubTab } = useContactViewContext();
  const { useGetSidePeekEnabled } = useExtensionContext();
  const { t } = useTranslation();
  const sidePeekEnabled = useGetSidePeekEnabled();

  return (
    <div
      className={clsx(styles._last_activity_container, {
        [styles._last_activity_container_center]: sidePeekEnabled,
      })}
    >
      <div className={styles._last_activity_header}>
        <Text
          className={sidePeekEnabled && styles._last_activity_title_sidePeek}
          size={'xs'}
          color="softPeanut"
          weight="bold"
        >
          {t('sidePeek.overview.activity.lastActivity')}
        </Text>
        <Label
          color="lightBloobirds"
          textColor="bloobirds"
          size="small"
          uppercase={false}
          overrideStyle={{ cursor: 'pointer' }}
          onClick={() => {
            setActiveSubTab(ContactViewSubTab.ACTIVITIES);
          }}
        >
          {t('sidePeek.overview.activity.viewAll')}
        </Label>
      </div>
      {hasNewLastActivity ? (
        <LastContactsView bobjectId={bobjectId} leadsIds={leadsIds} companyId={companyId} />
      ) : (
        <table className={styles._last_activity_statistics}>
          <tr className={styles._last_activity_row}>
            <td>
              <InfoDetailElement
                icon="check"
                iconColor="verySoftPeanut"
                text={t('sidePeek.overview.activity.attempts', {
                  count: parseInt(attemptsCount) || 0,
                })}
                textSize="xs"
              />
            </td>
            <td>
              <InfoDetailElement
                icon="calendar"
                iconColor="verySoftPeanut"
                text={`${t('sidePeek.overview.activity.lastAttempt')}: ${formatDateAsText({
                  text: lastAttempt,
                  t,
                })}`}
                textSize="xs"
              />
            </td>
          </tr>
          <tr className={styles._last_activity_row}>
            <td>
              <InfoDetailElement
                icon="checkDouble"
                iconColor="verySoftPeanut"
                text={t('sidePeek.overview.activity.touches', {
                  count: parseInt(touchesCount) || 0,
                })}
                textSize="xs"
              />
            </td>
            <td>
              <InfoDetailElement
                icon="calendar"
                iconColor="verySoftPeanut"
                text={`${t('sidePeek.overview.activity.lastTouch')}: ${formatDateAsText({
                  text: lastTouch,
                  t,
                })}`}
                textSize="xs"
              />
            </td>
          </tr>
        </table>
      )}
    </div>
  );
};
