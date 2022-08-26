import tagRepository from "../repositories/tag-repository";

class TagService {

  /**
   * @description Get all tags from the database
   * @returns {Promise<any[]>} An array of Tag entities
   */

  async getTag(): Promise<any[]> {
    try {
      return tagRepository.findTags();
    } catch (error: unknown) {
      throw new Error((<Error>error).message);
    }
  }

  async getTagById(id: string): Promise<any> {
    try {
      return tagRepository.findTagById(id);
    } catch (error: unknown) {
      throw new Error((<Error>error).message);
    }
  }
}

export default new TagService();
