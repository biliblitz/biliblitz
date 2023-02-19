import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconWifi = component$((props: IconProps) => {
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
        d="M332.41,310.59a115,115,0,0,0-152.8,0"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M393.46,249.54a201.26,201.26,0,0,0-274.92,0"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M447.72,182.11a288,288,0,0,0-383.44,0"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path d="M256,416a32,32,0,1,1,32-32A32,32,0,0,1,256,416Z" />
    </svg>
  );
});
