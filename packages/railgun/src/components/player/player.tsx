import {
  $,
  component$,
  useClientEffect$,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import {
  IconArrowsPointingIn,
  IconArrowsPointingOut,
  IconPause,
  IconPlay,
} from "@railgun/heroicons";
import {
  IconPlayForward,
  IconText,
  IconVolumeHigh,
  IconVolumeLow,
  IconVolumeMedium,
  IconVolumeMute,
  IconVolumeOff,
} from "@railgun/ionicons";
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

  // video state
  const playing = useSignal(false);
  const muted = useSignal(false);
  const volume = useSignal(1);
  const playbackRate = useSignal(1);

  // init: sync video initial state if element changes
  useClientEffect$(() => {
    if (videoRef.value) {
      muted.value = videoRef.value.muted;
      volume.value = videoRef.value.volume;
      playing.value = !videoRef.value.paused;
      playbackRate.value = videoRef.value.playbackRate;
    }
  });

  // listen if video changes, reload everything
  useClientEffect$(({ track }) => {
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
            class="-mx-1 flex h-4 cursor-pointer items-center px-2 [:fullscreen_&]:px-3"
            onMouseDown$={(e, t) => {
              seekingVolume.value = true;
              const bounding = t.getBoundingClientRect();
              const percent = (e.clientX - bounding.x) / bounding.width;
              const fixed = Math.max(Math.min((percent - 0.1) * 1.25, 1), 0);
              if (videoRef.value) {
                videoRef.value.volume = fixed;
                videoRef.value.muted = false;
              }
            }}
            window:onMouseUp$={() => (seekingVolume.value = false)}
            window:onMouseMove$={(e, t) => {
              if (seekingVolume.value) {
                const bounding = t.getBoundingClientRect();
                const percent = (e.clientX - bounding.x) / bounding.width;
                const fixed = Math.max(Math.min((percent - 0.1) * 1.25, 1), 0);
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
                      onClick$={() => (playbackRate.value = rate)}
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
