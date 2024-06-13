import { getSalesNavMessagingSenderMetaObject } from '../sales/syncMessages';
import { transform } from '../sales/transform';
import { LinkedInMessage } from '../types';
import { transformToNewMessageType } from '../utils';
import extractAuto from './extractAuto';

export default async (leadId: string): Promise<Array<LinkedInMessage>> => {
  // Here we use the same method as sales navigator messages as this works for both
  const object = await getSalesNavMessagingSenderMetaObject();

  if (!object) {
    return [];
  }

  const response = await extractAuto();
  // Also transform works the well with the sales nav regular system
  const oldLinkedInMessages = transform(response, object.meta);

  console.log(
    'Found ' + oldLinkedInMessages?.length + ' messages for ' + leadId ||
      object?.meta?.nameTo + ' ' + object?.meta?.messageTo + ', going to sync',
  );

  const messagesToSend = leadId
    ? oldLinkedInMessages?.map(message => ({
        ...message,
        bloobirdsId: leadId,
      }))
    : oldLinkedInMessages;

  return transformToNewMessageType({
    messages: messagesToSend,
    pathName: object.meta.pathName,
    leadName: object.meta.nameTo,
  });
};
