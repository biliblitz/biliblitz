import { component$, useClientEffect$, useSignal } from "@builder.io/qwik";
import { action$, Form, loader$, z, zod$ } from "@builder.io/qwik-city";
import { IconPlus } from "@railgun/heroicons";
import { ObjectId } from "mongodb";
import { FormItem } from "~/components/form/form-item";
import { Heading } from "~/components/heading/heading";
import { SubHeading } from "~/components/heading/sub-heading";
import { Modal } from "~/components/modal/modal";
import { toDatetimeLocal } from "~/utils/date";
import { checkSession } from "~/utils/db/session";
import {
  createEpisode,
  getVideoByIdAndUser,
  updateVideoProfile,
} from "~/utils/db/video";
import { serializeObject } from "~/utils/serialize";
import { zDatetimeLocal, zTimezone } from "~/utils/zod";

export const video$ = loader$(async ({ params, cookie, error }) => {
  const id = new ObjectId(params.video);

  const user = await checkSession(cookie);
  if (!user) {
    throw error(401, "Unauthorized");
  }

  const video = await getVideoByIdAndUser(id, user._id);
  if (!video) {
    throw error(404, "Video not found");
  }

  return serializeObject(video);
});

export const editVideoProfile$ = action$(
  async (data, event) => {
    const video = new ObjectId(event.params.video);
    await updateVideoProfile(video, {
      $set: {
        title: data.title,
        description: data.description,
        unlockAt: new Date(data.unlockAt + data.timezone),
      },
    });
  },
  zod$({
    title: z.string().min(1),
    description: z.string().min(1),
    unlockAt: zDatetimeLocal,
    timezone: zTimezone,
  })
);

export const createEpisode$ = action$(async (data, { params, error }) => {
  const video = new ObjectId(params.video);
  const episode = await createEpisode(video, data.name);
  if (!episode.acknowledged) {
    throw error(500, "Database Error");
  }
  return { success: true };
}, zod$({ name: z.string().min(1) }));

export default component$(() => {
  const video = video$.use();
  const editVideoProfile = editVideoProfile$.use();
  const createEpisode = createEpisode$.use();

  // use server timezone here
  const times = useSignal(() => ({
    timezone: new Date().getTimezoneOffset(),
    unlockAt: toDatetimeLocal(video.value.unlockAt),
    createAt: toDatetimeLocal(video.value.createAt),
  }));
  // adjust timezone due to user's preference
  useClientEffect$(() => {
    times.value.timezone = new Date().getTimezoneOffset();
    times.value.unlockAt = toDatetimeLocal(video.value.unlockAt);
    times.value.createAt = toDatetimeLocal(video.value.createAt);
  });

  return (
    <div class="space-y-4">
      <Heading>Video - {video.value.title}</Heading>

      <SubHeading>Profiles</SubHeading>
      <Form action={editVideoProfile} class="space-y-2">
        <FormItem field="Title">
          <input
            type="text"
            name="title"
            class="input"
            value={video.value.title}
            required
          />
        </FormItem>
        <FormItem field="Description">
          <input
            type="text"
            name="description"
            class="input"
            value={video.value.description}
            required
          />
        </FormItem>
        <FormItem field="Unlock Time">
          <input
            type="datetime-local"
            name="unlockAt"
            class="input"
            min={times.value.createAt}
            value={times.value.unlockAt}
            required
          />
          <input name="timezone" hidden value={times.value.timezone} />
        </FormItem>
        <button class="btn ml-32" disabled={editVideoProfile.isRunning}>
          Update
        </button>
      </Form>

      <SubHeading>Episodes</SubHeading>
      <ul class="mt-4 space-y-4">
        {video.value.episodes.map((episode, index) => (
          <li key={index}>
            #{index + 1} {episode.name}
          </li>
        ))}
      </ul>
      <label
        for="new-episode"
        class="grid cursor-pointer place-items-center rounded-md border border-dashed border-slate-300 p-4 opacity-60 transition hover:opacity-100 dark:border-slate-700"
      >
        <IconPlus class="h-16 w-16" />
        <span>Create new episode</span>
      </label>
      <Modal id="new-episode">
        <SubHeading>Create new episode</SubHeading>
        <Form action={createEpisode} class="mt-4" spaReset>
          <input
            type="text"
            name="name"
            class="input"
            placeholder="Name..."
            required
          />
          <div class="mt-4 flex justify-end">
            <button class="btn">确认</button>
          </div>
        </Form>
      </Modal>

      {JSON.stringify(video.value)}
    </div>
  );
});
