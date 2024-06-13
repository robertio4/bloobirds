var _s = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport0_react.__esModule ? __vite__cjsImport0_react.default : __vite__cjsImport0_react;
export const useTogglerState = (initialState = false) => {
  _s();
  const [state, setState] = React.useState(initialState);
  const toggle = () => setState(!state);
  return [state, toggle];
};
_s(useTogglerState, "2/eSVXfk2V5ZKttKXeUPXMa6Sd8=");
