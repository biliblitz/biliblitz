import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconHappy = component$((props: IconProps) => {
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
      <circle cx="184" cy="232" r="24" />
      <path d="M256.05,384c-45.42,0-83.62-29.53-95.71-69.83A8,8,0,0,1,168.16,304H343.85a8,8,0,0,1,7.82,10.17C339.68,354.47,301.47,384,256.05,384Z" />
      <circle cx="328" cy="232" r="24" />
      <circle
        cx="256"
        cy="256"
        r="208"
        style="fill:none;stroke-miterlimit:10;stroke-width:32px"
      />
    </svg>
  );
});
