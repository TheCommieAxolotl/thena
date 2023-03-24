/**
 * thena/node@0.0.6
 * A simple, lightweight, and fast utility library for Node
 */

import { basename } from 'node:path';

import { isNode } from '../browser/validate';

import * as browser from '../browser';
import * as log from './log';
import * as fs from './fs';

export * from '../browser';
export * from './log';
export * from './fs';

export const global = {
    get node() {
        return isNode();
    },
    get browser() {
        return !isNode();
    },
    __dirname(meta: ImportMeta) {
        return new URL('.', meta.url).pathname;
    },
    __filename(meta: ImportMeta) {
        return basename(new URL(meta.url).pathname);
    },
};

export default {
    ...browser,
    ...log,
    ...fs,
    global,
};
