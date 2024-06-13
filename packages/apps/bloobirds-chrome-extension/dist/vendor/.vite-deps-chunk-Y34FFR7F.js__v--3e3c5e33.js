import {
  _objectWithoutPropertiesLoose
} from "/vendor/.vite-deps-chunk-FMITLPII.js__v--3e3c5e33.js";
import {
  use_isomorphic_layout_effect_browser_esm_default
} from "/vendor/.vite-deps-chunk-RUBPC5FX.js__v--3e3c5e33.js";
import {
  SCOPE_ELEMENT,
  createAtomStore,
  createComponentAs,
  createElementAs,
  createPluginFactory,
  createStore,
  findNodePath,
  focusEditor,
  getAboveNode,
  getBlockAbove,
  getInjectedPlugins,
  getNodeString,
  getParentNode,
  getPluginOptions,
  getPluginType,
  getPointAfter,
  insertNodes,
  isCollapsed,
  isDefined,
  isUrl,
  mergeProps,
  pipeInsertDataQuery,
  select,
  setNodes,
  useComposedRef,
  useEditorRef,
  useElement,
  useElementProps,
  useHotkeys
} from "/vendor/.vite-deps-chunk-HGZEDJTY.js__v--3e3c5e33.js";
import {
  useReadOnly,
  useSelected
} from "/vendor/.vite-deps-chunk-73EC23W7.js__v--3e3c5e33.js";
import {
  Path
} from "/vendor/.vite-deps-chunk-ZSYTCF3U.js__v--3e3c5e33.js";
import {
  _extends
} from "/vendor/.vite-deps-chunk-XWJC7T76.js__v--3e3c5e33.js";
import {
  require_react_dom
} from "/vendor/.vite-deps-chunk-3UKJDGBQ.js__v--3e3c5e33.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--3e3c5e33.js";
import {
  __commonJS,
  __toESM
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--3e3c5e33.js";

// ../../../node_modules/js-video-url-parser/dist/jsVideoUrlParser.js
var require_jsVideoUrlParser = __commonJS({
  "../../../node_modules/js-video-url-parser/dist/jsVideoUrlParser.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.urlParser = factory());
    })(exports, function() {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      var getQueryParams = function getQueryParams2(qs) {
        if (typeof qs !== "string") {
          return {};
        }
        qs = qs.split("+").join(" ");
        var params = {};
        var match = qs.match(/(?:[?](?:[^=]+)=(?:[^&#]*)(?:[&](?:[^=]+)=(?:[^&#]*))*(?:[#].*)?)|(?:[#].*)/);
        var split;
        if (match === null) {
          return {};
        }
        split = match[0].substr(1).split(/[&#=]/);
        for (var i = 0; i < split.length; i += 2) {
          params[decodeURIComponent(split[i])] = decodeURIComponent(split[i + 1] || "");
        }
        return params;
      };
      var combineParams = function combineParams2(params, hasParams) {
        if (_typeof(params) !== "object") {
          return "";
        }
        var combined = "";
        var i = 0;
        var keys = Object.keys(params);
        if (keys.length === 0) {
          return "";
        }
        keys.sort();
        if (!hasParams) {
          combined += "?" + keys[0] + "=" + params[keys[0]];
          i += 1;
        }
        for (; i < keys.length; i += 1) {
          combined += "&" + keys[i] + "=" + params[keys[i]];
        }
        return combined;
      };
      function getLetterTime(timeString) {
        var totalSeconds = 0;
        var timeValues = {
          "s": 1,
          "m": 1 * 60,
          "h": 1 * 60 * 60,
          "d": 1 * 60 * 60 * 24,
          "w": 1 * 60 * 60 * 24 * 7
        };
        var timePairs;
        timeString = timeString.replace(/([smhdw])/g, " $1 ").trim();
        timePairs = timeString.split(" ");
        for (var i = 0; i < timePairs.length; i += 2) {
          totalSeconds += parseInt(timePairs[i], 10) * timeValues[timePairs[i + 1] || "s"];
        }
        return totalSeconds;
      }
      function getColonTime(timeString) {
        var totalSeconds = 0;
        var timeValues = [1, 1 * 60, 1 * 60 * 60, 1 * 60 * 60 * 24, 1 * 60 * 60 * 24 * 7];
        var timePairs = timeString.split(":");
        for (var i = 0; i < timePairs.length; i++) {
          totalSeconds += parseInt(timePairs[i], 10) * timeValues[timePairs.length - i - 1];
        }
        return totalSeconds;
      }
      var getTime = function getTime2(timeString) {
        if (typeof timeString === "undefined") {
          return 0;
        }
        if (timeString.match(/^(\d+[smhdw]?)+$/)) {
          return getLetterTime(timeString);
        }
        if (timeString.match(/^(\d+:?)+$/)) {
          return getColonTime(timeString);
        }
        return 0;
      };
      var util = {
        getQueryParams,
        combineParams,
        getTime
      };
      var getQueryParams$1 = util.getQueryParams;
      function UrlParser() {
        for (var _i = 0, _arr = ["parseProvider", "parse", "bind", "create"]; _i < _arr.length; _i++) {
          var key = _arr[_i];
          this[key] = this[key].bind(this);
        }
        this.plugins = {};
      }
      var urlParser = UrlParser;
      UrlParser.prototype.parseProvider = function(url) {
        var match = url.match(/(?:(?:https?:)?\/\/)?(?:[^.]+\.)?(\w+)\./i);
        return match ? match[1] : void 0;
      };
      UrlParser.prototype.parse = function(url) {
        if (typeof url === "undefined") {
          return void 0;
        }
        var provider = this.parseProvider(url);
        var result;
        var plugin = this.plugins[provider];
        if (!provider || !plugin || !plugin.parse) {
          return void 0;
        }
        result = plugin.parse.call(plugin, url, getQueryParams$1(url));
        if (result) {
          result = removeEmptyParameters(result);
          result.provider = plugin.provider;
        }
        return result;
      };
      UrlParser.prototype.bind = function(plugin) {
        this.plugins[plugin.provider] = plugin;
        if (plugin.alternatives) {
          for (var i = 0; i < plugin.alternatives.length; i += 1) {
            this.plugins[plugin.alternatives[i]] = plugin;
          }
        }
      };
      UrlParser.prototype.create = function(op) {
        if (_typeof(op) !== "object" || _typeof(op.videoInfo) !== "object") {
          return void 0;
        }
        var vi = op.videoInfo;
        var params = op.params;
        var plugin = this.plugins[vi.provider];
        params = params === "internal" ? vi.params : params || {};
        if (plugin) {
          op.format = op.format || plugin.defaultFormat;
          if (plugin.formats.hasOwnProperty(op.format)) {
            return plugin.formats[op.format].apply(plugin, [vi, Object.assign({}, params)]);
          }
        }
        return void 0;
      };
      function removeEmptyParameters(result) {
        if (result.params && Object.keys(result.params).length === 0) {
          delete result.params;
        }
        return result;
      }
      var parser = new urlParser();
      var base = parser;
      function Allocine() {
        this.provider = "allocine";
        this.alternatives = [];
        this.defaultFormat = "embed";
        this.formats = {
          embed: this.createEmbedUrl
        };
        this.mediaTypes = {
          VIDEO: "video"
        };
      }
      Allocine.prototype.parseUrl = function(url) {
        var match = url.match(/(?:\/video\/player_gen_cmedia=)([A-Za-z0-9]+)/i);
        return match ? match[1] : void 0;
      };
      Allocine.prototype.parse = function(url) {
        var result = {
          mediaType: this.mediaTypes.VIDEO,
          id: this.parseUrl(url)
        };
        return result.id ? result : void 0;
      };
      Allocine.prototype.createEmbedUrl = function(vi) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        return "https://player.allocine.fr/" + vi.id + ".html";
      };
      base.bind(new Allocine());
      var combineParams$1 = util.combineParams;
      function CanalPlus() {
        this.provider = "canalplus";
        this.defaultFormat = "embed";
        this.formats = {
          embed: this.createEmbedUrl
        };
        this.mediaTypes = {
          VIDEO: "video"
        };
      }
      CanalPlus.prototype.parseParameters = function(params) {
        delete params.vid;
        return params;
      };
      CanalPlus.prototype.parse = function(url, params) {
        var _this = this;
        var result = {
          mediaType: this.mediaTypes.VIDEO,
          id: params.vid
        };
        result.params = _this.parseParameters(params);
        if (!result.id) {
          return void 0;
        }
        return result;
      };
      CanalPlus.prototype.createEmbedUrl = function(vi, params) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        var url = "http://player.canalplus.fr/embed/";
        params.vid = vi.id;
        url += combineParams$1(params);
        return url;
      };
      base.bind(new CanalPlus());
      var combineParams$2 = util.combineParams;
      function Coub() {
        this.provider = "coub";
        this.defaultFormat = "long";
        this.formats = {
          "long": this.createLongUrl,
          embed: this.createEmbedUrl
        };
        this.mediaTypes = {
          VIDEO: "video"
        };
      }
      Coub.prototype.parseUrl = function(url) {
        var match = url.match(/(?:embed|view)\/([a-zA-Z\d]+)/i);
        return match ? match[1] : void 0;
      };
      Coub.prototype.parse = function(url, params) {
        var result = {
          mediaType: this.mediaTypes.VIDEO,
          params,
          id: this.parseUrl(url)
        };
        if (!result.id) {
          return void 0;
        }
        return result;
      };
      Coub.prototype.createUrl = function(baseUrl, vi, params) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        var url = baseUrl + vi.id;
        url += combineParams$2(params);
        return url;
      };
      Coub.prototype.createLongUrl = function(vi, params) {
        return this.createUrl("https://coub.com/view/", vi, params);
      };
      Coub.prototype.createEmbedUrl = function(vi, params) {
        return this.createUrl("//coub.com/embed/", vi, params);
      };
      base.bind(new Coub());
      var combineParams$3 = util.combineParams, getTime$1 = util.getTime;
      function Dailymotion() {
        this.provider = "dailymotion";
        this.alternatives = ["dai"];
        this.defaultFormat = "long";
        this.formats = {
          "short": this.createShortUrl,
          "long": this.createLongUrl,
          embed: this.createEmbedUrl,
          image: this.createImageUrl
        };
        this.mediaTypes = {
          VIDEO: "video"
        };
      }
      Dailymotion.prototype.parseParameters = function(params) {
        return this.parseTime(params);
      };
      Dailymotion.prototype.parseTime = function(params) {
        if (params.start) {
          params.start = getTime$1(params.start);
        }
        return params;
      };
      Dailymotion.prototype.parseUrl = function(url) {
        var match = url.match(/(?:\/video|ly)\/([A-Za-z0-9]+)/i);
        return match ? match[1] : void 0;
      };
      Dailymotion.prototype.parse = function(url, params) {
        var _this = this;
        var result = {
          mediaType: this.mediaTypes.VIDEO,
          params: _this.parseParameters(params),
          id: _this.parseUrl(url)
        };
        return result.id ? result : void 0;
      };
      Dailymotion.prototype.createUrl = function(base2, vi, params) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        return base2 + vi.id + combineParams$3(params);
      };
      Dailymotion.prototype.createShortUrl = function(vi, params) {
        return this.createUrl("https://dai.ly/", vi, params);
      };
      Dailymotion.prototype.createLongUrl = function(vi, params) {
        return this.createUrl("https://dailymotion.com/video/", vi, params);
      };
      Dailymotion.prototype.createEmbedUrl = function(vi, params) {
        return this.createUrl("https://www.dailymotion.com/embed/video/", vi, params);
      };
      Dailymotion.prototype.createImageUrl = function(vi, params) {
        delete params.start;
        return this.createUrl("https://www.dailymotion.com/thumbnail/video/", vi, params);
      };
      base.bind(new Dailymotion());
      var combineParams$4 = util.combineParams;
      function Loom() {
        this.provider = "loom";
        this.defaultFormat = "long";
        this.formats = {
          "long": this.createLongUrl,
          embed: this.createEmbedUrl
        };
        this.mediaTypes = {
          VIDEO: "video"
        };
      }
      Loom.prototype.parseUrl = function(url) {
        var match = url.match(/(?:share|embed)\/([a-zA-Z\d]+)/i);
        return match ? match[1] : void 0;
      };
      Loom.prototype.parse = function(url, params) {
        var result = {
          mediaType: this.mediaTypes.VIDEO,
          params,
          id: this.parseUrl(url)
        };
        return result.id ? result : void 0;
      };
      Loom.prototype.createUrl = function(baseUrl, vi, params) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        var url = baseUrl + vi.id;
        url += combineParams$4(params);
        return url;
      };
      Loom.prototype.createLongUrl = function(vi, params) {
        return this.createUrl("https://loom.com/share/", vi, params);
      };
      Loom.prototype.createEmbedUrl = function(vi, params) {
        return this.createUrl("//loom.com/embed/", vi, params);
      };
      base.bind(new Loom());
      var combineParams$5 = util.combineParams, getTime$2 = util.getTime;
      function Twitch() {
        this.provider = "twitch";
        this.defaultFormat = "long";
        this.formats = {
          "long": this.createLongUrl,
          embed: this.createEmbedUrl
        };
        this.mediaTypes = {
          VIDEO: "video",
          STREAM: "stream",
          CLIP: "clip"
        };
      }
      Twitch.prototype.seperateId = function(id) {
        return {
          pre: id[0],
          id: id.substr(1)
        };
      };
      Twitch.prototype.parseChannel = function(result, params) {
        var channel = params.channel || params.utm_content || result.channel;
        delete params.utm_content;
        delete params.channel;
        return channel;
      };
      Twitch.prototype.parseUrl = function(url, result, params) {
        var match;
        match = url.match(/(clips\.)?twitch\.tv\/(?:(?:videos\/(\d+))|(\w+(?:-[\w\d-]+)?)(?:\/clip\/(\w+))?)/i);
        if (match && match[2]) {
          result.id = "v" + match[2];
        } else if (params.video) {
          result.id = params.video;
          delete params.video;
        } else if (params.clip) {
          result.id = params.clip;
          result.isClip = true;
          delete params.clip;
        } else if (match && match[1] && match[3]) {
          result.id = match[3];
          result.isClip = true;
        } else if (match && match[3] && match[4]) {
          result.channel = match[3];
          result.id = match[4];
          result.isClip = true;
        } else if (match && match[3]) {
          result.channel = match[3];
        }
        return result;
      };
      Twitch.prototype.parseMediaType = function(result) {
        var mediaType;
        if (result.id) {
          if (result.isClip) {
            mediaType = this.mediaTypes.CLIP;
            delete result.isClip;
          } else {
            mediaType = this.mediaTypes.VIDEO;
          }
        } else if (result.channel) {
          mediaType = this.mediaTypes.STREAM;
        }
        return mediaType;
      };
      Twitch.prototype.parseParameters = function(params) {
        if (params.t) {
          params.start = getTime$2(params.t);
          delete params.t;
        }
        return params;
      };
      Twitch.prototype.parse = function(url, params) {
        var _this = this;
        var result = {};
        result = _this.parseUrl(url, result, params);
        result.channel = _this.parseChannel(result, params);
        result.mediaType = _this.parseMediaType(result);
        result.params = _this.parseParameters(params);
        return result.channel || result.id ? result : void 0;
      };
      Twitch.prototype.createLongUrl = function(vi, params) {
        var url = "";
        if (vi.mediaType === this.mediaTypes.STREAM && vi.channel) {
          url = "https://twitch.tv/" + vi.channel;
        } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
          var sep = this.seperateId(vi.id);
          url = "https://twitch.tv/videos/" + sep.id;
          if (params.start) {
            params.t = params.start + "s";
            delete params.start;
          }
        } else if (vi.mediaType === this.mediaTypes.CLIP && vi.id) {
          if (vi.channel) {
            url = "https://www.twitch.tv/" + vi.channel + "/clip/" + vi.id;
          } else {
            url = "https://clips.twitch.tv/" + vi.id;
          }
        } else {
          return void 0;
        }
        url += combineParams$5(params);
        return url;
      };
      Twitch.prototype.createEmbedUrl = function(vi, params) {
        var url = "https://player.twitch.tv/";
        if (vi.mediaType === this.mediaTypes.STREAM && vi.channel) {
          params.channel = vi.channel;
        } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
          params.video = vi.id;
          if (params.start) {
            params.t = params.start + "s";
            delete params.start;
          }
        } else if (vi.mediaType === this.mediaTypes.CLIP && vi.id) {
          url = "https://clips.twitch.tv/embed";
          params.clip = vi.id;
        } else {
          return void 0;
        }
        url += combineParams$5(params);
        return url;
      };
      base.bind(new Twitch());
      var combineParams$6 = util.combineParams, getTime$3 = util.getTime;
      function Vimeo() {
        this.provider = "vimeo";
        this.alternatives = ["vimeopro"];
        this.defaultFormat = "long";
        this.formats = {
          "long": this.createLongUrl,
          embed: this.createEmbedUrl
        };
        this.mediaTypes = {
          VIDEO: "video"
        };
      }
      Vimeo.prototype.parseUrl = function(url) {
        var match = url.match(/(?:\/showcase\/\d+)?(?:\/(?:channels\/[\w]+|(?:(?:album\/\d+|groups\/[\w]+)\/)?videos?))?\/(\d+)/i);
        return match ? match[1] : void 0;
      };
      Vimeo.prototype.parseHash = function(url) {
        var match = url.match(/\/\d+\/(\w+)$/i);
        return match ? match[1] : void 0;
      };
      Vimeo.prototype.parseParameters = function(params) {
        if (params.t) {
          params.start = getTime$3(params.t);
          delete params.t;
        }
        if (params.h) {
          params.hash = params.h;
          delete params.h;
        }
        return params;
      };
      Vimeo.prototype.parse = function(url, params) {
        var result = {
          mediaType: this.mediaTypes.VIDEO,
          params: this.parseParameters(params),
          id: this.parseUrl(url)
        };
        var hash = this.parseHash(url, params);
        if (hash) {
          result.params.hash = hash;
        }
        return result.id ? result : void 0;
      };
      Vimeo.prototype.createUrl = function(baseUrl, vi, params, type) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        var url = baseUrl + vi.id;
        var startTime = params.start;
        delete params.start;
        if (params.hash) {
          if (type === "embed") {
            params.h = params.hash;
          } else if (type === "long") {
            url += "/" + params.hash;
          }
          delete params.hash;
        }
        url += combineParams$6(params);
        if (startTime) {
          url += "#t=" + startTime;
        }
        return url;
      };
      Vimeo.prototype.createLongUrl = function(vi, params) {
        return this.createUrl("https://vimeo.com/", vi, params, "long");
      };
      Vimeo.prototype.createEmbedUrl = function(vi, params) {
        return this.createUrl("//player.vimeo.com/video/", vi, params, "embed");
      };
      base.bind(new Vimeo());
      var combineParams$7 = util.combineParams, getTime$4 = util.getTime;
      function Wistia() {
        this.provider = "wistia";
        this.alternatives = [];
        this.defaultFormat = "long";
        this.formats = {
          "long": this.createLongUrl,
          embed: this.createEmbedUrl,
          embedjsonp: this.createEmbedJsonpUrl
        };
        this.mediaTypes = {
          VIDEO: "video",
          EMBEDVIDEO: "embedvideo"
        };
      }
      Wistia.prototype.parseUrl = function(url) {
        var match = url.match(/(?:(?:medias|iframe)\/|wvideo=)([\w-]+)/);
        return match ? match[1] : void 0;
      };
      Wistia.prototype.parseChannel = function(url) {
        var match = url.match(/(?:(?:https?:)?\/\/)?([^.]*)\.wistia\./);
        var channel = match ? match[1] : void 0;
        if (channel === "fast" || channel === "content") {
          return void 0;
        }
        return channel;
      };
      Wistia.prototype.parseParameters = function(params, result) {
        if (params.wtime) {
          params.start = getTime$4(params.wtime);
          delete params.wtime;
        }
        if (params.wvideo === result.id) {
          delete params.wvideo;
        }
        return params;
      };
      Wistia.prototype.parseMediaType = function(result) {
        if (result.id && result.channel) {
          return this.mediaTypes.VIDEO;
        } else if (result.id) {
          delete result.channel;
          return this.mediaTypes.EMBEDVIDEO;
        } else {
          return void 0;
        }
      };
      Wistia.prototype.parse = function(url, params) {
        var result = {
          id: this.parseUrl(url),
          channel: this.parseChannel(url)
        };
        result.params = this.parseParameters(params, result);
        result.mediaType = this.parseMediaType(result);
        if (!result.id) {
          return void 0;
        }
        return result;
      };
      Wistia.prototype.createUrl = function(vi, params, url) {
        if (params.start) {
          params.wtime = params.start;
          delete params.start;
        }
        url += combineParams$7(params);
        return url;
      };
      Wistia.prototype.createLongUrl = function(vi, params) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        var url = "https://" + vi.channel + ".wistia.com/medias/" + vi.id;
        return this.createUrl(vi, params, url);
      };
      Wistia.prototype.createEmbedUrl = function(vi, params) {
        if (!vi.id || !(vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.EMBEDVIDEO)) {
          return void 0;
        }
        var url = "https://fast.wistia.com/embed/iframe/" + vi.id;
        return this.createUrl(vi, params, url);
      };
      Wistia.prototype.createEmbedJsonpUrl = function(vi) {
        if (!vi.id || !(vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.EMBEDVIDEO)) {
          return void 0;
        }
        return "https://fast.wistia.com/embed/medias/" + vi.id + ".jsonp";
      };
      base.bind(new Wistia());
      var combineParams$8 = util.combineParams;
      function Youku() {
        this.provider = "youku";
        this.defaultFormat = "long";
        this.formats = {
          embed: this.createEmbedUrl,
          "long": this.createLongUrl,
          flash: this.createFlashUrl,
          "static": this.createStaticUrl
        };
        this.mediaTypes = {
          VIDEO: "video"
        };
      }
      Youku.prototype.parseUrl = function(url) {
        var match = url.match(/(?:(?:embed|sid)\/|v_show\/id_|VideoIDS=)([a-zA-Z0-9]+)/);
        return match ? match[1] : void 0;
      };
      Youku.prototype.parseParameters = function(params) {
        if (params.VideoIDS) {
          delete params.VideoIDS;
        }
        return params;
      };
      Youku.prototype.parse = function(url, params) {
        var _this = this;
        var result = {
          mediaType: this.mediaTypes.VIDEO,
          id: _this.parseUrl(url),
          params: _this.parseParameters(params)
        };
        if (!result.id) {
          return void 0;
        }
        return result;
      };
      Youku.prototype.createUrl = function(baseUrl, vi, params) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        var url = baseUrl + vi.id;
        url += combineParams$8(params);
        return url;
      };
      Youku.prototype.createEmbedUrl = function(vi, params) {
        return this.createUrl("http://player.youku.com/embed/", vi, params);
      };
      Youku.prototype.createLongUrl = function(vi, params) {
        return this.createUrl("http://v.youku.com/v_show/id_", vi, params);
      };
      Youku.prototype.createStaticUrl = function(vi, params) {
        return this.createUrl("http://static.youku.com/v1.0.0638/v/swf/loader.swf?VideoIDS=", vi, params);
      };
      Youku.prototype.createFlashUrl = function(vi, params) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        var url = "http://player.youku.com/player.php/sid/" + vi.id + "/v.swf";
        url += combineParams$8(params);
        return url;
      };
      base.bind(new Youku());
      var combineParams$9 = util.combineParams, getTime$5 = util.getTime;
      function YouTube() {
        this.provider = "youtube";
        this.alternatives = ["youtu", "ytimg"];
        this.defaultFormat = "long";
        this.formats = {
          "short": this.createShortUrl,
          "long": this.createLongUrl,
          embed: this.createEmbedUrl,
          shortImage: this.createShortImageUrl,
          longImage: this.createLongImageUrl
        };
        this.imageQualities = {
          "0": "0",
          "1": "1",
          "2": "2",
          "3": "3",
          DEFAULT: "default",
          HQDEFAULT: "hqdefault",
          SDDEFAULT: "sddefault",
          MQDEFAULT: "mqdefault",
          MAXRESDEFAULT: "maxresdefault"
        };
        this.defaultImageQuality = this.imageQualities.HQDEFAULT;
        this.mediaTypes = {
          VIDEO: "video",
          PLAYLIST: "playlist",
          SHARE: "share",
          CHANNEL: "channel"
        };
      }
      YouTube.prototype.parseVideoUrl = function(url) {
        var match = url.match(/(?:(?:v|vi|be|videos|embed)\/(?!videoseries)|(?:v|ci)=)([\w-]{11})/i);
        return match ? match[1] : void 0;
      };
      YouTube.prototype.parseChannelUrl = function(url) {
        var match = url.match(/\/channel\/([\w-]+)/);
        if (match) {
          return {
            id: match[1],
            mediaType: this.mediaTypes.CHANNEL
          };
        }
        match = url.match(/\/(?:c|user)\/([\w-]+)/);
        if (match) {
          return {
            name: match[1],
            mediaType: this.mediaTypes.CHANNEL
          };
        }
      };
      YouTube.prototype.parseParameters = function(params, result) {
        if (params.start || params.t) {
          params.start = getTime$5(params.start || params.t);
          delete params.t;
        }
        if (params.v === result.id) {
          delete params.v;
        }
        if (params.list === result.id) {
          delete params.list;
        }
        return params;
      };
      YouTube.prototype.parseMediaType = function(result) {
        if (result.params.list) {
          result.list = result.params.list;
          delete result.params.list;
        }
        if (result.id && !result.params.ci) {
          result.mediaType = this.mediaTypes.VIDEO;
        } else if (result.list) {
          delete result.id;
          result.mediaType = this.mediaTypes.PLAYLIST;
        } else if (result.params.ci) {
          delete result.params.ci;
          result.mediaType = this.mediaTypes.SHARE;
        } else {
          return void 0;
        }
        return result;
      };
      YouTube.prototype.parse = function(url, params) {
        var channelResult = this.parseChannelUrl(url);
        if (channelResult) {
          return channelResult;
        } else {
          var result = {
            params,
            id: this.parseVideoUrl(url)
          };
          result.params = this.parseParameters(params, result);
          result = this.parseMediaType(result);
          return result;
        }
      };
      YouTube.prototype.createShortUrl = function(vi, params) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        var url = "https://youtu.be/" + vi.id;
        if (params.start) {
          url += "#t=" + params.start;
        }
        return url;
      };
      YouTube.prototype.createLongUrl = function(vi, params) {
        var url = "";
        var startTime = params.start;
        delete params.start;
        if (vi.mediaType === this.mediaTypes.CHANNEL) {
          if (vi.id) {
            url += "https://www.youtube.com/channel/" + vi.id;
          } else if (vi.name) {
            url += "https://www.youtube.com/c/" + vi.name;
          } else {
            return void 0;
          }
        } else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list) {
          params.feature = "share";
          url += "https://www.youtube.com/playlist";
        } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
          params.v = vi.id;
          url += "https://www.youtube.com/watch";
        } else if (vi.mediaType === this.mediaTypes.SHARE && vi.id) {
          params.ci = vi.id;
          url += "https://www.youtube.com/shared";
        } else {
          return void 0;
        }
        if (vi.list) {
          params.list = vi.list;
        }
        url += combineParams$9(params);
        if (vi.mediaType !== this.mediaTypes.PLAYLIST && startTime) {
          url += "#t=" + startTime;
        }
        return url;
      };
      YouTube.prototype.createEmbedUrl = function(vi, params) {
        var url = "https://www.youtube.com/embed";
        if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list) {
          params.listType = "playlist";
        } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
          url += "/" + vi.id;
          if (params.loop === "1") {
            params.playlist = vi.id;
          }
        } else {
          return void 0;
        }
        if (vi.list) {
          params.list = vi.list;
        }
        url += combineParams$9(params);
        return url;
      };
      YouTube.prototype.createImageUrl = function(baseUrl, vi, params) {
        if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
          return void 0;
        }
        var url = baseUrl + vi.id + "/";
        var quality = params.imageQuality || this.defaultImageQuality;
        return url + quality + ".jpg";
      };
      YouTube.prototype.createShortImageUrl = function(vi, params) {
        return this.createImageUrl("https://i.ytimg.com/vi/", vi, params);
      };
      YouTube.prototype.createLongImageUrl = function(vi, params) {
        return this.createImageUrl("https://img.youtube.com/vi/", vi, params);
      };
      base.bind(new YouTube());
      var combineParams$a = util.combineParams, getTime$6 = util.getTime;
      function SoundCloud() {
        this.provider = "soundcloud";
        this.defaultFormat = "long";
        this.formats = {
          "long": this.createLongUrl,
          embed: this.createEmbedUrl
        };
        this.mediaTypes = {
          TRACK: "track",
          PLAYLIST: "playlist",
          APITRACK: "apitrack",
          APIPLAYLIST: "apiplaylist"
        };
      }
      SoundCloud.prototype.parseUrl = function(url, result) {
        var match = url.match(/(?:m\.)?soundcloud\.com\/(?:([\w-]+)\/(sets\/)?)([\w-]+)/i);
        if (!match) {
          return result;
        }
        result.channel = match[1];
        if (match[1] === "playlists" || match[2]) {
          result.list = match[3];
        } else {
          result.id = match[3];
        }
        return result;
      };
      SoundCloud.prototype.parseParameters = function(params) {
        if (params.t) {
          params.start = getTime$6(params.t);
          delete params.t;
        }
        return params;
      };
      SoundCloud.prototype.parseMediaType = function(result) {
        if (result.id) {
          if (result.channel === "tracks") {
            delete result.channel;
            delete result.params.url;
            result.mediaType = this.mediaTypes.APITRACK;
          } else {
            result.mediaType = this.mediaTypes.TRACK;
          }
        }
        if (result.list) {
          if (result.channel === "playlists") {
            delete result.channel;
            delete result.params.url;
            result.mediaType = this.mediaTypes.APIPLAYLIST;
          } else {
            result.mediaType = this.mediaTypes.PLAYLIST;
          }
        }
        return result;
      };
      SoundCloud.prototype.parse = function(url, params) {
        var result = {};
        result = this.parseUrl(url, result);
        result.params = this.parseParameters(params);
        result = this.parseMediaType(result);
        if (!result.id && !result.list) {
          return void 0;
        }
        return result;
      };
      SoundCloud.prototype.createLongUrl = function(vi, params) {
        var url = "";
        var startTime = params.start;
        delete params.start;
        if (vi.mediaType === this.mediaTypes.TRACK && vi.id && vi.channel) {
          url = "https://soundcloud.com/" + vi.channel + "/" + vi.id;
        } else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list && vi.channel) {
          url = "https://soundcloud.com/" + vi.channel + "/sets/" + vi.list;
        } else if (vi.mediaType === this.mediaTypes.APITRACK && vi.id) {
          url = "https://api.soundcloud.com/tracks/" + vi.id;
        } else if (vi.mediaType === this.mediaTypes.APIPLAYLIST && vi.list) {
          url = "https://api.soundcloud.com/playlists/" + vi.list;
        } else {
          return void 0;
        }
        url += combineParams$a(params);
        if (startTime) {
          url += "#t=" + startTime;
        }
        return url;
      };
      SoundCloud.prototype.createEmbedUrl = function(vi, params) {
        var url = "https://w.soundcloud.com/player/";
        delete params.start;
        if (vi.mediaType === this.mediaTypes.APITRACK && vi.id) {
          params.url = "https%3A//api.soundcloud.com/tracks/" + vi.id;
        } else if (vi.mediaType === this.mediaTypes.APIPLAYLIST && vi.list) {
          params.url = "https%3A//api.soundcloud.com/playlists/" + vi.list;
        } else {
          return void 0;
        }
        url += combineParams$a(params);
        return url;
      };
      base.bind(new SoundCloud());
      var combineParams$b = util.combineParams;
      function TeacherTube() {
        this.provider = "teachertube";
        this.alternatives = [];
        this.defaultFormat = "long";
        this.formats = {
          "long": this.createLongUrl,
          embed: this.createEmbedUrl
        };
        this.mediaTypes = {
          VIDEO: "video",
          AUDIO: "audio",
          DOCUMENT: "document",
          CHANNEL: "channel",
          COLLECTION: "collection",
          GROUP: "group"
        };
      }
      TeacherTube.prototype.parse = function(url, params) {
        var result = {};
        result.list = this.parsePlaylist(params);
        result.params = params;
        var match = url.match(/\/(audio|video|document|user\/channel|collection|group)\/(?:[\w-]+-)?(\w+)/);
        if (!match) {
          return void 0;
        }
        result.mediaType = this.parseMediaType(match[1]);
        result.id = match[2];
        return result;
      };
      TeacherTube.prototype.parsePlaylist = function(params) {
        if (params["playlist-id"]) {
          var list = params["playlist-id"];
          delete params["playlist-id"];
          return list;
        }
        return void 0;
      };
      TeacherTube.prototype.parseMediaType = function(mediaTypeMatch) {
        switch (mediaTypeMatch) {
          case "audio":
            return this.mediaTypes.AUDIO;
          case "video":
            return this.mediaTypes.VIDEO;
          case "document":
            return this.mediaTypes.DOCUMENT;
          case "user/channel":
            return this.mediaTypes.CHANNEL;
          case "collection":
            return this.mediaTypes.COLLECTION;
          case "group":
            return this.mediaTypes.GROUP;
        }
      };
      TeacherTube.prototype.createLongUrl = function(vi, params) {
        if (!vi.id) {
          return void 0;
        }
        var url = "https://www.teachertube.com/";
        if (vi.list) {
          params["playlist-id"] = vi.list;
        }
        if (vi.mediaType === this.mediaTypes.CHANNEL) {
          url += "user/channel/";
        } else {
          url += vi.mediaType + "/";
        }
        url += vi.id;
        url += combineParams$b(params);
        return url;
      };
      TeacherTube.prototype.createEmbedUrl = function(vi, params) {
        if (!vi.id) {
          return void 0;
        }
        var url = "https://www.teachertube.com/embed/";
        if (vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.AUDIO) {
          url += vi.mediaType + "/" + vi.id;
        } else {
          return void 0;
        }
        url += combineParams$b(params);
        return url;
      };
      base.bind(new TeacherTube());
      var combineParams$c = util.combineParams;
      function TikTok() {
        this.provider = "tiktok";
        this.defaultFormat = "long";
        this.formats = {
          "long": this.createLongUrl
        };
        this.mediaTypes = {
          VIDEO: "video"
        };
      }
      TikTok.prototype.parse = function(url, params) {
        var result = {
          params,
          mediaType: this.mediaTypes.VIDEO
        };
        var match = url.match(/@([^/]+)\/video\/(\d{19})/);
        if (!match) {
          return;
        }
        result.channel = match[1];
        result.id = match[2];
        return result;
      };
      TikTok.prototype.createLongUrl = function(vi, params) {
        var url = "";
        if (vi.mediaType === this.mediaTypes.VIDEO && vi.id && vi.channel) {
          url += "https://www.tiktok.com/@".concat(vi.channel, "/video/").concat(vi.id);
        } else {
          return void 0;
        }
        url += combineParams$c(params);
        return url;
      };
      base.bind(new TikTok());
      var combineParams$d = util.combineParams;
      function Ted() {
        this.provider = "ted";
        this.formats = {
          "long": this.createLongUrl,
          embed: this.createEmbedUrl
        };
        this.mediaTypes = {
          VIDEO: "video",
          PLAYLIST: "playlist"
        };
      }
      Ted.prototype.parseUrl = function(url, result) {
        var match = url.match(/\/(talks|playlists\/(\d+))\/([\w-]+)/i);
        var channel = match ? match[1] : void 0;
        if (!channel) {
          return result;
        }
        result.channel = channel.split("/")[0];
        result.id = match[3];
        if (result.channel === "playlists") {
          result.list = match[2];
        }
        return result;
      };
      Ted.prototype.parseMediaType = function(result) {
        if (result.id && result.channel === "playlists") {
          delete result.channel;
          result.mediaType = this.mediaTypes.PLAYLIST;
        }
        if (result.id && result.channel === "talks") {
          delete result.channel;
          result.mediaType = this.mediaTypes.VIDEO;
        }
        return result;
      };
      Ted.prototype.parse = function(url, params) {
        var result = {
          params
        };
        result = this.parseUrl(url, result);
        result = this.parseMediaType(result);
        if (!result.id) {
          return void 0;
        }
        return result;
      };
      Ted.prototype.createLongUrl = function(vi, params) {
        var url = "";
        if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
          url += "https://ted.com/talks/" + vi.id;
        } else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.id) {
          url += "https://ted.com/playlists/" + vi.list + "/" + vi.id;
        } else {
          return void 0;
        }
        url += combineParams$d(params);
        return url;
      };
      Ted.prototype.createEmbedUrl = function(vi, params) {
        var url = "https://embed.ted.com/";
        if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.id) {
          url += "playlists/" + vi.list + "/" + vi.id;
        } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
          url += "talks/" + vi.id;
        } else {
          return void 0;
        }
        url += combineParams$d(params);
        return url;
      };
      base.bind(new Ted());
      var combineParams$e = util.combineParams;
      function Facebook() {
        this.provider = "facebook";
        this.alternatives = [];
        this.defaultFormat = "long";
        this.formats = {
          "long": this.createLongUrl,
          watch: this.createWatchUrl
        };
        this.mediaTypes = {
          VIDEO: "video"
        };
      }
      Facebook.prototype.parse = function(url, params) {
        var result = {
          params,
          mediaType: this.mediaTypes.VIDEO
        };
        var match = url.match(/(?:\/(\d+))?\/videos(?:\/.*?)?\/(\d+)/i);
        if (match) {
          if (match[1]) {
            result.pageId = match[1];
          }
          result.id = match[2];
        }
        if (params.v && !result.id) {
          result.id = params.v;
          delete params.v;
          result.params = params;
        }
        if (!result.id) {
          return void 0;
        }
        return result;
      };
      Facebook.prototype.createWatchUrl = function(vi, params) {
        var url = "https://facebook.com/watch/";
        if (vi.mediaType !== this.mediaTypes.VIDEO || !vi.id) {
          return void 0;
        }
        params = {
          v: vi.id
        };
        url += combineParams$e(params);
        return url;
      };
      Facebook.prototype.createLongUrl = function(vi, params) {
        var url = "https://facebook.com/";
        if (vi.pageId) {
          url += vi.pageId;
        } else {
          return void 0;
        }
        if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
          url += "/videos/" + vi.id;
        } else {
          return void 0;
        }
        url += combineParams$e(params);
        return url;
      };
      base.bind(new Facebook());
      var lib2 = base;
      return lib2;
    });
  }
});

