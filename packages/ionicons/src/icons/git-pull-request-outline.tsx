import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconGitPullRequest = component$((props: IconProps) => {
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
      <circle
        cx="128"
        cy="416"
        r="48"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="128"
        y1="144"
        x2="128"
        y2="368"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <polyline
        points="288 160 224 96 288 32"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <circle
        cx="128"
        cy="96"
        r="48"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <circle
        cx="384"
        cy="416"
        r="48"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M240,96h84a60,60,0,0,1,60,60V368"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
