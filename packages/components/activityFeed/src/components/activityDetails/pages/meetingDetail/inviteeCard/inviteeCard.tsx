import { useRef, useState } from 'react';
import {
  Avatar,
  ColorType,
  CompoundIcon,
  Icon,
  IconButton,
  IconType,
  Label,
  Text,
} from '@bloobirds-it/flamingo-ui';
import styles from './inviteeCard.module.css';

export interface Invitee {
  email?: string;
  name?: string | null;
  type?: 'Lead' | 'AE' | 'Organizer' | 'Company' | 'User';
  comment?: string;
  status?: 'yes' | 'no' | 'noreply';
  leadId?: string;
}

const randomColors: ColorType[] = [
  'bloobirds',
  'softPeanut',
  'verySoftTangerine',
  'softTangerine',
  'verySoftTomato',
  'softTomato',
  'softBanana',
  'verySoftBanana',
  'verySoftMelon',
  'softMelon',
  'lightBloobirds',
  'verySoftBloobirds',
  'verySoftPurple',
  'lightPurple',
  'verySoftPeanut',
  'lightPeanut',
  'lighterGray',
  'gray',
];

/**
 * This component is duplicated in meeting component in components folder
 * so we should copy for now from one place to another
 * @param invitee
 * @param handleRemoveInvitee
 * @param readOnly
 * @param width
 * @param shouldShowStatus
 * @constructor
 */
export function InviteeCard({
  invitee,
  handleRemoveInvitee,
  readOnly,
  width,
  shouldShowStatus,
}: {
  invitee: Invitee;
  handleRemoveInvitee?: (email: string) => void;
  readOnly?: boolean;
  width?: string;
  shouldShowStatus: boolean;
}) {
  const [randomColor] = useState<ColorType>(
    randomColors[Math.floor(Math.random() * (randomColors.length + 1))],
  );

  function getColorFromType(
    type: 'Lead' | 'AE' | 'Organizer' | 'Company' | 'User',
  ): ColorType | 'random' {
    switch (type) {
      case 'Organizer':
        return 'purple';
      case 'AE':
      case 'User':
        return 'grape';
      case 'Company':
        return 'extraMeeting';
      case 'Lead':
        return 'extraMeeting';
      default:
        return 'random';
    }
  }

  function getStatusAvatar(
    status: 'yes' | 'no' | 'noreply',
  ): { bagdeColor: ColorType; icon: IconType; iconColor: ColorType } {
    switch (status) {
      case 'yes':
        return { bagdeColor: 'lightestCall', icon: 'check', iconColor: 'extraCall' };
      case 'no':
        return { bagdeColor: 'lightestMeeting', icon: 'cross', iconColor: 'extraMeeting' };
      default:
        return { bagdeColor: 'verySoftPeanut', icon: 'arrowRight', iconColor: 'softPeanut' };
    }
  }

  const calculatedColor = getColorFromType(invitee?.type);
  const colorToUse = calculatedColor === 'random' ? randomColor : calculatedColor;
  const statusAvatar = getStatusAvatar(invitee?.status);

  const parentRef = useRef();

  return (
    <>
      {(invitee?.email || invitee?.name) && (
        <div className={styles._invitee_card} style={{ width: width || null }}>
          <CompoundIcon
            parent={
              <Avatar size="tiny" color={colorToUse} ref={parentRef}>
                {invitee?.email?.slice(0, 2).toUpperCase() ||
                  invitee?.name?.slice(0, 2).toUpperCase()}
              </Avatar>
            }
            parentRef={parentRef}
          >
            {shouldShowStatus && (
              <Avatar size="supertiny" color={statusAvatar.bagdeColor}>
                <Icon name={statusAvatar.icon} color={statusAvatar.iconColor} size={10} />
              </Avatar>
            )}
          </CompoundIcon>
          <div className={styles._invitee_info}>
            {invitee?.name && <Text size="xs">{invitee?.name}</Text>}
            {invitee?.type === 'Lead' && !invitee?.email && (
              <Text size="xs" color="tomato" decoration="underscore">
                Lead has no email, it won&apos;t be invited
              </Text>
            )}
            <Text
              size="xxs"
              color={invitee?.name ? 'softPeanut' : 'peanut'}
              decoration="underscore"
            >
              {invitee?.email}
            </Text>
          </div>
          {invitee?.type && (
            <Label size="small" uppercase={false}>
              {invitee?.type}
            </Label>
          )}
          {!readOnly && (
            <IconButton
              name="cross"
              size={24}
              color="softPeanut"
              onClick={() => handleRemoveInvitee(invitee?.email)}
            />
          )}
        </div>
      )}
    </>
  );
}
