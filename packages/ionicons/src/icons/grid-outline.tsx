import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconGrid = component$((props: IconProps) => {
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
        x="48"
        y="48"
        width="176"
        height="176"
        rx="20"
        ry="20"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="288"
        y="48"
        width="176"
        height="176"
        rx="20"
        ry="20"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="48"
        y="288"
        width="176"
        height="176"
        rx="20"
        ry="20"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="288"
        y="288"
        width="176"
        height="176"
        rx="20"
        ry="20"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
