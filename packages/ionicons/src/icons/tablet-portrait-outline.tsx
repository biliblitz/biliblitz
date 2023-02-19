import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconTabletPortrait = component$((props: IconProps) => {
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
        x="80"
        y="16"
        width="352"
        height="480"
        rx="48"
        ry="48"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
