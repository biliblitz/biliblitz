import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconPauseCircle = component$((props: IconProps) => {
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
        x1="208"
        y1="192"
        x2="208"
        y2="320"
        style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
      <line
        x1="304"
        y1="192"
        x2="304"
        y2="320"
        style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
