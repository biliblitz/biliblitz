import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconCaretUpCircle = component$((props: IconProps) => {
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
      <path d="M342.43,273.77,268.3,184.68a16,16,0,0,0-24.6,0l-74.13,89.09A16,16,0,0,0,181.86,300H330.14A16,16,0,0,0,342.43,273.77Z" />
      <path
        d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
