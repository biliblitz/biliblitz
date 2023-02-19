import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconTrain = component$((props: IconProps) => {
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
        d="M344,48H320a16,16,0,0,0-16-16H208a16,16,0,0,0-16,16H168a56.16,56.16,0,0,0-56,56V351c0,35.3,144,65,144,65s144-29.7,144-65V104A56,56,0,0,0,344,48ZM256,352a48,48,0,1,1,48-48A48,48,0,0,1,256,352Zm96-160a16,16,0,0,1-16,16H176a16,16,0,0,1-16-16V128a16,16,0,0,1,16-16H336a16,16,0,0,1,16,16Z"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="144"
        y1="464"
        x2="368"
        y2="464"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="336"
        y1="432"
        x2="384"
        y2="480"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="176"
        y1="432"
        x2="128"
        y2="480"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