// ../../../node_modules/scriptjs/dist/script.js
var require_script = __commonJS({
  "../../../node_modules/scriptjs/dist/script.js"(exports, module) {
    (function(name, definition) {
      if (typeof module != "undefined" && module.exports)
        module.exports = definition();
      else if (typeof define == "function" && define.amd)
        define(definition);
      else
        this[name] = definition();
    })("$script", function() {
      var doc = document, head = doc.getElementsByTagName("head")[0], s = "string", f = false, push = "push", readyState = "readyState", onreadystatechange = "onreadystatechange", list = {}, ids = {}, delay = {}, scripts = {}, scriptpath, urlArgs;
      function every(ar, fn) {
        for (var i = 0, j = ar.length; i < j; ++i)
          if (!fn(ar[i]))
            return f;
        return 1;
      }
      function each(ar, fn) {
        every(ar, function(el) {
          fn(el);
          return 1;
        });
      }
      function $script(paths, idOrDone, optDone) {
        paths = paths[push] ? paths : [paths];
        var idOrDoneIsDone = idOrDone && idOrDone.call, done = idOrDoneIsDone ? idOrDone : optDone, id = idOrDoneIsDone ? paths.join("") : idOrDone, queue = paths.length;
        function loopFn(item) {
          return item.call ? item() : list[item];
        }
        function callback() {
          if (!--queue) {
            list[id] = 1;
            done && done();
            for (var dset in delay) {
              every(dset.split("|"), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = []);
            }
          }
        }
        setTimeout(function() {
          each(paths, function loading(path, force) {
            if (path === null)
              return callback();
            if (!force && !/^https?:\/\//.test(path) && scriptpath) {
              path = path.indexOf(".js") === -1 ? scriptpath + path + ".js" : scriptpath + path;
            }
            if (scripts[path]) {
              if (id)
                ids[id] = 1;
              return scripts[path] == 2 ? callback() : setTimeout(function() {
                loading(path, true);
              }, 0);
            }
            scripts[path] = 1;
            if (id)
              ids[id] = 1;
            create(path, callback);
          });
        }, 0);
        return $script;
      }
      function create(path, fn) {
        var el = doc.createElement("script"), loaded;
        el.onload = el.onerror = el[onreadystatechange] = function() {
          if (el[readyState] && !/^c|loade/.test(el[readyState]) || loaded)
            return;
          el.onload = el[onreadystatechange] = null;
          loaded = 1;
          scripts[path] = 2;
          fn();
        };
        el.async = 1;
        el.src = urlArgs ? path + (path.indexOf("?") === -1 ? "?" : "&") + urlArgs : path;
        head.insertBefore(el, head.lastChild);
      }
      $script.get = create;
      $script.order = function(scripts2, id, done) {
        (function callback(s2) {
          s2 = scripts2.shift();
          !scripts2.length ? $script(s2, id, done) : $script(s2, callback);
        })();
      };
      $script.path = function(p) {
        scriptpath = p;
      };
      $script.urlArgs = function(str) {
        urlArgs = str;
      };
      $script.ready = function(deps, ready, req) {
        deps = deps[push] ? deps : [deps];
        var missing = [];
        !each(deps, function(dep) {
          list[dep] || missing[push](dep);
        }) && every(deps, function(dep) {
          return list[dep];
        }) ? ready() : !function(key) {
          delay[key] = delay[key] || [];
          delay[key][push](ready);
          req && req(missing);
        }(deps.join("|"));
        return $script;
      };
      $script.done = function(idOrDone) {
        $script([null], idOrDone);
      };
      return $script;
    });
  }
});

