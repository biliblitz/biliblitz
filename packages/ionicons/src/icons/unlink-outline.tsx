import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconUnlink = component$((props: IconProps) => {
  return (
    <svg
      id="icons"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke="currentColor"
      fill="currentColor"
      class={props.class}
    >
      <path
        d="M208,352H144a96,96,0,0,1,0-192h64"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="36"
      />
      <path
        d="M304,160h64a96,96,0,0,1,0,192H304"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="36"
      />
    </svg>
  );
});
