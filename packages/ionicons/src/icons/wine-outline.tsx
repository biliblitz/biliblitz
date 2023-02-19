import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconWine = component$((props: IconProps) => {
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
        d="M398.57,80H113.43V96S87.51,272,256,272,398.57,96,398.57,96Z"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="256"
        y1="272"
        x2="256"
        y2="432"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="352"
        y1="432"
        x2="160"
        y2="432"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="112"
        y1="160"
        x2="400"
        y2="160"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
