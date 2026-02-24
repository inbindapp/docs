# Generated Fields

## What is a generated field?

A generated field is a field that uses another field to generate a field value for the field. The other field can be from the same collection or use a source collection to retrieve and populate its value.

If there is a source collection set up for a collection, all its fields must be generated fields.

## How do generated fields work?

Generated fields use templates where you can use any field's value from the current collection as well as other collections the collection is related with reference fields.

For example, for a Blog Posts collection, you can refer to values from the Authors and Blog Category collection, if they are reference fields in the Blog Posts collection. When referring to the author's name, you can use the following template:

```
{{author.name}}
```

Generated fields can also be used to populate an entire collection's field values, which is mainly used for creating new programmatic SEO collections. In this case, a source collection is defined in Inbind and Inbind will automatically generate new items into a destination collection, with values derived from the source collection. The source and destination collections will always have an equal number of items in them.

## How do I create a generated field?

In the Field Settings page, click on Add Generated Field.

Give your field a name and add a template for how we should populate this field's value.

Generated fields templates can use any field's value from the current collection as well as other collections the collection is related to with reference fields.

For example, in a *Blog Posts* collection, you can refer to values of any field from the *Authors* and *Blog Category* collection, if they are reference fields in the *Blog Posts* collection.

Then select which type of field it should be. A generated field can be one of the following field types:

- Text
- Rich Text
- Color
- Number
- URL

Finally, click on Create Field

You can find example templates below for common use cases, for example creating a "Reading time" field.

## How do I set up a field based on another collection?

Individual field values can be referred to from other collections by referring to the collection and its field name. For using a collection as a source collection and populating all items from the source collection you can create a new collection and select a population source for the collection.

When a new item is created in the source collection:

1. An item is also created in the destination collection
2. Any generated fields are evaluated

## Examples of Generated Fields usage

### Word count of an article

In the following example we do the following steps to end up with a field called "Word count":

- assign the post-body to be plain_text and
    - taking the value of the field with the slug of post-body
    - strip it from any html tags and new lines and replacing double spaces with a single space
- assign the plain_text to a words array split by spaces
- count the size of the words array to derive the count of words in the article

```html
{% assign plain_text = post-body | strip_html | strip_newlines | replace: "  ", " " %}
{% assign words = plain_text | split: " " %}
{{ words | size }}
```

### Reading time of an article

In the following example we are using the result of the previous word count example to create a new generated field called "Reading time". Here's how it works:

- assign 225 to be the number of words per minute
    - you can adjust this if you would like to use a different definition for how many words a person can read per minute
- assign word-count divided by the words per minute to be the reading time and round it up to the nearest whole number
- add the reading time with the text "min read" to create the final value of the field
    - you can adjust the text to your liking, if you for example prefer to say "minutes" or any other variation of copy

```html
{% assign words_per_minute = 225 %}
{% assign reading_time = word-count | divided_by: words_per_minute | ceil %}

{{ reading_time }} min read
```

### JSON-LD Schema

In this example we will use the BlogPosting JSON-LD schema as the template value to add a new field to our blog posts collection. The schema will replace the values of your other fields to the JSON schema.

```html
<script type="application/ld+json">
    {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{name}}",
  "image": [
    "undefined"
  ],
  "datePublished": "{{_meta.date_published}}",
  "dateModified": "{{_meta.date_updated}}",
  "author": [
    {
      "@type": "Person",
      "name": "{{author.name}}",
      "url": "{{author.name}}"
    }
  ]
}
</script>
```

### Shorten text to certain number of characters

Let's say you want to add shorten a paragraph from your text to only be certain number of characters long, for example to use on a blog listing page. You can do so without adding additional code by creating a field to shorten the length. In this example the field we are going to be shortening from is the "body" field.

```
{{ body | strip_html | truncatewords: 30, "..." }}
```

What this template does is it first strips the body from any HTML, then truncates the contents down to 30 words and finally ellipsize the content by adding three periods at the end.

### UTM Links for your collection items

If you are using UTM links to track your content, you can easily setup a new field that fills in the details of your

```
{{ post-url }}?utm_source=webflow&utm_medium=blog&utm_campaign={{ slug }}
```

### Content health score

To ensure your content is well-performing for SEO purposes, we can calculate a health score for the content by using a generated field. In this example we are using several measures to take into account the following SEO best practices:

| Check | Source field | Points | Why it matters |
| --- | --- | --- | --- |
| **Title exists** | `title` | +10 | Every post needs a clear, descriptive title for both users and SEO. |
| **Title length between 40–70 chars** | `title` | +10 | Keeps titles readable while optimized for search results. |
| **Exactly 1 H1 (title only, no extra in body)** | `title` + `body` | +20 | SEO best practice is *one primary H1*. Extra H1s confuse search engines. |
| **Has at least one H2 or H3** | `body` | +10 | Subheadings improve readability and help search engines parse structure. |
| **Word count > 600** | `body` | +20 | Ensures depth and avoids thin content. Longer content tends to rank better. |
| **Contains at least one image** | `body` | +10 | Images improve engagement and SEO (alt text, media diversity). |
| **Contains at least one link** | `body` | +15 | Links (internal/external) strengthen context and SEO signals. |
| **Updated in last 12 months** | `updated-on` | +5 | Fresh content is favored by search engines and builds trust. |
| **TOTAL** |  | **100** |  |

