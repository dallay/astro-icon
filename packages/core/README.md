# Astro Icon (Community Fork)

> **A community-maintained fork of [`astro-icon`](https://github.com/natemoo-re/astro-icon) by [Nate Moore](https://github.com/natemoo-re), updated for Astro v6.x and Cloudflare Workers compatibility.**

[![npm version](https://img.shields.io/npm/v/@dallay/astro-icon?color=blue)](https://www.npmjs.com/package/@dallay/astro-icon)
[![npm downloads](https://img.shields.io/npm/dm/@dallay/astro-icon?color=blue)](https://www.npmjs.com/package/@dallay/astro-icon)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Astro v6](https://img.shields.io/badge/Astro-v6+-ff4d03?logo=astro)](https://astro.build)
[![Cloudflare Ready](https://img.shields.io/badge/Cloudflare-Ready-orange?logo=cloudflare)](https://workers.cloudflare.com/)
[![GitHub issues](https://img.shields.io/github/issues/dallay/astro-icon)](https://github.com/dallay/astro-icon/issues)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Astro v6](https://img.shields.io/badge/Astro-v6+-ff4d03?logo=astro)](https://astro.build)
[![Cloudflare Ready](https://img.shields.io/badge/Cloudflare-Ready-orange?logo=cloudflare)](https://workers.cloudflare.com/)
[![GitHub issues](https://img.shields.io/github/issues/dallay/astro-icon)](https://github.com/dallay/astro-icon/issues)

---

## ⚠️ About This Fork

This package (`@dallay/astro-icon`) is a **ported and extended version** of the original [`astro-icon`](https://github.com/natemoo-re/astro-icon) created by **[Nate Moore (@natemoo-re)](https://github.com/natemoo-re)**.

The original `astro-icon` is an excellent integration that has served the Astro community well. This fork exists to address specific compatibility needs that arose with newer versions of Astro and serverless deployment targets:

### Why This Fork?

- **Astro v6.x Support** — The original package has not been updated for Astro v6.x breaking changes. This fork includes the necessary patches to ensure full compatibility with the latest Astro release.
- **Cloudflare Adapter Compatibility** — When deploying to Cloudflare Workers/Pages via `@astrojs/cloudflare`, the original package encounters runtime issues related to Node.js API usage in the edge environment. This fork resolves those issues.
- **Continued Maintenance** — Provides ongoing maintenance and bug fixes for projects that depend on `astro-icon` in modern Astro + Cloudflare stacks.

### Acknowledgments

All credit for the original design, architecture, and icon system goes to **[Nate Moore](https://github.com/natemoo-re)** and the original contributors of [`astro-icon`](https://github.com/natemoo-re/astro-icon). This fork is made possible by their outstanding work, and is released under the same **MIT License**.

If the upstream project resumes active development with Astro v6 support, we recommend migrating back to the original package.

---

## Installation

Choose your preferred package manager:

### npm

```sh
npm install @dallay/astro-icon
```

### pnpm

```sh
pnpm add @dallay/astro-icon
```

### yarn

```sh
yarn add @dallay/astro-icon
```

### bun

```sh
bun add @dallay/astro-icon
```

### pnpm

```sh
pnpm add @dallay/astro-icon
```

### yarn

```sh
yarn add @dallay/astro-icon
```

### bun

```sh
bun add @dallay/astro-icon
```

Then, add the integration to your `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import icon from "@dallay/astro-icon";

export default defineConfig({
  integrations: [icon()],
});
```

## Usage

Astro Icon is ready to use with zero additional configuration. The included `Icon` component allows you to inline `svg`s directly into your HTML.

### Local Icons

By default, Astro Icon supports custom local `svg` icons. They are optimized with [`svgo`](https://github.com/svg/svgo) automatically with no extra build step. See ["A Pretty Good SVG Icon System"](https://css-tricks.com/pretty-good-svg-icon-system/#just-include-the-icons-inline) from CSS Tricks.

1. Create a directory inside of `src/` named `icons/`.
2. Add each desired icon as an individual `.svg` file to `src/icons/`.
3. Reference a specific icon file using the `name` prop.

```astro
---
import { Icon } from '@dallay/astro-icon/components';
---

<!-- Loads the SVG in `/src/icons/filename.svg` -->
<Icon name="filename" />
```

### Iconify Icons

Astro Icon also supports [Iconify](https://iconify.design) icon sets out-of-the-box.

1. Find an Icon Set to use on the [Iconify Icon Sets website](https://icon-sets.iconify.design/)
2. Install the package (eg. `npm i -D @iconify-json/mdi`)
3. Reference a specific icon using the `name` prop (eg. `mdi:account`)

```astro
---
import { Icon } from '@dallay/astro-icon/components'
---

<!-- Automatically fetches and inlines Material Design Icon's "account" SVG -->
<Icon name="mdi:account" />
```

### Props

The `Icon` component allows these custom properties:

```ts
interface Props extends HTMLAttributes<"svg"> {
  /**
   * References a specific Icon
   */
  name: string;
  "is:inline"?: boolean;
  title?: string;
  desc?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}
```

The `Icon` also accepts any global HTML attributes and `aria` attributes. They will be forwarded to the rendered `<svg>` element.

### Styling

Styling your icons is straightforward. Any styles can be targeted to the `[data-icon]` attribute selector. If you want to target a specific icon, you may target it by name using `[data-icon="filename"]`.

```astro
---
import { Icon } from '@dallay/astro-icon/components';
---

<style lang="css">
    [data-icon] {
        color: blue;
        /* OR */
        fill: blue;
    }
    [data-icon="annotation"] {
        color: red;
        /* OR */
        fill: red;
    }
</style>

<Icon name="adjustment" /> <!-- will be blue -->
<Icon name="annotation" /> <!-- will be red -->

<!-- Example using Tailwind to apply color -->
<Icon name="annotation" class="text-red-500" /> <!-- will be red-500 -->
```

### Using with Frameworks

Astro Icon can be used with other frameworks utilizing the [`slot` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot). You can read more about how to use Slots in Astro here: [Passing Children to Framework Components](https://docs.astro.build/en/core-concepts/framework-components/#passing-children-to-framework-components).

## Configuration

### Configuring the Integration

The Astro Icon integration has its own options for controlling the `Icon` component. Change these in the `astro.config.mjs` file which is where your project's integration settings live.

#### config.include

For users using `output: 'server'` or `output: 'hybrid'`, it is highly recommended to configure the exact icons that should be included in the server bundle. By default, every icon in the set will be bundled into the server JavaScript.

To filter the exact Iconify icons that should be included, set an array of allowed icons inside of the `include` object. Only these icons will be bundled.

**`astro.config.mjs`**

```js
import { defineConfig } from "astro/config";
import icon from "@dallay/astro-icon";

export default defineConfig({
  // ...
  integrations: [
    icon({
      include: {
        mdi: ["*"], // (Default) Loads entire Material Design Icon set
        mdi: ["account"], // Loads only Material Design Icon's "account" SVG
      },
    }),
  ],
});
```

#### config.iconDir

If you want to use a different custom svg icon directory instead of the default `src/icons/`, specify that file path using `config.iconDir`

```js
import { defineConfig } from "astro/config";
import icon from "@dallay/astro-icon";

export default defineConfig({
  // ...
  integrations: [
    icon({
      iconDir: "src/assets/icons",
    }),
  ],
});
```

#### config.svgoOptions

If you want to customize the behavior of `.svg` optimization, you can configure the `svgo` options rather than using the defaults. Read more about the available [`svgo` options here](https://github.com/svg/svgo#configuration).

```js
import { defineConfig } from "astro/config";
import icon from "@dallay/astro-icon";

export default defineConfig({
  // ...
  integrations: [
    icon({
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                // customize default plugin options
                inlineStyles: {
                  onlyMatchedOnce: false,
                },

                // or disable plugins
                removeDoctype: false,
              },
            },
          },
        ],
      },
    }),
  ],
});
```

## Migrating from `astro-icon`

If you are currently using the original `astro-icon` package, migrating to this fork is straightforward:

1. **Swap the package**:

   ```sh
   npm uninstall astro-icon
   npm install @dallay/astro-icon
   ```

2. **Update imports**:

   ```diff
   - import icon from "astro-icon";
   + import icon from "@dallay/astro-icon";

   - import { Icon } from 'astro-icon/components';
   + import { Icon } from '@dallay/astro-icon/components';
   ```

3. **That's it!** — The API surface is fully compatible. No configuration changes needed.

## Contributing

You're welcome to submit an issue or PR!

## Credits

- **[Nate Moore (@natemoo-re)](https://github.com/natemoo-re)** — Original author of [`astro-icon`](https://github.com/natemoo-re/astro-icon)
- **[Jason Miller](https://github.com/developit)** — HTML parser adapted in this project

## License

MIT — see [LICENSE](./LICENSE) for details.

Original work © 2021 Nate Moore. Fork modifications © 2026 dallay.
