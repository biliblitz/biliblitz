import { component$ } from "@builder.io/qwik";
import { Link, loader$ } from "@builder.io/qwik-city";
import { IconPlus } from "@railgun/heroicons";
import { checkSession } from "~/utils/db/session";
import { getVideoByUser } from "~/utils/db/video";

export const userVideos$ = loader$(async (event) => {
  const session = event.cookie.get("session");
  if (!session) {
    throw event.error(401, "Unauthorized");
    // throw event.redirect(302, "/login");
  }
  const user = await checkSession(session.value);
  if (!user) {
    // throw event.redirect(302, "/login");
    throw event.error(404, `Invalid session: ${session.value}`);
  }

  const videos = await getVideoByUser(user._id);
  return { videos };
});

export default component$(() => {
  const userVideos = userVideos$.use();

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
      <div class="mt-4">
        <ul>
          {userVideos.value.videos.map((video) => (
            <li key={video._id.toHexString()}>
              <Link href={`/upload/${video._id.toHexString()}`}>
                {video.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
