import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Inbind Docs",
  description: "Inbind documentation and support materials",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],
    logo: {src: 'favicon.ico', alt: 'Inbind Logo'},

    sidebar: [
      {
        text: 'Articles',
        items: [
          { text: 'Get Started', link: '/index' },
          { text: 'Managing Content', link: '/managing-content' },
          { text: 'Creating & Editing Content', link: '/creating-content' },
          { text: 'Publishing Content', link: '/publishing-content' },
          { text: 'Edit Fields', link: '/edit-fields' },
        ]
      },
      {
        text: 'Connections',
        items: [
          { text: 'Connections Overview', link: '/connections' },
          { text: 'Connecting to Webflow', link: '/connecting-to-webflow' },
          { text: 'Connecting to Webstudio', link: '/connecting-to-webstudio' },
          { text: 'Connecting to Frameworks', link: '/connecting-to-frameworks' },
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Troubleshooting Guide', link: '/troubleshooting-guide' },
          { text: 'How to Setup Your Webflow API Token', link: '/webflow-token-setup-guide' },
          { text: 'How to Style Inbind Tables in Webflow', link: '/styling-tables-guide' }
        ]
      }
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
