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

```ts
import { loop } from 'thena';

loop(20, () => {
  console.log('Hello, World!');
});
```

#### `thena.each`

Call a given function for each item in an array-like object.

::: tip
Any object which implements the `obj.length` property will work.
:::

```ts
import { each } from 'thena';

each([1, 2, 3, 4, 5], (item, index) => {
  console.log(`Hello, ${item}!`);
});
```

#### `thena.num`

Convert *a lot of things* to a number.

```ts
import { num } from 'thena';

num('1'); // 1

num('1,500'); // 1500

num(['1', '2', '3']); // 6
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

const data = json('./data.json');
```

#### `thena.set`

Set a key in a JSON file.

```ts
import { set } from 'thena/node';

set('./data.json', 'key', 'value');
```

#### `thena.stream`

Create a 'stream' of data to and from a file.

::: info
The proxy returned from this method includes two extra properties: `__filename` and `__data`. These properties respectively contain the filename and the full parsed JSON data.
:::

```ts
import { stream } from 'thena/node';

const data = stream('./data.json');

console.log(data.__filename) // '/thena-example/data.json'
console.log(data.__data); // { key: 'value' }
console.log(data.key); // 'value'
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