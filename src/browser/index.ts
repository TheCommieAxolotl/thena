/**
 * thena@0.0.10
 * A browser-safe, simple, lightweight, and fast utility library for JavaScript
 */

import * as structs from './structs';
import * as http from './http';
import * as dom from './dom';

export * from './structs';
export * from './http';
export * from './dom';

export default {
    ...structs,
    ...http,
    ...dom,
};
