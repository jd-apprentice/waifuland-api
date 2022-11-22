// External Modules
import { CloudinaryStorage } from "multer-storage-cloudinary";

export interface Config {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export interface Storage {
  cloudinary: CloudinaryStorage;
}

export interface Query {
  size?: number;
  tag_id?: number;
}

export interface State<T> {
  [key: string]: T;
}

export declare type FileMulter = Express.Multer.File;
export declare type FileRequest = Express.Request;
