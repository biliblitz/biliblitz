import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconChevronDown = component$((props: IconProps) => {
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
      <path d="M19.5 8.25L12 15.75L4.5 8.25" />
    </svg>
  );
});
