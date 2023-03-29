---
outline: deep
---

# API Reference

The following document outlines the browser and node APIs of thena.

## Browser

thena is a browser-safe library by default, the main module (`thena`) exports only browser-safe functions. 

```ts
import thena from 'thena';
```

### Methods

---

#### `thena.loop`

Call a given function a given number of times.

::: tip
This method returns an `await`able promise that resolves when all iterations have been completed.
:::

```ts
import { loop } from 'thena';

export function loop(n: number, fn: (i: number) => void): Promise<void>;

await loop(20, () => {
  console.log('Hello, World!');
});

// Hello, World! x 20
```

#### `thena.each`

Call a given function for each item in an array-like object.

::: tip
Any object which implements the `obj.length` property will work.

This method returns an `await`able promise that resolves when all items have been iterated over.
:::

```ts
import { each } from 'thena';

export function each(arr: any[], fn: (item: any, i: number) => void): Promise<void>;

await each([1, 2, 3, 4, 5], (item, index) => {
  console.log(`Hello, ${item}!`);
});

// Hello, 1, 2 ... 5!
```

#### `thena.num`

Convert *a lot of things* to a number.

```ts
import { num } from 'thena';

export function num(n: number | string | object | any[]): number;

num('1'); // 1

num('1,500'); // 1500

num(['1', '2', '3']); // 6
```

#### `thena.fetch`

Fetch a resource from a given URL.

::: tip
This method does not return a `Response` object with a normal `res.body` property. Instead, the object it returns has `res.text`, `res.json` and `res.html` properties which return the body of the response as a string, JSON object or DOM element respectively.
:::

```ts
import { fetch } from 'thena';

export function fetch(
    url: string,
    options: {
        method?: string;
        headers?: any;
        body?: any;
    }
): Promise<{
    bodyUsed: boolean;
    headers: Headers;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
    body: {
        text: () => string;
        json: () => any;
        html: () => Document;
    };
}>;

const res = await fetch('https://example.com');

console.log(res.body.text()); // <html>...</html>
```

#### `thena.h`

Create a DOM element.

```ts
import { h } from 'thena';

export function h(tag: keyof HTMLElementTagNameMap, props: Record<string, any>, ...children: any[]): HTMLElement;

const div = h('div', { class: 'container' }, 'Hello, World!');

document.body.appendChild(div);
```

## Node

The node.js module (`thena/node`) exports all functions, including those which are not browser-safe.

```ts
import thena from 'thena/node';
```



### File System

thena has a few utilities for working with the file system.

#### `thena.json`

Read a JSON file and parse it.

```ts
import { json } from 'thena/node';

export function json(
    file: string,
    encoding?: BufferEncoding
): {
    [x: string]: any;
};

const data = json('./data.json');
```

#### `thena.set`

Set a key in a JSON file.

```ts
import { set } from 'thena/node';

export function set(file: string, key: string | symbol, value: any, encoding?: BufferEncoding): void;


set('./data.json', 'key', 'value');
```

#### `thena.stream`

Create a 'stream' of data to and from a file.

::: info
The proxy returned from this method includes two extra properties: `__filename` and `__data`. These properties respectively contain the filename and the full parsed JSON data.
:::

```ts
import { stream } from 'thena/node';

export function stream(
    file: string,
    encoding?: BufferEncoding
): {
    [x: string]: any;
    /**
     * __data
     * @description the raw data of the JSON file
     */
    __data: {
        [x: string]: any;
    };
    /**
     * __filename
     * @description the path to the JSON file
     */
    __filename: string;
};

const data = stream('./data.json');

console.log(data.__filename) // '/thena-example/data.json'
console.log(data.__data); // { key: 'value' }
console.log(data.key); // 'value'
```

#### `thena.watch`

Watch a file for changes, with a few improvements.

```ts
import { watch } from 'thena/node';

export function watch(file: string, callback: (file: string, eventType: any) => void): void;

watch('./data.json', (file, eventType) => {
  console.log(`File ${file} was ${eventType}`);
});
```

### Console

thena also has some utilities for logging to the console.

#### `thena.log`

Log a message to the console with given colours and styles.


```ts
import { log, ASCII } from 'thena/node';

log('Hello, World!', 'red', ASCII.bold); // Hello, World! *but in red*
```

Alongside this method, thena exports and ASCII interface that contains some of the most common ASCII escape codes for styling text.

You can either pass the ASCII values or the names of the ASCII values as strings.

```ts
log('this will be red', 'red')
// OR
log('this will also be red', ASCII.red)
```

#### `thena.color`

Colour and style text.

```ts
import { color, ASCII } from 'thena/node';

const red = color('World!', 'red', ASCII.bold); // Hello, World! *but in red*

console.log(`Hello: ${red}`);
```

### Namespaces

thena offers a few namespaces that are useful for working with node.

#### `thena.global`

The `global` namespace contains a few functions and properties that are useful for a number of things in a node environment.

##### `thena.global.__dirname`

The `__dirname` function takes an `import.meta` object and returns the directory name of the file.

```ts
import { global } from 'thena/node';

const __dirname = global.__dirname(import.meta);

console.log(__dirname); // '/thena-example'
```

##### `thena.global.__filename`

The `__filename` function takes an `import.meta` object and returns the file name of the file.

```ts
import { global } from 'thena/node';

const __filename = global.__filename(import.meta);

console.log(__filename); // '/thena-example/index.js'
```

##### `thena.global.node`

The `node` property is a boolean that is `true` if the code is running in a node environment.

```ts
import { global } from 'thena/node';

if (global.node) {
  console.log('Running in node!');
}
```

##### `thena.global.browser`

The `browser` property is a boolean that is `true` if the code is running in a browser environment.

```ts
import { global } from 'thena/node';

if (global.browser) {
  console.log('Running in a browser!');
}
```