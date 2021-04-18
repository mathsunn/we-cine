import { Video } from "./Video";

export interface Movie {
  id: number;
  originalTitle: string;
  title: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  videos: Record<string, Video>;
}
