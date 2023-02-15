import { QwikIntrinsicElements } from "@builder.io/qwik";

export type IconProps = {
  strokeWidth?: number;
} & Pick<QwikIntrinsicElements["svg"], "class">;
