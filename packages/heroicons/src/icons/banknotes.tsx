import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconBanknotes = component$((props: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width={props.strokeWidth ?? 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
    >
      <path d="M2.25 18.75C7.71719 18.75 13.0136 19.4812 18.0468 20.8512C18.7738 21.0491 19.5 20.5086 19.5 19.7551V18.75M3.75 4.5V5.25C3.75 5.66421 3.41421 6 3 6H2.25M2.25 6V5.625C2.25 5.00368 2.75368 4.5 3.375 4.5H20.25M2.25 6V15M20.25 4.5V5.25C20.25 5.66421 20.5858 6 21 6H21.75M20.25 4.5H20.625C21.2463 4.5 21.75 5.00368 21.75 5.625V15.375C21.75 15.9963 21.2463 16.5 20.625 16.5H20.25M21.75 15H21C20.5858 15 20.25 15.3358 20.25 15.75V16.5M20.25 16.5H3.75M3.75 16.5H3.375C2.75368 16.5 2.25 15.9963 2.25 15.375V15M3.75 16.5V15.75C3.75 15.3358 3.41421 15 3 15H2.25M15 10.5C15 12.1569 13.6569 13.5 12 13.5C10.3431 13.5 9 12.1569 9 10.5C9 8.84315 10.3431 7.5 12 7.5C13.6569 7.5 15 8.84315 15 10.5ZM18 10.5H18.0075V10.5075H18V10.5ZM6 10.5H6.0075V10.5075H6V10.5Z" />
    </svg>
  );
});
