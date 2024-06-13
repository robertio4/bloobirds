var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/confetti/src/components/Confetti.tsx", _s = $RefreshSig$();
import __vite__cjsImport0_reactConfetti from "/vendor/.vite-deps-react-confetti.js__v--0eb56f5e.js"; const Confetti = __vite__cjsImport0_reactConfetti.__esModule ? __vite__cjsImport0_reactConfetti.default : __vite__cjsImport0_reactConfetti;
import __vite__cjsImport1_reactUse_lib_useWindowSize from "/vendor/.vite-deps-react-use_lib_useWindowSize.js__v--ed44a36e.js"; const useWindowSize = __vite__cjsImport1_reactUse_lib_useWindowSize.__esModule ? __vite__cjsImport1_reactUse_lib_useWindowSize.default : __vite__cjsImport1_reactUse_lib_useWindowSize;
import { useConfetti } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default _s(() => {
  _s();
  const {
    width,
    height
  } = useWindowSize();
  const {
    show,
    hideConfetti
  } = useConfetti();
  return show.display && /* @__PURE__ */ _jsxDEV(Confetti, {
    width,
    height,
    style: {
      zIndex: 200
    },
    tweenDuration: 1e4,
    numberOfPieces: 500,
    gravity: 0.5,
    colors: ["#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722"],
    recycle: false,
    onConfettiComplete: hideConfetti,
    drawShape: show.bloobirdsShape ? (ctx) => {
      ctx.beginPath();
      ctx.quadraticCurveTo(15.2, 9.3, 13.2, 9.3);
      ctx.quadraticCurveTo(23.1, 9.1, 21.5, 9.3);
      ctx.quadraticCurveTo(26, 9.5, 26.3, 13.9);
      ctx.quadraticCurveTo(26.3, 17.4, 22.3, 18.6);
      ctx.quadraticCurveTo(22.3, 18.8, 22.3, 19.3);
      ctx.quadraticCurveTo(29.9, 18.8, 30.6, 25.9);
      ctx.quadraticCurveTo(30.9, 31.5, 24.2, 33.1);
      ctx.quadraticCurveTo(15.8, 33.2, 13.8, 33.2);
      ctx.quadraticCurveTo(11.7, 33.1, 11.7, 31.6);
      ctx.quadraticCurveTo(11.8, 19.4, 11.8, 11.2);
      ctx.quadraticCurveTo(11.4, 9.3, 13.2, 9.3);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    } : void 0
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 7
  }, void 0);
}, "U3kXBP2E+MeqcCtWr38DqND5iAM=", false, function() {
  return [useWindowSize, useConfetti];
});
