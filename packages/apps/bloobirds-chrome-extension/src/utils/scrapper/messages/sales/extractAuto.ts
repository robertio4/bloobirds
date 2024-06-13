const getMessagesFromContainer = (container: HTMLElement) =>
  container.querySelectorAll('ul li article');

export default async (): Promise<any> => {
  const messagesContainer: HTMLElement = document.querySelector('.thread-container');

  if (!messagesContainer) {
    console.log('Could not find messages container');

    return Promise.resolve([]);
  }

  const messages = getMessagesFromContainer(messagesContainer);

  return Promise.resolve(messages);
};
