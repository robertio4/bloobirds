import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--3e3c5e33.js";

// ../../../node_modules/chillout/src/util.js
var require_util = __commonJS({
  "../../../node_modules/chillout/src/util.js"(exports) {
    exports.isThenable = function isThenable(x) {
      return x != null && typeof x.then === "function";
    };
    exports.isArrayLike = function isArrayLike(x) {
      return x != null && typeof x.length === "number" && x.length >= 0;
    };
  }
});

// ../../../node_modules/chillout/src/iterator.js
var require_iterator = __commonJS({
  "../../../node_modules/chillout/src/iterator.js"(exports) {
    var { isArrayLike } = require_util();
    exports.forEach = function(obj, callback, context) {
      let i = 0;
      let len;
      if (isArrayLike(obj)) {
        len = obj.length;
        return {
          next() {
            if (i >= len) {
              return [true, null];
            }
            const value = callback.call(context, obj[i], i, obj);
            i++;
            return [false, value];
          }
        };
      }
      const keys = Object.keys(obj);
      len = keys.length;
      return {
        next() {
          if (i >= len) {
            return [true, null];
          }
          const key = keys[i++];
          const value = callback.call(context, obj[key], key, obj);
          return [false, value];
        }
      };
    };
    exports.repeat = function(count, callback, context) {
      let i;
      let step;
      let done;
      if (count && typeof count === "object") {
        i = count.start || 0;
        step = count.step || 1;
        done = count.done;
      } else {
        i = 0;
        step = 1;
        done = count;
      }
      return {
        next() {
          const value = callback.call(context, i);
          i += step;
          if (i >= done) {
            return [true, value];
          }
          return [false, value];
        }
      };
    };
    exports.until = function(callback, context) {
      return {
        next() {
          const value = callback.call(context);
          return [false, value];
        }
      };
    };
    exports.forOf = function(iterable, callback, context) {
      const it = iterable[Symbol.iterator]();
      return {
        next() {
          const nextIterator = it.next();
          if (nextIterator.done) {
            return [true, null];
          }
          const value = callback.call(context, nextIterator.value, iterable);
          return [false, value];
        }
      };
    };
  }
});

// ../../../node_modules/chillout/src/stop-iteration.js
var require_stop_iteration = __commonJS({
  "../../../node_modules/chillout/src/stop-iteration.js"(exports, module) {
    var StopIteration = {};
    module.exports = StopIteration;
  }
});

// ../../../node_modules/chillout/src/next-tick.js
var require_next_tick = __commonJS({
  "../../../node_modules/chillout/src/next-tick.js"(exports, module) {
    var nextTick = (() => {
      if (typeof setImmediate === "function") {
        return (task) => {
          setImmediate(task);
        };
      }
      if (typeof process === "object" && typeof process.nextTick === "function") {
        return (task) => {
          process.nextTick(task);
        };
      }
      if (typeof MessageChannel === "function") {
        const channel = new MessageChannel();
        let head = {};
        let tail = head;
        channel.port1.onmessage = () => {
          head = head.next;
          const task = head.task;
          delete head.task;
          task();
        };
        return (task) => {
          tail = tail.next = { task };
          channel.port2.postMessage(0);
        };
      }
      return (task) => {
        setTimeout(task, 0);
      };
    })();
    module.exports = nextTick;
  }
});

// ../../../node_modules/chillout/src/iterate.js
var require_iterate = __commonJS({
  "../../../node_modules/chillout/src/iterate.js"(exports, module) {
    var { isThenable } = require_util();
    var StopIteration = require_stop_iteration();
    var nextTick = require_next_tick();
    var MAX_DELAY = 1500;
    module.exports = function iterate(it, interval = 0) {
      return new Promise((resolve, reject) => {
        let totalTime = 0;
        function doIterate() {
          const cycleStartTime = Date.now();
          let cycleEndTime;
          try {
            for (; ; ) {
              const [isStop, value] = it.next();
              if (isThenable(value)) {
                value.then((awaitedValue) => {
                  if (isStop) {
                    resolve(awaitedValue);
                  } else if (awaitedValue === StopIteration) {
                    resolve();
                  } else {
                    doIterate();
                  }
                }, reject);
                return;
              }
              if (isStop) {
                resolve(value);
                return;
              }
              if (value === StopIteration) {
                resolve();
                return;
              }
              if (interval > 0) {
                break;
              }
              const endTime = Date.now();
              cycleEndTime = endTime - cycleStartTime;
              totalTime += cycleEndTime;
              if (totalTime > 1e3) {
                break;
              }
              if (cycleEndTime < 10) {
                continue;
              }
              break;
            }
          } catch (e) {
            reject(e);
            return;
          }
          if (interval > 0) {
            const delay = Math.min(MAX_DELAY, Date.now() - cycleStartTime + interval);
            setTimeout(doIterate, delay);
          } else {
            const delay = Math.min(MAX_DELAY, cycleEndTime / 3);
            totalTime = 0;
            if (delay > 10) {
              setTimeout(doIterate, delay);
            } else {
              nextTick(doIterate);
            }
          }
        }
        nextTick(doIterate);
      });
    };
  }
});

