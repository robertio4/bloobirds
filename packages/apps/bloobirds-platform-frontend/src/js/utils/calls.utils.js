import { isUrl } from '../misc/utils';
import { api } from './api';

export const getSignedCallRecordingUrl = async recordCall => {
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
