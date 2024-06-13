import "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--3e3c5e33.js";

// ../../../node_modules/spacetime/src/timezone/summerTime.js
var MSEC_IN_HOUR = 60 * 60 * 1e3;
var toUtc = (dstChange, offset, year2) => {
  const [month2, rest] = dstChange.split("/");
  const [day, hour] = rest.split(":");
  return Date.UTC(year2, month2 - 1, day, hour) - offset * MSEC_IN_HOUR;
};
var inSummerTime = (epoch, start, end, summerOffset, winterOffset) => {
  const year2 = new Date(epoch).getUTCFullYear();
  const startUtc = toUtc(start, winterOffset, year2);
  const endUtc = toUtc(end, summerOffset, year2);
  return epoch >= startUtc && epoch < endUtc;
};
var summerTime_default = inSummerTime;

// ../../../node_modules/spacetime/src/timezone/quick.js
var quickOffset = (s) => {
  let zones = s.timezones;
  let obj = zones[s.tz];
  if (obj === void 0) {
    console.warn("Warning: couldn't find timezone " + s.tz);
    return 0;
  }
  if (obj.dst === void 0) {
    return obj.offset;
  }
  let jul = obj.offset;
  let dec = obj.offset + 1;
  if (obj.hem === "n") {
    dec = jul - 1;
  }
  let split = obj.dst.split("->");
  let inSummer = summerTime_default(s.epoch, split[0], split[1], jul, dec);
  if (inSummer === true) {
    return jul;
  }
  return dec;
};
var quick_default = quickOffset;

// ../../../node_modules/spacetime/zonefile/_build.js
var build_default = {
  "9|s": "2/dili,2/jayapura",
  "9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,2/yakutsk,11/palau,japan,rok",
  "9.5|s|04/07:03->10/06:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
  "9.5|s": "4/darwin,4/north",
  "8|s|03/13:01->10/02:00": "12/casey",
  "8|s": "2/kuala_lumpur,2/makassar,2/singapore,4/perth,2/ujung_pandang,4/west,singapore",
  "8|n": "2/brunei,2/choibalsan,2/hong_kong,2/irkutsk,2/kuching,2/macau,2/manila,2/shanghai,2/taipei,2/ulaanbaatar,2/chongqing,2/chungking,2/harbin,2/macao,2/ulan_bator,hongkong,prc,roc",
  "8.75|s": "4/eucla",
  "7|s": "12/davis,2/jakarta,9/christmas",
  "7|n": "2/bangkok,2/barnaul,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/ho_chi_minh,2/tomsk,2/vientiane,2/saigon",
  "6|s": "12/vostok",
  "6|n": "2/almaty,2/bishkek,2/dhaka,2/omsk,2/qyzylorda,2/qostanay,2/thimphu,2/urumqi,9/chagos,2/dacca,2/kashgar,2/thimbu",
  "6.5|n": "2/yangon,9/cocos,2/rangoon",
  "5|s": "12/mawson,9/kerguelen",
  "5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/atyrau,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives,2/ashkhabad",
  "5.75|n": "2/kathmandu,2/katmandu",
  "5.5|n": "2/kolkata,2/colombo,2/calcutta",
  "4|s": "9/reunion",
  "4|n": "2/baku,2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,9/mahe,9/mauritius,2/volgograd",
  "4.5|n": "2/kabul",
  "3|s": "12/syowa,9/antananarivo",
  "3|n|04/28:00->10/26:24": "0/cairo,egypt",
  "3|n|03/31:03->10/27:04": "2/famagusta,2/nicosia,8/athens,8/bucharest,8/helsinki,8/mariehamn,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye,8/nicosia,eet",
  "3|n|03/31:02->10/27:03": "8/chisinau,8/tiraspol",
  "3|n|03/31:00->10/26:24": "2/beirut",
  "3|n|03/31:00->10/25:01": "2/gaza,2/hebron",
  "3|n|03/29:02->10/27:02": "2/jerusalem,2/tel_aviv,israel",
  "3|n|03/26:03->10/29:04": "8/kyiv,8/kiev",
  "3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/amman,2/baghdad,2/bahrain,2/damascus,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte,2/istanbul,turkey,w-su",
  "3.5|n": "2/tehran,iran",
  "2|s|03/31:02->10/27:02": "12/troll",
  "2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
  "2|n|03/31:02->10/27:03": "0/ceuta,arctic/longyearbyen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich,3/jan_mayen,poland,cet,met",
  "2|n": "0/blantyre,0/bujumbura,0/khartoum,0/kigali,0/tripoli,8/kaliningrad,libya",
  "1|s": "0/brazzaville,0/kinshasa,0/luanda,0/windhoek",
  "1|n|03/31:01->10/27:02": "3/canary,3/faroe,3/madeira,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london,3/faeroe,eire,8/belfast,gb-eire,gb,portugal,wet",
  "1|n": "0/algiers,0/bangui,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
  "14|n": "11/kiritimati",
  "13|s": "11/apia,11/tongatapu",
  "13|n": "11/enderbury,11/kanton,11/fakaofo",
  "12|s|04/07:03->09/29:02": "12/mcmurdo,11/auckland,12/south_pole,nz",
  "12|s": "11/fiji",
  "12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis,kwajalein",
  "12.75|s|04/07:03->04/07:02": "11/chatham,nz-chat",
  "11|s|04/07:03->10/06:02": "12/macquarie",
  "11|s": "11/bougainville",
  "11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
  "11.5|n|04/07:03->10/06:02": "11/norfolk",
  "10|s|04/07:03->10/06:02": "4/currie,4/hobart,4/melbourne,4/sydney,4/act,4/canberra,4/nsw,4/tasmania,4/victoria",
  "10|s": "12/dumontdurville,4/brisbane,4/lindeman,11/port_moresby,4/queensland",
  "10|n": "2/ust-nera,2/vladivostok,11/guam,11/saipan,11/chuuk,11/truk,11/yap",
  "10.5|s|04/07:01->10/06:02": "4/lord_howe,4/lhi",
  "0|s|03/10:03->04/14:02": "0/casablanca,0/el_aaiun",
  "0|n|03/31:00->10/27:01": "1/scoresbysund,3/azores",
  "0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/utc,0/timbuktu,13/greenwich,13/uct,13/universal,13/zulu,gmt-0,gmt+0,gmt0,greenwich,iceland,uct,universal,utc,zulu,13/unknown,factory",
  "-9|n|03/10:02->11/03:02": "1/adak,1/atka,us/aleutian",
  "-9|n": "11/gambier",
  "-9.5|n": "11/marquesas",
  "-8|n|03/10:02->11/03:02": "1/anchorage,1/juneau,1/nome,1/sitka,1/yakutat,us/alaska",
  "-8|n": "1/metlakatla,11/pitcairn",
  "-7|n|03/10:02->11/03:02": "1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/ensenada,6/pacific,10/bajanorte,us/pacific-new,us/pacific",
  "-7|n": "1/creston,1/dawson,1/dawson_creek,1/fort_nelson,1/hermosillo,1/mazatlan,1/phoenix,1/whitehorse,6/yukon,10/bajasur,us/arizona,mst",
  "-6|s|04/06:22->09/07:22": "11/easter,7/easterisland",
  "-6|n|04/07:02->10/27:02": "1/merida",
  "-6|n|03/12:02->11/05:02": "1/ciudad_juarez",
  "-6|n|03/10:02->11/03:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/north_dakota,1/ojinaga,1/yellowknife,1/shiprock,6/mountain,navajo,us/mountain",
  "-6|n": "1/bahia_banderas,1/belize,1/chihuahua,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/mexico_city,1/monterrey,1/regina,1/swift_current,1/tegucigalpa,11/galapagos,6/east-saskatchewan,6/saskatchewan,10/general",
  "-5|s": "1/lima,1/rio_branco,1/porto_acre,5/acre",
  "-5|n|03/10:02->11/03:02": "1/chicago,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,1/indiana/knox,1/indiana/tell_city,1/north_dakota/beulah,1/north_dakota/center,1/north_dakota/new_salem,1/knox_in,6/central,us/central,us/indiana-starke",
  "-5|n": "1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/atikokan,jamaica,est",
  "-4|s|04/06:24->09/08:00": "1/santiago,7/continental",
  "-4|s|03/23:24->10/06:00": "1/asuncion",
  "-4|s": "1/campo_grande,1/cuiaba,1/la_paz,1/manaus,5/west",
  "-4|n|03/10:02->11/03:02": "1/detroit,1/grand_turk,1/indiana,1/indianapolis,1/iqaluit,1/kentucky,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,1/indiana/marengo,1/indiana/petersburg,1/indiana/vevay,1/indiana/vincennes,1/indiana/winamac,1/kentucky/monticello,1/fort_wayne,1/indiana/indianapolis,1/kentucky/louisville,6/eastern,us/east-indiana,us/eastern,us/michigan",
  "-4|n|03/10:00->11/03:01": "1/havana,cuba",
  "-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
  "-3|s": "1/argentina,1/buenos_aires,1/catamarca,1/cordoba,1/fortaleza,1/jujuy,1/mendoza,1/montevideo,1/punta_arenas,1/sao_paulo,12/palmer,12/rothera,3/stanley,1/argentina/la_rioja,1/argentina/rio_gallegos,1/argentina/salta,1/argentina/san_juan,1/argentina/san_luis,1/argentina/tucuman,1/argentina/ushuaia,1/argentina/comodrivadavia,1/argentina/buenos_aires,1/argentina/catamarca,1/argentina/cordoba,1/argentina/jujuy,1/argentina/mendoza,1/argentina/rosario,1/rosario,5/east",
  "-3|n|03/10:02->11/03:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
  "-3|n": "1/araguaina,1/bahia,1/belem,1/cayenne,1/maceio,1/paramaribo,1/recife,1/santarem",
  "-2|n|03/30:22->10/26:23": "1/nuuk,1/godthab",
  "-2|n|03/10:02->11/03:02": "1/miquelon",
  "-2|n": "1/noronha,3/south_georgia,5/denoronha",
  "-2.5|n|03/10:02->11/03:02": "1/st_johns,6/newfoundland",
  "-1|n": "3/cape_verde",
  "-11|n": "11/midway,11/niue,11/pago_pago,11/samoa,us/samoa",
  "-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti,us/hawaii,hst"
};

// ../../../node_modules/spacetime/zonefile/_prefixes.js
var prefixes_default = [
  "africa",
  "america",
  "asia",
  "atlantic",
  "australia",
  "brazil",
  "canada",
  "chile",
  "europe",
  "indian",
  "mexico",
  "pacific",
  "antarctica",
  "etc"
];

// ../../../node_modules/spacetime/zonefile/unpack.js
var all = {};
Object.keys(build_default).forEach((k) => {
  let split = k.split("|");
  let obj = {
    offset: Number(split[0]),
    hem: split[1]
  };
  if (split[2]) {
    obj.dst = split[2];
  }
  let names = build_default[k].split(",");
  names.forEach((str) => {
    str = str.replace(/(^[0-9]+)\//, (before, num) => {
      num = Number(num);
      return prefixes_default[num] + "/";
    });
    all[str] = obj;
  });
});
all.utc = {
  offset: 0,
  hem: "n"
};
for (let i = -14; i <= 14; i += 0.5) {
  let num = i;
  if (num > 0) {
    num = "+" + num;
  }
  let name = "etc/gmt" + num;
  all[name] = {
    offset: i * -1,
    hem: "n"
  };
  name = "utc/gmt" + num;
  all[name] = {
    offset: i * -1,
    hem: "n"
  };
}
var unpack_default = all;

// ../../../node_modules/spacetime/src/timezone/guessTz.js
var fallbackTZ = "utc";
var safeIntl = () => {
  if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
    return null;
  }
  let format2 = Intl.DateTimeFormat();
  if (typeof format2 === "undefined" || typeof format2.resolvedOptions === "undefined") {
    return null;
  }
  let timezone2 = format2.resolvedOptions().timeZone;
  if (!timezone2) {
    return null;
  }
  return timezone2.toLowerCase();
};
var guessTz = () => {
  let timezone2 = safeIntl();
  if (timezone2 === null) {
    return fallbackTZ;
  }
  return timezone2;
};
var guessTz_default = guessTz;

