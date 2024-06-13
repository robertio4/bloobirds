import { useEffect, useRef, useState } from 'react';
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
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { api } from '@bloobirds-it/utils';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

import { getSalesforceSobjectFromPage } from '../../../../../utils/url';
import { inProgressBulkActionsState } from '../../../bulkActionsToasts/bulkActionsToasts';
import { useExtensionContext } from '../../../context';
import { relatedCompanySobjects, relatedLeadsSobjects } from '../syncListModal/syncListModal';
import styles from './syncCadencesModal.module.css';

type CadenceModalStep = 'config' | 'cadence' | 'finish';

const pluralSobjectTypes = {
  Lead: 'leads',
  Contact: 'contacts',
  Account: 'accounts',
  Opportunity: 'opportunities',
};

const allowedSobjectTypes = ['Lead', 'Contact', 'Account', 'Opportunity'];

const sobjectToBobject = {
  Lead: 'Lead',
  Contact: 'Lead',
  Account: 'Company',
  Opportunity: 'Opportunity',
};

type SyncMode = 'syncAndStart' | 'startOnly';
type ReplaceCadence = 'replace' | 'skip';

type SyncCadencesModalProps = {
  onClose?: () => void;
  sobjectType?: string;
  salesforceIds: string[];
  isRecentList?: boolean;
};

function StartCadenceSettings(props: {
  showCadenceSelector: boolean;
  sobjectType: string;
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
  onCreateAccountsClick: (c) => void;
  onCreateLeadsClick: (c) => void;
  shouldCreateAccounts: boolean;
  shouldCreateLeads: boolean;
  relatedCompanyAllowed: boolean;
  relatedLeadsAllowed: boolean;
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
              typeName: sobjectToBobject[props.sobjectType],
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
            onClick={() =>
              props.setSyncMode(props.syncMode === 'syncAndStart' ? 'startOnly' : 'syncAndStart')
            }
            checked={props.syncMode === 'syncAndStart'}
          >
            If the {props.sobjectType} is not currently synced, sync it before starting the cadence
          </Checkbox>
        </div>
        {props.relatedCompanyAllowed && (
          <div className={styles.checkbox}>
            <Checkbox
              size="small"
              onClick={props.onCreateAccountsClick}
              checked={props.shouldCreateAccounts}
            >
              Create companies when syncing {props.sobjectType} without an existing one
            </Checkbox>
          </div>
        )}
        {props.relatedLeadsAllowed && (
          <div className={styles.checkbox}>
            <Checkbox
              size="small"
              onClick={props.onCreateLeadsClick}
              checked={props.shouldCreateLeads}
            >
              Create leads when syncing {props.sobjectType} without an existing one
            </Checkbox>
          </div>
        )}
        <div className={styles.checkbox}>
          <Checkbox
            size="small"
            onClick={() =>
              props.setReplaceCadence(props.replaceCadence === 'replace' ? 'skip' : 'replace')
            }
            checked={props.replaceCadence === 'replace'}
          >
            If the {props.sobjectType} is currently enrolled in a cadence, replace it with the new
          </Checkbox>
        </div>
      </div>
      <div className={styles.infoBox}>
        <Callout variant="neutral" icon="info" width="100%">
          <Text size="s">
            You will start the {props.cadenceName} cadence for the {props.objectCount}{' '}
            {pluralSobjectTypes[props.sobjectType]}.
            {props.syncMode === 'syncAndStart' &&
              ` If the ${
                pluralSobjectTypes[props.sobjectType]
              } are not synchronized with Bloobirds, they will be synced before starting the cadence.`}
            {props.syncMode === 'startOnly' &&
              ` If the ${
                pluralSobjectTypes[props.sobjectType]
              } are not synchronized with Bloobirds, they will be skipped.`}
          </Text>
        </Callout>
      </div>
    </div>
  );
}

