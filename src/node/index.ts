/**
 * thena/node@0.0.2
 * A simple, lightweight, and fast utility library for Node
 */

import * as browser from '../browser';
import * as fs from './fs';

export * from '../browser';
export * from './fs';

export default {
    ...browser,
    ...fs,
};