// ../../../node_modules/spacetime/src/timezone/parseOffset.js
var isOffset = /(\-?[0-9]+)h(rs)?/i;
var isNumber = /(\-?[0-9]+)/;
var utcOffset = /utc([\-+]?[0-9]+)/i;
var gmtOffset = /gmt([\-+]?[0-9]+)/i;
var toIana = function(num) {
  num = Number(num);
  if (num >= -13 && num <= 13) {
    num = num * -1;
    num = (num > 0 ? "+" : "") + num;
    return "etc/gmt" + num;
  }
  return null;
};
var parseOffset = function(tz) {
  let m = tz.match(isOffset);
  if (m !== null) {
    return toIana(m[1]);
  }
  m = tz.match(utcOffset);
  if (m !== null) {
    return toIana(m[1]);
  }
  m = tz.match(gmtOffset);
  if (m !== null) {
    let num = Number(m[1]) * -1;
    return toIana(num);
  }
  m = tz.match(isNumber);
  if (m !== null) {
    return toIana(m[1]);
  }
  return null;
};
var parseOffset_default = parseOffset;

// ../../../node_modules/spacetime/src/timezone/find.js
var local = guessTz_default();
var cities = Object.keys(unpack_default).reduce((h, k) => {
  let city = k.split("/")[1] || "";
  city = city.replace(/_/g, " ");
  h[city] = k;
  return h;
}, {});
var normalize = (tz) => {
  tz = tz.replace(/ time/g, "");
  tz = tz.replace(/ (standard|daylight|summer)/g, "");
  tz = tz.replace(/\b(east|west|north|south)ern/g, "$1");
  tz = tz.replace(/\b(africa|america|australia)n/g, "$1");
  tz = tz.replace(/\beuropean/g, "europe");
  tz = tz.replace(/\islands/g, "island");
  return tz;
};
var lookupTz = (str, zones) => {
  if (!str) {
    if (!zones.hasOwnProperty(local)) {
      console.warn(`Unrecognized IANA id '${local}'. Setting fallback tz to UTC.`);
      local = "utc";
    }
    return local;
  }
  if (typeof str !== "string") {
    console.error("Timezone must be a string - recieved: '", str, "'\n");
  }
  let tz = str.trim();
  tz = tz.toLowerCase();
  if (zones.hasOwnProperty(tz) === true) {
    return tz;
  }
  tz = normalize(tz);
  if (zones.hasOwnProperty(tz) === true) {
    return tz;
  }
  if (cities.hasOwnProperty(tz) === true) {
    return cities[tz];
  }
  if (/[0-9]/.test(tz) === true) {
    let id = parseOffset_default(tz);
    if (id) {
      return id;
    }
  }
  throw new Error(
    "Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id."
  );
};
var find_default = lookupTz;

// ../../../node_modules/spacetime/src/fns.js
function isLeapYear(year2) {
  return year2 % 4 === 0 && year2 % 100 !== 0 || year2 % 400 === 0;
}
function isDate(d) {
  return Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.valueOf());
}
function isArray(input) {
  return Object.prototype.toString.call(input) === "[object Array]";
}
function isObject(input) {
  return Object.prototype.toString.call(input) === "[object Object]";
}
function isBoolean(input) {
  return Object.prototype.toString.call(input) === "[object Boolean]";
}
function zeroPad(str, len = 2) {
  let pad = "0";
  str = str + "";
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
}
function titleCase(str) {
  if (!str) {
    return "";
  }
  return str[0].toUpperCase() + str.substr(1);
}
function ordinal(i) {
  let j = i % 10;
  let k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}
function toCardinal(str) {
  str = String(str);
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, "$1");
  return parseInt(str, 10);
}
function normalize2(str = "") {
  str = str.toLowerCase().trim();
  str = str.replace(/ies$/, "y");
  str = str.replace(/s$/, "");
  str = str.replace(/-/g, "");
  if (str === "day" || str === "days") {
    return "date";
  }
  if (str === "min" || str === "mins") {
    return "minute";
  }
  return str;
}
function getEpoch(tmp) {
  if (typeof tmp === "number") {
    return tmp;
  }
  if (isDate(tmp)) {
    return tmp.getTime();
  }
  if (tmp.epoch) {
    return tmp.epoch;
  }
  return null;
}
function beADate(d, s) {
  if (isObject(d) === false) {
    return s.clone().set(d);
  }
  return d;
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "+" : "-";
  const absOffset = Math.abs(offset);
  const hours2 = zeroPad(parseInt("" + absOffset, 10));
  const minutes2 = zeroPad(absOffset % 1 * 60);
  return `${sign}${hours2}${delimiter}${minutes2}`;
}

// ../../../node_modules/spacetime/src/input/helpers.js
var defaults = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
};
var parseArray = (s, arr, today) => {
  if (arr.length === 0) {
    return s;
  }
  let order3 = ["year", "month", "date", "hour", "minute", "second", "millisecond"];
  for (let i = 0; i < order3.length; i++) {
    let num = arr[i] || today[order3[i]] || defaults[order3[i]] || 0;
    s = s[order3[i]](num);
  }
  return s;
};
var parseObject = (s, obj, today) => {
  if (Object.keys(obj).length === 0) {
    return s;
  }
  obj = Object.assign({}, defaults, today, obj);
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let unit = keys[i];
    if (s[unit] === void 0 || typeof s[unit] !== "function") {
      continue;
    }
    if (obj[unit] === null || obj[unit] === void 0 || obj[unit] === "") {
      continue;
    }
    let num = obj[unit] || today[unit] || defaults[unit] || 0;
    s = s[unit](num);
  }
  return s;
};
var parseNumber = function(s, input) {
  const minimumEpoch = 25e8;
  if (input > 0 && input < minimumEpoch && s.silent === false) {
    console.warn("  - Warning: You are setting the date to January 1970.");
    console.warn("       -   did input seconds instead of milliseconds?");
  }
  s.epoch = input;
  return s;
};
var helpers_default = {
  parseArray,
  parseObject,
  parseNumber
};

// ../../../node_modules/spacetime/src/input/named-dates.js
var getNow = function(s) {
  s.epoch = Date.now();
  Object.keys(s._today || {}).forEach((k) => {
    if (typeof s[k] === "function") {
      s = s[k](s._today[k]);
    }
  });
  return s;
};
var dates = {
  now: (s) => {
    return getNow(s);
  },
  today: (s) => {
    return getNow(s);
  },
  tonight: (s) => {
    s = getNow(s);
    s = s.hour(18);
    return s;
  },
  tomorrow: (s) => {
    s = getNow(s);
    s = s.add(1, "day");
    s = s.startOf("day");
    return s;
  },
  yesterday: (s) => {
    s = getNow(s);
    s = s.subtract(1, "day");
    s = s.startOf("day");
    return s;
  },
  christmas: (s) => {
    let year2 = getNow(s).year();
    s = s.set([year2, 11, 25, 18, 0, 0]);
    return s;
  },
  "new years": (s) => {
    let year2 = getNow(s).year();
    s = s.set([year2, 11, 31, 18, 0, 0]);
    return s;
  }
};
dates["new years eve"] = dates["new years"];
var named_dates_default = dates;

// ../../../node_modules/spacetime/src/input/normalize.js
var normalize3 = function(str) {
  str = str.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i, "");
  str = str.replace(/([0-9])(th|rd|st|nd)/, "$1");
  str = str.replace(/,/g, "");
  str = str.replace(/ +/g, " ").trim();
  return str;
};
var normalize_default = normalize3;

// ../../../node_modules/spacetime/src/data/milliseconds.js
var o = {
  millisecond: 1
};
o.second = 1e3;
o.minute = 6e4;
o.hour = 36e5;
o.day = 864e5;
o.date = o.day;
o.month = 864e5 * 29.5;
o.week = 6048e5;
o.year = 3154e7;
Object.keys(o).forEach((k) => {
  o[k + "s"] = o[k];
});
var milliseconds_default = o;

// ../../../node_modules/spacetime/src/methods/set/walk.js
var walk = (s, n, fn, unit, previous) => {
  let current = s.d[fn]();
  if (current === n) {
    return;
  }
  let startUnit = previous === null ? null : s.d[previous]();
  let original = s.epoch;
  let diff2 = n - current;
  s.epoch += milliseconds_default[unit] * diff2;
  if (unit === "day") {
    if (Math.abs(diff2) > 28 && n < 28) {
      s.epoch += milliseconds_default.hour;
    }
  }
  if (previous !== null && startUnit !== s.d[previous]()) {
    s.epoch = original;
  }
  const halfStep = milliseconds_default[unit] / 2;
  while (s.d[fn]() < n) {
    s.epoch += halfStep;
  }
  while (s.d[fn]() > n) {
    s.epoch -= halfStep;
  }
  if (previous !== null && startUnit !== s.d[previous]()) {
    s.epoch = original;
  }
};
var units = {
  year: {
    valid: (n) => n > -4e3 && n < 4e3,
    walkTo: (s, n) => walk(s, n, "getFullYear", "year", null)
  },
  month: {
    valid: (n) => n >= 0 && n <= 11,
    walkTo: (s, n) => {
      let d = s.d;
      let current = d.getMonth();
      let original = s.epoch;
      let startUnit = d.getFullYear();
      if (current === n) {
        return;
      }
      let diff2 = n - current;
      s.epoch += milliseconds_default.day * (diff2 * 28);
      if (startUnit !== s.d.getFullYear()) {
        s.epoch = original;
      }
      while (s.d.getMonth() < n) {
        s.epoch += milliseconds_default.day;
      }
      while (s.d.getMonth() > n) {
        s.epoch -= milliseconds_default.day;
      }
    }
  },
  date: {
    valid: (n) => n > 0 && n <= 31,
    walkTo: (s, n) => walk(s, n, "getDate", "day", "getMonth")
  },
  hour: {
    valid: (n) => n >= 0 && n < 24,
    walkTo: (s, n) => walk(s, n, "getHours", "hour", "getDate")
  },
  minute: {
    valid: (n) => n >= 0 && n < 60,
    walkTo: (s, n) => walk(s, n, "getMinutes", "minute", "getHours")
  },
  second: {
    valid: (n) => n >= 0 && n < 60,
    walkTo: (s, n) => {
      s.epoch = s.seconds(n).epoch;
    }
  },
  millisecond: {
    valid: (n) => n >= 0 && n < 1e3,
    walkTo: (s, n) => {
      s.epoch = s.milliseconds(n).epoch;
    }
  }
};
var walkTo = (s, wants) => {
  let keys = Object.keys(units);
  let old = s.clone();
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let n = wants[k];
    if (n === void 0) {
      n = old[k]();
    }
    if (typeof n === "string") {
      n = parseInt(n, 10);
    }
    if (!units[k].valid(n)) {
      s.epoch = null;
      if (s.silent === false) {
        console.warn("invalid " + k + ": " + n);
      }
      return;
    }
    units[k].walkTo(s, n);
  }
  return;
};
var walk_default = walkTo;

// ../../../node_modules/spacetime/src/data/monthLengths.js
var monthLengths = [
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
var monthLengths_default = monthLengths;

// ../../../node_modules/spacetime/src/data/months.js
var shortMonths = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];
var longMonths = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];
function buildMapping() {
  const obj = {
    sep: 8
  };
  for (let i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i;
  }
  for (let i = 0; i < longMonths.length; i++) {
    obj[longMonths[i]] = i;
  }
  return obj;
}
function short() {
  return shortMonths;
}
function long() {
  return longMonths;
}
function mapping() {
  return buildMapping();
}
function set(i18n) {
  shortMonths = i18n.short || shortMonths;
  longMonths = i18n.long || longMonths;
}

