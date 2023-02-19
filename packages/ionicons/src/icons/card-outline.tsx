import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconCard = component$((props: IconProps) => {
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
        y="96"
        width="416"
        height="320"
        rx="56"
        ry="56"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="48"
        y1="192"
        x2="464"
        y2="192"
        style="fill:none;stroke-linejoin:round;stroke-width:60px"
      />
      <rect
        x="128"
        y="300"
        width="48"
        height="20"
        style="fill:none;stroke-linejoin:round;stroke-width:60px"
      />
    </svg>
  );
});
