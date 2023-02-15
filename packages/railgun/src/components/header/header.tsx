import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { IconMagnifyingGlass } from "@railgun/heroicons";

export default component$(() => {
  return (
    <header class="sticky top-0 flex justify-between py-4 px-8 backdrop-blur">
      <div class="relative flex items-center">
        <input class="input border-none pl-8" placeholder="Search ..." />
        <IconMagnifyingGlass class="absolute left-2 h-4 w-4" />
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
