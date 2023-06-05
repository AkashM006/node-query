import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodType, ZodError } from "zod";
import logger from "../logger";

const validator =
  (schema: ZodType): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;

    try {
      body = schema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(422).json({
          status: "FAILED",
          msg: error.flatten(),
        });
      }

      logger.error(error);

      return res.status(500).json({
        status: "FAILED",
        msg: "Something went wrong when trying to process your request. Please try again later.",
      });
    }

    req.body = body;
    next();
  };

export default validator;
