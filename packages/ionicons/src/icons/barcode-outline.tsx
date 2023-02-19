import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconBarcode = component$((props: IconProps) => {
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
        d="M384,400.33l35.13-.33A29,29,0,0,0,448,371.13V140.87A29,29,0,0,0,419.13,112l-35.13.33"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <path
        d="M128,112l-36.8.33c-15.88,0-27.2,13-27.2,28.87V371.47c0,15.87,11.32,28.86,27.2,28.86L128,400"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="384"
        y1="192"
        x2="384"
        y2="320"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="320"
        y1="160"
        x2="320"
        y2="352"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="256"
        y1="176"
        x2="256"
        y2="336"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="192"
        y1="160"
        x2="192"
        y2="352"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
      <line
        x1="128"
        y1="192"
        x2="128"
        y2="320"
        style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      />
    </svg>
  );
});
