import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ObjectId } from "mongodb";
import { NavLink } from "~/components/nav-link/nav-link";
import { assertObjectId } from "~/utils/assert";
import { getPublicVideoById, serializeVideo } from "~/utils/db/video";
import { loader } from "~/utils/qwik";

export const onRequest: RequestHandler = ({ params }) => {
  assertObjectId(params.video);
};

export const useVideo = routeLoader$(
  loader(async ({ params }) => {
    const id = new ObjectId(params.video);
    const video = await getPublicVideoById(id);
    return serializeVideo(video);
  })
);

export default component$(() => {
  const video = useVideo();

  return (
    <div class="flex gap-8">
      <main class="flex-1">
        <Slot />
        <h1 class="my-4 text-2xl font-bold">{video.value.title}</h1>
        <p class="text-sm">
          {video.value.description || (
            <span class="italic opacity-60">No description</span>
          )}
        </p>
      </main>
      <aside class="w-64 shrink-0">
        <nav class="nav px-0">
          <h3 class="nav-title">Episodes</h3>
          {video.value?.episodes.map((episode, index) => (
            <NavLink
              class="nav-item"
              key={index}
              title={episode.name}
              href={`/v/${video.value._id}/${index}/`}
            >
              <span class="overflow-hidden text-ellipsis">
                ep{index + 1}. {episode.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
});