// ../../../node_modules/spacetime/src/input/formats/parseOffset.js
var parseOffset2 = (s, offset) => {
  if (!offset) {
    return s;
  }
  let num = 0;
  if (/^[\+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
    if (/:00/.test(offset) === true) {
      offset = offset.replace(/:00/, "");
    }
    if (/:30/.test(offset) === true) {
      offset = offset.replace(/:30/, ".5");
    }
  }
  if (/^[\+-]?[0-9]{4}$/.test(offset)) {
    offset = offset.replace(/30$/, ".5");
  }
  num = parseFloat(offset);
  if (Math.abs(num) > 100) {
    num = num / 100;
  }
  if (num === 0 || offset === "Z" || offset === "z") {
    s.tz = "etc/gmt";
    return s;
  }
  num *= -1;
  if (num >= 0) {
    num = "+" + num;
  }
  let tz = "etc/gmt" + num;
  let zones = s.timezones;
  if (zones[tz]) {
    s.tz = tz;
  }
  return s;
};
var parseOffset_default2 = parseOffset2;

// ../../../node_modules/spacetime/src/input/formats/parseTime.js
var parseMs = function(str = "") {
  str = String(str);
  if (str.length > 3) {
    str = str.substr(0, 3);
  } else if (str.length === 1) {
    str = str + "00";
  } else if (str.length === 2) {
    str = str + "0";
  }
  return Number(str) || 0;
};
var parseTime = (s, str = "") => {
  str = str.replace(/^\s+/, "").toLowerCase();
  let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);
  if (arr !== null) {
    let h = Number(arr[1]);
    if (h < 0 || h > 24) {
      return s.startOf("day");
    }
    let m = Number(arr[2]);
    if (arr[2].length < 2 || m < 0 || m > 59) {
      return s.startOf("day");
    }
    s = s.hour(h);
    s = s.minute(m);
    s = s.seconds(arr[3] || 0);
    s = s.millisecond(parseMs(arr[4]));
    let ampm = str.match(/[\b0-9] ?(am|pm)\b/);
    if (ampm !== null && ampm[1]) {
      s = s.ampm(ampm[1]);
    }
    return s;
  }
  arr = str.match(/([0-9]+) ?(am|pm)/);
  if (arr !== null && arr[1]) {
    let h = Number(arr[1]);
    if (h > 12 || h < 1) {
      return s.startOf("day");
    }
    s = s.hour(arr[1] || 0);
    s = s.ampm(arr[2]);
    s = s.startOf("hour");
    return s;
  }
  s = s.startOf("day");
  return s;
};
var parseTime_default = parseTime;

// ../../../node_modules/spacetime/src/input/formats/_parsers.js
var months = mapping();
var validate = (obj) => {
  if (monthLengths_default.hasOwnProperty(obj.month) !== true) {
    return false;
  }
  if (obj.month === 1) {
    if (isLeapYear(obj.year) && obj.date <= 29) {
      return true;
    } else {
      return obj.date <= 28;
    }
  }
  let max = monthLengths_default[obj.month] || 0;
  if (obj.date <= max) {
    return true;
  }
  return false;
};
var parseYear = (str = "", today) => {
  str = str.trim();
  if (/^'[0-9][0-9]$/.test(str) === true) {
    let num = Number(str.replace(/'/, ""));
    if (num > 50) {
      return 1900 + num;
    }
    return 2e3 + num;
  }
  let year2 = parseInt(str, 10);
  if (!year2 && today) {
    year2 = today.year;
  }
  year2 = year2 || new Date().getFullYear();
  return year2;
};
var parseMonth = function(str) {
  str = str.toLowerCase().trim();
  if (str === "sept") {
    return months.sep;
  }
  return months[str];
};

// ../../../node_modules/spacetime/src/input/formats/01-ymd.js
var ymd_default = [
  {
    reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/i,
    parse: (s, m) => {
      let obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: m[3]
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      parseOffset_default2(s, m[5]);
      walk_default(s, obj);
      s = parseTime_default(s, m[4]);
      return s;
    }
  },
  {
    reg: /^([0-9]{4})[\-\/\. ]([0-9]{1,2})[\-\/\. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      let obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: parseInt(m[3], 10)
      };
      if (obj.month >= 12) {
        obj.date = parseInt(m[2], 10);
        obj.month = parseInt(m[3], 10) - 1;
      }
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s, m[4]);
      return s;
    }
  },
  {
    reg: /^([0-9]{4})[\-\/\. ]([a-z]+)[\-\/\. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      let obj = {
        year: parseYear(m[1], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[3] || "")
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s, m[4]);
      return s;
    }
  }
];

// ../../../node_modules/spacetime/src/input/formats/02-mdy.js
var mdy_default = [
  {
    reg: /^([0-9]{1,2})[\-\/.]([0-9]{1,2})[\-\/.]?([0-9]{4})?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: (s, arr) => {
      let month2 = parseInt(arr[1], 10) - 1;
      let date2 = parseInt(arr[2], 10);
      if (s.british || month2 >= 12) {
        date2 = parseInt(arr[1], 10);
        month2 = parseInt(arr[2], 10) - 1;
      }
      let obj = {
        date: date2,
        month: month2,
        year: parseYear(arr[3], s._today) || new Date().getFullYear()
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s, arr[4]);
      return s;
    }
  },
  {
    reg: /^([a-z]+)[\-\/\. ]([0-9]{1,2})[\-\/\. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear(arr[3], s._today),
        month: parseMonth(arr[1]),
        date: toCardinal(arr[2] || "")
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s, arr[4]);
      return s;
    }
  },
  {
    reg: /^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear(arr[3], s._today),
        month: parseMonth(arr[1]),
        date: toCardinal(arr[2] || "")
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s, arr[4]);
      return s;
    }
  },
  {
    reg: /^([a-z]+) ([0-9]{1,2})( [0-9:]+)?( \+[0-9]{4})?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear(arr[5], s._today),
        month: parseMonth(arr[1]),
        date: toCardinal(arr[2] || "")
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s, arr[3]);
      return s;
    }
  }
];

// ../../../node_modules/spacetime/src/input/formats/03-dmy.js
var dmy_default = [
  {
    reg: /^([0-9]{1,2})[\-\/]([a-z]+)[\-\/]?([0-9]{4})?$/i,
    parse: (s, m) => {
      let obj = {
        year: parseYear(m[3], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[1] || "")
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s, m[4]);
      return s;
    }
  },
  {
    reg: /^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: (s, m) => {
      let obj = {
        year: parseYear(m[3], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[1])
      };
      if (!obj.month || validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s, m[4]);
      return s;
    }
  },
  {
    reg: /^([0-9]{1,2})[\. -/]([a-z]+)[\. -/]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      let obj = {
        date: Number(m[1]),
        month: parseMonth(m[2]),
        year: Number(m[3])
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = s.startOf("day");
      s = parseTime_default(s, m[4]);
      return s;
    }
  }
];

// ../../../node_modules/spacetime/src/input/formats/04-misc.js
var misc_default = [
  {
    reg: /^([0-9]{4})[\-\/]([0-9]{2})$/i,
    parse: (s, m) => {
      let obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: 1
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s, m[4]);
      return s;
    }
  },
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear(arr[2], s._today),
        month: parseMonth(arr[1]),
        date: s._today.date || 1
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s, arr[4]);
      return s;
    }
  },
  {
    reg: /^(q[0-9])( of)?( [0-9]{4})?/i,
    parse: (s, arr) => {
      let quarter = arr[1] || "";
      s = s.quarter(quarter);
      let year2 = arr[3] || "";
      if (year2) {
        year2 = year2.trim();
        s = s.year(year2);
      }
      return s;
    }
  },
  {
    reg: /^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?/i,
    parse: (s, arr) => {
      let season = arr[1] || "";
      s = s.season(season);
      let year2 = arr[3] || "";
      if (year2) {
        year2 = year2.trim();
        s = s.year(year2);
      }
      return s;
    }
  },
  {
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: (s, arr) => {
      let str = arr[0] || "";
      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, "-$1");
      let d = new Date();
      let obj = {
        year: parseInt(str.trim(), 10),
        month: d.getMonth(),
        date: d.getDate()
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s);
      return s;
    }
  },
  {
    reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
    parse: (s, arr) => {
      let str = arr[0] || "";
      str = str.replace(/,/g, "");
      let d = new Date();
      let obj = {
        year: parseInt(str.trim(), 10),
        month: d.getMonth(),
        date: d.getDate()
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s);
      return s;
    }
  },
  {
    reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
    parse: (s, arr) => {
      let today = s._today;
      if (today.month && !today.date) {
        today.date = 1;
      }
      let d = new Date();
      let obj = {
        year: parseYear(arr[0], today),
        month: today.month || d.getMonth(),
        date: today.date || d.getDate()
      };
      if (validate(obj) === false) {
        s.epoch = null;
        return s;
      }
      walk_default(s, obj);
      s = parseTime_default(s);
      return s;
    }
  }
];

// ../../../node_modules/spacetime/src/input/formats/index.js
var formats_default = [].concat(ymd_default, mdy_default, dmy_default, misc_default);

// ../../../node_modules/spacetime/src/input/parse.js
var parseString = function(s, input, givenTz) {
  for (let i = 0; i < formats_default.length; i++) {
    let m = input.match(formats_default[i].reg);
    if (m) {
      let res = formats_default[i].parse(s, m, givenTz);
      if (res !== null && res.isValid()) {
        return res;
      }
    }
  }
  if (s.silent === false) {
    console.warn("Warning: couldn't parse date-string: '" + input + "'");
  }
  s.epoch = null;
  return s;
};
var parse_default = parseString;

// ../../../node_modules/spacetime/src/input/index.js
var { parseArray: parseArray2, parseObject: parseObject2, parseNumber: parseNumber2 } = helpers_default;
var defaults2 = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
};
var parseInput = (s, input) => {
  let today = s._today || defaults2;
  if (typeof input === "number") {
    return parseNumber2(s, input);
  }
  s.epoch = Date.now();
  if (s._today && isObject(s._today) && Object.keys(s._today).length > 0) {
    let res = parseObject2(s, today, defaults2);
    if (res.isValid()) {
      s.epoch = res.epoch;
    }
  }
  if (input === null || input === void 0 || input === "") {
    return s;
  }
  if (isDate(input) === true) {
    s.epoch = input.getTime();
    return s;
  }
  if (isArray(input) === true) {
    s = parseArray2(s, input, today);
    return s;
  }
  if (isObject(input) === true) {
    if (input.epoch) {
      s.epoch = input.epoch;
      s.tz = input.tz;
      return s;
    }
    s = parseObject2(s, input, today);
    return s;
  }
  if (typeof input !== "string") {
    return s;
  }
  input = normalize_default(input);
  if (named_dates_default.hasOwnProperty(input) === true) {
    s = named_dates_default[input](s);
    return s;
  }
  return parse_default(s, input);
};
var input_default = parseInput;

// ../../../node_modules/spacetime/src/data/days.js
var shortDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var longDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function short2() {
  return shortDays;
}
function long2() {
  return longDays;
}
function set2(i18n) {
  shortDays = i18n.short || shortDays;
  longDays = i18n.long || longDays;
}
var aliases = {
  mo: 1,
  tu: 2,
  we: 3,
  th: 4,
  fr: 5,
  sa: 6,
  su: 7,
  tues: 2,
  weds: 3,
  wedn: 3,
  thur: 4,
  thurs: 4
};

// ../../../node_modules/spacetime/src/data/caseFormat.js
var titleCaseEnabled = true;
function useTitleCase() {
  return titleCaseEnabled;
}
function set3(val) {
  titleCaseEnabled = val;
}

// ../../../node_modules/spacetime/src/methods/format/_offset.js
var isoOffset = (s) => {
  let offset = s.timezone().current.offset;
  return !offset ? "Z" : formatTimezone(offset, ":");
};
var offset_default = isoOffset;

