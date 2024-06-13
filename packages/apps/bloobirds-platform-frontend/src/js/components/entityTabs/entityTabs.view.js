import React, { useEffect, useState, useRef } from 'react';
import { IconButton, Button, Text, Spinner } from '@bloobirds-it/flamingo-ui';
import { connect } from 'react-redux';
import {
  ENTITY_TABS_HIDE,
  ENTITY_TABS_REQUEST_SUCCESS,
  ENTITY_TABS_RESET,
  ENTITY_TABS_SHOW,
  ENTITY_TABS_SWITCH_TAB,
} from '../../actions/dictionary';
import classNames from 'clsx';
import { ServiceApi } from '../../misc/api/service';
import styles from './entityTabs.module.css';
import useMediaQuery from '../../hooks/useMediaQuery';
import { v4 as generateRandomId } from 'uuid';
import { useBobjectFormCreation } from '../../hooks';

const FieldValues = ({ entity }) =>
  entity.fieldValueConditions.map(fv => (
    <div className={styles.tmDetailsFieldContainer} key={`conditions-${fv?.childField?.label}`}>
      <p className={styles.tmDetailsCompanyInfoText}>{fv?.childField?.label}</p>
      <div className={styles.tmDetailsFieldWrap}>
        {fv?.fieldValuesToDisplay?.map(value => (
          <p className={styles.tmDetailsFieldValuesValue} key={`field-condition-${value?.value}`}>
            {value?.label}
          </p>
        ))}
      </div>
    </div>
  ));

const getFontSize = (textLength, baseFontSize = 20) => {
  const baseSize = 2;
  const fontSize = baseFontSize - (textLength - baseSize) * 4;
  return `${fontSize}px`;
};

const CurrentEntity = ({
  entities,
  displayed,
  expanded,
  handleDisplayCompanyInfo,
  handleHideCompanyInfo,
  informationTitleLabel,
}) =>
  entities.map((entity, key) => {
    if (key === displayed) {
      const fontSize = getFontSize(entity.shortName.length, 25);
      return (
        <div key={`ctm-${entity.name}`} className={styles._targetMarkets__entity__container}>
          <section>
            <div className={styles._targetMarkets__entity__header}>
              <div
                style={{ backgroundColor: entity.color }}
                className={styles.targetMarkets__entity__button}
              >
                <div
                  className={styles.targetMarkets__button__text}
                  style={{
                    fontSize,
                    height: fontSize,
                    lineHeight: fontSize,
                  }}
                >
                  {entity.shortName}
                </div>
              </div>
              <div className={styles.tmTitleLinkContainer}>
                <Text color="peanut" inline={false}>
                  {entity.name}
                </Text>
                <div className={styles.cardLinkedinContainer}>
                  <IconButton
                    name={!expanded ? 'chevronDown' : 'chevronUp'}
                    onClick={!expanded ? handleDisplayCompanyInfo : handleHideCompanyInfo}
                  />
                </div>
              </div>
            </div>
            {expanded ? (
              <React.Fragment>
                <article className={styles.tmDetailsArticle}>
                  <p className={styles.tmDetailsCompanyInfoText}>{informationTitleLabel}</p>
                  <p className={styles.tmDetailsCompanyInfoDescription}>
                    {entity.description.replace(/<\/?(.*?)>/g, '')}
                  </p>
                </article>
                <article className={styles.tmDetailsArticleFieldValues}>
                  {key === displayed && entity.fieldValueConditions?.length !== 0 && (
                    <FieldValues entity={entity} />
                  )}
                </article>
              </React.Fragment>
            ) : (
              ''
            )}
          </section>
        </div>
      );
    }
    return undefined;
  });

