import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconFileTrayStacked = component$((props: IconProps) => {
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
        d="M48,336v96a48.14,48.14,0,0,0,48,48H416a48.14,48.14,0,0,0,48-48V336"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="48"
        y1="336"
        x2="192"
        y2="336"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="320"
        y1="336"
        x2="464"
        y2="336"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M192,336a64,64,0,0,0,128,0"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M384,32H128c-26,0-43,14-48,40L48,192v96a48.14,48.14,0,0,0,48,48H416a48.14,48.14,0,0,0,48-48V192L432,72C427,45,409,32,384,32Z"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="48"
        y1="192"
        x2="192"
        y2="192"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="320"
        y1="192"
        x2="464"
        y2="192"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M192,192a64,64,0,0,0,128,0"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
