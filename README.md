![notion.](docs/lead.svg)

# notion.

An opinionated but highly customizable notion rendering and data fetching toolset.

## Prerequisites

Only use this package if you are building with [tailwindcss](https://tailwindcss.com/) and the newest version
of [react](https://react.dev/). If you plan to customize the component by your own block components, you should install
the `@notionhq/client` package as well.

You also need to have a notion account and a notion integration set up. You can find more information on how to set up
an integration [here](https://developers.notion.com/docs/create-a-notion-integration#getting-started).

## Installation

1. Install the package using pnpm: `pnpm add @wanner.work/notion`.
2. Add the following line to your `tailwind.config.js` content configuration: (if not already present from
   different `@wanner.work` components) `"./node_modules/@wanner.work/**/*.{js,ts,jsx,tsx}"`
3. Add the following lime to your `.env` file: `NOTION_SECRET=your-secret`. This secret is the secret you get from
   your notion integration. Never share this secret with anyone!

## Usage

To render a notion page, we first need to fetch the data from the notion API. With this data, we are then able to render
it using the designated tools.

### Data Fetching

The notion API is only available from the server side so never try to do this in the frontend.

There are two main ways to fetch data. Either by using the `NotionQuery` class which is provided by this package, or
the `@notionhq/client` package, which is the official js client from notion. The `NotionQuery`package itself uses
the `@notionhq/client` inside.

#### Using the `NotionQuery` class:

Using the provided class is straight forward. It does everything for you. All you have to do is provide an integration
token and a id of a page which you'd like to get the content from.

```tsx
import { NotionQuery } from '@wanner.work/notion'

// initiate the query with the notion secret or, if you have a notion client already, the client
const query = new NotionQuery(process.env.NOTION_SECRET)

// execute it to get the data of the id which is passed as an argument
const data = await query.execute('the-id-of-the-page')
```

#### Using the `@notionhq/client` directly:

If you need more control over the data fetching process, you can use the `@notionhq/client` package to fetch the data
and then use the `NotionQuery` class to transform it. The transformation process is required for the renderer to work as
expected.

```tsx
import { Client } from '@notionhq/client'
import { NotionQuery } from '@wanner.work/notion'

// creating a new api client with the integration token
const client = new Client({
  auth: process.env.NOTION_SECRET
})

// get all pages from a database or do whatever you'd like to do with the api client.
const request = (await client.databases.query({
  database_id: process.env.NOTION_DATABASE_TOKEN as string
})) as QueryDatabaseResponse
const results = request.results as PageObjectResponse[]

// get the first page
const page = results[0]

// get all blocks from the page
const response = await client.blocks.children.list({
  block_id: page.id
})

// transform the data using the NotionQuery class
const query = new NotionQuery(client)
const data = await query.transform(response)
```

### Rendering

After you have the data, you can render it using the provided components.

#### Using the `Notion` component:

The `Notion` component is the easiest to use. Under the hood it is just a wrapper which renders all blocks with
a `NotionBlock` component.

```tsx
import Notion from '@wanner.work/notion'

export default function Application() {
  // get the data using one of the methods above

  return <Notion data={data} />
}
```

#### Using `NotionBlock` components:

If you somehow need more flexibility, you can also just use `NotionBlock` components directly.

```tsx
import Notion from '@wanner.work/notion'

export default function Application() {
  // get the data using one of the methods above

  return (
    {
      data.map((object) => (<>
        <NotionBlock key={object.block.id}
                     block={object.block}
                     children={object.children}
                     level={object.level}
        />
      </>))
    }
  )
}
```

### Customizing the rendering of the blocks:

If you want to customize the rendering of the blocks or if you want to use a block type which is currently not supported
by the `@wanner.work/notion` package, you can pass a custom block component per type to the `Notion` component.

```tsx
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Notion, {
  getNotionImageURL,
  NotionBlockObject
} from '@wanner.work/notion'

export default function Application() {
  // data is the transformed data from the notion API

  return (
    <Notion
      data={data}
      custom={[
        {
          type: 'image',
          component: MyImageComponent
        }
      ]}
    />
  )
}

// to see which props are available you can use the NotionBlockObject interface for your props with the correct generic,
// in this case the ImageBlockObjectResponse interface.
function MyImageComponent({
  block,
  level,
  children
}: NotionBlockObject<ImageBlockObjectResponse>) {
  return <img src={getNotionImageURL(block.image)} alt={alt} />
}
```

## Currently supported block components

The package comes with built-in block components for the following types:

- `paragraph`
- `heading_1`
- `heading_2`
- `heading_3`
- `audio`
- `image`

If a type is present in the data but no custom component is passed to the `Notion` component, a warning will
be rendered.

## Helper methods & components

These methods may be imported through `@wanner.work/notion/helper`

### `getNotionImageURL` method

This method is used to get the image URL from a notion image block. It is used by the built-in image block component.

- `image` (ImageBlockObjectResponse['image'] | PageObjectResponse['cover']): The image or cover object inside a block.

### `NotionRichText` component

This component renders notion rich text, wich is inside of a Paragraph or a Heading block. It is used by the built-in
text block components.

- `rich_text` (RichTextItemResponse[]): The rich text in the rich text object format of notion.

## Methods & options

### `NotionQuery` class

- `constructor` (integrationTokenOrClient: string | Client, options: { debug?: boolean }): Initialize the class with a
  token or a active notion client and say, if you'd like to see debug log.
- `execute` (id: string): Execute the fetch and transform for a certain page or block id.
- `transform` (response: ListBlockChildrenResponse, level = 0): Transform a ListBlockChildrenResponse which is a response
  from the notion client to the format which the component can understand.
- ` transformBlock` (block: BlockObjectResponse, level: number): Transform a single block, which is used by the transform
  method as well.

### `Notion` component

- `data` (NotionQueryData): The data, transformed by the `NotionQuery` class.
- `custom` ({ type: 'heading_1' | ..., component: JSX.Element<NotionBlockObject> }[]): An array of custom components per
  type.

### `NotionBlock` component

- `block` (BlockObjectResponse | ...): The original notion block object
- `children?` (NotionBlockObject[]): An array of transformed notion blocks which are the children of the block
- `level?` (number): The level, in which we are currently in.
- `custom` ({ type: 'heading_1' | ..., component: JSX.Element<NotionBlockObject> }[]): An array of custom components per
  type.

## Further information

### Next.js

This project is fully Next.js compatible and should possibly most of the times be used with it. It can be completely
rendered on the server. However the custom block components can as well be server or client components. Both work just
fine.
