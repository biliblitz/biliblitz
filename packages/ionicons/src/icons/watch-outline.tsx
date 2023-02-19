import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconWatch = component$((props: IconProps) => {
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
        x="112"
        y="112"
        width="288"
        height="288"
        rx="64"
        ry="64"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M176,112V40a8,8,0,0,1,8-8H328a8,8,0,0,1,8,8v72"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M336,400v72a8,8,0,0,1-8,8H184a8,8,0,0,1-8-8V400"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
