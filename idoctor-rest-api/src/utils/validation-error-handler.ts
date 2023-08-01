import {Request, Response} from "express";
import {validationResult} from "express-validator";

import imageUploadRollback from "./image-upload-rollback";

const validationErrorHandler = (req: Request, res: Response) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return null;
  } else {
    imageUploadRollback(req);
    return res.status(422).json({errors: result.array()});
  }
};

export default validationErrorHandler;
