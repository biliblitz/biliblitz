import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconCheckbox = component$((props: IconProps) => {
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
        points="352 176 217.6 336 160 272"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="64"
        y="64"
        width="384"
        height="384"
        rx="48"
        ry="48"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
