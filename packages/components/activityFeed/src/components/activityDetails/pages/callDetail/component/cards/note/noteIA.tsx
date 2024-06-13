import { useState } from 'react';

import {
  Card,
  CardBody,
  CardContent,
  CardHeader,
  CardLeft,
  Icon,
  Text,
} from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import { Footer } from '../components/footer';
import styles from './noteIA.module.css';
import { useTranslation } from "react-i18next";

export const NoteIA = ({
  title,
  content,
  leadName,
}: {
  title: string;
  content: string;
  leadName?: string;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'activityTimelineItem.activityFeed.footer',
  });
  const [actionDone, setActionDone] = useState(false);
  const [actionDiscarded, setActionDiscarded] = useState(false);

  return (
    <div className={clsx(styles.container, { [styles.gray]: actionDiscarded })}>
      <Card size="small" expand>
        <CardHeader>
          <CardLeft>
            <Icon size={20} name="note" color="verySoftBanana" />
          </CardLeft>
          <CardBody>
            <Text className={styles.title} size="s" weight="medium">
              {title}
            </Text>
          </CardBody>
        </CardHeader>
        <CardContent>
          <div className={styles.body}>
            <Text size="xs" className={styles.noteContent}>
              {content}
            </Text>
          </div>
        </CardContent>
        <CardContent>
          {/*<div className={styles.body}>
            <Icon size={18} name="person" color="verySoftBloobirds" />
            <Text color="bloobirds" size="s" weight="bold">
              {leadName}
            </Text>
          </div>*/}
          <Footer
            main={{
              label: t('add'),
              icon: 'plus',
              onClick: () => {
                setActionDone(true);
              },
            }}
            discard={{
              label: t('discard'),
              icon: 'trashEmpty',
              onClick: () => {
                setActionDiscarded(true);
              },
            }}
            actionDone={actionDone}
            actionDiscarded={actionDiscarded}
          />
        </CardContent>
      </Card>
    </div>
  );
};
