const waitForElement = (querySelector, timeout) => {
  return new Promise((resolve, reject) => {
    let timer;

    if (document.querySelector(querySelector)) return resolve();
    const observer = new MutationObserver(() => {
      if (document.querySelector(querySelector)) {
        observer.disconnect();
        if (timer) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    if (timeout)
      timer = setTimeout(() => {
        console.log('Timeout reached');
        observer.disconnect();
        reject();
      }, timeout);
  });
};

const getSite = url => {
  // Salesforce
  if (url.includes('lightning.force.com')) {
    if (window.location.pathname.includes('/home')) {
      return document.querySelector('.kondoable')
        ? '.slds-card__header-title'
        : '.slds-page-header';
    }
    if (window.location.pathname.includes('/one/one.app')) {
      return '.oneLoadingBox';
    }
    return '.slds-page-header';
  }

  // Linkedin
  if (url.includes('linkedin.com')) {
    return 'li.global-nav__primary-item';
  }

  // Whatsapp
  if (url.includes('web.whatsapp.com')) {
    const isOpenChat = localStorage.getItem('openWhatsappChat');
    if (isOpenChat === 'true') {
      localStorage.removeItem('openWhatsappChat');
      return '#main .focusable-list-item';
    }
    return '#side';
  }

  // Dynamics
  if (url.includes('crm4.dynamics.com')) {
    return 'body';
  }
  return null;
};

const authPage = () => {
  const url = window.location.hostname;
  return (
    url.includes('auth.dev-bloobirds.com') ||
    url.includes('auth.bloobirds.com') ||
    url.includes('localhost:5173')
  );
};

const getTimeout = url => {
  if (url.includes('web.whatsapp.com')) {
    return 30000;
  }
  return 10000;
};

//// --------------- init --------------- ////

// If it's an auth page, load the core immediately else wait for the site to load
const isAuthPage = authPage();
if (isAuthPage) {
  import('./core');
} else {
  const url = window.location.hostname;

  const timeout = getTimeout(url);

  waitForElement(getSite(url), timeout)
    .then(() => {
      console.log('Site loaded');
      import('./core');
    })
    .catch(() => {
      // If the site doesn't load in 10 seconds, load the core anyway
      console.log('Site did not load in time');
      import('./core');
    });
}
