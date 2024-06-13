import React from 'react';
import { CircularBadge, Icon, IconButton, Label, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import classnames from 'classnames';
import { useHover } from '../../../../../hooks';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import styles from './cardPreview.module.css';

const CardPreview = ({ bobjectType, selectedFields }) => {
  const [ref, isHover] = useHover();
  const isCompany = bobjectType === BOBJECT_TYPES.COMPANY;
  const isLead = bobjectType === BOBJECT_TYPES.LEAD;

  return (
    <div className={styles._card_container}>
      <div className={styles._info__container}>
        {(isCompany || isLead) && <Icon size="20" name="zap" color="banana" />}
        {(isCompany || isLead) && (
          <div className={styles._mr_rating__container}>
            <Label
              overrideStyle={{
                backgroundColor: 'var(--verySoftMelon)',
                borderColor: 'var(--verySoftMelon)',
                color: 'var(--melon)',
              }}
            >
              MR
            </Label>
          </div>
        )}
      </div>
      <Tooltip title="Target market" position="top">
        <div className={styles._target_market__container}>
          <CircularBadge
            size="large"
            style={{ backgroundColor: 'var(--tangerine)', color: 'white' }}
          >
            {isLead ? 'BP' : 'TM'}
          </CircularBadge>
        </div>
      </Tooltip>
      <Tooltip title="Company name" position="top">
        <div ref={ref} className={styles._name__container}>
          <span className={styles._name_text__container}>
            <Text size="xl" color="bloobirds" align="center" ellipsis={28}>
              {`${bobjectType} name`}
            </Text>
          </span>
          <div
            className={classnames(styles._edit_icon, {
              [styles._edit_icon__visible]: isHover,
            })}
          >
            <IconButton size="20" name="edit" />
          </div>
        </div>
      </Tooltip>
      <Tooltip title="On prospection" position="top">
        <span className={styles._status__container}>
          <Label
            overrideStyle={{
              backgroundColor: 'var(--verySoftGrape)',
              borderColor: 'var(--verySoftGrape)',
            }}
          >
            <Text htmlTag="span" color="peanut" size="s" ellipsis={21}>
              Status
            </Text>
          </Label>
        </span>
      </Tooltip>
      <div className={styles._assignTo__container}>
        <CircularBadge size="small" style={{ backgroundColor: '#FF6685', color: 'white' }}>
          AT
        </CircularBadge>
        <Text size="s">Assign to</Text>
      </div>
      <div className={styles._fields__container}>
        {selectedFields?.map(field => (
          <div className={styles._field__container} key={field?.id}>
            <Tooltip title={field?.name} position="top">
              <Icon size="16" color="softPeanut" name={field?.layoutIcon} />
              <Text size="s" color="peanut" ellipsis={30}>
                {field?.name !== 'ICP' ? field?.name : 'Buyer persona'}
              </Text>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPreview;
