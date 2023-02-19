import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconRefreshCircle = component$((props: IconProps) => {
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
        d="M288,193s12.18-6-32-6a80,80,0,1,0,80,80"
        style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:28px"
      />
      <polyline
        points="256 149 296 189 256 229"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:28px"
      />
      <path
        d="M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
