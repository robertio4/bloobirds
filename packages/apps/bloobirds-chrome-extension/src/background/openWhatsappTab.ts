import { Actions } from '../types/messages';

chrome?.runtime?.onMessage.addListener(request => {
  if (request.action === 'openWhatsappTab') {
    const { url, phoneNumber, forceOpenNewPage = false } = request;

    // Usamos la API chrome.tabs para obtener información sobre las pestañas de WhatsApp
    chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, tabs => {
      // Verifica si hay una pestaña abierta
      if (tabs.length > 0) {
        if (forceOpenNewPage) {
          // Actualiza la URL de la pestaña existente con nuevos parámetros
          chrome.tabs.update(tabs[0].id, { url, active: true });
        } else {
          chrome?.tabs?.sendMessage(tabs[0].id, {
            action: Actions.InsertPhoneToWhatsApp,
            phone: phoneNumber,
          });
          chrome.tabs.update(tabs[0].id, { active: true });
        }
      } else {
        // Si no hay pestaña abierta, abre una nueva con la URL recibida
        chrome.tabs.create({ url });
      }
    });

    return true;
  }
});
