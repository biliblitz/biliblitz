import { component$ } from "@builder.io/qwik";
import { action$, Form, z, zod$ } from "@builder.io/qwik-city";
import { FormItem } from "~/components/form/form-item";
import { checkSession } from "~/utils/db/session";
import { createVideo } from "~/utils/db/video";

export const useCreateVideo = action$(
  async (data, { cookie, error, redirect }) => {
    const user = await checkSession(cookie);
    if (!user) {
      throw error(401, "Unauthorized");
    }
    const video = await createVideo(user._id, data.title);
    if (!video.acknowledged) {
      throw error(500, "Server Exploded");
    }

    throw redirect(302, `/upload/video/${video.insertedId.toHexString()}`);
  },
  zod$({
    title: z.string(),
  })
);

export default component$(() => {
  const createVideo = useCreateVideo();

  return (
    <div class="space-y-4">
      <h2 class="text-2xl font-bold">Create new video</h2>
      <p class="opacity-60">
        You can upload episodes after creating the video.
      </p>
      <Form action={createVideo} class="space-y-2">
        <FormItem field="Title">
          <input type="text" class="input w-96" name="title" required />
        </FormItem>
        <button class="btn ml-32">Create</button>
      </Form>
    </div>
  );
});
