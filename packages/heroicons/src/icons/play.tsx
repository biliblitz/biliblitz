import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconPlay = component$((props: IconProps) => {
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
      <path d="M5.25 5.65297C5.25 4.79729 6.1674 4.25486 6.91716 4.66723L18.4577 11.0145C19.2349 11.442 19.2349 12.5586 18.4577 12.986L6.91716 19.3334C6.1674 19.7457 5.25 19.2033 5.25 18.3476V5.65297Z" />
    </svg>
  );
});
