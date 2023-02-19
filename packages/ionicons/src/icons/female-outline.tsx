import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconFemale = component$((props: IconProps) => {
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
        r="152"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      />
      <line
        x1="256"
        y1="336"
        x2="256"
        y2="480"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      />
      <line
        x1="314"
        y1="416"
        x2="198"
        y2="416"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      />
    </svg>
  );
});
