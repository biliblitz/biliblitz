import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { loader$ } from "@builder.io/qwik-city";
import { ObjectId } from "mongodb";
import { NavLink } from "~/components/nav-link/nav-link";
import { getPublicVideoById } from "~/utils/db/video";
import { serializeObject } from "~/utils/serialize";

export const onRequest: RequestHandler = ({ params, error }) => {
  const video = params.video;

  if (!ObjectId.isValid(video)) {
    throw error(404, "Unexpected param");
  }
};

export const video$ = loader$(async ({ params, error }) => {
  const id = new ObjectId(params.video);
  const video = await getPublicVideoById(id);

  if (!video) {
    throw error(404, "Video not found");
  }

  return serializeObject(video);
});

export default component$(() => {
  const video = video$.use();

  return (
    <div class="flex gap-8">
      <main class="flex-1">
        <Slot />
        <h1 class="my-4 text-2xl font-bold">{video.value.title}</h1>
      </main>
      <aside class="w-64 shrink-0">
        <nav class="nav px-0">
          <h3 class="nav-title">Episodes</h3>
          {video.value?.episodes.map((episode, index) => (
            <NavLink
              class="nav-item"
              key={index}
              title={episode.name}
              href={`/v/${video.value._id}/${index}`}
            >
              <span class="overflow-hidden text-ellipsis">
                #{index + 1} {episode.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
});
