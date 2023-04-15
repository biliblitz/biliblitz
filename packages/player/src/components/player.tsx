import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  HiArrowsPointingIn,
  HiArrowsPointingOut,
  HiPause,
  HiPlay,
  IoPlayForward,
  IoText,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
  IoVolumeOff,
} from "@biliblitz/icons";
import type { SubtitleSource, VideoSource } from "../types";

import Ass from "./ass";

import style from "./player.css?inline";

type Props = {
  video: VideoSource[];
  thumbnail?: string;
  subtitles?: SubtitleSource[];
};

export const Player = component$<Props>((props) => {
  useStylesScoped$(style);

  const subtitles = props.subtitles ?? [];

  const videoRef = useSignal<HTMLVideoElement>();
  const playerRef = useSignal<HTMLDivElement>();

  const subtitle = useSignal<SubtitleSource>();

  // video state, sync with element
  const state = useStore({
    playing: false,
    muted: false,
    volume: 1,
    playbackRate: 1,
    currentTime: 0,
    duration: NaN,
    buffered: 0,
  });
  // not sync with element
  const seeking = useSignal(false);
  const seekTime = useSignal(0);

  // init: sync video initial state if element changes
  useVisibleTask$(({ track }) => {
    const video = track(() => videoRef.value);
    if (video) {
      state.playing = !video.paused;
      state.muted = video.muted;
      state.volume = video.volume;
      state.playbackRate = video.playbackRate;
      state.currentTime = video.currentTime;
      state.duration = video.duration;
      state.buffered = 0;
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
    if (state.playing) {
      videoRef.value?.pause();
    } else {
      videoRef.value?.play();
    }
  });
  const toggleMute = $(() => {
    if (videoRef.value) {
      videoRef.value.muted = !state.muted;
    }
  });
  const toggleFullscreen = $(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerRef.value?.requestFullscreen();
    }
  });

  const mouseMoving = useSignal<number>();
  const mouseBusy = useSignal(false);

  const updateProgress = $((video: HTMLVideoElement) => {
    const n = video.buffered.length;
    let buff = 0;
    for (let i = 0; i < n; ++i) {
      if (video.buffered.start(i) <= video.currentTime) {
        buff = Math.max(buff, video.buffered.end(i));
      }
    }
    state.buffered = buff;
  });

  const finishSeeking = $(() => {
    if (seeking.value) {
      seeking.value = false;
      if (videoRef.value) {
        state.currentTime = seekTime.value;
        videoRef.value.currentTime = seekTime.value;
        videoRef.value.play();
      }
    }
  });

  const playingPercent = useComputed$(() =>
    isNaN(state.duration)
      ? 0
      : ((seeking.value ? seekTime.value : state.currentTime) /
          state.duration) *
        100
  );
  const bufferedPercent = useComputed$(() =>
    isNaN(state.duration) ? 0 : (state.buffered / state.duration) * 100
  );
  const volumePercent = useComputed$(() => (state.muted ? 0 : state.volume));
  const playerInactive = useComputed$(
    () => mouseMoving.value === undefined && !mouseBusy.value
  );

  return (
    <div
      class={[
        "group relative aspect-video",
        {
          playing: state.playing,
          inactive: playerInactive.value && false,
        },
      ]}
      ref={playerRef}
      onMouseMove$={() => {
        if (mouseMoving.value) {
          clearTimeout(mouseMoving.value);
        }
        mouseMoving.value = setTimeout(() => {
          mouseMoving.value = undefined;
        }, 2000);
      }}
    >
      {/* center video element */}
      <div class="relative h-full w-full bg-black">
        <video
          class="h-full w-full object-contain"
          ref={videoRef}
          onClick$={(_, video) => (video.paused ? video.play() : video.pause())}
          onPlay$={() => (state.playing = true)}
          onPause$={() => (state.playing = false)}
          onVolumeChange$={(_, video) => {
            state.volume = video.volume;
            state.muted = video.muted;
          }}
          onRateChange$={(_, video) =>
            (state.playbackRate = video.playbackRate)
          }
          onDurationChange$={(_, video) => (state.duration = video.duration)}
          onTimeUpdate$={(_, video) => {
            state.currentTime = video.currentTime;
            updateProgress(video);
          }}
          onProgress$={(_, video) => updateProgress(video)}
          preventdefault:keydown
          onKeyDown$={(event, video) => {
            if (event.key === "ArrowLeft") {
              video.currentTime -= 5;
            } else if (event.key === "ArrowRight") {
              video.currentTime += 5;
            } else if (event.key === "ArrowUp") {
              video.volume = Math.min(video.volume + 0.1, 1);
            } else if (event.key === "ArrowDown") {
              video.volume = Math.max(video.volume - 0.1, 0);
            } else if (event.key === "Space") {
              video.paused ? video.play() : video.pause();
            }
          }}
        >
          {props.video.map((video, index) => (
            <source key={index} src={video.source} type={video.mimetype} />
          ))}
          {(subtitle.value?.type === "webvtt" ||
            subtitle.value?.type === "srt") && (
            <track
              src={subtitle.value.source}
              srcLang={subtitle.value.language}
              kind="subtitles"
              default
            />
          )}
        </video>
        {/* libass-wasm */}
        <Ass subtitle={subtitle.value} videoRef={videoRef} />
        {/* center pause button */}
        <div class="pointer-events-none absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-slate-300 opacity-60 transition group-[.playing]:scale-125 group-[.playing]:opacity-0 dark:bg-slate-800">
          <HiPlay class="h-8 w-8 text-white" />
        </div>
      </div>

      <div class="absolute bottom-0 left-0 flex w-full flex-col bg-gradient-to-t from-black/20 to-transparent p-2 text-white transition-[opacity] group-[.inactive]:opacity-0">
        {/* Seek slider */}
        <div
          class="group/slider flex flex-1 cursor-pointer items-center p-2"
          onMouseDown$={(e, t) => {
            seeking.value = true;
            videoRef.value?.pause();

            const bounding = t.firstElementChild!.getBoundingClientRect();
            const percent = (e.clientX - bounding.x) / bounding.width;
            const fixed = Math.max(Math.min(percent, 1), 0);
            seekTime.value = fixed * state.duration;
          }}
          onMouseUp$={finishSeeking}
          window:onMouseMove$={(e, t) => {
            if (seeking.value) {
              const bounding = t.firstElementChild!.getBoundingClientRect();
              const percent = (e.clientX - bounding.x) / bounding.width;
              const fixed = Math.max(Math.min(percent, 1), 0);
              seekTime.value = fixed * state.duration;
            }
          }}
          window:onMouseUp$={finishSeeking}
        >
          <div
            class="relative h-[2px] w-full overflow-visible bg-white/40 transition-all after:absolute after:left-[var(--slide-value)] after:top-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white after:transition-[opacity] group-hover/slider:h-2 group-hover/slider:after:opacity-0"
            style={{
              "--slide-value": playingPercent.value + "%",
            }}
          >
            <div
              class="absolute left-0 top-0 h-full bg-white/40"
              style={{
                width: bufferedPercent.value + "%",
              }}
            />
            <div
              class="absolute left-0 top-0 h-full bg-red-500"
              style={{
                width: playingPercent.value + "%",
              }}
            />
          </div>
        </div>

        {/* controller */}
        <div
          class="flex justify-between"
          onMouseEnter$={() => (mouseBusy.value = true)}
          onMouseLeave$={() => (mouseBusy.value = false)}
        >
          {/* left */}
          <div class="inline-flex items-center gap-2">
            {/* play/pause button */}
            <span onClick$={togglePlay} class="cursor-pointer p-2">
              {state.playing ? (
                <HiPause class="h-6 w-6 drop-shadow" />
              ) : (
                <HiPlay class="h-6 w-6 drop-shadow" />
              )}
            </span>

            {/* volume icon */}
            <span onClick$={toggleMute} class="cursor-pointer p-2">
              {state.muted ? (
                <IoVolumeMute class="h-6 w-6 drop-shadow" />
              ) : state.volume < 0.2 ? (
                <IoVolumeOff class="h-6 w-6 drop-shadow" />
              ) : state.volume < 0.5 ? (
                <IoVolumeLow class="h-6 w-6 drop-shadow" />
              ) : state.volume < 0.7 ? (
                <IoVolumeMedium class="h-6 w-6 drop-shadow" />
              ) : (
                <IoVolumeHigh class="h-6 w-6 drop-shadow" />
              )}
            </span>

            {/* volume slider */}
            <input
              type="range"
              class="volume-slider"
              min="0"
              max="1"
              step="0.01"
              value={volumePercent.value}
              onInput$={(_, elem) => {
                if (videoRef.value) {
                  state.volume = elem.valueAsNumber;
                  state.muted = false;
                  videoRef.value.volume = elem.valueAsNumber;
                  videoRef.value.muted = false;
                  console.log(elem.valueAsNumber);
                }
              }}
            />
          </div>

          {/* right controls */}
          <div class="inline-flex gap-2">
            {/* playback rate select button */}
            <span class="cursor-pointer p-2">
              <IoPlayForward class="h-6 w-6 drop-shadow" />
              <div class="hidden">
                <menu class="menu">
                  <h3 class="menu-title">Speed</h3>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => {
                    return (
                      <li
                        class={[
                          "menu-radio",
                          { checked: state.playbackRate === rate },
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
            <span
              class="cursor-pointer p-2"
              onClick$={() => {
                if (!subtitle.value) {
                  subtitle.value = subtitles[0];
                } else {
                  const index = subtitles.indexOf(subtitle.value);
                  if (index + 1 === subtitles.length) {
                    subtitle.value = undefined;
                  } else {
                    subtitle.value = subtitles[index + 1];
                  }
                }
              }}
            >
              <IoText class="h-6 w-6 drop-shadow" />
            </span>
            {/* fullscreen change button */}
            <span onClick$={toggleFullscreen} class="cursor-pointer p-2">
              <HiArrowsPointingOut class="h-6 w-6 drop-shadow group-[:fullscreen]:hidden" />
              <HiArrowsPointingIn class="h-6 w-6 drop-shadow group-[:not(:fullscreen)]:hidden" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
