export type VideoSource = {
  mimetype: string;
  source: string;
  resolution: string;
};

export type SubtitleSource = {
  type: "srt" | "webvtt" | "ass";
  title: string;
  language: string;
  source: string;
  fonts: string[];
};
