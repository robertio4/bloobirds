import {
  CardBody,
  CardButton,
  CardHeader,
  CardHoverButtons,
  CardLeft,
  CardRight,
  CircularBadge,
  Icon,
  Label,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import { differenceInDays } from 'date-fns';
import React, { useCallback, useEffect } from 'react';
import { useVirtual } from 'react-virtual';
import { opportunityUrl } from '../../../../app/_constants/routes';
import { STEPS } from '../../../../components/cadenceControlModal/cadenceControlModal.machine';
import RightClickContextMenu from '../../../../components/rightClickContextMenu';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  useBobjectFormCreation,
  useCadenceControl,
  useContextMenu,
  useEntity,
  useMediaQuery,
  useRouter,
} from '../../../../hooks';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import SubhomeCard from '../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import SubhomeContentSkeleton from '../../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import Name from '../name/name';
import styles from './inactiveOpps.module.css';
import { InactiveOppsFilters } from './inactiveOppsFilters';
import { useSalesOppsInactive } from './useSalesInactiveOpps';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';

function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

const InactiveOppsCard = ({ inactiveOpp, showNextLine }) => {
  const { history } = useRouter();
  const { openCadenceControl } = useCadenceControl();
  const { openAddTask } = useBobjectFormCreation();
  const {
    ref: refContextMenu,
    xPos,
    yPos,
    isContextMenuVisible,
    handleContextMenu,
    hideContextMenu,
  } = useContextMenu();
  const isAccountAdmin = useIsAccountAdmin();
  const users = useEntity('users');
  const oppAssignedTo = getValueFromLogicRole(
    inactiveOpp,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  );
  const cardUser = users?.get(oppAssignedTo);

  const company = getFieldByLogicRole(inactiveOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const opportunityName = getTextFromLogicRole(inactiveOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  const opportunityAmount = getTextFromLogicRole(inactiveOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT);
  const opportunityStatus = getFieldByLogicRole(inactiveOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS);
  const opportunityLastUpdateDate = getTextFromLogicRole(
    inactiveOpp,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS__LAST_UPDATE,
  );
  const lead = getFieldByLogicRole(inactiveOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT)
    ?.referencedBobject;
  const leadName = getTextFromLogicRole(inactiveOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT);
  const numberOfLeads = getTextFromLogicRole(
    inactiveOpp,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.LEADS_COUNT,
  );
  const companyName = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const companyId = getTextFromLogicRole(inactiveOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY);
  const { isSmallDesktop } = useMediaQuery();
  const hasSalesEnabled = useFullSalesEnabled();
  const handleOnClick = e => {
    const url = opportunityUrl(
      hasSalesEnabled ? undefined : companyId?.value?.split('/')[2],
      inactiveOpp?.id.objectId,
    );
    history.push(url, { event: e });
  };

  return (
    <SubhomeCard
      hasNextCard={showNextLine}
      key={inactiveOpp?.id.objectId}
      onClick={handleOnClick}
      cardRef={refContextMenu}
      onContextMenu={handleContextMenu}
      dataTest={`inactive-opp-card-${inactiveOpp?.id.objectId}`}
    >
      <CardHeader>
        <CardLeft>
          <Icon name="fileOpportunity" size={20} color="peanut" />
        </CardLeft>
        <CardBody>
          {opportunityAmount && (
            <Tooltip title="Opportunity amount" position="top">
              <div className={styles._amount_wrapper}>
                <Text size="s">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                  }).format(opportunityAmount)}
                </Text>
              </div>
            </Tooltip>
          )}
          <div className={styles._url_wrapper}>
            <Tooltip title="Opportunity name" position="top">
              <Name
                name={opportunityName}
                bobject={inactiveOpp}
                ellipsis={isSmallDesktop ? 14 : 16}
              />
            </Tooltip>
            {leadName && (
              <>
                <Tooltip title="Lead name" position="top">
                  <span className={styles._separator} />
                  <Icon name="person" size={20} />
                  <Name
                    name={`${leadName} (+${numberOfLeads})`}
                    bobject={lead}
                    ellipsis={isSmallDesktop ? 14 : 16}
                  />
                </Tooltip>
              </>
            )}
            {companyName && (
              <>
                <Tooltip title="Company name" position="top">
                  <span className={styles._separator} />
                  <Icon name="company" size={20} />
                  <Name name={companyName} bobject={company} ellipsis={isSmallDesktop ? 14 : 16} />
                </Tooltip>
              </>
            )}
          </div>
          {isContextMenuVisible && (
            <RightClickContextMenu
              url={opportunityUrl(
                hasSalesEnabled ? undefined : company?.id.objectId,
                inactiveOpp?.id.objectId,
              )}
              xPos={xPos}
              yPos={yPos}
              hideContextMenu={hideContextMenu}
            />
          )}
        </CardBody>
        <CardRight>
          <div className={clsx(styles._status_wrapper, styles._s_hidden)}>
            {opportunityStatus?.text && (
              <Tooltip title="Opportunity status" position="top">
                <Label
                  dataTest="companyStatus"
                  overrideStyle={{
                    backgroundColor: opportunityStatus?.valueBackgroundColor,
                    color: opportunityStatus?.valueTextColor,
                    borderColor: opportunityStatus?.valueOutlineColor,
                  }}
                >
                  <Text
                    htmlTag="span"
                    color={opportunityStatus?.valueTextColor}
                    size="s"
                    ellipsis={isSmallDesktop ? 10 : 21}
                  >
                    {opportunityStatus?.text}
                  </Text>
                </Label>
              </Tooltip>
            )}
          </div>
          {isAccountAdmin && cardUser && (
            <div className={styles._assigned_circle}>
              <Tooltip title={cardUser?.name} position="top">
                <CircularBadge
                  size="s"
                  color="lightBloobirds"
                  style={{ color: 'var(--softPeanut)' }}
                >
                  {cardUser?.shortname || 'U'}
                </CircularBadge>
              </Tooltip>
            </div>
          )}
          <div className={clsx(styles._date, styles._s_hidden, styles._m_hidden, styles._l_hidden)}>
            <Text size="s" inline align="right" color="tomato">
              Inactive {differenceInDays(new Date(), new Date(opportunityLastUpdateDate))} days
            </Text>
          </div>
        </CardRight>
        <CardHoverButtons>
          <CardButton
            dataTest="Subhome-StartCadence"
            variant="secondary"
            iconLeft="calendar"
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              openCadenceControl({
                bobjectToSet: inactiveOpp,
                previousStep: false,
                step: STEPS.CONFIGURE_CADENCE,
              });
            }}
          >
            Set cadence
          </CardButton>
          <CardButton
            dataTest="Subhome-AddTask"
            iconLeft="check"
            onClick={async event => {
              event.preventDefault();
              event.stopPropagation();
              openAddTask({
                bobject: inactiveOpp,
              });
            }}
          >
            Add task
          </CardButton>
        </CardHoverButtons>
      </CardHeader>
    </SubhomeCard>
  );
};
const InactiveOppsList = ({ parentRef }) => {
  const { items: opportunities, isLoading, resetItems, totalMatching } = useSalesOppsInactive();
  const scrollingRef = React.useRef();

  const scrollToFn = React.useCallback((offset, defaultScrollTo) => {
    const duration = 1000;
    const start = parentRef.current.scrollTop;
    const startTime = (scrollingRef.current = Date.now());

    const run = () => {
      if (scrollingRef.current !== startTime) return;
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = easeInOutQuint(Math.min(elapsed / duration, 1));
      const interpolated = start + (offset - start) * progress;

      if (elapsed < duration) {
        defaultScrollTo(interpolated);
        requestAnimationFrame(run);
      } else {
        defaultScrollTo(interpolated);
      }
    };

    requestAnimationFrame(run);
  }, []);

  const rowVirtualizer = useVirtual({
    size: opportunities?.length,
    parentRef,
    estimateSize: useCallback(() => 72, []),
    overscan: 3,
    scrollToFn,
  });

  useEffect(
    () => () => {
      resetItems();
    },
    [],
  );

  return !isLoading ? (
    <div className={styles._inactive_page_wrapper}>
      {rowVirtualizer.virtualItems?.length > 0 && (
        <>
          <div className={styles._select_all_wrapper}>
            {totalMatching !== undefined && !Number.isNaN(totalMatching) && (
              <Label size="small">{`${totalMatching} results`}</Label>
            )}
          </div>
          <div>
            <div
              style={{
                height: `${rowVirtualizer.totalSize}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.virtualItems.map(virtualRow => {
                const inactiveOpp = opportunities[virtualRow.index];
                const showNextLine = opportunities[virtualRow.index + 1];
                return (
                  <div
                    key={virtualRow.index}
                    ref={virtualRow.measureRef}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <InactiveOppsCard inactiveOpp={inactiveOpp} showNextLine={showNextLine} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {rowVirtualizer.virtualItems?.length <= 0 && <SubhomeEmptyContent />}
    </div>
  ) : (
    <SubhomeContentSkeleton visible />
  );
};

export function InactiveOppsContent({ parentRef }) {
  return (
    <>
      <InactiveOppsFilters />
      <InactiveOppsList parentRef={parentRef} />
    </>
  );
}