// ../../../node_modules/spacetime/src/methods/format/index.js
var applyCaseFormat = (str) => {
  if (useTitleCase()) {
    return titleCase(str);
  }
  return str;
};
var padYear = (num) => {
  if (num >= 0) {
    return zeroPad(num, 4);
  } else {
    num = Math.abs(num);
    return "-" + zeroPad(num, 4);
  }
};
var format = {
  day: (s) => applyCaseFormat(s.dayName()),
  "day-short": (s) => applyCaseFormat(short2()[s.day()]),
  "day-number": (s) => s.day(),
  "day-ordinal": (s) => ordinal(s.day()),
  "day-pad": (s) => zeroPad(s.day()),
  date: (s) => s.date(),
  "date-ordinal": (s) => ordinal(s.date()),
  "date-pad": (s) => zeroPad(s.date()),
  month: (s) => applyCaseFormat(s.monthName()),
  "month-short": (s) => applyCaseFormat(short()[s.month()]),
  "month-number": (s) => s.month(),
  "month-ordinal": (s) => ordinal(s.month()),
  "month-pad": (s) => zeroPad(s.month()),
  "iso-month": (s) => zeroPad(s.month() + 1),
  year: (s) => {
    let year2 = s.year();
    if (year2 > 0) {
      return year2;
    }
    year2 = Math.abs(year2);
    return year2 + " BC";
  },
  "year-short": (s) => {
    let year2 = s.year();
    if (year2 > 0) {
      return `'${String(s.year()).substr(2, 4)}`;
    }
    year2 = Math.abs(year2);
    return year2 + " BC";
  },
  "iso-year": (s) => {
    let year2 = s.year();
    let isNegative = year2 < 0;
    let str = zeroPad(Math.abs(year2), 4);
    if (isNegative) {
      str = zeroPad(str, 6);
      str = "-" + str;
    }
    return str;
  },
  time: (s) => s.time(),
  "time-24": (s) => `${s.hour24()}:${zeroPad(s.minute())}`,
  hour: (s) => s.hour12(),
  "hour-pad": (s) => zeroPad(s.hour12()),
  "hour-24": (s) => s.hour24(),
  "hour-24-pad": (s) => zeroPad(s.hour24()),
  minute: (s) => s.minute(),
  "minute-pad": (s) => zeroPad(s.minute()),
  second: (s) => s.second(),
  "second-pad": (s) => zeroPad(s.second()),
  millisecond: (s) => s.millisecond(),
  "millisecond-pad": (s) => zeroPad(s.millisecond(), 3),
  ampm: (s) => s.ampm(),
  AMPM: (s) => s.ampm().toUpperCase(),
  quarter: (s) => "Q" + s.quarter(),
  season: (s) => s.season(),
  era: (s) => s.era(),
  json: (s) => s.json(),
  timezone: (s) => s.timezone().name,
  offset: (s) => offset_default(s),
  numeric: (s) => `${s.year()}/${zeroPad(s.month() + 1)}/${zeroPad(s.date())}`,
  "numeric-us": (s) => `${zeroPad(s.month() + 1)}/${zeroPad(s.date())}/${s.year()}`,
  "numeric-uk": (s) => `${zeroPad(s.date())}/${zeroPad(s.month() + 1)}/${s.year()}`,
  "mm/dd": (s) => `${zeroPad(s.month() + 1)}/${zeroPad(s.date())}`,
  iso: (s) => {
    let year2 = s.format("iso-year");
    let month2 = zeroPad(s.month() + 1);
    let date2 = zeroPad(s.date());
    let hour = zeroPad(s.h24());
    let minute = zeroPad(s.minute());
    let second = zeroPad(s.second());
    let ms = zeroPad(s.millisecond(), 3);
    let offset = offset_default(s);
    return `${year2}-${month2}-${date2}T${hour}:${minute}:${second}.${ms}${offset}`;
  },
  "iso-short": (s) => {
    let month2 = zeroPad(s.month() + 1);
    let date2 = zeroPad(s.date());
    let year2 = padYear(s.year());
    return `${year2}-${month2}-${date2}`;
  },
  "iso-utc": (s) => {
    return new Date(s.epoch).toISOString();
  },
  nice: (s) => `${short()[s.month()]} ${ordinal(s.date())}, ${s.time()}`,
  "nice-24": (s) => `${short()[s.month()]} ${ordinal(s.date())}, ${s.hour24()}:${zeroPad(
    s.minute()
  )}`,
  "nice-year": (s) => `${short()[s.month()]} ${ordinal(s.date())}, ${s.year()}`,
  "nice-day": (s) => `${short2()[s.day()]} ${applyCaseFormat(short()[s.month()])} ${ordinal(
    s.date()
  )}`,
  "nice-full": (s) => `${s.dayName()} ${applyCaseFormat(s.monthName())} ${ordinal(s.date())}, ${s.time()}`,
  "nice-full-24": (s) => `${s.dayName()} ${applyCaseFormat(s.monthName())} ${ordinal(
    s.date()
  )}, ${s.hour24()}:${zeroPad(s.minute())}`
};
var aliases2 = {
  "day-name": "day",
  "month-name": "month",
  "iso 8601": "iso",
  "time-h24": "time-24",
  "time-12": "time",
  "time-h12": "time",
  tz: "timezone",
  "day-num": "day-number",
  "month-num": "month-number",
  "month-iso": "iso-month",
  "year-iso": "iso-year",
  "nice-short": "nice",
  "nice-short-24": "nice-24",
  mdy: "numeric-us",
  dmy: "numeric-uk",
  ymd: "numeric",
  "yyyy/mm/dd": "numeric",
  "mm/dd/yyyy": "numeric-us",
  "dd/mm/yyyy": "numeric-us",
  "little-endian": "numeric-uk",
  "big-endian": "numeric",
  "day-nice": "nice-day"
};
Object.keys(aliases2).forEach((k) => format[k] = format[aliases2[k]]);
var printFormat = (s, str = "") => {
  if (s.isValid() !== true) {
    return "";
  }
  if (format.hasOwnProperty(str)) {
    let out = format[str](s) || "";
    if (str !== "json") {
      out = String(out);
      if (str.toLowerCase() !== "ampm") {
        out = applyCaseFormat(out);
      }
    }
    return out;
  }
  if (str.indexOf("{") !== -1) {
    let sections = /\{(.+?)\}/g;
    str = str.replace(sections, (_, fmt2) => {
      fmt2 = fmt2.toLowerCase().trim();
      if (format.hasOwnProperty(fmt2)) {
        let out = String(format[fmt2](s));
        if (fmt2.toLowerCase() !== "ampm") {
          return applyCaseFormat(out);
        }
        return out;
      }
      return "";
    });
    return str;
  }
  return s.format("iso-short");
};
var format_default = printFormat;

// ../../../node_modules/spacetime/src/methods/format/unixFmt.js
var mapping2 = {
  G: (s) => s.era(),
  GG: (s) => s.era(),
  GGG: (s) => s.era(),
  GGGG: (s) => s.era() === "AD" ? "Anno Domini" : "Before Christ",
  y: (s) => s.year(),
  yy: (s) => {
    return zeroPad(Number(String(s.year()).substr(2, 4)));
  },
  yyy: (s) => s.year(),
  yyyy: (s) => s.year(),
  yyyyy: (s) => "0" + s.year(),
  Q: (s) => s.quarter(),
  QQ: (s) => s.quarter(),
  QQQ: (s) => s.quarter(),
  QQQQ: (s) => s.quarter(),
  M: (s) => s.month() + 1,
  MM: (s) => zeroPad(s.month() + 1),
  MMM: (s) => s.format("month-short"),
  MMMM: (s) => s.format("month"),
  w: (s) => s.week(),
  ww: (s) => zeroPad(s.week()),
  d: (s) => s.date(),
  dd: (s) => zeroPad(s.date()),
  D: (s) => s.dayOfYear(),
  DD: (s) => zeroPad(s.dayOfYear()),
  DDD: (s) => zeroPad(s.dayOfYear(), 3),
  E: (s) => s.format("day-short"),
  EE: (s) => s.format("day-short"),
  EEE: (s) => s.format("day-short"),
  EEEE: (s) => s.format("day"),
  EEEEE: (s) => s.format("day")[0],
  e: (s) => s.day(),
  ee: (s) => s.day(),
  eee: (s) => s.format("day-short"),
  eeee: (s) => s.format("day"),
  eeeee: (s) => s.format("day")[0],
  a: (s) => s.ampm().toUpperCase(),
  aa: (s) => s.ampm().toUpperCase(),
  aaa: (s) => s.ampm().toUpperCase(),
  aaaa: (s) => s.ampm().toUpperCase(),
  h: (s) => s.h12(),
  hh: (s) => zeroPad(s.h12()),
  H: (s) => s.hour(),
  HH: (s) => zeroPad(s.hour()),
  m: (s) => s.minute(),
  mm: (s) => zeroPad(s.minute()),
  s: (s) => s.second(),
  ss: (s) => zeroPad(s.second()),
  SSS: (s) => zeroPad(s.millisecond(), 3),
  A: (s) => s.epoch - s.startOf("day").epoch,
  z: (s) => s.timezone().name,
  zz: (s) => s.timezone().name,
  zzz: (s) => s.timezone().name,
  zzzz: (s) => s.timezone().name,
  Z: (s) => formatTimezone(s.timezone().current.offset),
  ZZ: (s) => formatTimezone(s.timezone().current.offset),
  ZZZ: (s) => formatTimezone(s.timezone().current.offset),
  ZZZZ: (s) => formatTimezone(s.timezone().current.offset, ":")
};
var addAlias = (char, to, n) => {
  let name = char;
  let toName = to;
  for (let i = 0; i < n; i += 1) {
    mapping2[name] = mapping2[toName];
    name += char;
    toName += to;
  }
};
addAlias("q", "Q", 4);
addAlias("L", "M", 4);
addAlias("Y", "y", 4);
addAlias("c", "e", 4);
addAlias("k", "H", 2);
addAlias("K", "h", 2);
addAlias("S", "s", 2);
addAlias("v", "z", 4);
addAlias("V", "Z", 4);
var escapeChars = function(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === `'`) {
      for (let o2 = i + 1; o2 < arr.length; o2 += 1) {
        if (arr[o2]) {
          arr[i] += arr[o2];
        }
        if (arr[o2] === `'`) {
          arr[o2] = null;
          break;
        }
        arr[o2] = null;
      }
    }
  }
  return arr.filter((ch) => ch);
};
var combineRepeated = function(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let c = arr[i];
    for (let o2 = i + 1; o2 < arr.length; o2 += 1) {
      if (arr[o2] === c) {
        arr[i] += arr[o2];
        arr[o2] = null;
      } else {
        break;
      }
    }
  }
  arr = arr.filter((ch) => ch);
  arr = arr.map((str) => {
    if (str === `''`) {
      str = `'`;
    }
    return str;
  });
  return arr;
};
var unixFmt = (s, str) => {
  let arr = str.split("");
  arr = escapeChars(arr);
  arr = combineRepeated(arr);
  return arr.reduce((txt, c) => {
    if (mapping2[c] !== void 0) {
      txt += mapping2[c](s) || "";
    } else {
      if (/^'.{1,}'$/.test(c)) {
        c = c.replace(/'/g, "");
      }
      txt += c;
    }
    return txt;
  }, "");
};
var unixFmt_default = unixFmt;

// ../../../node_modules/spacetime/src/methods/progress.js
var units2 = ["year", "season", "quarter", "month", "week", "day", "quarterHour", "hour", "minute"];
var doUnit = function(s, k) {
  let start = s.clone().startOf(k);
  let end = s.clone().endOf(k);
  let duration = end.epoch - start.epoch;
  let percent = (s.epoch - start.epoch) / duration;
  return parseFloat(percent.toFixed(2));
};
var progress = (s, unit) => {
  if (unit) {
    unit = normalize2(unit);
    return doUnit(s, unit);
  }
  let obj = {};
  units2.forEach((k) => {
    obj[k] = doUnit(s, k);
  });
  return obj;
};
var progress_default = progress;

// ../../../node_modules/spacetime/src/methods/nearest.js
var nearest = (s, unit) => {
  let prog = s.progress();
  unit = normalize2(unit);
  if (unit === "quarterhour") {
    unit = "quarterHour";
  }
  if (prog[unit] !== void 0) {
    if (prog[unit] > 0.5) {
      s = s.add(1, unit);
    }
    s = s.startOf(unit);
  } else if (s.silent === false) {
    console.warn("no known unit '" + unit + "'");
  }
  return s;
};
var nearest_default = nearest;

// ../../../node_modules/spacetime/src/methods/diff/one.js
var climb = (a, b, unit) => {
  let i = 0;
  a = a.clone();
  while (a.isBefore(b)) {
    a = a.add(1, unit);
    i += 1;
  }
  if (a.isAfter(b, unit)) {
    i -= 1;
  }
  return i;
};
var diffOne = (a, b, unit) => {
  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    return climb(b, a, unit) * -1;
  }
};
var one_default = diffOne;

// ../../../node_modules/spacetime/src/methods/diff/waterfall.js
var fastYear = (a, b) => {
  let years = b.year() - a.year();
  a = a.year(b.year());
  if (a.isAfter(b)) {
    years -= 1;
  }
  return years;
};
var diff = function(a, b) {
  let msDiff = b.epoch - a.epoch;
  let obj = {
    milliseconds: msDiff,
    seconds: parseInt(msDiff / 1e3, 10)
  };
  obj.minutes = parseInt(obj.seconds / 60, 10);
  obj.hours = parseInt(obj.minutes / 60, 10);
  let tmp = a.clone();
  obj.years = fastYear(tmp, b);
  tmp = a.add(obj.years, "year");
  obj.months = obj.years * 12;
  tmp = a.add(obj.months, "month");
  obj.months += one_default(tmp, b, "month");
  obj.quarters = obj.years * 4;
  obj.quarters += parseInt(obj.months % 12 / 3, 10);
  obj.weeks = obj.years * 52;
  tmp = a.add(obj.weeks, "week");
  obj.weeks += one_default(tmp, b, "week");
  obj.days = obj.weeks * 7;
  tmp = a.add(obj.days, "day");
  obj.days += one_default(tmp, b, "day");
  return obj;
};
var waterfall_default = diff;

