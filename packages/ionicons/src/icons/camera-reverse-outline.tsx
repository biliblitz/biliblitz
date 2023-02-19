import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconCameraReverse = component$((props: IconProps) => {
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
        d="M350.54,148.68l-26.62-42.06C318.31,100.08,310.62,96,302,96H210c-8.62,0-16.31,4.08-21.92,10.62l-26.62,42.06C155.85,155.23,148.62,160,140,160H80a32,32,0,0,0-32,32V384a32,32,0,0,0,32,32H432a32,32,0,0,0,32-32V192a32,32,0,0,0-32-32H373C364.35,160,356.15,155.23,350.54,148.68Z"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <polyline
        points="124 158 124 136 100 136 100 158"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M335.76,285.22V271.91a80,80,0,0,0-131-61.6M176,258.78v13.31a80,80,0,0,0,130.73,61.8"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <polyline
        points="196 272 176 252 156 272"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <polyline
        points="356 272 336 292 316 272"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
