import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactShadowRoot from 'react-shadow-root';

import {
  CircularBadge,
  Dropdown,
  Icon,
  Label,
  Spinner,
  Text,
  Tooltip,
  useHover,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useUserSearch } from '@bloobirds-it/hooks';
import { TemplateInformation } from '@bloobirds-it/playbook';
import { TEMPLATE_TYPES } from '@bloobirds-it/types';
import clsx from 'clsx';

import { useExtensionContext } from '../../../context';
import Metric from './metric/metric';
import salesforceResetStyles from './resetSalesforceCSSs.module.css';
import styles from './templateDetail.module.css';

const TemplateHeader = ({
  name,
  isBattlecard,
  isOfficial,
  cadenceUsages,
  visibility,
  createdBy,
  templateStatistics,
  type,
  ...template
}) => {
  const { users } = useUserSearch() || {};
  const author = users?.find(user => user.id === createdBy);
  const [anchorRef, isHovering] = useHover();
  const { t } = useTranslation();
  const { ref, visible: infoVisible, setVisible: setInfoVisible } = useVisible(false, anchorRef);

  useEffect(() => {
    setInfoVisible(isHovering);
  }, [isHovering]);

  return (
    <div className={styles.header}>
      <Text size="m" weight="bold">
        {name}
      </Text>
      <div className={styles.headerIcons}>
        {type === TEMPLATE_TYPES.EMAIL && cadenceUsages > 0 && (
          <Label
            size="small"
            color="verySoftPurple"
            textColor="purple"
            uppercase={false}
            overrideStyle={{ maxWidth: '142px', letterSpacing: 0.5 }}
          >
            {t('extendedScreen.templateDetail.usedInXCadences', { count: cadenceUsages || 0 })}
          </Label>
        )}
        {visibility && (
          <Label
            size="small"
            color="verySoftPurple"
            textColor="purple"
            uppercase={false}
            overrideStyle={{ maxWidth: '77px' }}
          >
            <span className={styles.visibilityLabel}>
              <Icon name={visibility === 'PUBLIC' ? 'unlock' : 'lock'} color="purple" size={14} />
              {visibility === 'PUBLIC'
                ? t('extendedScreen.templateDetail.public')
                : t('extendedScreen.templateDetail.private')}
            </span>
          </Label>
        )}
        {isBattlecard && (
          <Tooltip title={t('extendedScreen.templateDetail.battleCard')} position="top">
            <Icon name="battlecards" color="purple" />
          </Tooltip>
        )}
        {isOfficial && (
          <Tooltip title={t('extendedScreen.templateDetail.official')} position="top">
            <Icon name="bookmark" color="purple" />
          </Tooltip>
        )}

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
            <TemplateInformation
              template={{
                createdBy,
                ...template,
              }}
            />
          </div>
        </Dropdown>
        {author && (
          <div className={styles._assigned_to}>
            <Tooltip
              title={`${t('extendedScreen.templateDetail.author')}: ${author?.name}`}
              position="top"
            >
              <CircularBadge
                size="s"
                color="lightPeanut"
                style={{ color: 'var(--white)', fontSize: '9px' }}
                backgroundColor={author?.color || 'lightPeanut'}
              >
                {author?.shortname || 'U'}
              </CircularBadge>
            </Tooltip>
          </div>
        )}
      </div>
      {type === TEMPLATE_TYPES.EMAIL &&
        templateStatistics &&
        Object.keys(templateStatistics).length !== 0 && (
          <div className={styles._statistics_container}>
            {/*<Metric name='USED_COUNT' value={templateStatistics.USED_COUNT} />*/}
            <Metric name="OPENED_RATE" value={templateStatistics.OPENED_RATE} />
            <Metric name="CLICKED_RATE" value={templateStatistics.CLICKED_RATE} />
            <Metric name="REPLIED_RATE" value={templateStatistics.REPLIED_RATE} />
          </div>
        )}
      <div className={styles.separator} />
    </div>
  );
};

export const TemplateDetail = () => {
  const { useGetExtendedContext } = useExtensionContext();
  const extendedContext = useGetExtendedContext();
  const template = extendedContext?.template;
  const ref = useRef();

  return (
    <div className={styles.container}>
      {!template ? (
        <div className={styles.loading}>
          <Spinner name="loadingCircle" />
        </div>
      ) : (
        <>
          <TemplateHeader {...template} />
          <div>
            <ReactShadowRoot>
              <div
                ref={ref}
                style={{ overflow: 'auto' }}
                className={clsx(styles.templateBody, salesforceResetStyles.salesforceReset)}
                dangerouslySetInnerHTML={{ __html: template?.previewContent }}
              />
            </ReactShadowRoot>
          </div>
        </>
      )}
    </div>
  );
};
