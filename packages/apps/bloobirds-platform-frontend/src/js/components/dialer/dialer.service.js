import { api } from '@bloobirds-it/utils';

export const callFromPhone = connectionDetails =>
  api.post('/utils/service/twilio/call/phone', {
    sdrPhone: connectionDetails.sdrPhone,
    leadPhone: connectionDetails.leadPhone,
    twilioPhone: connectionDetails.twilioPhone,
    companyId: connectionDetails.companyId,
    leadId: connectionDetails.leadId,
  });
