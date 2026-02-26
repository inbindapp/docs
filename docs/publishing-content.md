# Publishing content items

Publishing content in Inbind allows you to control when your content goes live on your connected platforms.

## Publishing Statuses

Inbind uses a simplified set of statuses to manage your content:

- **Draft** - Content that has been created or modified but not yet published
- **Published** - Content that is live on your connected platform
- **Archived** - Content that has been removed from publication

## Drafts

An item has a Draft status when changes have been made that aren’t yet published. This includes:

- Newly created items that have never been published
- Previously published items that have been modified and saved as a draft

## Publishing Collection Items

You can publish your collection items at any time after creating them. The publishing behavior may vary depending on your connected platform.

---

## Content publishing with Webflow

### Status Mapping

Inbind simplifies Webflow’s publishing statuses for a clearer workflow:

| Webflow status | Inbind status |
| --- | --- |
| Draft | Draft |
| Changes in draft | Draft |
| Queued to publish | Draft |
| Published | Published |
| Archived | Archived |

Deleting items in Inbind will also delete the item in Webflow.

### Queued to Publish

Inbind doesn’t have a separate `Queued to publish` status. However, when you make a change to an item that has Queued to publish status on Webflow and save it as a Draft in Inbind, Inbind respects this Webflow status and the item won’t get removed from the queue.

### Publishing Limitation

There is one limitation: if you’re creating items in a collection that was created after the latest site publishing, you must first publish the site in Webflow before publishing the items in this collection.

<NeedHelp />