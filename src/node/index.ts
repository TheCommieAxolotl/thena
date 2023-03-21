/**
 * thena/node@0.0.1
 * A simple, lightweight, and fast utility library for Node
 */

import { loop, each, num } from '../browser';
import { json, set, stream } from './fs';

export * from '../browser';
export * from './fs';

export default {
    loop,
    each,
    num,
    json,
    set,
    stream,
};
