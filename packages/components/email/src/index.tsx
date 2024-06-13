import CancelEmailModal from './components/cancelEmailModal/cancelEmailModal';
import ClearSelect from './components/clearSelect/clearSelect';
import EmailModalRow from './components/emailModalRow/emailModalRow';
import PreviewActivityEmailModal from './components/previewActivityEmailModal/previewActivityEmailModal';
import PreviewEmailModal from './components/previewEmailModal/previewEmailModal';
import { PreviewTemplateModal } from './components/previewTemplateModal/previewTemplateModal';
import NoContacts from './components/recipientSearchInput/components/noContacts';
import CustomDateDialog from './components/scheduleEmailModal/customDateDialog/customDateDialog';
import ScheduleEmailModal from './components/scheduleEmailModal/scheduleEmailModal';
import SendEmailModal from './components/sendEmailModal/sendEmailModal';
import { useSimilarDeals } from './modals/smartEmailModal/smartEmailHelper/hooks/useSimilarDeals';
import { SimilarDealsContent } from './modals/smartEmailModal/smartEmailHelper/pages/similarDealsTab/similaDealsContent/similarDealsContent';
import { checkIfIsEmpty } from './utils/emailModal.utils';

export * from './modals/smartEmailModal/smartEmailModal';

export {
  ScheduleEmailModal,
  SendEmailModal,
  PreviewEmailModal,
  PreviewActivityEmailModal,
  PreviewTemplateModal,
  CancelEmailModal,
  ClearSelect,
  EmailModalRow,
  CustomDateDialog,
  checkIfIsEmpty,
  SimilarDealsContent,
  useSimilarDeals,
  NoContacts,
};
