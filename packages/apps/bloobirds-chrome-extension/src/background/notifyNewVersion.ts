import { CHANNEL_POPUP, NEW_VERSION, RELOAD, VERSION_UPDATED } from '../utils/constants';

const channel = new BroadcastChannel(CHANNEL_POPUP);

const newVersion = () => {
  chrome.action.setIcon({
    path: 'src/logo.png',
  });
  chrome.action.setBadgeText({ text: ' 1 ' });
};

const versionUpdated = () => {
  chrome.action.setIcon({
    path: 'src/favicon.png',
  });
  chrome.action.setBadgeText({
    text: '',
  });
};

channel.onmessage = e => {
  switch (e?.data?.msg) {
    case RELOAD:
      setTimeout(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          if (tabs[0]) chrome.tabs.reload(tabs[0].id);
        });
        chrome.runtime.reload();
      }, 100);
      break;
    case NEW_VERSION:
      newVersion();
      break;
    case VERSION_UPDATED:
      versionUpdated();
      break;
    default:
      break;
  }
};

const getLatestVersion = async () => {
  const response = await fetch('https://gateway.bloobirds.com/auth/service/extension/version');
  return response.json();
};

const updateVersion = async () => {
  const { version } = await getLatestVersion();
  console.log('API version:', version);
  const manifest = chrome.runtime.getManifest();
  const currentVersion = manifest.version;
  const isObsolete = version !== currentVersion;

  if (isObsolete) {
    newVersion();
  } else {
    versionUpdated();
  }
};

chrome.runtime.onUpdateAvailable.addListener(() => {
  updateVersion();
});

chrome.runtime.onInstalled.addListener(() => {
  updateVersion();
});
