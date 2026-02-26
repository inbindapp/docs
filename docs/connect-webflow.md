---
layout: doc
---

# How to Connect to Webflow

Inbind integrates directly with Webflow CMS. Content is synced in both directions - changes you make in Inbind are pushed to Webflow, and changes made in Webflow are synced back to Inbind automatically.

## Prerequisites

- A Webflow site on a CMS plan or higher with CMS capabilities enabled

## Setting up Webflow

### Creating Webflow API Token

Inbind communicates with Webflow's APIs using an API token. An API token is a secure way of providing Inbind with access to only specific resources within your Webflow site. Inbind uses the APIs to retrieve collection items, to create and update collection items and to upload assets such as images, documents or video to your Webflow asset manager.

Inbind needs the following accesses to your Webflow project:

| **Resource** | **Access level** | **Reason** |
| --- | --- | --- |
| Assets | Read & Write | To retrieve, update, and create images in the asset manager. |
| CMS | Read & Write | To retrieve, update, and create collection items; retrieve information about collections. |
| Sites | Read & Write | To retrieve information about the site Inbind connected to, and create webhooks. |

To create a new API token, **follow these steps in Webflow**:

1. Open Webflow dashboard
    - Alternatively navigate directly to the site integrations page (replace `YOUR-WEBFLOW-SITE` with your site ID):

      ```
      https://webflow.com/dashboard/sites/YOUR-WEBFLOW-SITE/integrations
      ```
2. Hover over the site you would like to add Inbind to and click on the ⚙️ icon on the top right. If your sites are shown in a list, click on the "…" icon and select "Settings"
3. Go to **Apps & integrations** from the left menu
4. Scroll to **API access**
5. Click **Generate API token**
6. Enter a **name** for your API token (for example *Inbind*)
7. Select **Read & write** permissions for **Assets, CMS, and Sites**
8. Click **Generate token**
9. Copy the token - you'll need it in the next step

## Setting Up the Connection in Inbind

Once you have your Webflow API token, you can create the connection in Inbind.

### Step 1: Create the Connection

1. Go to the **Connections** page in Inbind
2. Click the **+** button to add a new connection
3. Select **Webflow** from the destination options
4. Paste your Webflow API token (from the previous step)
5. Click **Create Connection**

Inbind will validate your token and retrieve your Webflow site information. If validation succeeds, the connection is created and automatic two-way sync is enabled.

### Step 2: Connect a Collection

1. Select your Webflow connection from the connections list
2. Click **+ Connect Collection**
3. Choose the collection you want to publish to Webflow
4. Select the fields you want to sync - the **name** and **slug** fields are always required
5. Click **Connect Collection**

Inbind creates a corresponding CMS collection in Webflow with the selected fields and publishes all existing items.

## How Syncing Works

### Inbind to Webflow

When you create, edit, or publish content in Inbind, the changes are automatically pushed to Webflow CMS. Each Inbind item maps to a Webflow CMS item.

### Webflow to Inbind

When a CMS item is created, updated, or deleted in Webflow, the change is automatically synced back to Inbind.

## Troubleshooting

- **Publishing fails:** Check that your API token has not expired and has the correct permissions. See the [Troubleshooting Guide](/troubleshooting-guide) for common issues.
- **Changes in Webflow not showing in Inbind:** Try updating your API token in the connection settings to refresh the sync connection.
- **Manual sync:** If data seems out of sync, open the connection settings and click the manual sync button.

<NeedHelp />
