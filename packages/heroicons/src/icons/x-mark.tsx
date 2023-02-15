import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconXMark = component$((props: IconProps) => {
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
      <path d="M6 18L18 6M6 6L18 18" />
    </svg>
  );
});
