import { useEffect, useMemo, useState } from 'react';

import {
  CallDetail,
  EmailThreadDetail,
  InboundDetail,
  LinkedInDetail,
  MeetingDetail,
  WhatsappDetail,
} from '@bloobirds-it/activity-feed';
import { Button, IconButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import {
  useFullSalesEnabled,
  useIsB2CAccount,
  useMinimizableModals,
  usePlaybook,
  useSessionStorage,
  useSyncBobjectStatus,
} from '@bloobirds-it/hooks';
import { InfoWarningSync } from '@bloobirds-it/misc';
import { SegmentationFilter } from '@bloobirds-it/playbook';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  SessionStorageKeys,
  TemplateStage
} from "@bloobirds-it/types";
import clsx from 'clsx';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { v4 as uuid } from 'uuid';

import { ExtendedContextTypes } from '../../../types/extendedContext';
import { useExtensionContext } from '../context';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import styles from './extendedScreen.module.css';
import { BobjectDetail } from './pages/bobjectDetail/bobjectDetail';
import { NoteDetail } from './pages/noteDetail/noteDetail';
import { OrderContactViewDetails } from './pages/orderContactViewDetails/orderContactViewDetails';
import SimilarDealsWrapper from './pages/similarDeals/similarDealsWrapper';
import { TemplateDetail } from './pages/templateDetail/templateDetail';
import { useTranslation } from "react-i18next";
import { AssigneeComponent } from "@bloobirds-it/bobjects";
import { getFieldByLogicRole } from "@bloobirds-it/utils";
import { RelatedObjectDetails } from './pages/relatedObjectDetails/relatedObjectDetails';

