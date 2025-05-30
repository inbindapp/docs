# Troubleshooting Publishing Issues in Webflow from Inbind

If you're having trouble publishing content items from **Inbind** to **Webflow**, you're in the right place. This guide will help you identify and resolve the most common issue we’ve seen so far.

## 📌 Known Issue: Unpublished Reference Items

### Problem

If your item includes **Reference** or **Multi-Reference** fields (e.g., linking to another Collection item in Webflow), the publish operation will **fail** if **one or more of those referenced items are not yet published** to your live site.

### Example

Let’s say you're trying to publish a blog post that references:

- An **Author** (linked via a reference field)
- One or more **Tags** (linked via a multi-reference field)

If any of those **Authors** or **Tags** haven't been published in to your live site yet, the entire publishing action from Inbind will not go through.

### Solution

1. In Inbind go to the referenced item by switching to corresponding collection and clicking on the item.
2. Click **Publish** to publish the item to your site.
3. Go back to the item you were intended to publish at first and try to publish it again.

---

## 🆘 Need Help?

Still stuck? No worries — we’re here for you.

📩 **Contact us at [inbindapp@gmail.com](mailto:inbindapp@gmail.com)** and we’ll help you troubleshoot.

---

We’re working on adding more automatic checks and better error messages to improve this experience — stay tuned!
