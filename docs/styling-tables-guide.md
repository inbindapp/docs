# How to Style Inbind Tables

Inbind editor tables are rendered as standard HTML tables. You can use the examples below to help style your tables effectively.

Here is an example of a table that Inbind outputs with 3 columns and 3 rows:

```html
<table style="min-width: 75px">
    <colgroup>
      <col style="min-width: 25px">
      <col style="min-width: 25px">
      <col style="min-width: 25px">
    </colgroup>
    <tbody>
      <tr>
        <th colspan="1" rowspan="1">
          <p>Table heading column 1</p>
        </th>
        <th colspan="1" rowspan="1">
          <p>Table heading column 2</p>
        </th>
        <th colspan="1" rowspan="1">
          <p>Table heading column 3</p>
        </th>
      </tr>
      <tr>
        <td colspan="1" rowspan="1">
          <p>Table column 1, row 1</p>
        </td>
        <td colspan="1" rowspan="1">
          <p>Table column 2, row 1</p>
        </td>
        <td colspan="1" rowspan="1">
          <p>Table column 3, row 1</p>
        </td>
      </tr>
      <tr>
        <td colspan="1" rowspan="1">
          <p>Table column 1, row 2</p>
        </td>
        <td colspan="1" rowspan="1">
          <p>Table column 2, row 2</p>
        </td>
        <td colspan="1" rowspan="1">
          <p>Table column 3, row 2</p>
        </td>
      </tr>
      <tr>
        <td colspan="1" rowspan="1">
          <p>Table column 1, row 3</p>
        </td>
        <td colspan="1" rowspan="1">
          <p>Table column 2, row 3</p>
        </td>
        <td colspan="1" rowspan="1">
          <p>Table column 3, row 3</p>
        </td>
      </tr>
    </tbody>
  </table>
```

Here’s a sample styling for a basic table (applies to all tables on your page) that you can use freely:

```html
<style>
  /* Ensure table borders collapse into a single border */
  table {
    border-collapse: collapse;
    width: 100%;              /* Make table take up full container width */
    min-width: 75px;          /* Minimum width constraint */
  }

  /* Style for table header and cell elements */
  th, td {
    border: 1px solid #ccc;   /* Light grey border around each cell */
    padding: 8px 12px;        /* Add space inside each cell for better readability */
    text-align: left;         /* Align text to the left */
    vertical-align: top;      /* Align content to the top of the cell */
  }

  /* Style for table header cells */
  th {
    background-color: #f4f4f4;  /* Light grey background for headers */
    font-weight: bold;          /* Make header text bold */
  }

  /* Zebra striping for better readability: every even row gets a light background */
  tr:nth-child(even) td {
    background-color: #fafafa;
  }

  /* Remove default margin from <p> tags inside table cells */
  p {
    margin: 0;
  }
</style>
```

## Styling in Webflow

To style the tables in Webflow you can use the page’s Custom Code section, or add a separate Code Embed to your collection template page.

<NeedHelp />