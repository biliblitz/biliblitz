import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconDisc = component$((props: IconProps) => {
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
        cx="256"
        cy="256"
        r="208"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
      <circle
        cx="256"
        cy="256"
        r="96"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
      <circle cx="256" cy="256" r="32" />
    </svg>
  );
});
