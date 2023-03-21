import { defineConfig } from 'rollup';

import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default defineConfig([
    {
        input: 'src/browser/index.ts',
        output: {
            file: 'dist/index.js',
            format: 'esm',
        },
        plugins: [
            nodeResolve({
                exportConditions: ['node'],
            }),
            typescript(),
        ],
    },
    {
        input: 'src/node/index.ts',
        output: {
            file: 'dist/node.js',
            format: 'esm',
        },
        plugins: [
            nodeResolve({
                exportConditions: ['node'],
            }),
            typescript(),
        ],
    },
]);
