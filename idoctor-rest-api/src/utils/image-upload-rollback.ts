import { Request } from "express";
import fs from "fs";

const imageUploadRollback = (req: Request) => {
  if (req.file) {
    fs.unlink(req.file.path, error => {
      if (error) console.log("ERROR FILE UNLINK", error);
    });
  }
};

export default imageUploadRollback;
