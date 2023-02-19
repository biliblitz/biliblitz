import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconArrowForward = component$((props: IconProps) => {
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
        points="268 112 412 256 268 400"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
      />
      <line
        x1="392"
        y1="256"
        x2="100"
        y2="256"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
      />
    </svg>
  );
});
