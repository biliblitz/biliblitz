# @biliblitz/icons

Icon library for Qwik.

- [Heroicons](https://github.com/tailwindlabs/heroicons)
- [Ionicons](https://github.com/ionic-team/ionicons)

This library only contains outlined icons.

## Install

```bash
yarn add @biliblitz/icons
```

## Usage (Heroicons)

Every components have a prefix `Hi`, and you can pass `class` and `strokeWidth` to it.

Default strokeWidth is set to `2` (original `1.5`).

```jsx
import { HiCamera } from "@biliblitz/icons";

<HiCamera class="h-4 w-4" strokeWidth={2} />;
```

## Usage (Ionicons)

Every components have a prefix `Io`, and you can pass `class` to it.

```jsx
import { IoAlarm } from "@biliblitz/icons";

<IoAlarm class="h-4 w-4" />;
```
