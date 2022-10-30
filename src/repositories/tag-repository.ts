import { ITag } from "models/interfaces/types";
import { FindCursor } from "mongodb";
import Tag from "../models/tag";

class TagRepository {
  /**
   * @description Get all tags from the database
   * @return {Promise<ITag[]>} - An array of tags
   */

  async findTags(): Promise<ITag[]> {
    return Tag.find({ is_active: true });
  }

  /**
   * @description Get one tag from the database
   * @param tagId - The id of the entity
   * @returns {Promise<FindCursor | null>} - One single tag
   */

  async findByTagId(tagId: string): Promise<FindCursor | null> {
    return Tag.findOne({ tag_id: tagId });
  }
}

export default new TagRepository();
