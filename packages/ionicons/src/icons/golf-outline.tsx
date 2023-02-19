import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconGolf = component$((props: IconProps) => {
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
      <polyline
        points="256 400 256 32 432 112 256 192"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M256,336c-87,0-175.3,43.2-191.64,124.74C62.39,470.57,68.57,480,80,480H432c11.44,0,17.62-9.43,15.65-19.26C431.3,379.2,343,336,256,336Z"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
