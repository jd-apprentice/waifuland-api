import tagRepository from "../repositories/tag-repository";
import Tag from "../models/tag";
import { FindCursor } from "mongodb";
class TagService {
  /**
   * @description Get all tags from the database
   * @returns {Promise<typeof Tag[]>} An array of Tag entities
   */

  async getTag(): Promise<typeof Tag[]> {
    try {
      return tagRepository.findTags();
    } catch (error: unknown) {
      throw new Error((<Error>error).message);
    }
  }

  /**
   * @description Get one tag from the database
   * @param id - The id of the entity
   * @returns {Promise<FindCursor | null>} - One single tag
   */

  async getTagById(id: string): Promise<FindCursor | null> {
    try {
      return tagRepository.findByTagId(+id);
    } catch (error: unknown) {
      throw new Error((<Error>error).message);
    }
  }
}

export default new TagService();
