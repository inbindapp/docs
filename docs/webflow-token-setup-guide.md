---
layout: doc
---
# How to Set up Your Webflow API Token

## What is the Webflow API token needed for?

Inbind communicates with Webflow’s APIs using an API token. An API token is a secure way of providing Inbind with access to only specific resources within your Webflow site. Inbind uses the APIs to retrieve collection items, to create and update collection items and to upload assets such as images, documents or video to your Webflow asset manager.

Inbind needs to following accesses to your Webflow project:

| Resource | Access level | Reason |
| --- | --- | --- |
| Assets | Read & Write | To retrieve, update, and create images in the asset manager. |
| CMS | Read & Write | To retrieve, update, and create collection items; retrieve information about collections. |
| Sites | Read & Write | To retrieve information about the site Inbind connected to, and create webhooks. |

## Setting up the API token

To set up a new API token, follow these steps:

### In Webflow

1. Open Webflow dashboard
    1.1 Alternatively navigate directly to https://webflow.com/dashboard/sites/YOUR-WEBFLOW-SITE/integrations by replacing in your Webflow site
2. Hover over the site you would like to add Inbind to and click on the ⚙️ icon on the top right
3. Go to **Apps & integrations** from the left menu
4. Scroll to **API access**
5. Click **Generate API token**
6. Enter a **name** for your API token (for example *Inbind*)
7. Select **Read & write** permissions for **Assets, CMS, and Sites**
8. Click **Generate token**
9. Copy the token

### In Inbind

1. Open the organization settings from the top right corner by clicking on the ⚙️ icon
2. Open the Webflow API key section
3. Paste the copied token into the field API key field
4. Save Changes

Your collections will be synced to Inbind automatically. 
If you do not see collections or fields, you can trigger a manual sync to retrieve the data from Webflow in the organization settings.