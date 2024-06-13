var _s = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"];
import { isElementLoaded, isWhatsAppPage, insertTextWhatsApp } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { getSelector } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { Actions } from "/src/types/messages.ts.js";
import { normalizeUrl } from "/src/utils/url.ts.js";
const moveWhatsappElement = (sidePeekOpen, hasVepaarExtension) => {
  const widthFactor = hasVepaarExtension ? 0.15 : 0.33;
  const alternativeWidthFactor = hasVepaarExtension ? 0.13 : 0.3;
  if (isWhatsAppPage()) {
    const selector = getSelector(normalizeUrl(window.location.href));
    isElementLoaded(selector).then((element) => {
      if (element) {
        const fullWidth = document.documentElement.clientWidth;
        let padding = "0px";
        if (fullWidth >= 1640) {
          padding = `${fullWidth * widthFactor}px`;
        }
        if (fullWidth < 1640 && fullWidth >= 1440) {
          padding = `${fullWidth * alternativeWidthFactor}px`;
        }
        if (fullWidth < 1440 && fullWidth > 1214 && hasVepaarExtension) {
          padding = "94px";
        }
        element.style.paddingRight = sidePeekOpen ? padding : "0px";
      }
    });
    isElementLoaded("#app > div > div > div:nth-child(5)").then((element) => {
      const elementIsEmpty = element?.querySelector("span")?.innerHTML === "";
      if (element && !elementIsEmpty && !hasVepaarExtension) {
        const fullWidth = document.documentElement.clientWidth;
        let padding = "0px";
        if (fullWidth < 1440) {
          padding = `${fullWidth * 0.33 - 18}px`;
        }
        element.style.marginRight = sidePeekOpen ? padding : "0px";
      }
    });
    isElementLoaded("h1").then((element) => {
      if (element && element.innerText === "WhatsApp Web" && !hasVepaarExtension) {
        const fullWidth = document.documentElement.clientWidth;
        let padding = "0px";
        if (fullWidth < 1440) {
          padding = `${fullWidth * 0.33 - 18}px`;
        }
        const parent = element.parentElement.parentElement.parentElement.parentElement.parentElement;
        parent.style.marginRight = sidePeekOpen ? padding : "0px";
      }
    });
  }
};
export default function useWhatsapp(isMenuOpen, sidePeekEnabled, hasVepaarExtension, hasWhatsappEnabled) {
  _s();
  useEffect(() => {
    const whatsAppPhoneListener = (message) => {
      if (message.action === Actions.InsertPhoneToWhatsApp) {
        setTimeout(() => {
          const forceWsOpenNewPage = false;
          insertTextWhatsApp(forceWsOpenNewPage, "#side div.lexical-rich-text-input > div", message?.phone);
        }, 250);
      }
    };
    if (hasWhatsappEnabled) {
      chrome?.runtime?.onMessage.addListener(whatsAppPhoneListener);
    }
    return () => {
      chrome?.runtime?.onMessage.removeListener(whatsAppPhoneListener);
    };
  }, [hasWhatsappEnabled]);
  useEffect(() => {
    if (hasWhatsappEnabled) {
      moveWhatsappElement(isMenuOpen && sidePeekEnabled, hasVepaarExtension);
      window.addEventListener("resize", () => {
        moveWhatsappElement(isMenuOpen && sidePeekEnabled, hasVepaarExtension);
      });
    }
    return () => {
      window.removeEventListener("resize", () => {
        moveWhatsappElement(isMenuOpen && sidePeekEnabled, hasVepaarExtension);
      });
    };
  }, [isMenuOpen, sidePeekEnabled, hasVepaarExtension, hasWhatsappEnabled]);
}
_s(useWhatsapp, "3ubReDTFssvu4DHeldAg55cW/CI=");
