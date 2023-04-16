import { component$, Slot } from "@builder.io/qwik";
import { Aside } from "~/components/structure/aside";
import { Footer } from "~/components/structure/footer";
import { Header } from "~/components/structure/header";

import { loader } from "~/utils/qwik";
import { checkSession } from "~/utils/db/session";
import { serializeUser } from "~/utils/db/user";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useAuthorizedUser = routeLoader$(
  loader(async ({ cookie }) => {
    const user = await checkSession(cookie);
    return user && serializeUser(user);
  })
);

export default component$(() => {
  return (
    <div class="flex">
      <Aside />
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
