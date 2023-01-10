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
}

export type VideoPropType = {
  id: string;
  channel: string;
  publishTime: string;
  imageUrl: string;
  title: string;
};
