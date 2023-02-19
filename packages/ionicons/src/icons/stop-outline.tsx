import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconStop = component$((props: IconProps) => {
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
        y="96"
        width="320"
        height="320"
        rx="24"
        ry="24"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
