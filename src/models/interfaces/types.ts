export interface Config {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export interface ImageType {
  public_id: string;
  secure_url: string;
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

export declare type FileMulter = Express.Multer.File;
