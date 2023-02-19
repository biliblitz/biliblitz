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

type VideoSource = {
  mimetype: string;
  source: string;
};

type AudioSource = {
  mimetype: string;
  source: string;
};

type SubtitleSource = {
  mimetype: string;
  source: string;
};

type FontSource = {
  mimetype: string;
  source: string;
};

type Props = {
  video?: VideoSource[];
  audio?: AudioSource[];
  subtitles?: SubtitleSource[];
  fonts?: FontSource[];
};

export const Player = component$((props: Props) => {
  useStyles$(playerStyle);

  const video = props.video ?? [];
  const audio = props.audio ?? [];
  const subtitles = props.subtitles ?? [];
  const fonts = props.fonts ?? [];

  const videoRef = useSignal<HTMLVideoElement>();
  const playerRef = useSignal<HTMLDivElement>();
  const playing = useSignal(false);
  const muted = useSignal(false);
  const volume = useSignal(1);

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
    }
  });

  useClientEffect$(({ track }) => {
    const video = track(() => videoRef.value);

    const newMute = track(() => muted.value);
    const newVolume = track(() => volume.value);
    const newPlaying = track(() => playing.value);

    if (video) {
      video.muted = newMute;
      video.volume = newVolume;
      if (newPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  });

  const inactive = useSignal(false);
  useClientEffect$(({ track }) => {
    const player = track(() => playerRef.value);
    if (player) {
    }
  });

  const togglePlay = $(() => {
    playing.value = !playing.value;
  });
  const toggleMute = $(() => {
    muted.value = !muted.value;
  });
  const toggleFullscreen = $(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerRef.value?.requestFullscreen();
    }
  });

  const playbackRate = useSignal(1);
  useClientEffect$(({ track }) => {
    const rate = track(() => playbackRate.value);
    const video = track(() => videoRef.value);
    if (video) {
      video.playbackRate = rate;
    }
  });

  const trackingMouse = useSignal(false);

  return (
    <div class={["player", { playing: playing.value }]} ref={playerRef}>
      <div class="video">
        <video
          class="h-full w-full object-contain"
          ref={videoRef}
          onClick$={togglePlay}
        >
          {video.map(({ mimetype, source }, index) => (
            <source src={source} type={mimetype} key={index} />
          ))}
        </video>
        <div class="play">
          <IconPlay class="h-8 w-8" />
        </div>
      </div>
      <div class="controls">
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
            class="-mx-1 flex h-4 cursor-pointer items-center px-2"
            onMouseDown$={(e, t) => {
              trackingMouse.value = true;
              const bounding = t.getBoundingClientRect();
              const percent = (e.clientX - bounding.x) / bounding.width;
              const fixed = Math.max(Math.min((percent - 0.1) * 1.25, 1), 0);
              volume.value = fixed;
              muted.value = false;
            }}
            onMouseLeave$={() => (trackingMouse.value = false)}
            onMouseUp$={() => (trackingMouse.value = false)}
            onMouseMove$={(e, t) => {
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
