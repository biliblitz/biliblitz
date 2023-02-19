import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconDesktop = component$((props: IconProps) => {
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
        x="32"
        y="64"
        width="448"
        height="320"
        rx="32"
        ry="32"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <polygon
        points="304 448 296 384 216 384 208 448 304 448"
        style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="368"
        y1="448"
        x2="144"
        y2="448"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path d="M32,304v48a32.09,32.09,0,0,0,32,32H448a32.09,32.09,0,0,0,32-32V304Zm224,64a16,16,0,1,1,16-16A16,16,0,0,1,256,368Z" />
    </svg>
  );
});
