import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';



import { Card, CardRight, CardBody, CardHoverButtons, CardButton, CardLeft, CardHeader, Icon, Text, Spinner } from '@bloobirds-it/flamingo-ui';
import { usePausePeriods, usePausePeriodsModal } from '@bloobirds-it/hooks';
import { formatDateAsText } from '@bloobirds-it/utils';



import { useActiveUser } from '../../../../hooks';
import styles from './pauseCadenceCard.module.css';


const PauseCadenceCard = ({ completed, ...period }: any) => {
  const { activeUser } = useActiveUser();
  const { t } = useTranslation();
  const { cancelPeriod, isSubmitting } = usePausePeriods({ userId: activeUser.id });
  const [confirmation, setConfirmation] = useState(false);
  const { openEditPauseModal } = usePausePeriodsModal();

  function getInfoFromDate(date: string) {
    const paramsObject = {
      text: new Date(new Date(date).getTime() + new Date(date).getTimezoneOffset() * 60000),
      patternFormat: '{date} {month} {year}',
      t,
    };
    return formatDateAsText(paramsObject);
  }

  const getRangePeriod = () => {
    return `From ${getInfoFromDate(period.startDate)} to
    ${getInfoFromDate(period.endDate)}`;
  };
  const periodString = getRangePeriod();

  return (
    <div className={styles._card__container}>
      <Card completed={completed} width={650}>
        <CardHeader>
          <CardLeft>
            <Icon name="pauseOutlined" color={period.finished ? 'verySoftPeanut' : 'banana'} />
          </CardLeft>
          <CardBody>
            <Text ellipsis={52} size="s">
              {period.pauseName}
            </Text>
          </CardBody>
          <CardRight>
            <Text dataTest={'Text-pauseCadenceDates'} size="s" color="gray">
              {periodString}
            </Text>
          </CardRight>
          <CardHoverButtons>
            <>
              <CardButton
                variant="secondary"
                onClick={() => openEditPauseModal(period)}
                disabled={completed}
              >
                Edit
              </CardButton>
              {!confirmation ? (
                <CardButton
                  dataTest={'pauseCadenceCancel'}
                  disabled={completed}
                  onClick={() => setConfirmation(true)}
                >
                  Cancel
                </CardButton>
              ) : (
                <CardButton
                  dataTest={'pauseCadenceSure'}
                  disabled={isSubmitting || completed}
                  color="tangerine"
                  onClick={() => cancelPeriod(period.id)}
                >
                  {!isSubmitting ? <>Sure?</> : <Spinner name="loadingCircle" size={15} />}
                </CardButton>
              )}
            </>
          </CardHoverButtons>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PauseCadenceCard;
