export default async (miniWindow) => {
  const messages = miniWindow.querySelectorAll(
    ".msg-s-message-list-container ul .msg-s-message-list__event"
  );
  return Promise.resolve(messages);
};
