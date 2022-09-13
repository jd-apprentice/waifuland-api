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
   * @description Get one tag from the database
   */

  async findTagById(id: string): Promise<FindCursor | null> {
    return Tag.findById(id);
  }

  /**
   * @description Get one tag from the database
   */

  async findByTagId(tagId: number) {
    return Tag.findOne({ tag_id: tagId });
  }
}

export default new TagRepository();
