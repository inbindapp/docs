---
layout: doc
---

# Setting up Cloudflare R2 for Inbind

Use Cloudflare R2 when you want S3-compatible storage with simple pricing and easy public access.

## What you will need

- An **R2 bucket**
- An **R2 API token** (Access Key ID + Secret Access Key)
- Your **Account ID** (to form the endpoint)
- A **Public URL** for reading the published JSON ([`r2.dev`](https://r2.dev) public bucket URL or a custom domain)

## Step 1: Create an R2 bucket

1. Open Cloudflare Dashboard → Storage & Database → R2 object storage
2. Enter a bucket name and click **Create bucket**
3. Note the **Bucket name**

## Step 2: Create an API token

1. In R2 object storage overview dashboard, locate **Account Details** and click **Manage** next to **API Tokens**
2. Create an Account API token with **Read & Write** permissions
3. Copy:
    - **Access Key ID**
    - **Secret Access Key**

---

## Step 3: Make the content publicly readable (Public URL)

To make content in your object storage bucket publicly accessible, go to **R2 Object Storage** → **Settings** and configure one of the following:

**Custom domain (Recommended)**

Follow [this guide](https://developers.cloudflare.com/r2/buckets/public-buckets/#add-your-domain-to-cloudflare) to connect your public domain to your R2 bucket. In this case your public domain will be the **Public URL** you should use in Inbind settings.

**Public Development URL**

Enabling the Public Development URL is the easiest way to make your R2 bucket content public. It's suitable for testing or low-volume usage, but not recommended for production. Once enabled, you'll receive a URL to use as your **Public URL**.

---

## Step 4: Fill the fields in Inbind

When creating the connection, enter the following:

- **Bucket Name:** Your R2 bucket name from Step 1
- **Region:** `auto`
- **Access Key ID** and **Secret Access Key:** The credentials you created in Step 2
- **Public URL:** Either your custom domain or public development URL, depending on which option you chose in Step 3
- **Custom Endpoint URL:** The S3 API URL from your R2 object storage overview page under **Account Details**. It looks like `https://<your-account-id>.r2.cloudflarestorage.com`
