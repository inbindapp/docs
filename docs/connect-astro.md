---
layout: doc
---

# How to Connect to Astro Website

Inbind lets you manage content and publish it for use in an Astro website. Content is delivered via S3-compatible object storage, and your Astro site fetches it at build time (or on demand, depending on your setup).

## Prerequisites

- An existing Astro site set up and ready to render content
- An object storage to store and serve the content from, e.g. AWS S3 or Cloudflare R2. See more at [Object Storages](/object-storages)

## Set up the Connection in Inbind

### Step 1: Create the Connection

1. Go to the **Connections** page in Inbind (by clicking a plug icon in the right-top corner)
2. Click the **+** button to add a new connection
3. Select **Astro**
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

- **Index URL** — Returns all items with index fields:

  ```
  {base-url}/content/{organization-id}/{collection-slug}/_index.json
  ```

- **Item URL** — Returns a single item with all published fields:

  ```
  {base-url}/content/{organization-id}/{collection-slug}/{item-slug}.json
  ```

For the exact URLs of your collection, check the app — see [Viewing Usage Instructions](/managing-connections#viewing-usage-instructions).

## Render Content on Your Astro Site

Below are practical examples of how to use the **Index URL** and **Item URL** in Astro.

### Listing page (use the Index URL)

Fetch all items at build time in your page frontmatter:

```astro
---
// src/pages/blog/index.astro
const response = await fetch('YOUR_INDEX_URL');
const data = await response.json();
const posts = data.items;
---

<h1>Blog</h1>
{posts.map((post) => (
  <article>
    <a href={`/blog/${post.slug}`}>
      <h2>{post.title}</h2>
    </a>
  </article>
))}
```

### Detail pages (pre-render all pages at build time)

Use a dynamic route and generate all post pages from the index at build time:

```astro
---
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const response = await fetch('YOUR_INDEX_URL');
  const data = await response.json();

  return data.items.map((post) => ({
    params: { slug: post.slug },
  }));
}

const { slug } = Astro.params;
const response = await fetch(`YOUR_BASE_URL/content/{organization-id}/{collection-slug}/${slug}.json`);
const post = await response.json();
---

<article>
  <h1>{post.title}</h1>
  <Fragment set:html={post.content} />
</article>
```

For more on data fetching in Astro, see the [Astro Data Fetching docs](https://docs.astro.build/en/guides/data-fetching/).

<NeedHelp />
