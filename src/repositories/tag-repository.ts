import Tag from "../models/tag"

class TagRepository {
    /**
   * @description Get all tags from the database
   * @returns {Promise<Tag[]>} An array of Tag entities
   */

  async findTags(): Promise<typeof Tag[]> {
    return Tag.find();
  }

  /**
   * @description Get all tags from the database
   * @returns {Promise<any>} An array of Tag entities
   */

  async findTagById(id: string): Promise<any> {
    return Tag.findById(id);
  }
}

export default new TagRepository();
