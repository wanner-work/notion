# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2024-05-28

## Added

- Exporting the NotionCustomBlock interface and the NotionBlockTypes type in `@wanner.work/notion` to allow for variable based custom blocks.

## [1.1.0] - 2024-05-25

## Added

- Exporting the NotionQueryData interface in `@wanner.work/notion/helper` to allow for custom queries.

## Fixed
 
- Adding a margin bottom to the `NotionDefault` component to prevent it from sticking to the next element.
- Removing `text-light` because light is not a valid text color in tailwindcss.
- Removing `fallback="loading..."` from suspense inside of `NotionBlock` to preventing weird loading text.

## Changed

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
