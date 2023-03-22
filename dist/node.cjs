'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs$1 = require('node:fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs$1);

const isNode = () => {
    return typeof window.process?.versions !== 'undefined';
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
 * thena@0.0.4
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
            if (n instanceof Array)
                return n.length;
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

var fs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json,
    set: set,
    stream: stream
});

/**
 * thena/node@0.0.4
 * A simple, lightweight, and fast utility library for Node
 */
var index = {
    ...browser,
    ...fs,
};

exports["default"] = index;
exports.each = each;
exports.fetch = fetch;
exports.json = json;
exports.loop = loop;
exports.num = num;
exports.set = set;
exports.stream = stream;
