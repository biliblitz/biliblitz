import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconBagCheck = component$((props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke="currentColor"
      fill="currentColor"
      class={props.class}
    >
      <polyline
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        points="320 264 230.4 376 192 331.12"
      />
      <path
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        fill-rule="evenodd"
        d="M80,176a16,16,0,0,0-16,16V408c0,30.24,25.76,56,56,56H392c30.24,0,56-24.51,56-54.75V192a16,16,0,0,0-16-16Z"
      />
      <path
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        fill-rule="evenodd"
        d="M160,176V144a96,96,0,0,1,96-96h0a96,96,0,0,1,96,96v32"
      />
    </svg>
  );
});
