import * as ReactDOM from 'react-dom';

import App from '../content/components/app';
import { isLinkedinOrSalesNav } from '../utils/url';
//import { injectBuyerPersonaAffinity } from './linkedin/buyerPersonaAffinityInjector';
import { linkedinMessagesFromBBInjector } from './linkedin/linkedinMessagesFromBBInjector';
import { injectLinkedInTemplateSelector } from './linkedin/linkedinTemplatesInjector';
import { injectSalesNavigatorTemplateSelector } from './linkedin/salesNavigatorTemplates';

function injectApp() {
  // If the app is localhost:3000 (with the port, do not inject it)
  if (window.location.hostname === 'localhost') {
    //check also the port
    if (window.location.port === '3000') {
      return;
    }
  }
  const root = document.createElement('div');
  root.setAttribute('id', 'bb-root');
  document.querySelector('body').appendChild(root);
  ReactDOM.render(<App />, root);
}

// Commented because we changed to use the template one, if it is working in 2-3 months, then delete.
/*function injectMessagesScrapper() {
  if (isLinkedinOrSalesNav(window.location.hostname)) {
    const root = document.createElement('div');
    root.setAttribute('id', 'bb-root-messages');
    document.querySelector('body').appendChild(root);
    ReactDOM.render(<InjectMessagesScrapperApp />, root);
  }
}*/

export function inject() {
  injectApp();

  if (isLinkedinOrSalesNav(window.location.hostname)) {
    injectLinkedInTemplateSelector();
    //injectBuyerPersonaAffinity();
    injectSalesNavigatorTemplateSelector();
    linkedinMessagesFromBBInjector();
  }
  //injectMessagesScrapper(); --> OLD Message scrapper
}
