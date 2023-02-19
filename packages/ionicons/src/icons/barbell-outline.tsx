import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconBarbell = component$((props: IconProps) => {
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
      <line
        x1="48"
        y1="256"
        x2="464"
        y2="256"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="384"
        y="128"
        width="32"
        height="256"
        rx="16"
        ry="16"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="96"
        y="128"
        width="32"
        height="256"
        rx="16"
        ry="16"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="32"
        y="192"
        width="16"
        height="128"
        rx="8"
        ry="8"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="464"
        y="192"
        width="16"
        height="128"
        rx="8"
        ry="8"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
