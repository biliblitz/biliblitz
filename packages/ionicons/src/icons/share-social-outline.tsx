import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconShareSocial = component$((props: IconProps) => {
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
        cx="128"
        cy="256"
        r="48"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <circle
        cx="384"
        cy="112"
        r="48"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <circle
        cx="384"
        cy="400"
        r="48"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="169.83"
        y1="279.53"
        x2="342.17"
        y2="376.47"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="342.17"
        y1="135.53"
        x2="169.83"
        y2="232.47"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
