var _s = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"];
import { useExtensionContext } from "/src/content/components/context.tsx.js";
export const useSubscribeListeners = (bobjectType, mutate) => {
  _s();
  const {
    subscribeListener,
    unsuscribeListener
  } = useExtensionContext();
  useEffect(() => {
    subscribeListener(bobjectType, mutate);
    return () => unsuscribeListener(bobjectType, mutate);
  }, [mutate, bobjectType]);
};
_s(useSubscribeListeners, "uJOm6nhiwZQjmH31zVfZQVUn0LM=", false, function() {
  return [useExtensionContext];
});
