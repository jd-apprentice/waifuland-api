// External Modules
import { Request, Response } from "express";

// Internal Modules
import tagService from "./tag-service";

class TagController {
  /**
   * @description Get all tags from the database
   * @type {Response} res object with the waifu
   * @returns { Promise<Response> } an array of tags
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
   * @param { string } id - id of the tag
   * @param { Response } res - object with the waifu
   * @returns { Promise<Response> } Tag by id
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
