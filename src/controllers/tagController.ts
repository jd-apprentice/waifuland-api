import tagService from "../services/tagService";
import { Request, Response } from "express";

class TagController {
  /**
   * @description Get all tags from the database
   * @param { Request } req
   * @param { Response } res
   * @returns { Response<Tag> } an array of tags
   */

  async getTags(req: Request, res: Response): Promise<Response> {
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

  async getTagsId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const tag = await tagService.getTagById(id);
      return res.json(tag);
    } catch (error: unknown) {
      return res.json({ message: (<Error>error).message });
    }
  }
}

export default new TagController();
