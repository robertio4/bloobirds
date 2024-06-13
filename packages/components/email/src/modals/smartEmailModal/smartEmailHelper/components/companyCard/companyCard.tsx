import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ColorType,
  Dropdown,
  Icon,
  IconButton,
  IconType,
  Label,
  Skeleton,
  Text,
  useHover,
} from '@bloobirds-it/flamingo-ui';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { CopyText } from '@bloobirds-it/meeting';
import { CompanyCardType, SimilarDealsFields, SimilarDealsFieldsLabels } from '@bloobirds-it/types';
import { addHttpsIfNeeded, parseAmount } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import range from 'lodash/range';

import {
  getChemistryColor,
  getCompanyFieldsByType,
  getIconName,
} from '../../utils/smartEmailHelper.utils';
import styles from './companyCard.module.css';

const CompanyCardSkeleton = () => (
  <div className={styles.company_card_skeleton}>
    <div className={styles.skeleton_header}>
      <Skeleton variant="text" width="20%" height={20} />
      <Skeleton variant="text" width="30%" height={20} />
    </div>
    <Skeleton variant="text" width="98%" height={2} />
    <div className={styles.skeleton_body}>
      <div>
        <Skeleton variant="text" width="65%" height={20} />
        <Skeleton variant="text" width="70%" height={20} />
      </div>
      <div>
        <Skeleton variant="text" width="65%" height={20} />
        <Skeleton variant="text" width="70%" height={20} />
      </div>
      <div>
        <Skeleton variant="text" width="65%" height={20} />
        <Skeleton variant="text" width="70%" height={20} />
      </div>
      <div>
        <Skeleton variant="text" width="65%" height={20} />
        <Skeleton variant="text" width="70%" height={20} />
      </div>
    </div>
  </div>
);

export const SimilarDealsSkeleton = () => (
  <div className={styles.skeleton}>
    {range(4).map(number => (
      <Fragment key={number}>
        <CompanyCardSkeleton />
      </Fragment>
    ))}
  </div>
);

const MainInfoField = ({
  label,
  value,
  link,
  isBubble,
}: {
  label: SimilarDealsFieldsLabels;
  value: string | number;
  link?: string;
  isBubble?: boolean;
}) => {
  const { t } = useTranslation();

  const parseValue = (label: SimilarDealsFieldsLabels, value: string | number) => {
    switch (label) {
      case SimilarDealsFieldsLabels.closeDate:
      case SimilarDealsFieldsLabels.clientDate:
        return useGetI18nSpacetime(value).format(t('dates.shortYear'));
      case SimilarDealsFieldsLabels.amount:
        return parseAmount(value, 0, 0);
      default:
        return value;
    }
  };

  return value ? (
    <div
      className={styles.mainInfo}
      style={{
        width: isBubble ? '127px' : '47%',
      }}
    >
      <div className={styles.mainInfo_header}>
        {label === SimilarDealsFieldsLabels.amount ? (
          <Text size={isBubble ? 'xs' : 's'} color="verySoftPeanut">
            €
          </Text>
        ) : (
          <Icon
            size={isBubble ? 14 : 16}
            name={getIconName(label) as IconType}
            color="verySoftPeanut"
          />
        )}
        <Text size={isBubble ? 'xs' : 's'} weight="bold">
          {label}
        </Text>
      </div>
      <div className={styles.mainInfo_body}>
        {label === SimilarDealsFieldsLabels.contact && typeof value === 'string' ? (
          <>
            <CopyText alwaysDisplay textToCopy={value}>
              <Text
                size={isBubble ? 'xs' : 's'}
                className={clsx(styles.mainInfo_value_with_buttons, {
                  [styles.mainInfo_value_with_buttons_short]: isBubble,
                })}
              >
                {value}
              </Text>
            </CopyText>
            {link && (
              <IconButton
                name="linkedin"
                color="bloobirds"
                size={isBubble ? 14 : 16}
                onClick={() => window.open(addHttpsIfNeeded(link), '_blank')}
              />
            )}
          </>
        ) : (
          <Text
            size={isBubble ? 'xs' : 's'}
            className={clsx(styles.mainInfo_value, { [styles.mainInfo_value_short]: isBubble })}
          >
            {parseValue(label, value)}
          </Text>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export const CompanyCard = ({
  company,
  index,
  isBubble,
}: {
  company: CompanyCardType;
  index: number;
  isBubble?: boolean;
}) => {
  const [ref, isHovering] = useHover();
  const controls = useAnimation();
  const variants = {
    start: () => ({
      scale: [0, 1.1, 1],
      opacity: [0, 1, 1],
      transition: {
        duration: 0.3,
        delay: index / 10,
      },
    }),
  };
  const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.similarDealsTab' });

  useEffect(() => {
    controls?.start('start');
  }, []);

  return (
    <motion.div animate={controls} variants={variants} className={styles.container}>
      <div className={styles.header}>
        <CopyText alwaysDisplay textToCopy={company.name}>
          <Text
            size="m"
            color="bloobirds"
            weight="bold"
            className={clsx(styles.company_title, { [styles.company_title_short]: isBubble })}
          >
            {company.name}
          </Text>
        </CopyText>
        <div className={styles.headerRight}>
          <div ref={ref} className={styles.chemistry_text}>
            <Dropdown
              width={295}
              position="bottom-end"
              arrow
              visible={isHovering}
              anchor={
                <Text
                  color={getChemistryColor(company.chemistry) as ColorType}
                  size="m"
                  weight="bold"
                >
                  {company.chemistry + '%'}
                </Text>
              }
            >
              <div className={styles.chemistry_dropdown}>
                <Text size={isBubble ? 's' : 'm'} color="softPeanut">
                  {t('matchesInSame')}
                </Text>
                <ul>
                  {company.matchingFields.map(field => (
                    <li key={field.label} className={styles.matching_list_element}>
                      <Icon name="circle" size={16} color="peanut" />
                      <Text size={isBubble ? 'xs' : 's'} className={styles.matching_list_text}>
                        <b>{field.label}:</b> {field.value}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Dropdown>
          </div>

          <Label
            size="small"
            color={company.companyType === 'Client' ? 'peanut' : 'softPeanut'}
            value={company.companyType}
            uppercase={false}
          >
            {company.companyType}
          </Label>
        </div>
      </div>
      <div className={styles.mainInfo_container}>
        {getCompanyFieldsByType(company.companyType).map(field => (
          <MainInfoField
            key={field}
            label={SimilarDealsFieldsLabels[field]}
            value={company[field]}
            link={company[SimilarDealsFields.LINKEDIN_URL]}
            isBubble={isBubble}
          />
        ))}
      </div>
    </motion.div>
  );
};
