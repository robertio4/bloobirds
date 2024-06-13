import React, { useEffect, useLayoutEffect, useRef } from 'react';

import { Portal, Skeleton } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount, useIsOTOAccount } from '@bloobirds-it/hooks';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import clsx from 'clsx';
import useSWR from 'swr';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../constants/lead';
import { useBobjectDetails } from '../../hooks';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import { BobjectApi } from '../../misc/api/bobject';
import { getFieldByLogicRole } from '../../utils/bobjects.utils';
import { SalesLabel } from '../salesLabel/salesLabel';
import styles from './bobjectDetailsModal.module.css';
import Content from './content/content';
import Footer from './footer/footer';
import Header from './header/header';

const BobjectDetailsModal = () => {
  const isNoStatusAccount = useIsNoStatusPlanAccount();
  const { isOpen, id, resetBobjectDetailsConfig, closeBobjectDetails } = useBobjectDetails();
  const bobjectId = id?.split('/')[2];
  const bobjectType = id?.split('/')[1];
  const ref = useRef(null);
  const { data: bobjectData } = useSWR(`/${bobjectType}/${bobjectId}/search`, () =>
    BobjectApi.request().bobjectType(bobjectType).getForm(bobjectId, 'injectReferences=true'),
  );
  const hasSalesEnabled = useFullSalesEnabled();
  const isOTOAccount = useIsOTOAccount();
  const isCompanyOrLead =
    bobjectType === BOBJECT_TYPES.COMPANY || bobjectType === BOBJECT_TYPES.LEAD;
  const showDistinction = hasSalesEnabled && isCompanyOrLead && !isNoStatusAccount;
  const showSalesDistinction = data => {
    const stage =
      bobjectType === BOBJECT_TYPES.COMPANY
        ? getFieldByLogicRole(data, COMPANY_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole
        : getFieldByLogicRole(data, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole;
    return showDistinction && stage === `${bobjectType.toUpperCase()}__STAGE__SALES`;
  };

  useEffect(() => resetBobjectDetailsConfig, []);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeBobjectDetails();
      resetBobjectDetailsConfig();
    }
  };

  useLayoutEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    isOpen && (
      <Portal>
        <div
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={styles._container}
        >
          {bobjectData ? (
            <div
              ref={ref}
              className={clsx({
                [styles._container_distinction]: showDistinction,
                [styles._container_distinction_prospecting]:
                  !showSalesDistinction(bobjectData) && showDistinction,
                [styles._container_distinction_sales]: showSalesDistinction(bobjectData),
              })}
            >
              <div className={styles._content}>
                <Header bobject={bobjectData} />
                <Content bobject={bobjectData} />
                {!isOTOAccount && <Footer bobject={bobjectData} />}
                {showDistinction && <SalesLabel isSalesStage={showSalesDistinction(bobjectData)} />}
              </div>
            </div>
          ) : (
            <div ref={ref}>
              <Skeleton variant="rect" height={136} width="100%" />
            </div>
          )}
        </div>
      </Portal>
    )
  );
};

export default BobjectDetailsModal;
