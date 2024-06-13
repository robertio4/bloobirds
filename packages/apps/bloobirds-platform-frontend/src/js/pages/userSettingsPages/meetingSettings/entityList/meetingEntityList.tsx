import React from 'react';
import {
  Card,
  CardBody,
  CardButton,
  CardHeader,
  CardHoverButtons,
  CardLeft,
  CardRight,
  Icon,
  IconButton,
  Text,
} from '@bloobirds-it/flamingo-ui';
import styles from './entityList.module.css';
import { MeetingLink } from '../../../../typings/messaging';

export const MeetingSettingsEntityList = ({ children }: { children: React.ReactElement }) => {
  return <div className={styles._list_container}>{children}</div>;
};
export const MeetingEntityHeader = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement;
}) => {
  return (
    <div className={styles._list_header}>
      <Text size="m" color="softPeanut" weight="bold">
        {title}
      </Text>
      {children}
    </div>
  );
};
export const MeetingEntityCard = ({
  entity: { title, defaultLink, url },
  onOpenDelete,
  onOpenEdit,
  onStar,
}: {
  entity: MeetingLink;
  onOpenDelete: () => void;
  onOpenEdit: () => void;
  onStar: () => void;
}) => {
  return (
    <div className={styles._card__container}>
      <Card width={650}>
        <CardHeader>
          <CardLeft>
            <Icon name="calendar" color="tomato" />
          </CardLeft>
          <CardBody>
            <Text ellipsis={52} size="s">
              {title}
            </Text>
            <IconButton
              color="banana"
              name={defaultLink ? 'starChecked' : 'starUnchecked'}
              onClick={onStar}
              size={18}
              className={styles._start_icon}
            />
          </CardBody>
          <CardRight>
            <Text size="s" color="bloobirds" className={styles.linkText}>
              {url}
            </Text>
          </CardRight>
          <CardHoverButtons>
            <>
              <CardButton variant="secondary" onClick={onStar}>
                Set as default
              </CardButton>
              <CardButton dataTest={'pauseCadenceCancel'} onClick={onOpenEdit}>
                Edit
              </CardButton>
              <IconButton dataTest={'pauseCadenceSure'} name="trashFull" onClick={onOpenDelete} />
            </>
          </CardHoverButtons>
        </CardHeader>
      </Card>
    </div>
  );
};
