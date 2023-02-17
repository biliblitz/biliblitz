import { component$ } from "@builder.io/qwik";
import { Link, loader$ } from "@builder.io/qwik-city";
import { IconPlayCircle, IconUser } from "@railgun/heroicons";
import { getVideoRandom } from "~/utils/db/video";
import { serializeId } from "~/utils/serialize";

export const videos$ = loader$(async () => {
  const videos = await getVideoRandom();
  return serializeId(videos);
});

export default component$(() => {
  const videos = videos$.use();

  return (
    <article>
      <h2 class="text-2xl font-bold">Recommendations</h2>
      <div class="my-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {videos.value?.map((video) => (
          <div class="space-y-2" key={video._id}>
            <Link
              href={`/v/${video._id}`}
              class="space-y-2 transition hover:underline"
              title={video.title}
            >
              <div class="aspect-video rounded-md bg-slate-300 dark:bg-slate-700" />
              <div class="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                {video.title}
              </div>
            </Link>
            <Link
              href={`/u/xxxx`}
              class="flex flex-wrap items-center gap-4 text-sm text-slate-500 transition hover:underline"
            >
              <div class="flex items-center gap-1">
                <IconUser class="h-4 w-4" />
                <span>Alice</span>
              </div>
              <div class="flex items-center gap-1">
                <IconPlayCircle class="h-4 w-4" />
                <span>{new Intl.NumberFormat().format(video.plays)}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </article>
  );
});
