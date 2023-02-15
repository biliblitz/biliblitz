import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconArrowUturnDown = component$((props: IconProps) => {
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
      <path d="M15 15L9 21M9 21L3 15M9 21V9C9 5.68629 11.6863 3 15 3C18.3137 3 21 5.68629 21 9V12" />
    </svg>
  );
});
