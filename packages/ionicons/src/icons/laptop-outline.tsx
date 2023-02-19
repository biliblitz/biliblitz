import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconLaptop = component$((props: IconProps) => {
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
        height="304"
        rx="32.14"
        ry="32.14"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="16"
        y1="416"
        x2="496"
        y2="416"
        style="stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
