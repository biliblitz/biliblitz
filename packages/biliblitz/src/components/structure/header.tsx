import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HiMagnifyingGlass, IoCloudUpload } from "@biliblitz/icons";
import { useAuthorizedUser } from "~/routes/layout";

export const Header = component$(() => {
  const authorizedUser = useAuthorizedUser();

  return (
    <header class="sticky top-0 z-[5] flex justify-between bg-white px-8 py-4 dark:bg-slate-900">
      <div class="relative flex items-center">
        <input class="input border-none pl-8" placeholder="Search ..." />
        <HiMagnifyingGlass class="absolute left-2 h-4 w-4" />
      </div>
      {authorizedUser.value === null ? (
        <div class="flex gap-4">
          <Link class="btn-subtle btn" href="/login">
            Login
          </Link>
          <Link class="btn" href="/register">
            Register
          </Link>
        </div>
      ) : (
        <div class="flex gap-4">
          <Link href={`/u/${authorizedUser.value._id}`} class="btn btn-ghost">
            {authorizedUser.value.username}
          </Link>
          <Link href="/upload" class="btn">
            <IoCloudUpload class="h-4 w-4" />
            Upload
          </Link>
        </div>
      )}
    </header>
  );
});
