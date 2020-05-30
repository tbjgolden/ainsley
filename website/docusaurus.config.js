module.exports = {
  title: 'ainsley',
  tagline: '👨🏾‍🍳 Ainsley is to CSS what Markdown is to HTML',
  url: 'https://tbjgolden.github.io',
  baseUrl: '/ainsley/',
  favicon: 'img/favicon.ico',
  organizationName: 'tbjgolden',
  projectName: 'ainsley',
  themeConfig: {
    navbar: {
      title: 'ainsley',
      logo: {
        alt: 'ainsley logo',
        src: 'img/logo.svg'
      },
      links: [
        {
          to: 'docs/doc1',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left'
        },
        { to: 'docs/api/index', label: 'API', position: 'left' },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href:
            'https://github.com/tbjgolden/ainsley',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1'
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href:
                'https://stackoverflow.com/questions/tagged/ainsley'
            }
            /*
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/ainsley',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/ainsley',
            },
            */
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog'
            },
            {
              label: 'GitHub',
              href:
                'https://github.com/tbjgolden/ainsley'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ainsley (Tom Golden). Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebar'),
          editUrl:
            'https://github.com/tbjgolden/ainsley/edit/master/website/'
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
