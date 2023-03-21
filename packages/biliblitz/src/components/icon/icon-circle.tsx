import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

type Props = Pick<QwikIntrinsicElements["svg"], "class">;

export const IconCircle = component$((props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      class={props.class}
    >
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
});
