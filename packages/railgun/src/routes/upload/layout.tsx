import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex gap-8">
      <main class="flex-1">
        <Slot />
      </main>
      <aside class="w-64 shrink-0">hello world</aside>
    </div>
  );
});
