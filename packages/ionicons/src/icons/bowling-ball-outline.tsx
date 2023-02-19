import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconBowlingBall = component$((props: IconProps) => {
  return (
    <svg
      id="icons"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke="currentColor"
      fill="currentColor"
      class={props.class}
    >
      <circle
        cx="256"
        cy="256"
        r="208"
        fill="none"
        stroke-miterlimit="10"
        stroke-width="32"
      />
      <circle cx="288" cy="200" r="24" />
      <circle cx="296" cy="128" r="24" />
      <circle cx="360" cy="168" r="24" />
    </svg>
  );
});
