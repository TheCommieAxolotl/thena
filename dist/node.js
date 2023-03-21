import fs from 'node:fs';

/**
 * thena@0.0.1
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
        if (!fs.existsSync(file))
            return {};
        return JSON.parse(fs.readFileSync(file, encoding));
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
        fs.writeFileSync(file, JSON.stringify(data, null, 4), encoding);
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

/**
 * thena/node@0.0.1
 * A simple, lightweight, and fast utility library for Node
 */
var index = {
    loop,
    each,
    num,
    json,
    set,
    stream,
};

export { index as default, each, json, loop, num, set, stream };
