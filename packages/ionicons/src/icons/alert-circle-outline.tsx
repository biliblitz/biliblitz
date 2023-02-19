import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconAlertCircle = component$((props: IconProps) => {
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
      <path
        d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
      <path
        d="M250.26,166.05,256,288l5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,166.05Z"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path d="M256,367.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Z" />
    </svg>
  );
});
