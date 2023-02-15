import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconArrowSmallDown = component$((props: IconProps) => {
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
      <path d="M12 4.5V19.5M12 19.5L18.75 12.75M12 19.5L5.25 12.75" />
    </svg>
  );
});
