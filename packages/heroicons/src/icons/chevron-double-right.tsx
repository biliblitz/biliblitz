import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconChevronDoubleRight = component$((props: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width={props.strokeWidth ?? 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
    >
      <path d="M11.25 4.5L18.75 12L11.25 19.5M5.25 4.5L12.75 12L5.25 19.5" />
    </svg>
  );
});
