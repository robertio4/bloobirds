import React from 'react';

import { Action, ColorType, IconType } from '@bloobirds-it/flamingo-ui';
import { useAircallPhoneLinkEnabled, useActiveAccountId } from '@bloobirds-it/hooks';
import { SearchAction, SearchActionType, SearchBobjectType } from '@bloobirds-it/types';

import styles from '../bobjectItem.module.css';

type handleClickType = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

/*** Action Base Button ***/
function SearchBarAction(color: ColorType, icon: IconType, handleClick: handleClickType) {
  return (
    <Action
      color={color}
      icon={icon}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        // @ts-ignore
        handleClick(e);
      }}
      key={`action-${icon}`}
    />
  );
}

/*** Action Buttons ***/
function CallAction(handleClick: handleClickType) {
  return SearchBarAction('melon', 'phone', handleClick);
}
function EmailAction(handleClick: handleClickType) {
  return SearchBarAction('tangerine', 'mail', handleClick);
}
function WhatsAction(handleClick: handleClickType) {
  return SearchBarAction('whatsapp', 'whatsapp', handleClick);
}
function LinkedInAction(handleClick: handleClickType) {
  return SearchBarAction('darkBloobirds', 'linkedin', handleClick);
}
function MeetingAction(handleClick: handleClickType) {
  return SearchBarAction('tomato', 'calendar', handleClick);
}

/*** Action Button Groups ***/
function MainBobjectActions(
  doAction: (action: SearchActionType, event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
) {
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();

  return (
    <>
      {!hasAircallPhoneLinkEnabled && CallAction(e => doAction(SearchAction.Call, e))}
      {EmailAction(e => doAction(SearchAction.Email, e))}
      {WhatsAction(e => doAction(SearchAction.WhatsApp, e))}
      {LinkedInAction(e => doAction(SearchAction.LinkedIn, e))}
      {MeetingAction(e => doAction(SearchAction.Meeting, e))}
    </>
  );
}

/*** Export General Action Buttons Component ***/
export function BobjectActions({
  bobject,
  closeModal,
  handleActionOnClick,
}: {
  bobject: SearchBobjectType;
  closeModal: () => void;
  handleActionOnClick: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    action: SearchActionType,
    bobject: SearchBobjectType,
  ) => void;
  isWebapp?: boolean;
}) {
  const doAction = (action: SearchActionType, event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    handleActionOnClick?.(event, action, bobject);
    closeModal();
  };

  return (
    <div className={styles.bobjectItemSelectedActionsColumn}>
      <div className={styles.bobjectItemSelectedActionsRow}>{MainBobjectActions(doAction)}</div>
    </div>
  );
}
