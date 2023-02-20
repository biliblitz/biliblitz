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
import { IconCircle } from "../icon/icon-circle";

import playerStyle from "./player.css?inline";
import { Video } from "./video";

type VideoSource = {
  mimetype: string;
  source: string;
};

type SubtitleSource = {
  type: "ass" | "srt" | "vtt";
  source: string;
  fonts: string[];
};

type Props = {
  video?: VideoSource[];
  subtitles?: SubtitleSource[];
};

export const Player = component$((props: Props) => {
  useStyles$(playerStyle);

  const video = props.video ?? [];
  const subtitles = props.subtitles ?? [];

  const videoRef = useSignal<HTMLVideoElement>();
  const playerRef = useSignal<HTMLDivElement>();

  const playing = useSignal(false);
  const muted = useSignal(false);
  const volume = useSignal(1);
  const playbackRate = useSignal(1);

  useClientEffect$(({ track }) => {
    const video = track(() => videoRef.value);
    if (video) {
      muted.value = video.muted;
      volume.value = video.volume;
      playing.value = !video.paused;

      video.addEventListener("play", () => {
        if (!playing.value) {
          playing.value = true;
        }
      });
      video.addEventListener("pause", () => {
        if (playing.value) {
          playing.value = false;
        }
      });
      video.addEventListener("ratechange", () => {
        if (playbackRate.value !== video.playbackRate) {
          playbackRate.value = video.playbackRate;
        }
      });
      video.addEventListener("volumechange", () => {
        if (volume.value !== video.volume) {
          volume.value = video.volume;
        }
        if (muted.value !== video.muted) {
          muted.value = video.muted;
        }
      });
    }
  });

  useClientEffect$(({ track }) => {
    const video = track(() => videoRef.value);

    const newMute = track(() => muted.value);
    const newVolume = track(() => volume.value);
    const newPlaying = track(() => playing.value);
    const newPlaybackRate = track(() => playbackRate.value);

    if (video) {
      video.muted = newMute;
      video.volume = newVolume;
      if (newPlaying) {
        video.play();
      } else {
        video.pause();
      }
      video.playbackRate = newPlaybackRate;
    }
  });

  const togglePlay = $(() => (playing.value = !playing.value));
  const toggleMute = $(() => (muted.value = !muted.value));
  const toggleFullscreen = $(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerRef.value?.requestFullscreen();
    }
  });

  const trackingMouse = useSignal(false);

  const mouseMoves = useSignal(0);
  const insideControls = useSignal(false);

  return (
    <div
      class={[
        "player",
        {
          playing: playing.value,
          inactive: mouseMoves.value === 0 && !insideControls.value,
        },
      ]}
      ref={playerRef}
      onMouseMove$={() => {
        mouseMoves.value++;
        setTimeout(() => {
          mouseMoves.value--;
        }, 2000);
      }}
    >
      <Video
        video={video}
        subtitle={subtitles.at(0) ?? null}
        ref={videoRef}
        onClick$={togglePlay}
      />
      <div
        class="controls"
        onMouseEnter$={() => (insideControls.value = true)}
        onMouseLeave$={() => (insideControls.value = false)}
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
              trackingMouse.value = true;
              const bounding = t.getBoundingClientRect();
              const percent = (e.clientX - bounding.x) / bounding.width;
              const fixed = Math.max(Math.min((percent - 0.1) * 1.25, 1), 0);
              volume.value = fixed;
              muted.value = false;
            }}
            window:onMouseUp$={() => (trackingMouse.value = false)}
            window:onMouseMove$={(e, t) => {
              if (trackingMouse.value) {
                const bounding = t.getBoundingClientRect();
                const percent = (e.clientX - bounding.x) / bounding.width;
                const fixed = Math.max(Math.min((percent - 0.1) * 1.25, 1), 0);
                volume.value = fixed;
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
                <li class="menu-item text-opacity-60">None</li>
                <li class="menu-item">简体中文</li>
                <li class="menu-item">繁体中文</li>
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
