# Publishing content items

Inbind follows a similar publishing process as Webflow and saving a draft or publishing will update the item’s status directly to Webflow. The statuses in Inbind are, however, slightly simplified:

| Webflow status | Inbind status |
| --- | --- |
| Draft | Draft |
| Changes in draft | Draft |
| Queued to publish | Draft |
| Published | Published |
| Archived | Archived |

Deleting items in Inbind will also delete the item in Webflow.

## Drafts

An item having a `Draft` status means that there are some changes made to the item that were not published. It means that an item has a Draft status if: 

- it was created and was never published to the live site
- it was published before and some changes to it were made and were not published
- it was published before and then unpublished

## Queued to publish

Inbind doesn't have a `Queued to publish` status as Webflow does. However, when you make a change to an item that has Queued to publish status on Webflow and save it as a Draft in Inbind, Inbind respects this Webflow status and the item won't get removed from the queue.

## Publishing collection items

You can publish your collection items at any time after creating them.

There is one limitation: if you're creating items in a collection that was created after the latest site publishing, you must first publish the site in Webflow before publishing the items in this collection.