// ../../../node_modules/@udecode/plate-media/dist/index.es.js
var import_react2 = __toESM(require_react());

// ../../../node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.development.esm.js
var React2 = __toESM(require_react());

// ../../../node_modules/use-latest/dist/use-latest.esm.js
var React = __toESM(require_react());
var useLatest = function useLatest2(value) {
  var ref = React.useRef(value);
  use_isomorphic_layout_effect_browser_esm_default(function() {
    ref.current = value;
  });
  return ref;
};

// ../../../node_modules/use-composed-ref/dist/use-composed-ref.esm.js
var import_react = __toESM(require_react());
var updateRef = function updateRef2(ref, value) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  ref.current = value;
};
var useComposedRef2 = function useComposedRef3(libRef, userRef) {
  var prevUserRef = (0, import_react.useRef)();
  return (0, import_react.useCallback)(function(instance) {
    libRef.current = instance;
    if (prevUserRef.current) {
      updateRef(prevUserRef.current, null);
    }
    prevUserRef.current = userRef;
    if (!userRef) {
      return;
    }
    updateRef(userRef, instance);
  }, [userRef]);
};
var use_composed_ref_esm_default = useComposedRef2;

// ../../../node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.development.esm.js
var HIDDEN_TEXTAREA_STYLE = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
};
var forceHiddenStyles = function forceHiddenStyles2(node) {
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(function(key) {
    node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], "important");
  });
};
var forceHiddenStyles$1 = forceHiddenStyles;
var hiddenTextarea = null;
var getHeight = function getHeight2(node, sizingData) {
  var height = node.scrollHeight;
  if (sizingData.sizingStyle.boxSizing === "border-box") {
    return height + sizingData.borderSize;
  }
  return height - sizingData.paddingSize;
};
function calculateNodeHeight(sizingData, value, minRows, maxRows) {
  if (minRows === void 0) {
    minRows = 1;
  }
  if (maxRows === void 0) {
    maxRows = Infinity;
  }
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tabindex", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    forceHiddenStyles$1(hiddenTextarea);
  }
  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }
  var paddingSize = sizingData.paddingSize, borderSize = sizingData.borderSize, sizingStyle = sizingData.sizingStyle;
  var boxSizing = sizingStyle.boxSizing;
  Object.keys(sizingStyle).forEach(function(_key) {
    var key = _key;
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  forceHiddenStyles$1(hiddenTextarea);
  hiddenTextarea.value = value;
  var height = getHeight(hiddenTextarea, sizingData);
  hiddenTextarea.value = value;
  height = getHeight(hiddenTextarea, sizingData);
  hiddenTextarea.value = "x";
  var rowHeight = hiddenTextarea.scrollHeight - paddingSize;
  var minHeight = rowHeight * minRows;
  if (boxSizing === "border-box") {
    minHeight = minHeight + paddingSize + borderSize;
  }
  height = Math.max(minHeight, height);
  var maxHeight = rowHeight * maxRows;
  if (boxSizing === "border-box") {
    maxHeight = maxHeight + paddingSize + borderSize;
  }
  height = Math.min(maxHeight, height);
  return [height, rowHeight];
}
var noop = function noop2() {
};
var pick = function pick2(props, obj) {
  return props.reduce(function(acc, prop) {
    acc[prop] = obj[prop];
    return acc;
  }, {});
};
var SIZING_STYLE = [
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopWidth",
  "boxSizing",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "tabSize",
  "textIndent",
  "textRendering",
  "textTransform",
  "width",
  "wordBreak"
];
var isIE = !!document.documentElement.currentStyle;
var getSizingData = function getSizingData2(node) {
  var style = window.getComputedStyle(node);
  if (style === null) {
    return null;
  }
  var sizingStyle = pick(SIZING_STYLE, style);
  var boxSizing = sizingStyle.boxSizing;
  if (boxSizing === "") {
    return null;
  }
  if (isIE && boxSizing === "border-box") {
    sizingStyle.width = parseFloat(sizingStyle.width) + parseFloat(sizingStyle.borderRightWidth) + parseFloat(sizingStyle.borderLeftWidth) + parseFloat(sizingStyle.paddingRight) + parseFloat(sizingStyle.paddingLeft) + "px";
  }
  var paddingSize = parseFloat(sizingStyle.paddingBottom) + parseFloat(sizingStyle.paddingTop);
  var borderSize = parseFloat(sizingStyle.borderBottomWidth) + parseFloat(sizingStyle.borderTopWidth);
  return {
    sizingStyle,
    paddingSize,
    borderSize
  };
};
var getSizingData$1 = getSizingData;
function useListener(target, type, listener) {
  var latestListener = useLatest(listener);
  React2.useLayoutEffect(function() {
    var handler = function handler2(ev) {
      return latestListener.current(ev);
    };
    if (!target) {
      return;
    }
    target.addEventListener(type, handler);
    return function() {
      return target.removeEventListener(type, handler);
    };
  }, []);
}
var useWindowResizeListener = function useWindowResizeListener2(listener) {
  useListener(window, "resize", listener);
};
var useFontsLoadedListener = function useFontsLoadedListener2(listener) {
  useListener(document.fonts, "loadingdone", listener);
};
var _excluded = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"];
var TextareaAutosize = function TextareaAutosize2(_ref, userRef) {
  var cacheMeasurements = _ref.cacheMeasurements, maxRows = _ref.maxRows, minRows = _ref.minRows, _ref$onChange = _ref.onChange, onChange = _ref$onChange === void 0 ? noop : _ref$onChange, _ref$onHeightChange = _ref.onHeightChange, onHeightChange = _ref$onHeightChange === void 0 ? noop : _ref$onHeightChange, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (props.style) {
    if ("maxHeight" in props.style) {
      throw new Error("Using `style.maxHeight` for <TextareaAutosize/> is not supported. Please use `maxRows`.");
    }
    if ("minHeight" in props.style) {
      throw new Error("Using `style.minHeight` for <TextareaAutosize/> is not supported. Please use `minRows`.");
    }
  }
  var isControlled = props.value !== void 0;
  var libRef = React2.useRef(null);
  var ref = use_composed_ref_esm_default(libRef, userRef);
  var heightRef = React2.useRef(0);
  var measurementsCacheRef = React2.useRef();
  var resizeTextarea = function resizeTextarea2() {
    var node = libRef.current;
    var nodeSizingData = cacheMeasurements && measurementsCacheRef.current ? measurementsCacheRef.current : getSizingData$1(node);
    if (!nodeSizingData) {
      return;
    }
    measurementsCacheRef.current = nodeSizingData;
    var _calculateNodeHeight = calculateNodeHeight(nodeSizingData, node.value || node.placeholder || "x", minRows, maxRows), height = _calculateNodeHeight[0], rowHeight = _calculateNodeHeight[1];
    if (heightRef.current !== height) {
      heightRef.current = height;
      node.style.setProperty("height", height + "px", "important");
      onHeightChange(height, {
        rowHeight
      });
    }
  };
  var handleChange = function handleChange2(event) {
    if (!isControlled) {
      resizeTextarea();
    }
    onChange(event);
  };
  {
    React2.useLayoutEffect(resizeTextarea);
    useWindowResizeListener(resizeTextarea);
    useFontsLoadedListener(resizeTextarea);
    return React2.createElement("textarea", _extends({}, props, {
      onChange: handleChange,
      ref
    }));
  }
};
var index = React2.forwardRef(TextareaAutosize);

// ../../../node_modules/@udecode/plate-media/dist/index.es.js
var import_js_video_url_parser = __toESM(require_jsVideoUrlParser());

// ../../../node_modules/re-resizable/lib/index.js
var React4 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// ../../../node_modules/re-resizable/lib/resizer.js
var React3 = __toESM(require_react());
var __extends = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var rowSizeBase = {
  width: "100%",
  height: "10px",
  top: "0px",
  left: "0px",
  cursor: "row-resize"
};
var colSizeBase = {
  width: "10px",
  height: "100%",
  top: "0px",
  left: "0px",
  cursor: "col-resize"
};
var edgeBase = {
  width: "20px",
  height: "20px",
  position: "absolute"
};
var styles = {
  top: __assign(__assign({}, rowSizeBase), { top: "-5px" }),
  right: __assign(__assign({}, colSizeBase), { left: void 0, right: "-5px" }),
  bottom: __assign(__assign({}, rowSizeBase), { top: void 0, bottom: "-5px" }),
  left: __assign(__assign({}, colSizeBase), { left: "-5px" }),
  topRight: __assign(__assign({}, edgeBase), { right: "-10px", top: "-10px", cursor: "ne-resize" }),
  bottomRight: __assign(__assign({}, edgeBase), { right: "-10px", bottom: "-10px", cursor: "se-resize" }),
  bottomLeft: __assign(__assign({}, edgeBase), { left: "-10px", bottom: "-10px", cursor: "sw-resize" }),
  topLeft: __assign(__assign({}, edgeBase), { left: "-10px", top: "-10px", cursor: "nw-resize" })
};
var Resizer = function(_super) {
  __extends(Resizer2, _super);
  function Resizer2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.onMouseDown = function(e) {
      _this.props.onResizeStart(e, _this.props.direction);
    };
    _this.onTouchStart = function(e) {
      _this.props.onResizeStart(e, _this.props.direction);
    };
    return _this;
  }
  Resizer2.prototype.render = function() {
    return React3.createElement("div", { className: this.props.className || "", style: __assign(__assign({ position: "absolute", userSelect: "none" }, styles[this.props.direction]), this.props.replaceStyles || {}), onMouseDown: this.onMouseDown, onTouchStart: this.onTouchStart }, this.props.children);
  };
  return Resizer2;
}(React3.PureComponent);

