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
import { File } from "undici";
import {
  createEpisode,
  getVideoByIdAndUser,
  updateVideoProfile,
} from "~/utils/db/video";
import { serializeObject } from "~/utils/serialize";
import { zDatetimeLocal, zTimezone } from "~/utils/zod";
import { Blob } from "buffer";
import { randomUUID } from "crypto";
import { rm, unlink, writeFile } from "fs/promises";
import { ffprobe } from "~/utils/ffmpeg";

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

export const uploadVideo$ = action$(async (data, { error }) => {
  if (!(data.file instanceof Blob)) {
    throw error(402, "Unexpected File");
  }
  const file = data.file as File;

  let filename = `public/${randomUUID()}`;
  switch (file.type) {
    case "video/mp4":
      filename += ".mp4";
      break;
    case "video/x-flv":
      filename += ".flv";
      break;
    case "video/x-matroska":
      filename += ".mkv";
      break;
    case "video/webm":
      filename += ".webm";
      break;
    default:
      throw error(
        402,
        "Unsupported Video Encoding: only flv/mp4/mkv/webm supported"
      );
  }

  await writeFile(filename, Buffer.from(await file.arrayBuffer()));
  console.log("fuck you");
  const probe = await ffprobe(filename);
  console.log("fuck you");
  console.log(probe);
  console.log("fuck you");
  await rm(filename);
  return probe;
}, zod$({ file: z.any() }));

export const createEpisode$ = action$(async (data, { params, error }) => {
  const video = new ObjectId(params.video);

  // const episode = await createEpisode(video, data.name);
  // if (!episode.acknowledged) {
  //   throw error(500, "Database Error");
  // }
  // return { success: true };
}, zod$({ name: z.string().min(1), file: z.any() }));

export default component$(() => {
  const video = video$.use();
  const editVideoProfile = editVideoProfile$.use();
  const createEpisode = createEpisode$.use();
  const uploadVideo = uploadVideo$.use();

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
        <SubHeading>Upload a video</SubHeading>
        <Form action={uploadVideo} class="mt-4 space-y-4" spaReset>
          <FormItem field="Video">
            <input type="file" name="file" class="input" accept="video/*" />
          </FormItem>
          <div class="ml-32">
            <button class="btn">Upload</button>
          </div>
        </Form>
      </Modal>

      {JSON.stringify(video.value)}
    </div>
  );
});
