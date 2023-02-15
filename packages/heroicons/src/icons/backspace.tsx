import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../utils";

export const IconBackspace = component$((props: IconProps) => {
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
      <path d="M12 9.75L14.25 12M14.25 12L16.5 14.25M14.25 12L16.5 9.75M14.25 12L12 14.25M9.42049 19.1705L3.04549 12.7955C2.60615 12.3562 2.60615 11.6438 3.04549 11.2045L9.42049 4.82951C9.63147 4.61853 9.91762 4.5 10.216 4.5L19.5 4.5C20.7426 4.5 21.75 5.50736 21.75 6.75V17.25C21.75 18.4926 20.7426 19.5 19.5 19.5H10.216C9.91762 19.5 9.63147 19.3815 9.42049 19.1705Z" />
    </svg>
  );
});
