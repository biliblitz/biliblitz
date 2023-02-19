import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconColorFilter = component$((props: IconProps) => {
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
      <circle
        cx="256"
        cy="184"
        r="120"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <circle
        cx="344"
        cy="328"
        r="120"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <circle
        cx="168"
        cy="328"
        r="120"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
