import { defineConfig } from 'rollup';

import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const baseConfig = defineConfig({
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
});

const nodeConfig = defineConfig({
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
});

export default defineConfig([
    {
        ...baseConfig,
    },
    {
        ...baseConfig,
        output: {
            file: 'dist/index.cjs',
            format: 'cjs',
        },
    },
    {
        ...nodeConfig,
    },
    {
        ...nodeConfig,
        output: {
            file: 'dist/node.cjs',
            format: 'cjs',
        },
    },
]);
