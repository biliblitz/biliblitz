//! WARNING: DON'T TOUCH

import type { QwikIntrinsicElements, Signal } from "@builder.io/qwik";
import { component$, useClientEffect$, useSignal } from "@builder.io/qwik";
import { IconPlay } from "@railgun/heroicons";
import SubtitlesOctopus from "@railgun/libass-wasm";
import type { SubtitleSource, VideoSource } from "~/utils/db/video";

type VideoProps = {
  video: VideoSource;
  subtitle: SubtitleSource | undefined;
  ref: Signal<HTMLVideoElement | undefined>;
} & Omit<QwikIntrinsicElements["video"], "ref">;

export const Video = component$(
  ({ video, subtitle, ref, ...props }: VideoProps) => {
    const videoRef = useSignal<HTMLVideoElement>();
    const canvasRef = useSignal<HTMLCanvasElement>();

    // subtitles
    useClientEffect$(({ track, cleanup }) => {
      const video = track(() => videoRef.value);
      const canvas = track(() => canvasRef.value);
      const ass = track(() => subtitle?.type === "ass" && subtitle);

      if (video && canvas && ass) {
        console.log("libass-wasm: 🍑 is loading!!");
        const instance = new SubtitlesOctopus({
          video: video,
          canvas: canvas,
          subUrl: ass.source,
          fonts: ass.fonts,
        });

        cleanup(() => {
          console.log("libass-wasm: 🍑 is cleaning up!!");
          instance.dispose();
        });
      }
    });

    return (
      <div class="relative w-full overflow-hidden bg-white dark:bg-black [:fullscreen_&]:h-full">
        <video
          class="w-full object-contain [:fullscreen_&]:h-full"
          ref={(elem) => {
            videoRef.value = elem as HTMLVideoElement;
            ref.value = elem as HTMLVideoElement;
          }}
          {...props}
        >
          <source src={video.source} type={video.mimetype} />
          {(subtitle?.type === "webvtt" || subtitle?.type === "srt") && (
            <track
              src={subtitle.source}
              srcLang={subtitle.language}
              kind="subtitles"
              default
            />
          )}
        </video>
        <div class="relative">
          <canvas class="pointer-events-none absolute block" ref={canvasRef} />
        </div>
        <div class="pointer-events-none absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-slate-300 opacity-60 transition dark:bg-slate-800 [.playing_&]:scale-125 [.playing_&]:opacity-0">
          <IconPlay class="h-8 w-8" />
        </div>
      </div>
    );
  }
);
