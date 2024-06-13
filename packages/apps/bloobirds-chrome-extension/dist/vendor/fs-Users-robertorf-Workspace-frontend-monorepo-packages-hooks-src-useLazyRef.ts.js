var _s = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport0_react.__esModule ? __vite__cjsImport0_react.default : __vite__cjsImport0_react;
export function useLazyRef(factory) {
  _s();
  const ref = React.useRef(null);
  if (ref.current === null) {
    ref.current = factory();
  }
  return ref;
}
_s(useLazyRef, "QMBuJFIdzLIeqBcFwhMf246mjOM=");
