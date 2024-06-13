import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';

import { ACTIVITY_FIELDS_LOGIC_ROLE, Bobject, BobjectId, BobjectTypes } from '@bloobirds-it/types';
import {
  api,
  getTextFromLogicRole,
  getValueFromLogicRole,
  injectReferencesGetProcess,
  isUrl,
} from '@bloobirds-it/utils';
import useSWR from 'swr';

export interface SfdcRecord {
  id: string;
  type: string;
}

export interface ActivityInfo {
  activity: Bobject;
  botId: string;
  recordCall: string;
  sfdcRecord: SfdcRecord;
}

export interface Source {
  src: string;
  type: string;
}

const getSignedCallRecordingUrl = async (recordCall: string) => {
  const oldRecordingRegex = /^(https:\/\/record-calls.bloobirds.com\/)(.{34})/g;
  let callSid = recordCall;
  const itsADeprecatedRecordingLink = recordCall.match(oldRecordingRegex);
  if (!itsADeprecatedRecordingLink && isUrl(recordCall)) {
    return recordCall;
  }
  if (recordCall && itsADeprecatedRecordingLink) {
    callSid = recordCall.split('/').at(-1);
  } else {
    callSid = recordCall.split('/')[1];
  }
  const signedUrl = await api.get(`/calls/whiteLabel/calls/${callSid}/recording`);
  if (signedUrl.status === 200) {
    return signedUrl.data.url;
  } else {
    throw new Error('Failed to get signed url');
  }
};

const parseActivityForAnalysis = (bobject: Bobject, activityType: string): ActivityInfo => {
  const botId = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.BOT_ID);
  const recordCall = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);
  const sfdcRecord =
    activityType === 'call'
      ? { id: getValueFromLogicRole(bobject, 'SALESFORCE_ACTIVITY_ID'), type: 'Task' }
      : { id: getValueFromLogicRole(bobject, 'SALESFORCE_EVENT_ID'), type: 'Event' };

  return {
    activity: bobject,
    botId,
    recordCall,
    sfdcRecord,
  };
};

const useMeetingAnalysis = (id: BobjectId<BobjectTypes.Activity>['value']) => {
  const [source, setSource] = useState<Source>();
  const { activityType } = useParams<{ activityType: string }>();

  const { data, mutate, isLoading } = useSWR(id && 'activityAnalysis/' + id, () =>
    api.get(`/bobjects/${id}/form?injectReferences=true`),
  );

  const activityParsed = useMemo(() => {
    return (
      data?.data && parseActivityForAnalysis(injectReferencesGetProcess(data?.data), activityType)
    );
  }, [data]);

  useEffect(() => {
    if (activityType === 'meeting' && activityParsed?.botId) {
      api
        .get(`/messaging/recall/recording/${activityParsed.botId}`)
        .then(res => setSource({ src: res.data.url, type: 'video/mp4' }));
    }

    if (activityType === 'call' && activityParsed?.recordCall) {
      getSignedCallRecordingUrl(activityParsed.recordCall).then(res =>
        setSource({ src: res, type: 'audio/mpeg' }),
      );
    }
  }, [activityParsed, activityType]);

  return {
    activity: activityParsed?.activity,
    sfdcRecord: activityParsed?.sfdcRecord,
    source,
    mutate,
    isLoading,
  };
};

export default useMeetingAnalysis;
