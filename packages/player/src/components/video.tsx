//! WARNING: DON'T TOUCH

import {
  QwikIntrinsicElements,
  Signal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { component$, useSignal } from "@builder.io/qwik";
import SubtitlesOctopus from "@moebuta/libass-wasm";
import { HiPlay } from "@qwikest/icons/heroicons";
import type { SubtitleSource, VideoSource } from "../types";

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
    useVisibleTask$(({ track, cleanup }) => {
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
      <div class="relative h-full w-full bg-black">
        <video
          class="h-full w-full object-contain"
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
        {/* libass-wasm */}
        <div class="relative">
          <canvas class="pointer-events-none absolute block" ref={canvasRef} />
        </div>
        {/* center pause button */}
        <div class="pointer-events-none absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-slate-300 opacity-60 transition group-[.playing]:scale-125 group-[.playing]:opacity-0 dark:bg-slate-800">
          <HiPlay class="h-8 w-8 text-white" />
        </div>
      </div>
    );
  }
);
