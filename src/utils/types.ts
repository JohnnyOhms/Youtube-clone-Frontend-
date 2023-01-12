export type requestType<T> = T | null;
export type responseType = DisplayVideoType[];
export type videoResult<T> = T | responseType;

export interface DisplayVideoType {
  id: { videoId: string };
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    publishTime: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    title: string;
  };
  statistics?: {
    viewCount: string;
  };
}

export type VideoPropType = {
  id: string;
  channel: string;
  cahnnelId: string;
  publishTime: string;
  imageUrl: string;
  title: string;
};
