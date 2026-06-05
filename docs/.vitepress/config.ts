import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Theme Demo',
  description: 'A demo site for vitepress-theme-sunoaki',
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
