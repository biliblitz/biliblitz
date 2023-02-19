import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconResize = component$((props: IconProps) => {
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
        points="304 96 416 96 416 208"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="405.77"
        y1="106.2"
        x2="111.98"
        y2="400.02"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <polyline
        points="208 416 96 416 96 304"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
