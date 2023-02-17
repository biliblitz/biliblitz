import { component$ } from "@builder.io/qwik";
import { loader$, useLocation } from "@builder.io/qwik-city";
import { ObjectId } from "mongodb";
import { checkSession } from "~/utils/db/session";
import { getVideoById } from "~/utils/db/video";

export const video$ = loader$(async (event) => {
  const id = event.params.video;
  if (!ObjectId.isValid(id)) {
    throw event.error(404, "Unexpected param");
  }

  const video = await getVideoById(new ObjectId(id));
  if (!video) {
    throw event.error(404, "Video not found");
  }

  const user = await checkSession(event.cookie.get("session")?.value);
  if (!user) {
    throw event.error(401, "Unauthorized");
  }

  if (video.uploader !== user._id) {
    throw event.error(403, "Permission Denied");
  }

  return { video };
});

export default component$(() => {
  const video = video$.use();

  return <div>{JSON.stringify(video.value.video)}</div>;
});
