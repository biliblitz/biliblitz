import { component$ } from "@builder.io/qwik";
import { action$, Form, z, zod$ } from "@builder.io/qwik-city";
import { checkSession } from "~/utils/db/session";
import { createVideo } from "~/utils/db/video";

export const createVideo$ = action$(
  async (data, event) => {
    const user = await checkSession(event.cookie.get("session")?.value);
    if (!user) {
      throw event.error(401, "Unauthorized");
    }
    const video = await createVideo(user._id, data.title);
    if (!video.acknowledged) {
      throw event.error(500, "Server Exploded");
    }

    throw event.redirect(
      302,
      `/upload/video/${video.insertedId.toHexString()}`
    );
  },
  zod$({
    title: z.string(),
  })
);

export default component$(() => {
  const createVideo = createVideo$.use();

  return (
    <div class="space-y-4">
      <h2 class="text-2xl font-bold">Create new video</h2>
      <p class="opacity-60">
        You can upload episodes after creating the video.
      </p>
      <Form action={createVideo} class="space-y-2">
        <label class="flex items-baseline">
          <span class="w-32">Title</span>
          <input type="text" class="input w-96" name="title" required />
        </label>
        <button class="btn ml-32">Create</button>
      </Form>
    </div>
  );
});
