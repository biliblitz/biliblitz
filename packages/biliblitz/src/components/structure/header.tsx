import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HiMagnifyingGlass } from "@biliblitz/icons";

export const Header = component$(() => {
  return (
    <header class="sticky top-0 z-[5] flex justify-between bg-white px-8 py-4 dark:bg-slate-900">
      <div class="relative flex items-center">
        <input class="input border-none pl-8" placeholder="Search ..." />
        <HiMagnifyingGlass class="absolute left-2 h-4 w-4" />
      </div>
      <div class="flex gap-4">
        <Link class="btn-subtle btn" href="/login">
          Login
        </Link>
        <Link class="btn" href="/register">
          Register
        </Link>
      </div>
    </header>
  );
});