// ../../../node_modules/chillout/package.json
var require_package = __commonJS({
  "../../../node_modules/chillout/package.json"(exports, module) {
    module.exports = {
      name: "chillout",
      description: "Reduce CPU usage by non-blocking async loop and psychologically speed up in JavaScript",
      version: "5.0.0",
      author: "polygon planet <polygon.planet.aqua@gmail.com>",
      bugs: {
        url: "https://github.com/polygonplanet/chillout/issues"
      },
      devDependencies: {
        "@babel/core": "^7.8.3",
        "@babel/preset-env": "^7.8.3",
        babelify: "^10.0.0",
        bannerify: "^1.0.1",
        browserify: "^16.5.0",
        "es6-shim": "^0.35.5",
        eslint: "^6.8.0",
        karma: "^4.4.1",
        "karma-browserify": "^6.1.0",
        "karma-chrome-launcher": "^3.1.0",
        "karma-detect-browsers": "^2.3.3",
        "karma-es6-shim": "^1.0.0",
        "karma-firefox-launcher": "^1.3.0",
        "karma-ie-launcher": "^1.0.0",
        "karma-mocha": "^1.3.0",
        "karma-mocha-reporter": "^2.2.5",
        "karma-safari-launcher": "^1.0.0",
        mocha: "^7.0.0",
        "package-json-versionify": "^1.0.4",
        pidusage: "1.0.2",
        "power-assert": "^1.6.1",
        "uglify-js": "^3.7.5",
        uglifyify: "^5.0.2",
        watchify: "^3.11.1"
      },
      engines: {
        node: ">=8.10.0"
      },
      files: [
        "dist/*",
        "src/*"
      ],
      homepage: "https://github.com/polygonplanet/chillout",
      keywords: [
        "acceleration",
        "async await",
        "asynchronous",
        "cpu use rate",
        "cpu utilization rate",
        "heavy processing",
        "iterate",
        "iteration",
        "lightweight",
        "nextTick",
        "non-blocking",
        "optimization",
        "optimize for loop",
        "performance",
        "promise",
        "reduce cpu usage",
        "setimmediate",
        "waitUntil"
      ],
      license: "MIT",
      main: "src/index.js",
      repository: {
        type: "git",
        url: "https://github.com/polygonplanet/chillout.git"
      },
      scripts: {
        benchmark: "node benchmark/benchmark",
        build: "npm run compile && npm run minify",
        compile: "browserify src/index.js -o dist/chillout.js -s chillout -p [ bannerify --file src/banner.js ] --no-bundle-external --bare",
        minify: "uglifyjs dist/chillout.js -o dist/chillout.min.js --comments -c -m -b ascii_only=true,beautify=false",
        test: "./node_modules/.bin/eslint . && npm run build && mocha test/**/*.spec.js --timeout 10000 && karma start karma.conf.js",
        travis: "npm run build && mocha test/**/*.spec.js --timeout 10000 && karma start karma.conf.js --single-run",
        watch: "watchify src/index.js -o dist/chillout.js -s chillout -p [ bannerify --file src/banner.js ] --no-bundle-external --bare --poll=200 -v"
      },
      browserify: {
        transform: [
          "babelify",
          "package-json-versionify"
        ]
      }
    };
  }
});

// ../../../node_modules/chillout/src/index.js
var require_src = __commonJS({
  "../../../node_modules/chillout/src/index.js"(exports) {
    var iterator = require_iterator();
    var iterate = require_iterate();
    var { isThenable, isArrayLike } = require_util();
    var nextTick = require_next_tick();
    var StopIteration = require_stop_iteration();
    exports.version = require_package().version;
    exports.forEach = function forEach(obj, callback, context) {
      return iterate(iterator.forEach(obj, callback, context));
    };
    exports.repeat = function repeat(count, callback, context) {
      return iterate(iterator.repeat(count, callback, context));
    };
    exports.until = function until(callback, context) {
      return iterate(iterator.until(callback, context));
    };
    var WAIT_UNTIL_INTERVAL = 13;
    exports.waitUntil = function waitUntil(callback, context) {
      return iterate(iterator.until(callback, context), WAIT_UNTIL_INTERVAL);
    };
    exports.forOf = function forOf(iterable, callback, context) {
      return iterate(iterator.forOf(iterable, callback, context));
    };
    exports.StopIteration = StopIteration;
    exports.iterate = iterate;
    exports.iterator = iterator;
    exports.isThenable = isThenable;
    exports.isArrayLike = isArrayLike;
    exports.nextTick = nextTick;
  }
});
export default require_src();
//# sourceMappingURL=chillout.js.map
