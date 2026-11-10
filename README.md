# @dhemeira/ui

Dependency-free React UI primitives built on plain HTML elements. Components render native elements (`<button>`, `<input>`, `<dialog>`, …) with no UI/component library underneath.

- **Authoring** — styled with Tailwind CSS v4 (`@theme` tokens + utilities).
- **Tailwind-native** — components use Tailwind utility classes; the library ships its source so your own Tailwind build compiles them. No precompiled CSS is injected, so it can't override your styles.
- **Tree-shakeable** — ESM-only with named exports, so `import { Button } from '@dhemeira/ui'` pulls in only what you use.
- **Collision-proof theming** — all colors come from prefixed `--color-ui-*` tokens, so they never clash with a consumer's own Tailwind theme.

Requires `react >= 19` (peer dependency). No other runtime dependencies.

## Install

```sh
npm install @dhemeira/ui
```

Import the components:

```tsx
import { Button, Input, Modal } from "@dhemeira/ui";
```

## Setup

The library ships Tailwind source rather than precompiled CSS, so it is compiled inside your own Tailwind build — the same way your app code is. In your Tailwind CSS entry (the file that has `@import "tailwindcss"`), add:

```css
@import "tailwindcss";
@import "@dhemeira/ui/styles.css";

@source "../node_modules/@dhemeira/ui/src";
```

- `@import "@dhemeira/ui/styles.css"` brings in the `--color-ui-*` theme tokens.
- `@source` lets Tailwind scan the library's components so their utility classes are generated.

Adjust the `@source` path to match your project's `node_modules` location. There is no runtime CSS injection, so the library never overrides your own base styles, fonts, or utilities.

## Components

| Component       | Renders                          | Props                                                        |
| --------------- | -------------------------------- | ------------------------------------------------------------ |
| `Button`        | `<button>` (or `as`)             | `variant`, `small`, `block`, `loading`, `loadingLabel`, `as` |
| `Input`         | `<label>` + `<input>`            | `label`, `error`, `hint`                                     |
| `Select`        | `<label>` + `<select>`           | `label`, `error`                                             |
| `Textarea`      | `<label>` + `<textarea>`         | `label`, `error`                                             |
| `Modal`         | `<dialog>` (native Popover-free) | `trigger`, `title`, `closable`                               |
| `Popover`       | `<div>` + `<button>` + menu      | `trigger`, `label`, `side`, `align`                          |
| `Avatar`        | `<span>`                         | `username`, `className`                                      |
| `EmptyState`    | `<p>`                            | `message`                                                    |
| `LoadingState`  | `<p>`                            | `label`                                                      |
| `ErrorState`    | layout + `Button`                | `message`, `title`, `retryLabel`, `onRetry`                  |
| `ErrorBoundary` | error boundary                   | `children`                                                   |

Every component forwards its own `className`/`style` to the root element, and all native props pass through. Hover any component in your editor for a usage example.

## Examples

```tsx
<Button onClick={handleSave}>Save</Button>
<Button loading>Save</Button>

<Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} error={titleError} />

<Modal
  title="Delete"
  trigger={(open) => <Button onClick={open}>Delete</Button>}>
  <p>Are you sure?</p>
  <Button data-modal-close onClick={handleDelete}>Delete</Button>
  <Button data-modal-close>Cancel</Button>
</Modal>
```

### Polymorphic `Button`

`Button` renders a native `<button>` by default, but `as` can point at any element or component — so a link-style button stays in your router:

```tsx
import { Link } from "react-router-dom";

<Button as={Link} to="/recipes">
  View recipes
</Button>;
```

### Styling

Colors are driven by prefixed tokens, so instances never read a consumer's theme by accident. Override a component's look with normal `className`, or restyle one instance by overriding a token on it:

```tsx
<Button style={{ "--color-ui-accent": "#f472b6" } as React.CSSProperties}>
  Custom
</Button>
```

## Theming

The library ships sensible dark defaults; override any token by defining it on `:root`. To reuse your existing Tailwind theme, map once in your own CSS:

```css
:root {
  --color-ui-background: var(--color-background);
  --color-ui-surface: var(--color-surface);
  --color-ui-accent: var(--color-accent);
  --color-ui-text: var(--color-text);
}
```

| Token                       | Default                                                                 |
| --------------------------- | ----------------------------------------------------------------------- |
| `--color-ui-background`     | `#11111e`                                                               |
| `--color-ui-surface`        | `#181827`                                                               |
| `--color-ui-surface-2`      | `#1f1f33`                                                               |
| `--color-ui-border`         | `#2d2d4c`                                                               |
| `--color-ui-border-hover`   | `#3c3c63`                                                               |
| `--color-ui-border-focus`   | `#4b4b7c`                                                               |
| `--color-ui-accent`         | `#818cf8`                                                               |
| `--color-ui-accent-hover`   | `color-mix(in oklch, var(--color-ui-accent), var(--color-ui-text) 12%)` |
| `--color-ui-accent-soft`    | `rgba(129 140 248 / 0.14)`                                              |
| `--color-ui-text`           | `#eef0fb`                                                               |
| `--color-ui-success`        | `#34d399`                                                               |
| `--color-ui-success-bg`     | `#0d2818`                                                               |
| `--color-ui-warning`        | `#fbbf24`                                                               |
| `--color-ui-warning-bg`     | `#2a1f05`                                                               |
| `--color-ui-warning-border` | `#b45309`                                                               |
| `--color-ui-danger`         | `#dc2626`                                                               |
| `--color-ui-danger-hover`   | `color-mix(in oklch, var(--color-ui-danger), var(--color-ui-text) 12%)` |

## Development

```sh
npm install
npm run build       # production build (js + types)
npm run dev         # rebuild on change (js/css + types)
npm run typecheck
```

Heroicons used internally by components are imported from `@heroicons/react` in `src/icons.tsx` and bundled as inline SVG, so the published package stays dependency-free — `@heroicons/react` is a dev dependency only. Icons are internal, not part of the public API.

The build outputs to `dist/`:

- `dist/index.js` — ESM bundle
- `dist/*.d.ts` — TypeScript declarations (carry the JSDoc usage docs)

The npm tarball also includes `src/` (components + `styles.css`) so consumers can add it to their Tailwind `@source` and import the theme tokens.

## Publishing

```sh
npm publish
```

The package is scoped (`@dhemeira/ui`) and marked public via `publishConfig.access`, so it publishes publicly under the `@dhemeira` npm scope. `prepublishOnly` runs the production build first.
