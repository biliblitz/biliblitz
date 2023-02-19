import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconShapes = component$((props: IconProps) => {
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
      <polygon
        points="336 320 32 320 184 48 336 320"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M265.32,194.51A144,144,0,1,1,192,320"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
