import tagService from "../services/tagService";
import { Request, Response } from "express";

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
      Record<string, unknown>
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
      Record<string, unknown>
    >
  > {
    try {
      const tag = await tagService.getTagById(id);
      return res.json(tag);
    } catch (error: unknown) {
      return res.json({ message: (<Error>error).message });
    }
  }
}

export default new TagController();
