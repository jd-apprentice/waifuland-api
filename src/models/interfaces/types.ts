export interface Config {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export interface ImageProps {
  id: string;
  url: string;
  source: string;
  is_nsfw: boolean;
  tag: {
    name: string;
    description: string;
  };
  save: () => Promise<void>;
}
export interface ImageType {
  public_id: string;
  secure_url: string;
}

export interface ImageTypeResponse extends ImageType {
  url: string;
}
export interface Storage {
  cloudinary: any;
}

export interface UsernameType {
  username: string;
}

export interface IUser extends UsernameType {
  password: string;
}

export interface UsernameAdmin extends IUser {
  isAdmin: boolean;
}

export interface Size {
  size: number;
}

export interface State<T> {
  [key: string]: T;
}

export declare type FileMulter = Express.Multer.File;
export declare type FileRequest = Express.Request;
export type ImageProp = Omit<ImageProps, "save">;
