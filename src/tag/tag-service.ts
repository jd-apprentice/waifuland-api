// External Modules
import { FindCursor } from "mongodb";

// Internal Modules
import tagRepository from "./tag-repository";
import { ITag } from "./intefaces/tag-interface";
import { LogArgument } from "rollbar";
import { rollbar } from "../app/config/rollbar";

class TagService {
  /**
   * @description Get all tags from the database
   * @return {Promise<Tag[]>} - An array of tags
   */

  async getTag(): Promise<ITag[]> {
    try {
      return tagRepository.findTags();
    } catch (error: unknown) {
      rollbar.error(error as LogArgument);
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
      return tagRepository.findByTagId(id);
    } catch (error: unknown) {
      rollbar.error(error as LogArgument);
      throw new Error((<Error>error).message);
    }
  }
}

export default new TagService();
