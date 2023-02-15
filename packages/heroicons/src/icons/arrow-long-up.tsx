import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconArrowLongUp = component$((props: IconProps) => {
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
      <path d="M8.25 6.75L12 3M12 3L15.75 6.75M12 3V21" />
    </svg>
  );
});
