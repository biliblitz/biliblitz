import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconFlash = component$((props: IconProps) => {
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
        d="M315.27,33,96,304H224L192.49,477.23a2.36,2.36,0,0,0,2.33,2.77h0a2.36,2.36,0,0,0,1.89-.95L416,208H288L319.66,34.75A2.45,2.45,0,0,0,317.22,32h0A2.42,2.42,0,0,0,315.27,33Z"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
