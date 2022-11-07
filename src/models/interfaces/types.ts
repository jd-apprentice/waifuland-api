import { CloudinaryStorage } from "multer-storage-cloudinary";

export interface Config {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export interface ITag {
  name: string;
  tag_id: number;
  description: string;
  is_nsfw: boolean;
  is_active: boolean;
}

export interface ImageProps {
  id: string;
  url: string;
  source?: string;
  is_nsfw: boolean;
  tag: ITag;
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
  cloudinary: CloudinaryStorage;
}

export interface UsernameType {
  username: string;
}

export interface IUser extends UsernameType {
  _id?: string;
  password: string;
  isAdmin?: boolean;
  profile_picture?: string;
  save?: () => Promise<void>;
}

export interface UsernameAdmin extends IUser {
  isAdmin: boolean;
}

export interface Query {
  size?: number;
  tag_id?: number;
}

export interface State<T> {
  [key: string]: T;
}

export interface MongoUser {
  _id: string;
}

export declare type FileMulter = Express.Multer.File;
export declare type FileRequest = Express.Request;
export type ImageProp = Omit<ImageProps, "save">;
export type UserPicture = Omit<
  IUser,
  "username" | "password" | "save" | "isAdmin"
>;
export type IImage = ImageProp;
