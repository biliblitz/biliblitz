# @biliblitz/player

A player for [Qwik](https://qwik.builder.io) framework.

Features beyond raw `<video />` player:

- Support `ASS` subtitle format (via [@biliblitz/libass-wasm][]).
- Controller for playback rate adjust.
- Controller for multiple subtitle track switch.

## Install

```
yarn add @biliblitz/player
```

Then add `./node_modules/@biliblitz/player/lib/*.{cjs,mjs}` to you tailwind config content.

~~You must be using tailwind, right?~~

```js
// tailwind.config.js
module.exports = {
  content: ["./node_modules/@biliblitz/player/lib/*.{cjs,mjs}"],
};
```

[@biliblitz/libass-wasm]: https://www.npmjs.com/package/@biliblitz/libass-wasm
