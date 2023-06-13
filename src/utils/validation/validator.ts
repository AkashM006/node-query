import { NextFunction, Request, RequestHandler, Response } from "express";
import logger from "../logger";
import * as yup from "yup";

const validator =
  (schema: yup.Schema): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;

    try {
      const result = await schema.validate(body, { abortEarly: false });
      req.body = result;
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        let result = error.inner.map((item) => ({
          path: item.path,
          message: item.message,
        }));

        return res.status(422).json({
          status: "FAILED",
          msg: result,
        });
      }

      logger.error(error);
      return res.status(500).json({
        status: "FAILED",
        msg: "Something went wrong when trying to process your request. Please try again later.",
      });
    }
  };
export default validator;
