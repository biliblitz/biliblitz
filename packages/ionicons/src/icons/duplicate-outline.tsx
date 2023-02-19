import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconDuplicate = component$((props: IconProps) => {
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
        x="128"
        y="128"
        width="336"
        height="336"
        rx="57"
        ry="57"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M383.5,128l.5-24a56.16,56.16,0,0,0-56-56H112a64.19,64.19,0,0,0-64,64V328a56.16,56.16,0,0,0,56,56h24"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="296"
        y1="216"
        x2="296"
        y2="376"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="376"
        y1="296"
        x2="216"
        y2="296"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
