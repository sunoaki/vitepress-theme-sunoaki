# Guide

This is a demonstration of the `vitepress-theme-sunoaki` theme. It showcases various Markdown features and VitePress built-in components.

## Typography

You can use **bold**, *italic*, ~~strikethrough~~, and `inline code`.

### Blockquotes

> This is a blockquote. It can be used to highlight important information or quote someone.
> 
> It can span multiple lines.

## Lists

### Unordered List

* Item 1
* Item 2
  * Nested Item 2.1
  * Nested Item 2.2
* Item 3

### Ordered List

1. First step
2. Second step
3. Third step

## Code Blocks

Here is an example of a code block with syntax highlighting:

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Site',
  description: 'A VitePress Site'
})
```

## Tables

| Feature | Description | Status |
|---------|-------------|--------|
| Design  | Clean and minimal | ✅ |
| Responsive | Mobile-friendly | ✅ |
| Dark Mode | Built-in support | ✅ |

## Custom Containers

::: info
This is an info container.
:::

::: tip
This is a tip container.
:::

::: warning
This is a warning container.
:::

::: danger
This is a danger container.
:::

::: details Click me to view details
This is a details container. You can put more content inside here.
:::
