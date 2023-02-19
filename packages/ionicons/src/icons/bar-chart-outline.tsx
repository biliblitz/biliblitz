import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconBarChart = component$((props: IconProps) => {
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
      <path
        d="M32,32V464a16,16,0,0,0,16,16H480"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="96"
        y="224"
        width="80"
        height="192"
        rx="20"
        ry="20"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="240"
        y="176"
        width="80"
        height="240"
        rx="20"
        ry="20"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="383.64"
        y="112"
        width="80"
        height="304"
        rx="20"
        ry="20"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
