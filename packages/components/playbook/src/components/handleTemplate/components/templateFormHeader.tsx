import React, { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Dropdown,
  Icon,
  Label,
  Text,
  Tooltip,
  useHover,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useUserSearch } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { TEMPLATE_TYPES, TemplateStage } from '@bloobirds-it/types';
import { getUserTimeZone } from '@bloobirds-it/utils';

import styles from '../handleTemplate.module.css';
import { TemplateFormContext } from './templateForm';

const labelProps = {
  uppercase: false,
  overrideStyle: {
    fontSize: '12px',
    padding: '2px 4px',
    height: '20px',
    fontWeight: 'var(--regular)',
  },
};

const StageLabel = ({ stage }: { stage: TemplateStage }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.templateFormHeader' });
  switch (stage) {
    case TemplateStage.Prospecting:
      return (
        <Label color="lightestCall" textColor="extraCall" {...labelProps}>
          {t('prospecting')}
        </Label>
      );
    case TemplateStage.Sales:
      return (
        <Label color="lightPeanut" textColor="peanut" {...labelProps}>
          {t('sales')}
        </Label>
      );
    case TemplateStage.All:
      return (
        <Label color="lightBloobirds" textColor="bloobirds" {...labelProps}>
          {t('prospectingAndSales')}
        </Label>
      );
    default:
      return (
        <Label color="lightTomato" textColor="tomato" {...labelProps}>
          {t('noStage')}
        </Label>
      );
  }
};

export const DateInformation = ({ data: { title, user, date, icon }, t }) => {
  return (
    <div className={styles.dateInformation}>
      <Icon name={icon} size={18} color="lightPurple" />
      <Text size="xs" weight="bold">
        {title}
      </Text>
      <div className={styles.dateContent}>
        <Text size="xs" weight="medium">
          {t('userOnDate', { user, date })}
        </Text>
      </div>
    </div>
  );
};

function formatDatetime(value, pattern) {
  const date = useGetI18nSpacetime(value, getUserTimeZone()).unixFmt(pattern);
  if (!value) return 'Undefined date';
  return date;
}

export const TemplateInformation = ({ template }) => {
  const { users } = useUserSearch() || {};
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'playbook.templateFormHeader' });

  const pattern = i18n.language === 'es' ? 'dd MM yyyy h:mm a' : 'yyyy MM dd h:mm a';

  const creationInfo = {
    title: t('createdBy'),
    user: users?.find(user => user.id === template.createdBy)?.name,
    date: formatDatetime(template.creationDatetime, pattern),
    icon: 'calendar',
  };
  const lastUpdatedInfo = {
    title: t('lastUpdatedBy'),
    user: template.updatedBy,
    date: formatDatetime(template.updateDatetime, pattern),
    icon: 'refresh',
  };

  return (
    <div className={styles.templateInfoEditing}>
      <DateInformation data={creationInfo} t={t} />
      <DateInformation data={lastUpdatedInfo} t={t} />
    </div>
  );
};

export const TemplateHeader = () => {
  const { watch } = useFormContext();
  const stage = watch('stage');
  const visible = watch('visibility');
  const official = watch('isOfficial');
  const battlecard = watch('isBattlecard');

  const [anchorRef, isHovering] = useHover();
  const { ref, visible: infoVisible, setVisible: setInfoVisible } = useVisible(false, anchorRef);
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.templateFormHeader' });

  useEffect(() => {
    setInfoVisible(isHovering);
  }, [isHovering]);

  const { template } = useContext(TemplateFormContext);

  const isEditing = !!template.id;
  const isSnippet = template?.type === TEMPLATE_TYPES.SNIPPET;

  return (
    <div className={styles.templateInfoWrapper}>
      <StageLabel stage={stage} />
      <div className={styles.separator} />
      <Label
        textColor="purple"
        color="verySoftPurple"
        uppercase={false}
        overrideStyle={{
          fontSize: '12px',
          padding: '2px 4px',
          height: '20px',
          fontWeight: 'var(--regular)',
        }}
      >
        <div className={styles.visibilityLabel}>
          <Icon
            name={visible === 'PUBLIC' ? 'unlock' : 'lock'}
            color="lightPurple"
            size={14}
            className={styles._lock__icon}
          />
          {visible === 'PUBLIC' ? t('public') : t('private')}
        </div>
      </Label>

      {official && (
        <Tooltip title={t('official')} position="top">
          <Icon name="bookmark" color="purple" />
        </Tooltip>
      )}
      {isSnippet && battlecard && (
        <Tooltip title={t('battlecard')} position="top">
          <Icon name="battlecards" color="purple" />
        </Tooltip>
      )}
      {isEditing && (
        <>
          <div className={styles.separator} />
          <Dropdown
            anchor={
              <div ref={anchorRef} className={styles.dropdownAnchorWrapper}>
                <Icon name="infoFilled" color="darkBloobirds" size={20} />
              </div>
            }
            visible={infoVisible}
            ref={ref}
          >
            <div className={styles.dropdownWrapper}>
              <TemplateInformation template={template} />
            </div>
          </Dropdown>
        </>
      )}
    </div>
  );
};
