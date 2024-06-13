const loadingElement = (messagesContainer: HTMLElement) => {
  return messagesContainer.querySelector('ul li.msg-s-message-list__loader') as HTMLElement;
};

const asyncExtractorLogicWrapper = (extractor: any) => (messagesContainer: HTMLElement) =>
  new Promise(res => {
    new MutationObserver((mutation, observe) => {
      const messagesAreNotLoading = loadingElement(messagesContainer)
        .getAttribute('class')
        ?.includes('hidden');
      if (messagesAreNotLoading) {
        const messagesPostLoad = extractor(messagesContainer);
        observe.disconnect();
        res(messagesPostLoad);
      }
    }).observe(messagesContainer.querySelector('ul'), { childList: true, attributes: true });
  });

const getMessagesFromContainer = (container: HTMLElement) =>
  container.querySelectorAll('ul li.msg-s-message-list__event.clearfix');

const getMessagesFromContainerAsync = asyncExtractorLogicWrapper(getMessagesFromContainer);

const checkIfListLoadsMessagesAndScroll = async (messagesContainer: HTMLElement) =>
  new Promise(res => {
    new MutationObserver((mutations, observe) => {
      res(true);
      observe.disconnect();
    }).observe(loadingElement(messagesContainer), { attributes: true });

    setTimeout(() => {
      res(false);
    }, 100);

    messagesContainer.scrollTop = 0;
  });

export default async (): Promise<any> => {
  let messages;
  const messagesContainer: HTMLElement = document.querySelector('div.msg-s-message-list-container');

  if (!messagesContainer) {
    return Promise.resolve([]);
  }

  const listHasMoreMessages = await checkIfListLoadsMessagesAndScroll(messagesContainer);

  if (listHasMoreMessages) {
    messages = await getMessagesFromContainerAsync(messagesContainer);
  } else {
    messages = getMessagesFromContainer(messagesContainer);
  }
  return Promise.resolve(messages);
};
