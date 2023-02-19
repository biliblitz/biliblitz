import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconToggle = component$((props: IconProps) => {
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
        cx="368"
        cy="256"
        r="128"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <rect
        x="16"
        y="128"
        width="480"
        height="256"
        rx="128"
        ry="128"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
