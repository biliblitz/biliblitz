import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconContrast = component$((props: IconProps) => {
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
        cy="256"
        r="208"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
      <path d="M256,464C141.12,464,48,370.88,48,256S141.12,48,256,48Z" />
    </svg>
  );
});
