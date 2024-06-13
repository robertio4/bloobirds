import { Bobject, DataModelResponse } from '@bloobirds-it/types';
import { Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { getFieldById } from '@bloobirds-it/utils';
import styles from './inboundDetail.module.css';
import { ActivityTimelineItem } from '@bloobirds-it/activity-timeline-item';

const InfoBlock = ({ field, value }) => {
  return (
    <div className={styles.infoBlock}>
      <Text className={styles.infoBlockFieldName} size="xs" color="softPeanut">
        {field}
      </Text>
      <Text size="xs">{value ? value : '-'}</Text>
    </div>
  );
};

const DetailedActivity = ({
  activity,
  dataModel,
}: {
  activity: Bobject;
  dataModel: DataModelResponse;
}) => {
  const fields = dataModel?.getFieldsByBobjectType('Activity');
  const inboundFields = fields
    ?.filter(field => field.inboundField)
    .sort((a, b) => a.ordering - b.ordering);
  const fieldsToDisplay = inboundFields?.map(field => ({
    fieldName: field?.name,
    value: getFieldById(activity, field?.id)?.text,
  }));

  return (
    <div className={styles.htmlBody}>
      <ActivityTimelineItem
        activity={activity}
        startDisplayDivider={false}
        endDisplayDivider={false}
        extended
        alternativeDescription
        activeHover={false}
        dataModel={dataModel}
      />
      <div className={styles.inboundInfoWrapper}>
        {fieldsToDisplay &&
          fieldsToDisplay?.map(({ fieldName, value }) => {
            return <InfoBlock key={fieldName} field={fieldName} value={value} />;
          })}
      </div>
    </div>
  );
};

export const InboundDetail = ({
  activity,
  dataModel,
}: {
  activity: Bobject;
  dataModel: DataModelResponse;
}) => {
  return (
    <div className={styles.container}>
      {!activity ? (
        <div className={styles.loading}>
          <Spinner name="loadingCircle" />
        </div>
      ) : (
        <DetailedActivity activity={activity} dataModel={dataModel} />
      )}
    </div>
  );
};
