import { component$ } from "@builder.io/qwik";
import { Link, loader$, useLocation } from "@builder.io/qwik-city";
import { IconNoSymbol } from "@railgun/heroicons";
import { ObjectId } from "mongodb";
import { Player } from "~/components/player/player";
import { getPublicVideoById } from "~/utils/db/video";

import { serializeObject } from "~/utils/serialize";

export const video$ = loader$(async (event) => {
  const id = event.params.video;
  if (!ObjectId.isValid(id)) {
    throw event.error(404, "Unexpected param");
  }

  const video = await getPublicVideoById(new ObjectId(event.params.video));

  if (!video) {
    throw event.error(404, "Video not Found");
  }

  return serializeObject(video);
});

export default component$(() => {
  const video = video$.use();
  const loc = useLocation();

  const p = parseInt(loc.query.get("p") || "0");
  const active = video.value?.episodes.at(p) || video.value?.episodes.at(0);

  return (
    <div class="flex gap-8">
      <main class="flex-1">
        {active ? (
          <Player video={[{ mimetype: "video/mp4", source: "/ending.mp4" }]} />
        ) : (
          <div class="grid aspect-video w-full place-items-center space-y-4 bg-slate-300 text-center dark:bg-slate-700">
            <div>
              <IconNoSymbol class="mx-auto h-16 w-16" />
              <p class="text-sm">No Episodes</p>
            </div>
          </div>
        )}
        <h1 class="my-4 text-2xl font-bold">{video.value?.title}</h1>
      </main>
      <aside class="w-64 shrink-0">
        <nav class="nav px-0">
          <h3 class="nav-title">Episodes</h3>
          <div class="max-h-96 w-full">
            {video.value?.episodes.map((episode, index) => (
              <Link
                class={["nav-item", { active: episode === active }]}
                key={index}
                title={episode.name}
                href={`?p=${index}`}
              >
                <span class="overflow-hidden text-ellipsis">
                  #{index + 1} {episode.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </div>
  );
});
