import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconStopwatch = component$((props: IconProps) => {
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
        x1="256"
        y1="232"
        x2="256"
        y2="152"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="256"
        y1="88"
        x2="256"
        y2="72"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
      />
      <line
        x1="132"
        y1="132"
        x2="120"
        y2="120"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
      />
      <circle
        cx="256"
        cy="272"
        r="32"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
      <path
        d="M256,96A176,176,0,1,0,432,272,176,176,0,0,0,256,96Z"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
