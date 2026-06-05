import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/vitepress-theme-sunoaki/',
  title: 'VitePress Theme Sunoaki',
  description: 'A calm VitePress theme demo',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Guide', link: '/guide' }
        ]
      }
    ],
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: {
              title: 4,
              text: 2,
              titles: 1
            }
          }
        }
      }
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    }
  }
});
