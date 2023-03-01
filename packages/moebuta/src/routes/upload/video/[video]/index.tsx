import {
  component$,
  useBrowserVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import { action$, Form, loader$, z, zod$ } from "@builder.io/qwik-city";
import { IconPlus } from "@moebuta/heroicons";
import { ObjectId } from "mongodb";
import { FormItem } from "~/components/form/form-item";
import { Heading } from "~/components/heading/heading";
import { SubHeading } from "~/components/heading/sub-heading";
import { Modal } from "~/components/modal/modal";
import { toDatetimeLocal } from "~/utils/date";
import { checkSession } from "~/utils/db/session";
import type { File } from "undici";
import {
  createEpisode,
  getVideoByIdAndUser,
  updateVideoProfile,
} from "~/utils/db/video";
import { serializeObject } from "~/utils/serialize";
import { zDatetimeLocal, zTimezone } from "~/utils/zod";
import { Blob } from "buffer";
import { processVideo } from "~/utils/ffmpeg";

export const useVideo = loader$(async ({ params, cookie, error }) => {
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

export const useEditVideoProfile = action$(
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

export const useUploadVideo = action$(async (data, { error, fail, params }) => {
  if (!(data.file instanceof Blob)) {
    throw error(402, "Unexpected File");
  }
  const video = new ObjectId(params.video);

  try {
    const { warnings, source, subtitles } = await processVideo(
      data.file as File
    );
    for (const warn of warnings) {
      console.warn(warn);
    }

    await createEpisode(video, data.name, source, subtitles);

    return { warnings };
  } catch (e) {
    if (e instanceof Error) {
      return fail(402, { reason: `Error while process video: ${e.message}` });
    } else {
      throw e;
    }
  }
}, zod$({ file: z.any(), name: z.string().min(1) }));

export default component$(() => {
  const video = useVideo();
  const editVideoProfile = useEditVideoProfile();
  const uploadVideo = useUploadVideo();

  // use server timezone here
  const times = useSignal(() => ({
    timezone: new Date().getTimezoneOffset(),
    unlockAt: toDatetimeLocal(video.value.unlockAt),
    createAt: toDatetimeLocal(video.value.createAt),
  }));
  // adjust timezone due to user's preference
  useBrowserVisibleTask$(() => {
    times.value.timezone = new Date().getTimezoneOffset();
    times.value.unlockAt = toDatetimeLocal(video.value.unlockAt);
    times.value.createAt = toDatetimeLocal(video.value.createAt);
  });

  const createEpisodeModal = useSignal<HTMLInputElement>();
  const successModal = useSignal<HTMLInputElement>();
  const errorModal = useSignal<HTMLInputElement>();
  useBrowserVisibleTask$(({ track }) => {
    const probe = track(() => uploadVideo.value);

    if (probe) {
      if (createEpisodeModal.value) {
        createEpisodeModal.value.checked = false;
      }
      if (!probe.failed) {
        // success
        if (successModal.value) {
          successModal.value.checked = true;
        }
      } else {
        // failed
        if (errorModal.value) {
          errorModal.value.checked = true;
        }
      }
    }
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
      <SubHeading>Episodes</SubHeading>44:49 / 54:36
      <ul class="mt-4 space-y-4">
        {video.value.episodes.map((episode, index) => (
          <li key={index}>
            #{index + 1} {episode.name}
          </li>
        ))}
      </ul>
      <div>
        <label
          for="new-episode"
          class="grid cursor-pointer place-items-center rounded-md border border-dashed border-slate-300 p-4 opacity-60 transition hover:opacity-100 dark:border-slate-700"
        >
          <IconPlus class="h-16 w-16" />
          <span>Create new episode</span>
        </label>
        <Modal id="new-episode" ref={createEpisodeModal}>
          <SubHeading>Upload a video</SubHeading>
          <Form action={uploadVideo} class="mt-4 space-y-4" spaReset>
            <FormItem field="Title">
              <input type="text" name="name" class="input" required />
            </FormItem>
            <FormItem field="Video">
              <input
                type="file"
                name="file"
                class="input"
                required
                accept="video/*"
              />
            </FormItem>
            <div class="ml-32">
              <button class="btn" disabled={uploadVideo.isRunning}>
                Upload
              </button>
            </div>
          </Form>
        </Modal>

        <Modal id="create-success" ref={successModal}>
          <SubHeading>Success</SubHeading>
          <p class="my-4">Your video has been uploaded successfully.</p>
          <p class="my-4 text-slate-500">
            {uploadVideo.value?.warnings?.map((warn, index) => (
              <span key={index}>
                {warn}
                <br />
              </span>
            ))}
          </p>
          <p class="my-4">Hope everything works for you.</p>
          <div class="flex justify-end">
            <label for="create-success" class="btn-subtle btn" tabIndex={0}>
              Close
            </label>
          </div>
        </Modal>

        <Modal id="create-error" ref={errorModal}>
          <SubHeading>Fail</SubHeading>
          <p class="my-4 text-red-500">
            Your video failed to upload successfully.
          </p>
          <p class="my-4 text-red-500">{uploadVideo.value?.reason}</p>
          <div class="flex justify-end">
            <label for="create-error" class="btn-subtle btn" tabIndex={0}>
              Close
            </label>
          </div>
        </Modal>
      </div>
      {JSON.stringify(video.value)}
    </div>
  );
});
