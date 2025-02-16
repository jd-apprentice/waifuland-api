// External Modules
import { PathLike, unlink } from "fs";
import * as path from "path";

/**
 * @description Deletes temporary files
 * @param filepath - The path of the file to delete
 */

const ROOT = path.resolve("image/assets/images");

const clearTemporaryFiles = (filepath: PathLike): void => {
  const resolvedPath = path.resolve(ROOT, filepath.toString());
  if (!resolvedPath.startsWith(ROOT)) {
    throw new Error("Invalid file path");
  }
  unlink(resolvedPath, (err: unknown) => {
    if (err) {
      console.error("Failed to delete file: %s", resolvedPath, err);
      return;
    }
  });
};

export default clearTemporaryFiles;
