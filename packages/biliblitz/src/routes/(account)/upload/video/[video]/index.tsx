import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import {
  routeAction$,
  Form,
  routeLoader$,
  z,
  zod$,
  Link,
} from "@builder.io/qwik-city";
import { HiPlus } from "@biliblitz/icons";
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
  serializeVideo,
  updateVideoProfile,
} from "~/utils/db/video";
import { zDatetimeLocal, zTimezone } from "~/utils/zod";
import { action, loader } from "~/utils/qwik";
import {
  assertAcknowledged,
  assertAuthorized,
  assertFound,
  assertModifyOk,
} from "~/utils/assert";

export const useVideo = routeLoader$(
  loader(async ({ params, cookie }) => {
    const id = new ObjectId(params.video);

    const user = await checkSession(cookie);
    assertAuthorized(user);

    const video = await getVideoByIdAndUser(id, user._id);
    assertFound(video);

    return serializeVideo(video);
  })
);

export const useEditVideoProfile = routeAction$(
  action(async (data, { params }) => {
    const video = new ObjectId(params.video);
    const result = await updateVideoProfile(video, {
      $set: {
        title: data.title,
        description: data.description,
        unlockAt: new Date(data.unlockAt + data.timezone),
      },
    });
    assertModifyOk(result);
  }),
  zod$({
    title: z.string().min(1),
    description: z.string(),
    unlockAt: zDatetimeLocal,
    timezone: zTimezone,
  })
);

export const useCreateEpisode = routeAction$(
  async (data, { params }) => {
    const video = new ObjectId(params.video);

    const result = await createEpisode(video, data.name);
    assertAcknowledged(result);
  },
  zod$({
    name: z.string(),
  })
);

export default component$(() => {
  const video = useVideo();
  const editVideoProfile = useEditVideoProfile();
  const createEpisode = useCreateEpisode();

  // use server timezone here
  const times = useSignal(() => ({
    timezone: new Date().getTimezoneOffset(),
    unlockAt: toDatetimeLocal(video.value.unlockAt),
    createAt: toDatetimeLocal(video.value.createAt),
  }));
  // adjust timezone due to user's preference
  useVisibleTask$(() => {
    times.value.timezone = new Date().getTimezoneOffset();
    times.value.unlockAt = toDatetimeLocal(video.value.unlockAt);
    times.value.createAt = toDatetimeLocal(video.value.createAt);
  });

  const createEpisodeModal = useSignal<HTMLInputElement>();
  const successModal = useSignal<HTMLInputElement>();
  const errorModal = useSignal<HTMLInputElement>();
  useVisibleTask$(({ track }) => {
    const probe = track(() => createEpisode.value);

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
    <div class="space-y-12">
      <Heading>Video - {video.value.title}</Heading>

      <div class="space-y-4">
        <SubHeading>Profiles</SubHeading>
        <Form action={editVideoProfile} class="space-y-2">
          <FormItem field="Title" required>
            <input
              type="text"
              name="title"
              class="input"
              value={video.value.title}
              required
              disabled={editVideoProfile.isRunning}
            />
          </FormItem>
          <FormItem field="Description">
            <textarea
              name="description"
              class="input min-h-[8rem]"
              value={video.value.description}
              placeholder="No Description"
              disabled={editVideoProfile.isRunning}
            />
          </FormItem>
          <FormItem field="Unlock Time" required>
            <input
              type="datetime-local"
              name="unlockAt"
              class="input"
              min={times.value.createAt}
              value={times.value.unlockAt}
              required
              disabled={editVideoProfile.isRunning}
            />
            <input name="timezone" hidden value={times.value.timezone} />
          </FormItem>
          <button class="btn" disabled={editVideoProfile.isRunning}>
            {editVideoProfile.isRunning ? "Loading..." : "Update Profile"}
          </button>
        </Form>
      </div>

      <div class="space-y-4">
        <SubHeading>Episodes</SubHeading>
        <div>
          <label
            for="new-episode"
            class="grid cursor-pointer place-items-center rounded-md border border-dashed border-slate-300 p-4 opacity-60 transition hover:opacity-100 dark:border-slate-700"
          >
            <HiPlus class="h-16 w-16" />
            <span>Create new episode</span>
          </label>
          <Modal id="new-episode" ref={createEpisodeModal}>
            <SubHeading>Upload a video</SubHeading>
            <Form
              action={createEpisode}
              class="mt-4 space-y-4"
              spaReset
              onSubmitCompleted$={() => createEpisodeModal.value?.click()}
            >
              <FormItem field="Title">
                <input type="text" name="name" class="input" required />
              </FormItem>
              <div class="flex justify-end">
                <button class="btn ml-16" disabled={createEpisode.isRunning}>
                  <HiPlus class="h-4 w-4" />
                  Create Episode
                </button>
              </div>
            </Form>
          </Modal>
        </div>
        <ul class="mt-4 space-y-4">
          {video.value.episodes.map((episode, index) => (
            <li key={index}>
              <Link
                href={`/upload/video/${video.value._id}/${index}`}
                class="flex gap-4"
              >
                <div class="aspect-video h-32 rounded-md bg-slate-500"></div>
                <div class="space-y-2">
                  <h3 class="text-xl font-bold">
                    ep{index + 1}. {episode.name}
                  </h3>
                  <p class="opacity-60">Yes you are right</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {JSON.stringify(video.value)}
    </div>
  );
});
