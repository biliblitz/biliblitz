import { component$, Slot } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import { Footer } from "~/components/footer/footer";
import { Side } from "~/components/side/side";

import Header from "../components/header/header";

export default component$(() => {
  return (
    <div class="flex">
      <Side />
      <div class="flex min-h-screen flex-1 flex-col">
        <Header />
        <main class="flex-1 p-8">
          <Slot />
        </main>
        <Footer />
      </div>
    </div>
  );
});
