# Theme Preview

This page is a quick tour of the theme's default reading experience.

## Typography

Good documentation should feel steady and easy to scan. Text is spacious, links stay visible, and `inline code` fits naturally into a paragraph.

Use **bold text** for emphasis and *italic text* when the tone needs to be softer.

### Blockquotes

Blockquotes are plain by design. They should feel like a quoted aside, not like an alert.

> A short quote can sit inside the page without pulling too much attention.
>
> Longer quotes keep the same quiet rhythm.

## Lists

### What this theme is for

- Product and project documentation.
- Network, infrastructure, and operations notes.
- Open-source packages that need a calm docs surface.
- Sites that want tasteful defaults without a full custom design system.

### A simple setup path

1. Add the theme package.
2. Import it from your VitePress theme entry.
3. Keep your own branding and homepage styles in your site.
4. Build and preview before publishing.

## Code Blocks

```typescript
import Theme from 'vitepress-theme-sunoaki'
import './style.css'

export default Theme
```

```css
:root {
  --docs-theme-accent: #2f6f73;
}
```

## Tables

| Area | Feel |
|------|------|
| Navigation | Compact and calm |
| Search | Clear on desktop and mobile |
| Code | Framed without feeling heavy |
| Tables | Structured but not crowded |
| Containers | Distinct, aligned, and readable |

## Custom Containers

::: info
Use info blocks for neutral context.
:::

::: tip
Use tips for helpful next steps.
:::

::: warning
Use warnings when something deserves attention.
:::

::: danger
Use danger blocks sparingly, for high-impact mistakes.
:::

::: details More about the details block
Details blocks should open cleanly, with one aligned disclosure icon.
:::

## Search

Try the search button in the navigation bar. On mobile, the back, layout, and clear controls should stay centered and easy to tap.
