import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconCloseCircle = component$((props: IconProps) => {
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
      <path
        d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
      <line
        x1="320"
        y1="320"
        x2="192"
        y2="192"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="192"
        y1="320"
        x2="320"
        y2="192"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
