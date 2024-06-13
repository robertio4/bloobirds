var _s = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport0_react["useState"];
import { useEventSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
export const isWebsocketDataActionForWithId = (bobjectType, id, wsMessage) => {
  if (wsMessage.type === "WEBSOCKET_MESSAGE_INCOMING" && wsMessage.data.action === "data" && wsMessage.data.bobjectType === bobjectType) {
    const shortId = id && id.split("/").length === 3 ? id.split("/")[2] : id;
    return wsMessage.data.ids.includes(id) || wsMessage.data.ids.includes(shortId);
  }
  return false;
};
export const useBobjectRefresh = (bobjectId, bobjectType, callback) => {
  _s();
  const [isSubscribed, setIsSubscribed] = useState(false);
  useEventSubscription(`data-${bobjectType}`, (data) => {
    if (isWebsocketDataActionForWithId(bobjectType, bobjectId, {
      type: "WEBSOCKET_MESSAGE_INCOMING",
      data
    })) {
      callback(bobjectType, bobjectId);
      setIsSubscribed(true);
    }
  }, {
    createSubscription: !isSubscribed
  });
};
_s(useBobjectRefresh, "NXtH1e0jQE0vkTuF7OMmU6Fp49Y=", false, function() {
  return [useEventSubscription];
});
