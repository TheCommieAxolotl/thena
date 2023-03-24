'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var node_path = require('node:path');
var fs$1 = require('node:fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs$1);

const isNode = () => {
    try {
        return typeof process.versions !== 'undefined';
    }
    catch (e) {
        return true;
    }
};

const fetch = async (url, options = {}) => {
    if (isNode()) {
        throw new Error('fetch is only supported in a browser environment');
    }
    const response = await window.fetch(url, {
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body || null,
    });
    const body = await response.text();
    return {
        bodyUsed: response.bodyUsed,
        headers: response.headers,
        ok: response.ok,
        redirected: response.redirected,
        status: response.status,
        statusText: response.statusText,
        type: response.type,
        url: response.url,
        body: {
            text: () => body,
            json: () => JSON.parse(body),
            html: () => new DOMParser().parseFromString(body, 'text/html'),
        },
    };
};

var http = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fetch: fetch
});

/**
 * thena@0.0.6
 * A browser-safe, simple, lightweight, and fast utility library for JavaScript
 */
const loop = (n, fn) => {
    return new Promise((resolve) => {
        for (let i = 0; i < n; i++) {
            fn(i);
            if (i === n - 1) {
                resolve();
            }
        }
    });
};
const each = (arr, fn) => {
    return new Promise((resolve) => {
        for (let i = 0; i < arr.length; i++) {
            fn(arr[i], i);
            if (i === arr.length - 1) {
                resolve();
            }
        }
    });
};
const num = (n) => {
    switch (typeof n) {
        case 'number':
            return n;
        case 'string': {
            let number;
            if (n.includes(',')) {
                number = Number(n.replace(/,/g, ''));
            }
            else {
                number = Number(n);
            }
            if (isNaN(number)) {
                throw new Error(`Cannot convert '${n}' to number`);
            }
            return number;
        }
        case 'object':
            if (n instanceof Array) {
                return n.reduce((acc, curr) => acc + num(curr), 0);
            }
            return Object.keys(n).length;
        default:
            return 0;
    }
};
var index$1 = {
    loop,
    each,
    num,
    ...http,
};

var browser = /*#__PURE__*/Object.freeze({
    __proto__: null,
    loop: loop,
    each: each,
    num: num,
    'default': index$1,
    fetch: fetch
});

exports.ASCII = void 0;
(function (ASCII) {
    ASCII["reset"] = "\u001B[0m";
    ASCII["bold"] = "\u001B[1m";
    ASCII["dim"] = "\u001B[2m";
    ASCII["underscore"] = "\u001B[4m";
    ASCII["blink"] = "\u001B[5m";
    ASCII["reverse"] = "\u001B[7m";
    ASCII["hidden"] = "\u001B[8m";
    ASCII["black"] = "\u001B[30m";
    ASCII["red"] = "\u001B[31m";
    ASCII["green"] = "\u001B[32m";
    ASCII["yellow"] = "\u001B[33m";
    ASCII["blue"] = "\u001B[34m";
    ASCII["magenta"] = "\u001B[35m";
    ASCII["cyan"] = "\u001B[36m";
    ASCII["white"] = "\u001B[37m";
    ASCII["bg_black"] = "\u001B[40m";
    ASCII["bg_red"] = "\u001B[41m";
    ASCII["bg_grees"] = "\u001B[42m";
    ASCII["bg_yellow"] = "\u001B[43m";
    ASCII["bg_blue"] = "\u001B[44m";
    ASCII["bg_magenta"] = "\u001B[45m";
    ASCII["bg_cyan"] = "\u001B[46m";
    ASCII["bg_white"] = "\u001B[47m";
})(exports.ASCII || (exports.ASCII = {}));
const log = (message, ...colors) => {
    console.log(colors
        .map((color) => {
        if (color.toLowerCase() in exports.ASCII) {
            return exports.ASCII[color.toLowerCase()];
        }
        else {
            return color;
        }
    })
        .join('') +
        message +
        exports.ASCII.reset);
};

var log$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ASCII () { return exports.ASCII; },
    log: log
});

class FileError extends Error {
    cause;
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'FileError';
    }
}
const fileCache = new Map();
const json = (file, encoding = 'utf8') => {
    try {
        if (!fs__default["default"].existsSync(file))
            return {};
        return JSON.parse(fs__default["default"].readFileSync(file, encoding));
    }
    catch (e) {
        throw new FileError(`Could not read file: ${file}`, e);
    }
};
const set = (file, key, value, encoding = 'utf8') => {
    try {
        const data = json(file);
        data[String(key)] = value;
        if (value === null)
            delete data[String(key)];
        fs__default["default"].writeFileSync(file, JSON.stringify(data, null, 4), encoding);
    }
    catch (e) {
        throw new FileError(`Could not write to file: ${file}`, e);
    }
};
const stream = (file, encoding = 'utf8') => {
    let data;
    if (fileCache[file]) {
        data = fileCache[file];
    }
    else {
        data = json(file);
        fileCache[file] = data;
    }
    return new Proxy({}, {
        get: (_, prop) => {
            if (prop === '__filename')
                return file;
            if (prop === '__data')
                return data || json(file, encoding);
            return data[prop] || json(file, encoding)[prop];
        },
        set: (_, prop, value) => {
            data[prop] = value;
            set(file, prop, value, encoding);
            return true;
        },
        deleteProperty(_, prop) {
            delete data[prop];
            set(file, prop, null, encoding);
            return true;
        },
    });
};
const watch = (file, callback) => {
    let macosTimeout = null;
    fs__default["default"].watch(file, (eventType, filename) => {
        if (macosTimeout)
            return;
        macosTimeout = setTimeout(() => {
            macosTimeout = null;
        }, 1000);
        callback(filename, eventType);
    });
};

var fs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json,
    set: set,
    stream: stream,
    watch: watch
});

/**
 * thena/node@0.0.6
 * A simple, lightweight, and fast utility library for Node
 */
const global = {
    get node() {
        return isNode();
    },
    get browser() {
        return !isNode();
    },
    __dirname(meta) {
        return new URL('.', meta.url).pathname;
    },
    __filename(meta) {
        return node_path.basename(new URL(meta.url).pathname);
    },
};
var index = {
    ...browser,
    ...log$1,
    ...fs,
    global,
};

exports["default"] = index;
exports.each = each;
exports.fetch = fetch;
exports.global = global;
exports.json = json;
exports.log = log;
exports.loop = loop;
exports.num = num;
exports.set = set;
exports.stream = stream;
exports.watch = watch;
