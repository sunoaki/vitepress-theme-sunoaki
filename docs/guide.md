# Theme Surface Guide

This page demonstrates the reusable parts of `vitepress-theme-sunoaki`: prose, links, lists, code, tables, containers, search icons, and dark-mode-aware surfaces.

## Typography

Documentation should feel quiet and precise. Body text stays readable, links keep a subtle underline, and `inline code` remains visible without shouting.

Use **bold text** for emphasis, *italic text* for nuance, and short paragraphs when the reader is scanning a technical page.

### Blockquotes

Blockquotes use the same calm surface language as containers, but intentionally do not show an icon.

> This is a plain blockquote. It is useful for quoted notes, design principles, or short context that should not be categorized as a warning or tip.
>
> A second paragraph should align cleanly with the first.

## Lists

### Implementation checklist

- Install the theme package.
- Import the theme from `.vitepress/theme/index.ts`.
- Keep project-specific logo, footer, and homepage overrides in the consuming site.
- Adjust `--docs-theme-*` tokens when a project needs a different mood.

### Suggested workflow

1. Start with the default VitePress theme behavior.
2. Add this theme as the visual layer.
3. Keep content-specific pages and assets outside the package.
4. Build the demo before publishing changes.

## Code Blocks

The theme keeps code blocks compact and readable while preserving VitePress syntax highlighting.

```typescript
import Theme from 'vitepress-theme-sunoaki'
import './style.css'

export default Theme
```

For local package development, the demo imports the source entry directly:

```typescript
import Theme from '../../../src/index'

export default Theme
```

## Tables

| Surface | What to check | Expected result |
|---------|---------------|-----------------|
| Navigation | Active and hover states | Soft pill treatment |
| Search | Desktop and mobile controls | Material Symbols icons |
| Containers | Info, tip, warning, danger, details | Icon cards with aligned text |
| Blockquote | Plain quoted content | No icon, same surface tone |
| Dark mode | Tokens and shadows | Muted contrast without harsh edges |

## Custom Containers

::: info
Info containers are for neutral context. They use an icon, unlike blockquotes.
:::

::: tip
Tip containers highlight a helpful path forward without changing the page structure.
:::

::: warning
Warning containers call out operational risk or configuration that deserves attention.
:::

::: danger
Danger containers are reserved for destructive or high-impact mistakes.
:::

::: details Inspect the details treatment
Details containers use a single disclosure icon that changes state and remains aligned with the title on mobile.
:::

## Local Search

Open the search box from the navigation bar and test it on mobile width. The back, layout, and clear buttons should be centered and rendered through Material Symbols.
