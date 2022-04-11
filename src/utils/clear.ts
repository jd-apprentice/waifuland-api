import { PathLike, unlink } from "fs";

const clearTemporaryFiles = (filepath: PathLike) => {
  unlink(filepath, (err: any) => {
    if (err) throw err;
  });
};

export default clearTemporaryFiles;
