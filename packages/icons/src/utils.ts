import { QwikIntrinsicElements } from "@builder.io/qwik";

export type HiIconProps = {
  strokeWidth?: number;
} & Pick<QwikIntrinsicElements["svg"], "class">;

export type IoIconProps = Pick<QwikIntrinsicElements["svg"], "class">;
