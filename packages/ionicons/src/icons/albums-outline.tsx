import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconAlbums = component$((props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
      stroke="currentColor"
      fill="currentColor"
      class={props.class}
    >
      <rect
        x="64"
        y="176"
        width="384"
        height="256"
        rx="28.87"
        ry="28.87"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="144"
        y1="80"
        x2="368"
        y2="80"
        style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
      <line
        x1="112"
        y1="128"
        x2="400"
        y2="128"
        style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
