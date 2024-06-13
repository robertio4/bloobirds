import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useDataModel, useIsB2CAccount } from '@bloobirds-it/hooks';
import {
  BobjectPicklistValueEntity,
  BobjectType,
  BobjectTypes,
  bobjectUrl,
  defaultSearchCompany,
  LongBobjectId,
  SearchBobjectCompany,
  SearchBobjectType,
  StrDict,
} from '@bloobirds-it/types';
import { generateDatePrefix } from '@bloobirds-it/utils';
import { top } from '@popperjs/core';
import clsx from 'clsx';
import clone from 'lodash/clone';

import { AssigneeComponent } from '../../assigneeComponent/assigneeComponent';
import { StatusLabel } from '../../statusLabel/statusLabel';
import styles from '../bobjectItem.module.css';
import { getName, getSubtitle } from '../utils/searchBar.utils';

const ICONS: Partial<Record<BobjectType, IconType>> = {
  Lead: 'person',
  Company: 'company',
  Opportunity: 'fileOpportunity',
};

function resolveHit(hits: { [key: string]: string }, hitByName: string) {
  const obj = clone(hits);
  if (obj && obj[hitByName]) {
    delete obj[hitByName];
    return Object.values(obj)[0];
  }
  return Object.values(obj)[0];
}

export function SearchStatusLabel({ status }: { status: BobjectPicklistValueEntity }) {
  return status ? (
    <StatusLabel
      name={status.name}
      textColor={status.textColor}
      backgroundColor={status.backgroundColor}
      maxWidth="200px"
    />
  ) : null;
}

interface CardLeftComponentProps {
  bobject: SearchBobjectType;
  hits: StrDict;
  handleCompanyClicked: (
    bobject: SearchBobjectCompany,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  compressed?: boolean;
  isBubbleHomePage?: boolean;
}

function CardLeftComponent({ bobject, hits, handleCompanyClicked }: CardLeftComponentProps) {
  const dataModel = useDataModel();
  const isB2CAccount = useIsB2CAccount();

  const type = bobject?.bobjectType;
  const { name, hitByName } = getName(dataModel, bobject, hits);
  const subtitle = getSubtitle(bobject);
  const isNotCompany = type !== 'Company';
  const companyName = isNotCompany && bobject.companyName;
  const companyId = isNotCompany && bobject.companyId;
  const companyWebsite = isNotCompany && bobject.companyWebsite;

  const firstHit = hits && resolveHit(hits, hitByName);

  function handleCompanyClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const url = bobjectUrl({
      id: {
        typeName: companyId.split('/')[1] as BobjectTypes,
        objectId: companyId.split('/')[2],
      },
    });
    const company: SearchBobjectCompany = {
      ...defaultSearchCompany,
      rawBobject: { ...defaultSearchCompany.rawBobject, id: companyId as LongBobjectId<'Company'> },
      bobjectType: BobjectTypes.Company,
      companyName,
      url,
      website: companyWebsite,
    };
    handleCompanyClicked(company, event);
    event.stopPropagation();
  }

  return (
    <>
      <div className={styles.circleIcon}>
        <Icon name={ICONS[type]} size={20} color="bloobirds" />
      </div>
      <div className={styles.bobjectItemContent}>
        <div className={styles.bobjectItemName}>
          <Text size="s" color="bloobirds" className={styles.bobjectItemContentSpan}>
            <span dangerouslySetInnerHTML={{ __html: name }} />
          </Text>
        </div>
        <div className={styles.bobjectItemContentInfoRow}>
          <Text size="xs" color="softPeanut" className={styles.bobjectItemContentSpan}>
            {firstHit ? <span dangerouslySetInnerHTML={{ __html: firstHit }} /> : subtitle}
          </Text>
          {companyName && !isB2CAccount && (
            <div className={styles.bobjectItemContentInfoColumn}>
              <div className={styles.bobjectItemContentInfoRowSeparator}>
                {(firstHit || subtitle) && <Icon name={'circle'} size={15} color={'softPeanut'} />}
                <Icon name={'company'} size={15} color={'bloobirds'} />
              </div>

              <div
                onClick={event => handleCompanyClick(event)}
                style={{ cursor: 'pointer', overflow: 'hidden' }}
              >
                <Text size="xs" color="bloobirds" className={styles.bobjectItemContentSpan}>
                  {companyName}
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CardCenterComponent({
  bobject,
  isWebapp = false,
}: {
  bobject: SearchBobjectType;
  isWebapp: boolean;
}) {
  const { t } = useTranslation();
  const classes = clsx(styles.bobjectItemContentCenter, {
    [styles.bobjectItemContentCenterOTO]: !isWebapp,
  });

  return (
    <div className={classes}>
      <div className={styles.bobjectItemContentCenterColumn}>
        <AssigneeComponent value={bobject.assignedTo} />
      </div>
      {isWebapp && (
        <>
          <div className={styles.bobjectItemContentCenterColumn}>
            <div className={styles.bobjectItemContentCenterRow}>
              <Tooltip title={t('bobjects.bobjectItem.attempts')} position={top}>
                <Icon name={'check'} size={15} color={'softPeanut'} />
                <Text size="xs" color="softPeanut">
                  {bobject.attempts}
                </Text>
              </Tooltip>
            </div>
            <div className={styles.bobjectItemContentCenterRow}>
              <Tooltip title={t('bobjects.bobjectItem.touches')} position={top}>
                <Icon name={'checkDouble'} size={15} color={'bloobirds'} />
                <Text size="xs" color="softPeanut">
                  {bobject.touches}
                </Text>
              </Tooltip>
            </div>
          </div>
          <div className={styles.bobjectItemContentCenterColumn}>
            <div className={styles.bobjectItemContentCenterRow}>
              <Tooltip title={t('bobjects.bobjectItem.lastAttempt')} position={top}>
                <Icon name={'calendar'} size={15} color={'softPeanut'} />
                <Text size="xs" color="softPeanut">
                  {generateDatePrefix(
                    bobject.lastAttemptDate && new Date(bobject.lastAttemptDate),
                    true,
                    t,
                  )}
                </Text>
              </Tooltip>
            </div>
            <div className={styles.bobjectItemContentCenterRow}>
              <Tooltip title={t('bobjects.bobjectItem.lastTouch')} position={top}>
                <Icon name={'calendar'} size={15} color={'softPeanut'} />
                <Text size="xs" color="softPeanut">
                  {generateDatePrefix(
                    bobject.lastTouchDate && new Date(bobject.lastTouchDate),
                    true,
                    t,
                  )}
                </Text>
              </Tooltip>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface PreviewI {
  isSelected: boolean;
  bobject: SearchBobjectType;
  handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, bobject: any) => void;
}

export function SearchPreviewButton({ isSelected, bobject, handleClick }: PreviewI) {
  const { t } = useTranslation();
  return isSelected ? (
    <div className={styles.bobjectItem_preview_button_wrapper}>
      <Button
        dataTest="SearchBar-Preview"
        variant="secondary"
        uppercase={false}
        size="small"
        className={styles.bobjectItem_preview_button}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          handleClick?.(event, bobject);
        }}
      >
        {t('common.preview')}
      </Button>
    </div>
  ) : null;
}

export const SearchCardCenter = React.memo(CardCenterComponent);
export const SearchCardLeft = React.memo(CardLeftComponent);
