import {
  createElementAs,
  isCollapsed,
  toDOMRange,
  usePlateEditorState
} from "/vendor/.vite-deps-chunk-HGZEDJTY.js__v--ecb98152.js";
import {
  useReadOnly,
  useSelected
} from "/vendor/.vite-deps-chunk-73EC23W7.js__v--ecb98152.js";
import {
  require_react_dom
} from "/vendor/.vite-deps-chunk-3UKJDGBQ.js__v--ecb98152.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--ecb98152.js";
import {
  __toESM
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--ecb98152.js";

// ../../../node_modules/@floating-ui/core/dist/floating-ui.core.esm.js
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "x" : "y";
}
function getLengthFromAxis(axis) {
  return axis === "y" ? "height" : "width";
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === "x";
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  if (true) {
    if (platform2 == null) {
      console.error(["Floating UI: `platform` property was not passed to config. If you", "want to use Floating UI on the web, install @floating-ui/dom", "instead of the /core package. Otherwise, you can create your own", "`platform`: https://floating-ui.com/docs/platform"].join(" "));
    }
    if (middleware.filter((_ref) => {
      let {
        name
      } = _ref;
      return name === "autoPlacement" || name === "flip";
    }).length > 1) {
      throw new Error(["Floating UI: duplicate `flip` and/or `autoPlacement`", "middleware detected. This will lead to an infinite loop. Ensure only", "one of either has been passed to the `middleware` array."].join(" "));
    }
  }
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < middleware.length; i++) {
    const {
      name,
      fn
    } = middleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (true) {
      if (resetCount > 50) {
        console.warn(["Floating UI: The middleware lifecycle appears to be running in an", "infinite loop. This is usually caused by a `reset` continually", "being returned without a break condition."].join(" "));
      }
    }
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getSideObjectFromPadding(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
async function detectOverflow(middlewareArguments, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = middlewareArguments;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = options;
  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: elementContext === "floating" ? {
      ...rects.floating,
      x,
      y
    } : rects.reference,
    offsetParent: await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating)),
    strategy
  }) : rects[elementContext]);
  return {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
}
var min = Math.min;
var max = Math.max;
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(middlewareArguments) {
    const {
      element,
      padding = 0
    } = options != null ? options : {};
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2
    } = middlewareArguments;
    if (element == null) {
      if (true) {
        console.warn("Floating UI: No `element` was passed to the `arrow` middleware.");
      }
      return {};
    }
    const paddingObject = getSideObjectFromPadding(padding);
    const coords = {
      x,
      y
    };
    const axis = getMainAxisFromPlacement(placement);
    const alignment = getAlignment(placement);
    const length = getLengthFromAxis(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const minProp = axis === "y" ? "top" : "left";
    const maxProp = axis === "y" ? "bottom" : "right";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    if (clientSize === 0) {
      clientSize = rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const min3 = paddingObject[minProp];
    const max3 = clientSize - arrowDimensions[length] - paddingObject[maxProp];
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = within(min3, center, max3);
    const alignmentPadding = alignment === "start" ? paddingObject[minProp] : paddingObject[maxProp];
    const shouldAddOffset = alignmentPadding > 0 && center !== offset2 && rects.reference[length] <= rects.floating[length];
    const alignmentOffset = shouldAddOffset ? center < min3 ? min3 - center : max3 - center : 0;
    return {
      [axis]: coords[axis] - alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2
      }
    };
  }
});
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (matched) => hash$1[matched]);
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (matched) => hash[matched]);
}
var sides = ["top", "right", "bottom", "left"];
var allPlacements = sides.reduce((acc, side) => acc.concat(side, side + "-start", side + "-end"), []);
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
var autoPlacement = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    async fn(middlewareArguments) {
      var _middlewareData$autoP, _middlewareData$autoP2, _middlewareData$autoP3, _middlewareData$autoP4, _placementsSortedByLe;
      const {
        x,
        y,
        rects,
        middlewareData,
        placement,
        platform: platform2,
        elements
      } = middlewareArguments;
      const {
        alignment = null,
        allowedPlacements = allPlacements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = options;
      const placements = getPlacementList(alignment, autoAlignment, allowedPlacements);
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const currentIndex = (_middlewareData$autoP = (_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.index) != null ? _middlewareData$autoP : 0;
      const currentPlacement = placements[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const {
        main,
        cross
      } = getAlignmentSides(currentPlacement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
      if (placement !== currentPlacement) {
        return {
          x,
          y,
          reset: {
            placement: placements[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[main], overflow[cross]];
      const allOverflows = [...(_middlewareData$autoP3 = (_middlewareData$autoP4 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP4.overflows) != null ? _middlewareData$autoP3 : [], {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByLeastOverflow = allOverflows.slice().sort((a, b) => a.overflows[0] - b.overflows[0]);
      const placementThatFitsOnAllSides = (_placementsSortedByLe = placementsSortedByLeastOverflow.find((_ref) => {
        let {
          overflows
        } = _ref;
        return overflows.every((overflow2) => overflow2 <= 0);
      })) == null ? void 0 : _placementsSortedByLe.placement;
      const resetPlacement = placementThatFitsOnAllSides != null ? placementThatFitsOnAllSides : placementsSortedByLeastOverflow[0].placement;
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(middlewareArguments) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        flipAlignment = true,
        ...detectOverflowOptions
      } = options;
      const side = getSide(placement);
      const isBasePlacement = side === initialPlacement;
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const {
          main,
          cross
        } = getAlignmentSides(placement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
        overflows.push(overflow[main], overflow[cross]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip$, _middlewareData$flip2;
        const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) != null ? _middlewareData$flip$ : 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = "bottom";
        switch (fallbackStrategy) {
          case "bestFit": {
            var _overflowsData$map$so;
            const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0].placement;
            if (placement2) {
              resetPlacement = placement2;
            }
            break;
          }
          case "initialPlacement":
            resetPlacement = initialPlacement;
            break;
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(_temp) {
  let {
    strategy = "referenceHidden",
    ...detectOverflowOptions
  } = _temp === void 0 ? {} : _temp;
  return {
    name: "hide",
    async fn(middlewareArguments) {
      const {
        rects
      } = middlewareArguments;
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(middlewareArguments, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(middlewareArguments, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
async function convertValueToCoords(middlewareArguments, value) {
  const {
    placement,
    platform: platform2,
    elements
  } = middlewareArguments;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getMainAxisFromPlacement(placement) === "x";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = typeof value === "function" ? value(middlewareArguments) : value;
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(value) {
  if (value === void 0) {
    value = 0;
  }
  return {
    name: "offset",
    options: value,
    async fn(middlewareArguments) {
      const {
        x,
        y
      } = middlewareArguments;
      const diffCoords = await convertValueToCoords(middlewareArguments, value);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};
function getCrossAxis(axis) {
  return axis === "x" ? "y" : "x";
}
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(middlewareArguments) {
      const {
        x,
        y,
        placement
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = options;
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const mainAxis = getMainAxisFromPlacement(getSide(placement));
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min3 = mainAxisCoord + overflow[minSide];
        const max3 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = within(min3, mainAxisCoord, max3);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min3 = crossAxisCoord + overflow[minSide];
        const max3 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = within(min3, crossAxisCoord, max3);
      }
      const limitedCoords = limiter.fn({
        ...middlewareArguments,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(middlewareArguments) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = middlewareArguments;
      const {
        offset: offset2 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = options;
      const coords = {
        x,
        y
      };
      const mainAxis = getMainAxisFromPlacement(placement);
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = typeof offset2 === "function" ? offset2({
        ...rects,
        placement
      }) : offset2;
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2, _middlewareData$offse3, _middlewareData$offse4;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = ["top", "left"].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? (_middlewareData$offse = (_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) != null ? _middlewareData$offse : 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : (_middlewareData$offse3 = (_middlewareData$offse4 = middlewareData.offset) == null ? void 0 : _middlewareData$offse4[crossAxis]) != null ? _middlewareData$offse3 : 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(middlewareArguments) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = middlewareArguments;
      const {
        apply,
        ...detectOverflowOptions
      } = options;
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const xMin = max(overflow.left, 0);
      const xMax = max(overflow.right, 0);
      const yMin = max(overflow.top, 0);
      const yMax = max(overflow.bottom, 0);
      const dimensions = {
        availableHeight: rects.floating.height - (["left", "right"].includes(placement) ? 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom)) : overflow[heightSide]),
        availableWidth: rects.floating.width - (["top", "bottom"].includes(placement) ? 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right)) : overflow[widthSide])
      };
      const prevDimensions = await platform2.getDimensions(elements.floating);
      apply == null ? void 0 : apply({
        ...middlewareArguments,
        ...dimensions
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (prevDimensions.width !== nextDimensions.width || prevDimensions.height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
var inline = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "inline",
    options,
    async fn(middlewareArguments) {
      var _await$platform$getCl;
      const {
        placement,
        elements,
        rects,
        platform: platform2,
        strategy
      } = middlewareArguments;
      const {
        padding = 2,
        x,
        y
      } = options;
      const fallback = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
        rect: rects.reference,
        offsetParent: await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating)),
        strategy
      }) : rects.reference);
      const clientRects = (_await$platform$getCl = await (platform2.getClientRects == null ? void 0 : platform2.getClientRects(elements.reference))) != null ? _await$platform$getCl : [];
      const paddingObject = getSideObjectFromPadding(padding);
      function getBoundingClientRect2() {
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          var _clientRects$find;
          return (_clientRects$find = clientRects.find((rect) => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom)) != null ? _clientRects$find : fallback;
        }
        if (clientRects.length >= 2) {
          if (getMainAxisFromPlacement(placement) === "x") {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === "top";
            const top2 = firstRect.top;
            const bottom2 = lastRect.bottom;
            const left2 = isTop ? firstRect.left : lastRect.left;
            const right2 = isTop ? firstRect.right : lastRect.right;
            const width2 = right2 - left2;
            const height2 = bottom2 - top2;
            return {
              top: top2,
              bottom: bottom2,
              left: left2,
              right: right2,
              width: width2,
              height: height2,
              x: left2,
              y: top2
            };
          }
          const isLeftSide = getSide(placement) === "left";
          const maxRight = max(...clientRects.map((rect) => rect.right));
          const minLeft = min(...clientRects.map((rect) => rect.left));
          const measureRects = clientRects.filter((rect) => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform2.getElementRects({
        reference: {
          getBoundingClientRect: getBoundingClientRect2
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};

// ../../../node_modules/@floating-ui/dom/dist/floating-ui.dom.esm.js
function isWindow(value) {
  return value && value.document && value.location && value.alert && value.setInterval;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (!isWindow(node)) {
    const ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeName(node) {
  return isWindow(node) ? "" : node ? (node.nodeName || "").toLowerCase() : "";
}
function getUAString() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map((item) => item.brand + "/" + item.version).join(" ");
  }
  return navigator.userAgent;
}
function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow(value).Element;
}
function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const isFirefox = /firefox/i.test(getUAString());
  const css = getComputedStyle$1(element);
  return css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].includes(css.willChange) || isFirefox && css.willChange === "filter" || isFirefox && (css.filter ? css.filter !== "none" : false);
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
var min2 = Math.min;
var max2 = Math.max;
var round = Math.round;
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  const win = isElement(element) ? getWindow(element) : window;
  const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  const x = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scaleX;
  const y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scaleY;
  const width = clientRect.width / scaleX;
  const height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function isScaled(element) {
  const rect = getBoundingClientRect(element);
  return round(rect.width) !== element.offsetWidth || round(rect.height) !== element.offsetHeight;
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(
    element,
    isOffsetParentAnElement && isScaled(offsetParent),
    strategy === "fixed"
  );
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  return node.assignedSlot || node.parentNode || (isShadowRoot(node) ? node.host : null) || getDocumentElement(node);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && !["html", "body"].includes(getNodeName(currentNode))) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  const window2 = getWindow(element);
  let offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getDimensions(element) {
  if (isHTMLElement(element)) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  const rect = getBoundingClientRect(element);
  return {
    width: rect.width,
    height: rect.height
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    ...rect,
    x: rect.x - scroll.scrollLeft + offsets.x,
    y: rect.y - scroll.scrollTop + offsets.y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  const width = max2(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  const height = max2(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x += max2(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (["html", "body", "#document"].includes(getNodeName(parentNode))) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollableAncestor);
  const target = isBody ? [win].concat(win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []) : scrollableAncestor;
  const updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(getOverflowAncestors(target));
}
function contains(parent, child) {
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    do {
      if (next && parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, false, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  return {
    top,
    left,
    x: left,
    y: top,
    right: left + element.clientWidth,
    bottom: top + element.clientHeight,
    width: element.clientWidth,
    height: element.clientHeight
  };
}
function getClientRectFromClippingAncestor(element, clippingParent, strategy) {
  if (clippingParent === "viewport") {
    return rectToClientRect(getViewportRect(element, strategy));
  }
  if (isElement(clippingParent)) {
    return getInnerBoundingClientRect(clippingParent, strategy);
  }
  return rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingAncestors(element) {
  const clippingAncestors = getOverflowAncestors(element);
  const canEscapeClipping = ["absolute", "fixed"].includes(getComputedStyle$1(element).position);
  const clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingAncestors.filter((clippingAncestors2) => isElement(clippingAncestors2) && contains(clippingAncestors2, clipperElement) && getNodeName(clippingAncestors2) !== "body");
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const mainClippingAncestors = boundary === "clippingAncestors" ? getClippingAncestors(element) : [].concat(boundary);
  const clippingAncestors = [...mainClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max2(rect.top, accRect.top);
    accRect.right = min2(rect.right, accRect.right);
    accRect.bottom = min2(rect.bottom, accRect.bottom);
    accRect.left = max2(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
var platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getElementRects: (_ref) => {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    return {
      reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
      floating: {
        ...getDimensions(floating),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (element) => Array.from(element.getClientRects()),
  isRTL: (element) => getComputedStyle$1(element).direction === "rtl"
};
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll: _ancestorScroll = true,
    ancestorResize: _ancestorResize = true,
    elementResize = true,
    animationFrame = false
  } = options;
  const ancestorScroll = _ancestorScroll && !animationFrame;
  const ancestorResize = _ancestorResize && !animationFrame;
  const ancestors = ancestorScroll || ancestorResize ? [...isElement(reference) ? getOverflowAncestors(reference) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  let observer = null;
  if (elementResize) {
    let initialUpdate = true;
    observer = new ResizeObserver(() => {
      if (!initialUpdate) {
        update();
      }
      initialUpdate = false;
    });
    isElement(reference) && !animationFrame && observer.observe(reference);
    observer.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _observer;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    (_observer = observer) == null ? void 0 : _observer.disconnect();
    observer = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var computePosition2 = (reference, floating, options) => computePosition(reference, floating, {
  platform,
  ...options
});

// ../../../node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.esm.js
var React = __toESM(require_react());
var import_react = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());
var index = typeof document !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length, i, keys;
  if (a && b && typeof a == "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function useLatestRef(value) {
  const ref = React.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(_temp) {
  let {
    middleware,
    placement = "bottom",
    strategy = "absolute",
    whileElementsMounted
  } = _temp === void 0 ? {} : _temp;
  const reference = React.useRef(null);
  const floating = React.useRef(null);
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const cleanupRef = React.useRef(null);
  const [data, setData] = React.useState({
    x: null,
    y: null,
    strategy,
    placement,
    middlewareData: {}
  });
  const [latestMiddleware, setLatestMiddleware] = React.useState(middleware);
  if (!deepEqual(latestMiddleware == null ? void 0 : latestMiddleware.map((_ref) => {
    let {
      options
    } = _ref;
    return options;
  }), middleware == null ? void 0 : middleware.map((_ref2) => {
    let {
      options
    } = _ref2;
    return options;
  }))) {
    setLatestMiddleware(middleware);
  }
  const update = React.useCallback(() => {
    if (!reference.current || !floating.current) {
      return;
    }
    computePosition2(reference.current, floating.current, {
      middleware: latestMiddleware,
      placement,
      strategy
    }).then((data2) => {
      if (isMountedRef.current) {
        ReactDOM.flushSync(() => {
          setData(data2);
        });
      }
    });
  }, [latestMiddleware, placement, strategy]);
  index(() => {
    if (isMountedRef.current) {
      update();
    }
  }, [update]);
  const isMountedRef = React.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const runElementMountCallback = React.useCallback(() => {
    if (typeof cleanupRef.current === "function") {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (reference.current && floating.current) {
      if (whileElementsMountedRef.current) {
        const cleanupFn = whileElementsMountedRef.current(reference.current, floating.current, update);
        cleanupRef.current = cleanupFn;
      } else {
        update();
      }
    }
  }, [update, whileElementsMountedRef]);
  const setReference = React.useCallback((node) => {
    reference.current = node;
    runElementMountCallback();
  }, [runElementMountCallback]);
  const setFloating = React.useCallback((node) => {
    floating.current = node;
    runElementMountCallback();
  }, [runElementMountCallback]);
  const refs = React.useMemo(() => ({
    reference,
    floating
  }), []);
  return React.useMemo(() => ({
    ...data,
    update,
    refs,
    reference: setReference,
    floating: setFloating
  }), [data, update, refs, setReference, setFloating]);
}
var arrow2 = (options) => {
  const {
    element,
    padding
  } = options;
  function isRef(value) {
    return Object.prototype.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(args) {
      if (isRef(element)) {
        if (element.current != null) {
          return arrow({
            element: element.current,
            padding
          }).fn(args);
        }
        return {};
      } else if (element) {
        return arrow({
          element,
          padding
        }).fn(args);
      }
      return {};
    }
  };
};

// ../../../node_modules/@floating-ui/react-dom-interactions/dist/floating-ui.react-dom-interactions.esm.js
var React2 = __toESM(require_react());
var import_react2 = __toESM(require_react());
var import_react_dom2 = __toESM(require_react_dom());
var index2 = typeof document !== "undefined" ? import_react2.useLayoutEffect : import_react2.useEffect;
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null ? void 0 : _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...map.get(event) || [], listener]);
    },
    off(event, listener) {
      map.set(event, (map.get(event) || []).filter((l) => l !== listener));
    }
  };
}
var serverHandoffComplete = false;
var count = 0;
var genId = () => "floating-ui-" + count++;
function useFloatingId() {
  const [id, setId] = React2.useState(() => serverHandoffComplete ? genId() : void 0);
  index2(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  React2.useEffect(() => {
    if (!serverHandoffComplete) {
      serverHandoffComplete = true;
    }
  }, []);
  return id;
}
var useReactId = React2["useId".toString()];
var useId = useReactId != null ? useReactId : useFloatingId;
var FloatingNodeContext = React2.createContext(null);
var FloatingTreeContext = React2.createContext(null);
var useFloatingParentNodeId = () => {
  var _React$useContext$id, _React$useContext;
  return (_React$useContext$id = (_React$useContext = React2.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) != null ? _React$useContext$id : null;
};
var useFloatingTree = () => React2.useContext(FloatingTreeContext);
var useFloatingNodeId = () => {
  const id = useId();
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  index2(() => {
    const node = {
      id,
      parentId
    };
    tree == null ? void 0 : tree.addNode(node);
    return () => {
      tree == null ? void 0 : tree.removeNode(node);
    };
  }, [tree, id, parentId]);
  return id;
};
function getDocument(floating) {
  var _floating$ownerDocume;
  return (_floating$ownerDocume = floating == null ? void 0 : floating.ownerDocument) != null ? _floating$ownerDocume : document;
}
function getWindow2(value) {
  var _getDocument$defaultV;
  return (_getDocument$defaultV = getDocument(value).defaultView) != null ? _getDocument$defaultV : window;
}
function isElement2(value) {
  return value ? value instanceof getWindow2(value).Element : false;
}
function isHTMLElement2(value) {
  return value ? value instanceof getWindow2(value).HTMLElement : false;
}
function useFloating2(_temp) {
  let {
    open = false,
    onOpenChange = () => {
    },
    whileElementsMounted,
    placement,
    middleware,
    strategy,
    nodeId
  } = _temp === void 0 ? {} : _temp;
  const tree = useFloatingTree();
  const domReferenceRef = React2.useRef(null);
  const dataRef = React2.useRef({});
  const events = React2.useState(() => createPubSub())[0];
  const floating = useFloating({
    placement,
    middleware,
    strategy,
    whileElementsMounted
  });
  const refs = React2.useMemo(() => ({
    ...floating.refs,
    domReference: domReferenceRef
  }), [floating.refs]);
  const context = React2.useMemo(() => ({
    ...floating,
    refs,
    dataRef,
    nodeId,
    events,
    open,
    onOpenChange
  }), [floating, nodeId, events, open, onOpenChange, refs]);
  index2(() => {
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  const {
    reference
  } = floating;
  const setReference = React2.useCallback((node) => {
    if (isElement2(node) || node === null) {
      context.refs.domReference.current = node;
    }
    reference(node);
  }, [reference, context.refs]);
  return React2.useMemo(() => ({
    ...floating,
    context,
    refs,
    reference: setReference
  }), [floating, refs, context, setReference]);
}
function mergeProps(userProps, propsList, elementKey) {
  const map = /* @__PURE__ */ new Map();
  return {
    ...elementKey === "floating" && {
      tabIndex: -1
    },
    ...userProps,
    ...propsList.map((value) => value ? value[elementKey] : null).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }
      Object.entries(props).forEach((_ref) => {
        let [key, value] = _ref;
        if (key.indexOf("on") === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }
          if (typeof value === "function") {
            var _map$get;
            (_map$get = map.get(key)) == null ? void 0 : _map$get.push(value);
          }
          acc[key] = function() {
            var _map$get2;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.forEach((fn) => fn(...args));
          };
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {})
  };
}
var useInteractions = function(propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  return {
    getReferenceProps: (userProps) => mergeProps(userProps, propsList, "reference"),
    getFloatingProps: (userProps) => mergeProps(userProps, propsList, "floating"),
    getItemProps: (userProps) => mergeProps(userProps, propsList, "item")
  };
};
function getChildren(nodes, id) {
  var _nodes$filter;
  let allChildren = (_nodes$filter = nodes.filter((node) => {
    var _node$context;
    return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
  })) != null ? _nodes$filter : [];
  let currentChildren = allChildren;
  while (currentChildren.length) {
    var _nodes$filter2;
    currentChildren = (_nodes$filter2 = nodes.filter((node) => {
      var _currentChildren;
      return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some((n) => {
        var _node$context2;
        return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
      });
    })) != null ? _nodes$filter2 : [];
    allChildren = allChildren.concat(currentChildren);
  }
  return allChildren;
}
function isPointInPolygon(point, polygon) {
  const [x, y] = point;
  let isInside = false;
  const length = polygon.length;
  for (let i = 0, j = length - 1; i < length; j = i++) {
    const [xi, yi] = polygon[i] || [0, 0];
    const [xj, yj] = polygon[j] || [0, 0];
    const intersect = yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      isInside = !isInside;
    }
  }
  return isInside;
}
function safePolygon(_temp) {
  let {
    restMs = 0,
    buffer = 0.5,
    debug = null
  } = _temp === void 0 ? {} : _temp;
  let timeoutId;
  let polygonIsDestroyed = false;
  return (_ref) => {
    let {
      x,
      y,
      placement,
      refs,
      onClose,
      nodeId,
      tree,
      leave = false
    } = _ref;
    return function onPointerMove(event) {
      var _refs$domReference$cu, _refs$floating$curren;
      clearTimeout(timeoutId);
      function close() {
        clearTimeout(timeoutId);
        onClose();
      }
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }
      const {
        clientX,
        clientY
      } = event;
      const target = "composedPath" in event ? event.composedPath()[0] : event.target;
      const targetNode = target;
      if (event.type === "pointermove" && (_refs$domReference$cu = refs.domReference.current) != null && _refs$domReference$cu.contains(targetNode)) {
        return;
      }
      if (tree && getChildren(tree.nodesRef.current, nodeId).some((_ref2) => {
        let {
          context
        } = _ref2;
        return context == null ? void 0 : context.open;
      })) {
        return;
      }
      if ((_refs$floating$curren = refs.floating.current) != null && _refs$floating$curren.contains(targetNode) && !leave) {
        polygonIsDestroyed = true;
        return;
      }
      if (!refs.domReference.current || !refs.floating.current || placement == null || x == null || y == null) {
        return;
      }
      const refRect = refs.domReference.current.getBoundingClientRect();
      const rect = refs.floating.current.getBoundingClientRect();
      const side = placement.split("-")[0];
      const cursorLeaveFromRight = x > rect.right - rect.width / 2;
      const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
      if (side === "top" && y >= refRect.bottom - 1 || side === "bottom" && y <= refRect.top + 1 || side === "left" && x >= refRect.right - 1 || side === "right" && x <= refRect.left + 1) {
        return close();
      }
      switch (side) {
        case "top":
          if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= refRect.top + 1) {
            return;
          }
          break;
        case "bottom":
          if (clientX >= rect.left && clientX <= rect.right && clientY >= refRect.bottom - 1 && clientY <= rect.bottom) {
            return;
          }
          break;
        case "left":
          if (clientX >= rect.left && clientX <= refRect.left + 1 && clientY >= rect.top && clientY <= rect.bottom) {
            return;
          }
          break;
        case "right":
          if (clientX >= refRect.right - 1 && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
            return;
          }
          break;
      }
      if (polygonIsDestroyed) {
        return close();
      }
      function getPolygon(_ref3) {
        let [x2, y2] = _ref3;
        const isFloatingWider = rect.width > refRect.width;
        const isFloatingTaller = rect.height > refRect.height;
        switch (side) {
          case "top": {
            const cursorPointOne = [isFloatingWider ? x2 + buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 + buffer + 1];
            const cursorPointTwo = [isFloatingWider ? x2 - buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 + buffer + 1];
            const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.bottom - buffer : isFloatingWider ? rect.bottom - buffer : rect.top], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.bottom - buffer : rect.top : rect.bottom - buffer]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
          case "bottom": {
            const cursorPointOne = [isFloatingWider ? x2 + buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 - buffer];
            const cursorPointTwo = [isFloatingWider ? x2 - buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 - buffer];
            const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.top + buffer : isFloatingWider ? rect.top + buffer : rect.bottom], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.top + buffer : rect.bottom : rect.top + buffer]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
          case "left": {
            const cursorPointOne = [x2 + buffer + 1, isFloatingTaller ? y2 + buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const cursorPointTwo = [x2 + buffer + 1, isFloatingTaller ? y2 - buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const commonPoints = [[cursorLeaveFromBottom ? rect.right - buffer : isFloatingTaller ? rect.right - buffer : rect.left, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.right - buffer : rect.left : rect.right - buffer, rect.bottom]];
            return [...commonPoints, cursorPointOne, cursorPointTwo];
          }
          case "right": {
            const cursorPointOne = [x2 - buffer, isFloatingTaller ? y2 + buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const cursorPointTwo = [x2 - buffer, isFloatingTaller ? y2 - buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const commonPoints = [[cursorLeaveFromBottom ? rect.left + buffer : isFloatingTaller ? rect.left + buffer : rect.right, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.left + buffer : rect.right : rect.left + buffer, rect.bottom]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
        }
      }
      const poly = getPolygon([x, y]);
      if (true) {
        debug == null ? void 0 : debug(poly.slice(0, 4).join(", "));
      }
      if (!isPointInPolygon([clientX, clientY], poly)) {
        close();
      } else if (restMs) {
        timeoutId = setTimeout(onClose, restMs);
      }
    };
  };
}
var DEFAULT_ID = "floating-ui-root";
var useFloatingPortalNode = function(_temp) {
  let {
    id = DEFAULT_ID,
    enabled = true
  } = _temp === void 0 ? {} : _temp;
  const [portalEl, setPortalEl] = React2.useState(null);
  index2(() => {
    if (!enabled) {
      return;
    }
    const rootNode = document.getElementById(id);
    if (rootNode) {
      setPortalEl(rootNode);
    } else {
      const newPortalEl = document.createElement("div");
      newPortalEl.id = id;
      setPortalEl(newPortalEl);
      if (!document.body.contains(newPortalEl)) {
        document.body.appendChild(newPortalEl);
      }
    }
  }, [id, enabled]);
  return portalEl;
};
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var identifier = "data-floating-ui-scroll-lock";
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
var FloatingOverlay = React2.forwardRef(function FloatingOverlay2(_ref, ref) {
  let {
    lockScroll = false,
    ...rest
  } = _ref;
  index2(() => {
    var _window$visualViewpor, _window$visualViewpor2, _window$visualViewpor3, _window$visualViewpor4;
    if (!lockScroll) {
      return;
    }
    const alreadyLocked = document.body.hasAttribute(identifier);
    if (alreadyLocked) {
      return;
    }
    document.body.setAttribute(identifier, "");
    const scrollbarX = Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;
    const paddingProp = scrollbarX ? "paddingLeft" : "paddingRight";
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (!/iP(hone|ad|od)|iOS/.test(getPlatform())) {
      Object.assign(document.body.style, {
        overflow: "hidden",
        [paddingProp]: scrollbarWidth + "px"
      });
      return () => {
        document.body.removeAttribute(identifier);
        Object.assign(document.body.style, {
          overflow: "",
          [paddingProp]: ""
        });
      };
    }
    const offsetLeft = (_window$visualViewpor = (_window$visualViewpor2 = window.visualViewport) == null ? void 0 : _window$visualViewpor2.offsetLeft) != null ? _window$visualViewpor : 0;
    const offsetTop = (_window$visualViewpor3 = (_window$visualViewpor4 = window.visualViewport) == null ? void 0 : _window$visualViewpor4.offsetTop) != null ? _window$visualViewpor3 : 0;
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;
    Object.assign(document.body.style, {
      position: "fixed",
      overflow: "hidden",
      top: -(scrollY - Math.floor(offsetTop)) + "px",
      left: -(scrollX - Math.floor(offsetLeft)) + "px",
      right: "0",
      [paddingProp]: scrollbarWidth + "px"
    });
    return () => {
      Object.assign(document.body.style, {
        position: "",
        overflow: "",
        top: "",
        left: "",
        right: "",
        [paddingProp]: ""
      });
      document.body.removeAttribute(identifier);
      window.scrollTo(scrollX, scrollY);
    };
  }, [lockScroll]);
  return React2.createElement("div", _extends({
    ref
  }, rest, {
    style: {
      position: "fixed",
      overflow: "auto",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...rest.style
    }
  }));
});
function activeElement(doc) {
  let activeElement2 = doc.activeElement;
  while (((_activeElement = activeElement2) == null ? void 0 : (_activeElement$shadow = _activeElement.shadowRoot) == null ? void 0 : _activeElement$shadow.activeElement) != null) {
    var _activeElement, _activeElement$shadow;
    activeElement2 = activeElement2.shadowRoot.activeElement;
  }
  return activeElement2;
}
var TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function isTypeableElement(element) {
  return isHTMLElement2(element) && element.matches(TYPEABLE_SELECTOR);
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
function useLatestRef2(value) {
  const ref = (0, import_react2.useRef)(value);
  index2(() => {
    ref.current = value;
  });
  return ref;
}
var SELECTOR = "select:not([disabled]),a[href],button:not([disabled]),[tabindex],iframe,object,embed,area[href],audio[controls],video[controls]," + TYPEABLE_SELECTOR;
var FocusGuard = React2.forwardRef(function FocusGuard2(props, ref) {
  return React2.createElement("span", _extends({}, props, {
    ref,
    tabIndex: 0,
    style: {
      position: "fixed",
      opacity: "0",
      pointerEvents: "none",
      outline: "0"
    }
  }));
});
function usePrevious(value) {
  const ref = (0, import_react2.useRef)();
  index2(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
function getDelay(value, prop, pointerType) {
  if (pointerType && pointerType !== "mouse") {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  return value == null ? void 0 : value[prop];
}
var useHover = function(context, _temp) {
  let {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0
  } = _temp === void 0 ? {} : _temp;
  const {
    open,
    onOpenChange,
    dataRef,
    events,
    refs
  } = context;
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const onOpenChangeRef = useLatestRef2(onOpenChange);
  const handleCloseRef = useLatestRef2(handleClose);
  const previousOpen = usePrevious(open);
  const pointerTypeRef = React2.useRef();
  const timeoutRef = React2.useRef();
  const handlerRef = React2.useRef();
  const restTimeoutRef = React2.useRef();
  const blockMouseMoveRef = React2.useRef(true);
  const performedPointerEventsMutationRef = React2.useRef(false);
  React2.useEffect(() => {
    if (!enabled) {
      return;
    }
    function onDismiss() {
      clearTimeout(timeoutRef.current);
      clearTimeout(restTimeoutRef.current);
      blockMouseMoveRef.current = true;
    }
    events.on("dismiss", onDismiss);
    return () => {
      events.off("dismiss", onDismiss);
    };
  }, [enabled, events, refs]);
  React2.useEffect(() => {
    if (!enabled || !handleCloseRef.current) {
      return;
    }
    function onLeave() {
      var _dataRef$current$open;
      if ((_dataRef$current$open = dataRef.current.openEvent) != null && _dataRef$current$open.type.includes("mouse")) {
        onOpenChangeRef.current(false);
      }
    }
    const html = getDocument(refs.floating.current).documentElement;
    html.addEventListener("mouseleave", onLeave);
    return () => {
      html.removeEventListener("mouseleave", onLeave);
    };
  }, [refs, onOpenChangeRef, enabled, handleCloseRef, dataRef]);
  const closeWithDelay = React2.useCallback(function(runElseBranch) {
    if (runElseBranch === void 0) {
      runElseBranch = true;
    }
    const closeDelay = getDelay(delay, "close", pointerTypeRef.current);
    if (closeDelay && !handlerRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onOpenChangeRef.current(false), closeDelay);
    } else if (runElseBranch) {
      clearTimeout(timeoutRef.current);
      onOpenChangeRef.current(false);
    }
  }, [delay, onOpenChangeRef]);
  const cleanupPointerMoveHandler = React2.useCallback(() => {
    if (handlerRef.current) {
      getDocument(refs.floating.current).removeEventListener("pointermove", handlerRef.current);
      handlerRef.current = void 0;
    }
  }, [refs]);
  const clearPointerEvents = React2.useCallback(() => {
    getDocument(refs.floating.current).body.style.pointerEvents = "";
    performedPointerEventsMutationRef.current = false;
  }, [refs]);
  React2.useEffect(() => {
    if (!enabled) {
      return;
    }
    function onMouseEnter(event) {
      clearTimeout(timeoutRef.current);
      blockMouseMoveRef.current = false;
      if (open || mouseOnly && pointerTypeRef.current !== "mouse" || restMs > 0 && getDelay(delay, "open") === 0) {
        return;
      }
      dataRef.current.openEvent = event;
      const openDelay = getDelay(delay, "open", pointerTypeRef.current);
      if (openDelay) {
        timeoutRef.current = setTimeout(() => {
          onOpenChangeRef.current(true);
        }, openDelay);
      } else {
        onOpenChangeRef.current(true);
      }
    }
    function onMouseLeave(event) {
      var _dataRef$current$open2, _dataRef$current$open3;
      if (((_dataRef$current$open2 = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open2.type) === "click" || ((_dataRef$current$open3 = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open3.type) === "pointerdown") {
        return;
      }
      const doc = getDocument(refs.floating.current);
      clearTimeout(restTimeoutRef.current);
      if (handleCloseRef.current) {
        clearTimeout(timeoutRef.current);
        handlerRef.current && doc.removeEventListener("pointermove", handlerRef.current);
        handlerRef.current = handleCloseRef.current({
          ...context,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            cleanupPointerMoveHandler();
            closeWithDelay();
          }
        });
        doc.addEventListener("pointermove", handlerRef.current);
        return;
      }
      closeWithDelay();
    }
    function onScrollMouseLeave(event) {
      handleCloseRef.current == null ? void 0 : handleCloseRef.current({
        ...context,
        tree,
        x: event.clientX,
        y: event.clientY,
        leave: true,
        onClose() {
          cleanupPointerMoveHandler();
          closeWithDelay();
        }
      })(event);
    }
    const floating = refs.floating.current;
    const reference = refs.domReference.current;
    if (isElement2(reference)) {
      open && reference.addEventListener("mouseleave", onScrollMouseLeave);
      floating == null ? void 0 : floating.addEventListener("mouseleave", onScrollMouseLeave);
      reference.addEventListener("mousemove", onMouseEnter, {
        once: true
      });
      reference.addEventListener("mouseenter", onMouseEnter);
      reference.addEventListener("mouseleave", onMouseLeave);
      return () => {
        open && reference.removeEventListener("mouseleave", onScrollMouseLeave);
        floating == null ? void 0 : floating.removeEventListener("mouseleave", onScrollMouseLeave);
        reference.removeEventListener("mousemove", onMouseEnter);
        reference.removeEventListener("mouseenter", onMouseEnter);
        reference.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [enabled, closeWithDelay, context, delay, handleCloseRef, dataRef, mouseOnly, onOpenChangeRef, open, tree, restMs, cleanupPointerMoveHandler, refs]);
  index2(() => {
    if (!enabled) {
      return;
    }
    if (open && handleCloseRef.current) {
      getDocument(refs.floating.current).body.style.pointerEvents = "none";
      performedPointerEventsMutationRef.current = true;
      const reference = refs.domReference.current;
      const floating = refs.floating.current;
      if (isHTMLElement2(reference) && floating) {
        var _tree$nodesRef$curren, _tree$nodesRef$curren2;
        const parentFloating = tree == null ? void 0 : (_tree$nodesRef$curren = tree.nodesRef.current.find((node) => node.id === parentId)) == null ? void 0 : (_tree$nodesRef$curren2 = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren2.refs.floating.current;
        if (parentFloating) {
          parentFloating.style.pointerEvents = "";
        }
        reference.style.pointerEvents = "auto";
        floating.style.pointerEvents = "auto";
        return () => {
          reference.style.pointerEvents = "";
          floating.style.pointerEvents = "";
        };
      }
    }
  }, [enabled, open, parentId, refs, tree, handleCloseRef, dataRef]);
  index2(() => {
    if (previousOpen && !open) {
      pointerTypeRef.current = void 0;
      cleanupPointerMoveHandler();
      clearPointerEvents();
    }
  });
  React2.useEffect(() => {
    return () => {
      cleanupPointerMoveHandler();
      clearTimeout(timeoutRef.current);
      clearTimeout(restTimeoutRef.current);
      if (performedPointerEventsMutationRef.current) {
        clearPointerEvents();
      }
    };
  }, [cleanupPointerMoveHandler, clearPointerEvents]);
  if (!enabled) {
    return {};
  }
  function setPointerRef(event) {
    pointerTypeRef.current = event.pointerType;
  }
  return {
    reference: {
      onPointerDown: setPointerRef,
      onPointerEnter: setPointerRef,
      onMouseMove() {
        if (open || restMs === 0) {
          return;
        }
        clearTimeout(restTimeoutRef.current);
        restTimeoutRef.current = setTimeout(() => {
          if (!blockMouseMoveRef.current) {
            onOpenChange(true);
          }
        }, restMs);
      }
    },
    floating: {
      onMouseEnter() {
        clearTimeout(timeoutRef.current);
      },
      onMouseLeave() {
        closeWithDelay(false);
      }
    }
  };
};
var FloatingDelayGroupContext = React2.createContext({
  delay: 1e3,
  initialDelay: 1e3,
  currentId: null,
  setCurrentId: () => {
  },
  setState: () => {
  }
});
var useDelayGroupContext = () => React2.useContext(FloatingDelayGroupContext);
var useDelayGroup = (_ref2, _ref3) => {
  let {
    open,
    onOpenChange
  } = _ref2;
  let {
    id
  } = _ref3;
  const {
    currentId,
    initialDelay,
    setState
  } = useDelayGroupContext();
  const onOpenChangeRef = useLatestRef2(onOpenChange);
  React2.useEffect(() => {
    if (currentId && onOpenChangeRef.current) {
      setState((state) => ({
        ...state,
        delay: {
          open: 1,
          close: getDelay(initialDelay, "close")
        }
      }));
      if (currentId !== id) {
        onOpenChangeRef.current(false);
      }
    }
  }, [id, onOpenChangeRef, setState, currentId, initialDelay]);
  React2.useEffect(() => {
    if (!open && currentId === id && onOpenChangeRef.current) {
      onOpenChangeRef.current(false);
      setState((state) => ({
        ...state,
        delay: initialDelay,
        currentId: null
      }));
    }
  }, [open, setState, currentId, id, onOpenChangeRef, initialDelay]);
};
var useRole = function(_ref, _temp) {
  let {
    open
  } = _ref;
  let {
    enabled = true,
    role = "dialog"
  } = _temp === void 0 ? {} : _temp;
  const rootId = useId();
  const referenceId = useId();
  const floatingProps = {
    id: rootId,
    role
  };
  if (!enabled) {
    return {};
  }
  if (role === "tooltip") {
    return {
      reference: {
        "aria-describedby": open ? rootId : void 0
      },
      floating: floatingProps
    };
  }
  return {
    reference: {
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": role,
      "aria-controls": open ? rootId : void 0,
      ...role === "listbox" && {
        role: "combobox"
      },
      ...role === "menu" && {
        id: referenceId
      }
    },
    floating: {
      ...floatingProps,
      ...role === "menu" && {
        "aria-labelledby": referenceId
      }
    }
  };
};
var useClick = function(_ref, _temp) {
  let {
    open,
    onOpenChange,
    dataRef,
    refs
  } = _ref;
  let {
    enabled = true,
    pointerDown = false,
    toggle = true,
    ignoreMouse = false
  } = _temp === void 0 ? {} : _temp;
  const pointerTypeRef = React2.useRef();
  function isButton() {
    var _refs$domReference$cu;
    return ((_refs$domReference$cu = refs.domReference.current) == null ? void 0 : _refs$domReference$cu.tagName) === "BUTTON";
  }
  function isSpaceIgnored() {
    return isTypeableElement(refs.domReference.current);
  }
  if (!enabled) {
    return {};
  }
  return {
    reference: {
      onPointerDown(event) {
        if (event.button !== 0) {
          return;
        }
        pointerTypeRef.current = event.pointerType;
        if (pointerTypeRef.current === "mouse" && ignoreMouse) {
          return;
        }
        if (!pointerDown) {
          return;
        }
        if (open) {
          if (toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === "pointerdown" : true)) {
            onOpenChange(false);
          }
        } else {
          onOpenChange(true);
        }
        dataRef.current.openEvent = event.nativeEvent;
      },
      onClick(event) {
        if (pointerDown && pointerTypeRef.current) {
          pointerTypeRef.current = void 0;
          return;
        }
        if (pointerTypeRef.current === "mouse" && ignoreMouse) {
          return;
        }
        if (open) {
          if (toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === "click" : true)) {
            onOpenChange(false);
          }
        } else {
          onOpenChange(true);
        }
        dataRef.current.openEvent = event.nativeEvent;
      },
      onKeyDown(event) {
        pointerTypeRef.current = void 0;
        if (isButton()) {
          return;
        }
        if (event.key === " " && !isSpaceIgnored()) {
          event.preventDefault();
        }
        if (event.key === "Enter") {
          if (open) {
            if (toggle) {
              onOpenChange(false);
            }
          } else {
            onOpenChange(true);
          }
        }
      },
      onKeyUp(event) {
        if (isButton() || isSpaceIgnored()) {
          return;
        }
        if (event.key === " ") {
          if (open) {
            if (toggle) {
              onOpenChange(false);
            }
          } else {
            onOpenChange(true);
          }
        }
      }
    }
  };
};
function isEventTargetWithin(event, node) {
  if (node == null) {
    return false;
  }
  if ("composedPath" in event) {
    return event.composedPath().includes(node);
  }
  const e = event;
  return e.target != null && node.contains(e.target);
}
var useDismiss = function(_ref, _temp) {
  let {
    open,
    onOpenChange,
    refs,
    events,
    nodeId
  } = _ref;
  let {
    enabled = true,
    escapeKey = true,
    outsidePointerDown = true,
    referencePointerDown = false,
    ancestorScroll = false,
    bubbles = true
  } = _temp === void 0 ? {} : _temp;
  const tree = useFloatingTree();
  const onOpenChangeRef = useLatestRef2(onOpenChange);
  const isFocusInsideFloating = React2.useCallback(() => {
    var _refs$floating$curren;
    return (_refs$floating$curren = refs.floating.current) == null ? void 0 : _refs$floating$curren.contains(activeElement(getDocument(refs.floating.current)));
  }, [refs]);
  React2.useEffect(() => {
    if (!open || !enabled) {
      return;
    }
    function onKeyDown(event) {
      if (event.key === "Escape") {
        if (!bubbles && !isFocusInsideFloating()) {
          return;
        }
        events.emit("dismiss");
        onOpenChangeRef.current(false);
        if (isHTMLElement2(refs.domReference.current)) {
          refs.domReference.current.focus();
        }
      }
    }
    function onPointerDown(event) {
      const targetIsInsideChildren = tree && getChildren(tree.nodesRef.current, nodeId).some((node) => {
        var _node$context;
        return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.refs.floating.current);
      });
      if (isEventTargetWithin(event, refs.floating.current) || isEventTargetWithin(event, refs.domReference.current) || targetIsInsideChildren) {
        return;
      }
      if (!bubbles && !isFocusInsideFloating()) {
        return;
      }
      events.emit("dismiss");
      onOpenChangeRef.current(false);
    }
    function onScroll() {
      onOpenChangeRef.current(false);
    }
    const doc = getDocument(refs.floating.current);
    escapeKey && doc.addEventListener("keydown", onKeyDown);
    outsidePointerDown && doc.addEventListener("mousedown", onPointerDown);
    const ancestors = (ancestorScroll ? [...isElement2(refs.reference.current) ? getOverflowAncestors(refs.reference.current) : [], ...isElement2(refs.floating.current) ? getOverflowAncestors(refs.floating.current) : []] : []).filter((ancestor) => {
      var _doc$defaultView;
      return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
    });
    ancestors.forEach((ancestor) => ancestor.addEventListener("scroll", onScroll, {
      passive: true
    }));
    return () => {
      escapeKey && doc.removeEventListener("keydown", onKeyDown);
      outsidePointerDown && doc.removeEventListener("mousedown", onPointerDown);
      ancestors.forEach((ancestor) => ancestor.removeEventListener("scroll", onScroll));
    };
  }, [escapeKey, outsidePointerDown, events, tree, nodeId, open, onOpenChangeRef, ancestorScroll, enabled, bubbles, isFocusInsideFloating, refs]);
  if (!enabled) {
    return {};
  }
  return {
    reference: {
      onPointerDown() {
        if (referencePointerDown) {
          events.emit("dismiss");
          onOpenChange(false);
        }
      }
    }
  };
};
var useFocus = function(_ref, _temp) {
  let {
    open,
    onOpenChange,
    dataRef,
    refs,
    events
  } = _ref;
  let {
    enabled = true,
    keyboardOnly = true
  } = _temp === void 0 ? {} : _temp;
  const pointerTypeRef = React2.useRef("");
  const blockFocusRef = React2.useRef(false);
  React2.useEffect(() => {
    var _doc$defaultView;
    if (!enabled) {
      return;
    }
    const doc = getDocument(refs.floating.current);
    const win = (_doc$defaultView = doc.defaultView) != null ? _doc$defaultView : window;
    function onBlur() {
      if (pointerTypeRef.current && refs.domReference.current === activeElement(doc)) {
        blockFocusRef.current = !open;
      }
    }
    function onFocus() {
      setTimeout(() => {
        blockFocusRef.current = false;
        pointerTypeRef.current = "";
      });
    }
    win.addEventListener("focus", onFocus);
    win.addEventListener("blur", onBlur);
    return () => {
      win.removeEventListener("focus", onFocus);
      win.removeEventListener("blur", onBlur);
    };
  }, [refs, open, enabled]);
  React2.useEffect(() => {
    if (!enabled) {
      return;
    }
    function onDismiss() {
      blockFocusRef.current = true;
    }
    events.on("dismiss", onDismiss);
    return () => {
      events.off("dismiss", onDismiss);
    };
  }, [events, enabled]);
  if (!enabled) {
    return {};
  }
  return {
    reference: {
      onPointerDown(_ref2) {
        let {
          pointerType
        } = _ref2;
        pointerTypeRef.current = pointerType;
        blockFocusRef.current = !!(pointerType && keyboardOnly);
      },
      onFocus(event) {
        var _dataRef$current$open, _refs$domReference$cu, _dataRef$current$open2;
        if (blockFocusRef.current) {
          return;
        }
        if (event.type === "focus" && ((_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type) === "mousedown" && (_refs$domReference$cu = refs.domReference.current) != null && _refs$domReference$cu.contains((_dataRef$current$open2 = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open2.target)) {
          return;
        }
        dataRef.current.openEvent = event.nativeEvent;
        onOpenChange(true);
      },
      onBlur(event) {
        var _refs$floating$curren, _refs$domReference$cu2;
        const target = event.relatedTarget;
        if ((_refs$floating$curren = refs.floating.current) != null && _refs$floating$curren.contains(target) || (_refs$domReference$cu2 = refs.domReference.current) != null && _refs$domReference$cu2.contains(target)) {
          return;
        }
        blockFocusRef.current = false;
        onOpenChange(false);
      }
    }
  };
};
var ARROW_UP = "ArrowUp";
var ARROW_DOWN = "ArrowDown";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";
function isIndexOutOfBounds(listRef, index3) {
  return index3 < 0 || index3 >= listRef.current.length;
}
function findNonDisabledIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices
  } = _temp === void 0 ? {} : _temp;
  const list = listRef.current;
  let index3 = startingIndex;
  do {
    var _list$index, _list$index2;
    index3 = index3 + (decrement ? -1 : 1);
  } while (index3 >= 0 && index3 <= list.length - 1 && (disabledIndices ? disabledIndices.includes(index3) : list[index3] == null || ((_list$index = list[index3]) == null ? void 0 : _list$index.hasAttribute("disabled")) || ((_list$index2 = list[index3]) == null ? void 0 : _list$index2.getAttribute("aria-disabled")) === "true"));
  return index3;
}
function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case "vertical":
      return vertical;
    case "horizontal":
      return horizontal;
    default:
      return vertical || horizontal;
  }
}
function isMainOrientationKey(key, orientation) {
  const vertical = key === ARROW_UP || key === ARROW_DOWN;
  const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
  const vertical = key === ARROW_DOWN;
  const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal) || key === "Enter" || key == " " || key === "";
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  const horizontal = key === ARROW_DOWN;
  return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
  const horizontal = key === ARROW_UP;
  return doSwitch(orientation, vertical, horizontal);
}
function getMinIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    disabledIndices
  });
}
function getMaxIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}
var useListNavigation = function(_ref, _temp2) {
  let {
    open,
    onOpenChange,
    refs
  } = _ref;
  let {
    listRef,
    activeIndex,
    onNavigate,
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loop = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = "auto",
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = openOnArrowKeyDown ? void 0 : [],
    orientation = "vertical"
  } = _temp2 === void 0 ? {
    listRef: {
      current: []
    },
    activeIndex: null,
    onNavigate: () => {
    }
  } : _temp2;
  if (true) {
    if (allowEscape) {
      if (!loop) {
        console.warn(["Floating UI: `useListNavigation` looping must be enabled to allow", "escaping."].join(" "));
      }
      if (!virtual) {
        console.warn(["Floating UI: `useListNavigation` must be virtual to allow", "escaping."].join(" "));
      }
    }
  }
  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree();
  const previousOpen = usePrevious(open);
  const focusItemOnOpenRef = React2.useRef(focusItemOnOpen);
  const indexRef = React2.useRef(selectedIndex != null ? selectedIndex : -1);
  const keyRef = React2.useRef(null);
  const previousOnNavigateRef = useLatestRef2(usePrevious(onNavigate));
  const onNavigateRef = useLatestRef2(onNavigate);
  const disabledIndicesRef = useLatestRef2(disabledIndices);
  const blockPointerLeaveRef = React2.useRef(false);
  const frameRef = React2.useRef(-1);
  const [activeId, setActiveId] = React2.useState();
  const focusItem = React2.useCallback((listRef2, indexRef2) => {
    frameRef.current = requestAnimationFrame(() => {
      if (virtual) {
        var _listRef$current$inde;
        setActiveId((_listRef$current$inde = listRef2.current[indexRef2.current]) == null ? void 0 : _listRef$current$inde.id);
      } else {
        var _listRef$current$inde2;
        (_listRef$current$inde2 = listRef2.current[indexRef2.current]) == null ? void 0 : _listRef$current$inde2.focus({
          preventScroll: true
        });
      }
    });
  }, [virtual]);
  index2(() => {
    if (!enabled) {
      return;
    }
    if (!previousOpen && open && focusItemOnOpenRef.current && selectedIndex != null) {
      onNavigateRef.current(selectedIndex);
    }
    if (previousOpen && !open) {
      cancelAnimationFrame(frameRef.current);
      indexRef.current = -1;
      previousOnNavigateRef.current == null ? void 0 : previousOnNavigateRef.current(null);
    }
  }, [open, previousOpen, selectedIndex, listRef, onNavigateRef, previousOnNavigateRef, focusItem, enabled]);
  index2(() => {
    if (!enabled) {
      return;
    }
    if (open) {
      if (activeIndex == null) {
        if (selectedIndex != null) {
          return;
        }
        if (previousOpen) {
          indexRef.current = -1;
          focusItem(listRef, indexRef);
        }
        if (!previousOpen && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
          indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinIndex(listRef, disabledIndicesRef.current) : getMaxIndex(listRef, disabledIndicesRef.current);
          onNavigateRef.current(indexRef.current);
          focusItem(listRef, indexRef);
        }
      } else if (!isIndexOutOfBounds(listRef, activeIndex)) {
        indexRef.current = activeIndex;
        focusItem(listRef, indexRef);
      }
    }
  }, [open, previousOpen, activeIndex, selectedIndex, nested, listRef, onNavigateRef, focusItem, enabled, allowEscape, orientation, rtl, virtual, disabledIndicesRef]);
  index2(() => {
    if (!enabled) {
      return;
    }
    if (!open && previousOpen && selectedIndex != null && isHTMLElement2(refs.domReference.current)) {
      refs.domReference.current.focus();
    }
  }, [refs, selectedIndex, open, previousOpen, enabled]);
  index2(() => {
    if (!enabled) {
      return;
    }
    if (!open && previousOpen) {
      var _tree$nodesRef$curren, _tree$nodesRef$curren2;
      const parentFloating = tree == null ? void 0 : (_tree$nodesRef$curren = tree.nodesRef.current.find((node) => node.id === parentId)) == null ? void 0 : (_tree$nodesRef$curren2 = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren2.refs.floating.current;
      if (parentFloating && !parentFloating.contains(activeElement(getDocument(parentFloating)))) {
        parentFloating.focus({
          preventScroll: true
        });
      }
    }
  }, [enabled, open, previousOpen, tree, parentId]);
  index2(() => {
    keyRef.current = null;
  });
  function onKeyDown(event) {
    blockPointerLeaveRef.current = true;
    if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl)) {
      stopEvent(event);
      onOpenChange(false);
      if (isHTMLElement2(refs.domReference.current)) {
        refs.domReference.current.focus();
      }
      return;
    }
    const currentIndex = indexRef.current;
    const minIndex = getMinIndex(listRef, disabledIndices);
    const maxIndex = getMaxIndex(listRef, disabledIndices);
    if (event.key === "Home") {
      indexRef.current = minIndex;
      onNavigate(indexRef.current);
    }
    if (event.key === "End") {
      indexRef.current = maxIndex;
      onNavigate(indexRef.current);
    }
    if (isMainOrientationKey(event.key, orientation)) {
      stopEvent(event);
      if (open && !virtual && activeElement(event.currentTarget.ownerDocument) === event.currentTarget) {
        indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
        onNavigate(indexRef.current);
        return;
      }
      if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
        if (loop) {
          indexRef.current = currentIndex >= maxIndex ? allowEscape && currentIndex !== listRef.current.length ? -1 : minIndex : findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          });
        } else {
          indexRef.current = Math.min(maxIndex, findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          }));
        }
      } else {
        if (loop) {
          indexRef.current = currentIndex <= minIndex ? allowEscape && currentIndex !== -1 ? listRef.current.length : maxIndex : findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          });
        } else {
          indexRef.current = Math.max(minIndex, findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          }));
        }
      }
      if (isIndexOutOfBounds(listRef, indexRef.current)) {
        onNavigate(null);
      } else {
        onNavigate(indexRef.current);
      }
    }
  }
  if (!enabled) {
    return {};
  }
  return {
    reference: {
      ...virtual && open && activeIndex != null && {
        "aria-activedescendant": activeId
      },
      onKeyDown(event) {
        blockPointerLeaveRef.current = true;
        if (virtual && open) {
          return onKeyDown(event);
        }
        const isNavigationKey = event.key.indexOf("Arrow") === 0 || event.key === "Enter" || event.key === " " || event.key === "";
        if (isNavigationKey) {
          keyRef.current = event.key;
        }
        if (nested) {
          if (isCrossOrientationOpenKey(event.key, orientation, rtl)) {
            stopEvent(event);
            if (open) {
              indexRef.current = getMinIndex(listRef, disabledIndices);
              onNavigate(indexRef.current);
            } else {
              onOpenChange(true);
            }
          }
          return;
        }
        if (isMainOrientationKey(event.key, orientation)) {
          if (selectedIndex != null) {
            indexRef.current = selectedIndex;
          }
          stopEvent(event);
          if (!open && openOnArrowKeyDown) {
            onOpenChange(true);
          } else {
            onKeyDown(event);
          }
          if (open) {
            onNavigate(indexRef.current);
          }
        }
      }
    },
    floating: {
      "aria-orientation": orientation === "both" ? void 0 : orientation,
      ...virtual && activeIndex != null && {
        "aria-activedescendant": activeId
      },
      onKeyDown,
      onPointerMove() {
        blockPointerLeaveRef.current = false;
      }
    },
    item: {
      onFocus(_ref2) {
        let {
          currentTarget
        } = _ref2;
        const index3 = listRef.current.indexOf(currentTarget);
        if (index3 !== -1) {
          onNavigate(index3);
        }
      },
      onClick: (_ref3) => {
        let {
          currentTarget
        } = _ref3;
        return currentTarget.focus({
          preventScroll: true
        });
      },
      ...focusItemOnHover && {
        onMouseMove(_ref4) {
          let {
            currentTarget
          } = _ref4;
          const target = currentTarget;
          if (target) {
            const index3 = listRef.current.indexOf(target);
            if (index3 !== -1) {
              onNavigate(index3);
            }
          }
        },
        onMouseLeave() {
          if (!blockPointerLeaveRef.current) {
            indexRef.current = -1;
            focusItem(listRef, indexRef);
            onNavigateRef.current(null);
            if (!virtual) {
              var _refs$floating$curren;
              (_refs$floating$curren = refs.floating.current) == null ? void 0 : _refs$floating$curren.focus({
                preventScroll: true
              });
            }
          }
        }
      }
    }
  };
};
var useTypeahead = function(_ref, _temp) {
  var _ref2;
  let {
    open,
    dataRef
  } = _ref;
  let {
    listRef,
    activeIndex,
    onMatch = () => {
    },
    enabled = true,
    findMatch = null,
    resetMs = 1e3,
    ignoreKeys = [],
    selectedIndex = null
  } = _temp === void 0 ? {
    listRef: {
      current: []
    },
    activeIndex: null
  } : _temp;
  const timeoutIdRef = React2.useRef();
  const stringRef = React2.useRef("");
  const prevIndexRef = React2.useRef((_ref2 = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref2 : -1);
  const matchIndexRef = React2.useRef(null);
  index2(() => {
    if (open) {
      clearTimeout(timeoutIdRef.current);
      matchIndexRef.current = null;
      stringRef.current = "";
    }
  }, [open]);
  index2(() => {
    if (open && stringRef.current === "") {
      var _ref3;
      prevIndexRef.current = (_ref3 = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref3 : -1;
    }
  }, [open, selectedIndex, activeIndex]);
  function onKeyDown(event) {
    if (!event.currentTarget.contains(activeElement(getDocument(event.currentTarget)))) {
      return;
    }
    if (stringRef.current.length > 0 && stringRef.current[0] !== " ") {
      dataRef.current.typing = true;
      if (event.key === " ") {
        stopEvent(event);
      }
    }
    const listContent = listRef.current;
    if (listContent == null || ["Home", "End", "Escape", "Enter", "Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", ...ignoreKeys].includes(event.key)) {
      return;
    }
    const allowRapidSuccessionOfFirstLetter = listContent.every((text) => {
      var _text$, _text$2;
      return text ? ((_text$ = text[0]) == null ? void 0 : _text$.toLocaleLowerCase()) !== ((_text$2 = text[1]) == null ? void 0 : _text$2.toLocaleLowerCase()) : true;
    });
    if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
      stringRef.current = "";
      prevIndexRef.current = matchIndexRef.current;
    }
    stringRef.current += event.key;
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      stringRef.current = "";
      prevIndexRef.current = matchIndexRef.current;
      dataRef.current.typing = false;
    }, resetMs);
    const prevIndex = prevIndexRef.current;
    const orderedList = [...listContent.slice((prevIndex != null ? prevIndex : 0) + 1), ...listContent.slice(0, (prevIndex != null ? prevIndex : 0) + 1)];
    const str = findMatch ? findMatch(orderedList, stringRef.current) : orderedList.find((text) => (text == null ? void 0 : text.toLocaleLowerCase().indexOf(stringRef.current)) === 0);
    const index3 = str ? listContent.indexOf(str) : -1;
    if (index3 !== -1) {
      onMatch(index3);
      matchIndexRef.current = index3;
    }
  }
  if (!enabled) {
    return {};
  }
  return {
    reference: {
      onKeyDown
    },
    floating: {
      onKeyDown
    }
  };
};

// ../../../node_modules/@udecode/plate-floating/dist/index.es.js
var import_react3 = __toESM(require_react());
var getDefaultBoundingClientRect = () => ({
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  top: -9999,
  left: -9999,
  right: 9999,
  bottom: 9999
});
var createVirtualElement = () => ({
  getBoundingClientRect: getDefaultBoundingClientRect
});
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
var Popover = ({
  floatingOptions,
  children,
  content,
  ...props
}) => {
  const {
    x,
    y,
    reference,
    floating,
    strategy
  } = useFloating2({
    middleware: [offset(12), flip({
      padding: 96
    }), shift()],
    whileElementsMounted: autoUpdate,
    ...floatingOptions
  });
  const {
    getReferenceProps
  } = useInteractions();
  return import_react3.default.createElement(import_react3.default.Fragment, null, (0, import_react3.cloneElement)(children, getReferenceProps({
    ref: reference,
    ...children.props
  })), (floatingOptions === null || floatingOptions === void 0 ? void 0 : floatingOptions.open) && createElementAs("div", {
    ref: floating,
    style: {
      position: strategy,
      top: y !== null && y !== void 0 ? y : 0,
      left: x !== null && x !== void 0 ? x : 0,
      zIndex: 1
    },
    contentEditable: false,
    children: content,
    ...props
  }));
};
var ElementPopover = ({
  floatingOptions = {},
  ...props
}) => {
  const readOnly = useReadOnly();
  const selected = useSelected();
  const editor = usePlateEditorState();
  return import_react3.default.createElement(Popover, _extends2({
    floatingOptions: {
      open: !readOnly && selected && isCollapsed(editor.selection),
      ...floatingOptions
    }
  }, props));
};
var getRangeBoundingClientRect = (editor, at) => {
  if (!at)
    return getDefaultBoundingClientRect();
  const domRange = toDOMRange(editor, at);
  if (!domRange)
    return getDefaultBoundingClientRect();
  return domRange.getBoundingClientRect();
};
var getSelectionBoundingClientRect = () => {
  const domSelection = window.getSelection();
  if (!domSelection || domSelection.rangeCount < 1) {
    return getDefaultBoundingClientRect();
  }
  const domRange = domSelection.getRangeAt(0);
  return domRange.getBoundingClientRect();
};
var useVirtualFloating = ({
  getBoundingClientRect: getBoundingClientRect2 = getSelectionBoundingClientRect,
  ...floatingOptions
}) => {
  const virtualElementRef = (0, import_react3.useRef)(createVirtualElement());
  const [visible, setVisible] = (0, import_react3.useState)(true);
  const floatingResult = useFloating2({
    whileElementsMounted: autoUpdate,
    ...floatingOptions
  });
  const {
    reference,
    middlewareData,
    strategy,
    x,
    y,
    update
  } = floatingResult;
  (0, import_react3.useLayoutEffect)(() => {
    virtualElementRef.current.getBoundingClientRect = getBoundingClientRect2;
  }, [getBoundingClientRect2, update]);
  (0, import_react3.useLayoutEffect)(() => {
    reference(virtualElementRef.current);
  }, [reference]);
  (0, import_react3.useLayoutEffect)(() => {
    if (!(middlewareData !== null && middlewareData !== void 0 && middlewareData.hide))
      return;
    const {
      referenceHidden
    } = middlewareData.hide;
    setVisible(!referenceHidden);
  }, [middlewareData.hide]);
  return {
    ...floatingResult,
    virtualElementRef,
    style: {
      position: strategy,
      top: y !== null && y !== void 0 ? y : 0,
      left: x !== null && x !== void 0 ? x : 0,
      display: floatingOptions.open === false ? "none" : void 0,
      visibility: !visible ? "hidden" : void 0
    }
  };
};

export {
  detectOverflow,
  autoPlacement,
  flip,
  hide,
  offset,
  shift,
  limitShift,
  size,
  inline,
  getOverflowAncestors,
  autoUpdate,
  computePosition2 as computePosition,
  arrow2 as arrow,
  useId,
  useFloatingParentNodeId,
  useFloatingTree,
  useFloatingNodeId,
  useFloating2 as useFloating,
  useInteractions,
  safePolygon,
  useFloatingPortalNode,
  useHover,
  useDelayGroupContext,
  useDelayGroup,
  useRole,
  useClick,
  useDismiss,
  useFocus,
  useListNavigation,
  useTypeahead,
  getDefaultBoundingClientRect,
  createVirtualElement,
  Popover,
  ElementPopover,
  getRangeBoundingClientRect,
  getSelectionBoundingClientRect,
  useVirtualFloating
};
//# sourceMappingURL=chunk-QW53TVAD.js.map
