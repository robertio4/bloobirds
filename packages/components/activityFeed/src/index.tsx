import { CallDetail } from './components/activityDetails/pages/callDetail/callDetail';
import { EmailThreadDetail } from './components/activityDetails/pages/emailThreadDetail/emailThreadDetail';
import { InboundDetail } from './components/activityDetails/pages/inboundDetail/inboundDetail';
import { LinkedInDetail } from './components/activityDetails/pages/linkedinDetail/linkedInDetail';
import { MeetingDetail } from './components/activityDetails/pages/meetingDetail/meetingDetail';
import { NoteDetail } from './components/activityDetails/pages/noteDetail/noteDetail';
import { WhatsappDetail } from './components/activityDetails/pages/whatsappDetail/whatsappDetail';
import { ActivityFeedUserFilter } from './components/pastActivityTab/filters/activityFeedUserFilter';
import MagicFilter from './components/pastActivityTab/filters/magicFilter';
import PastActivityLeadFilter from './components/pastActivityTab/filters/pastActivityLeadFilter';
import PastActivityTypeFilter from './components/pastActivityTab/filters/pastActivityTypeFilter';
import { NoDataPage } from './components/pastActivityTab/pastActivity.utils';
import { PastActivityTab } from './components/pastActivityTab/pastActivityTab';

export {
  EmailThreadDetail,
  LinkedInDetail,
  MeetingDetail,
  InboundDetail,
  CallDetail,
  NoteDetail,
  WhatsappDetail,
  ActivityFeedUserFilter,
  PastActivityTypeFilter,
  PastActivityLeadFilter,
  PastActivityTab,
  MagicFilter,
  NoDataPage,
};

export * from './components/activityFeed/activityFeed';
export * from './components/newActivityFeed/newActivityFeed';
export { useActivityFeed } from './components/newActivityFeed/useNewActivityFeed';
export * from './components/activityDetails/activityDetails';
export * from './assets/svg.js';
