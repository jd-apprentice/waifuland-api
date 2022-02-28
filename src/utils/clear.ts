import { unlink } from "fs";

const clearTemporaryFiles = (filepath: any) => {
    unlink(filepath, (err: any) => {
        if (err) throw err;
    });
}

export default clearTemporaryFiles;