// ../../../node_modules/re-resizable/lib/index.js
var __extends2 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var DEFAULT_SIZE = {
  width: "auto",
  height: "auto"
};
var clamp = function(n, min, max) {
  return Math.max(Math.min(n, max), min);
};
var snap = function(n, size) {
  return Math.round(n / size) * size;
};
var hasDirection = function(dir, target) {
  return new RegExp(dir, "i").test(target);
};
var isTouchEvent = function(event) {
  return Boolean(event.touches && event.touches.length);
};
var isMouseEvent = function(event) {
  return Boolean((event.clientX || event.clientX === 0) && (event.clientY || event.clientY === 0));
};
var findClosestSnap = function(n, snapArray, snapGap) {
  if (snapGap === void 0) {
    snapGap = 0;
  }
  var closestGapIndex = snapArray.reduce(function(prev, curr, index2) {
    return Math.abs(curr - n) < Math.abs(snapArray[prev] - n) ? index2 : prev;
  }, 0);
  var gap = Math.abs(snapArray[closestGapIndex] - n);
  return snapGap === 0 || gap < snapGap ? snapArray[closestGapIndex] : n;
};
var getStringSize = function(n) {
  n = n.toString();
  if (n === "auto") {
    return n;
  }
  if (n.endsWith("px")) {
    return n;
  }
  if (n.endsWith("%")) {
    return n;
  }
  if (n.endsWith("vh")) {
    return n;
  }
  if (n.endsWith("vw")) {
    return n;
  }
  if (n.endsWith("vmax")) {
    return n;
  }
  if (n.endsWith("vmin")) {
    return n;
  }
  return n + "px";
};
var getPixelSize = function(size, parentSize, innerWidth, innerHeight) {
  if (size && typeof size === "string") {
    if (size.endsWith("px")) {
      return Number(size.replace("px", ""));
    }
    if (size.endsWith("%")) {
      var ratio = Number(size.replace("%", "")) / 100;
      return parentSize * ratio;
    }
    if (size.endsWith("vw")) {
      var ratio = Number(size.replace("vw", "")) / 100;
      return innerWidth * ratio;
    }
    if (size.endsWith("vh")) {
      var ratio = Number(size.replace("vh", "")) / 100;
      return innerHeight * ratio;
    }
  }
  return size;
};
var calculateNewMax = function(parentSize, innerWidth, innerHeight, maxWidth, maxHeight, minWidth, minHeight) {
  maxWidth = getPixelSize(maxWidth, parentSize.width, innerWidth, innerHeight);
  maxHeight = getPixelSize(maxHeight, parentSize.height, innerWidth, innerHeight);
  minWidth = getPixelSize(minWidth, parentSize.width, innerWidth, innerHeight);
  minHeight = getPixelSize(minHeight, parentSize.height, innerWidth, innerHeight);
  return {
    maxWidth: typeof maxWidth === "undefined" ? void 0 : Number(maxWidth),
    maxHeight: typeof maxHeight === "undefined" ? void 0 : Number(maxHeight),
    minWidth: typeof minWidth === "undefined" ? void 0 : Number(minWidth),
    minHeight: typeof minHeight === "undefined" ? void 0 : Number(minHeight)
  };
};
var definedProps = [
  "as",
  "style",
  "className",
  "grid",
  "snap",
  "bounds",
  "boundsByDirection",
  "size",
  "defaultSize",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "lockAspectRatio",
  "lockAspectRatioExtraWidth",
  "lockAspectRatioExtraHeight",
  "enable",
  "handleStyles",
  "handleClasses",
  "handleWrapperStyle",
  "handleWrapperClass",
  "children",
  "onResizeStart",
  "onResize",
  "onResizeStop",
  "handleComponent",
  "scale",
  "resizeRatio",
  "snapGap"
];
var baseClassName = "__resizable_base__";
var Resizable = function(_super) {
  __extends2(Resizable3, _super);
  function Resizable3(props) {
    var _this = _super.call(this, props) || this;
    _this.ratio = 1;
    _this.resizable = null;
    _this.parentLeft = 0;
    _this.parentTop = 0;
    _this.resizableLeft = 0;
    _this.resizableRight = 0;
    _this.resizableTop = 0;
    _this.resizableBottom = 0;
    _this.targetLeft = 0;
    _this.targetTop = 0;
    _this.appendBase = function() {
      if (!_this.resizable || !_this.window) {
        return null;
      }
      var parent = _this.parentNode;
      if (!parent) {
        return null;
      }
      var element = _this.window.document.createElement("div");
      element.style.width = "100%";
      element.style.height = "100%";
      element.style.position = "absolute";
      element.style.transform = "scale(0, 0)";
      element.style.left = "0";
      element.style.flex = "0 0 100%";
      if (element.classList) {
        element.classList.add(baseClassName);
      } else {
        element.className += baseClassName;
      }
      parent.appendChild(element);
      return element;
    };
    _this.removeBase = function(base) {
      var parent = _this.parentNode;
      if (!parent) {
        return;
      }
      parent.removeChild(base);
    };
    _this.ref = function(c) {
      if (c) {
        _this.resizable = c;
      }
    };
    _this.state = {
      isResizing: false,
      width: typeof (_this.propsSize && _this.propsSize.width) === "undefined" ? "auto" : _this.propsSize && _this.propsSize.width,
      height: typeof (_this.propsSize && _this.propsSize.height) === "undefined" ? "auto" : _this.propsSize && _this.propsSize.height,
      direction: "right",
      original: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      backgroundStyle: {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0)",
        cursor: "auto",
        opacity: 0,
        position: "fixed",
        zIndex: 9999,
        top: "0",
        left: "0",
        bottom: "0",
        right: "0"
      },
      flexBasis: void 0
    };
    _this.onResizeStart = _this.onResizeStart.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    return _this;
  }
  Object.defineProperty(Resizable3.prototype, "parentNode", {
    get: function() {
      if (!this.resizable) {
        return null;
      }
      return this.resizable.parentNode;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Resizable3.prototype, "window", {
    get: function() {
      if (!this.resizable) {
        return null;
      }
      if (!this.resizable.ownerDocument) {
        return null;
      }
      return this.resizable.ownerDocument.defaultView;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Resizable3.prototype, "propsSize", {
    get: function() {
      return this.props.size || this.props.defaultSize || DEFAULT_SIZE;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Resizable3.prototype, "size", {
    get: function() {
      var width = 0;
      var height = 0;
      if (this.resizable && this.window) {
        var orgWidth = this.resizable.offsetWidth;
        var orgHeight = this.resizable.offsetHeight;
        var orgPosition = this.resizable.style.position;
        if (orgPosition !== "relative") {
          this.resizable.style.position = "relative";
        }
        width = this.resizable.style.width !== "auto" ? this.resizable.offsetWidth : orgWidth;
        height = this.resizable.style.height !== "auto" ? this.resizable.offsetHeight : orgHeight;
        this.resizable.style.position = orgPosition;
      }
      return { width, height };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Resizable3.prototype, "sizeStyle", {
    get: function() {
      var _this = this;
      var size = this.props.size;
      var getSize = function(key) {
        if (typeof _this.state[key] === "undefined" || _this.state[key] === "auto") {
          return "auto";
        }
        if (_this.propsSize && _this.propsSize[key] && _this.propsSize[key].toString().endsWith("%")) {
          if (_this.state[key].toString().endsWith("%")) {
            return _this.state[key].toString();
          }
          var parentSize = _this.getParentSize();
          var value = Number(_this.state[key].toString().replace("px", ""));
          var percent = value / parentSize[key] * 100;
          return percent + "%";
        }
        return getStringSize(_this.state[key]);
      };
      var width = size && typeof size.width !== "undefined" && !this.state.isResizing ? getStringSize(size.width) : getSize("width");
      var height = size && typeof size.height !== "undefined" && !this.state.isResizing ? getStringSize(size.height) : getSize("height");
      return { width, height };
    },
    enumerable: false,
    configurable: true
  });
  Resizable3.prototype.getParentSize = function() {
    if (!this.parentNode) {
      if (!this.window) {
        return { width: 0, height: 0 };
      }
      return { width: this.window.innerWidth, height: this.window.innerHeight };
    }
    var base = this.appendBase();
    if (!base) {
      return { width: 0, height: 0 };
    }
    var wrapChanged = false;
    var wrap = this.parentNode.style.flexWrap;
    if (wrap !== "wrap") {
      wrapChanged = true;
      this.parentNode.style.flexWrap = "wrap";
    }
    base.style.position = "relative";
    base.style.minWidth = "100%";
    base.style.minHeight = "100%";
    var size = {
      width: base.offsetWidth,
      height: base.offsetHeight
    };
    if (wrapChanged) {
      this.parentNode.style.flexWrap = wrap;
    }
    this.removeBase(base);
    return size;
  };
  Resizable3.prototype.bindEvents = function() {
    if (this.window) {
      this.window.addEventListener("mouseup", this.onMouseUp);
      this.window.addEventListener("mousemove", this.onMouseMove);
      this.window.addEventListener("mouseleave", this.onMouseUp);
      this.window.addEventListener("touchmove", this.onMouseMove, {
        capture: true,
        passive: false
      });
      this.window.addEventListener("touchend", this.onMouseUp);
    }
  };
  Resizable3.prototype.unbindEvents = function() {
    if (this.window) {
      this.window.removeEventListener("mouseup", this.onMouseUp);
      this.window.removeEventListener("mousemove", this.onMouseMove);
      this.window.removeEventListener("mouseleave", this.onMouseUp);
      this.window.removeEventListener("touchmove", this.onMouseMove, true);
      this.window.removeEventListener("touchend", this.onMouseUp);
    }
  };
  Resizable3.prototype.componentDidMount = function() {
    if (!this.resizable || !this.window) {
      return;
    }
    var computedStyle = this.window.getComputedStyle(this.resizable);
    this.setState({
      width: this.state.width || this.size.width,
      height: this.state.height || this.size.height,
      flexBasis: computedStyle.flexBasis !== "auto" ? computedStyle.flexBasis : void 0
    });
  };
  Resizable3.prototype.componentWillUnmount = function() {
    if (this.window) {
      this.unbindEvents();
    }
  };
  Resizable3.prototype.createSizeForCssProperty = function(newSize, kind) {
    var propsSize = this.propsSize && this.propsSize[kind];
    return this.state[kind] === "auto" && this.state.original[kind] === newSize && (typeof propsSize === "undefined" || propsSize === "auto") ? "auto" : newSize;
  };
  Resizable3.prototype.calculateNewMaxFromBoundary = function(maxWidth, maxHeight) {
    var boundsByDirection = this.props.boundsByDirection;
    var direction = this.state.direction;
    var widthByDirection = boundsByDirection && hasDirection("left", direction);
    var heightByDirection = boundsByDirection && hasDirection("top", direction);
    var boundWidth;
    var boundHeight;
    if (this.props.bounds === "parent") {
      var parent_1 = this.parentNode;
      if (parent_1) {
        boundWidth = widthByDirection ? this.resizableRight - this.parentLeft : parent_1.offsetWidth + (this.parentLeft - this.resizableLeft);
        boundHeight = heightByDirection ? this.resizableBottom - this.parentTop : parent_1.offsetHeight + (this.parentTop - this.resizableTop);
      }
    } else if (this.props.bounds === "window") {
      if (this.window) {
        boundWidth = widthByDirection ? this.resizableRight : this.window.innerWidth - this.resizableLeft;
        boundHeight = heightByDirection ? this.resizableBottom : this.window.innerHeight - this.resizableTop;
      }
    } else if (this.props.bounds) {
      boundWidth = widthByDirection ? this.resizableRight - this.targetLeft : this.props.bounds.offsetWidth + (this.targetLeft - this.resizableLeft);
      boundHeight = heightByDirection ? this.resizableBottom - this.targetTop : this.props.bounds.offsetHeight + (this.targetTop - this.resizableTop);
    }
    if (boundWidth && Number.isFinite(boundWidth)) {
      maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
    }
    if (boundHeight && Number.isFinite(boundHeight)) {
      maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
    }
    return { maxWidth, maxHeight };
  };
  Resizable3.prototype.calculateNewSizeFromDirection = function(clientX, clientY) {
    var scale = this.props.scale || 1;
    var resizeRatio = this.props.resizeRatio || 1;
    var _a = this.state, direction = _a.direction, original = _a.original;
    var _b = this.props, lockAspectRatio = _b.lockAspectRatio, lockAspectRatioExtraHeight = _b.lockAspectRatioExtraHeight, lockAspectRatioExtraWidth = _b.lockAspectRatioExtraWidth;
    var newWidth = original.width;
    var newHeight = original.height;
    var extraHeight = lockAspectRatioExtraHeight || 0;
    var extraWidth = lockAspectRatioExtraWidth || 0;
    if (hasDirection("right", direction)) {
      newWidth = original.width + (clientX - original.x) * resizeRatio / scale;
      if (lockAspectRatio) {
        newHeight = (newWidth - extraWidth) / this.ratio + extraHeight;
      }
    }
    if (hasDirection("left", direction)) {
      newWidth = original.width - (clientX - original.x) * resizeRatio / scale;
      if (lockAspectRatio) {
        newHeight = (newWidth - extraWidth) / this.ratio + extraHeight;
      }
    }
    if (hasDirection("bottom", direction)) {
      newHeight = original.height + (clientY - original.y) * resizeRatio / scale;
      if (lockAspectRatio) {
        newWidth = (newHeight - extraHeight) * this.ratio + extraWidth;
      }
    }
    if (hasDirection("top", direction)) {
      newHeight = original.height - (clientY - original.y) * resizeRatio / scale;
      if (lockAspectRatio) {
        newWidth = (newHeight - extraHeight) * this.ratio + extraWidth;
      }
    }
    return { newWidth, newHeight };
  };
  Resizable3.prototype.calculateNewSizeFromAspectRatio = function(newWidth, newHeight, max, min) {
    var _a = this.props, lockAspectRatio = _a.lockAspectRatio, lockAspectRatioExtraHeight = _a.lockAspectRatioExtraHeight, lockAspectRatioExtraWidth = _a.lockAspectRatioExtraWidth;
    var computedMinWidth = typeof min.width === "undefined" ? 10 : min.width;
    var computedMaxWidth = typeof max.width === "undefined" || max.width < 0 ? newWidth : max.width;
    var computedMinHeight = typeof min.height === "undefined" ? 10 : min.height;
    var computedMaxHeight = typeof max.height === "undefined" || max.height < 0 ? newHeight : max.height;
    var extraHeight = lockAspectRatioExtraHeight || 0;
    var extraWidth = lockAspectRatioExtraWidth || 0;
    if (lockAspectRatio) {
      var extraMinWidth = (computedMinHeight - extraHeight) * this.ratio + extraWidth;
      var extraMaxWidth = (computedMaxHeight - extraHeight) * this.ratio + extraWidth;
      var extraMinHeight = (computedMinWidth - extraWidth) / this.ratio + extraHeight;
      var extraMaxHeight = (computedMaxWidth - extraWidth) / this.ratio + extraHeight;
      var lockedMinWidth = Math.max(computedMinWidth, extraMinWidth);
      var lockedMaxWidth = Math.min(computedMaxWidth, extraMaxWidth);
      var lockedMinHeight = Math.max(computedMinHeight, extraMinHeight);
      var lockedMaxHeight = Math.min(computedMaxHeight, extraMaxHeight);
      newWidth = clamp(newWidth, lockedMinWidth, lockedMaxWidth);
      newHeight = clamp(newHeight, lockedMinHeight, lockedMaxHeight);
    } else {
      newWidth = clamp(newWidth, computedMinWidth, computedMaxWidth);
      newHeight = clamp(newHeight, computedMinHeight, computedMaxHeight);
    }
    return { newWidth, newHeight };
  };
  Resizable3.prototype.setBoundingClientRect = function() {
    if (this.props.bounds === "parent") {
      var parent_2 = this.parentNode;
      if (parent_2) {
        var parentRect = parent_2.getBoundingClientRect();
        this.parentLeft = parentRect.left;
        this.parentTop = parentRect.top;
      }
    }
    if (this.props.bounds && typeof this.props.bounds !== "string") {
      var targetRect = this.props.bounds.getBoundingClientRect();
      this.targetLeft = targetRect.left;
      this.targetTop = targetRect.top;
    }
    if (this.resizable) {
      var _a = this.resizable.getBoundingClientRect(), left = _a.left, top_1 = _a.top, right = _a.right, bottom = _a.bottom;
      this.resizableLeft = left;
      this.resizableRight = right;
      this.resizableTop = top_1;
      this.resizableBottom = bottom;
    }
  };
  Resizable3.prototype.onResizeStart = function(event, direction) {
    if (!this.resizable || !this.window) {
      return;
    }
    var clientX = 0;
    var clientY = 0;
    if (event.nativeEvent && isMouseEvent(event.nativeEvent)) {
      clientX = event.nativeEvent.clientX;
      clientY = event.nativeEvent.clientY;
    } else if (event.nativeEvent && isTouchEvent(event.nativeEvent)) {
      clientX = event.nativeEvent.touches[0].clientX;
      clientY = event.nativeEvent.touches[0].clientY;
    }
    if (this.props.onResizeStart) {
      if (this.resizable) {
        var startResize = this.props.onResizeStart(event, direction, this.resizable);
        if (startResize === false) {
          return;
        }
      }
    }
    if (this.props.size) {
      if (typeof this.props.size.height !== "undefined" && this.props.size.height !== this.state.height) {
        this.setState({ height: this.props.size.height });
      }
      if (typeof this.props.size.width !== "undefined" && this.props.size.width !== this.state.width) {
        this.setState({ width: this.props.size.width });
      }
    }
    this.ratio = typeof this.props.lockAspectRatio === "number" ? this.props.lockAspectRatio : this.size.width / this.size.height;
    var flexBasis;
    var computedStyle = this.window.getComputedStyle(this.resizable);
    if (computedStyle.flexBasis !== "auto") {
      var parent_3 = this.parentNode;
      if (parent_3) {
        var dir = this.window.getComputedStyle(parent_3).flexDirection;
        this.flexDir = dir.startsWith("row") ? "row" : "column";
        flexBasis = computedStyle.flexBasis;
      }
    }
    this.setBoundingClientRect();
    this.bindEvents();
    var state = {
      original: {
        x: clientX,
        y: clientY,
        width: this.size.width,
        height: this.size.height
      },
      isResizing: true,
      backgroundStyle: __assign2(__assign2({}, this.state.backgroundStyle), { cursor: this.window.getComputedStyle(event.target).cursor || "auto" }),
      direction,
      flexBasis
    };
    this.setState(state);
  };
  Resizable3.prototype.onMouseMove = function(event) {
    var _this = this;
    if (!this.state.isResizing || !this.resizable || !this.window) {
      return;
    }
    if (this.window.TouchEvent && isTouchEvent(event)) {
      try {
        event.preventDefault();
        event.stopPropagation();
      } catch (e) {
      }
    }
    var _a = this.props, maxWidth = _a.maxWidth, maxHeight = _a.maxHeight, minWidth = _a.minWidth, minHeight = _a.minHeight;
    var clientX = isTouchEvent(event) ? event.touches[0].clientX : event.clientX;
    var clientY = isTouchEvent(event) ? event.touches[0].clientY : event.clientY;
    var _b = this.state, direction = _b.direction, original = _b.original, width = _b.width, height = _b.height;
    var parentSize = this.getParentSize();
    var max = calculateNewMax(parentSize, this.window.innerWidth, this.window.innerHeight, maxWidth, maxHeight, minWidth, minHeight);
    maxWidth = max.maxWidth;
    maxHeight = max.maxHeight;
    minWidth = max.minWidth;
    minHeight = max.minHeight;
    var _c = this.calculateNewSizeFromDirection(clientX, clientY), newHeight = _c.newHeight, newWidth = _c.newWidth;
    var boundaryMax = this.calculateNewMaxFromBoundary(maxWidth, maxHeight);
    if (this.props.snap && this.props.snap.x) {
      newWidth = findClosestSnap(newWidth, this.props.snap.x, this.props.snapGap);
    }
    if (this.props.snap && this.props.snap.y) {
      newHeight = findClosestSnap(newHeight, this.props.snap.y, this.props.snapGap);
    }
    var newSize = this.calculateNewSizeFromAspectRatio(newWidth, newHeight, { width: boundaryMax.maxWidth, height: boundaryMax.maxHeight }, { width: minWidth, height: minHeight });
    newWidth = newSize.newWidth;
    newHeight = newSize.newHeight;
    if (this.props.grid) {
      var newGridWidth = snap(newWidth, this.props.grid[0]);
      var newGridHeight = snap(newHeight, this.props.grid[1]);
      var gap = this.props.snapGap || 0;
      newWidth = gap === 0 || Math.abs(newGridWidth - newWidth) <= gap ? newGridWidth : newWidth;
      newHeight = gap === 0 || Math.abs(newGridHeight - newHeight) <= gap ? newGridHeight : newHeight;
    }
    var delta = {
      width: newWidth - original.width,
      height: newHeight - original.height
    };
    if (width && typeof width === "string") {
      if (width.endsWith("%")) {
        var percent = newWidth / parentSize.width * 100;
        newWidth = percent + "%";
      } else if (width.endsWith("vw")) {
        var vw = newWidth / this.window.innerWidth * 100;
        newWidth = vw + "vw";
      } else if (width.endsWith("vh")) {
        var vh = newWidth / this.window.innerHeight * 100;
        newWidth = vh + "vh";
      }
    }
    if (height && typeof height === "string") {
      if (height.endsWith("%")) {
        var percent = newHeight / parentSize.height * 100;
        newHeight = percent + "%";
      } else if (height.endsWith("vw")) {
        var vw = newHeight / this.window.innerWidth * 100;
        newHeight = vw + "vw";
      } else if (height.endsWith("vh")) {
        var vh = newHeight / this.window.innerHeight * 100;
        newHeight = vh + "vh";
      }
    }
    var newState = {
      width: this.createSizeForCssProperty(newWidth, "width"),
      height: this.createSizeForCssProperty(newHeight, "height")
    };
    if (this.flexDir === "row") {
      newState.flexBasis = newState.width;
    } else if (this.flexDir === "column") {
      newState.flexBasis = newState.height;
    }
    (0, import_react_dom.flushSync)(function() {
      _this.setState(newState);
    });
    if (this.props.onResize) {
      this.props.onResize(event, direction, this.resizable, delta);
    }
  };
  Resizable3.prototype.onMouseUp = function(event) {
    var _a = this.state, isResizing = _a.isResizing, direction = _a.direction, original = _a.original;
    if (!isResizing || !this.resizable) {
      return;
    }
    var delta = {
      width: this.size.width - original.width,
      height: this.size.height - original.height
    };
    if (this.props.onResizeStop) {
      this.props.onResizeStop(event, direction, this.resizable, delta);
    }
    if (this.props.size) {
      this.setState(this.props.size);
    }
    this.unbindEvents();
    this.setState({
      isResizing: false,
      backgroundStyle: __assign2(__assign2({}, this.state.backgroundStyle), { cursor: "auto" })
    });
  };
  Resizable3.prototype.updateSize = function(size) {
    this.setState({ width: size.width, height: size.height });
  };
  Resizable3.prototype.renderResizer = function() {
    var _this = this;
    var _a = this.props, enable = _a.enable, handleStyles = _a.handleStyles, handleClasses = _a.handleClasses, handleWrapperStyle = _a.handleWrapperStyle, handleWrapperClass = _a.handleWrapperClass, handleComponent = _a.handleComponent;
    if (!enable) {
      return null;
    }
    var resizers = Object.keys(enable).map(function(dir) {
      if (enable[dir] !== false) {
        return React4.createElement(Resizer, { key: dir, direction: dir, onResizeStart: _this.onResizeStart, replaceStyles: handleStyles && handleStyles[dir], className: handleClasses && handleClasses[dir] }, handleComponent && handleComponent[dir] ? handleComponent[dir] : null);
      }
      return null;
    });
    return React4.createElement("div", { className: handleWrapperClass, style: handleWrapperStyle }, resizers);
  };
  Resizable3.prototype.render = function() {
    var _this = this;
    var extendsProps = Object.keys(this.props).reduce(function(acc, key) {
      if (definedProps.indexOf(key) !== -1) {
        return acc;
      }
      acc[key] = _this.props[key];
      return acc;
    }, {});
    var style = __assign2(__assign2(__assign2({ position: "relative", userSelect: this.state.isResizing ? "none" : "auto" }, this.props.style), this.sizeStyle), { maxWidth: this.props.maxWidth, maxHeight: this.props.maxHeight, minWidth: this.props.minWidth, minHeight: this.props.minHeight, boxSizing: "border-box", flexShrink: 0 });
    if (this.state.flexBasis) {
      style.flexBasis = this.state.flexBasis;
    }
    var Wrapper = this.props.as || "div";
    return React4.createElement(
      Wrapper,
      __assign2({ ref: this.ref, style, className: this.props.className }, extendsProps),
      this.state.isResizing && React4.createElement("div", { style: this.state.backgroundStyle }),
      this.props.children,
      this.renderResizer()
    );
  };
  Resizable3.defaultProps = {
    as: "div",
    onResizeStart: function() {
    },
    onResize: function() {
    },
    onResizeStop: function() {
    },
    enable: {
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true
    },
    style: {},
    grid: [1, 1],
    lockAspectRatio: false,
    lockAspectRatioExtraWidth: 0,
    lockAspectRatioExtraHeight: 0,
    scale: 1,
    resizeRatio: 1,
    snapGap: 0
  };
  return Resizable3;
}(React4.PureComponent);

// ../../../node_modules/@udecode/plate-media/dist/index.es.js
var captionGlobalStore = createStore("caption")({
  focusEndCaptionPath: null,
  focusStartCaptionPath: null
});
function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var lib = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var IS_MAC = () => typeof window != "undefined" && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
  var MODIFIERS = {
    alt: "altKey",
    control: "ctrlKey",
    meta: "metaKey",
    shift: "shiftKey"
  };
  var ALIASES = () => ({
    add: "+",
    break: "pause",
    cmd: "meta",
    command: "meta",
    ctl: "control",
    ctrl: "control",
    del: "delete",
    down: "arrowdown",
    esc: "escape",
    ins: "insert",
    left: "arrowleft",
    mod: IS_MAC() ? "meta" : "control",
    opt: "alt",
    option: "alt",
    return: "enter",
    right: "arrowright",
    space: " ",
    spacebar: " ",
    up: "arrowup",
    win: "meta",
    windows: "meta"
  });
  var CODES = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    control: 17,
    alt: 18,
    pause: 19,
    capslock: 20,
    escape: 27,
    " ": 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    arrowleft: 37,
    arrowup: 38,
    arrowright: 39,
    arrowdown: 40,
    insert: 45,
    delete: 46,
    meta: 91,
    numlock: 144,
    scrolllock: 145,
    ";": 186,
    "=": 187,
    ",": 188,
    "-": 189,
    ".": 190,
    "/": 191,
    "`": 192,
    "[": 219,
    "\\": 220,
    "]": 221,
    "'": 222
  };
  for (var f = 1; f < 20; f++) {
    CODES["f" + f] = 111 + f;
  }
  function isHotkey2(hotkey, options, event) {
    if (options && !("byKey" in options)) {
      event = options;
      options = null;
    }
    if (!Array.isArray(hotkey)) {
      hotkey = [hotkey];
    }
    var array = hotkey.map(function(string) {
      return parseHotkey(string, options);
    });
    var check = function check2(e) {
      return array.some(function(object) {
        return compareHotkey(object, e);
      });
    };
    var ret = event == null ? check : check(event);
    return ret;
  }
  function isCodeHotkey(hotkey, event) {
    return isHotkey2(hotkey, event);
  }
  function isKeyHotkey(hotkey, event) {
    return isHotkey2(hotkey, { byKey: true }, event);
  }
  function parseHotkey(hotkey, options) {
    var byKey = options && options.byKey;
    var ret = {};
    hotkey = hotkey.replace("++", "+add");
    var values = hotkey.split("+");
    var length = values.length;
    for (var k in MODIFIERS) {
      ret[MODIFIERS[k]] = false;
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = void 0;
    try {
      for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;
        var optional = value.endsWith("?") && value.length > 1;
        if (optional) {
          value = value.slice(0, -1);
        }
        var name = toKeyName(value);
        var modifier = MODIFIERS[name];
        if (length === 1 || !modifier) {
          if (byKey) {
            ret.key = name;
          } else {
            ret.which = toKeyCode(value);
          }
        }
        if (modifier) {
          ret[modifier] = optional ? null : true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    return ret;
  }
  function compareHotkey(object, event) {
    for (var key in object) {
      var expected = object[key];
      var actual = void 0;
      if (expected == null) {
        continue;
      }
      if (key === "key" && event.key != null) {
        actual = event.key.toLowerCase();
      } else if (key === "which") {
        actual = expected === 91 && event.which === 93 ? 91 : event.which;
      } else {
        actual = event[key];
      }
      if (actual == null && expected === false) {
        continue;
      }
      if (actual !== expected) {
        return false;
      }
    }
    return true;
  }
  function toKeyCode(name) {
    name = toKeyName(name);
    var code = CODES[name] || name.toUpperCase().charCodeAt(0);
    return code;
  }
  function toKeyName(name) {
    name = name.toLowerCase();
    name = ALIASES()[name] || name;
    return name;
  }
  exports.default = isHotkey2;
  exports.isHotkey = isHotkey2;
  exports.isCodeHotkey = isCodeHotkey;
  exports.isKeyHotkey = isKeyHotkey;
  exports.parseHotkey = parseHotkey;
  exports.compareHotkey = compareHotkey;
  exports.toKeyCode = toKeyCode;
  exports.toKeyName = toKeyName;
});
var isHotkey = unwrapExports(lib);
lib.isHotkey;
lib.isCodeHotkey;
lib.isKeyHotkey;
lib.parseHotkey;
lib.compareHotkey;
lib.toKeyCode;
lib.toKeyName;
var getOnKeyDownCaption = (pluginKey) => (editor) => (e) => {
  if (isHotkey("down", e)) {
    const entry = getBlockAbove(editor, {
      match: {
        type: getPluginType(editor, pluginKey)
      }
    });
    if (!entry)
      return;
    captionGlobalStore.set.focusEndCaptionPath(entry[1]);
  }
};
var getWithSelectionCaption = (pluginKey) => (editor, plugin) => {
  const {
    apply
  } = editor;
  editor.apply = (operation) => {
    if (operation.type === "set_selection") {
      const newSelection = {
        ...editor.selection,
        ...operation.newProperties
      };
      if (editor.currentKeyboardEvent && isHotkey("up", editor.currentKeyboardEvent)) {
        if (newSelection && isCollapsed(newSelection)) {
          const entry = getAboveNode(editor, {
            at: newSelection,
            match: {
              type: getPluginType(editor, pluginKey)
            }
          });
          if (entry) {
            const [node] = entry;
            if (node.caption && getNodeString({
              children: node.caption
            }).length) {
              setTimeout(() => {
                captionGlobalStore.set.focusEndCaptionPath(entry[1]);
              }, 0);
            }
          }
        }
      }
    }
    apply(operation);
  };
  return editor;
};
var {
  resizableStore,
  useResizableStore
} = createAtomStore({
  width: 0
}, {
  name: "resizable",
  scope: SCOPE_ELEMENT
});
var useCaptionString = () => {
  const {
    caption: nodeCaption = [{
      children: [{
        text: ""
      }]
    }]
  } = useElement();
  return (0, import_react2.useMemo)(() => {
    return getNodeString(nodeCaption[0]) || "";
  }, [nodeCaption]);
};
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
var TextareaAutosize3 = (0, import_react2.forwardRef)((props, ref) => {
  const [isRerendered, setIsRerendered] = (0, import_react2.useState)(false);
  (0, import_react2.useLayoutEffect)(() => setIsRerendered(true), []);
  return isRerendered ? import_react2.default.createElement(index, _extends2({}, props, {
    ref
  })) : null;
});
var useCaptionTextareaFocus = (textareaRef) => {
  const editor = useEditorRef();
  const element = useElement();
  const focusCaptionPath = captionGlobalStore.use.focusEndCaptionPath();
  (0, import_react2.useEffect)(() => {
    if (focusCaptionPath && textareaRef.current) {
      const path = findNodePath(editor, element);
      if (path && Path.equals(path, focusCaptionPath)) {
        textareaRef.current.focus();
        captionGlobalStore.set.focusEndCaptionPath(null);
      }
    }
  }, [editor, element, focusCaptionPath, textareaRef]);
};
var useCaptionTextarea = (props) => {
  const element = useElement();
  const {
    caption: nodeCaption = [{
      children: [{
        text: ""
      }]
    }]
  } = element;
  const [captionValue, setCaptionValue] = (0, import_react2.useState)(getNodeString(nodeCaption[0]));
  const editor = useEditorRef();
  const readOnly = useReadOnly();
  const textareaRef = (0, import_react2.useRef)(null);
  const ref = useComposedRef(textareaRef, props.ref);
  useCaptionTextareaFocus(textareaRef);
  const onChange = (0, import_react2.useCallback)((e) => {
    const newValue = e.target.value;
    setCaptionValue(newValue);
    const path = findNodePath(editor, element);
    if (!path)
      return;
    setNodes(editor, {
      caption: [{
        text: newValue
      }]
    }, {
      at: path
    });
  }, [editor, element]);
  const onKeyDown = (e) => {
    if (isHotkey("up", e)) {
      const path = findNodePath(editor, element);
      if (!path)
        return;
      e.preventDefault();
      focusEditor(editor, path);
    }
    if (isHotkey("down", e)) {
      const path = findNodePath(editor, element);
      if (!path)
        return;
      const nextNodePath = getPointAfter(editor, path);
      if (!nextNodePath)
        return;
      e.preventDefault();
      focusEditor(editor, nextNodePath);
    }
  };
  return {
    value: captionValue,
    readOnly,
    onChange,
    onKeyDown,
    ...props,
    ref
  };
};
var CaptionTextarea = createComponentAs(({
  as,
  ...props
}) => {
  const htmlProps = useCaptionTextarea({
    as,
    ...props
  });
  return import_react2.default.createElement(TextareaAutosize3, htmlProps);
});
var useCaption = ({
  readOnly,
  ...props
} = {}) => {
  const width = useResizableStore().get.width();
  return {
    style: {
      width
    },
    ...props
  };
};
var useCaptionState = (props) => {
  const captionString = useCaptionString();
  const selected = useSelected();
  const _readOnly = useReadOnly();
  const readOnly = props.readOnly || _readOnly;
  return {
    captionString,
    selected,
    readOnly
  };
};
var CaptionRoot = createComponentAs((props) => {
  const htmlProps = useCaption(props);
  const {
    captionString,
    selected,
    readOnly
  } = useCaptionState(props);
  if (!captionString.length && (readOnly || !selected)) {
    return null;
  }
  return createElementAs("figcaption", htmlProps);
});
var Caption = {
  Root: CaptionRoot,
  Textarea: CaptionTextarea
};
var insertImage = (editor, url) => {
  const text = {
    text: ""
  };
  const image = {
    type: getPluginType(editor, ELEMENT_IMAGE),
    url,
    children: [text]
  };
  insertNodes(editor, image);
};
var imageExtensions = ["ase", "art", "bmp", "blp", "cd5", "cit", "cpt", "cr2", "cut", "dds", "dib", "djvu", "egt", "exif", "gif", "gpl", "grf", "icns", "ico", "iff", "jng", "jpeg", "jpg", "jfif", "jp2", "jps", "lbm", "max", "miff", "mng", "msp", "nitf", "ota", "pbm", "pc1", "pc2", "pc3", "pcf", "pcx", "pdn", "pgm", "PI1", "PI2", "PI3", "pict", "pct", "pnm", "pns", "ppm", "psb", "psd", "pdd", "psp", "px", "pxm", "pxr", "qfx", "raw", "rle", "sct", "sgi", "rgb", "int", "bw", "tga", "tiff", "tif", "vtf", "xbm", "xcf", "xpm", "3dv", "amf", "ai", "awg", "cgm", "cdr", "cmx", "dxf", "e2d", "egt", "eps", "fs", "gbr", "odg", "svg", "stl", "vrml", "x3d", "sxd", "v2d", "vnd", "wmf", "emf", "art", "xar", "png", "webp", "jxr", "hdp", "wdp", "cur", "ecw", "iff", "lbm", "liff", "nrrd", "pam", "pcx", "pgf", "sgi", "rgb", "rgba", "bw", "int", "inta", "sid", "ras", "sun", "tga"];
var isImageUrl = (url) => {
  if (!isUrl(url))
    return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};
var withImageEmbed = (editor, plugin) => {
  const {
    insertData
  } = editor;
  editor.insertData = (dataTransfer) => {
    const text = dataTransfer.getData("text/plain");
    if (isImageUrl(text)) {
      insertImage(editor, text);
      return;
    }
    insertData(dataTransfer);
  };
  return editor;
};
var withImageUpload = (editor, plugin) => {
  const {
    options: {
      uploadImage
    }
  } = plugin;
  const {
    insertData
  } = editor;
  editor.insertData = (dataTransfer) => {
    const text = dataTransfer.getData("text/plain");
    const {
      files
    } = dataTransfer;
    if (files && files.length > 0) {
      const injectedPlugins = getInjectedPlugins(editor, plugin);
      if (!pipeInsertDataQuery(injectedPlugins, {
        data: text,
        dataTransfer
      })) {
        return insertData(dataTransfer);
      }
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");
        if (mime === "image") {
          reader.addEventListener("load", async () => {
            if (!reader.result) {
              return;
            }
            const uploadedUrl = uploadImage ? await uploadImage(reader.result) : reader.result;
            insertImage(editor, uploadedUrl);
          });
          reader.readAsDataURL(file);
        }
      }
    } else {
      insertData(dataTransfer);
    }
  };
  return editor;
};
var withImage = (editor, plugin) => {
  const {
    options: {
      disableUploadInsert,
      disableEmbedInsert,
      disableCaption
    }
  } = plugin;
  if (!disableUploadInsert) {
    editor = withImageUpload(editor, plugin);
  }
  if (!disableEmbedInsert) {
    editor = withImageEmbed(editor);
  }
  if (!disableCaption) {
    editor = getWithSelectionCaption(ELEMENT_IMAGE)(editor, plugin);
  }
  return editor;
};
var ELEMENT_IMAGE = "img";
var createImagePlugin = createPluginFactory({
  key: ELEMENT_IMAGE,
  isElement: true,
  isVoid: true,
  withOverrides: withImage,
  handlers: {
    onKeyDown: getOnKeyDownCaption(ELEMENT_IMAGE)
  },
  then: (editor, {
    type
  }) => ({
    deserializeHtml: {
      rules: [{
        validNodeName: "IMG"
      }],
      getNode: (el) => ({
        type,
        url: el.getAttribute("src")
      })
    }
  })
});
var useImage = (props) => {
  const {
    url
  } = useElement();
  const captionString = useCaptionString();
  return {
    src: url,
    alt: captionString,
    draggable: true,
    ...props
  };
};
var Image = createComponentAs((props) => {
  const htmlProps = useImage(props);
  return createElementAs("img", htmlProps);
});
var twitterRegex = /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(?<id>\d+)/;
var parseTwitterUrl = (url) => {
  if (url.match(twitterRegex)) {
    var _twitterRegex$exec, _twitterRegex$exec$gr;
    return {
      provider: "twitter",
      id: (_twitterRegex$exec = twitterRegex.exec(url)) === null || _twitterRegex$exec === void 0 ? void 0 : (_twitterRegex$exec$gr = _twitterRegex$exec.groups) === null || _twitterRegex$exec$gr === void 0 ? void 0 : _twitterRegex$exec$gr.id,
      url
    };
  }
};
var useMediaEmbedTweet = ({
  id,
  ...props
}) => {
  return {
    tweetId: id,
    ...props
  };
};
var MediaEmbedTweet = (props) => {
  const htmlProps = useMediaEmbedTweet(props);
  return import_react2.default.createElement(Tweet, htmlProps);
};
var WIDGET_SCRIPT_URL = "https://platform.twitter.com/widgets.js";
var Tweet = ({
  tweetId,
  onError,
  onLoad,
  loadingComponent
}) => {
  const [isLoading, setIsLoading] = (0, import_react2.useState)(true);
  const containerRef = (0, import_react2.useRef)(null);
  const previousTweetIDRef = (0, import_react2.useRef)("");
  const createTweet = (0, import_react2.useCallback)(async () => {
    try {
      await window.twttr.widgets.createTweet(tweetId, containerRef.current);
      setIsLoading(false);
      if (onLoad) {
        onLoad();
      }
    } catch (error) {
      if (onError) {
        onError(String(error));
      }
    }
  }, [onError, onLoad, tweetId]);
  (0, import_react2.useEffect)(() => {
    if (tweetId !== previousTweetIDRef.current) {
      let isComponentMounted = true;
      const script = require_script();
      script(WIDGET_SCRIPT_URL, "twitter-embed", () => {
        if (!window.twttr) {
          return console.error("Failure to load window.twttr.");
        }
        if (isComponentMounted)
          createTweet();
      });
      if (previousTweetIDRef) {
        previousTweetIDRef.current = tweetId;
      }
      return () => {
        isComponentMounted = false;
      };
    }
  }, [createTweet, onError, onLoad, tweetId]);
  return import_react2.default.createElement(import_react2.default.Fragment, null, isLoading ? loadingComponent : null, import_react2.default.createElement("div", {
    key: tweetId,
    ref: containerRef
  }));
};
var YOUTUBE_PREFIX = "https://www.youtube.com/embed/";
var VIMEO_PREFIX = "https://player.vimeo.com/video/";
var DAILYMOTION_PREFIX = "https://www.dailymotion.com/embed/video/";
var YOUKU_PREFIX = "https://player.youku.com/embed/";
var COUB_PREFIX = "https://coub.com/embed/";
var parseVideoUrl = (url) => {
  const videoData = import_js_video_url_parser.default.parse(url);
  if (videoData !== null && videoData !== void 0 && videoData.provider && videoData.id) {
    const {
      id,
      provider
    } = videoData;
    const providerUrls = {
      youtube: `${YOUTUBE_PREFIX}${id}`,
      vimeo: `${VIMEO_PREFIX}${id}`,
      dailymotion: `${DAILYMOTION_PREFIX}${id}`,
      youku: `${YOUKU_PREFIX}${id}`,
      coub: `${COUB_PREFIX}${id}`
    };
    return {
      id,
      provider,
      url: providerUrls[provider]
    };
  }
};
var useMediaEmbedVideo = ({
  ...props
}) => {
  const {
    url
  } = useMediaStore().get.urlData();
  return {
    title: "embed",
    frameBorder: "0",
    allowFullScreen: true,
    src: url,
    ...props
  };
};
var MediaEmbedVideo = (props) => {
  const htmlProps = useMediaEmbedVideo(props);
  return createElementAs("iframe", htmlProps);
};
var parseIframeUrl = (url) => {
  if (url.substring(0, 4) !== "http") {
    var _url$match, _src$match;
    const regexMatchSrc = /src=".*?"/;
    const regexGroupQuotes = /"([^"]*)"/;
    const src = (_url$match = url.match(regexMatchSrc)) === null || _url$match === void 0 ? void 0 : _url$match[0];
    const returnString = src === null || src === void 0 ? void 0 : (_src$match = src.match(regexGroupQuotes)) === null || _src$match === void 0 ? void 0 : _src$match[1];
    if (returnString) {
      url = returnString;
    }
  }
  return url;
};
var ELEMENT_MEDIA_EMBED = "media_embed";
var createMediaEmbedPlugin = createPluginFactory({
  key: ELEMENT_MEDIA_EMBED,
  isElement: true,
  isVoid: true,
  handlers: {
    onKeyDown: getOnKeyDownCaption(ELEMENT_MEDIA_EMBED)
  },
  withOverrides: (editor, plugin) => {
    const {
      options: {
        disableCaption
      }
    } = plugin;
    if (!disableCaption) {
      editor = getWithSelectionCaption(ELEMENT_MEDIA_EMBED)(editor, plugin);
    }
    return editor;
  },
  options: {
    transformUrl: parseIframeUrl,
    rules: [{
      parser: parseTwitterUrl,
      component: MediaEmbedTweet
    }, {
      parser: parseVideoUrl,
      component: MediaEmbedVideo
    }]
  },
  then: (editor, {
    type
  }) => ({
    deserializeHtml: {
      rules: [{
        validNodeName: "IFRAME"
      }],
      getNode: (el) => {
        const url = el.getAttribute("src");
        if (url) {
          return {
            type,
            url
          };
        }
      }
    }
  })
});
var {
  mediaStore,
  useMediaStore
} = createAtomStore({
  urlData: {}
}, {
  name: "media",
  scope: SCOPE_ELEMENT
});
var MediaEmbed = (props) => {
  const {
    component: Component,
    ...embedData
  } = useMediaStore().get.urlData();
  if (!Component)
    return null;
  return import_react2.default.createElement(Component, _extends2({}, embedData, props));
};
var insertMediaEmbed = (editor, {
  url = "",
  key = ELEMENT_MEDIA_EMBED
}) => {
  if (!editor.selection)
    return;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry)
    return;
  const [, path] = selectionParentEntry;
  insertNodes(editor, {
    type: key,
    url,
    children: [{
      text: ""
    }]
  }, {
    at: path
  });
};
var useResizable = ({
  align = "center",
  readOnly,
  ...props
}) => {
  var _element$width;
  const element = useElement();
  const editor = useEditorRef();
  const _readOnly = useReadOnly();
  readOnly = isDefined(readOnly) ? readOnly : _readOnly;
  const nodeWidth = (_element$width = element === null || element === void 0 ? void 0 : element.width) !== null && _element$width !== void 0 ? _element$width : "100%";
  const [width, setWidth] = useResizableStore().use.width();
  const setNodeWidth = (0, import_react2.useCallback)((w) => {
    const path = findNodePath(editor, element);
    if (!path)
      return;
    if (w === nodeWidth) {
      select(editor, path);
    } else {
      setNodes(editor, {
        width: w
      }, {
        at: path
      });
    }
  }, [editor, element, nodeWidth]);
  (0, import_react2.useEffect)(() => {
    setWidth(nodeWidth);
  }, [nodeWidth, setWidth]);
  const defaultProps = {
    minWidth: 92,
    size: {
      width,
      height: "100%"
    },
    maxWidth: "100%",
    lockAspectRatio: true,
    resizeRatio: align === "center" ? 2 : 1,
    enable: {
      left: ["center", "left"].includes(align),
      right: ["center", "right"].includes(align)
    },
    handleStyles: {
      left: {
        left: 0
      },
      right: {
        right: 0
      }
    },
    onResize: (e, direction, ref) => {
      setWidth(ref.offsetWidth);
    },
    onResizeStop: (e, direction, ref) => setNodeWidth(ref.offsetWidth)
  };
  if (readOnly) {
    return {
      ...defaultProps,
      ...props,
      enable: {
        left: false,
        right: false,
        top: false,
        bottom: false,
        topLeft: false,
        bottomLeft: false,
        topRight: false,
        bottomRight: false
      }
    };
  }
  return {
    ...defaultProps,
    ...props
  };
};
var Resizable2 = createComponentAs((props) => {
  const resizableProps = useResizable(props);
  return import_react2.default.createElement(Resizable, resizableProps);
});
var parseMediaUrl = (editor, {
  pluginKey,
  url
}) => {
  if (!url)
    return;
  const {
    rules
  } = getPluginOptions(editor, pluginKey);
  if (!rules)
    return;
  for (const {
    parser,
    component
  } of rules) {
    const parsed = parser(url);
    if (parsed) {
      return {
        ...parsed,
        component
      };
    }
  }
};
var useMedia = ({
  pluginKey = ELEMENT_MEDIA_EMBED,
  ...props
}) => {
  const editor = useEditorRef();
  const element = useElement();
  const setUrlData = useMediaStore().set.urlData();
  const {
    url: elementUrl
  } = element;
  (0, import_react2.useEffect)(() => {
    const parsed = parseMediaUrl(editor, {
      pluginKey,
      url: elementUrl
    });
    if (parsed) {
      setUrlData(parsed);
    }
  }, [editor, elementUrl, pluginKey, setUrlData]);
  return useElementProps(props);
};
var MediaRoot = createComponentAs((props) => {
  const htmlProps = useMedia(props);
  return createElementAs("div", htmlProps);
});
var Media = {
  Root: MediaRoot,
  Resizable: Resizable2
};
var ELEMENT_MEDIA = "media";
var floatingMediaStore = createStore("floatingMedia")({
  url: "",
  isEditing: false
}).extendActions((set) => ({
  reset: () => {
    set.url("");
    set.isEditing(false);
  }
}));
var floatingMediaActions = floatingMediaStore.set;
var floatingMediaSelectors = floatingMediaStore.get;
var useFloatingMediaSelectors = () => floatingMediaStore.use;
var useFloatingMediaEditButton = (props) => {
  const element = useElement();
  return {
    onClick: (0, import_react2.useCallback)(() => {
      floatingMediaActions.url(element.url);
      floatingMediaActions.isEditing(true);
    }, [element.url]),
    ...props
  };
};
var FloatingMediaEditButton = createComponentAs((props) => {
  const htmlProps = useFloatingMediaEditButton(props);
  return createElementAs("button", htmlProps);
});
var submitFloatingMedia = (editor, {
  element,
  pluginKey = ELEMENT_MEDIA
}) => {
  let url = floatingMediaSelectors.url();
  if (url === element.url) {
    floatingMediaActions.reset();
    return true;
  }
  const {
    isUrl: _isUrl = isUrl,
    transformUrl
  } = getPluginOptions(editor, pluginKey);
  const isValid = _isUrl(url);
  if (!isValid)
    return;
  if (transformUrl) {
    url = transformUrl(url);
  }
  setNodes(editor, {
    url
  });
  floatingMediaActions.reset();
  focusEditor(editor, editor.selection);
  return true;
};
var useFloatingMediaUrlInput = ({
  pluginKey,
  ...props
}) => {
  const editor = useEditorRef();
  const element = useElement();
  (0, import_react2.useEffect)(() => {
    return () => {
      floatingMediaActions.isEditing(false);
    };
  }, []);
  useHotkeys("enter", (e) => {
    if (submitFloatingMedia(editor, {
      element,
      pluginKey
    })) {
      e.preventDefault();
    }
  }, {
    enableOnFormTags: ["INPUT"]
  }, []);
  useHotkeys("escape", () => {
    if (floatingMediaSelectors.isEditing()) {
      floatingMediaActions.reset();
      focusEditor(editor, editor.selection);
    }
  }, {
    enableOnFormTags: ["INPUT"],
    enableOnContentEditable: true
  }, []);
  const onChange = (0, import_react2.useCallback)((e) => {
    floatingMediaActions.url(e.target.value);
  }, []);
  return mergeProps({
    onChange,
    autoFocus: true,
    defaultValue: floatingMediaSelectors.url()
  }, props);
};
var FloatingMediaUrlInput = createComponentAs((props) => {
  const htmlProps = useFloatingMediaUrlInput(props);
  return createElementAs("input", htmlProps);
});
var FloatingMedia = {
  EditButton: FloatingMediaEditButton,
  UrlInput: FloatingMediaUrlInput
};

export {
  index,
  Resizable,
  require_script,
  captionGlobalStore,
  getOnKeyDownCaption,
  getWithSelectionCaption,
  resizableStore,
  useResizableStore,
  useCaptionString,
  TextareaAutosize3 as TextareaAutosize,
  useCaptionTextareaFocus,
  useCaptionTextarea,
  CaptionTextarea,
  useCaption,
  useCaptionState,
  CaptionRoot,
  Caption,
  insertImage,
  isImageUrl,
  withImageEmbed,
  withImageUpload,
  withImage,
  ELEMENT_IMAGE,
  createImagePlugin,
  useImage,
  Image,
  parseTwitterUrl,
  useMediaEmbedTweet,
  MediaEmbedTweet,
  Tweet,
  parseVideoUrl,
  useMediaEmbedVideo,
  MediaEmbedVideo,
  parseIframeUrl,
  ELEMENT_MEDIA_EMBED,
  createMediaEmbedPlugin,
  mediaStore,
  useMediaStore,
  MediaEmbed,
  insertMediaEmbed,
  useResizable,
  Resizable2,
  parseMediaUrl,
  useMedia,
  MediaRoot,
  Media,
  ELEMENT_MEDIA,
  floatingMediaStore,
  floatingMediaActions,
  floatingMediaSelectors,
  useFloatingMediaSelectors,
  useFloatingMediaEditButton,
  FloatingMediaEditButton,
  submitFloatingMedia,
  useFloatingMediaUrlInput,
  FloatingMediaUrlInput,
  FloatingMedia
};
/*!
  * $script.js JS loader & dependency manager
  * https://github.com/ded/script.js
  * (c) Dustin Diaz 2014 | License MIT
  */
//# sourceMappingURL=chunk-Y34FFR7F.js.map
