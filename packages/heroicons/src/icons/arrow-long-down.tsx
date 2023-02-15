import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconArrowLongDown = component$((props: IconProps) => {
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
      <path d="M15.75 17.25L12 21M12 21L8.25 17.25M12 21L12 3" />
    </svg>
  );
});
