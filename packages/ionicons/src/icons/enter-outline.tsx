import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconEnter = component$((props: IconProps) => {
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
        d="M176,176V136a40,40,0,0,1,40-40H424a40,40,0,0,1,40,40V376a40,40,0,0,1-40,40H216a40,40,0,0,1-40-40V336"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <polyline
        points="272 336 352 256 272 176"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="48"
        y1="256"
        x2="336"
        y2="256"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
