module.exports = {
  // 站点配置
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',

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
        text: 'v-editor',
        link: '/v-editor/'
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