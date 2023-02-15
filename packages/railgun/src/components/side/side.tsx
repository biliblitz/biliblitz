import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { IconComputerDesktop, IconVideoCamera } from "@railgun/heroicons";
import { NavLink } from "~/components/nav-link/nav-link";

export const Side = component$(() => {
  return (
    <aside class="sticky top-0 h-screen w-64 shrink-0 self-start overflow-y-auto border-r border-slate-300 dark:border-slate-700">
      <h2 class="px-8 py-6 text-2xl font-bold">
        <Link href="/">Mikufans</Link>
      </h2>
      <nav class="nav">
        <h3 class="nav-title">Videos</h3>
        <NavLink class="nav-item" href="/v">
          <IconVideoCamera class="h-4 w-4" />
          Videos
        </NavLink>
        <NavLink class="nav-item" href="/u/anime">
          <IconComputerDesktop class="h-4 w-4" />
          Anime
        </NavLink>
      </nav>
    </aside>
  );
});
