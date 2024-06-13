import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CircularBadge,
  ColorPicker,
  Icon,
  Item,
  Label,
  Select,
  Switch,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { CrmStatusMapping } from '@bloobirds-it/types';

import { EntityCardItem } from '../../../../components/entityList/entityCard/entityCard';
import { BobjectPicklistValueEntity } from '../../../../typings/entities.js';
import { api } from '../../../../utils/api';
import { colors } from '../utils/colors';
import styles from './crmStatusCard.module.css';

export const CrmStatusCard = ({
  crmStatusMappingItem,
  crmStatusTypes,
  mutateList,
}: {
  crmStatusMappingItem: CrmStatusMapping;
  crmStatusTypes: BobjectPicklistValueEntity[];
  mutateList: () => void;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'accountSettings.crmStatus' });
  const [statusCategory, setStatusCategory] = useState<string>(
    crmStatusMappingItem?.statusCategoryId,
  );
  const [charsColor, setCharsColor] = useState<string>(
    crmStatusMappingItem?.textColor || '#464f57',
  );
  const [pillColor, setPillColor] = useState<string>(
    crmStatusMappingItem?.backgroundColor || '#edf1f5',
  );

  const [enabled, setEnabled] = useState<boolean>(crmStatusMappingItem?.active);

  const { createToast } = useToasts();

  const updateCrmStatusMapping = (body: any) => {
    api
      .patch('/utils/crmStatus/updateCrmStatusMapping', {
        id: crmStatusMappingItem?.id,
        statusCategoryId: body?.statusCategoryId,
        textColor: body?.textColor,
        backgroundColor: body?.backgroundColor,
        active: body?.active,
      })
      .then(() => {
        createToast({ message: t('updateFieldSuccess'), type: 'success' });
        mutateList();
      })
      .catch(() => {
        createToast({
          message: t('updateFieldFailed'),
          type: 'error',
        });
      });
  };

  return (
    <>
      <EntityCardItem
        className={!crmStatusMappingItem?.statusCategoryId && styles._unassigned_stage_row}
      >
        <>
          <Icon name="dragAndDrop" size={24} color="softPeanut" />
          <div className={styles._color__picker}>
            <ColorPicker
              size={24}
              type="hex"
              defaultValue={{
                charColor: charsColor,
                color: pillColor,
              }}
              onChange={({ color, charColor }) => {
                setCharsColor(charColor);
                setPillColor(color);
                updateCrmStatusMapping({
                  backgroundColor: color,
                  textColor: charColor,
                  statusCategoryId: statusCategory,
                });
              }}
              displayColors={Object.values(colors)}
            />
          </div>
        </>
      </EntityCardItem>
      <EntityCardItem
        className={!crmStatusMappingItem?.statusCategoryId && styles._unassigned_stage_row}
      >
        {!crmStatusMappingItem?.statusCategoryId && (
          <Tooltip title={'Unassigned status'} position="top">
            <CircularBadge size="small" className={styles._circularBadge}>
              {((<Icon name="alertTriangle" color="banana" size={24} />) as unknown) as string}
            </CircularBadge>
          </Tooltip>
        )}

        {crmStatusMappingItem?.crmStatusName}
      </EntityCardItem>
      <EntityCardItem
        className={!crmStatusMappingItem?.statusCategoryId && styles._unassigned_stage_row}
      >
        <Select
          placeholder={t('selectStatus')}
          removePlaceholder={true}
          onChange={value => {
            setStatusCategory(value);
            updateCrmStatusMapping({
              statusCategoryId: value,
              backgroundColor: pillColor,
              textColor: charsColor,
            });
          }}
          value={statusCategory}
        >
          <Item value={null}> </Item>
          {crmStatusTypes?.map(crmStatusType => {
            return (
              <Item key={crmStatusType?.id} value={crmStatusType.logicRole}>
                {crmStatusType?.value}
              </Item>
            );
          })}
        </Select>
      </EntityCardItem>
      <EntityCardItem
        className={!crmStatusMappingItem?.statusCategoryId && styles._unassigned_stage_row}
      >
        <Label
          overrideStyle={{
            backgroundColor: pillColor,
            borderColor: pillColor,
          }}
          uppercase={false}
        >
          <Text
            size="xs"
            align="center"
            color={charsColor === '#ffffff' ? 'white' : 'peanut'}
            className={styles._status_value}
            ellipsis={23}
          >
            {crmStatusMappingItem?.crmStatusLabel}
          </Text>
        </Label>
      </EntityCardItem>
      <EntityCardItem
        className={!crmStatusMappingItem?.statusCategoryId && styles._unassigned_stage_row}
      >
        <Switch
          color="purple"
          checked={enabled}
          onChange={v => {
            setEnabled(v);
            updateCrmStatusMapping({
              active: v,
            });
          }}
        />
      </EntityCardItem>
    </>
  );
};
