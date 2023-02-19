import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconEasel = component$((props: IconProps) => {
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
        y="80"
        width="416"
        height="272"
        rx="32"
        ry="32"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="256"
        y1="416"
        x2="256"
        y2="352"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="256"
        y1="80"
        x2="256"
        y2="48"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="400"
        y1="464"
        x2="368"
        y2="352"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="112"
        y1="464"
        x2="144"
        y2="352"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
