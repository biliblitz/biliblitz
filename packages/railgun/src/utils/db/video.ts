import { ObjectId } from "mongodb";
import { db } from "../db";

export interface Episode {
  name: string;
  uploadAt: Date;
  unlockAt: Date;
}

export interface Video {
  title: string;
  plays: number;
  description: string;
  createAt: Date;
  unlockAt: Date;
  episodes: Episode[];
  uploader: ObjectId;
}

const videoDocs = db.collection<Video>("video");

export function createVideo(uploader: ObjectId, title: string) {
  return videoDocs.insertOne({
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
  return videoDocs.updateOne(
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

export function getVideoRandom() {
  return videoDocs
    .aggregate([
      { $match: { unlockAt: { $lte: new Date() } } },
      { $sample: { size: 20 } },
    ])
    .toArray();
}

export function getVideoById(videoId: ObjectId) {
  return videoDocs.findOne({ _id: videoId, unlockAt: { $lte: new Date() } });
}

export function getVideoByUser(uploader: ObjectId) {
  return videoDocs.find({ uploader }).toArray();
}
