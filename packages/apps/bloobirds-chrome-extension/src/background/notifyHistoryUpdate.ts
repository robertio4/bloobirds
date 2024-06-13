import { Actions } from '../types/messages';

chrome.history.onVisited.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length) {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { type: Actions.HistoryUpdate });
    }
  });
});
