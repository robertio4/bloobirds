import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AssignUserDropdown, AssignUserModal } from '@bloobirds-it/assign-user';
import {
  CircularBadge,
  Icon,
  IconType,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { InfoWarningSync } from '@bloobirds-it/misc';
import {
  BobjectId,
  ExtensionBobject,
  MessagesEvents,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  User,
} from '@bloobirds-it/types';
import { parseCurrency } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { isOpportunity } from '../../../../../utils/bobjects';
import { useExtensionContext } from '../../../context';
import styles from './contactViewPageHeader.module.css';

export interface ContactViewProps {
  badgeColor?: string;
  badgeContent?: any;
  title: string;
  subtitle: string;
  labels?: any;
  buttons?: any;
  link?: any;
  version?: 'extended' | 'simple';
  icon?: IconType;
  tooltip?: string;
  assigneeUser?: User;
  bobject?: ExtensionBobject;
  onlyHeader?: boolean;
  minimizedView?: boolean;
  sidePeekEnabled?: boolean;
  syncStatus?: boolean | string;
  bobjectId?: BobjectId;
}

function formatMoney(amount: number | string) {
  const { useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const { prefix, suffix } =
    dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT) || {};

  const parsedAmount = parseCurrency(amount as number);

  return { suffix, prefix, parsedAmount };
}

const ContactViewHeader = (props: ContactViewProps) => {
  const {
    onlyHeader,
    badgeColor,
    badgeContent,
    title,
    subtitle,
    buttons,
    labels,
    icon,
    tooltip,
    assigneeUser,
    bobject,
    minimizedView,
    syncStatus,
    bobjectId,
  } = props;

  const [openedModal, setOpenedModal] = useState(false);
  const { visible, setVisible, ref: dropdownRef } = useVisible();
  const { useGetSettings, useGetSidePeekEnabled } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const userId = settings?.user?.id;
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  const assignedColor = assigneeUser?.color;
  const assignedName = assigneeUser?.name || assigneeUser?.email;
  const assignedShortName = assigneeUser?.shortname;

  const handleClose = () => {
    setOpenedModal(false);
  };

  const containerClasses = clsx(styles.container, {
    [styles.container_small]: minimizedView || onlyHeader || sidePeekEnabled,
    [styles.container_small_minimized]: minimizedView || (!onlyHeader && sidePeekEnabled),
    [styles.container_small_onlyHeader]: onlyHeader,
    [styles.container_small_sidePeekEnabled]: sidePeekEnabled,
    [styles.container_small_sidePeekEnabled_minimized]: sidePeekEnabled && minimizedView,
  });

  const headerClasses = clsx(styles.header_container);

  const infoClasses = clsx(styles.info__container);

  const titleClasses = clsx(styles.title, {
    [styles.title_sidePeek]: sidePeekEnabled,
  });

  const minimizedClasses = clsx(styles.subtitle, {
    [styles.hidden]: minimizedView,
    [styles.bigAmount]: bobject && sidePeekEnabled && isOpportunity(bobject),
  });

  const amount = isOpportunity(bobject) ? formatMoney(subtitle) : null;

  const amountToPrint = `${amount?.prefix ? amount?.prefix : ''} ${
    amount?.parsedAmount ? amount?.parsedAmount : '-'
  } ${amount?.suffix ? amount?.suffix : ''}`;

  const refreshBobjectEventFire = () => {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: { type: bobject?.id?.typeName },
      }),
    );
  };

  return (
    <>
      <div
        className={containerClasses}
        style={{
          minHeight: minimizedView || onlyHeader ? '30px' : sidePeekEnabled ? '60px' : '90px',
          transition: 'all 0.25s ease-in-out',
        }}
      >
        <div className={headerClasses}>
          {syncStatus !== undefined && !syncStatus && (
            <InfoWarningSync type={bobjectId.typeName} id={bobjectId} size="medium" />
          )}
          <Tooltip
            title={`${assignedName ? `${t('assignedTo')} ${assignedName}` : t('assign')}`}
            position="bottom"
          >
            {!onlyHeader && (
              <span className={styles.assignee}>
                {assignedName ? (
                  <div onClick={() => setOpenedModal(true)}>
                    <CircularBadge
                      style={{ fontSize: '9px' }}
                      backgroundColor={assignedColor || 'lightPeanut'}
                      size="small"
                      className={styles.assign_badge}
                    >
                      {assignedShortName || 'U'}
                    </CircularBadge>
                  </div>
                ) : (
                  <AssignUserDropdown
                    bobject={bobject}
                    accountId={accountId}
                    userId={userId}
                    visible={visible}
                    setVisible={setVisible}
                    ref={dropdownRef}
                    setOpenModal={() => setOpenedModal(true)}
                    onSave={refreshBobjectEventFire}
                  >
                    <div className={styles.assign_icon} onClick={() => setVisible(!visible)}>
                      <Icon name={'personAdd'} size={16} color="bloobirds" />
                    </div>
                  </AssignUserDropdown>
                )}
              </span>
            )}
          </Tooltip>
          {labels ? <div className={styles.labels_container}>{labels}</div> : <div />}
        </div>
        <div className={infoClasses}>
          <Tooltip title={tooltip} position="top">
            <CircularBadge
              backgroundColor={badgeColor || 'lightPeanut'}
              className={styles.circular_badge}
              size={minimizedView ? 's' : 'medium'}
            >
              {badgeContent ? (
                badgeContent
              ) : (
                <Icon name={icon || 'person'} size={20} color="softPeanut" />
              )}
            </CircularBadge>
          </Tooltip>
          <div className={styles.content_container}>
            <div className={styles.title_container}>
              <Tooltip title={title || ''} position="top">
                <Text size={'m'} color="peanut" weight="bold" className={titleClasses}>
                  {title || ''}
                </Text>
              </Tooltip>
              {!minimizedView && (
                <Text size="xs" color="softPeanut" className={minimizedClasses}>
                  {isOpportunity(bobject) ? amountToPrint : subtitle || ''}
                </Text>
              )}
            </div>
            {!minimizedView && <span className={minimizedClasses}>{buttons}</span>}
          </div>
        </div>
      </div>
      {openedModal && (
        <AssignUserModal
          bobject={bobject}
          accountId={accountId}
          assigneeUser={assigneeUser}
          onClose={handleClose}
          onSave={refreshBobjectEventFire}
        />
      )}
    </>
  );
};

export default ContactViewHeader;

ContactViewHeader.defaultProps = {
  version: 'extended',
  onlyHeader: false,
  minimizedView: false,
};
