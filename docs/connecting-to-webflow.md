---
layout: doc
---

# Connecting to Webflow

Inbind integrates directly with Webflow CMS. Content is synced in both directions — changes you make in Inbind are pushed to Webflow, and changes made in Webflow are synced back to Inbind via webhooks.

## Prerequisites

You need a Webflow API token with the correct permissions. See [How to Set up Your Webflow API Token](/webflow-token-setup-guide) for detailed instructions.

Your token needs **Read & Write** access to:

| Resource | Reason |
| --- | --- |
| Assets | To upload and manage images in Webflow's asset manager |
| CMS | To create and update CMS collection items |
| Sites | To retrieve site information and create webhooks |

## Setting Up the Connection

### Step 1: Create the Connection

1. Go to the **Connections** page in Inbind
2. Click the **+** button to add a new connection
3. Select **Webflow** from the destination options
4. Paste your Webflow API token
5. Click **Create Connection**

Inbind will validate your token and retrieve your Webflow site information. If validation succeeds, the connection is created and webhooks are automatically set up for two-way sync.

### Step 2: Connect a Collection

1. Select your Webflow connection from the connections list
2. Click **+ Connect Collection**
3. Choose the collection you want to publish to Webflow
4. Select the fields you want to sync — the **name** and **slug** fields are always required
5. Click **Connect Collection**

Inbind creates a corresponding CMS collection in Webflow with the selected fields and publishes all existing items.

## How Syncing Works

### Inbind to Webflow

When you create, edit, or publish content in Inbind, the changes are automatically pushed to Webflow CMS. Each Inbind item maps to a Webflow CMS item.

### Webflow to Inbind

Inbind creates webhooks on your Webflow site to listen for changes. When a CMS item is created, updated, or deleted in Webflow, the change is synced back to Inbind.

### Status Mapping

| Inbind Status | Webflow Status |
| --- | --- |
| Draft | Draft |
| Published | Published |
| Archived | Archived |

::: info
For published items to appear on your live Webflow site, you still need to **publish your site** in the Webflow Designer. Publishing content in Inbind queues it for the next Webflow site publish.
:::

## Field Type Mapping

Inbind field types are automatically mapped to their Webflow equivalents:

| Inbind Type | Webflow Type |
| --- | --- |
| Text | Plain Text |
| Rich Text | Rich Text |
| Number | Number |
| Date | Date |
| Boolean | Boolean |
| Link | Link |
| Reference | Reference |
| Select | Multi-select |
| Attachment | Image |

## Updating Your API Token

If you need to update your Webflow API token (e.g., after rotating it):

1. Select the Webflow connection
2. Click the ⚙️ settings icon
3. Enter the new API token
4. Save changes

Inbind will re-validate the token and update the connection.

## Troubleshooting

- **Publishing fails:** Check that your API token has not expired and has the correct permissions. See the [Troubleshooting Guide](/troubleshooting-guide) for common issues.
- **Changes in Webflow not showing in Inbind:** Webhooks may need to be recreated. Try updating your API token in the connection settings to trigger webhook recreation.
- **Manual sync:** If data seems out of sync, open the connection settings and click the manual sync button.

::: info Need help?
Email us at [hey@inbind.app](mailto:hey@inbind.app) if you have any issues with your Webflow connection.
:::
