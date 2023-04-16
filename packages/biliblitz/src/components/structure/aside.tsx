import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HiComputerDesktop, HiVideoCamera } from "@biliblitz/icons";
import { NavLink } from "~/components/nav-link/nav-link";

export const Aside = component$(() => {
  return (
    <aside class="sticky top-0 h-screen w-64 shrink-0 self-start overflow-y-auto border-r border-slate-300 dark:border-slate-700">
      <h2 class="px-8 py-6 text-2xl font-bold">
        <Link href="/">biliblitz</Link>
      </h2>
      <nav class="nav">
        <h3 class="nav-title">Videos</h3>
        <NavLink class="nav-item" href="/v">
          <HiVideoCamera class="h-4 w-4" />
          Videos
        </NavLink>
        <NavLink class="nav-item" href="/u/anime">
          <HiComputerDesktop class="h-4 w-4" />
          Anime
        </NavLink>
      </nav>
    </aside>
  );
});
