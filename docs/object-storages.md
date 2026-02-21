---
layout: doc
---

# Object Storages

Inbind publishes your collection content as files (JSON) to an **S3-compatible object storage**. Your website then fetches those files either at build time (static generation) or on request (server rendering).

## Why Inbind uses object storage

- **Simple delivery model:** content becomes plain files (`_index.json`, `{slug}.json`) that any stack can fetch.
- **Scales well:** object storage is built for large numbers of reads and large datasets.
- **Framework-agnostic:** if a tool can fetch from a URL, it can consume Inbind output (Astro, Next.js, Nuxt, SvelteKit, and others).
- **Decoupled from your app:** publishing content does not require your app server to run Inbind.
- **Works with CDNs:** you can put a CDN in front of the bucket and serve content fast globally.

## What you configure

When you create a connection in Inbind, you provide storage credentials and a **Public URL**. That Public URL becomes the base URL for your published content.

You will then see URLs like:

- **Index URL:** `{base-url}/content/{organization-id}/{collection-slug}/_index.json`
- **Item URL:** `{base-url}/content/{organization-id}/{collection-slug}/{item-slug}.json`

The exact URLs for each collection are shown in the **Usage Instructions** tab after connecting a collection — see [Viewing Usage Instructions](/managing-connections#viewing-usage-instructions).

## File format (what gets published)

Inbind publishes your content as **JSON files**.

### Index response (`_index.json`)

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
    }
  ]
}
```

The index includes only the fields you selected as **index fields** during setup.

### Item response (`{item-slug}.json`)

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

## Setup guides

Below are guides for popular object storage services you can use with Inbind.

- [Setting up Amazon S3 for Inbind](/setup-amazon-s3)
- [Setting up Cloudflare R2 for Inbind](/setup-cloudflare-r2)
