import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconCart = component$((props: IconProps) => {
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
      <circle
        cx="176"
        cy="416"
        r="16"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <circle
        cx="400"
        cy="416"
        r="16"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <polyline
        points="48 80 112 80 160 352 416 352"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M160,288H409.44a8,8,0,0,0,7.85-6.43l28.8-144a8,8,0,0,0-7.85-9.57H128"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
