import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconReorderFour = component$((props: IconProps) => {
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
        y1="304"
        x2="416"
        y2="304"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="96"
        y1="208"
        x2="416"
        y2="208"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="96"
        y1="112"
        x2="416"
        y2="112"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="96"
        y1="400"
        x2="416"
        y2="400"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
