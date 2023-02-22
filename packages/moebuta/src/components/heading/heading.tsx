import { component$, Slot } from "@builder.io/qwik";

export const Heading = component$(() => {
  return (
    <h2 class="text-2xl font-bold">
      <Slot />
    </h2>
  );
});
