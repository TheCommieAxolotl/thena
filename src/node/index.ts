/**
 * thena/node@0.0.6
 * A simple, lightweight, and fast utility library for Node
 */

import * as browser from '../browser';
import * as log from './log';
import * as fs from './fs';

export * from '../browser';
export * from './log';
export * from './fs';

export default {
    ...browser,
    ...log,
    ...fs,
};
