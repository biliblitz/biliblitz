import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconPencil = component$((props: IconProps) => {
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
      <polygon
        points="364.13 125.25 87 403 64 448 108.99 425 386.75 147.87 364.13 125.25"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M420.69,68.69,398.07,91.31l22.62,22.63,22.62-22.63a16,16,0,0,0,0-22.62h0A16,16,0,0,0,420.69,68.69Z"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
