import React, { useCallback, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';

import { Button, Icon, IconButton, Portal, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useBobject, useLazyRef } from '@bloobirds-it/hooks';
import { useEventSubscription } from '@bloobirds-it/plover';
import {
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  serialize,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  DIRECTION_VALUES_LOGIC_ROLE,
  MainBobjectTypes,
  MessagesEvents,
  PluralBobjectTypes,
  StrDict,
} from '@bloobirds-it/types';
import {
  api,
  getFieldByLogicRole,
  getValueFromLogicRole,
  isSalesforcePage,
  normalizeUrl,
  isElementLoaded,
} from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import * as Sentry from '@sentry/react';
import { Call, Device } from '@twilio/voice-sdk';
import { resetEditorChildren } from '@udecode/plate';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { v4 as uuid } from 'uuid';

import { AircallDialer } from './aircallDialer/hooks/useAirCallDialerVisibility';
import { AstrolineDialerFrame } from './astrolineDialer/astrolineDialerFrame/astrolineDialerFrame';
import { DeviceHandler } from './deviceHandler';
import { Dial } from './dial';
import { DialPad } from './dialPad';
import styles from './dialer.module.css';
import { DialerConnectionHint } from './dialerConnectionHint';
import { DialerUserPhoneSelector } from './dialerUserPhoneSelector';
import { DialerExtendedScreen } from './extendedScreen/dialerExtendedScreen';
import { useDialerPosition } from './hooks/useDialerPosition';
import { LogCallButton } from './logCallButton';
import { NumintecDialer } from './numintecDialer/hooks/useNumintecDialer';
import { RingHangupButton } from './ringHangupButton';
import { RingoverDialer } from './ringoverDialer/hooks/useRingoverDialerVisibility';
import { fillReferenceFields, getMainBobjectId } from './utils';

export enum DialerTab {
  dialer,
  manual,
}

export enum DialerStatus {
  authorizing,
  registering,
  idle,
  connected,
  callEnded,
  incoming,
}

export enum DialerOpenStatus {
  open = 'OPEN',
  closed = 'CLOSED',
  minimized = 'MINIMIZED',
}

export type BobjectOfPhone = {
  bobject?: Bobject<MainBobjectTypes>;
  companyId?: string;
  id?: string;
  name?: string;
  type?: string;
  hasMatched: boolean;
  relatedBobject?: StrDict;
};

export type State = {
  id: string;
  open: DialerOpenStatus;
  tab: DialerTab;
  dialedPhoneNumber: string;
  bobjectMatch: BobjectOfPhone;
  selectedPhoneNumber: string;
  device: Device | null;
  status: DialerStatus;
  call: Call | null;
  callStatus: Call.State | null;
  errors: any[];
  warnings: any[];
  callDirection: 'outbound' | 'inbound';
  activity: any;
  notePanelOpen: boolean;
  note: any;
  showingExtendedScreen: boolean;
  extendedScreenType: 'notes' | 'pitches';
  autoOpenPitchesInDialer: boolean;
  bobjectId: string;
  incomingAccepted: boolean;
};

export type Store = {
  setState: (key: string, value: any) => any;
  snapshot: () => State;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  setSelectedTab: (tab: DialerTab) => void;
  setMatchedBobject: (bobject: BobjectOfPhone) => void;
  setDialedPhoneNumber: (phoneNumber: string, bobjectId?: string) => void;
  startCall: (call: Call) => void;
  hangCall: () => void;
  emit: () => void;
  subscribe: (callback: () => void) => () => void;
  setActivity: (activityId: string, forceSetActivity?: boolean) => void;
  setActivityExternal: (activity: any) => void;
  setActivityLogCall: (activityLogCallId: string) => void;
  finishCall: () => void;
  toggleExtendedScreen: (extendedScreenType: 'notes' | 'pitches') => void;
  closeExtendedScreen: () => void;
  setAutoOpenPitchesInDialer: (autoOpenPitchesInDialer: boolean) => void;
};

const DialerStore = React.createContext<Store>(undefined);

export const useDialerStore = () => React.useContext(DialerStore);

export const useDialerLauncher = () => {
  function openDialer(phoneNumber?: string, bobjectId?: string) {
    const openDialerEvent = new CustomEvent('openDialer', {
      detail: {
        phoneNumber,
        bobjectId,
      },
    });
    window.dispatchEvent(openDialerEvent);
  }
  return { openDialer };
};

export function useDialer<T = any>(selector: (state: State) => T) {
  const store = useDialerStore();
  const cb = () => selector(store.snapshot());
  return useSyncExternalStore(store.subscribe, cb, cb);
}

export const Dialer = () => {
  const listeners = useLazyRef<Set<() => void>>(() => new Set());
  const { settings } = useActiveUserSettings();

  const dialerDefaultView = settings?.user?.dialerDefaultView;
  const autoOpenPitchesInDialer = settings?.user?.autoOpenPitchesInDialer;

  const state = useLazyRef<State>(() => ({
    id: uuid(),
    open: DialerOpenStatus.closed,
    tab: dialerDefaultView === 'logCall' ? DialerTab.manual : DialerTab.dialer,
    dialedPhoneNumber: '',
    bobjectMatch: null,
    selectedPhoneNumber: null,
    device: null,
    status: DialerStatus.authorizing,
    call: null,
    callStatus: null,
    errors: [],
    warnings: [],
    callDirection: 'outbound',
    activity: null,
    notePanelOpen: false,
    note: null,
    showingExtendedScreen: autoOpenPitchesInDialer,
    extendedScreenType: autoOpenPitchesInDialer ? 'pitches' : null,
    autoOpenPitchesInDialer,
    bobjectId: null,
    incomingAccepted: false,
  }));

  const store = React.useMemo<Store>(() => {
    return {
      setState: (key, value) => {
        state.current[key] = value;
        store.emit();
      },
      snapshot: () => state.current,
      minimize: () => store.setState('open', DialerOpenStatus.minimized),
      maximize: () => store.setState('open', DialerOpenStatus.open),
      close: () => {
        const { extendedScreenType } = store.snapshot();
        if (extendedScreenType === 'notes') {
          state.current['showingExtendedScreen'] = false;
        }
        state.current['bobjectMatch'] = null;
        state.current['open'] = DialerOpenStatus.closed;
        state.current['showingPitches'] = state.current['autoOpenPitchesInDialer'];
        state.current['bobjectId'] = null;
        state.current['activity'] = null;
        state.current['incomingAccepted'] = false;
        store.emit();
      },
      setSelectedTab: tab => store.setState('tab', tab),
      setDialedPhoneNumber: (phoneNumber, bobjectId = null) => {
        store.setState('dialedPhoneNumber', phoneNumber);
        store.setState('bobjectId', bobjectId);
        store.setState('bobjectMatch', { hasMatched: undefined });
      },
      startCall: async (newCall: any) => {
        function finishCall() {
          state.current['status'] = DialerStatus.callEnded;
          state.current['call'] = null;
          state.current['callStatus'] = null;
          store.emit();
          setTimeout(() => {
            state.current['status'] = DialerStatus.idle;
            state.current['note'] = null;
            state.current['notePanelOpen'] = false;
            state.current['activity'] = null;
            state.current['dialedPhoneNumber'] = '';
            state.current['bobjectId'] = null;
            state.current['incomingAccepted'] = false;
            store.emit();
          }, 3000);
        }

        newCall.on('sample', () => {
          store.setState('callStatus', newCall.status());
        });

        newCall.on('disconnect', finishCall);
        newCall.on('cancel', finishCall);

        newCall.on('error', error => {
          console.error("There's been an error with the call", error);
          store.setState('errors', [...state.current.errors, error]);
        });

        newCall.on('warning', warning => {
          store.setState('warnings', [...state.current.warnings, warning]);
        });

        store.setState('call', newCall);
        store.setState('callStatus', newCall.status());
      },
      setMatchedBobject: async bobject => {
        let additionalInfo: StrDict = {};
        if (bobject) {
          if (bobject.companyId) {
            try {
              const { data: relatedCompany }: { data: Bobject } = await api.get(
                `/bobjects/${bobject.companyId}/form`,
              );
              additionalInfo = relatedCompany?.raw?.contents;
            } catch (e) {
              Sentry.captureException(e, {
                tags: {
                  module: 'dialer',
                },
                extra: {
                  origin: 'Get related company',
                  bobject,
                  companyUrl: `/bobjects/${bobject.companyId}/form`,
                },
              });
            }
          }
          store.setState('bobjectMatch', {
            ...bobject,
            ...(additionalInfo && Object.keys(additionalInfo).length === 0
              ? { relatedBobject: additionalInfo }
              : {}),
          });
        }
      },
      hangCall: () => {
        const { call } = store.snapshot();
        if (call) {
          call.disconnect();
        }
        state.current['status'] = DialerStatus.callEnded;
        state.current['call'] = null;
        state.current['callStatus'] = null;
        store.emit();
        setTimeout(() => {
          state.current['status'] = DialerStatus.idle;
          state.current['note'] = null;
          state.current['notePanelOpen'] = false;
          state.current['activity'] = null;
          state.current['dialedPhoneNumber'] = '';
          state.current['incomingAccepted'] = false;
          store.emit();
        }, 3000);
      },
      emit: () => listeners.current.forEach(listener => listener()),
      subscribe: callback => {
        listeners.current.add(callback);
        return () => listeners.current.delete(callback);
      },
      setActivity: async (activityId: string, forceSetActivity = false) => {
        if (activityId) {
          // Get the activity
          const activity = await api.get(`/bobjects/${activityId}/form?injectReferences=true`);
          const activityWithReferences = fillReferenceFields(activity?.data);
          const activityPhoneNumber = getValueFromLogicRole(
            activityWithReferences,
            ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER,
          );
          if (forceSetActivity || activityPhoneNumber === store.snapshot().dialedPhoneNumber) {
            store.setState('activity', activityWithReferences);
          }
        }
      },
      setActivityExternal: async (activity: any) => {
        store.setState('activity', activity);
      },
      setActivityLogCall: async (activityId: string) => {
        if (activityId) {
          const activity = await api.get(`/bobjects/${activityId}/form?injectReferences=true`);
          const activityWithReferences = fillReferenceFields(activity?.data);
          store.setState('activity', activityWithReferences);
          store.setState('status', DialerStatus.callEnded);
          setTimeout(() => {
            store.setState('status', DialerStatus.idle);
          }, 3000);
        }
      },
      finishCall: () => {
        state.current['status'] = DialerStatus.idle;
        state.current['note'] = null;
        state.current['notePanelOpen'] = false;
        state.current['activity'] = null;
        state.current['dialedPhoneNumber'] = '';
        state.current['showingPitches'] = false;
        state.current['bobjectId'] = null;
        state.current['incomingAccepted'] = false;
        store.emit();
      },
      toggleExtendedScreen: extendedScreenType => {
        const newState =
          extendedScreenType !== state.current['extendedScreenType'] ||
          !state.current['showingExtendedScreen'];
        store.setState('showingExtendedScreen', newState);
        store.setState('extendedScreenType', extendedScreenType);
      },
      closeExtendedScreen: () => {
        if (state.current['extendedScreenType'] === 'notes') {
          store.setState('showingExtendedScreen', false);
          store.setState('extendedScreenType', null);
        }
      },
      setAutoOpenPitchesInDialer: autoOpenPitchesInDialer => {
        store.setState('autoOpenPitchesInDialer', autoOpenPitchesInDialer);
      },
    };
  }, []);

  window.addEventListener('openDialer', (e: CustomEvent) => {
    const {
      user: { dialerType },
    } = settings;

    if (
      dialerType === 'NUMINTEC_DIALER' &&
      e.detail?.phoneNumber &&
      !store.snapshot().dialedPhoneNumber
    ) {
      api.post(`/calls/numintec/sync/call/${e.detail?.phoneNumber}`, {});
    }
    store.setState('dialedPhoneNumber', e.detail?.phoneNumber);
    store.setState('open', DialerOpenStatus.open);
    store.setState('bobjectId', e.detail?.bobjectId);
  });

  // Event listener to know if the user logged out
  // And listener to minimize dialer from everywhere
  useEffect(() => {
    const closeDialer = () => {
      store.close();
    };
    window.addEventListener(MessagesEvents.UserLoggedOut, closeDialer);
    window.addEventListener(MessagesEvents.MinimizeDialer, () => store.minimize());

    return () => {
      window.removeEventListener(MessagesEvents.UserLoggedOut, closeDialer);
      window.removeEventListener(MessagesEvents.MinimizeDialer, () => store.minimize());
    };
  }, []);

  return (
    <Portal>
      <DialerStore.Provider value={store}>
        <ActivityHandler />
        {/* <WebsocketHandler /> */}
        <FloatingBox />
      </DialerStore.Provider>
    </Portal>
  );
};

const ActivityHandler = () => {
  const { snapshot, setActivity } = useDialerStore();
  const { settings } = useActiveUserSettings();

  useEventSubscription(
    'twilio-response',
    (message: { activityId: string }) => {
      if (!snapshot().activity) {
        setActivity(`${settings?.account.id}/Activity/${message?.activityId}`);
      }
    },
    { createSubscription: Boolean(settings?.account) },
  );

  return null;
};

const FloatingBox = () => {
  const open = useDialer(state => state.open);
  const { position, bounds, setPosition } = useDialerPosition(open === DialerOpenStatus.open);
  const { settings } = useActiveUserSettings();
  const {
    user: { dialerType },
  } = settings;
  const classes = clsx(styles.content, {
    [styles.contentAircall]: dialerType === 'AIRCALL_DIALER',
  });

  useEffect(() => {
    if (dialerType === 'AIRCALL_DIALER') {
      const selector = 'iframe[src*="cti.aircall.io"]';
      isElementLoaded(selector).then(() => {
        if (isSalesforcePage(normalizeUrl(window.location.href))) {
          const possibleCti = document.querySelector(selector);
          if (possibleCti) {
            possibleCti.remove();
          }
        }
      });
    }
  }, []);

  return (
    <div
      className={styles.container}
      style={{ display: open !== DialerOpenStatus.closed ? 'inherit' : 'none' }}
    >
      <div style={{ display: open === DialerOpenStatus.open ? 'inherit' : 'none' }}>
        <Draggable
          handle="#dialer-drag-box"
          position={position}
          bounds={bounds}
          onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
        >
          <div className={classes}>
            <DialerContent />
            <DialerExtendedScreen position={position} />
          </div>
        </Draggable>
      </div>
      {open !== DialerOpenStatus.open && <DialerDragBox />}
    </div>
  );
};

const DialerDragBox = () => {
  const { maximize, close } = useDialerStore();
  return (
    <div
      className={styles.floatingBox}
      onClick={e => {
        maximize();
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div
        className={styles.closeButton}
        onClick={e => {
          close();
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Icon name="cross" size={16} color="white" />
      </div>
      <Icon name="phone" color="white" size={40} />
    </div>
  );
};

const DialerContent = () => {
  const tab = useDialer(state => state.tab);
  const status = useDialer(state => state.status);
  const isNotePanelOpen = useDialer(state => state.notePanelOpen);
  const { setState } = useDialerStore();
  const { settings } = useActiveUserSettings();
  const {
    user: { dialerType },
  } = settings;

  if (tab === DialerTab.manual && !isNotePanelOpen) {
    setState('notePanelOpen', true);
  }
  const classes = clsx(styles.contentBox, {
    [styles.contentBoxBloobirds]: dialerType !== 'ASTROLINE_DIALER',
    [styles.contentBoxOthers]: dialerType === 'ASTROLINE_DIALER',
    [styles.contentBoxAircall]: dialerType === 'AIRCALL_DIALER',
    [styles.contentBoxNumintec]: dialerType === 'NUMINTEC_DIALER',
    [styles.contentBoxRingover]: dialerType === 'RINGOVER_DIALER',
  });

  return (
    <div className={classes}>
      <DialerHeader
        showTabs={dialerType === 'BLOOBIRDS_DIALER' || !dialerType}
        showNoteButton={
          dialerType === 'AIRCALL_DIALER' ||
          dialerType === 'NUMINTEC_DIALER' ||
          dialerType === 'RINGOVER_DIALER'
        }
      />
      {dialerType === 'ASTROLINE_DIALER' ? (
        <AstrolineDialerFrame launchCCF={true} />
      ) : dialerType === 'AIRCALL_DIALER' ? (
        <AircallDialer />
      ) : dialerType === 'NUMINTEC_DIALER' ? (
        <NumintecDialer />
      ) : dialerType === 'RINGOVER_DIALER' ? (
        <RingoverDialer />
      ) : (
        <>
          <DeviceHandler />
          <DialerErrorWarning />
          <DialerStatusHeader />
          <Dial />
          <div className={styles.actionsPanel}>
            {tab === DialerTab.dialer && <RingHangupButton />}
            {tab === DialerTab.dialer && <DialerConnectionHint />}
            {tab === DialerTab.dialer && status !== DialerStatus.authorizing && (
              <DialerHelpMessage />
            )}
            {tab === DialerTab.manual && <CallDirection />}
            {status !== DialerStatus.authorizing && <DialerUserPhoneSelector />}
          </div>
          {tab === DialerTab.dialer && <NotePanelButton />}
          {isNotePanelOpen && <NotePanel />}
          {tab === DialerTab.dialer && <DialPad />}
          {tab === DialerTab.manual && <LogCallButton />}
          <CorrectContactFlow />
        </>
      )}
    </div>
  );
};

const NotePanelButton = () => {
  const { setState } = useDialerStore();
  const activity = useDialer(state => state.activity);
  const { t } = useTranslation();

  return activity ? (
    <div className={styles.notePanelButton} onClick={() => setState('notePanelOpen', true)}>
      <Button variant="clear" size="small" color="peanut" iconLeft="noteAction" uppercase={false}>
        {t('dialer.addNote')}
      </Button>
    </div>
  ) : null;
};

const NotePanel = () => {
  const [editor, setEditor] = useState(null);
  const [lastBobjectId, setLastBobjectId] = useState(null);
  const activity = useDialer(state => state.activity);
  const note = useDialer(state => state.note);
  const tab = useDialer(state => state.tab);
  const bobjectId = useDialer(state => state.bobjectId);
  const open = useDialer(state => state.open);

  const { t } = useTranslation();
  const { setState } = useDialerStore();
  const { settings } = useActiveUserSettings();
  const { patchBobject } = useBobject(BobjectTypes.Activity, settings?.account.id);

  async function setNote(note) {
    setState('note', note);
    if (tab === DialerTab.dialer) {
      await debouncedSaveNote(note);
    }
  }

  const plugins = useRichTextEditorPlugins({
    images: false,
    templateVariables: false,
  });

  const debouncedSaveNote = useCallback(
    debounce(async (note: string) => {
      if (note) {
        try {
          await patchBobject(activity.id.objectId, {
            contents: {
              ACTIVITY__NOTE: serialize(note, {
                format: 'AST',
                plugins,
              }),
            },
            params: { skipEmptyUpdates: true },
          });
        } catch (e) {
          console.error(e);
        }
      }
    }, 1000),
    [],
  );

  const classes = clsx(styles.notePanel, {
    [styles.notePanelManual]: tab === DialerTab.manual,
  });

  const toolbarClasses = clsx(styles.toolbar, {
    [styles.toolbarManual]: tab === DialerTab.manual,
  });

  useEffect(() => {
    if (editor && !note) {
      resetEditorChildren(editor);
    }
  }, [editor, note]);

  useEffect(() => {
    if (open !== DialerOpenStatus.closed) {
      if (!bobjectId || bobjectId !== lastBobjectId) {
        setState('note', null);
      }

      setLastBobjectId(bobjectId);
    }
  }, [bobjectId, open]);

  return (
    <motion.div
      initial={{ y: tab === DialerTab.manual ? 0 : '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.2 }}
      className={classes}
    >
      <RichTextEditor
        id={'callNote'}
        value={note}
        plugins={plugins}
        placeholder={t('dialer.notePlaceholder')}
        onChange={setNote}
        style={{
          padding: '12px 28px 4px 28px',
        }}
        setEditor={setEditor}
      >
        {editor => (
          <>
            <div className={styles.editorContent}>{editor}</div>
            {tab !== DialerTab.manual && (
              <div
                className={styles.closeNotePanel}
                onClick={() => setState('notePanelOpen', false)}
              >
                <Icon name="cross" size={16} color="bloobirds" />
              </div>
            )}
            <div className={toolbarClasses}>
              <EditorToolbar backgroundColor="white">
                <EditorToolbarControlsSection color="peanut" />
                <EditorToolbarFontStylesSection color="peanut" />
                <EditorToolbarTextMarksSection color="peanut" />
                <EditorToolbarListsSection color="peanut" />
              </EditorToolbar>
            </div>
          </>
        )}
      </RichTextEditor>
    </motion.div>
  );
};

const CorrectContactFlow = () => {
  const activity = useDialer(state => state.activity);
  const status = useDialer(state => state.status);
  const { setActivity } = useDialerStore();
  const [activityCCF, setActivityCCF] = useState(null);

  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const { openWizard, resetWizardProperties } = useWizardContext();
  const incomingAccepted = useDialer(state => state.incomingAccepted);
  const direction = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)
    ?.valueLogicRole;

  async function openCorrectContactFlow() {
    const mainBobjectId = getMainBobjectId(activity);
    if (mainBobjectId) {
      const response = await api.get(
        `/linkedin/${PluralBobjectTypes[mainBobjectId.split('/')[1]]?.toLowerCase()}/${
          mainBobjectId.split('/')[2]
        }`,
      );
      setMainActivityBobject(response?.data);
    }
    setShowCorrectContactFlow(true);
  }

  React.useEffect(() => {
    if (
      activity &&
      status === DialerStatus.callEnded &&
      (direction == DIRECTION_VALUES_LOGIC_ROLE.OUTGOING || incomingAccepted)
    ) {
      api.get(`/bobjects/${activity.id?.value}/form?injectReferences=true`).then(response => {
        if (response?.data) {
          setActivityCCF(fillReferenceFields(response?.data));
        }
        openCorrectContactFlow();
      });
    }
  }, [status]);

  function handleClose() {
    setActivity(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }

  if (activityCCF && showCorrectContactFlow) {
    openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
      referenceBobject: mainActivityBobject,
      handleClose: handleClose,
    });
  }

  return <></>;
};

const DialerHeader = ({
  showTabs,
  showNoteButton,
}: {
  showTabs: boolean;
  showNoteButton: boolean;
}) => {
  const { minimize, close, setSelectedTab, setState } = useDialerStore();
  const tab = useDialer(state => state.tab);
  const status = useDialer(state => state.status);
  const { t } = useTranslation();
  const activity = useDialer(state => state.activity);

  const callInProgress =
    status === DialerStatus.connected ||
    status === DialerStatus.incoming ||
    status === DialerStatus.callEnded;

  const closeClasses = clsx(styles.headerClose, {
    [styles.closeDisabled]: callInProgress,
  });

  return (
    <div className={styles.header} id="dialer-drag-box">
      <div className={styles.headerIcons}>
        <Tooltip
          title={callInProgress ? t('dialer.tooltips.cannotClose') : t('dialer.tooltips.close')}
          position="top"
        >
          <div
            className={closeClasses}
            onClick={() => {
              if (!callInProgress) {
                close();
              }
            }}
          >
            <Icon name="cross" color={callInProgress ? 'softBloobirds' : 'bloobirds'} size={20} />
          </div>
        </Tooltip>
        <Tooltip title={t('dialer.tooltips.minimize')} position="top">
          <div className={styles.headerClose} onClick={minimize}>
            <Icon name="minus" color="bloobirds" size={20} />
          </div>
        </Tooltip>
      </div>
      <div className={styles.headerDragger}>
        <Icon name="dragAndDrop" size={24} color="lightBloobirds" />
      </div>
      {showTabs ? (
        <div className={styles.headerTabs}>
          <div
            className={clsx(styles.headerTab, {
              [styles.headerTab_active]: tab === DialerTab.dialer,
            })}
            onClick={() => {
              setSelectedTab(DialerTab.dialer);
              setState('notePanelOpen', false);
            }}
          >
            <Icon name="phone" color="bloobirds" size={16} />
            <Text size="xs" color="bloobirds">
              {t('dialer.dialer')}
            </Text>
          </div>
          <div
            className={clsx(styles.headerTab, {
              [styles.headerTab_active]: tab === DialerTab.manual,
              [styles.headerTab_disabled]: callInProgress,
            })}
            onClick={() => {
              if (!callInProgress) setSelectedTab(DialerTab.manual);
            }}
          >
            <Icon
              name="noteAction"
              color={!callInProgress ? 'bloobirds' : 'softPeanut'}
              size={16}
            />
            <Text size="xs" color="bloobirds">
              {t('dialer.logCall.button')}
            </Text>
          </div>
        </div>
      ) : (
        <div className={styles.headerButtons}>
          {showNoteButton && !!activity && <NoteButton />}
          <PitchButton />
        </div>
      )}
    </div>
  );
};

function getDialerStatusText(status: DialerStatus, t: any) {
  switch (status) {
    case DialerStatus.registering:
      return t('dialer.hints.connecting');
    case DialerStatus.authorizing:
    case DialerStatus.idle:
      return t('dialer.hints.make');
    case DialerStatus.connected:
      return t('dialer.hints.onCall');
    case DialerStatus.callEnded:
      return t('dialer.hints.callEnded');
    case DialerStatus.incoming:
      return t('dialer.hints.incomingCall');
    default:
      return t('dialer.hints.make');
  }
}

const PitchButton = () => {
  const store = useDialerStore();
  const showingExternalScreen = useDialer(state => state.showingExtendedScreen);
  const extendedScreenType = useDialer(state => state.extendedScreenType);
  const { t } = useTranslation();

  return (
    <Button
      className={clsx(styles.headerButton, {
        [styles.pitchButtonActivated]: showingExternalScreen && extendedScreenType === 'pitches',
      })}
      size="small"
      variant="secondary"
      color="purple"
      iconLeft="chat"
      uppercase={false}
      onClick={() => store.toggleExtendedScreen('pitches')}
    >
      {t('dialer.pitch')}
    </Button>
  );
};

const NoteButton = () => {
  const store = useDialerStore();
  const showingExternalScreen = useDialer(state => state.showingExtendedScreen);
  const extendedScreenType = useDialer(state => state.extendedScreenType);
  const { t } = useTranslation();
  return (
    <Button
      className={clsx(styles.headerButton, {
        [styles.notesButtonActivated]: showingExternalScreen && extendedScreenType === 'notes',
      })}
      size="small"
      variant="secondary"
      color="banana"
      iconLeft="note"
      uppercase={false}
      onClick={() => store.toggleExtendedScreen('notes')}
    >
      {t('dialer.note')}
    </Button>
  );
};

const DialerStatusHeader = () => {
  const status = useDialer(state => state.status);
  const tab = useDialer(state => state.tab);
  const { t } = useTranslation();

  const statusText = getDialerStatusText(status, t);

  return (
    <div className={styles.statusHeader}>
      <Text weight="bold">{tab === DialerTab.manual ? t('dialer.logCall.title') : statusText}</Text>
      <PitchButton />
    </div>
  );
};

const DialerHelpMessage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.helpMessage}>
      <Icon name="info" size={16} color="bloobirds" />
      <Text size="xs" color="softPeanut">
        {t('dialer.hints.connectionProblems')}
      </Text>
    </div>
  );
};

const DialerErrorWarning = () => {
  const errors = useDialer(state => state.errors);
  const warnings = useDialer(state => state.warnings);
  const { setState } = useDialerStore();

  if (errors.length === 0 && warnings.length === 0) {
    return null;
  }

  const className = clsx(styles.errorWarning, {
    [styles.errorWarning_error]: errors.length > 0,
    [styles.errorWarning_warning]: warnings.length > 0,
  });

  return (
    <motion.div
      className={className}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <div>
        <Text
          size="m"
          color={errors.length > 0 ? 'white' : 'softPeanut'}
          weight="bold"
          align="center"
        >
          {errors.length > 0 ? errors[0].description : warnings[0].description}
        </Text>
      </div>
      <Text size="xs" color={errors.length > 0 ? 'white' : 'softPeanut'}>
        {errors.length > 0 ? errors[0].explanation : warnings[0].explanation}
      </Text>
      <IconButton
        name="cross"
        size={24}
        color={errors.length > 0 ? 'white' : 'softPeanut'}
        onClick={() => {
          if (errors.length > 0) {
            setState('errors', []);
          } else {
            setState('warnings', []);
          }
        }}
      />
    </motion.div>
  );
};

const CallDirection = () => {
  const callDirection = useDialer(state => state.callDirection);
  const { setState } = useDialerStore();
  const { t } = useTranslation();

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <div className={styles.callDirectionContainer}>
      <Text size="xs" weight="bold">
        {t('dialer.direction.title')}
      </Text>
      <div className={styles.callDirection}>
        <div className={styles.callDirectionLabel}>
          {callDirection === 'inbound' && <Icon name="callIncoming" size={16} color="bloobirds" />}
          <Text
            size="xs"
            color={callDirection === 'inbound' ? 'peanut' : 'softPeanut'}
            align="right"
          >
            {t('dialer.direction.incoming')}
          </Text>
        </div>
        <div
          className={clsx(styles.directionSelector, {
            [styles.directionSelector__left]: callDirection === 'inbound',
            [styles.directionSelector__right]: callDirection === 'outbound',
          })}
          onClick={() =>
            setState('callDirection', callDirection === 'inbound' ? 'outbound' : 'inbound')
          }
        >
          <motion.div layout transition={spring} />
        </div>
        <div className={styles.callDirectionLabel}>
          {callDirection === 'outbound' && <Icon name="callOutgoing" size={16} color="bloobirds" />}
          <Text
            size="xs"
            color={callDirection === 'outbound' ? 'peanut' : 'softPeanut'}
            align="left"
          >
            {t('dialer.direction.outgoing')}
          </Text>
        </div>
      </div>
    </div>
  );
};
