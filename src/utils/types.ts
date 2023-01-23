export type requestType<T> = T | null;
export type responseType = DisplayVideoType[];
export type videoResult<T> = T | responseType;

export interface DisplayVideoType extends channelDetails {
  id: { videoId: string };
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    publishTime: string;
    thumbnails: {
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
    title: string;
    customUrl?: string;
    localized?: {
      title: string;
    };
  };
}

export interface channelDetails {
  statistics: {
    viewCount: string;
    subscriberCount: string;
  };
  brandingSettings: {
    image: {
      bannerExternalUrl: string;
    };
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

export type videoSection = {
  videos: videoResult<null> | undefined;
  error?: Boolean | undefined;
  loading?: Boolean | undefined;
};

export interface contextType {
  inputValue: string;
}
