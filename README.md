# VitePress Theme Sunoaki

A reusable VitePress theme with calm network-documentation styling.

## Usage

```ts
// docs/.vitepress/theme/index.ts
import Theme from "vitepress-theme-sunoaki";
import "./style.css";

export default Theme;
```

For local development in this repository, the consuming site imports from `../../../themes/vitepress-theme-sunoaki/src`.

## Scope

This package contains global VitePress design styling: tokens, navigation, search, document content, code blocks, tables, footer layout primitives, and Material Symbols replacements for VitePress default icons.

It intentionally does not include site-specific homepage sections, analytics, deployment assets, footer copy, or project navigation content.

## Customization

Override `--docs-theme-*` CSS custom properties in your consuming site, and keep project-specific classes or logo treatments in your local `.vitepress/theme/style.css`.

## Demo Site

This package includes a minimal demo site to preview the theme independently.

To run the demo locally:

```bash
# Start development server
yarn demo:dev

# Build the demo site
yarn demo:build

# Preview the built site
yarn demo:preview
```
