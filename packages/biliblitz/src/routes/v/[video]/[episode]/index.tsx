import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ObjectId } from "mongodb";
import { Player } from "@biliblitz/player";
import { getPublicVideoById } from "~/utils/db/video";

import { serializeObject } from "~/utils/serialize";

export const useEpisode = routeLoader$(async ({ params, error }) => {
  const id = new ObjectId(params.video);
  const video = (await getPublicVideoById(id))!;

  const index = Math.abs(parseInt(params.episode));
  const episode = video.episodes.at(index);
  if (!episode) {
    throw error(404, "Episode not found");
  }

  return serializeObject(episode);
});

export default component$(() => {
  const episode = useEpisode();

  return (
    <Player video={episode.value.source} subtitles={episode.value.subtitles} />
  );
});
