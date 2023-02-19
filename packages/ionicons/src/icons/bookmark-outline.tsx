import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconBookmark = component$((props: IconProps) => {
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
      <path
        d="M352,48H160a48,48,0,0,0-48,48V464L256,336,400,464V96A48,48,0,0,0,352,48Z"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