For even deeper insights, we can show each of the results in the field:

```
{%- assign score = 0 -%}
{%- assign insights = "" -%}

{# --- Prep safe variables --- #}
{%- assign safe_title = title | default: "" -%}
{%- assign safe_body = body | default: "" -%}
{%- assign safe_body_text = safe_body | strip_html -%}
{%- assign wordcount = safe_body_text | number_of_words -%}
{%- assign title_length = safe_title | size -%}
{%- assign updated_date = updated-on | default: "" -%}

{# --- Freshness calculation --- #}
{%- if updated_date != "" -%}
  {%- assign year_diff = "now" | date: "%s" | minus: updated_date | date: "%s" | divided_by: 31557600 -%}
{%- else -%}
  {%- assign year_diff = 99 -%}
{%- endif -%}

{# --- Title --- #}
{%- if safe_title != "" -%}
  {% assign score = score | plus: 10 %}
  {% assign insights = insights | append: "✅ Title exists (+10)\n" %}
{%- else -%}
  {% assign insights = insights | append: "❌ Missing title\n" %}
{%- endif -%}

{%- if title_length > 40 and title_length < 70 -%}
  {% assign score = score | plus: 10 %}
  {% assign insights = insights | append: "✅ Title length is good (+10)\n" %}
{%- else -%}
  {% assign insights = insights | append: "⚠️ Title length not optimal (should be 40–70 chars)\n" %}
{%- endif -%}

{# --- Heading structure --- #}
{%- assign h1_count = safe_body | scan: "<h1" | size -%}
{%- if h1_count == 0 -%}
  {% assign score = score | plus: 20 %}
  {% assign insights = insights | append: "✅ No extra H1s in body (+20)\n" %}
{%- else -%}
  {% assign insights = insights | append: "❌ Extra H1 tags found in body\n" %}
{%- endif -%}

{%- if safe_body contains "<h2>" or safe_body contains "<h3>" -%}
  {% assign score = score | plus: 10 %}
  {% assign insights = insights | append: "✅ Subheadings present (+10)\n" %}
{%- else -%}
  {% assign insights = insights | append: "⚠️ No subheadings (H2/H3) found\n" %}
{%- endif -%}

{# --- Body checks --- #}
{%- if wordcount > 600 -%}
  {% assign score = score | plus: 20 %}
  {% assign insights = insights | append: "✅ Content length is healthy (+20)\n" %}
{%- else -%}
  {% assign insights = insights | append: "⚠️ Content too short (<600 words)\n" %}
{%- endif -%}

{%- if safe_body contains "<img" -%}
  {% assign score = score | plus: 10 %}
  {% assign insights = insights | append: "✅ Images included (+10)\n" %}
{%- else -%}
  {% assign insights = insights | append: "⚠️ No images found\n" %}
{%- endif -%}

{%- if safe_body contains "<a href=" -%}
  {% assign score = score | plus: 15 %}
  {% assign insights = insights | append: "✅ Internal/external links included (+15)\n" %}
{%- else -%}
  {% assign insights = insights | append: "⚠️ No links found\n" %}
{%- endif -%}

{# --- Freshness --- #}
{%- if year_diff < 1 -%}
  {% assign score = score | plus: 5 %}
  {% assign insights = insights | append: "✅ Post updated within 1 year (+5)\n" %}
{%- else -%}
  {% assign insights = insights | append: "⚠️ Post not updated in over a year\n" %}
{%- endif -%}

---

Health Score: **{{ score }}/100**

### Breakdown:
{{ insights }}

```

### Programmatic SEO example

Let's say you have a collection of cars and their models that you would like to create pages for each of them but apply some templating for the texts. By setting up the information of the cars in one collection as the source, it can be used to generate values to the destination collection.

For example:

Source collection

| Car | Model | Horsepower | Highlights |
| --- | --- | --- | --- |
| Volvo | EX90 | 200 | safety, luxury, and performance |
| Audi | A6 | 250 | cutting-edge technology and refined comfort |
| Mercedes-Benz | C-Class | 255 | elegance, power, and innovation |

Destination collection

| Car info | Car description |
| --- | --- |
| Car Volvo | Volvo is the greatest car ever made and delivers 200 horsepower. Their latest model EX90 offers an excellent combination of safety, luxury, and performance. |
| Car Audi | Audi is the greatest car ever made and delivers 250 horsepower. Their latest model A6 offers an excellent combination of cutting-edge technology and refined comfort. |
| Car Mercedes-Benz | Mercedes-Benz is the greatest car ever made and delivers 255 horsepower. Their latest model C-Class offers an excellent combination of elegance, power, and innovation. |

As you can notice the values in the destination collection are generate according to the following template:

```
Car: <<Car>>

<<Car>> is the greatest car ever made and delivers <<Horsepower>> horsepower. Their latest model <<Model>> offers an excellent combination of <<Highlights>>
```

### How is this way of doing programmatic SEO different from how Webflow works?

With Webflow the same can be achieved in two ways:

1. Using a separate spreadsheet to create and manage the content and then manually importing/exporting the spreadsheets to populate your collection
2. Using multiple code embeds to create combined value that includes a CMS item's value and any static text, but you will need to define the HTML for each element manually.

With Inbind, it only needs two things: a source collection used as a population source and the destination collection where you would have field values generated based on the template.

<NeedHelp />
