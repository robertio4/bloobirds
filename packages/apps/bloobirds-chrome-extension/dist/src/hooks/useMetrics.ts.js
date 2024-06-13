import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--276d99b6.js"; const useEffect = __vite__cjsImport0_react["useEffect"];
import * as Sentry from "/vendor/.vite-deps-@sentry_react.js__v--d4423d4f.js";
const sendMessage = (message) => {
  chrome.runtime.sendMessage(message, (request) => {
    Object.keys(request.data).forEach((key) => {
      const value = request.data[key];
      Sentry.metrics.gauge(`memory_usage.${key}`, value, {
        tags: request.tags,
        unit: "byte"
      });
    });
  });
};
const useMetrics = (userId, accountId) => {
  useEffect(() => {
    const getMetrics = () => {
      if (userId && accountId) {
        sendMessage({
          type: "GET_MEMORY_USAGE",
          tags: { userId, accountId }
        });
      }
    };
    getMetrics();
    const interval = setInterval(() => {
      getMetrics();
    }, 30 * 60 * 1e3);
    return () => {
      clearInterval(interval);
    };
  }, [userId, accountId]);
};
export default useMetrics;
