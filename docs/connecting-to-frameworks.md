---
layout: doc
---

# Connecting to Frameworks

Inbind can publish content as JSON files for static site generators and modern web frameworks. Your content is delivered via S3-compatible storage, and your application fetches it at build time or on request.

This guide covers: **Astro**, **Next.js**, **Nuxt**, and **SvelteKit**.

::: info
The JSON format works with any framework or tool that can fetch files from S3/R2 storage. If your framework isn't listed here, you can still use Inbind — just select any of the available options during setup (the JSON format is identical), and adapt the code examples to your framework's data fetching patterns.
:::

## Setting Up the Connection

### Step 1: Create the Connection

1. Go to the **Connections** page in Inbind
2. Click the **+** button to add a new connection
3. Select your framework (Astro, Next.js, Nuxt, or SvelteKit)
4. Provide your S3 or Cloudflare R2 credentials (see [storage setup](#storage-credentials) below)
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

- **Index URL:** `{base-url}/_index.json` — Returns all items with index fields
- **Item URL:** `{base-url}/{item-slug}.json` — Returns a single item with all published fields

## JSON Response Format

### Index Response (`_index.json`)

```json
{
  "total_items": 3,
  "items": [
    {
      "id": 1,
      "slug": "first-post",
      "name": "First Post",
      "title": "My First Post",
      "created_at": "2025-01-01T12:00:00",
      "updated_at": "2025-01-15T14:30:00"
    },
    ...
  ]
}
```

The index includes only the fields you selected as **index fields** during setup.

### Item Response (`{slug}.json`)

```json
{
  "id": 1,
  "slug": "first-post",
  "name": "First Post",
  "title": "My First Post",
  "content": "<h1>Hello</h1><p>This is my first post.</p>",
  "author": "Jane Doe",
  "created_at": "2025-01-01T12:00:00",
  "updated_at": "2025-01-15T14:30:00",
  "status": "published"
}
```

Individual items include all **published fields** plus metadata.

## Framework Integration

:::tabs
== Astro

### Listing Page

Fetch all items at build time in your page frontmatter:

```astro
---
// src/pages/blog/index.astro
const response = await fetch('YOUR_INDEX_URL');
const data = await response.json();
const posts = data.items;
---

<h1>Blog</h1>
{posts.map(post => (
  <article>
    <a href={`/blog/${post.slug}`}>
      <h2>{post.title}</h2>
    </a>
  </article>
))}
```

### Detail Page

Fetch a single item using the URL slug:

```astro
---
// src/pages/blog/[slug].astro
const { slug } = Astro.params;
const response = await fetch(`YOUR_BASE_URL/${slug}.json`);
const post = await response.json();
---

<article>
  <h1>{post.title}</h1>
  <Fragment set:html={post.content} />
</article>
```

### Generate Static Paths

To pre-render all pages at build time:

```astro
---
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const response = await fetch('YOUR_INDEX_URL');
  const data = await response.json();

  return data.items.map(post => ({
    params: { slug: post.slug },
  }));
}

const { slug } = Astro.params;
const response = await fetch(`YOUR_BASE_URL/${slug}.json`);
const post = await response.json();
---

<article>
  <h1>{post.title}</h1>
  <Fragment set:html={post.content} />
</article>
```

For more on data fetching in Astro, see the [Astro Data Fetching docs](https://docs.astro.build/en/guides/data-fetching/).

== Next.js

### Listing Page

Use Server Components to fetch your content:

```tsx
// app/blog/page.tsx
export default async function BlogPage() {
  const response = await fetch('YOUR_INDEX_URL');
  const data = await response.json();
  const posts = data.items;

  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <article key={post.slug}>
          <a href={`/blog/${post.slug}`}>
            <h2>{post.title}</h2>
          </a>
        </article>
      ))}
    </div>
  );
}
```

### Detail Page

Fetch a single item using the route parameter:

```tsx
// app/blog/[slug]/page.tsx
export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const response = await fetch(
    `YOUR_BASE_URL/${params.slug}.json`
  );
  const post = await response.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### Static Generation

To pre-render pages at build time, add `generateStaticParams`:

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const response = await fetch('YOUR_INDEX_URL');
  const data = await response.json();

  return data.items.map(post => ({
    slug: post.slug,
  }));
}
```

For more on data fetching in Next.js, see the [Next.js Data Fetching docs](https://nextjs.org/docs/app/building-your-application/data-fetching).

== Nuxt

### Listing Page

Use the `useFetch` composable to load content:

```vue
<!-- pages/blog/index.vue -->
<script setup>
const { data } = await useFetch('YOUR_INDEX_URL');
const posts = computed(() => data.value?.items || []);
</script>

<template>
  <h1>Blog</h1>
  <article v-for="post in posts" :key="post.slug">
    <NuxtLink :to="`/blog/${post.slug}`">
      <h2>{{ post.title }}</h2>
    </NuxtLink>
  </article>
</template>
```

### Detail Page

Fetch a single item using the route parameter:

```vue
<!-- pages/blog/[slug].vue -->
<script setup>
const route = useRoute();
const { data: post } = await useFetch(
  `YOUR_BASE_URL/${route.params.slug}.json`
);
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <div v-html="post.content" />
  </article>
</template>
```

For more on data fetching in Nuxt, see the [Nuxt Data Fetching docs](https://nuxt.com/docs/getting-started/data-fetching).

== SvelteKit

### Listing Page

Use load functions to fetch content:

```javascript
// src/routes/blog/+page.js
export async function load({ fetch }) {
  const response = await fetch('YOUR_INDEX_URL');
  const data = await response.json();

  return { posts: data.items };
}
```

```svelte
<!-- src/routes/blog/+page.svelte -->
<script>
  export let data;
</script>

<h1>Blog</h1>
{#each data.posts as post}
  <article>
    <a href="/blog/{post.slug}">
      <h2>{post.title}</h2>
    </a>
  </article>
{/each}
```

### Detail Page

Fetch a single item using the route parameter:

```javascript
// src/routes/blog/[slug]/+page.js
export async function load({ fetch, params }) {
  const response = await fetch(
    `YOUR_BASE_URL/${params.slug}.json`
  );
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
  {@html data.post.content}
</article>
```

### Pre-rendering

To generate static pages at build time, add a `+page.server.js` with `entries`:

```javascript
// src/routes/blog/[slug]/+page.server.js
export async function entries() {
  const response = await fetch('YOUR_INDEX_URL');
  const data = await response.json();

  return data.items.map(post => ({
    slug: post.slug,
  }));
}

export const prerender = true;
```

For more on data loading in SvelteKit, see the [SvelteKit Loading docs](https://kit.svelte.dev/docs/load).
:::

## Storage Credentials

When creating a framework connection, you need to provide credentials for your S3-compatible storage:

:::tabs
== Amazon S3

| Field | Value |
| --- | --- |
| Bucket Name | Your S3 bucket name |
| Region | Your bucket's AWS region (e.g., `us-east-1`) |
| Access Key ID | Your AWS access key |
| Secret Access Key | Your AWS secret key |
| Public URL | Your CloudFront distribution URL or S3 public URL |

Make sure your bucket allows public read access (via a bucket policy or CloudFront) so your application can fetch the JSON files.

== Cloudflare R2

| Field | Value |
| --- | --- |
| Bucket Name | Your R2 bucket name |
| Region | `auto` |
| Access Key ID | Your R2 API token access key |
| Secret Access Key | Your R2 API token secret key |
| Custom Endpoint URL | `https://<account-id>.r2.cloudflarestorage.com` |
| Public URL | Your R2 public bucket URL (e.g., `https://pub-xxx.r2.dev` or a custom domain) |

To get your R2 credentials:
1. Go to your Cloudflare dashboard
2. Navigate to **R2 Object Storage**
3. Click **Manage R2 API Tokens**
4. Create a token with **Object Read & Write** permissions for your bucket
:::

The **Public URL** is required for your application to fetch the content. This is the base URL that your framework will use in fetch requests.

::: info Need help?
Email us at [hey@inbind.app](mailto:hey@inbind.app) if you have any questions about setting up your framework connection.
:::
