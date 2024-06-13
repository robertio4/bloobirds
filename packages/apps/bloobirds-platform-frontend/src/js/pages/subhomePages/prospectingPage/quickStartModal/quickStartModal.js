import React, { useState } from 'react';

import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { PluralBobjectTypes, UserHelperKeys, BOBJECT_TYPES } from '@bloobirds-it/types';
import { capitalize } from 'lodash';

import { STEPS } from '../../../../components/cadenceControlModal/cadenceControlModal.machine';
import { useCadenceControl, useEntity } from '../../../../hooks';
import { useCadences } from '../../../../hooks/useCadences';
import { useQuickStart } from '../../../../hooks/useQuickStart';
import { useQuickStartEnabled } from '../../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import { api } from '../../../../utils/api';
import { isCompany, isLead } from '../../../../utils/bobjects.utils';
import styles from './quickStartModal.module.css';

const putStartCadence = ({ bobjectId, bobjectType, startCadence, cadenceId }) => {
  return api.put(`/messaging/cadences/${cadenceId}/start`, {
    bobjectId,
    bobjectType,
    startCadence,
  });
};

const putBulkCadence = ({ startCadence, cadenceId, bobjects }) => {
  const bobjectIds = bobjects.map(bobject => bobject?.id.objectId);
  const body = {
    importName: 'Start cadence of ' + bobjects.length,
    actionType: 'START_CADENCE',
    bobjectType: bobjects[0]?.id?.typeName,
    bobjectIds,
    cadenceId: cadenceId,
    startCadenceDate: startCadence,
  };
  return api.put(`/bobjects/bulkAction/createBulk`, body);
};

