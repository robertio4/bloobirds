chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    // Replace with your actual condition to check if the user has Salesforce
    if (process.env.NODE_ENV === 'production') {
      chrome.tabs.create({
        url: 'https://auth.bloobirds.com/auth/login?fromExtensionInstall=true',
      });
    } else if (process.env.NODE_ENV === 'development') {
      chrome.tabs.create({
        url: 'https://auth.dev-bloobirds.com/auth/login?fromExtensionInstall=true',
      });
    } else {
      chrome.tabs.create({
        url: 'http://localhost:5173/auth/login?fromExtensionInstall=true',
      });
    }
  }
});
