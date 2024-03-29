module.exports = {
  // 站点配置
  lang: 'zh-CN',
  base: '/v-render/',
  title: 'v-render',
  description: '基于`vue2.0`的中后台解决方案',

  plugins: ['demo-container'],

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    displayAllHeaders: true,
    logo: 'https://vuejs.org/images/logo.png',
    nav: [
      {
        text: '指南',
        link: '/guide/'
      },
      {
        text: 'render-form',
        link: '/render-form/'
      },
      {
        text: 'render-table',
        link: '/render-table/'
      },
      {
        text: 'generator',
        link: '/generator/'
      }
    ],
    sidebar: {
      '/render-form/': [
        '',
        'common',
        'field',
        'watcher',
        'base-comp',
        'advanced',
        'customize'
      ]
    }
  },
}