// ../../../node_modules/spacetime/src/methods/diff/index.js
var reverseDiff = function(obj) {
  Object.keys(obj).forEach((k) => {
    obj[k] *= -1;
  });
  return obj;
};
var main = function(a, b, unit) {
  b = beADate(b, a);
  let reversed = false;
  if (a.isAfter(b)) {
    let tmp = a;
    a = b;
    b = tmp;
    reversed = true;
  }
  let obj = waterfall_default(a, b);
  if (reversed) {
    obj = reverseDiff(obj);
  }
  if (unit) {
    unit = normalize2(unit);
    if (/s$/.test(unit) !== true) {
      unit += "s";
    }
    if (unit === "dates") {
      unit = "days";
    }
    return obj[unit];
  }
  return obj;
};
var diff_default = main;

// ../../../node_modules/spacetime/src/methods/since/_iso.js
var fmt = (n) => Math.abs(n) || 0;
var toISO = function(diff2) {
  let iso = "P";
  iso += fmt(diff2.years) + "Y";
  iso += fmt(diff2.months) + "M";
  iso += fmt(diff2.days) + "DT";
  iso += fmt(diff2.hours) + "H";
  iso += fmt(diff2.minutes) + "M";
  iso += fmt(diff2.seconds) + "S";
  return iso;
};
var iso_default = toISO;

// ../../../node_modules/spacetime/src/methods/since/getDiff.js
function getDiff(a, b) {
  const isBefore = a.isBefore(b);
  const later = isBefore ? b : a;
  let earlier = isBefore ? a : b;
  earlier = earlier.clone();
  const diff2 = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  Object.keys(diff2).forEach((unit) => {
    if (earlier.isSame(later, unit)) {
      return;
    }
    let max = earlier.diff(later, unit);
    earlier = earlier.add(max, unit);
    diff2[unit] = max;
  });
  if (isBefore) {
    Object.keys(diff2).forEach((u) => {
      if (diff2[u] !== 0) {
        diff2[u] *= -1;
      }
    });
  }
  return diff2;
}
var getDiff_default = getDiff;

// ../../../node_modules/spacetime/src/data/units.js
var units3 = {
  second: "second",
  seconds: "seconds",
  minute: "minute",
  minutes: "minutes",
  hour: "hour",
  hours: "hours",
  day: "day",
  days: "days",
  month: "month",
  months: "months",
  year: "year",
  years: "years"
};
function unitsString(unit) {
  return units3[unit] || "";
}
function set4(i18n = {}) {
  units3 = {
    second: i18n.second || units3.second,
    seconds: i18n.seconds || units3.seconds,
    minute: i18n.minute || units3.minute,
    minutes: i18n.minutes || units3.minutes,
    hour: i18n.hour || units3.hour,
    hours: i18n.hours || units3.hours,
    day: i18n.day || units3.day,
    days: i18n.days || units3.days,
    month: i18n.month || units3.month,
    months: i18n.months || units3.months,
    year: i18n.year || units3.year,
    years: i18n.years || units3.years
  };
}

// ../../../node_modules/spacetime/src/data/distance.js
var past = "past";
var future = "future";
var present = "present";
var now = "now";
var almost = "almost";
var over = "over";
var pastDistance = (value) => `${value} ago`;
var futureDistance = (value) => `in ${value}`;
function pastDistanceString(value) {
  return pastDistance(value);
}
function futureDistanceString(value) {
  return futureDistance(value);
}
function pastString() {
  return past;
}
function futureString() {
  return future;
}
function presentString() {
  return present;
}
function nowString() {
  return now;
}
function almostString() {
  return almost;
}
function overString() {
  return over;
}
function set5(i18n) {
  pastDistance = i18n.pastDistance || pastDistance;
  futureDistance = i18n.futureDistance || futureDistance;
  past = i18n.past || past;
  future = i18n.future || future;
  present = i18n.present || present;
  now = i18n.now || now;
  almost = i18n.almost || almost;
  over = i18n.over || over;
}

// ../../../node_modules/spacetime/src/methods/since/soften.js
var qualifiers = {
  months: {
    almost: 10,
    over: 4
  },
  days: {
    almost: 25,
    over: 10
  },
  hours: {
    almost: 20,
    over: 8
  },
  minutes: {
    almost: 50,
    over: 20
  },
  seconds: {
    almost: 50,
    over: 20
  }
};
function pluralize(value, unit) {
  if (value === 1) {
    return value + " " + unitsString(unit.slice(0, -1));
  }
  return value + " " + unitsString(unit);
}
var toSoft = function(diff2) {
  let rounded = null;
  let qualified = null;
  let abbreviated = [];
  let englishValues = [];
  Object.keys(diff2).forEach((unit, i, units6) => {
    const value = Math.abs(diff2[unit]);
    if (value === 0) {
      return;
    }
    abbreviated.push(value + unit[0]);
    const englishValue = pluralize(value, unit);
    englishValues.push(englishValue);
    if (!rounded) {
      rounded = qualified = englishValue;
      if (i > 4) {
        return;
      }
      const nextUnit = units6[i + 1];
      const nextValue = Math.abs(diff2[nextUnit]);
      if (nextValue > qualifiers[nextUnit].almost) {
        rounded = pluralize(value + 1, unit);
        qualified = almostString() + " " + rounded;
      } else if (nextValue > qualifiers[nextUnit].over) {
        qualified = overString() + " " + englishValue;
      }
    }
  });
  return { qualified, rounded, abbreviated, englishValues };
};
var soften_default = toSoft;

// ../../../node_modules/spacetime/src/methods/since/index.js
var since = (start, end) => {
  end = beADate(end, start);
  const diff2 = getDiff_default(start, end);
  const isNow = Object.keys(diff2).every((u) => !diff2[u]);
  if (isNow === true) {
    return {
      diff: diff2,
      rounded: nowString(),
      qualified: nowString(),
      precise: nowString(),
      abbreviated: [],
      iso: "P0Y0M0DT0H0M0S",
      direction: presentString()
    };
  }
  let precise;
  let direction = futureString();
  let { rounded, qualified, englishValues, abbreviated } = soften_default(diff2);
  precise = englishValues.splice(0, 2).join(", ");
  if (start.isAfter(end) === true) {
    rounded = pastDistanceString(rounded);
    qualified = pastDistanceString(qualified);
    precise = pastDistanceString(precise);
    direction = pastString();
  } else {
    rounded = futureDistanceString(rounded);
    qualified = futureDistanceString(qualified);
    precise = futureDistanceString(precise);
  }
  let iso = iso_default(diff2);
  return {
    diff: diff2,
    rounded,
    qualified,
    precise,
    abbreviated,
    iso,
    direction
  };
};
var since_default = since;

// ../../../node_modules/spacetime/src/data/seasons.js
var north = [
  ["spring", 2, 1],
  ["summer", 5, 1],
  ["fall", 8, 1],
  ["autumn", 8, 1],
  ["winter", 11, 1]
];
var south = [
  ["fall", 2, 1],
  ["autumn", 2, 1],
  ["winter", 5, 1],
  ["spring", 8, 1],
  ["summer", 11, 1]
];
var seasons_default = { north, south };

// ../../../node_modules/spacetime/src/data/quarters.js
var quarters_default = [
  null,
  [0, 1],
  [3, 1],
  [6, 1],
  [9, 1]
];

