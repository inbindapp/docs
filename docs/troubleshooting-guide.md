# Troubleshooting Guide for Inbind

Running into issues while using Inbind? We are working on making Inbind more stable and reliable, but if you still face an issue, use this guide to resolve it.

If you're stuck or something doesn't seem right, feel free to reach out — we're happy to help.

📩 **Contact us at [inbindapp@gmail.com](mailto:inbindapp@gmail.com)**

## Issue: Publishing to Webflow Fails

### Problem

When you try to publish an item from Inbind to Webflow, the publish operation may fail if the item includes **Reference** or **Multi-Reference** fields that point to other collection items that **haven't yet been published to your live site**.

### Example

Say you're publishing a blog post that references:

- An **Author** (via a reference field)
- One or more **Tags** (via a multi-reference field)

If any of those referenced items haven't been published to your live site, the publish will fail.

### How to Fix

1. In Inbind, switch to the referenced item's collection (e.g., Authors or Tags).
2. Click on the referenced item.
3. Click **Publish** to publish that item to your site.
4. Go back to the original item you intended to publish and try again.

## Issue: Changes in Webflow Are Not Reflected in Inbind

### Problem

Normally, we sync data from Webflow to Inbind automatically almost immediately. 
However, if you made some changes directly in Webflow, but they are not reflected in Inbind, something went wrong.

### How to Fix

1. Go to organization settings, clicking on the gear icon in the top right corner of the screen.
2. Click the **Sync Now** button in the **Manually Sync from Webflow** section.

This will pull the latest version of all items in that collection.

## Still Need Help?

Don’t worry — we’ve got your back.

📩 **Contact us anytime at [inbindapp@gmail.com](mailto:inbindapp@gmail.com)** and we'll investigate and help you resolve the issue as quickly as possible.

Thanks for using Inbind!
