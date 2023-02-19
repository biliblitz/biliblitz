import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconReorderThree = component$((props: IconProps) => {
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
        x1="96"
        y1="256"
        x2="416"
        y2="256"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="96"
        y1="176"
        x2="416"
        y2="176"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="96"
        y1="336"
        x2="416"
        y2="336"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
