import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { HiPlus } from "@biliblitz/icons";
import { checkSession } from "~/utils/db/session";
import { getVideoByUser } from "~/utils/db/video";
import { loader } from "~/utils/qwik";
import { assertAuthorized } from "~/utils/assert";

export const useUserVideos = routeLoader$(
  loader(async ({ cookie }) => {
    const user = await checkSession(cookie);
    assertAuthorized(user);

    return await getVideoByUser(user._id);
  })
);

export default component$(() => {
  const userVideos = useUserVideos();

  return (
    <div>
      <h2 class="text-2xl font-bold">Upload</h2>
      <p class="mt-4 opacity-60">Select a video below or create a new video.</p>

      <Link
        class="mt-4 grid select-none place-items-center rounded-md border border-dashed border-slate-300 py-8 opacity-60 transition hover:opacity-100 dark:border-slate-700"
        href="/upload/video/create"
      >
        <div class="space-y-4">
          <HiPlus class="mx-auto h-16 w-16" />
          <div>Create a new Video</div>
        </div>
      </Link>
      <div class="mt-4 space-y-4">
        {userVideos.value.map((video) => (
          <Link
            class="flex gap-4 hover:underline"
            href={`/upload/video/${video._id}`}
            key={video._id}
          >
            <div class="aspect-video h-32 rounded-md bg-slate-500"></div>
            <div class="space-y-2">
              <h3 class="text-xl font-bold">{video.title}</h3>
              <p class="opacity-60">
                {video.episodes.length} episodes, {video.plays} views
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});