const QuickStartModal = ({ onSaved = () => {} }) => {
  const {
    data = [],
    bobjectCadenceId,
    closeQuickStart,
    bobjectBusinessAsset,
    bobjectName,
    defaultCadence,
    enrollableBobjects,
    excludedBobjects,
    groupedByBusinessAssetBobjects,
    bobjectsWithBusinessAsset,
    bobjectType,
  } = useQuickStart();
  const { save } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cadences } = useCadences(bobjectType);
  const targetMarkets = useEntity('targetMarkets');
  const buyerPersonas = useEntity('idealCustomerProfiles');
  const { openCadenceControl } = useCadenceControl();
  const isBulkAction = Array.isArray(data);
  const totalCompanies = data?.length;
  const pluralBobjectType = PluralBobjectTypes[bobjectType].toLowerCase();
  const bobjectCadence = cadences?.find(cadence => cadence.id === bobjectCadenceId);
  const canStartCadence = isBulkAction || !!defaultCadence || !!bobjectCadence;

  const updateIndividualCadence = () => {
    putStartCadence({
      bobjectId: data?.id.objectId,
      bobjectType,
      startCadence: new Date(),
      cadenceId: defaultCadence?.id,
    });
    onSaved();
    if (hasQSGEnabled) save(UserHelperKeys.LAUNCH_YOUR_FIRST_CADENCE);
    closeQuickStart();
  };

  function handleSubmit() {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      startDefaultCadence();
    }, 2500);
  }

  const updateBulkCadences = () => {
    if (!data) {
      throw new Error('The companies to start are required');
    }

    putBulkCadence({
      startCadence: new Date(),
      bobjects: enrollableBobjects,
      cadenceId: defaultCadence?.id,
    });
    onSaved();
    closeQuickStart();
  };

  const startDefaultCadence = () => {
    if (isBulkAction) {
      updateBulkCadences();
    } else {
      updateIndividualCadence();
    }
  };

  const generateMessage = () => {
    if (bobjectCadence) {
      return (
        <Text size="m">
          This action enrolls <b>{bobjectName}</b> in its cadence <b>{bobjectCadence?.name}</b> to
          start today. <b>Do you want to continue?</b>
        </Text>
      );
    }

    if (defaultCadence) {
      return (
        <Text size="m">
          This action enrolls <b>{bobjectName}</b> in its default cadence{' '}
          <b>{defaultCadence?.name}</b> to start today. <b>Do you want to continue?</b>
        </Text>
      );
    }

    if (bobjectBusinessAsset && bobjectCadence) {
      return (
        <>
          <Text size="m">
            This action enrolls <b>{bobjectName}</b> in its {bobjectBusinessAsset} cadence{' '}
            {bobjectCadence} to start today. <b>Do you want to continue?</b>
          </Text>
          {bobjectType === capitalize(BOBJECT_TYPES.LEAD) && (
            <div className={styles._message}>
              <Text size="m" color="peanut" inline>
                <span role="img" aria-label="backhand">
                  👉{' '}
                </span>
                <b>The lead and its company</b> (if any) wil change to status <b>on prospection</b>.
              </Text>
            </div>
          )}
        </>
      );
    }

    return (
      <Text size="m">
        This action cannot be completed{' '}
        <span role="img" aria-label="Upps">
          😖
        </span>
        , <b>{bobjectName}</b> does not have a default cadence.{' '}
        <b>Do you want to set other cadence to continue?</b>
      </Text>
    );
  };

  return (
    <Modal open onClose={closeQuickStart} width={640}>
      <ModalHeader>
        <ModalTitle>Confirm Quick start</ModalTitle>
        <ModalCloseIcon onClick={closeQuickStart} />
      </ModalHeader>
      <ModalContent>
        <div className={styles._message_wrapper}>
          {isBulkAction && (
            <>
              {enrollableBobjects?.length !== 0 && (
                <Text size="m">
                  This action enrolls{' '}
                  <b>
                    {enrollableBobjects?.length}{' '}
                    {enrollableBobjects?.length < 2 ? `${bobjectType}` : `${pluralBobjectType}`}
                  </b>{' '}
                  in a cadence:
                </Text>
              )}
              <div className={styles._text_wrapper}>
                {Object.keys(groupedByBusinessAssetBobjects)?.length > 0 &&
                  Object.keys(groupedByBusinessAssetBobjects)?.map(group => {
                    let businessAsset = {};
                    let businessAssetCadence = '';
                    let cadence = {};
                    let businessAssetName = '';
                    if (isCompany(data[0])) {
                      businessAssetName = 'Target Market';
                      businessAsset = targetMarkets?.get(group);
                      businessAssetCadence = businessAsset?.cadence;
                      cadence = cadences?.find(
                        cadenceElement => cadenceElement?.id === businessAssetCadence,
                      )?.name;
                    } else if (isLead(data[0])) {
                      businessAssetName = 'Buyer Persona';
                      businessAsset = buyerPersonas?.get(group);
                      businessAssetCadence = businessAsset?.cadence;
                      cadence = cadences?.find(
                        cadenceElement => cadenceElement?.id === businessAssetCadence,
                      )?.name;
                    }
                    // Add else in case you need opp cadences
                    return (
                      <li className={styles._text_wrapper__small} key={group}>
                        <Text size="s" color="peanut" inline>
                          <b>
                            {groupedByBusinessAssetBobjects[group]?.length}
                            {groupedByBusinessAssetBobjects[group]?.length < 2
                              ? ` ${bobjectType.toLowerCase()}`
                              : ` ${pluralBobjectType}`}
                          </b>{' '}
                          in &quot;{cadence}&quot;
                        </Text>
                        <Text size="s" color="softPeanut">
                          defined by the {businessAsset?.name} {businessAssetName}
                        </Text>
                      </li>
                    );
                  })}
              </div>
              {(excludedBobjects !== 0 ||
                totalCompanies - bobjectsWithBusinessAsset?.length !== 0) && (
                <>
                  {defaultCadence ? (
                    <li className={styles._text_wrapper__small}>
                      <Text size="s" color="peanut" inline>
                        <b>
                          {totalCompanies - bobjectsWithBusinessAsset?.length}{' '}
                          {totalCompanies - bobjectsWithBusinessAsset?.length < 2
                            ? ` ${bobjectType.toLowerCase()}`
                            : ` ${pluralBobjectType}`}
                        </b>{' '}
                        in &quot;{defaultCadence?.name}&quot;
                      </Text>
                      <Text size="s" color="softPeanut">
                        defined by the default account cadence
                      </Text>
                    </li>
                  ) : (
                    <div className={styles._text_wrapper}>
                      <Text size="s" color="peanut" inline>
                        <span role="img" aria-label="warning">
                          ⚠️{' '}
                        </span>
                        <b>
                          {excludedBobjects}
                          {excludedBobjects < 2 ? ` ${bobjectType}` : ` ${pluralBobjectType}`}
                        </b>{' '}
                        will be <b>excluded </b>because they don&apos;t have default cadence.
                      </Text>
                    </div>
                  )}
                </>
              )}
              {bobjectType === capitalize(BOBJECT_TYPES.LEAD) && (
                <div className={styles._section}>
                  <Text size="m" htmlTag="span" color="peanut" inline>
                    <span role="img" aria-label="backhand">
                      👉{' '}
                    </span>
                    If they come from previous status New, Backlog and Delivered, both the{' '}
                    <b>lead and its company</b> (if available) will change to status{' '}
                    <b>on prospection</b>.
                  </Text>
                </div>
              )}
              <div className={styles._message}>
                <Text size="m" weight="bold" inline>
                  Do you want to continue?
                </Text>
              </div>
            </>
          )}
          {!isBulkAction && generateMessage()}
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" color="tomato" onClick={closeQuickStart}>
          Cancel
        </Button>
        <div className={styles._button_wrapper}>
          {!isBulkAction && (
            <Button
              variant="secondary"
              onClick={() => {
                closeQuickStart();
                openCadenceControl({
                  bobjectToSet: data,
                  previousStep: false,
                  step: STEPS.CONFIGURE_CADENCE,
                });
              }}
            >
              Set other cadence
            </Button>
          )}
          {canStartCadence && (
            <Button onClick={handleSubmit}>
              {isSubmitting ? <Spinner name="loadingCircle" size={16} color="white" /> : 'Continue'}
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default QuickStartModal;
