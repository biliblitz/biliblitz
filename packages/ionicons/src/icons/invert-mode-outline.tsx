import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconInvertMode = component$((props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke="currentColor"
      fill="currentColor"
      class={props.class}
    >
      <circle
        fill="none"
        stroke-miterlimit="10"
        stroke-width="32"
        cx="256"
        cy="256"
        r="208"
      />
      <path d="M256,176V336a80,80,0,0,1,0-160Z" />
      <path d="M256,48V176a80,80,0,0,1,0,160V464c114.88,0,208-93.12,208-208S370.88,48,256,48Z" />
    </svg>
  );
});
