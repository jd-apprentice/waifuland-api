import tagService from "../services/tagService";
import { Request, Response } from "express";
import { Tag } from "models/interfaces/types";

class TagController {
  /**
   * @description Get all tags from the database
   * @param { Request } req
   * @param { Response } res
   * @returns { Response<Tag> } an array of tags
   */

  async getTags(
    req: Request,
    res: Response
  ): Promise<
    Response<
      (new (
        width?: number | undefined,
        height?: number | undefined
      ) => HTMLImageElement)[],
      Record<string, any>
    >
  > {
    try {
      const tags = await tagService.getTag();
      return res.json(tags);
    } catch (error: unknown) {
      return res.json({ message: (<Error>error).message });
    }
  }

  /**
   * @description Get all tags from the database
   * @param { Request } req
   * @param { Response } res
   * @returns { Response<Tag> } an array of tags
   */

  async getTagsId(
    req: Request,
    res: Response,
    id: string
  ): Promise<
    Response<
      (new (
        width?: number | undefined,
        height?: number | undefined
      ) => HTMLImageElement)[],
      Record<string, any>
    >
  > {
    try {
      console.log(id)
      const tag = await tagService.getTagById(id);
      return res.json(tag);
    } catch (error: unknown) {
      return res.json({ message: (<Error>error).message });
    }
  }
}

export default new TagController();
