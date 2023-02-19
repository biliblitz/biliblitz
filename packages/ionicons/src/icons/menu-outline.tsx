import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconMenu = component$((props: IconProps) => {
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
        x1="80"
        y1="160"
        x2="432"
        y2="160"
        style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
      <line
        x1="80"
        y1="256"
        x2="432"
        y2="256"
        style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
      <line
        x1="80"
        y1="352"
        x2="432"
        y2="352"
        style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
