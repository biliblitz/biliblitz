import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconChevronUpCircle = component$((props: IconProps) => {
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
      <polyline
        points="352 296 256 200 160 296"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
