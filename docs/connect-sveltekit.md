---
layout: doc
---

# How to Connect to SvelteKit Website

Inbind lets you manage content and publish it for use in a SvelteKit website. Content is delivered via S3-compatible object storage, and your SvelteKit app fetches it at build time (prerendering) or on demand (SSR).

## Prerequisites

- An existing SvelteKit site set up and ready to render content
- An object storage to store and serve the content from, e.g. AWS S3 or Cloudflare R2. See more at [Object Storages](/object-storages)

## Set up the Connection in Inbind

### Step 1: Create the Connection

1. Go to the **Connections** page in Inbind
2. Click the **+** button to add a new connection
3. Select **SvelteKit**
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

## Render Content on Your SvelteKit Site

Below are practical examples of how to use the **Index URL** and **Item URL** in SvelteKit.

### Listing page (load data on the server)

Use a `+page.server.js` loader:

```js
// src/routes/blog/+page.server.js
export async function load({ fetch }) {
  const response = await fetch('YOUR_INDEX_URL');
  const data = await response.json();

  return {
    posts: data.items,
  };
}
```

```svelte
<!-- src/routes/blog/+page.svelte -->
<script>
  export let data;
</script>

<h1>Blog</h1>
{#each data.posts as post (post.slug)}
  <article>
    <a href={`/blog/${post.slug}`}>
      <h2>{post.title}</h2>
    </a>
  </article>
{/each}
```

### Detail pages (dynamic route)

Fetch the item JSON using the route params:

```js
// src/routes/blog/[slug]/+page.server.js
export async function load({ params, fetch }) {
  const response = await fetch(`YOUR_BASE_URL/content/{organization-id}/{collection-slug}/${params.slug}.json`);
  const post = await response.json();

  return { post };
}
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<article>
  <h1>{data.post.title}</h1>
  <div>{@html data.post.content}</div>
</article>
```

For more on data loading in SvelteKit, see the [SvelteKit Load docs](https://kit.svelte.dev/docs/load).

<NeedHelp />
