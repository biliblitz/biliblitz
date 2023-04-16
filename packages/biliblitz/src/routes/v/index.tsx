import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Heading } from "~/components/heading/heading";
import { getPublicVideoRandom, serializeVideo } from "~/utils/db/video";
import { loader } from "~/utils/qwik";

export const useVideos = routeLoader$(
  loader(async () => {
    const videos = await getPublicVideoRandom();
    return videos.map(serializeVideo);
  })
);

export default component$(() => {
  const videos = useVideos();

  return (
    <article>
      <Heading>Recommendations</Heading>
      <div class="my-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {videos.value?.map((video) => (
          <div class="space-y-1 text-sm" key={video._id}>
            <Link
              href={`/v/${video._id}`}
              class="space-y-3 transition"
              title={video.title}
            >
              <div class="aspect-video rounded-md bg-slate-300 dark:bg-slate-700" />
              <div class="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                {video.title}
              </div>
            </Link>
            <Link
              href={`/u/xxxx`}
              class="flex flex-wrap items-center gap-1 text-slate-400 transition dark:text-slate-500"
            >
              <span>Alice</span>
              <span>-</span>
              <span>{video.unlockAt.toLocaleDateString()}</span>
            </Link>
          </div>
        ))}
      </div>
    </article>
  );
});
