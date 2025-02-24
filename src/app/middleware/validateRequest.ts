import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

// validation middleware
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};


export default validateRequest;