import { component$ } from "@builder.io/qwik";
import { Link, loader$ } from "@builder.io/qwik-city";
import { IconPlus } from "@moebuta/heroicons";
import { checkSession } from "~/utils/db/session";
import { getVideoByUser } from "~/utils/db/video";
import { serializeObject } from "~/utils/serialize";

export const useUserVideos = loader$(async ({ cookie, redirect }) => {
  const user = await checkSession(cookie);
  if (!user) {
    throw redirect(302, "/login");
  }

  const videos = await getVideoByUser(user._id);
  return videos.map(serializeObject);
});

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
          <IconPlus class="mx-auto h-16 w-16" />
          <div>Create a new Video</div>
        </div>
      </Link>
      <div class="mt-4 space-y-4">
        {userVideos.value.map((video) => (
          <Link
            class="flex gap-4 rounded-xl transition hover:underline"
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
