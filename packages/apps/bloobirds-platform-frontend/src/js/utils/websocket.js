export const isWebsocketDataActionForWithId = (bobjectType, id, wsMessage) => {
  if (
    wsMessage.type === 'WEBSOCKET_MESSAGE_INCOMING' &&
    wsMessage.data.action === 'data' &&
    wsMessage.data.bobjectType === bobjectType
  ) {
    const shortId = id && id.split('/').length === 3 ? id.split('/')[2] : id;
    return wsMessage.data.ids.includes(id) || wsMessage.data.ids.includes(shortId);
  }
  return false;
};