const NamesList = ({ entities, displayed, displayTargetMarket }) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [pagedEntities, setPagedEntities] = useState(entities.slice(0, 10));

  const { windowDimensions } = useMediaQuery();

  const ref = useRef(null);

  const handleNextEntities = () => {
    setPage(page + 1);
  };
  const handlePreviousEntities = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    const numberOfTMs = ref.current ? Math.floor(ref.current.offsetWidth / 52) : 0;
    setSize(numberOfTMs);
  }, [windowDimensions.width]);

  useEffect(() => {
    setPagedEntities(entities.slice((page - 1) * size, size * page));
  }, [page, size]);

  return (
    <div className={styles._targetMarkets__container}>
      <IconButton
        name="chevronLeft"
        onClick={handlePreviousEntities}
        disabled={page === 1}
        size={16}
      />
      <div className={styles._targetMarketsList__container} ref={ref}>
        {pagedEntities.map((entity, key) => {
          const { shortName } = entity;
          const targetMarketIndex = key + (page - 1) * size;
          const fontSize = getFontSize(shortName.length);
          return (
            <div
              id={targetMarketIndex}
              key={generateRandomId()}
              className={classNames(styles.targetMarkets__button, {
                [styles.targetMarkets__button_selected]: displayed === targetMarketIndex,
              })}
              onClick={displayTargetMarket(targetMarketIndex)}
              style={{ backgroundColor: entity.color }}
            >
              <div
                className={styles.targetMarkets__button__text}
                style={{
                  fontSize,
                  height: fontSize,
                  lineHeight: fontSize,
                }}
              >
                {entity.shortName}
              </div>
            </div>
          );
        })}
        {[...Array(size - pagedEntities.length > 0 ? size - pagedEntities.length : 0).keys()].map(
          () => (
            <div className={styles.targetMarkets__placeholder} key={generateRandomId()} />
          ),
        )}
      </div>
      <IconButton
        name="chevronRight"
        onClick={handleNextEntities}
        size={16}
        disabled={entities.length <= size * page}
      />
    </div>
  );
};

const EntityTabsView = props => {
  const {
    entityType,
    entities,
    displayTargetMarket,
    displayed,
    dispatch,
    handleOpenModal,
    expanded,
    handleDisplayCompanyInfo,
    handleHideCompanyInfo,
    onCtaClick,
    title,
    subtitle,
    modalButtonText,
    informationTitleLabel,
    reset,
  } = { ...props };

  useEffect(() => reset, []);

  React.useEffect(() => {
    ServiceApi.request({
      url: `/service/view/${entityType}`,
      method: 'GET',
    }).then(payload => dispatch({ type: ENTITY_TABS_REQUEST_SUCCESS, payload }));
  }, [entityType, dispatch]);

  if (entities !== undefined) {
    return (
      <div className={styles.tmContainer}>
        <div className={styles._targetMarkets__title}>
          <Text color="softPeanut" size="xs">
            {title}
          </Text>
          <Text color="peanut">{subtitle}</Text>
        </div>
        <div className={styles.targetMarketsRow__container}>
          <NamesList
            entities={entities}
            displayTargetMarket={displayTargetMarket}
            displayed={displayed}
          />
          {modalButtonText && (
            <div className={styles.createQC__container}>
              <Button expand onClick={() => handleOpenModal(onCtaClick)}>
                {modalButtonText}
              </Button>
            </div>
          )}
        </div>
        <CurrentEntity
          displayed={displayed}
          entities={entities}
          expanded={expanded}
          handleDisplayCompanyInfo={handleDisplayCompanyInfo}
          handleHideCompanyInfo={handleHideCompanyInfo}
          informationTitleLabel={informationTitleLabel}
        />
      </div>
    );
  }
  return (
    <div className={styles.loaderWrapper}>
      <Spinner size={40} />
    </div>
  );
};

const mapStateToProps = state => ({
  displayed: state.components.entityTabs.displayed,
  expanded: state.components.entityTabs.expanded,
  entities: state.components.entityTabs.entities,
});

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch({ type: ENTITY_TABS_RESET }),
  displayTargetMarket: key => () => dispatch({ type: ENTITY_TABS_SWITCH_TAB, value: key }),
  handleOpenModal: onClick => onClick(dispatch),
  handleDisplayCompanyInfo: () => dispatch({ type: ENTITY_TABS_SHOW }),
  handleHideCompanyInfo: () => dispatch({ type: ENTITY_TABS_HIDE }),
  dispatch,
});

const EntityTabs = connect(mapStateToProps, mapDispatchToProps)(EntityTabsView);

export const TargetMarketTabs = props => {
  const { openAddCompany } = useBobjectFormCreation();
  return (
    <EntityTabs
      {...props}
      entityType="targetMarket"
      onCtaClick={openAddCompany}
      title="TARGET MARKET"
      subtitle=""
      modalButtonText="ADD NEW QUALIFIED COMPANY"
      informationTitleLabel="COMPANY INFORMATION"
    />
  );
};
