import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconStatsChart = component$((props: IconProps) => {
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
        y="320"
        width="48"
        height="160"
        rx="8"
        ry="8"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="288"
        y="224"
        width="48"
        height="256"
        rx="8"
        ry="8"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="400"
        y="112"
        width="48"
        height="368"
        rx="8"
        ry="8"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="176"
        y="32"
        width="48"
        height="448"
        rx="8"
        ry="8"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