const ExtendedContent = ({
  type,
  actionsDisabled,
  isBubble,
}: {
  type: ExtendedContextTypes;
  actionsDisabled?: boolean;
  isBubble?:boolean;
}) => {
  const {
    useGetActiveBobject,
    useGetExtendedContext,
    useGetSettings,
    useGetDataModel,
    closeExtendedScreen,
    useGetActiveBobjectContext,
    setExtendedContext,
    refreshExtendedScreenBobject,
    setContactViewBobjectId,
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const data = useGetActiveBobjectContext();
  const company = data?.company;
  const dataModel = useGetDataModel();
  const stage = dataModel?.findValueById(activeBobject?.stage);
  const isSalesStage =
    stage?.logicRole?.includes('SALES') || activeBobject?.id.typeName === 'Opportunity';
  const { setMeta, getMeta } = useFloatingMenuContext();
  const { bobject, threadId, extensionBobject, extraInfo, mutate } = useGetExtendedContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const userId = settings?.user?.id;
  const isSalesEnabled = useFullSalesEnabled(accountId);
  const meta = getMeta();
  const defaultStage = isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
  const playbookStage = meta?.stage ? meta.stage : defaultStage;
  const { segmentationFields, activeBobjectSegmentationValues } = usePlaybook({
    stage: playbookStage,
    // @ts-ignore
    bobjectData: { company, activeBobject },
  });
  const isB2CAccount = useIsB2CAccount();

  const segmentationData = useMemo(
    () => (meta?.segmentationData ? meta.segmentationData : activeBobjectSegmentationValues),
    [meta?.segmentationData, activeBobjectSegmentationValues],
  );

  switch (type) {
    case ExtendedContextTypes.CALL_DETAILS:
      return (
        <CallDetail
          // @ts-ignore
          activity={bobject}
          dataModel={dataModel}
          onSave={() => {
            closeExtendedScreen();
          }}
          actionsDisabled={actionsDisabled}
          userId={userId}
          openSuggestedActions={() => {
            setExtendedContext({ type: ExtendedContextTypes.SUGGESTED_ACTIONS, bobject });
          }}
          isBubble={isBubble}
        />
      );
    case ExtendedContextTypes.ORDER_CONTACT_DETAILS:
      return (
        <OrderContactViewDetails bobject={extensionBobject} extraInfo={extraInfo} mutate={mutate} />
      );
    case ExtendedContextTypes.EMAIL_THREAD:
      return (
        <EmailThreadDetail
          // @ts-ignore
          activity={bobject}
          emailThreadId={threadId}
          accountId={accountId}
          dataModel={dataModel}
          actionsDisabled={actionsDisabled}
          userId={userId}
        />
      );
    case ExtendedContextTypes.MEETING_DETAILS:
      return (
        <MeetingDetail
          // @ts-ignore
          activity={bobject}
          dataModel={dataModel}
          onSave={() => {
            // closeExtendedScreen();
          }}
          actionsDisabled={actionsDisabled}
          userId={userId}
          mutate={refreshExtendedScreenBobject}
          onGoToBobject={(bobjectId: `${string}/${BobjectTypes}/${string}`) => {
            setContactViewBobjectId(bobjectId);
          }}
          isBubble={isBubble}
        />
      );
    case ExtendedContextTypes.LINKEDIN_THREAD:
      return (
        <LinkedInDetail
          // @ts-ignore
          activity={bobject}
          accountId={accountId}
          dataModel={dataModel}
          actionsDisabled={actionsDisabled}
          userId={userId}
        />
      );
    case ExtendedContextTypes.WHATSAPP_THREAD:
      return (
        <WhatsappDetail
          // @ts-ignore
          activity={bobject}
          settings={settings}
          activeBobject={activeBobject}
          accountId={accountId}
          dataModel={dataModel}
          channel="WHATSAPP"
          userId={userId}
        />
      );
    case ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD: {
      return (
        <WhatsappDetail
          // @ts-ignore
          activeBobject={activeBobject}
          settings={settings}
          activity={bobject}
          accountId={accountId}
          dataModel={dataModel}
          channel='WHATSAPP_BUSINESS'
          userId={userId}
          actionsDisabled={actionsDisabled}
        />
      );
    }
    case ExtendedContextTypes.INBOUND_ACTIVITY:
      return (
        <InboundDetail
          // @ts-ignore
          activity={bobject}
          dataModel={dataModel}
        />
      );
    case ExtendedContextTypes.PLAYBOOK_PITCH:
    case ExtendedContextTypes.PLAYBOOK_EMAIL:
    case ExtendedContextTypes.PLAYBOOK_LINKEDIN_MESSAGE:
    case ExtendedContextTypes.PLAYBOOK_SNIPPET:
    case ExtendedContextTypes.PLAYBOOK_WHATSAPP:
      return <TemplateDetail />;
    case ExtendedContextTypes.PLAYBOOK_SEGMENTATION_FILTER:
      return (
        <SegmentationFilter
          shouldShowBattlecards={meta?.shouldShowBattlecards}
          shouldShowVisibilityFilters={meta?.shouldShowVisibilityFilters}
          activeBobjectSegmentationValues={activeBobjectSegmentationValues}
          isSalesEnabled={isSalesEnabled}
          stage={meta?.stage}
          defaultStage={defaultStage}
          segmentationFields={segmentationFields}
          filterValues={segmentationData}
          visibilityFilters={meta?.visibilityFilters}
          setFiltersContext={value => {
            setMeta({ ...value, isFilterViewOpen: true });
          }}
          isSmartEmail={false}
        />
      );
    case ExtendedContextTypes.BOBJECT_DETAILS:
      return <BobjectDetail isB2CAccount={isB2CAccount}/>;
    case ExtendedContextTypes.SIMILAR_DEALS:
      return (
        <SimilarDealsWrapper
          // @ts-ignore
          company={bobject}
        />
      );
    case ExtendedContextTypes.NOTE_DETAILS:
      return (
        <NoteDetail
          id={uuid()}
          // @ts-ignore
          data={extraInfo}
          onSave={() => {
            closeExtendedScreen();
          }}
        />
      );
    case ExtendedContextTypes.RELATED_OBJECT_DETAILS:
      return (
        <RelatedObjectDetails data={extraInfo} />
      );
    default:
      return <></>;
  }
};

function Buttons({ buttonData, actionsDisabled }) {
  return buttonData.map(props => {
    const buttonDisabled = actionsDisabled && props?.name !== 'edit';
    const buttonText = props?.buttonText;
    if (buttonText) {
      return (
        <Tooltip
          title={
            buttonDisabled
              ? 'You don’t have permissions required to perform this action'
              : props?.tooltipText
          }
          position="top"
        >
          <Button
            {...props}
            iconLeft={props?.name}
            uppercase={false}
            size="small"
            disabled={buttonDisabled || props?.disabled}
            color={buttonDisabled || props?.disabled ? undefined : 'purple'}
          >
            {buttonText}
          </Button>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title={props?.tooltipText} position="top">
          <IconButton size={22} {...props} />
        </Tooltip>
      );
    }
  });
}

export const ExtendedScreen = () => {
  const { useGetExtendedContext, closeExtendedScreen, useGetSidePeekEnabled } = useExtensionContext();
  const { open, buttonData, type, bobject, actionsDisabled, extraInfo } = useGetExtendedContext();
  const { get, remove } = useSessionStorage();
  const [lastBobject, setLastBobject] = useState(undefined);
  const [sideOpen, setSideOpen] = useState('left');
  const { getMeta, setMeta, getPosition } = useFloatingMenuContext();
  const controls = useAnimation();
  const meta = getMeta();
  const position = getPosition();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { openMinimizableModal } = useMinimizableModals();
  const { syncStatus } = useSyncBobjectStatus(bobject?.id?.accountId, [bobject]);
  const assignee = getFieldByLogicRole(bobject as Bobject<BobjectTypes.Activity>, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const {t} = useTranslation();
  const [internalOpen, setInternalOpen] = useState(false);

  function changeSides() {
    // @ts-ignore
    if (position.x < 370) {
      setSideOpen('right');
    } else {
      setSideOpen('left');
    }
  }

  const handleOnClose = () => {
    if (type === ExtendedContextTypes.PLAYBOOK_SEGMENTATION_FILTER)
      setMeta({ ...meta, isFilterViewOpen: false });
    closeExtendedScreen();
  };

  function getExtendedScreenPosition() {
    if (sidePeekEnabled) {
      return { startingX: -50, finishingX: -390 };
    } else {
      if (position) {
        changeSides();
        // @ts-ignore
        if (position.x < 370) {
          return { startingX: 20, finishingX: 317 };
        } else {
          return { startingX: -50, finishingX: -337 };
        }
      }
      return {};
    }
  }

  useEffect(() => {
    if (type && !internalOpen) {
      setInternalOpen(true);
      setTimeout(() => controls?.start('start'), 10)
    }
  }, [type]);

  useEffect(() => {
    if (lastBobject?.id?.value !== bobject?.id?.value || !lastBobject) {
      if (open) {
        controls?.start('start');
      } else {
        controls?.start('close').then(() => closeExtendedScreen());
        if (meta) setMeta({ ...meta, isFilterViewOpen: false });
      }
    }
    setLastBobject(bobject);
  }, [open, bobject]);

  //This is to change the side of the extended screen when it is moved to a new position
  useEffect(() => {
    if (!sidePeekEnabled) {
      if (
        // @ts-ignore
        (sideOpen === 'left' && position?.x < 372) ||
        // @ts-ignore
        (sideOpen === 'right' && position?.x > window.innerWidth - 650)
      ) {
        if (open) controls?.start('start');
        setSideOpen(sideOpen === 'left' ? 'right' : 'left');
      }
    } else {
      if (open) controls?.start('start');
      setSideOpen('left');
    }
    // @ts-ignore
  }, [position?.x, sidePeekEnabled]);

  const variants = {
    start: () => {
      const { startingX, finishingX } = getExtendedScreenPosition();
      return {
        left: [startingX, finishingX],
        scaleX: [0, 1],
        transition: {
          duration: 0.25,
        },
      };
    },
    close: () => {
      const { startingX, finishingX } = getExtendedScreenPosition();
      return {
        left: [finishingX, startingX],
        scaleX: [1, 0],
        transition: {
          duration: 0.25,
        },
      };
    },
  };

  const isRightOpen = sideOpen === 'right';

  const handleToggleView = () => {
    if (type === ExtendedContextTypes.NOTE_DETAILS) {
      const noteInfo = get(SessionStorageKeys.NoteInfo);
      remove(SessionStorageKeys.NoteInfo);
      closeExtendedScreen();
      openMinimizableModal({
        type: 'note',
        data: {
          ...extraInfo,
          ...noteInfo,
          bobject,
        },
      });
    }
  };

  const headerNotes = clsx(styles.header, {
    [styles.headerRight]: isRightOpen,
  });

  const getSyncName = () => {
    switch (type) {
      case ExtendedContextTypes.CALL_DETAILS:
        return 'call';
      case ExtendedContextTypes.NOTE_DETAILS:
        return 'note';
      case ExtendedContextTypes.MEETING_DETAILS:
        return 'meeting';
      default:
        return 'activity';
    }
  };
  const syncName = getSyncName();

  const enableRightSyncWarning =
    type === ExtendedContextTypes.CALL_DETAILS ||
    type === ExtendedContextTypes.MEETING_DETAILS ||
    type === ExtendedContextTypes.INBOUND_ACTIVITY ||
    type === ExtendedContextTypes.NOTE_DETAILS;

  return (
    <AnimatePresence>
      {internalOpen && <motion.div
        exit={{ opacity: 0 }}
        animate={controls}
        variants={variants}
        className={clsx({[styles.extended_sidePeek]: sidePeekEnabled ,
          [styles.extended]: !isRightOpen ,
          [styles.extendedRight]: isRightOpen },
        )}
      >
        <div className={headerNotes}>
          <div>
            <Tooltip title={t('extendedScreen.header.close')} position="top">
              <IconButton name="cross" color="bloobirds" onClick={handleOnClose} />
            </Tooltip>
            {type === ExtendedContextTypes.NOTE_DETAILS && (
              <Tooltip title={t('extendedScreen.header.switchToDraggable')} position="top">
                <IconButton
                  name={'floatingpeek'}
                  onClick={handleToggleView}
                  className={styles.rotate180}
                />
              </Tooltip>
            )}
          </div>
          <div className={styles.headerButtons}>
            {buttonData && <Buttons buttonData={buttonData} actionsDisabled={actionsDisabled} />}
            {assignee && <AssigneeComponent value={assignee} size='m'/>}
            {enableRightSyncWarning && syncStatus !== undefined && !syncStatus && (
                <InfoWarningSync type={syncName} id={bobject?.id} size='medium' />
            )}
          </div>
        </div>
        <div
          style={{
            height: '100%',
            overflow: 'auto',
            overscrollBehaviorX: 'contain',
            borderBottomLeftRadius: '10px',
          }}
        >
          {type && <ExtendedContent type={type} actionsDisabled={actionsDisabled} isBubble={!sidePeekEnabled} />}
        </div>
      </motion.div>}

    </AnimatePresence>
  );
};
