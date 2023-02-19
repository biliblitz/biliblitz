import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconDocument = component$((props: IconProps) => {
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
        d="M416,221.25V416a48,48,0,0,1-48,48H144a48,48,0,0,1-48-48V96a48,48,0,0,1,48-48h98.75a32,32,0,0,1,22.62,9.37L406.63,198.63A32,32,0,0,1,416,221.25Z"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M256,56V176a32,32,0,0,0,32,32H408"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
