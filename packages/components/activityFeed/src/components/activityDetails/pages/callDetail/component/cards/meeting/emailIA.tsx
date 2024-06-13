import { useState } from 'react';

import {
  Card,
  CardBody,
  CardContent,
  CardHeader,
  CardLeft,
  Text,
  Icon,
} from '@bloobirds-it/flamingo-ui';
import { ACTIVITY_DIRECTION } from '@bloobirds-it/types';
import { convertHtmlToString } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { Footer } from '../components/footer';
import styles from './emailIA.module.css';
import { useTranslation } from "react-i18next";

export const EmailIA = ({
  subject,
  body,
  leadName,
}: {
  subject: string;
  body: string;
  leadName: string;
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
            <Icon size={12} name="emailOutgoing" color="tangerine" />
          </CardLeft>
          <CardBody>
            <div className={styles.emailCard_body}>
              <Text color="bloobirds" size="s" weight="bold">
                {leadName}
              </Text>
            </div>
          </CardBody>
        </CardHeader>
        <CardContent>
          <div className={styles.body}>
            <Text size="xs" className={styles.emailBody}>
              <Text size="xs" weight="bold" className={styles._emailCard_body__text}>
                {subject}
              </Text>
              {convertHtmlToString(body)?.substring(0, 200)}
            </Text>
          </div>
          <Footer
            main={{
              label: t('send'),
              icon: 'send',
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
