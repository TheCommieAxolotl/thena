import { defineConfig } from 'vitepress';

const pkj = await import('../../package.json');

export default defineConfig({
    title: 'thena',
    description: 'A simple, lightweight, and fast utility library for Node and the browser.',

    lastUpdated: true,
    cleanUrls: true,
    lang: 'en-US',
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/TheCommieAxolotl/thena/tree/main/docs/:path',
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023 TheCommieAxolotl',
        },
        nav: [
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'API', link: '/guide/api' },
            {
                text: pkj.version,
                items: [
                    { text: 'GitHub Release', link: 'https://github.com/TheCommieAxolotl/thena/releases/latest' },
                    {
                        text: 'View on npm',
                        link: 'https://www.npmjs.com/package/thena/v/latest',
                    },
                ],
            },
        ],
        sidebar: [
            {
                text: 'Guide',
                collapsed: false,
                items: [
                    { text: 'Getting Started', link: '/guide/getting-started' },
                    { text: 'API Reference', link: '/guide/api' },
                ],
            },
        ],
        socialLinks: [{ icon: 'github', link: 'https://github.com/TheCommieAxolotl/thena' }],
    },
});
