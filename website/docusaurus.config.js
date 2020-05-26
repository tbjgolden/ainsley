module.exports = {
  title: 'gocvmmeyaahgakggbjwmcmif',
  tagline: 'rwmgkcxafpdrkuvtfszrfvwv',
  url: 'https://xrdnwftmsmirdshgpfoyocjh.github.io',
  baseUrl: '/gocvmmeyaahgakggbjwmcmif/',
  favicon: 'img/favicon.ico',
  organizationName: 'xrdnwftmsmirdshgpfoyocjh',
  projectName: 'gocvmmeyaahgakggbjwmcmif',
  themeConfig: {
    navbar: {
      title: 'gocvmmeyaahgakggbjwmcmif',
      logo: {
        alt: 'gocvmmeyaahgakggbjwmcmif logo',
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
            'https://github.com/xrdnwftmsmirdshgpfoyocjh/gocvmmeyaahgakggbjwmcmif',
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
                'https://stackoverflow.com/questions/tagged/gocvmmeyaahgakggbjwmcmif'
            }
            /*
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/gocvmmeyaahgakggbjwmcmif',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/gocvmmeyaahgakggbjwmcmif',
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
                'https://github.com/xrdnwftmsmirdshgpfoyocjh/gocvmmeyaahgakggbjwmcmif'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} gocvmmeyaahgakggbjwmcmif (zkhshfmpcvllotfgoigdwyrr). Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebar'),
          editUrl:
            'https://github.com/xrdnwftmsmirdshgpfoyocjh/gocvmmeyaahgakggbjwmcmif/edit/master/website/'
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/xrdnwftmsmirdshgpfoyocjh/gocvmmeyaahgakggbjwmcmif/edit/master/website/blog/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
