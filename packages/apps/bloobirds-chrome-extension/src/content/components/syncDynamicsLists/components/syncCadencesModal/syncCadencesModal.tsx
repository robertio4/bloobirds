import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useClickAway } from 'react-use';

import {
  CadencePreview,
  CadenceSelector,
  useCadences,
  useCadenceSteps,
} from '@bloobirds-it/cadence';
import {
  Button,
  Callout,
  Checkbox,
  DateTimePicker,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  Skeleton,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { getDynamicsEntityType } from '@bloobirds-it/utils';
import { useRecoilState } from 'recoil';

import { inProgressBulkActionsState } from '../../../bulkActionsToasts/bulkActionsToasts';
import { useExtensionContext } from '../../../context';
import {
  getDynamicsCheckedIds,
  getTotalObjectsInList,
  syncDynamicsList,
} from '../../dynamicsListSelection.utils';
import styles from './syncCadencesModal.module.css';

type CadenceModalStep = 'config' | 'cadence' | 'finish';

const pluralDObjectTypes = {
  lead: 'leads',
  contact: 'contacts',
  account: 'accounts',
  opportunity: 'opportunities',
};

const allowedDobjectTypes = ['account', 'contact', 'lead', 'opportunity'];

const dObjectToBobject = {
  lead: 'Lead',
  contact: 'Lead',
  account: 'Company',
  opportunity: 'Opportunity',
};

type SyncMode = 'syncAndStart' | 'startOnly';
type ReplaceCadence = 'replace' | 'skip';

type SyncCadencesModalProps = {
  onClose?: () => void;
  objectType?: string;
};

function StartCadenceSettings(props: {
  showCadenceSelector: boolean;
  dObjectType: string;
  accountId: any;
  onCadenceSelected: (c) => void;
  ref: React.MutableRefObject<null>;
  userId: any;
  selectedCadence: string;
  onClick: () => void;
  enabledCadences: any;
  date: Date;
  withTimePicker: boolean;
  onChange: (date) => void;
  cadenceName: any;
  objectCount: any;
  syncMode: SyncMode;
  startCadenceText: string;
  setSyncMode: (mode: SyncMode) => void;
  setReplaceCadence: (value: ReplaceCadence) => void;
  replaceCadence: ReplaceCadence;
}) {
  return (
    <div>
      <Text size="m" weight="medium">
        {props.startCadenceText}
      </Text>
      {props.showCadenceSelector && (
        <CadenceSelector
          selectedBobject={{
            id: {
              typeName: dObjectToBobject[props.dObjectType],
              value: '',
              objectId: '',
              accountId: props.accountId,
            },
            fields: [],
            stage: null,
          }}
          onCadenceSelected={props.onCadenceSelected}
          ref={props.ref}
          userId={props.userId}
          className={styles.box}
        />
      )}
      <div className={styles.cadencePreview}>
        <CadencePreview cadenceId={props?.selectedCadence} isChromeExtension={true} />
      </div>
      <div className={styles.cadenceBox}>
        <Select
          value={props.selectedCadence}
          onClick={props.onClick}
          placeholder="Select the cadence"
          className={styles.select}
        >
          {props.enabledCadences?.map(cadence => (
            <Item value={cadence.id} key={cadence.id} className={styles.hidden}>
              {cadence.name}
            </Item>
          ))}
        </Select>
        <div>
          <DateTimePicker
            dataTest="BaseInput-Cadence-DatetimePicker"
            value={props.date}
            placeholder="Start cadence date *"
            withTimePicker={props.withTimePicker}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className={styles.cadenceOptions}>
        <Text size="m" weight="medium">
          Cadence options
        </Text>
        <div className={styles.checkbox}>
          <Checkbox
            size="small"
            onClick={() => {
              props.setReplaceCadence(props.replaceCadence === 'replace' ? 'skip' : 'replace');
            }}
            checked={props.replaceCadence === 'replace'}
          >
            If the {props.dObjectType} is currently enrolled in a cadence, replace it with the new
          </Checkbox>
        </div>
      </div>
      <div className={styles.infoBox}>
        <Callout variant="neutral" icon="info" width="100%">
          <Text size="s">
            You will start the {props.cadenceName} cadence for the {props.objectCount}{' '}
            {pluralDObjectTypes[props.dObjectType]}.
            {props.syncMode === 'syncAndStart' &&
              ` If the ${
                pluralDObjectTypes[props.dObjectType]
              } are not synchronized with Bloobirds, they will be synced before starting the cadence.`}
            {props.syncMode === 'startOnly' &&
              ` If the ${
                pluralDObjectTypes[props.dObjectType]
              } are not synchronized with Bloobirds, they will be skipped.`}
          </Text>
        </Callout>
      </div>
    </div>
  );
}

function ConfigureCadence({ objectType, onClose }: SyncCadencesModalProps) {
  const [syncMode, setSyncMode] = useState<SyncMode>('syncAndStart');
  const [replaceCadence, setReplaceCadence] = useState<ReplaceCadence>('skip');
  const [selectedCadence, setSelectedCadence] = useState(null);
  const [showCadenceSelector, setShowCadenceSelector] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [, setInProgressBulkActions] = useRecoilState(inProgressBulkActionsState);
  const ref = useRef(null);
  useClickAway(ref, () => setShowCadenceSelector(false));
  const { useGetSettings } = useExtensionContext();
  const { t } = useTranslation();

  const searchParams = new URLSearchParams(window.location.search);
  const listId = searchParams.get('viewid');
  const [wholeList, setWholeList] = useState(false);

  const { createToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const settings = useGetSettings();

  const accountId = settings?.account?.id;

  const userId = settings?.user?.id;
  const { cadences } = useCadences({ bobjectTypeName: dObjectToBobject[objectType], accountId });

  const enabledCadences = cadences?.filter((cadenceElement: any) => cadenceElement?.enabled);
  const { steps } = useCadenceSteps(selectedCadence);
  const [isStartCadenceWithDateTime, setIsStartCadenceWithDateTime] = useState(false);

  const isNotAllowedSobjectType = !allowedDobjectTypes?.includes(objectType);

  const handleSelectCadence = cadence => {
    let showDateTime = false;
    steps?.forEach(step => {
      if (step?.dayNumber === 0 && step.actionTypes.includes('AUTOMATED_EMAIL')) {
        showDateTime = step.automationSchedulingMode === 'DELAY';
      }
    });
    setIsStartCadenceWithDateTime(showDateTime);

    setSelectedCadence(cadence.id);
    setShowCadenceSelector(false);
  };

  const { total: listSize, isLoading: isTotalLoading } = getTotalObjectsInList(
    listId,
    objectType,
    wholeList,
  );

  const dynamicsIds = getDynamicsCheckedIds();

  const startCadenceText =
    dynamicsIds?.size > 0 && !wholeList
      ? 'You are about to start a cadence for ' +
        dynamicsIds.size +
        ' ' +
        pluralDObjectTypes[objectType]
      : 'You are about to start a cadence for ' +
        listSize +
        ' ' +
        pluralDObjectTypes[objectType] +
        ' in this list';

  const cadenceName = enabledCadences?.find(cadence => cadence.id === selectedCadence)?.name;
  const objectCount = dynamicsIds?.size > 0 && !wholeList ? dynamicsIds.size : listSize;

  const handleSync = async () => {
    if (!selectedCadence && !selectedDate) {
      createToast({
        message: `Please select a cadence and a date to start the cadence`,
        type: 'error',
      });
      return;
    }
    setLoading(true);

    const response = await syncDynamicsList({
      selectedDate,
      selectedCadence,
      objectType,
      replaceCadence,
      wholeList,
      listId,
      dynamicsIds,
    });

    if (response.status === 200) {
      createToast({ message: `Your ${objectType}s are being synced!`, type: 'success' });
      setInProgressBulkActions(prev => [
        ...prev,
        {
          uniqueNotificationId: response.data.uniqueNotificationId,
          name: t('extension.bulkActionsToast.startingListBulk'),
          status: 'CREATING',
          owner: settings?.user?.id,
        },
      ]);
      onClose();
    } else {
      createToast({
        message: `There was an error syncing your ${objectType}. Please try again later!`,
        type: 'error',
      });
    }
    setLoading(false);
  };

  const Actions = () => {
    if (isTotalLoading) {
      return (
        <>
          <Skeleton variant="text" height={25} width="100%" />
          <Skeleton variant="text" height={66} width="100%" />
        </>
      );
    }

    if (dynamicsIds?.size > 0 || (wholeList && listSize > 0)) {
      return (
        <StartCadenceSettings
          showCadenceSelector={showCadenceSelector}
          dObjectType={objectType}
          accountId={accountId}
          onCadenceSelected={handleSelectCadence}
          ref={ref}
          userId={userId}
          selectedCadence={selectedCadence}
          onClick={() => setShowCadenceSelector(true)}
          enabledCadences={enabledCadences}
          date={selectedDate}
          withTimePicker={isStartCadenceWithDateTime}
          onChange={date => {
            setSelectedDate(date);
          }}
          cadenceName={cadenceName}
          objectCount={objectCount}
          syncMode={syncMode}
          setSyncMode={setSyncMode}
          startCadenceText={startCadenceText}
          setReplaceCadence={setReplaceCadence}
          replaceCadence={replaceCadence}
        />
      );
    }

    if (wholeList && listSize === 0) {
      return (
        <div className={styles.recently_viewed_content}>
          <Text size="m">
            There are no {pluralDObjectTypes[objectType]} in this list. Change the filters and try
            to synchronize a list with objects.
          </Text>
        </div>
      );
    }

    if (dynamicsIds.size === 0 && !wholeList) {
      return (
        <div className={styles.recently_viewed_content}>
          <Text size="m">
            There are no objects selected. Please select at least one object to start a cadence.
          </Text>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <ModalContent>
        <div className={styles.content}>
          {isNotAllowedSobjectType ? (
            <div className={styles.content}>
              <div className={styles.errorMessage}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Text size="m">
                  You are attempting to synchronize objects of the type &lsquo;{objectType}&lsquo;.
                  Unfortunately,
                </Text>
                <Text size="m">
                  we are unable to send these types of objects to Bloobirds via a list. Currently,
                  we only support syncing <b>leads, contacts, accounts, and opportunities</b> from
                  Dynamics lists.
                </Text>
              </div>
            </div>
          ) : (
            <Actions />
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <Button onClick={onClose} variant="clear">
          GO BACK
        </Button>
        <div className={styles.buttons}>
          {/*{!wholeList && (*/}
          {/*  <Button disabled={loading} variant="secondary" onClick={() => setWholeList(true)}>*/}
          {/*    SYNC WHOLE LIST*/}
          {/*  </Button>*/}
          {/*)}*/}
          {((dynamicsIds.size > 0 && !wholeList) || wholeList) && (
            <Button
              disabled={
                loading || (wholeList && listSize === 0) || !selectedCadence || !selectedDate
              }
              onClick={handleSync}
            >
              {loading ? <Spinner color="white" name="loadingCircle" /> : 'Start cadences'}
            </Button>
          )}
        </div>
      </ModalFooter>
    </>
  );
}

export function SyncCadencesModal({ onClose }: SyncCadencesModalProps) {
  const [step] = useState<CadenceModalStep>('config');
  const { useGetCurrentPage } = useExtensionContext();
  const currentPage = useGetCurrentPage();

  const objectType = getDynamicsEntityType(currentPage);
  return (
    <Modal open onClose={onClose} width={800}>
      <ModalHeader size="small">
        <ModalTitle variant="primary" size="small" icon="bloobirds">
          Start a cadence for {pluralDObjectTypes[objectType]}
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      {step === 'config' && <ConfigureCadence objectType={objectType} onClose={onClose} />}
    </Modal>
  );
}
