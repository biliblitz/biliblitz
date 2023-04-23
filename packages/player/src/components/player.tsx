import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useStyles$,
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
import { formatTime2 } from "../utils/time";

type Props = {
  video: VideoSource[];
  thumbnail?: string;
  subtitles?: SubtitleSource[];
};

export const Player = component$<Props>((props) => {
  useStyles$(style);

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

  // videoRef events
  useVisibleTask$(({ track, cleanup }) => {
    const video = track(() => videoRef.value);

    if (video) {
      const onClick = () => (video.paused ? video.play() : video.pause());
      const onPlay = () => (state.playing = true);
      const onPause = () => (state.playing = false);
      const onVolumeChange = () => {
        state.volume = video.volume;
        state.muted = video.muted;
      };
      const onRateChange = () => (state.playbackRate = video.playbackRate);
      const onDurationChange = () => (state.duration = video.duration);
      const onProgress = () => {
        const n = video.buffered.length;
        let buff = 0;
        for (let i = 0; i < n; ++i) {
          if (video.buffered.start(i) <= video.currentTime) {
            buff = Math.max(buff, video.buffered.end(i));
          }
        }
        state.buffered = buff;
      };
      const onTimeUpdate = () => {
        state.currentTime = video.currentTime;
        onProgress();
      };
      const onKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key === "ArrowLeft") {
          video.currentTime -= 5;
        } else if (event.key === "ArrowRight") {
          video.currentTime += 5;
        } else if (event.key === "ArrowUp") {
          video.volume = Math.min(video.volume + 0.1, 1);
        } else if (event.key === "ArrowDown") {
          video.volume = Math.max(video.volume - 0.1, 0);
        } else if (event.key === " ") {
          onClick();
        }
      };

      video.addEventListener("click", onClick);
      video.addEventListener("play", onPlay);
      video.addEventListener("pause", onPause);
      video.addEventListener("volumechange", onVolumeChange);
      video.addEventListener("ratechange", onRateChange);
      video.addEventListener("durationchange", onDurationChange);
      video.addEventListener("progress", onProgress);
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("keydown", onKeyDown);

      cleanup(() => {
        video.removeEventListener("click", onClick);
        video.removeEventListener("play", onPlay);
        video.removeEventListener("pause", onPause);
        video.removeEventListener("volumechange", onVolumeChange);
        video.removeEventListener("ratechange", onRateChange);
        video.removeEventListener("durationchange", onDurationChange);
        video.removeEventListener("progress", onProgress);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("keydown", onKeyDown);
      });
    }
  });

  // input events
  const seekRangeRef = useSignal<HTMLInputElement>();
  useVisibleTask$(({ track, cleanup }) => {
    const input = track(() => seekRangeRef.value);

    if (input) {
      const onInput = () => {
        seeking.value = true;
        seekTime.value = input.valueAsNumber;
        if (videoRef.value) {
          videoRef.value.pause();
        }
      };
      const onChange = () => {
        seeking.value = false;
        state.currentTime = seekTime.value;
        if (videoRef.value) {
          videoRef.value.currentTime = seekTime.value;
          videoRef.value.play();
        }
      };

      input.addEventListener("input", onInput);
      input.addEventListener("change", onChange);

      cleanup(() => {
        input.removeEventListener("input", onInput);
        input.removeEventListener("change", onChange);
      });
    }
  });

  return (
    <div
      class={[
        "group relative aspect-video",
        {
          playing: state.playing || seeking.value,
          inactive: playerInactive.value,
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
        <video class="h-full w-full object-contain" ref={videoRef}>
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

      {/* bottom controller */}
      <div class="absolute bottom-0 left-0 flex w-full flex-col bg-gradient-to-t from-black/20 to-transparent p-2 text-white transition-[opacity] group-[.inactive]:opacity-0 group-[.inactive]:duration-500">
        {/* Seek slider */}
        <div
          class="relative my-2 h-1 w-full"
          style={{
            "--current-value": `${playingPercent.value}%`,
            "--buffer-value": `${bufferedPercent.value}%`,
          }}
        >
          <div class="absolute left-0 top-0 h-1 w-full bg-white/40"></div>
          <div class="absolute left-0 top-0 h-1 w-[var(--buffer-value)] bg-white/40"></div>
          <div class="absolute left-0 top-0 h-1 w-[var(--current-value)] bg-red-500"></div>
          <input
            class="player-current-time-slider"
            type="range"
            min="0"
            max={state.duration}
            step="0.01"
            value={seeking.value ? seekTime.value : state.currentTime}
            ref={seekRangeRef}
          />
        </div>

        {/* buttons */}
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
              class="player-volume-slider"
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

            <span class="p-2">
              {formatTime2(
                seeking.value ? seekTime.value : state.currentTime,
                state.duration
              )}
            </span>
          </div>

          {/* right controls */}
          <div class="inline-flex gap-2">
            {/* playback rate select button */}
            <span class="menu-btn relative cursor-pointer p-2">
              <IoPlayForward class="h-6 w-6 drop-shadow" />
              <div class="menu-box">
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
