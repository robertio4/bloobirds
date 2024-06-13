import { Fragment } from 'react';

import { AddLeadToActivityModal } from '@bloobirds-it/add-lead-to-activity';
import { useOpenCCFWithoutObject } from '@bloobirds-it/hooks';
import {
  ACTIVITY_TYPES,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BobjectTypes,
  BobjectWithDate,
  MessagesEvents,
} from '@bloobirds-it/types';
import { api, getTextFromLogicRole, isCallActivity } from '@bloobirds-it/utils';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';

import { useBuyerPersonas } from '../../../../../../../hooks/useBuyerPersonas';
import { useExtensionContext } from '../../../../../context';
import { DateGroupHeader } from '../../../../../dateGroupHeader/dateGroupHeader';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import { NoFilterResults } from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { CallCard } from '../card/callCard';
import { EmailCard } from '../card/emailCard';
import { LinkedinCard } from '../card/linkedinCard';
import { WhatsAppCard } from '../card/whatsAppCard';
import { useInboxTab } from '../hooks/useInboxTab';
import { InboxTabBulkActions } from './InboxTabBulkActions';

const CardActivity = ({ data }) => {
  switch (data?.type) {
    case ACTIVITY_TYPES.CALL:
      return <CallCard activity={data} />;
    case ACTIVITY_TYPES.EMAIL:
      return <EmailCard email={data} />;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return (
        <LinkedinCard
          key={`conversation-${data?.value}`}
          messages={data.messages}
          leadId={data?.value}
          isLastDayItem={data?.activityDate?.isLastOfDay}
        />
      );
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return (
        <WhatsAppCard
          key={`conversation-${data?.id}`}
          messages={data.messages}
          leadId={data?.id}
          isLastDayItem={data?.activityDate?.isLastOfDay}
        />
      );
    default:
      return null;
  }
};

export const InboxTabList = ({
  parentRef,
  isLoading,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}) => {
  const {
    items,
    calls,
    emails,
    linkedin,
    whatsapp,
    isLoading: isValidating,
    fetchNextPage,
    mutate,
  } = useInboxTab();
  const { useGetSettings } = useExtensionContext();
  const hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();
  const { openWizard, resetWizardProperties } = useWizardContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const {
    openedModalInfo: { openedModal, bobject, referencedBobject },
    resetOpenedModalInfo,
  } = useSubhomeContext();
  const isAddPersonModal = openedModal === 'addPerson';
  const isCallResultModal = openedModal === 'callReportResult';

  const buyerPersonas = useBuyerPersonas();

  function handleClose() {
    //mutate();
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: { type: BobjectTypes.Activity },
      }),
    );
    resetOpenedModalInfo();
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }

  if (!(isValidating && isLoading) && items?.length === 0) {
    return <NoFilterResults />;
  }

  return (
    <>
      <InboxTabBulkActions
        calls={calls}
        emails={emails}
        linkedin={linkedin}
        whatsapp={whatsapp}
        mutate={mutate}
      />
      <VirtualInfiniteScroll
        parentRef={parentRef}
        rows={items}
        totalRows={items.length}
        isFetchingData={isLoading && isValidating}
        fetchNextPage={fetchNextPage}
        contentSkeleton={() => <SubhomeContentSkeleton visible />}
      >
        {(data: BobjectWithDate) =>
          (data?.id?.objectId || data?.id) && (
            // @ts-ignore
            <Fragment key={data?.id?.objectId || data?.id}>
              {/* @ts-ignore */}
              {data?.activityDate?.isFirstOfDay && <DateGroupHeader bobject={data} />}
              <CardActivity
                // @ts-ignore
                key={data?.id?.objectId || data?.id}
                data={data}
              />
            </Fragment>
          )
        }
      </VirtualInfiniteScroll>
      {isAddPersonModal && (
        <AddLeadToActivityModal
          accountId={accountId}
          activity={bobject}
          buyerPersonas={buyerPersonas}
          onClose={handleClose}
          shouldAllowToAddPhone={isCallActivity(bobject)}
          onSubmit={(leadId, shouldUpdatePhone) => {
            // If the bobject is a call, we need to assign the phone of the call to the lead
            const isCall = isCallActivity(bobject);
            if (isCall && shouldUpdatePhone) {
              const phone = getTextFromLogicRole(bobject, 'ACTIVITY__CALL_LEAD_PHONE_NUMBER');
              if (phone && phone !== '') {
                // patch lead
                const contentToPatch = {
                  LEAD__PHONE: phone,
                };
                api.patch(`/bobjects/${accountId}/Lead/${leadId}/raw`, contentToPatch);
              }
            }
            window.dispatchEvent(
              new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                detail: { type: BobjectTypes.Activity },
              }),
            );
          }}
        />
      )}
      {isCallResultModal &&
        (referencedBobject || hasOpenCCFWithoutObjectAccount) &&
        openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, bobject, {
          referenceBobject: referencedBobject,
          handleClose: handleClose,
        })}
    </>
  );
};
