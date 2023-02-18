import type { ObjectId, UpdateFilter, WithId } from "mongodb";
import { db } from "../db";

export type Episode = {
  name: string;
  uploadAt: Date;
  unlockAt: Date;
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

export function createVideo(uploader: ObjectId, title: string) {
  return collVideo.insertOne({
    title,
    plays: 0,
    description: "-- No Descripition --",
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
        },
      },
    }
  );
}

export function getPublicVideoRandom() {
  return collVideo
    .aggregate<WithId<Video>>([
      { $match: { unlockAt: { $lte: new Date() } } },
      { $sample: { size: 20 } },
    ])
    .toArray();
}

export function getPublicVideoById(videoId: ObjectId) {
  return collVideo.findOne({ _id: videoId, unlockAt: { $lte: new Date() } });
}

export function getVideoByIdAndUser(videoId: ObjectId, uploader: ObjectId) {
  return collVideo.findOne({ _id: videoId, uploader });
}

export function getVideoByUser(uploader: ObjectId) {
  return collVideo.find({ uploader }).toArray();
}

export function updateVideoProfile(
  videoId: ObjectId,
  update: UpdateFilter<Video>
) {
  return collVideo.findOneAndUpdate({ _id: videoId }, update, {
    returnDocument: "after",
  });
}
