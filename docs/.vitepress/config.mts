import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Inbind Docs",
  description: "Inbind documentation and support materials",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    sidebar: [
      {
        text: 'Articles',
        items: [
          { text: 'Get Started', link: '/get-started' },
          { text: 'Managing Content', link: '/managing-content' },
          { text: 'Creating & Editing Content', link: '/creating-content' },
          { text: 'Publishing Content', link: '/publishing-content' },
          { text: 'Edit Fields', link: '/edit-fields' },
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