function ConfigureCadence({
  sobjectType,
  salesforceIds,
  isRecentList,
  onClose,
}: SyncCadencesModalProps) {
  const [syncMode, setSyncMode] = useState<SyncMode>('syncAndStart');
  const [replaceCadence, setReplaceCadence] = useState<ReplaceCadence>('skip');
  const [selectedCadence, setSelectedCadence] = useState(null);
  const [showCadenceSelector, setShowCadenceSelector] = useState<boolean>(false);
  const [createCompany, setCreateCompany] = useState(true);
  const [createLead, setCreateLead] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [, setInProgressBulkActions] = useRecoilState(inProgressBulkActionsState);
  const ref = useRef(null);
  useClickAway(ref, () => setShowCadenceSelector(false));
  const { useGetSettings } = useExtensionContext();
  const { t } = useTranslation();

  const searchParams = new URLSearchParams(window.location.search);
  const listId = searchParams.get('filterName');
  const [wholeList, setWholeList] = useState(false);

  const { createToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const settings = useGetSettings();

  const accountId = settings?.account?.id;

  const userId = settings?.user?.id;
  const { cadences } = useCadences({ bobjectTypeName: sobjectToBobject[sobjectType], accountId });

  const enabledCadences = cadences?.filter((cadenceElement: any) => cadenceElement?.enabled);
  const { steps } = useCadenceSteps(selectedCadence);
  const [isStartCadenceWithDateTime, setIsStartCadenceWithDateTime] = useState(false);

  const isNotAllowedSobjectType = !allowedSobjectTypes?.includes(sobjectType);
  const relatedCompanyAllowed = relatedCompanySobjects?.includes(sobjectType);
  const relatedLeadAllowed = relatedLeadsSobjects?.includes(sobjectType);

  useEffect(() => {
    let showDateTime = false;
    steps?.forEach(step => {
      if (step?.dayNumber === 0 && step.actionTypes.includes('AUTOMATED_EMAIL')) {
        showDateTime = step.automationSchedulingMode === 'DELAY';
      }
    });
    setIsStartCadenceWithDateTime(showDateTime);
  }, [steps, selectedCadence]);

  const { data } = useSWR(
    wholeList && listId && listId !== 'Recent' && 'sync-sfdc-list-' + listId,
    () => api.get(`/utils/service/salesforce/total/${sobjectType}/${listId}`),
  );
  const listSize = data?.data?.listSize || 0;

  const startCadenceText =
    salesforceIds?.length > 0 && !wholeList
      ? 'You are about to start a cadence for ' +
        salesforceIds.length +
        ' ' +
        pluralSobjectTypes[sobjectType]
      : 'You are about to start a cadence for ' +
        listSize +
        ' ' +
        pluralSobjectTypes[sobjectType] +
        ' in this list';

  const cadenceName = enabledCadences?.find(cadence => cadence.id === selectedCadence)?.name;
  const objectCount = salesforceIds?.length > 0 && !wholeList ? salesforceIds.length : listSize;

  const handleSync = async () => {
    if (!selectedCadence && !selectedDate) {
      createToast({
        message: `Please select a cadence and a date to start the cadence`,
        type: 'error',
      });
      return;
    }
    setLoading(true);
    const body = {
      syncNewObjects: syncMode === 'syncAndStart',
      startCadenceDate: selectedDate,
      cadenceId: selectedCadence,
      createRelatedCompany: relatedCompanyAllowed && createCompany,
      createRelatedLead: relatedLeadAllowed && createLead,
      skipEnrollIfObjectIsAlreadyOnCadence: replaceCadence === 'skip',
    };
    const syncSelection = salesforceIds?.length > 0 && !wholeList;
    if (syncSelection) {
      body['salesforceIds'] = salesforceIds;
    }
    const response = await api.post(
      syncSelection
        ? `/utils/service/salesforce/sync/sobjects/${sobjectType}`
        : `/utils/service/salesforce/sync/list/${sobjectType}/${listId}`,
      body,
    );
    if (response.status === 200) {
      createToast({ message: `Your ${sobjectType}s are being synced!`, type: 'success' });
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
        message: `There was an error syncing your ${sobjectType}. Please try again later!`,
        type: 'error',
      });
    }
    setLoading(false);
  };

  const Actions = () => {
    if (salesforceIds?.length > 0 || (wholeList && listSize > 0 && !isRecentList)) {
      return (
        <StartCadenceSettings
          showCadenceSelector={showCadenceSelector}
          sobjectType={sobjectType}
          accountId={accountId}
          onCadenceSelected={c => {
            setSelectedCadence(c.id);
            setShowCadenceSelector(false);
          }}
          onCreateAccountsClick={c => {
            setCreateCompany(c);
          }}
          onCreateLeadsClick={c => {
            setCreateLead(c);
          }}
          shouldCreateAccounts={createCompany}
          shouldCreateLeads={createLead}
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
          relatedCompanyAllowed={relatedCompanyAllowed}
          relatedLeadsAllowed={relatedLeadAllowed}
          setReplaceCadence={setReplaceCadence}
          replaceCadence={replaceCadence}
        />
      );
    }

    if (wholeList && listSize === 0 && !isRecentList) {
      return (
        <div className={styles.recently_viewed_content}>
          <Text size="m">
            There are no {pluralSobjectTypes[sobjectType]} in this list. Change the filters and try
            to synchronize a list with objects.
          </Text>
        </div>
      );
    }

    if (salesforceIds.length === 0 && !(wholeList || isRecentList)) {
      return (
        <div className={styles.recently_viewed_content}>
          <Text size="m">
            There are no objects selected, do you want to synchronize all the objects of the list
            (this will use all the items of the list and not only the ones that are visible on the
            page)
          </Text>
        </div>
      );
    }

    if (salesforceIds.length === 0 && isRecentList) {
      return (
        <div className={styles.recently_viewed_content}>
          <Text size="m">
            You are attempting to start a cadence in objects from a recently viewed list.
          </Text>
          <Text size="m">
            Unfortunately, we are unable to start a cadence on the whole list unless you select some
            items from it. Try to select some items first or change the list.
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
                  You are attempting to synchronize objects of the type &lsquo;{sobjectType}&lsquo;.
                  Unfortunately,
                </Text>
                <Text size="m">
                  we are unable to send these types of objects to Bloobirds via a list. Currently,
                  we only support syncing <b>leads, contacts, accounts, and opportunities</b> from
                  Salesforce lists.
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
          {!wholeList && !isRecentList && (
            <Button disabled={loading} variant="secondary" onClick={() => setWholeList(true)}>
              SYNC WHOLE LIST
            </Button>
          )}
          {((salesforceIds.length > 0 && !wholeList) || wholeList) && (
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

export function SyncCadencesModal({
  onClose,
  salesforceIds,
  isRecentList,
}: SyncCadencesModalProps) {
  const [step] = useState<CadenceModalStep>('config');
  const { useGetCurrentPage } = useExtensionContext();
  const currentPage = useGetCurrentPage();

  const sobjectType = getSalesforceSobjectFromPage(currentPage);
  return (
    <Modal open onClose={onClose} width={800}>
      <ModalHeader size="small">
        <ModalTitle variant="primary" size="small" icon="bloobirds">
          Start a cadence for {pluralSobjectTypes[sobjectType]}
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      {step === 'config' && (
        <ConfigureCadence
          sobjectType={sobjectType}
          salesforceIds={salesforceIds}
          isRecentList={isRecentList}
          onClose={onClose}
        />
      )}
    </Modal>
  );
}
