export type requestType<T> = T | null;
export type responseType = DisplayVideoType[];
export type videoResult<T> = T | responseType;
export type authType<T> =
  | T
  | {
      user?: string | undefined;
      image?: any;
      token?: string | undefined;
      loading: boolean | undefined;
    };

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

export type savedVideoPropType = {
  _id: string;
  channel: string;
  createdAt: string;
  thumbnail: string;
  title: string;
  videoId: string;
};

export type videoSection = {
  videos: videoResult<null> | undefined;
  error?: Boolean | undefined;
  loading?: Boolean | undefined;
};

export interface contextType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  avatarImg: string;
  channelId: string;
  savedVideos: [];
  setSavedVideos: React.Dispatch<React.SetStateAction<any>>;
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  singleDel: string;
  setSingleDel: React.Dispatch<React.SetStateAction<string>>;
}

export interface AuthcontextType {
  user: {
    user: string;
    token: string;
    loading: boolean;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      user: string;
      token: string;
      loading: boolean;
    }>
  >;
}

export type Anchor = "left";

export interface sideBarContextType {
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  state: {
    left: boolean;
  };
  sideBar: JSX.Element[];
  handleClick: (event: React.MouseEvent, name: string) => void;
}
