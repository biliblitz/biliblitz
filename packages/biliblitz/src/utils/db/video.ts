import type { SubtitleSource, VideoSource } from "@biliblitz/player";
import type { ObjectId, UpdateFilter, WithId } from "mongodb";
import { db } from "../db";
import { assertNotNull } from "../assert";

export type Episode = {
  name: string;
  uploadAt: Date;
  unlockAt: Date;
  source: VideoSource[];
  thumbnail?: string;
  subtitles: SubtitleSource[];
};

export type Video = {
  title: string;
  plays: number;
  description: string;
  createAt: Date;
  unlockAt: Date;
  episodes: Episode[];
  uploader: ObjectId;
};

const collVideo = db.collection<Video>("video");

export function createVideo(
  uploader: ObjectId,
  title: string,
  description: string
) {
  return collVideo.insertOne({
    title,
    plays: 0,
    description,
    createAt: new Date(),
    unlockAt: new Date(),
    episodes: [],
    uploader,
  });
}

export function createEpisode(videoId: ObjectId, name: string) {
  return collVideo.updateOne(
    { _id: videoId },
    {
      $addToSet: {
        episodes: {
          name,
          uploadAt: new Date(),
          unlockAt: new Date(),
          source: [],
          subtitles: [],
        },
      },
    }
  );
}

export async function getPublicVideoRandom() {
  return await collVideo
    .aggregate<WithId<Video>>([
      {
        $match: {
          unlockAt: { $lte: new Date() },
          episodes: { $not: { $size: 0 } },
        },
      },
      { $sample: { size: 20 } },
    ])
    .toArray();
}

export async function getPublicVideoById(videoId: ObjectId) {
  const video = await collVideo.findOne({
    _id: videoId,
    unlockAt: { $lte: new Date() },
    episodes: { $not: { $size: 0 } },
  });
  assertNotNull(video);

  return video;
}

export function getVideoByIdAndUser(videoId: ObjectId, uploader: ObjectId) {
  return collVideo.findOne({ _id: videoId, uploader });
}

export async function getVideoByUser(uploader: ObjectId) {
  const videos = await collVideo.find({ uploader }).toArray();
  return videos.map(serializeVideo);
}

export function updateVideoProfile(
  videoId: ObjectId,
  update: UpdateFilter<Video>
) {
  return collVideo.findOneAndUpdate({ _id: videoId }, update, {
    returnDocument: "after",
  });
}

export function serializeVideo(video: WithId<Video>) {
  return {
    _id: video._id.toHexString(),
    title: video.title,
    plays: video.plays,
    description: video.description,
    createAt: video.createAt,
    unlockAt: video.unlockAt,
    episodes: video.episodes,
  };
}
