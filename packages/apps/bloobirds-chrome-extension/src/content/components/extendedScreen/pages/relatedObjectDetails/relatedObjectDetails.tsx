import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Action,
  Button,
  ColorType,
  Icon,
  SearchInput,
  Skeleton,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { relatedPickableIcons } from '@bloobirds-it/utils';
import range from 'lodash/range';
import debounce from 'lodash/debounce';
import spacetime from 'spacetime';

import styles from './relatedObjectDetails.module.css';

export const RelatedObjectDetails = ({ data }) => {
  const { title, salesforceUrl, fields, icon, lastModifiedDate } = data;
  const { t } = useTranslation('translation', {
    keyPrefix: 'extendedScreen.relationObjectDetails',
  });

  const handleClick = () => {
    window.open(salesforceUrl, '_blank');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Action
            icon={icon ?? 'salesforce'}
            color={
              relatedPickableIcons.find(p => p.name === (icon ?? 'salesforce'))?.color as ColorType
            }
            size="s"
          />
          <Text size="m" color="peanut" weight="bold">
            {title}
          </Text>
          <div className={styles.rightSide}>
            <Text size="s" color="peanut">
              {spacetime(lastModifiedDate).format('{date-pad} {month-short}')}
            </Text>
          </div>
        </div>
        <div className={styles.row} />
        <FilteredFields fields={fields} />
      </div>
      <div className={styles.footerContainer}>
        <Button
          className={styles.button}
          variant="secondary"
          onClick={handleClick}
          iconLeft="externalLink"
        >
          {t('openInSalesforce')}
        </Button>
      </div>
    </div>
  );
};

export function FilteredFields({ fields }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'extendedScreen.relationObjectDetails',
  });
  const { t: tDates } = useTranslation('translation', { keyPrefix: 'dates' });
  const [filteredFields, setFilteredFields] = useState(fields);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFilteredFields(fields);
  }, [fields]);

  const getFilteredFields = debounce(value => {
    const filteredFields = fields.filter(field =>
      field.label.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredFields(filteredFields);
  }, 500);

  const handleChange = value => {
    setSearchText(value);
    getFilteredFields(value);
  };

  const handleClickOnReferenceField = urlReferenceField => {
    window.open(urlReferenceField, '_blank');
  };

  const getValue = field => {
    const value = field?.value;
    if (!value) {
      return '-';
    }

    const type = field?.fieldType;
    if (type === 'datetime') {
      try {
        return spacetime(value).format(tDates('shortMonthFullDate'));
      } catch (e) {
        return value;
      }
    }
    return value;
  };

  return (
    <>
      <div className={styles._search_wrapper}>
        <SearchInput
          color="bloobirds"
          width="356px"
          size="medium"
          onChange={handleChange}
          value={searchText}
          placeholder={t('searchPlaceholder')}
        />
        <Text size="xxs" color="softPeanut">
          {t('searchHelp')}
        </Text>
      </div>

      {filteredFields === undefined || filteredFields === null ? (
        <ActivityFeedSkeleton />
      ) : filteredFields?.length > 0 ? (
        <div className={styles.relationBody}>
          {filteredFields.map(field => (
            <div key={field.apiName} className={styles.relationField}>
              <Text size="s" color="softPeanut">
                {field?.label}
              </Text>
              {field.fieldType === 'reference' && field.urlReferencedObject != null ? (
                <span
                  className={styles.referenceField}
                  onClick={() => handleClickOnReferenceField(field.urlReferencedObject)}
                >
                  <Text size="s" color="bloobirds">
                    {getValue(field)}
                  </Text>
                </span>
              ) : (
                <Text size="s">{getValue(field)}</Text>
              )}
            </div>
          ))}
        </div>
      ) : (
        <NoFieldsSelectedToDisplay searchText={searchText} />
      )}
    </>
  );
}

const ActivityCardSkeleton = () => (
  <div>
    <Skeleton variant="text" width="50%" height={24} />
    <Skeleton variant="text" width="50%" height={24} />
  </div>
);

const ActivityFeedSkeleton = () => (
  <div className={styles.relationBody}>
    {range(6).map(number => (
      <Fragment key={number}>
        <ActivityCardSkeleton />
      </Fragment>
    ))}
  </div>
);

const NoFieldsSelectedToDisplay = ({ searchText }: { searchText: string }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'extendedScreen.relationObjectDetails',
  });
  return (
    <div className={styles.noDataContainer}>
      <Icon name="searchNone" color="softPeanut" />
      <div>
        <Text weight="bold" size="s" align="center" color="softPeanut">
          {t('noResults', { searchText })}
        </Text>
        <Text size="s" align="center" color="softPeanut">
          {t('tryOtherSearch')}
        </Text>
      </div>
    </div>
  );
};
