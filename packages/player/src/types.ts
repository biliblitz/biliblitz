export type VideoSource = {
  mimetype: string;
  source: string;
  thumbnail?: string;
};

export type SubtitleSource = {
  type: "srt" | "webvtt" | "ass";
  title: string;
  language: string;
  source: string;
  fonts: string[];
};
