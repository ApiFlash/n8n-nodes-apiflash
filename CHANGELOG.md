# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2026-07-28

### Fixed

- `tsconfig.tsbuildinfo` is no longer emitted into `dist/`, shrinking the
  published package from 244.9 kB to 41.2 kB unpacked. The incremental build
  cache now lives in `node_modules/.cache/`.

### Changed

- Published from CI with an npm provenance attestation.

## [0.3.0] - 2026-07-28

### Changed

- The package is now published under the official ApiFlash npm scope as
  `@apiflash/n8n-nodes-apiflash`. Users of `n8n-nodes-apiflash` should
  uninstall it and install the scoped package instead.
- `node` identifier updated to `@apiflash/n8n-nodes-apiflash.apiflash` to match
  the new package name.
- Package author is now ApiFlash (`contact@apiflash.com`).

## [0.2.2] - 2026-07-24

### Fixed

- `node` field now uses the fully-qualified n8n node identifier
  (`n8n-nodes-apiflash.apiflash`).
- Replaced the unsupported `Developer Tools` category with `Utility`.

## [0.2.1] - 2026-07-24

### Changed

- **Extract HTML** and **Extract Text** options are now hidden when the
  **Output** is set to Image File, since extracted data is only returned with
  the JSON output.
- **Scale Factor** is now a dropdown with the two supported values (1 and 2)
  instead of a free-form number field.

## [0.2.0] - 2026-07-23

### Added

- **Output** option on the **Capture** operation to choose between returning
  the screenshot metadata as JSON (default) or the screenshot itself as a
  binary file.
- **Put Output File in Field** option to configure the name of the binary
  output field when returning the screenshot as a file.

## [0.1.1] - 2026-07-23

### Added

- Dark-mode icon variant for the node and credentials using the themed
  `{ light, dark }` icon form.
- `LICENSE.md` with the MIT license text.

## [0.1.0] - 2026-07-23

### Added

- Initial release of the ApiFlash community node.
- **Screenshot** resource with a **Capture** operation to capture website
  screenshots via the ApiFlash API.
- Support for capture options including image format (JPEG, PNG, WebP),
  viewport size, full page capture, element capture, crop, quality, delay,
  wait conditions, CSS/JS injection, ad/cookie-banner/tracker blocking,
  custom headers and cookies, caching TTL, and HTML/text extraction.
- **ApiFlash API** credentials using an access key, with a credential test
  against the quota endpoint.
