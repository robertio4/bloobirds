import React, { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { Button, Pagination, Text } from '@bloobirds-it/flamingo-ui';
import { useCadenceV2Enabled, useRouter } from '@bloobirds-it/hooks';
import { APP_CADENCES_ANALYZE, cadenceEditUrl, cadenceEditUrlV2 } from '@bloobirds-it/types';

import CadenceSelector from '../../../components/cadenceSelector/cadenceSelector';
import { useBobjectTypes } from '../../../hooks/useBobjectTypes';
import { useQueryParam } from '../../../hooks/useQueryParams';
import {
  CadencesTab,
  CadencesTabContent,
  CadencesTabFooter,
  CadencesTabHeader,
  CadencesTabHeaderLeft,
  CadencesTabHeaderRight,
  CadencesTableContainer,
} from '../../../layouts/cadencesLayout/cadencesTabLayout/cadencesTabLayout';
import SessionManagerFactory from '../../../misc/session';
import { AnalyzeCadencesList } from '../components/analyzeCadenceList/analyzeCadenceList';
import { useAnalyzeCadenceList } from '../components/analyzeCadenceList/useAnalyzeCadenceList';
import {
  BobjectTypeFilter,
  StartDateFilter,
  StartedByFilter,
} from '../components/filters/cadenceFilters';
import { KpisBlock } from '../components/kpisBlock/kpisBlock';
import styles from './analyzeTab.module.css';

export const AnalyzeTab = () => {
  const [isCadenceSelectorOpen, setIsCadenceSelectorOpen] = useState(false);
  const SessionManager = SessionManagerFactory();
  const cadenceV2Enabled = useCadenceV2Enabled(SessionManager.getAccount()?.id);
  const id = useQueryParam('cadence', true);
  const name = useQueryParam('name', true);
  const bobjectType = useQueryParam('bobjectType', true);
  const bobjectTypes = useBobjectTypes();
  const isCadenceView = !!id;
  const {
    selectedBobjectType,
    setSelectedBobjecType,
    page,
    setPage,
    pageSize,
    resetPage,
    setPageSize,
    totalElements,
    rangeDateProps,
    startedByProps,
    analyticsListProps,
    kpisProps,
    refresh,
    resetAllFilters,
    modifiedFilters,
  } = useAnalyzeCadenceList(id);
  const ref = useRef<HTMLDivElement>(null);
  const { history, location } = useRouter();
  useClickAway(ref, () => setIsCadenceSelectorOpen(false));

  useEffect(() => {
    resetPage();
  }, []);

  const handleBack = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('cadence');
    searchParams.delete('name');

    history.push({
      pathname: APP_CADENCES_ANALYZE,
      search: searchParams.toString(),
    });
  };

  return (
    <CadencesTab>
      <>
        <CadencesTabHeader>
          <CadencesTabHeaderLeft>
            <div className={styles.tabTitle__container}>
              <Text
                size="xl"
                color={name ? 'bloobirds' : 'peanut'}
                weight={name ? 'bold' : 'regular'}
              >
                {name ? name : 'All cadences'}
              </Text>
              <div style={{ display: 'flex', gap: 4 }}>
                {/* Temporary hidden due to performance issues in analyze tab
                isCadenceView && (
                  <Button
                    variant="secondary"
                    iconLeft="arrowLeft"
                    size="small"
                    uppercase={false}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )*/}
                <Button
                  variant="secondary"
                  iconRight="search"
                  size="small"
                  uppercase={false}
                  onClick={() => setIsCadenceSelectorOpen(!isCadenceSelectorOpen)}
                >
                  Select
                </Button>
                <Button
                  variant="secondary"
                  iconRight="refresh"
                  size="small"
                  uppercase={false}
                  onClick={refresh}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </CadencesTabHeaderLeft>
          <CadencesTabHeaderRight>
            {modifiedFilters && (
              <Button
                variant="clear"
                iconLeft="cross"
                size="small"
                uppercase={false}
                onClick={resetAllFilters}
              >
                Clear
              </Button>
            )}
            {!isCadenceView && (
              <BobjectTypeFilter
                selectedBobjectType={selectedBobjectType}
                setSelectedBobjecType={setSelectedBobjecType}
              />
            )}
            <StartedByFilter {...startedByProps} />
            <StartDateFilter {...rangeDateProps} />

            {isCadenceView && (
              <CadenceActionButtons
                openEditModal={() =>
                  history.push(
                    `${
                      cadenceV2Enabled ? cadenceEditUrlV2(id) : cadenceEditUrl(id)
                    }&bobjectType=${encodeURIComponent(bobjectType)}&name=${encodeURIComponent(
                      name,
                    )}`,
                  )
                }
              />
            )}
          </CadencesTabHeaderRight>
        </CadencesTabHeader>
        <CadencesTabContent>
          <>
            <KpisBlock {...kpisProps} />
            <CadencesTableContainer>
              <AnalyzeCadencesList
                cadenceId={id}
                totalRows={totalElements}
                {...analyticsListProps}
              />
            </CadencesTableContainer>
          </>
        </CadencesTabContent>
        <CadencesTabFooter>
          <Pagination
            rowsPerPageOptions={[10, 20, 50]}
            page={page}
            count={totalElements}
            rowsPerPage={pageSize}
            onChangePage={setPage}
            onChangeRowsPerPage={setPageSize}
          />
        </CadencesTabFooter>

        {isCadenceSelectorOpen && (
          <CadenceSelector
            onCadenceSelected={cadence => {
              const bobjectType = bobjectTypes?.get(cadence.bobjectType);
              history.push(
                `${APP_CADENCES_ANALYZE}?cadence=${encodeURIComponent(
                  cadence.id,
                )}&name=${encodeURIComponent(cadence.name)}&bobjectType=${encodeURIComponent(
                  bobjectType?.name,
                )}`,
              );
              setIsCadenceSelectorOpen(false);
            }}
            ref={ref}
          />
        )}
      </>
    </CadencesTab>
  );
};

export const CadenceActionButtons = ({ openEditModal }: { openEditModal: () => void }) => (
  <div style={{ display: 'flex', gap: 4 }}>
    <Button
      variant="secondary"
      iconRight="edit"
      size="small"
      uppercase={false}
      onClick={openEditModal}
    >
      Edit
    </Button>
  </div>
);
