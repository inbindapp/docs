---
layout: doc
---

# How to Connect to Next.js Website

Inbind lets you manage content and publish it for use in a Next.js website. Content is delivered via S3-compatible object storage, and your Next.js app fetches it at build time (Static Generation) or on demand (Server Components, API routes, or server actions).

## Prerequisites

- An existing Next.js site set up and ready to render content
- An object storage to store and serve the content from, e.g. AWS S3 or Cloudflare R2. See more at [Object Storages](/object-storages)

## Set up the Connection in Inbind

### Step 1: Create the Connection

1. Go to the **Connections** page in Inbind
2. Click the **+** button to add a new connection
3. Select **Next.js**
4. Provide the credentials for the storage you set up. If you haven't configured your storage yet, follow the setup guide for your provider — see [Object Storage setup guides](/object-storages#setup-guides).
5. Click **Create Connection**

### Step 2: Connect a Collection

1. Select your framework connection
2. Click **+ Connect Collection**
3. Choose the collection you want to publish
4. Select the **published fields** — included in each item's full JSON
5. Select the **index fields** — included in the collection index (used for listing pages, keep it lightweight)
6. Click **Connect Collection**

### Step 3: Note Your URLs

After connecting, open the **Usage Instructions** tab to find your content URLs:

- **Index URL:** `{base-url}/content/{organization-id}/{collection-slug}/_index.json` — Returns all items with index fields
- **Item URL:** `{base-url}/content/{organization-id}/{collection-slug}/{item-slug}.json` — Returns a single item with all published fields

For the exact URLs of your collection, check the app — see [Viewing Usage Instructions](/managing-connections#viewing-usage-instructions).

## Render Content on Your Next.js Site

Below are practical examples of how to use the **Index URL** and **Item URL** in Next.js.

### Listing page (App Router, Server Component)

Fetch all items on the server (recommended):

```jsx
// app/blog/page.js
export default async function BlogIndexPage() {
  const response = await fetch('YOUR_INDEX_URL', {
    // If you want ISR, set a revalidate value:
    // next: { revalidate: 60 },
  });
  const data = await response.json();
  const posts = data.items;

  return (
    <main>
      <h1>Blog</h1>
      {posts.map((post) => (
        <article key={post.slug}>
          <a href={`/blog/${post.slug}`}>
            <h2>{post.title}</h2>
          </a>
        </article>
      ))}
    </main>
  );
}
```

### Detail pages (pre-render all pages with `generateStaticParams`)

Use a dynamic route and generate all pages from the index:

```jsx
// app/blog/[slug]/page.js
export async function generateStaticParams() {
  const response = await fetch('YOUR_INDEX_URL');
  const data = await response.json();

  return data.items.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const response = await fetch(`YOUR_BASE_URL/content/{organization-id}/{collection-slug}/${params.slug}.json`);
  const post = await response.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

For more on data fetching in Next.js, see the [Next.js Data Fetching docs](https://nextjs.org/docs/app/building-your-application/data-fetching).
