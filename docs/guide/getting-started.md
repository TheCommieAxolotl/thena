---
outline: deep
---

# Getting Started with thena

This page will go through the basics of thena and show examples of some of it's more useful utilities.

## Installation

thena can be installed using npm, pnpm or yarn:

::: code-group
```sh [npm]
npm install thena --save-dev
```
```sh [pnpm]
pnpm add thena -D
```
```sh [yarn]
yarn add thena -D
```
:::

## Usage

thena can be used in Node.js or the browser. It can be used with ES6 modules or CommonJS modules.

### ES6 Modules
```ts
import thena from 'thena';
// OR
import * as thena from 'thena';
// OR, only import the methods you need
import { loop } from 'thena';
```

### CommonJS Modules
```ts
const thena = require('thena');
// OR, only require the methods you need
const { loop } = require('thena');
```

## Finishing Up

That's it! You're now ready to use thena in your projects. If you have any questions, feel free to [open an issue](https://github.com/TheCommieAxolotl/thena/issues/new).