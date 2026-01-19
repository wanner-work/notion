# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2026-01-19

### Fix

- Adding `description` field to the package.json to improve npm package listing.
- Fixing missing dist files in the published package.

:::section{#versions}

## [2.0.0] - 2026-01-03

### Breaking

- Changing from `<Notion custom={[...]}/>` to `<Notion config={{ blocks: [...]}} />` to improve clarity.
- Remove the helper methods from `@wanner.work/notion/helper` and move some of them to the new `NotionParser` class in
  `@wanner.work/notion` for better organization.
- Remove internal dependency to tailwindcss and move to CSS modules to allow for better styling customization.
- Remove the following default components because they always rely on custom styling:
  - `NotionImage`
  - `NotionAudio`

### Feature

- Improving the `NotionQuery` class to support database queries and many more query options.
- Adding `NotionParser` class with static methods to parse page properties from Notion API responses.
- Adding a `NotionRenderConfig` interface to allow for better configuration of the `Notion` component and support hiding the
  unsupported block warning.
- Upgrade the Notion API client to the latest version.
- Cleanup codebase and use the official notion types where possible.

### Chore

- Migrate to rolldown for building and bundling the package.
- Migrate to oxfmt for code formatting.
- Upgrade the playground to use the latest Next.js version.

### Documentation

- Publishing documentation site at https://notion.wanner.work using fumadocs.

## [1.2.1] - 2025-03-09

### Fixed

- Fixing react "each child in a list should have a unique "key" prop" warning by hashing the object for a unique key.

## [1.2.0] - 2024-05-28

### Added

- Exporting the NotionCustomBlock interface and the NotionBlockTypes type in `@wanner.work/notion` to allow for variable
  based custom blocks.

## [1.1.0] - 2024-05-25

### Added

- Exporting the NotionQueryData interface in `@wanner.work/notion/helper` to allow for custom queries.

### Fixed

- Adding a margin bottom to the `NotionDefault` component to prevent it from sticking to the next element.
- Removing `text-light` because light is not a valid text color in tailwindcss.
- Removing `fallback="loading..."` from suspense inside of `NotionBlock` to preventing weird loading text.

### Changed

- Change `mt-12 mb-12` to `my-12` because it is more concise.

## [1.0.0] - 2024-05-09

### Added

- Cleaning everything with prettier
- Releasing package to public

## [0.1.1] - 2024-05-09

### Fixed

- Fixing the usage of an unexported interface of notion by using the local NotionAnnotation interface.

## [0.1.0] - 2024-05-09

### Added

- Initial pre-release of the package.
  :::
