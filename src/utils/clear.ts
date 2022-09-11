import { PathLike, unlink } from "fs";

const clearTemporaryFiles = (filepath: PathLike): void => {
  unlink(filepath, (err: unknown) => {
    if (err) throw err;
  });
};

export default clearTemporaryFiles;
