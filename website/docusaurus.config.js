module.exports = {
  title: 'ainsley',
  tagline: 'Ainsley is to CSS what Markdown is to HTML',
  url: 'https://tbjgolden.github.io',
  baseUrl: '/ainsley/',
  favicon: 'img/favicon.ico',
  organizationName: 'tbjgolden',
  projectName: 'ainsley',
  themeConfig: {
    navbar: {
      title: '👨🏾‍🍳\xa0\xa0ainsley',
      links: [
        {
          to: 'docs/intro',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left'
        },
        { to: 'docs/api/index', label: 'API', position: 'left' },
        { to: 'repl', label: 'Try It', position: 'left' },
        {
          href: 'https://github.com/tbjgolden/ainsley',
          label: 'GitHub',
          position: 'right'
        }
      ]
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebar'),
          editUrl: 'https://github.com/tbjgolden/ainsley/edit/master/website/'
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/tbjgolden/ainsley/edit/master/website/blog/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
