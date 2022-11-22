// Internal Modules
import { ITag } from "../../tag/intefaces/tag-interface";

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

export type ImageProp = Omit<ImageProps, "save">;
export type IImage = ImageProp;
