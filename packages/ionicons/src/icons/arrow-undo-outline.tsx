import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconArrowUndo = component$((props: IconProps) => {
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
        d="M240,424V328c116.4,0,159.39,33.76,208,96,0-119.23-39.57-240-208-240V88L64,256Z"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
