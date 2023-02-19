import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconBan = component$((props: IconProps) => {
  return (
    <svg
      id="icons"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke="currentColor"
      fill="currentColor"
      class={props.class}
    >
      <circle
        cx="256"
        cy="256"
        r="208"
        fill="none"
        stroke-miterlimit="10"
        stroke-width="32"
      />
      <line
        x1="108.92"
        y1="108.92"
        x2="403.08"
        y2="403.08"
        fill="none"
        stroke-miterlimit="10"
        stroke-width="32"
      />
    </svg>
  );
});
