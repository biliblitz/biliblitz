import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconArrowUp = component$((props: IconProps) => {
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
        points="112 244 256 100 400 244"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
      />
      <line
        x1="256"
        y1="120"
        x2="256"
        y2="412"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
      />
    </svg>
  );
});
