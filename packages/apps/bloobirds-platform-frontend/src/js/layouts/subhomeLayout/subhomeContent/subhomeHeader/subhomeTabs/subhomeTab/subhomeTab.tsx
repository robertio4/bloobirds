import React, { MutableRefObject, useRef } from 'react';
import { useLocation, useParams } from 'react-router';

import { Icon, IconButton, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import { useHover, useMediaQuery, useRouter } from '../../../../../../hooks';
import { useUserHelpers } from '../../../../../../hooks/useUserHelpers';
import { PROSPECTING_SLUGS } from '../../../../../../pages/subhomePages/subhomes.constants';
import { getTabKey } from '../../../../../../pages/subhomePages/subhomes.utils';
import { MainBobjectTypes } from '../../../../../../typings/bobjects';
import styles from '../subhomeTabs.module.css';

enum bobjectTabDictionary {
  Company = 'companies',
  Lead = 'leads',
  Opportunity = 'opportunities',
}

const PinIcon = ({
  outsideRef,
  bobjectType,
  isPinned,
  setPinnedTab,
}: {
  outsideRef: MutableRefObject<string>;
  bobjectType: MainBobjectTypes;
  isPinned: boolean;
  setPinnedTab: React.Dispatch<React.SetStateAction<MainBobjectTypes>>;
}) => {
  let { slug }: { slug: PROSPECTING_SLUGS } = useParams();
  if (!slug) slug = 'delivered' as PROSPECTING_SLUGS;
  const key = getTabKey(slug, useLocation());
  const { saveCustom, deleteHelper } = useUserHelpers();
  const [, isHovered] = useHover(outsideRef);

  function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
    setPinnedTab(bobjectType);
    if (isPinned) {
      deleteHelper(key);
    } else {
      saveCustom({
        key,
        data: bobjectTabDictionary[bobjectType as keyof typeof bobjectTabDictionary],
      });
    }
  }

  return (
    isHovered && (
      <Tooltip title="Pin this view as default" position="top">
        <IconButton
          name={isPinned ? 'pin' : 'pinOutline'}
          size={16}
          className={clsx(styles._pin_icon, { [styles._pinned_icon]: isPinned })}
          onClick={e => {
            handleClick(e);
          }}
        />
      </Tooltip>
    )
  );
};

const SubhomeTab = ({
  active,
  children,
  icon,
  counter,
  url,
  disabled,
  bobjectType,
  isPinned,
  setPinnedTab,
}: {
  active: boolean;
  children: React.ReactNode[] | React.ReactNode;
  icon?: IconType;
  counter: number;
  url: string;
  disabled?: boolean;
  isPinned: boolean;
  setPinnedTab: React.Dispatch<React.SetStateAction<MainBobjectTypes>>;
  bobjectType: MainBobjectTypes;
}) => {
  const { history } = useRouter();
  const { isSmallDesktop } = useMediaQuery();
  const outsideRef = useRef();
  return (
    <div
      className={clsx(styles._tab, {
        [styles._tab_active]: active,
        [styles._tab_small]: isSmallDesktop,
      })}
      onClick={() => {
        if (!disabled && url) {
          history.push(url);
        }
      }}
      ref={outsideRef}
    >
      <Icon size={16} name={icon} color="softPeanut" />
      <Text
        size="m"
        color={active ? 'peanut' : 'softPeanut'}
        weight={active ? 'bold' : 'regular'}
        className={styles._tab_title}
      >
        {children}
      </Text>
      <div className={styles._right_content}>
        <PinIcon
          outsideRef={outsideRef}
          bobjectType={bobjectType}
          setPinnedTab={setPinnedTab}
          isPinned={isPinned}
        />
        {counter !== undefined && !Number.isNaN(counter) && (
          <div className={styles._counter}>
            <Text size="xxs" align="center">
              {counter}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubhomeTab;
