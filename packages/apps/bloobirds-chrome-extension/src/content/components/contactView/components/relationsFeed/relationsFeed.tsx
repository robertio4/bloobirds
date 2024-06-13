import { Trans, useTranslation } from 'react-i18next';

import { Action, Text, Button, Icon, ColorType } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import { relatedPickableIcons } from '@bloobirds-it/utils';
import spacetime from 'spacetime';

import { ExtendedContextTypes } from '../../../../../types/extendedContext';
import { useExtensionContext } from '../../../context';
import styles from './relationsFeed.module.css';
import RelationsFeedSkeleton from './relationsFeedSkeleton/relationsFeedSkeleton';
import { useRelationsFeed } from './useRelationsFeed';

export const RelationObject = ({ data }) => {
  const { setExtendedContext, useGetExtendedContext, closeExtendedScreen } = useExtensionContext();
  const { icon, title, fields, salesforceUrl, lastModifiedDate } = data;
  const { t } = useTranslation();
  const extendedContext = useGetExtendedContext();
  const isExtendedOpened = extendedContext?.open;

  const openExtendedScreen = () =>
    !isExtendedOpened
      ? setExtendedContext({
          type: ExtendedContextTypes.RELATED_OBJECT_DETAILS,
          extraInfo: {
            ...data,
          },
        })
      : closeExtendedScreen();

  const handleClick = () => {
    window.open(salesforceUrl, '_blank');
  };

  const handleClickOnReferenceField = urlReferenceField => {
    window.open(urlReferenceField, '_blank');
  };

  const fieldsToShow = fields?.slice(0, 10);

  const getValue = field => {
    const value = field?.value;
    if (!value) {
      return '-';
    }

    const type = field?.fieldType;
    if (type === 'datetime') {
      try {
        return spacetime(value).format(t('dates.monthShortWithTime'));
      } catch (e) {
        return value;
      }
    }
    return value;
  };

  return (
    <div key={title} className={styles.relationCard} onClick={openExtendedScreen}>
      <div className={styles.relationTitle}>
        <Action
          icon={icon ?? 'salesforce'}
          color={
            relatedPickableIcons.find(p => p.name === (icon ?? 'salesforce'))?.color as ColorType
          }
          size="xs"
        />
        <Text size="s" color="peanut" weight="bold">
          {title}
        </Text>
        <div className={styles.rightSide}>
          <Button variant="secondary" size="small" onClick={handleClick}>
            <Icon name="salesforce" size={16} color="bloobirds" />
          </Button>
          <Text size="xs" color="peanut">
            {spacetime(lastModifiedDate).format('{date-pad} {month-short}')}
          </Text>
        </div>
      </div>
      {fieldsToShow?.length > 0 && (
        <div className={styles.relationBody}>
          {fieldsToShow.map(field => (
            <div key={field.apiName} className={styles.relationField}>
              <Text size="xs" color="softPeanut">
                {field?.label}
              </Text>
              {field?.fieldType === 'reference' && field?.urlReferencedObject != null ? (
                <span
                  className={styles.referenceField}
                  onClick={() => handleClickOnReferenceField(field?.urlReferencedObject)}
                >
                  <Text size="xs" color="bloobirds" ellipsis={40}>
                    {getValue(field)}
                  </Text>
                </span>
              ) : (
                <Text size="xs">{getValue(field)}</Text>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const RelationsFeed = () => {
  const { relations, loading } = useRelationsFeed();
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.relationObjects.noResults' });
  const { settings } = useActiveUserSettings();
  const isAdmin = settings?.user?.accountAdmin;

  if (!loading && (!relations || Object.keys(relations).length === 0)) {
    return (
      <div className={styles.noDataContainer}>
        <Text size="m" weight="heavy">
          {t('title')}
        </Text>
        <Text size="s" color="softPeanut" align="center">
          <Trans
            i18nKey="sidePeek.relationObjects.noResults.description"
            components={[
              isAdmin ? (
                <a
                  key="0"
                  href={'https://app.bloobirds.com/app/account-settings/salesforceRelatedObjects'}
                  target="_blank"
                  rel="noreferrer"
                >
                  {''}
                </a>
              ) : (
                <></>
              ),
            ]}
          />
        </Text>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <RelationsFeedSkeleton />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {Object.values(relations).map(relation => (
        <div key={relation[0]?.objectType} className={styles.relationContainer}>
          <Text size="s" color="softPeanut">
            {relation[0]?.objectType}
          </Text>
          {relation?.map(relationObject => {
            return <RelationObject key={relation[0]?.title} data={relationObject} />;
          })}
        </div>
      ))}
    </div>
  );
};
