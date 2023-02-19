import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconStar = component$((props: IconProps) => {
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
        d="M480,208H308L256,48,204,208H32l140,96L118,464,256,364,394,464,340,304Z"
        style="fill:none;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
