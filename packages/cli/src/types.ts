export type VideoStream = {
  index: number;
  codec_name: string;
  codec_long_name: string;
  profile: string;
  codec_type: "video";
  codec_tag_string: string;
  codec_tag: string;
  width: number;
  height: number;
  coded_width: number;
  coded_height: number;
  closed_captions: number;
  film_grain: number;
  has_b_frames: number;
  sample_aspect_ratio: string;
  display_aspect_ratio: string;
  pix_fmt: string;
  level: number;
  color_range: string;
  color_space: string;
  color_transfer: string;
  color_primaries: string;
  chroma_location: string;
  refs: number;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts: number;
  start_time: string;
  extradata_size: number;
  disposition: Record<string, number>;
  tags: Record<string, string>;
};

export type AudioStream = {
  index: number;
  codec_name: string;
  codec_long_name: string;
  profile: string;
  codec_type: "audio";
  codec_tag_string: string;
  codec_tag: string;
  sample_fmt: string;
  sample_rate: string;
  channels: number;
  channel_layout: string;
  bits_per_sample: number;
  initial_padding: number;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts: number;
  start_time: string;
  extradata_size: number;
  disposition: Record<string, number>;
  tags: Record<string, string>;
};

export type SubtitleStream = {
  index: number;
  codec_name: string;
  codec_long_name: string;
  codec_type: "subtitle";
  codec_tag_string: string;
  codec_tag: string;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts: number;
  start_time: string;
  duration_ts: number;
  duration: string;
  extradata_size: number;
  disposition: Record<string, number>;
  tags: Record<string, string>;
};

export type AttachmentStream = {
  index: number;
  codec_name: string;
  codec_long_name: string;
  codec_type: "attachment";
  codec_tag_string: string;
  codec_tag: string;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts: number;
  start_time: string;
  duration_ts: number;
  duration: string;
  extradata_size: number;
  disposition: Record<string, number>;
  tags: Record<string, string>;
};

export type Stream =
  | VideoStream
  | AudioStream
  | SubtitleStream
  | AttachmentStream;

export type Chapter = {
  id: number;
  time_base: string;
  start: number;
  start_time: string;
  end: number;
  end_time: string;
  tags: Record<string, string>;
};

export type Format = {
  filename: string;
  nb_streams: number;
  nb_programs: number;
  format_name: string;
  format_long_name: string;
  start_time: string;
  duration: string;
  size: string;
  bit_rate: string;
  probe_score: number;
  tags: Record<string, string>;
};

export type Ffprobe = {
  streams: Stream[];
  chapters: Chapter[];
  format: Format;
};
