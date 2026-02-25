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
    logo: {src: 'favicon.ico', alt: 'Inbind Logo'},

    sidebar: [
      {
        text: 'Articles',
        items: [
          { text: 'Get Started', link: '/index' },
          { text: 'Managing Content', link: '/managing-content' },
          { text: 'Creating & Editing Content', link: '/creating-content' },
          { text: 'Blocks', link: '/blocks' },
          { text: 'Publishing Content', link: '/publishing-content' },
          { text: 'Edit Fields', link: '/edit-fields' },
          { text: 'Managing Connections', link: '/managing-connections', items: [
            { text: 'Connect to Webflow', link: '/connect-webflow' },
            { text: 'Connect to Webstudio', link: '/connect-webstudio' },
            { text: 'Connect to Astro', link: '/connect-astro' },
            { text: 'Connect to Next.js', link: '/connect-nextjs' },
            { text: 'Connect to Nuxt', link: '/connect-nuxt' },
            { text: 'Connect to SvelteKit', link: '/connect-sveltekit' },
          ]},
          { text: 'Object Storages', link: '/object-storages', items: [
            { text: 'Setting up Amazon S3', link: '/setup-amazon-s3' },
            { text: 'Setting up Cloudflare R2', link: '/setup-cloudflare-r2' },
          ]},
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Troubleshooting Guide', link: '/troubleshooting-guide' },
          { text: 'How to Style Inbind Tables', link: '/styling-tables-guide' }
        ]
      }
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
