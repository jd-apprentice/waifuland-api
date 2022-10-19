import { FindCursor } from "mongodb";
import Tag from "../models/tag";

class TagRepository {
  /**
   * @description Get all tags from the database
   */

  async findTags() {
    return Tag.find({ is_active: true });
  }

  /**
   * @description Get one tag from the database
   */

  async findByTagId(tagId: string): Promise<FindCursor | null> {
    return Tag.findOne({ tag_id: tagId });
  }
}

export default new TagRepository();
