import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconJournal = component$((props: IconProps) => {
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
        x="96"
        y="48"
        width="320"
        height="416"
        rx="48"
        ry="48"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="320"
        y1="48"
        x2="320"
        y2="464"
        style="fill:none;stroke-linejoin:round;stroke-width:60px"
      />
    </svg>
  );
});
