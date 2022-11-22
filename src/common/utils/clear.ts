// External Modules
import { PathLike, unlink } from "fs";

/**
 * @description Deletes temporary files
 * @param filepath - The path of the file to delete
 */

const clearTemporaryFiles = (filepath: PathLike): void => {
  unlink(filepath, (err: unknown) => {
    if (err) throw err;
  });
};

export default clearTemporaryFiles;
