import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ObjectId } from "mongodb";
import { Player } from "@biliblitz/player";
import { getPublicVideoById } from "~/utils/db/video";
import { assertFound } from "~/utils/assert";
import { loader } from "~/utils/qwik";

export const useEpisode = routeLoader$(
  loader(async ({ params }) => {
    const id = new ObjectId(params.video);
    const video = await getPublicVideoById(id);

    const index = Math.abs(parseInt(params.episode));
    const episode = video.episodes.at(index) ?? null;
    assertFound(episode);

    return episode;
  })
);

export default component$(() => {
  const episode = useEpisode();

  return (
    <Player video={episode.value.source} subtitles={episode.value.subtitles} />
  );
});
