import {
  $,
  component$,
  useBrowserVisibleTask$,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import {
  IconArrowsPointingIn,
  IconArrowsPointingOut,
  IconPause,
  IconPlay,
} from "@moebuta/heroicons";
import {
  IconPlayForward,
  IconText,
  IconVolumeHigh,
  IconVolumeLow,
  IconVolumeMedium,
  IconVolumeMute,
  IconVolumeOff,
} from "@moebuta/ionicons";
import type { SubtitleSource, VideoSource } from "~/utils/db/video";
import { IconCircle } from "../icon/icon-circle";

import playerStyle from "./player.css?inline";
import { Video } from "./video";

type Props = {
  video: VideoSource;
  subtitles?: SubtitleSource[];
};

export const Player = component$((props: Props) => {
  useStyles$(playerStyle);

  const video = props.video;
  const subtitles = props.subtitles ?? [];

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
  useBrowserVisibleTask$(() => {
    if (videoRef.value) {
      muted.value = videoRef.value.muted;
      volume.value = videoRef.value.volume;
      playing.value = !videoRef.value.paused;
      playbackRate.value = videoRef.value.playbackRate;
      currentTime.value = videoRef.value.currentTime;
      duration.value = videoRef.value.duration;
      buffered.value = 0;
    }
  });

  // listen if video changes, reload everything
  useBrowserVisibleTask$(({ track }) => {
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

  return (
    <div
      class={[
        "player",
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
      <div
        class="controls"
        onMouseEnter$={() => (mouseBusy.value = true)}
        onMouseLeave$={() => (mouseBusy.value = false)}
      >
        <div class="controls-left">
          <span onClick$={togglePlay} class="icon-wrapper">
            {playing.value ? (
              <IconPause strokeWidth={1.5} class="icon" />
            ) : (
              <IconPlay strokeWidth={1.5} class="icon" />
            )}
          </span>

          {/* Volume slider */}
          <span onClick$={toggleMute} class="icon-wrapper">
            {muted.value ? (
              <IconVolumeMute class="icon" />
            ) : volume.value < 0.2 ? (
              <IconVolumeOff class="icon" />
            ) : volume.value < 0.5 ? (
              <IconVolumeLow class="icon" />
            ) : volume.value < 0.7 ? (
              <IconVolumeMedium class="icon" />
            ) : (
              <IconVolumeHigh class="icon" />
            )}
          </span>
          <span
            class="-ml-2 flex w-0 cursor-pointer items-center overflow-hidden py-2 opacity-0 duration-500 hover:w-20 hover:px-2 hover:opacity-100 [:fullscreen_&]:hover:w-28 [:fullscreen_:hover+&]:w-28 [:hover+&]:w-20 [:hover+&]:px-2 [:hover+&]:opacity-100"
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
              class="slider"
              style={{
                "--left": muted.value ? "0%" : `${volume.value * 100}%`,
              }}
            />
          </span>
        </div>

        {/* Seek slider */}
        <div
          class="m-2 flex-1 cursor-pointer p-2"
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
            class="slider slider-main"
            style={{
              "--left": isNaN(duration.value)
                ? "0%"
                : `${
                    ((seeking.value ? seekTime.value : currentTime.value) /
                      duration.value) *
                    100
                  }%`,
            }}
          >
            <div
              class="slider-progress slider-buffer"
              style={{
                width: isNaN(duration.value)
                  ? "0%"
                  : `${(buffered.value / duration.value) * 100}%`,
              }}
            />
            <div
              class="slider-progress bg-red-500"
              style={{
                width: isNaN(duration.value)
                  ? "0%"
                  : `${
                      ((seeking.value ? seekTime.value : currentTime.value) /
                        duration.value) *
                      100
                    }%`,
              }}
            />
          </div>
        </div>
        <div class="controls-right">
          <span class="icon-wrapper popover-hover popover">
            <IconPlayForward class="icon" />
            <div class="popover-top-left popover-content cursor-default">
              <menu class="menu">
                <h3 class="menu-title">Speed</h3>
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => {
                  return (
                    <li
                      class="menu-item"
                      onClick$={() => {
                        if (videoRef.value) {
                          videoRef.value.playbackRate = rate;
                        }
                      }}
                      key={rate}
                    >
                      {playbackRate.value === rate && (
                        <IconCircle class="menu-icon" />
                      )}
                      {rate}
                    </li>
                  );
                })}
              </menu>
            </div>
          </span>
          <span class="icon-wrapper popover-hover popover">
            <IconText class="icon" />
            <div class="popover-top-left popover-content cursor-default">
              <menu class="menu">
                <h3 class="menu-title">Subtitles</h3>
                <li
                  class="menu-item text-opacity-60"
                  onClick$={() => (subtitle.value = undefined)}
                >
                  {!subtitle.value && <IconCircle class="menu-icon" />}
                  Off
                </li>
                {subtitles.map((_subtitle) => (
                  <li
                    class="menu-item"
                    onClick$={() => (subtitle.value = _subtitle)}
                  >
                    {subtitle.value?.source === _subtitle.source && (
                      <IconCircle class="menu-icon" />
                    )}
                    {_subtitle.title}
                  </li>
                ))}
              </menu>
            </div>
          </span>
          <span onClick$={toggleFullscreen} class="icon-wrapper">
            <IconArrowsPointingOut class="icon notfullscreen" />
            <IconArrowsPointingIn class="icon fullscreen" />
          </span>
        </div>
      </div>
    </div>
  );
});
