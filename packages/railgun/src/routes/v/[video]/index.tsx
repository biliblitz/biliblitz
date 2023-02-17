import { component$ } from "@builder.io/qwik";
import { loader$, useLocation } from "@builder.io/qwik-city";
import { IconNoSymbol } from "@railgun/heroicons";
import { ObjectId } from "mongodb";

import { getVideoById } from "~/utils/db/video";

export const video$ = loader$(async (event) => {
  const id = event.params.video;
  if (!ObjectId.isValid(id)) {
    throw event.error(404, "Unexpected param");
  }

  const video = await getVideoById(new ObjectId(event.params.video));

  if (!video) {
    throw event.error(404, "Video not Found");
  }

  return { video };
});

export default component$(() => {
  const video = video$.use();
  const loc = useLocation();

  const p = parseInt(loc.query.get("p") || "1");
  const active =
    video.value.video?.episodes.at(p) || video.value.video?.episodes.at(0);

  return (
    <div class="flex gap-8">
      <main class="flex-1">
        <div class="grid aspect-video place-items-center bg-slate-300 dark:bg-slate-700">
          {active ? (
            <video autoPlay controls class="h-full w-full">
              <source type="video/mp4" src="/av170001.mp4" />
            </video>
          ) : (
            <div class="space-y-4 text-center">
              <IconNoSymbol class="h-32 w-32" />
              <p class="text-xl">No Episodes</p>
            </div>
          )}
        </div>
        <h1 class="my-4 text-2xl font-bold">{video.value.video?.title}</h1>
      </main>
      <aside class="w-64 shrink-0">
        <nav class="nav px-0">
          <h3 class="nav-title">Episodes</h3>
          <div class="max-h-96 w-full overflow-auto">
            {video.value.video?.episodes.map((episode, index) => (
              <li
                class={["nav-item", { active: episode === active }]}
                key={index}
                title={episode.name}
              >
                <span class="overflow-hidden text-ellipsis">
                  {episode.name}
                </span>
              </li>
            ))}
          </div>
        </nav>
      </aside>
    </div>
  );
});
