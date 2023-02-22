# @moebuta/heroicons

[Heroicons](https://github.com/tailwindlabs/heroicons) library for Qwik.

This library only contains 24x24 outlined icons.

## Install

```bash
yarn add @moebuta/heroicons
```

## Usage

Every components have a prefix `Icon`, and you can pass `class` and `strokeWidth` to it.

Default strokeWidth is set to `2` (original `1.5`).

```jsx
import { IconCamera } from "@moebuta/heroicons";

<IconCamera class="h-4 w-4" strokeWidth={2} />;
```
