# thena
[![Open Bundle](https://bundlejs.com/badge-dark.svg)](https://bundlejs.com/?q=thena) 

A simple, lightweight, and fast utility library for Node and the browser.

```ts
import thena from 'thena'; // includes only browser-safe functions
import node from 'thena/node'; // includes both browser-safe and node-only functions

// replace
for (let i = 0; i < 10; i++) {
  console.log(i);
}

const pkj = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkj.dependencies.thena = '^1.0.0';

fs.writeFileSync('package.json', JSON.stringify(pkj, null, 2));

// with
th.loop(10, () => {
    console.log(i);
})

const pkj = thena.stream('package.json')

pkj.dependencies.thena = '^1.0.0';
```

## Utilities

### `thena`
- `each` - Iterates over an array or object and calls a function for each item.
- `loop` - Loops a function a specified number of times.
- `num` - Converts strings, arrays, and objects to numbers.

### `thena/node`
*everything from `thena`*

- `json` - Reads and parses a JSON file.
- `set` - Sets a value in a JSON file.
- `stream` - Read a JSON file and return a proxy that can be used to read and write to the file

