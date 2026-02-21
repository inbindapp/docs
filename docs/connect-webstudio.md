---
layout: doc
---

# How to Connect to Webstudio

Inbind can serve as a headless CMS for your [Webstudio](https://webstudio.is/) site. Your content is published as JSON files to S3-compatible storage, and Webstudio fetches them using Resource variables. This gives you the flexibility of Inbind's content management with Webstudio's visual design tools.


## Prerequisites

- A paid plan to hosted Webstudio or self-hosted Webstudio with CMS capabilities enabled
- An object storage to store and serve the content from, e.g. AWS S3 or Cloudflare R2. See more at [Object Storages](/object-storages)

## Setting Up the Connection in Inbind

### Step 1: Create the Connection

1. Go to the **Connections** page in Inbind
2. Click the **+** button to add a new connection
3. Select **Webstudio** from the destination options
4. Provide your S3 or Cloudflare R2 credentials (see [instructions for setting up object storage](/object-storages))
5. Click **Create Connection**

### Step 2: Connect a Collection

1. Select your Webstudio connection
2. Click **+ Connect Collection**
3. Choose the collection you want to use in Webstudio
4. Select the **published fields** — these are included in each item's JSON
5. Select the **index fields** — these are included in the collection index file (used on listing pages, keep it lightweight)
6. Click **Connect Collection**

### Step 3: Get the URLs

After connecting a collection, open the **Usage Instructions** tab to find your content URLs:

- **Index URL:** `{base-url}/content/{organization-id}/{collection-slug}/_index.json` — Returns all items with index fields
- **Item URL:** `{base-url}/content/{organization-id}/{collection-slug}/{item-slug}.json` — Returns a single item with all published fields

For the exact URLs of your collection, check the app — see [Viewing Usage Instructions](/managing-connections#viewing-usage-instructions).

You will need these URLs when setting up Resources in Webstudio.

## Setting Up Webstudio

### Creating a Listing Page

To display a list of items (e.g., a blog index page):

1. Create a new page in Webstudio (e.g., with path `/blog`)
2. Select the **Body** element in the Navigator panel
3. In the Data variables panel, click **+** and select **Resource**
4. Name it (e.g., `allPosts`)
5. Configure the Resource:
    - **URL:** Paste your index URL from Inbind (e.g., `https://your-storage-url/content/org-id/collection-slug/_index.json`)
    - **Method:** GET
6. Add a **Collection** component to your page
7. Bind its **Data** property to the items array from your Resource (e.g., `allPosts.data.items`)
8. Rename the Collection Item variable to something meaningful (e.g., `Post`)
9. Add child components inside the Collection and bind their content:
    - **Link** — Set href to an expression like `/blog/${Post.slug}`
    - **Heading** — Bind text content to `Post.title`
    - **Paragraph** — Bind to `Post.excerpt` or any other index field

### Creating a Dynamic Detail Page

To display individual items based on the URL slug:

1. Create a new page with a dynamic path: `/blog/:slug`

:::info
The `:slug` part defines a URL parameter. When someone visits `/blog/my-post`, the value `my-post` becomes available as `system.params.slug`.
:::

2. Select the **Body** element in the Navigator panel
3. Add a **Resource** variable (e.g., `postData`)
4. Configure the Resource:
    - **URL:** Build the URL using the slug parameter:

      `"https://your-storage-url/content/org-id/collection-slug/"+${system.params.slug}+".json"`

    - **Method:** GET
5. Add components to the page and bind them to the Resource data:
    - **Heading** — Bind text content to `postData.title`
    - **Content Embed** — Bind to `postData.body` (for HTML rich text content)
    - **Image** — Bind src to `postData.image` and alt text accordingly
    - Any other components for your published fields

### Binding Data to Elements

For each element you want to display CMS data in:

1. Select the element on the canvas
2. Open the **Settings** panel
3. Find the property you want to bind (e.g., Text Content, Image src)
4. Click the **+** button to open the Expression Editor
5. Type the name of your Resource variable followed by `.` to drill into the data
6. Select the field slug you want to display

For example, to bind a heading to the title field:

- Select the Heading element
- Click **+** next to Text Content
- Type `postData.title`

### SEO Setup

Since the Resource is defined on the Body element, you can use it in Page Settings:

1. Open **Page Settings** for the dynamic page
2. Bind **Meta Title** to `postData.title`
3. Bind **Meta Description** to `postData.description` (or another suitable field)
4. Bind **Social Image** to `postData.image`

### Handling 404 Pages

When someone visits a URL with a slug that doesn't exist, the Resource will return empty data. To handle this:

1. In Page Settings, set the **Status Code** to an expression: `!postData.title ? 404 : 200`
2. Create two sections on the page — one for content, one for a "Page not found" message
3. Set the **Show** property of the content section to `postData.title` (shows when data exists)
4. Set the **Show** property of the 404 section to `!postData.title` (shows when no data)


## Troubleshooting

### Resource data is empty

- Verify the URL is correct in the Resource configuration. Copy the URL and test it in your browser. You should see JSON data.
- Check that items are **published** in Inbind. Only published items are included in the JSON files.

### Dynamic page shows wrong data

- Make sure the path parameter name in your page path matches what you use in the URL expression. If your page path is `/blog/:slug`, use `system.params.slug`. If you named it `:name`, use `system.params.name`.

:::tip
We recommend always using `:slug` as the parameter name to keep things consistent with Inbind's item slugs.
:::

### Content Embed shows placeholder text

- The Content Embed component requires **HTML** content. Make sure the field you're binding contains HTML (Rich Text fields in Inbind output HTML).
- If your content is in Markdown format, use the **Markdown Embed** component instead.

### Resource requests are slow

- Webstudio executes Resource requests server-side before serving the page. S3/R2-hosted JSON files are typically very fast, but if you experience slowness, consider setting a **Cache Max Age** on the Resource (e.g., 300 seconds).


<NeedHelp />
