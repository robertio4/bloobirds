import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Card,
  CardBody,
  CardContent,
  CardHeader,
  Icon,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { convertHtmlToString, formatDateAsText } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { Footer } from '../components/footer';
import styles from './taskIA.module.css';

export const TaskIA = ({
  title,
  content,
  date,
}: {
  title: string;
  content: string;
  date: string;
}) => {
  const [actionDone, setActionDone] = useState(false);
  const [actionDiscarded, setActionDiscarded] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={clsx(styles.container, { [styles.gray]: actionDiscarded })}>
      <Card size="small" expand>
        <CardHeader>
          <CardBody>
            <div className={styles._icons}>
              <Icon size={20} name="clock" color="extraCall" />
            </div>
            <Text className={styles.taskTitle} size="s" weight="medium">
              {title}
            </Text>
            <div className={styles.rightSide}>
              <div className={styles._datetime}>
                <Text size="xs" color={'darkBloobirds'}>
                  {formatDateAsText({
                    text: (new Date(date) as unknown) as string,
                    patternFormat: t('dates.shortMonthFullDate'),
                    t,
                  })}
                </Text>
              </div>
            </div>
          </CardBody>
        </CardHeader>
        <CardContent>
          <Tooltip title={content?.length > 540 && content} position="top">
            <Text className={styles.verticalEllipsis} color="peanut" size="xs">
              {convertHtmlToString(content)}
            </Text>
          </Tooltip>
        </CardContent>
        <CardContent>
          <Footer
            main={{
              label: t('activityTimelineItem.activityFeed.footer.createTask'),
              icon: 'plus',
              onClick: () => {
                setActionDone(true);
              },
            }}
            discard={{
              label: t('activityTimelineItem.activityFeed.footer.discard'),
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
