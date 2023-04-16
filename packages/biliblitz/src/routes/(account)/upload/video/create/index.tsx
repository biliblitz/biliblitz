import { component$ } from "@builder.io/qwik";
import { routeAction$, Form, z, zod$ } from "@builder.io/qwik-city";
import { FormItem } from "~/components/form/form-item";
import { assertAcknowledged, assertAuthorized } from "~/utils/assert";
import { checkSession } from "~/utils/db/session";
import { createVideo } from "~/utils/db/video";
import { ActionRedirect, action } from "~/utils/qwik";

export const useCreateVideo = routeAction$(
  action(async (data, { cookie }) => {
    const user = await checkSession(cookie);
    assertAuthorized(user);

    const result = await createVideo(user._id, data.title, data.description);
    assertAcknowledged(result);

    throw new ActionRedirect(
      302,
      `/upload/video/${result.insertedId.toHexString()}`
    );
  }),
  zod$({
    title: z.string().min(1),
    description: z.string(),
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
        <FormItem field="Title" required>
          <input type="text" class="input w-96" name="title" required />
        </FormItem>
        <FormItem field="Description">
          <textarea class="input min-h-[8rem] w-96" name="description" />
        </FormItem>
        <button class="btn ml-32">Create</button>
      </Form>
    </div>
  );
});