// ../../../node_modules/spacetime/src/methods/startOf.js
var units4 = {
  second: (s) => {
    walk_default(s, {
      millisecond: 0
    });
    return s;
  },
  minute: (s) => {
    walk_default(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarterhour: (s) => {
    let minute = s.minutes();
    if (minute >= 45) {
      s = s.minutes(45);
    } else if (minute >= 30) {
      s = s.minutes(30);
    } else if (minute >= 15) {
      s = s.minutes(15);
    } else {
      s = s.minutes(0);
    }
    walk_default(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  hour: (s) => {
    walk_default(s, {
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  day: (s) => {
    walk_default(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  week: (s) => {
    let original = s.clone();
    s = s.day(s._weekStart);
    if (s.isAfter(original)) {
      s = s.subtract(1, "week");
    }
    walk_default(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  month: (s) => {
    walk_default(s, {
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarter: (s) => {
    let q = s.quarter();
    if (quarters_default[q]) {
      walk_default(s, {
        month: quarters_default[q][0],
        date: quarters_default[q][1],
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
    }
    return s;
  },
  season: (s) => {
    let current = s.season();
    let hem = "north";
    if (s.hemisphere() === "South") {
      hem = "south";
    }
    for (let i = 0; i < seasons_default[hem].length; i++) {
      if (seasons_default[hem][i][0] === current) {
        let year2 = s.year();
        if (current === "winter" && s.month() < 3) {
          year2 -= 1;
        }
        walk_default(s, {
          year: year2,
          month: seasons_default[hem][i][1],
          date: seasons_default[hem][i][2],
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        });
        return s;
      }
    }
    return s;
  },
  year: (s) => {
    walk_default(s, {
      month: 0,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  decade: (s) => {
    s = s.startOf("year");
    let year2 = s.year();
    let decade = parseInt(year2 / 10, 10) * 10;
    s = s.year(decade);
    return s;
  },
  century: (s) => {
    s = s.startOf("year");
    let year2 = s.year();
    let decade = parseInt(year2 / 100, 10) * 100;
    s = s.year(decade);
    return s;
  }
};
units4.date = units4.day;
var startOf = (a, unit) => {
  let s = a.clone();
  unit = normalize2(unit);
  if (units4[unit]) {
    return units4[unit](s);
  }
  if (unit === "summer" || unit === "winter") {
    s = s.season(unit);
    return units4.season(s);
  }
  return s;
};
var endOf = (a, unit) => {
  let s = a.clone();
  unit = normalize2(unit);
  if (units4[unit]) {
    s = units4[unit](s);
    s = s.add(1, unit);
    s = s.subtract(1, "millisecond");
    return s;
  }
  return s;
};

// ../../../node_modules/spacetime/src/methods/every.js
var isDay = function(unit) {
  if (short2().find((s) => s === unit)) {
    return true;
  }
  if (long2().find((s) => s === unit)) {
    return true;
  }
  return false;
};
var every = function(start, unit, end) {
  if (!unit || !end) {
    return [];
  }
  unit = normalize2(unit);
  end = start.clone().set(end);
  if (start.isAfter(end)) {
    let tmp = start;
    start = end;
    end = tmp;
  }
  let d = start.clone();
  if (isDay(unit)) {
    d = d.next(unit);
    unit = "week";
  } else {
    let first = d.startOf(unit);
    if (first.isBefore(start)) {
      d = d.next(unit);
    }
  }
  let result = [];
  while (d.isBefore(end)) {
    result.push(d);
    d = d.add(1, unit);
  }
  return result;
};
var every_default = every;

// ../../../node_modules/spacetime/src/timezone/index.js
var parseDst = (dst) => {
  if (!dst) {
    return [];
  }
  return dst.split("->");
};
var titleCase2 = (str) => {
  str = str[0].toUpperCase() + str.substr(1);
  str = str.replace(/[\/_-]([a-z])/gi, (s) => {
    return s.toUpperCase();
  });
  str = str.replace(/_(of|es)_/i, (s) => s.toLowerCase());
  str = str.replace(/\/gmt/i, "/GMT");
  str = str.replace(/\/Dumontdurville$/i, "/DumontDUrville");
  str = str.replace(/\/Mcmurdo$/i, "/McMurdo");
  str = str.replace(/\/Port-au-prince$/i, "/Port-au-Prince");
  return str;
};
var timezone = (s) => {
  let zones = s.timezones;
  let tz = s.tz;
  if (zones.hasOwnProperty(tz) === false) {
    tz = find_default(s.tz, zones);
  }
  if (tz === null) {
    if (s.silent === false) {
      console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
    }
    return {
      current: {
        epochShift: 0
      }
    };
  }
  let found = zones[tz];
  let result = {
    name: titleCase2(tz),
    hasDst: Boolean(found.dst),
    default_offset: found.offset,
    hemisphere: found.hem === "s" ? "South" : "North",
    current: {}
  };
  if (result.hasDst) {
    let arr = parseDst(found.dst);
    result.change = {
      start: arr[0],
      back: arr[1]
    };
  }
  let summer = found.offset;
  let winter = summer;
  if (result.hasDst === true) {
    if (result.hemisphere === "North") {
      winter = summer - 1;
    } else {
      winter = found.offset + 1;
    }
  }
  if (result.hasDst === false) {
    result.current.offset = summer;
    result.current.isDST = false;
  } else if (summerTime_default(s.epoch, result.change.start, result.change.back, summer, winter) === true) {
    result.current.offset = summer;
    result.current.isDST = result.hemisphere === "North";
  } else {
    result.current.offset = winter;
    result.current.isDST = result.hemisphere === "South";
  }
  return result;
};
var timezone_default = timezone;

// ../../../node_modules/spacetime/src/methods.js
var units5 = [
  "century",
  "decade",
  "year",
  "month",
  "date",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
var methods = {
  set: function(input, tz) {
    let s = this.clone();
    s = input_default(s, input, null);
    if (tz) {
      this.tz = find_default(tz);
    }
    return s;
  },
  timezone: function() {
    return timezone_default(this);
  },
  isDST: function() {
    return timezone_default(this).current.isDST;
  },
  hasDST: function() {
    return timezone_default(this).hasDst;
  },
  offset: function() {
    return timezone_default(this).current.offset * 60;
  },
  hemisphere: function() {
    return timezone_default(this).hemisphere;
  },
  format: function(fmt2) {
    return format_default(this, fmt2);
  },
  unixFmt: function(fmt2) {
    return unixFmt_default(this, fmt2);
  },
  startOf: function(unit) {
    return startOf(this, unit);
  },
  endOf: function(unit) {
    return endOf(this, unit);
  },
  leapYear: function() {
    let year2 = this.year();
    return isLeapYear(year2);
  },
  progress: function(unit) {
    return progress_default(this, unit);
  },
  nearest: function(unit) {
    return nearest_default(this, unit);
  },
  diff: function(d, unit) {
    return diff_default(this, d, unit);
  },
  since: function(d) {
    if (!d) {
      d = this.clone().set();
    }
    return since_default(this, d);
  },
  next: function(unit) {
    let s = this.add(1, unit);
    return s.startOf(unit);
  },
  last: function(unit) {
    let s = this.subtract(1, unit);
    return s.startOf(unit);
  },
  isValid: function() {
    if (!this.epoch && this.epoch !== 0) {
      return false;
    }
    return !isNaN(this.d.getTime());
  },
  goto: function(tz) {
    let s = this.clone();
    s.tz = find_default(tz, s.timezones);
    return s;
  },
  every: function(unit, to) {
    if (typeof unit === "object" && typeof to === "string") {
      let tmp = to;
      to = unit;
      unit = tmp;
    }
    return every_default(this, unit, to);
  },
  isAwake: function() {
    let hour = this.hour();
    if (hour < 8 || hour > 22) {
      return false;
    }
    return true;
  },
  isAsleep: function() {
    return !this.isAwake();
  },
  daysInMonth: function() {
    switch (this.month()) {
      case 0:
        return 31;
      case 1:
        return this.leapYear() ? 29 : 28;
      case 2:
        return 31;
      case 3:
        return 30;
      case 4:
        return 31;
      case 5:
        return 30;
      case 6:
        return 31;
      case 7:
        return 31;
      case 8:
        return 30;
      case 9:
        return 31;
      case 10:
        return 30;
      case 11:
        return 31;
      default:
        throw new Error("Invalid Month state.");
    }
  },
  log: function() {
    console.log("");
    console.log(format_default(this, "nice-short"));
    return this;
  },
  logYear: function() {
    console.log("");
    console.log(format_default(this, "full-short"));
    return this;
  },
  json: function() {
    return units5.reduce((h, unit) => {
      h[unit] = this[unit]();
      return h;
    }, {});
  },
  debug: function() {
    let tz = this.timezone();
    let date2 = this.format("MM") + " " + this.format("date-ordinal") + " " + this.year();
    date2 += "\n     - " + this.format("time");
    console.log("\n\n", date2 + "\n     - " + tz.name + " (" + tz.current.offset + ")");
    return this;
  },
  from: function(d) {
    d = this.clone().set(d);
    return d.since(this);
  },
  fromNow: function() {
    let d = this.clone().set(Date.now());
    return d.since(this);
  },
  weekStart: function(input) {
    if (typeof input === "number") {
      this._weekStart = input;
      return this;
    }
    if (typeof input === "string") {
      input = input.toLowerCase().trim();
      let num = short2().indexOf(input);
      if (num === -1) {
        num = long2().indexOf(input);
      }
      if (num === -1) {
        num = 1;
      }
      this._weekStart = num;
    } else {
      console.warn("Spacetime Error: Cannot understand .weekStart() input:", input);
    }
    return this;
  }
};
methods.inDST = methods.isDST;
methods.round = methods.nearest;
methods.each = methods.every;
var methods_default = methods;

// ../../../node_modules/spacetime/src/methods/set/set.js
var validate2 = (n) => {
  if (typeof n === "string") {
    n = parseInt(n, 10);
  }
  return n;
};
var order = ["year", "month", "date", "hour", "minute", "second", "millisecond"];
var confirm = (s, tmp, unit) => {
  let n = order.indexOf(unit);
  let arr = order.slice(n, order.length);
  for (let i = 0; i < arr.length; i++) {
    let want = tmp[arr[i]]();
    s[arr[i]](want);
  }
  return s;
};
var fwdBkwd = function(s, old, goFwd, unit) {
  if (goFwd === true && s.isBefore(old)) {
    s = s.add(1, unit);
  } else if (goFwd === false && s.isAfter(old)) {
    s = s.minus(1, unit);
  }
  return s;
};
var milliseconds = function(s, n) {
  n = validate2(n);
  let current = s.millisecond();
  let diff2 = current - n;
  return s.epoch - diff2;
};
var seconds = function(s, n, goFwd) {
  n = validate2(n);
  let old = s.clone();
  let diff2 = s.second() - n;
  let shift = diff2 * milliseconds_default.second;
  s.epoch = s.epoch - shift;
  s = fwdBkwd(s, old, goFwd, "minute");
  return s.epoch;
};
var minutes = function(s, n, goFwd) {
  n = validate2(n);
  let old = s.clone();
  let diff2 = s.minute() - n;
  let shift = diff2 * milliseconds_default.minute;
  s.epoch -= shift;
  confirm(s, old, "second");
  s = fwdBkwd(s, old, goFwd, "hour");
  return s.epoch;
};
var hours = function(s, n, goFwd) {
  n = validate2(n);
  if (n >= 24) {
    n = 24;
  } else if (n < 0) {
    n = 0;
  }
  let old = s.clone();
  let diff2 = s.hour() - n;
  let shift = diff2 * milliseconds_default.hour;
  s.epoch -= shift;
  if (s.date() !== old.date()) {
    s = old.clone();
    if (diff2 > 1) {
      diff2 -= 1;
    }
    if (diff2 < 1) {
      diff2 += 1;
    }
    shift = diff2 * milliseconds_default.hour;
    s.epoch -= shift;
  }
  walk_default(s, {
    hour: n
  });
  confirm(s, old, "minute");
  s = fwdBkwd(s, old, goFwd, "day");
  return s.epoch;
};
var time = function(s, str, goFwd) {
  let m = str.match(/([0-9]{1,2})[:h]([0-9]{1,2})(:[0-9]{1,2})? ?(am|pm)?/);
  if (!m) {
    m = str.match(/([0-9]{1,2}) ?(am|pm)/);
    if (!m) {
      return s.epoch;
    }
    m.splice(2, 0, "0");
    m.splice(3, 0, "");
  }
  let h24 = false;
  let hour = parseInt(m[1], 10);
  let minute = parseInt(m[2], 10);
  if (minute >= 60) {
    minute = 59;
  }
  if (hour > 12) {
    h24 = true;
  }
  if (h24 === false) {
    if (m[4] === "am" && hour === 12) {
      hour = 0;
    }
    if (m[4] === "pm" && hour < 12) {
      hour += 12;
    }
  }
  m[3] = m[3] || "";
  m[3] = m[3].replace(/:/, "");
  let sec = parseInt(m[3], 10) || 0;
  let old = s.clone();
  s = s.hour(hour);
  s = s.minute(minute);
  s = s.second(sec);
  s = s.millisecond(0);
  s = fwdBkwd(s, old, goFwd, "day");
  return s.epoch;
};
var date = function(s, n, goFwd) {
  n = validate2(n);
  if (n > 28) {
    let month2 = s.month();
    let max = monthLengths_default[month2];
    if (month2 === 1 && n === 29 && isLeapYear(s.year())) {
      max = 29;
    }
    if (n > max) {
      n = max;
    }
  }
  if (n <= 0) {
    n = 1;
  }
  let old = s.clone();
  walk_default(s, {
    date: n
  });
  s = fwdBkwd(s, old, goFwd, "month");
  return s.epoch;
};
var month = function(s, n, goFwd) {
  if (typeof n === "string") {
    if (n === "sept") {
      n = "sep";
    }
    n = mapping()[n.toLowerCase()];
  }
  n = validate2(n);
  if (n >= 12) {
    n = 11;
  }
  if (n <= 0) {
    n = 0;
  }
  let d = s.date();
  if (d > monthLengths_default[n]) {
    d = monthLengths_default[n];
  }
  let old = s.clone();
  walk_default(s, {
    month: n,
    d
  });
  s = fwdBkwd(s, old, goFwd, "year");
  return s.epoch;
};
var year = function(s, n) {
  if (typeof n === "string" && /^'[0-9]{2}$/.test(n)) {
    n = n.replace(/'/, "").trim();
    n = Number(n);
    if (n > 30) {
      n = 1900 + n;
    } else {
      n = 2e3 + n;
    }
  }
  n = validate2(n);
  walk_default(s, {
    year: n
  });
  return s.epoch;
};
var week = function(s, n, goFwd) {
  let old = s.clone();
  n = validate2(n);
  s = s.month(0);
  s = s.date(1);
  s = s.day("monday");
  if (s.monthName() === "december" && s.date() >= 28) {
    s = s.add(1, "week");
  }
  n -= 1;
  s = s.add(n, "weeks");
  s = fwdBkwd(s, old, goFwd, "year");
  return s.epoch;
};
var dayOfYear = function(s, n, goFwd) {
  n = validate2(n);
  let old = s.clone();
  n -= 1;
  if (n <= 0) {
    n = 0;
  } else if (n >= 365) {
    if (isLeapYear(s.year())) {
      n = 365;
    } else {
      n = 364;
    }
  }
  s = s.startOf("year");
  s = s.add(n, "day");
  confirm(s, old, "hour");
  s = fwdBkwd(s, old, goFwd, "year");
  return s.epoch;
};

// ../../../node_modules/spacetime/src/data/ampm.js
var morning = "am";
var evening = "pm";
function am() {
  return morning;
}
function pm() {
  return evening;
}
function set6(i18n) {
  morning = i18n.am || morning;
  evening = i18n.pm || evening;
}

// ../../../node_modules/spacetime/src/methods/query/01-time.js
var methods2 = {
  millisecond: function(num) {
    if (num !== void 0) {
      let s = this.clone();
      s.epoch = milliseconds(s, num);
      return s;
    }
    return this.d.getMilliseconds();
  },
  second: function(num, goFwd) {
    if (num !== void 0) {
      let s = this.clone();
      s.epoch = seconds(s, num, goFwd);
      return s;
    }
    return this.d.getSeconds();
  },
  minute: function(num, goFwd) {
    if (num !== void 0) {
      let s = this.clone();
      s.epoch = minutes(s, num, goFwd);
      return s;
    }
    return this.d.getMinutes();
  },
  hour: function(num, goFwd) {
    let d = this.d;
    if (num !== void 0) {
      let s = this.clone();
      s.epoch = hours(s, num, goFwd);
      return s;
    }
    return d.getHours();
  },
  hourFloat: function(num, goFwd) {
    if (num !== void 0) {
      let s = this.clone();
      let minute2 = num % 1;
      minute2 = minute2 * 60;
      let hour2 = parseInt(num, 10);
      s.epoch = hours(s, hour2, goFwd);
      s.epoch = minutes(s, minute2, goFwd);
      return s;
    }
    let d = this.d;
    let hour = d.getHours();
    let minute = d.getMinutes();
    minute = minute / 60;
    return hour + minute;
  },
  hour12: function(str, goFwd) {
    let d = this.d;
    if (str !== void 0) {
      let s = this.clone();
      str = "" + str;
      let m = str.match(/^([0-9]+)(am|pm)$/);
      if (m) {
        let hour = parseInt(m[1], 10);
        if (m[2] === "pm") {
          hour += 12;
        }
        s.epoch = hours(s, hour, goFwd);
      }
      return s;
    }
    let hour12 = d.getHours();
    if (hour12 > 12) {
      hour12 = hour12 - 12;
    }
    if (hour12 === 0) {
      hour12 = 12;
    }
    return hour12;
  },
  time: function(str, goFwd) {
    if (str !== void 0) {
      let s = this.clone();
      str = str.toLowerCase().trim();
      s.epoch = time(s, str, goFwd);
      return s;
    }
    return `${this.h12()}:${zeroPad(this.minute())}${this.ampm()}`;
  },
  ampm: function(input, goFwd) {
    let which = am();
    let hour = this.hour();
    if (hour >= 12) {
      which = pm();
    }
    if (typeof input !== "string") {
      return which;
    }
    let s = this.clone();
    input = input.toLowerCase().trim();
    if (hour >= 12 && input === "am") {
      hour -= 12;
      return s.hour(hour, goFwd);
    }
    if (hour < 12 && input === "pm") {
      hour += 12;
      return s.hour(hour, goFwd);
    }
    return s;
  },
  dayTime: function(str, goFwd) {
    if (str !== void 0) {
      const times = {
        morning: "7:00",
        breakfast: "7:00",
        noon: "12:00",
        lunch: "12:00",
        afternoon: "14:00",
        evening: "18:00",
        dinner: "18:00",
        night: "23:00",
        midnight: "00:00"
      };
      let s = this.clone();
      str = str || "";
      str = str.toLowerCase();
      if (times.hasOwnProperty(str) === true) {
        s = s.time(times[str], goFwd);
      }
      return s;
    }
    let h = this.hour();
    if (h < 6) {
      return "night";
    }
    if (h < 12) {
      return "morning";
    }
    if (h < 17) {
      return "afternoon";
    }
    if (h < 22) {
      return "evening";
    }
    return "night";
  },
  iso: function(num) {
    if (num !== void 0) {
      return this.set(num);
    }
    return this.format("iso");
  }
};
var time_default = methods2;

// ../../../node_modules/spacetime/src/methods/query/02-date.js
var methods3 = {
  date: function(num, goFwd) {
    if (num !== void 0) {
      let s = this.clone();
      num = parseInt(num, 10);
      if (num) {
        s.epoch = date(s, num, goFwd);
      }
      return s;
    }
    return this.d.getDate();
  },
  day: function(input, goFwd) {
    if (input === void 0) {
      return this.d.getDay();
    }
    let original = this.clone();
    let want = input;
    if (typeof input === "string") {
      input = input.toLowerCase();
      if (aliases.hasOwnProperty(input)) {
        want = aliases[input];
      } else {
        want = short2().indexOf(input);
        if (want === -1) {
          want = long2().indexOf(input);
        }
      }
    }
    let day = this.d.getDay();
    let diff2 = day - want;
    if (goFwd === true && diff2 > 0) {
      diff2 = diff2 - 7;
    }
    if (goFwd === false && diff2 < 0) {
      diff2 = diff2 + 7;
    }
    let s = this.subtract(diff2, "days");
    walk_default(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    return s;
  },
  dayName: function(input, goFwd) {
    if (input === void 0) {
      return long2()[this.day()];
    }
    let s = this.clone();
    s = s.day(input, goFwd);
    return s;
  }
};
var date_default = methods3;

// ../../../node_modules/spacetime/src/methods/query/03-year.js
var clearMinutes = (s) => {
  s = s.minute(0);
  s = s.second(0);
  s = s.millisecond(1);
  return s;
};
var methods4 = {
  dayOfYear: function(num, goFwd) {
    if (num !== void 0) {
      let s = this.clone();
      s.epoch = dayOfYear(s, num, goFwd);
      return s;
    }
    let sum = 0;
    let month2 = this.d.getMonth();
    let tmp;
    for (let i = 1; i <= month2; i++) {
      tmp = new Date();
      tmp.setDate(1);
      tmp.setFullYear(this.d.getFullYear());
      tmp.setHours(1);
      tmp.setMinutes(1);
      tmp.setMonth(i);
      tmp.setHours(-2);
      sum += tmp.getDate();
    }
    return sum + this.d.getDate();
  },
  week: function(num, goFwd) {
    if (num !== void 0) {
      let s = this.clone();
      s.epoch = week(this, num, goFwd);
      s = clearMinutes(s);
      return s;
    }
    let tmp = this.clone();
    tmp = tmp.month(0);
    tmp = tmp.date(1);
    tmp = clearMinutes(tmp);
    tmp = tmp.day("monday");
    if (tmp.month() === 11 && tmp.date() >= 25) {
      tmp = tmp.add(1, "week");
    }
    let toAdd = 1;
    if (tmp.date() === 1) {
      toAdd = 0;
    }
    tmp = tmp.minus(1, "second");
    const thisOne = this.epoch;
    if (tmp.epoch > thisOne) {
      return 1;
    }
    let i = 0;
    let skipWeeks = this.month() * 4;
    tmp.epoch += milliseconds_default.week * skipWeeks;
    i += skipWeeks;
    for (; i <= 52; i++) {
      if (tmp.epoch > thisOne) {
        return i + toAdd;
      }
      tmp = tmp.add(1, "week");
    }
    return 52;
  },
  month: function(input, goFwd) {
    if (input !== void 0) {
      let s = this.clone();
      s.epoch = month(s, input, goFwd);
      return s;
    }
    return this.d.getMonth();
  },
  monthName: function(input, goFwd) {
    if (input !== void 0) {
      let s = this.clone();
      s = s.month(input, goFwd);
      return s;
    }
    return long()[this.month()];
  },
  quarter: function(num, goFwd) {
    if (num !== void 0) {
      if (typeof num === "string") {
        num = num.replace(/^q/i, "");
        num = parseInt(num, 10);
      }
      if (quarters_default[num]) {
        let s = this.clone();
        let month3 = quarters_default[num][0];
        s = s.month(month3, goFwd);
        s = s.date(1, goFwd);
        s = s.startOf("day");
        return s;
      }
    }
    let month2 = this.d.getMonth();
    for (let i = 1; i < quarters_default.length; i++) {
      if (month2 < quarters_default[i][0]) {
        return i - 1;
      }
    }
    return 4;
  },
  season: function(input, goFwd) {
    let hem = "north";
    if (this.hemisphere() === "South") {
      hem = "south";
    }
    if (input !== void 0) {
      let s = this.clone();
      for (let i = 0; i < seasons_default[hem].length; i++) {
        if (input === seasons_default[hem][i][0]) {
          s = s.month(seasons_default[hem][i][1], goFwd);
          s = s.date(1);
          s = s.startOf("day");
        }
      }
      return s;
    }
    let month2 = this.d.getMonth();
    for (let i = 0; i < seasons_default[hem].length - 1; i++) {
      if (month2 >= seasons_default[hem][i][1] && month2 < seasons_default[hem][i + 1][1]) {
        return seasons_default[hem][i][0];
      }
    }
    return hem === "north" ? "winter" : "summer";
  },
  year: function(num) {
    if (num !== void 0) {
      let s = this.clone();
      s.epoch = year(s, num);
      return s;
    }
    return this.d.getFullYear();
  },
  era: function(str) {
    if (str !== void 0) {
      let s = this.clone();
      str = str.toLowerCase();
      let year2 = s.d.getFullYear();
      if (str === "bc" && year2 > 0) {
        s.epoch = year(s, year2 * -1);
      }
      if (str === "ad" && year2 < 0) {
        s.epoch = year(s, year2 * -1);
      }
      return s;
    }
    if (this.d.getFullYear() < 0) {
      return "BC";
    }
    return "AD";
  },
  decade: function(input) {
    if (input !== void 0) {
      input = String(input);
      input = input.replace(/([0-9])'?s$/, "$1");
      input = input.replace(/([0-9])(th|rd|st|nd)/, "$1");
      if (!input) {
        console.warn("Spacetime: Invalid decade input");
        return this;
      }
      if (input.length === 2 && /[0-9][0-9]/.test(input)) {
        input = "19" + input;
      }
      let year2 = Number(input);
      if (isNaN(year2)) {
        return this;
      }
      year2 = Math.floor(year2 / 10) * 10;
      return this.year(year2);
    }
    return this.startOf("decade").year();
  },
  century: function(input) {
    if (input !== void 0) {
      if (typeof input === "string") {
        input = input.replace(/([0-9])(th|rd|st|nd)/, "$1");
        input = input.replace(/([0-9]+) ?(b\.?c\.?|a\.?d\.?)/i, (a, b, c) => {
          if (c.match(/b\.?c\.?/i)) {
            b = "-" + b;
          }
          return b;
        });
        input = input.replace(/c$/, "");
      }
      let year2 = Number(input);
      if (isNaN(input)) {
        console.warn("Spacetime: Invalid century input");
        return this;
      }
      if (year2 === 0) {
        year2 = 1;
      }
      if (year2 >= 0) {
        year2 = (year2 - 1) * 100;
      } else {
        year2 = (year2 + 1) * 100;
      }
      return this.year(year2);
    }
    let num = this.startOf("century").year();
    num = Math.floor(num / 100);
    if (num < 0) {
      return num - 1;
    }
    return num + 1;
  },
  millenium: function(input) {
    if (input !== void 0) {
      if (typeof input === "string") {
        input = input.replace(/([0-9])(th|rd|st|nd)/, "$1");
        input = Number(input);
        if (isNaN(input)) {
          console.warn("Spacetime: Invalid millenium input");
          return this;
        }
      }
      if (input > 0) {
        input -= 1;
      }
      let year2 = input * 1e3;
      if (year2 === 0) {
        year2 = 1;
      }
      return this.year(year2);
    }
    let num = Math.floor(this.year() / 1e3);
    if (num >= 0) {
      num += 1;
    }
    return num;
  }
};
var year_default = methods4;

// ../../../node_modules/spacetime/src/methods/query/index.js
var methods5 = Object.assign({}, time_default, date_default, year_default);
methods5.milliseconds = methods5.millisecond;
methods5.seconds = methods5.second;
methods5.minutes = methods5.minute;
methods5.hours = methods5.hour;
methods5.hour24 = methods5.hour;
methods5.h12 = methods5.hour12;
methods5.h24 = methods5.hour24;
methods5.days = methods5.day;
var addMethods = (Space) => {
  Object.keys(methods5).forEach((k) => {
    Space.prototype[k] = methods5[k];
  });
};
var query_default = addMethods;

// ../../../node_modules/spacetime/src/methods/set/_model.js
var getMonthLength = function(month2, year2) {
  if (month2 === 1 && isLeapYear(year2)) {
    return 29;
  }
  return monthLengths_default[month2];
};
var rollMonth = (want, old) => {
  if (want.month > 0) {
    let years = parseInt(want.month / 12, 10);
    want.year = old.year() + years;
    want.month = want.month % 12;
  } else if (want.month < 0) {
    let m = Math.abs(want.month);
    let years = parseInt(m / 12, 10);
    if (m % 12 !== 0) {
      years += 1;
    }
    want.year = old.year() - years;
    want.month = want.month % 12;
    want.month = want.month + 12;
    if (want.month === 12) {
      want.month = 0;
    }
  }
  return want;
};
var rollDaysDown = (want, old, sum) => {
  want.year = old.year();
  want.month = old.month();
  let date2 = old.date();
  want.date = date2 - Math.abs(sum);
  while (want.date < 1) {
    want.month -= 1;
    if (want.month < 0) {
      want.month = 11;
      want.year -= 1;
    }
    let max = getMonthLength(want.month, want.year);
    want.date += max;
  }
  return want;
};
var rollDaysUp = (want, old, sum) => {
  let year2 = old.year();
  let month2 = old.month();
  let max = getMonthLength(month2, year2);
  while (sum > max) {
    sum -= max;
    month2 += 1;
    if (month2 >= 12) {
      month2 -= 12;
      year2 += 1;
    }
    max = getMonthLength(month2, year2);
  }
  want.month = month2;
  want.date = sum;
  return want;
};
var months2 = rollMonth;
var days = rollDaysUp;
var daysBack = rollDaysDown;

// ../../../node_modules/spacetime/src/methods/add.js
var order2 = ["millisecond", "second", "minute", "hour", "date", "month"];
var keep = {
  second: order2.slice(0, 1),
  minute: order2.slice(0, 2),
  quarterhour: order2.slice(0, 2),
  hour: order2.slice(0, 3),
  date: order2.slice(0, 4),
  month: order2.slice(0, 4),
  quarter: order2.slice(0, 4),
  season: order2.slice(0, 4),
  year: order2,
  decade: order2,
  century: order2
};
keep.week = keep.hour;
keep.season = keep.date;
keep.quarter = keep.date;
var dstAwareUnits = {
  year: true,
  quarter: true,
  season: true,
  month: true,
  week: true,
  date: true
};
var keepDate = {
  month: true,
  quarter: true,
  season: true,
  year: true
};
var addMethods2 = (SpaceTime2) => {
  SpaceTime2.prototype.add = function(num, unit) {
    let s = this.clone();
    if (!unit || num === 0) {
      return s;
    }
    let old = this.clone();
    unit = normalize2(unit);
    if (unit === "millisecond") {
      s.epoch += num;
      return s;
    }
    if (unit === "fortnight") {
      num *= 2;
      unit = "week";
    }
    if (milliseconds_default[unit]) {
      s.epoch += milliseconds_default[unit] * num;
    } else if (unit === "week" || unit === "weekend") {
      s.epoch += milliseconds_default.day * (num * 7);
    } else if (unit === "quarter" || unit === "season") {
      s.epoch += milliseconds_default.month * (num * 3);
    } else if (unit === "quarterhour") {
      s.epoch += milliseconds_default.minute * 15 * num;
    }
    let want = {};
    if (keep[unit]) {
      keep[unit].forEach((u) => {
        want[u] = old[u]();
      });
    }
    if (dstAwareUnits[unit]) {
      const diff2 = old.timezone().current.offset - s.timezone().current.offset;
      s.epoch += diff2 * 3600 * 1e3;
    }
    if (unit === "month") {
      want.month = old.month() + num;
      want = months2(want, old);
    }
    if (unit === "week") {
      let sum = old.date() + num * 7;
      if (sum <= 28 && sum > 1) {
        want.date = sum;
      }
    }
    if (unit === "weekend" && s.dayName() !== "saturday") {
      s = s.day("saturday", true);
    } else if (unit === "date") {
      if (num < 0) {
        want = daysBack(want, old, num);
      } else {
        let sum = old.date() + num;
        want = days(want, old, sum);
      }
      if (num !== 0 && old.isSame(s, "day")) {
        want.date = old.date() + num;
      }
    } else if (unit === "quarter") {
      want.month = old.month() + num * 3;
      want.year = old.year();
      if (want.month < 0) {
        let years = Math.floor(want.month / 12);
        let remainder = want.month + Math.abs(years) * 12;
        want.month = remainder;
        want.year += years;
      } else if (want.month >= 12) {
        let years = Math.floor(want.month / 12);
        want.month = want.month % 12;
        want.year += years;
      }
      want.date = old.date();
    } else if (unit === "year") {
      let wantYear = old.year() + num;
      let haveYear = s.year();
      if (haveYear < wantYear) {
        let toAdd = Math.floor(num / 4) || 1;
        s.epoch += Math.abs(milliseconds_default.day * toAdd);
      } else if (haveYear > wantYear) {
        let toAdd = Math.floor(num / 4) || 1;
        s.epoch += milliseconds_default.day * toAdd;
      }
    } else if (unit === "decade") {
      want.year = s.year() + 10;
    } else if (unit === "century") {
      want.year = s.year() + 100;
    }
    if (keepDate[unit]) {
      let max = monthLengths_default[want.month];
      want.date = old.date();
      if (want.date > max) {
        want.date = max;
      }
    }
    if (Object.keys(want).length > 1) {
      walk_default(s, want);
    }
    return s;
  };
  SpaceTime2.prototype.subtract = function(num, unit) {
    let s = this.clone();
    return s.add(num * -1, unit);
  };
  SpaceTime2.prototype.minus = SpaceTime2.prototype.subtract;
  SpaceTime2.prototype.plus = SpaceTime2.prototype.add;
};
var add_default = addMethods2;

// ../../../node_modules/spacetime/src/methods/same.js
var print = {
  millisecond: (s) => {
    return s.epoch;
  },
  second: (s) => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join("-");
  },
  minute: (s) => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join("-");
  },
  hour: (s) => {
    return [s.year(), s.month(), s.date(), s.hour()].join("-");
  },
  day: (s) => {
    return [s.year(), s.month(), s.date()].join("-");
  },
  week: (s) => {
    return [s.year(), s.week()].join("-");
  },
  month: (s) => {
    return [s.year(), s.month()].join("-");
  },
  quarter: (s) => {
    return [s.year(), s.quarter()].join("-");
  },
  year: (s) => {
    return s.year();
  }
};
print.date = print.day;
var addMethods3 = (SpaceTime2) => {
  SpaceTime2.prototype.isSame = function(b, unit, tzAware = true) {
    let a = this;
    if (!unit) {
      return null;
    }
    if (typeof b === "string" && typeof unit === "object") {
      let tmp = b;
      b = unit;
      unit = tmp;
    }
    if (typeof b === "string" || typeof b === "number") {
      b = new SpaceTime2(b, this.timezone.name);
    }
    unit = unit.replace(/s$/, "");
    if (tzAware === true && a.tz !== b.tz) {
      b = b.clone();
      b.tz = a.tz;
    }
    if (print[unit]) {
      return print[unit](a) === print[unit](b);
    }
    return null;
  };
};
var same_default = addMethods3;

// ../../../node_modules/spacetime/src/methods/compare.js
var addMethods4 = (SpaceTime2) => {
  const methods6 = {
    isAfter: function(d) {
      d = beADate(d, this);
      let epoch = getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch > epoch;
    },
    isBefore: function(d) {
      d = beADate(d, this);
      let epoch = getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch < epoch;
    },
    isEqual: function(d) {
      d = beADate(d, this);
      let epoch = getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch === epoch;
    },
    isBetween: function(start, end, isInclusive = false) {
      start = beADate(start, this);
      end = beADate(end, this);
      let startEpoch = getEpoch(start);
      if (startEpoch === null) {
        return null;
      }
      let endEpoch = getEpoch(end);
      if (endEpoch === null) {
        return null;
      }
      if (isInclusive) {
        return this.isBetween(start, end) || this.isEqual(start) || this.isEqual(end);
      }
      return startEpoch < this.epoch && this.epoch < endEpoch;
    }
  };
  Object.keys(methods6).forEach((k) => {
    SpaceTime2.prototype[k] = methods6[k];
  });
};
var compare_default = addMethods4;

// ../../../node_modules/spacetime/src/methods/i18n.js
var addMethods5 = (SpaceTime2) => {
  const methods6 = {
    i18n: function(data) {
      if (isObject(data.days)) {
        set2(data.days);
      }
      if (isObject(data.months)) {
        set(data.months);
      }
      if (isBoolean(data.useTitleCase)) {
        set3(data.useTitleCase);
      }
      if (isObject(data.ampm)) {
        set6(data.ampm);
      }
      if (isObject(data.distance)) {
        set5(data.distance);
      }
      if (isObject(data.units)) {
        set4(data.units);
      }
      return this;
    }
  };
  Object.keys(methods6).forEach((k) => {
    SpaceTime2.prototype[k] = methods6[k];
  });
};
var i18n_default = addMethods5;

// ../../../node_modules/spacetime/src/spacetime.js
var timezones = unpack_default;
var SpaceTime = function(input, tz, options = {}) {
  this.epoch = null;
  this.tz = find_default(tz, timezones);
  this.silent = typeof options.silent !== "undefined" ? options.silent : true;
  this.british = options.dmy || options.british;
  this._weekStart = 1;
  if (options.weekStart !== void 0) {
    this._weekStart = options.weekStart;
  }
  this._today = {};
  if (options.today !== void 0) {
    this._today = options.today;
  }
  Object.defineProperty(this, "d", {
    get: function() {
      let offset = quick_default(this);
      let bias = new Date(this.epoch).getTimezoneOffset() || 0;
      let shift = bias + offset * 60;
      shift = shift * 60 * 1e3;
      let epoch = this.epoch + shift;
      let d = new Date(epoch);
      return d;
    }
  });
  Object.defineProperty(this, "timezones", {
    get: () => timezones,
    set: (obj) => {
      timezones = obj;
      return obj;
    }
  });
  let tmp = input_default(this, input);
  this.epoch = tmp.epoch;
};
Object.keys(methods_default).forEach((k) => {
  SpaceTime.prototype[k] = methods_default[k];
});
SpaceTime.prototype.clone = function() {
  return new SpaceTime(this.epoch, this.tz, {
    silent: this.silent,
    weekStart: this._weekStart,
    today: this._today,
    parsers: this.parsers
  });
};
SpaceTime.prototype.toLocalDate = function() {
  return this.toNativeDate();
};
SpaceTime.prototype.toNativeDate = function() {
  return new Date(this.epoch);
};
query_default(SpaceTime);
add_default(SpaceTime);
same_default(SpaceTime);
compare_default(SpaceTime);
i18n_default(SpaceTime);
var spacetime_default = SpaceTime;

// ../../../node_modules/spacetime/src/whereIts.js
var whereIts = (a, b) => {
  let start = new spacetime_default(null);
  let end = new spacetime_default(null);
  start = start.time(a);
  if (b) {
    end = end.time(b);
  } else {
    end = start.add(59, "minutes");
  }
  let startHour = start.hour();
  let endHour = end.hour();
  let tzs = Object.keys(start.timezones).filter((tz) => {
    if (tz.indexOf("/") === -1) {
      return false;
    }
    let m = new spacetime_default(null, tz);
    let hour = m.hour();
    if (hour >= startHour && hour <= endHour) {
      if (hour === startHour && m.minute() < start.minute()) {
        return false;
      }
      if (hour === endHour && m.minute() > end.minute()) {
        return false;
      }
      return true;
    }
    return false;
  });
  return tzs;
};
var whereIts_default = whereIts;

// ../../../node_modules/spacetime/src/_version.js
var version_default = "7.5.0";

// ../../../node_modules/spacetime/src/index.js
var main2 = (input, tz, options) => new spacetime_default(input, tz, options);
var setToday = function(s) {
  let today = s._today || {};
  Object.keys(today).forEach((k) => {
    s = s[k](today[k]);
  });
  return s;
};
main2.now = (tz, options) => {
  let s = new spacetime_default(new Date().getTime(), tz, options);
  s = setToday(s);
  return s;
};
main2.today = (tz, options) => {
  let s = new spacetime_default(new Date().getTime(), tz, options);
  s = setToday(s);
  return s.startOf("day");
};
main2.tomorrow = (tz, options) => {
  let s = new spacetime_default(new Date().getTime(), tz, options);
  s = setToday(s);
  return s.add(1, "day").startOf("day");
};
main2.yesterday = (tz, options) => {
  let s = new spacetime_default(new Date().getTime(), tz, options);
  s = setToday(s);
  return s.subtract(1, "day").startOf("day");
};
main2.extend = function(obj = {}) {
  Object.keys(obj).forEach((k) => {
    spacetime_default.prototype[k] = obj[k];
  });
  return this;
};
main2.timezones = function() {
  let s = new spacetime_default();
  return s.timezones;
};
main2.max = function(tz, options) {
  let s = new spacetime_default(null, tz, options);
  s.epoch = 864e13;
  return s;
};
main2.min = function(tz, options) {
  let s = new spacetime_default(null, tz, options);
  s.epoch = -864e13;
  return s;
};
main2.whereIts = whereIts_default;
main2.version = version_default;
main2.plugin = main2.extend;
var src_default = main2;
export {
  src_default as default
};
//# sourceMappingURL=spacetime.js.map
