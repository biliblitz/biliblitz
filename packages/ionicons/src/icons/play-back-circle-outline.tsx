import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconPlayBackCircle = component$((props: IconProps) => {
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
        d="M256,448c106,0,192-86,192-192S362,64,256,64,64,150,64,256,150,448,256,448Z"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
      <path d="M117.23,246.7l114.45-69.14A10.78,10.78,0,0,1,248,186.87v53.32l103.68-62.63A10.78,10.78,0,0,1,368,186.87V325.13a10.78,10.78,0,0,1-16.32,9.31L248,271.81v53.32a10.78,10.78,0,0,1-16.32,9.31L117.23,265.3A10.89,10.89,0,0,1,117.23,246.7Z" />
    </svg>
  );
});
