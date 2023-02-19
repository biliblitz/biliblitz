import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconInformationCircle = component$((props: IconProps) => {
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
        d="M248,64C146.39,64,64,146.39,64,248s82.39,184,184,184,184-82.39,184-184S349.61,64,248,64Z"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
      <polyline
        points="220 220 252 220 252 336"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="208"
        y1="340"
        x2="296"
        y2="340"
        style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
      <path d="M248,130a26,26,0,1,0,26,26A26,26,0,0,0,248,130Z" />
    </svg>
  );
});
