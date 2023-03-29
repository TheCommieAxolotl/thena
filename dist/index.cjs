'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var structs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    loop: loop,
    each: each,
    num: num
});

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
        throw new Error('`fetch` is only supported in a browser environment');
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

const h = (tag, props = {}, ...children) => {
    if (isNode()) {
        throw new Error('`h` is only supported in a browser environment');
    }
    const element = document.createElement(tag);
    each(Object.keys(props), (prop) => {
        element[prop] = props[prop];
    });
    each(children, (child) => {
        if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
            element.appendChild(document.createTextNode(String(child)));
        }
        else {
            element.appendChild(child);
        }
    });
    return element;
};

var dom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    h: h
});

/**
 * thena@0.0.10
 * A browser-safe, simple, lightweight, and fast utility library for JavaScript
 */
var index = {
    ...structs,
    ...http,
    ...dom,
};

exports["default"] = index;
exports.each = each;
exports.fetch = fetch;
exports.h = h;
exports.loop = loop;
exports.num = num;
