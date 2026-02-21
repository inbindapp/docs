---
layout: doc
---

# How to Connect to Nuxt Website

Inbind lets you manage content and publish it for use in a Nuxt website. Content is delivered via S3-compatible object storage, and your Nuxt app fetches it at build time (SSG) or on demand (SSR).

## Prerequisites

- An existing Nuxt site set up and ready to render content
- An object storage to store and serve the content from, e.g. AWS S3 or Cloudflare R2. See more at [Object Storages](/object-storages)

## Set up the Connection in Inbind

### Step 1: Create the Connection

1. Go to the **Connections** page in Inbind
2. Click the **+** button to add a new connection
3. Select **Nuxt**
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

## Render Content on Your Nuxt Site

Below are practical examples of how to use the **Index URL** and **Item URL** in Nuxt.

### Listing page (fetch from the server)

Use `useFetch` to load the index (works in SSR and SSG):

```vue
<!-- pages/blog/index.vue -->
<script setup>
const { data } = await useFetch('YOUR_INDEX_URL');
const posts = computed(() => data.value?.items ?? []);
</script>

<template>
  <main>
    <h1>Blog</h1>
    <article v-for="post in posts" :key="post.slug">
      <NuxtLink :to="`/blog/${post.slug}`">
        <h2>{{ post.title }}</h2>
      </NuxtLink>
    </article>
  </main>
</template>
```

### Detail pages (dynamic route)

Fetch the item JSON using the slug from the route params:

```vue
<!-- pages/blog/[slug].vue -->
<script setup>
const route = useRoute();
const slug = route.params.slug;

const { data: post } = await useFetch(() => `YOUR_BASE_URL/content/{organization-id}/{collection-slug}/${slug}.json`);
</script>

<template>
  <article>
    <h1>{{ post?.title }}</h1>
    <div v-html="post?.content" />
  </article>
</template>
```

For more on data fetching in Nuxt, see the [Nuxt Data Fetching docs](https://nuxt.com/docs/getting-started/data-fetching).
