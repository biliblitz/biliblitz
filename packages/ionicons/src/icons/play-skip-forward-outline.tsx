import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconPlaySkipForward = component$((props: IconProps) => {
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
        d="M112,111V401c0,17.44,17,28.52,31,20.16l247.9-148.37c12.12-7.25,12.12-26.33,0-33.58L143,90.84C129,82.48,112,93.56,112,111Z"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
      <line
        x1="400"
        y1="80"
        x2="400"
        y2="432"
        style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
