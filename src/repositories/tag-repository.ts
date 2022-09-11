import { FindCursor } from "mongodb";
import Tag from "../models/tag";

class TagRepository {
  /**
   * @description Get all tags from the database
   * @returns {Promise<typeof Tag[]>} An array of Tag entities
   */

  async findTags(): Promise<typeof Tag[]> {
    return Tag.find();
  }

  /**
   * @description Get all tags from the database
   * @returns {Promise} - One single tag
   */

  async findTagById(id: string): Promise<FindCursor | null> {
    return Tag.findById(id);
  }
}

export default new TagRepository();
