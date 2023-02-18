import { component$, Slot } from "@builder.io/qwik";

export const SubHeading = component$(() => {
  return (
    <h3 class="text-xl font-bold">
      <Slot />
    </h3>
  );
});
