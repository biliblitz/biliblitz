import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconNavigate = component$((props: IconProps) => {
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
        d="M448,64,64,240.14H264a8,8,0,0,1,8,8V448Z"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
