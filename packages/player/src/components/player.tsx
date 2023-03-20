import {
  $,
  component$,
  useComputed$,
  useContextProvider,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  HiArrowsPointingIn,
  HiArrowsPointingOut,
  HiPause,
  HiPlay,
} from "@qwikest/icons/heroicons";
import {
  IoContext,
  IoPlayForward,
  IoText,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
  IoVolumeOff,
} from "@qwikest/icons/ionicons";
import type { SubtitleSource, VideoSource } from "../types";

import { Video } from "./video";

import "./player.css";
import style from "./player.module.css";

type Props = {
  video: VideoSource;
  subtitles?: SubtitleSource[];
};

export const Player = component$((props: Props) => {
  const video = props.video;
  const subtitles = props.subtitles ?? [];

  useContextProvider(IoContext, { variant: "outline" });

  const videoRef = useSignal<HTMLVideoElement>();
  const playerRef = useSignal<HTMLDivElement>();

  const subtitle = useSignal<SubtitleSource>();

  // video state, sync with element
  const playing = useSignal(false);
  const muted = useSignal(false);
  const volume = useSignal(1);
  const playbackRate = useSignal(1);
  const currentTime = useSignal(0);
  const duration = useSignal(NaN);
  const buffered = useSignal(0);
  // not sync with element
  const seeking = useSignal(false);
  const seekTime = useSignal(0);

  // init: sync video initial state if element changes
  useVisibleTask$(({ track }) => {
    const video = track(() => videoRef.value);
    if (video) {
      muted.value = video.muted;
      volume.value = video.volume;
      playing.value = !video.paused;
      playbackRate.value = video.playbackRate;
      currentTime.value = video.currentTime;
      duration.value = video.duration;
      buffered.value = 0;
    }
  });

  // listen if video changes, reload everything
  useVisibleTask$(({ track }) => {
    track(() => props.video);
    if (videoRef.value) {
      videoRef.value.load();
      videoRef.value.play();
    }
    subtitle.value = undefined;
  });

  const togglePlay = $(() => {
    if (playing.value) {
      videoRef.value?.pause();
    } else {
      videoRef.value?.play();
    }
  });
  const toggleMute = $(() => {
    if (videoRef.value) {
      videoRef.value.muted = !muted.value;
    }
  });
  const toggleFullscreen = $(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerRef.value?.requestFullscreen();
    }
  });

  const seekingVolume = useSignal(false);

  const mouseMoves = useSignal(0);
  const mouseBusy = useSignal(false);

  const updateProgress = $((video: HTMLVideoElement) => {
    const n = video.buffered.length;
    let buff = 0;
    for (let i = 0; i < n; ++i) {
      if (video.buffered.start(i) <= video.currentTime) {
        buff = Math.max(buff, video.buffered.end(i));
      }
    }
    if (buffered.value !== buff) {
      buffered.value = buff;
    }
  });

  const finishSeeking = $(() => {
    if (seeking.value) {
      seeking.value = false;
      currentTime.value = seekTime.value;
      if (videoRef.value) {
        videoRef.value.currentTime = seekTime.value;
        videoRef.value.play();
      }
    }
  });

  const playingPercent = useComputed$(() => {
    return isNaN(duration.value)
      ? 0
      : ((seeking.value ? seekTime.value : currentTime.value) /
          duration.value) *
          100;
  });
  const bufferedPercent = useComputed$(() => {
    return isNaN(duration.value) ? 0 : (buffered.value / duration.value) * 100;
  });
  const volumePercent = useComputed$(() =>
    muted.value ? 0 : volume.value * 100
  );

  return (
    <div
      class={[
        "group relative aspect-video",
        {
          playing: playing.value,
          inactive: mouseMoves.value === 0 && !mouseBusy.value,
        },
      ]}
      ref={playerRef}
      onMouseMove$={() => {
        mouseMoves.value++;
        setTimeout(() => mouseMoves.value--, 2000);
      }}
    >
      <Video
        video={video}
        subtitle={subtitle.value}
        ref={videoRef}
        onClick$={togglePlay}
        onPlay$={() => (playing.value = true)}
        onPause$={() => (playing.value = false)}
        onVolumeChange$={(_, video) => {
          volume.value = video.volume;
          muted.value = video.muted;
        }}
        onRateChange$={(_, video) => {
          playbackRate.value = video.playbackRate;
        }}
        onDurationChange$={(_, video) => {
          duration.value = video.duration;
        }}
        onTimeUpdate$={(_, video) => {
          currentTime.value = video.currentTime;
          updateProgress(video);
        }}
        onProgress$={(_, video) => updateProgress(video)}
        onKeyDown$={(event: KeyboardEvent, video) => {
          if (event.code === "ArrowLeft") {
            video.currentTime -= 5;
          } else if (event.code === "ArrowRight") {
            video.currentTime += 5;
          } else if (event.code === "ArrowUp") {
            video.volume = Math.min(video.volume + 0.1, 1);
          } else if (event.code === "ArrowDown") {
            video.volume = Math.max(video.volume - 0.1, 0);
          } else if (event.code === "Space") {
            video.paused ? video.play() : video.pause();
          }
        }}
        preventdefault:keydown
      />

      {/* controller */}
      <div
        class="absolute bottom-0 left-0 flex w-full gap-2 bg-gradient-to-t from-black/20 to-transparent p-2 text-white transition-[opacity] group-[.inactive]:opacity-0"
        onMouseEnter$={() => (mouseBusy.value = true)}
        onMouseLeave$={() => (mouseBusy.value = false)}
      >
        {/* left */}
        <div class="inline-flex gap-2">
          {/* play/pause button */}
          <span onClick$={togglePlay} class={style.button}>
            {playing.value ? (
              <HiPause class={style.icon} />
            ) : (
              <HiPlay class={style.icon} />
            )}
          </span>

          {/* Volume slider */}
          <span onClick$={toggleMute} class={style.button}>
            {muted.value ? (
              <IoVolumeMute class={style.icon} />
            ) : volume.value < 0.2 ? (
              <IoVolumeOff class={style.icon} />
            ) : volume.value < 0.5 ? (
              <IoVolumeLow class={style.icon} />
            ) : volume.value < 0.7 ? (
              <IoVolumeMedium class={style.icon} />
            ) : (
              <IoVolumeHigh class={style.icon} />
            )}
          </span>

          {/* volume */}
          <span
            class="-ml-2 flex w-0 cursor-pointer items-center overflow-hidden py-2 opacity-0 duration-500 hover:w-20 hover:px-2 hover:opacity-100 [:hover+&]:w-20 [:hover+&]:px-2 [:hover+&]:opacity-100"
            onMouseDown$={(e, t) => {
              seekingVolume.value = true;
              const bounding = t.firstElementChild!.getBoundingClientRect();
              const percent = (e.clientX - bounding.x) / bounding.width;
              const fixed = Math.max(Math.min(percent, 1), 0);
              if (videoRef.value) {
                videoRef.value.volume = fixed;
                videoRef.value.muted = false;
              }
            }}
            onMouseUp$={() => (seekingVolume.value = false)}
            window:onMouseUp$={() => (seekingVolume.value = false)}
            window:onMouseMove$={(e, t) => {
              if (seekingVolume.value) {
                const bounding = t.firstElementChild!.getBoundingClientRect();
                const percent = (e.clientX - bounding.x) / bounding.width;
                const fixed = Math.max(Math.min(percent, 1), 0);
                if (videoRef.value) {
                  videoRef.value.volume = fixed;
                }
              }
            }}
          >
            <div
              class="relative h-[2px] w-full overflow-visible bg-white after:absolute after:left-[var(--slide-value)] after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:-translate-x-1/2 after:rounded-full after:bg-white"
              style={{ "--slide-value": volumePercent.value + "%" }}
            />
          </span>
        </div>

        {/* Seek slider */}
        <div
          class="group/slider mx-2 flex flex-1 cursor-pointer items-center p-2"
          onMouseDown$={(e, t) => {
            seeking.value = true;
            videoRef.value?.pause();

            const bounding = t.firstElementChild!.getBoundingClientRect();
            const percent = (e.clientX - bounding.x) / bounding.width;
            const fixed = Math.max(Math.min(percent, 1), 0);
            seekTime.value = fixed * duration.value;
          }}
          onMouseUp$={finishSeeking}
          window:onMouseMove$={(e, t) => {
            if (seeking.value) {
              const bounding = t.firstElementChild!.getBoundingClientRect();
              const percent = (e.clientX - bounding.x) / bounding.width;
              const fixed = Math.max(Math.min(percent, 1), 0);
              seekTime.value = fixed * duration.value;
            }
          }}
          window:onMouseUp$={finishSeeking}
        >
          <div
            class="relative h-[2px] w-full overflow-visible bg-white/40 transition-all after:absolute after:left-[var(--slide-value)] after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:-translate-x-1/2 after:rounded-full after:bg-white after:transition-[opacity] group-hover/slider:h-2 group-hover/slider:after:opacity-0"
            style={{
              "--slide-value": playingPercent.value + "%",
            }}
          >
            <div
              class="absolute top-0 left-0 h-full bg-white/40"
              style={{
                width: bufferedPercent.value + "%",
              }}
            />
            <div
              class="absolute top-0 left-0 h-full bg-red-500"
              style={{
                width: playingPercent.value + "%",
              }}
            />
          </div>
        </div>

        {/* right controls */}
        <div class="inline-flex gap-2">
          {/* playback rate select button */}
          <span class={style.button}>
            <IoPlayForward class={style.icon} />
            <div class="hidden">
              <menu class="menu">
                <h3 class="menu-title">Speed</h3>
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => {
                  return (
                    <li
                      class={[
                        "menu-radio",
                        { checked: playbackRate.value === rate },
                      ]}
                      onClick$={() => {
                        if (videoRef.value) {
                          videoRef.value.playbackRate = rate;
                        }
                      }}
                      key={rate}
                    >
                      {rate}
                    </li>
                  );
                })}
              </menu>
            </div>
          </span>
          {/* Subtitle select button */}
          <span class={style.button}>
            <IoText class={style.icon} />
            <div class="hidden">
              <menu class="menu">
                <h3 class="menu-title">Subtitles</h3>
                <li
                  class={[
                    "menu-radio text-opacity-60",
                    { checked: !subtitle.value },
                  ]}
                  onClick$={() => (subtitle.value = undefined)}
                >
                  Off
                </li>
                {subtitles.map((_subtitle) => (
                  <li
                    class={[
                      "menu-radio",
                      { checked: subtitle.value?.source === _subtitle.source },
                    ]}
                    onClick$={() => (subtitle.value = _subtitle)}
                  >
                    {_subtitle.title}
                  </li>
                ))}
              </menu>
            </div>
          </span>
          {/* fullscreen change button */}
          <span onClick$={toggleFullscreen} class={style.button}>
            <HiArrowsPointingOut class="h-6 w-6 drop-shadow group-[:fullscreen]:hidden" />
            <HiArrowsPointingIn class="h-6 w-6 drop-shadow group-[:not(:fullscreen)]:hidden" />
          </span>
        </div>
      </div>
    </div>
  );
});
