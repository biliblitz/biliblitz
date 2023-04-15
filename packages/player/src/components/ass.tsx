import {
  Signal,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { SubtitleSource } from "../types";
import SubtitlesOctopus from "@biliblitz/libass-wasm";

type AssProps = {
  subtitle: SubtitleSource | undefined;
  videoRef: Signal<HTMLVideoElement | undefined>;
};

export default component$<AssProps>((props) => {
  const canvasRef = useSignal<HTMLCanvasElement>();

  useVisibleTask$(({ track, cleanup }) => {
    const [video, canvas, subtitle] = track(() => [
      props.videoRef.value,
      canvasRef.value,
      props.subtitle,
    ]);

    if (video && canvas && subtitle?.type === "ass") {
      console.log("libass-wasm: 🍑 is loading!!");
      const instance = new SubtitlesOctopus({
        video: video,
        canvas: canvas,
        subUrl: subtitle.source,
        fonts: subtitle.fonts,
      });

      cleanup(() => {
        console.log("libass-wasm: 🍑 is cleaning up!!");
        instance.dispose();
      });
    }
  });

  return (
    <div class="relative">
      <canvas class="pointer-events-none absolute block" ref={canvasRef} />
    </div>
  );
});
