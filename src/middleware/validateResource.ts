import { ZodError, AnyZodObject } from 'zod'
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

const validate = function (schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params })
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).send(err.errors)
      } else {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      }
    }
  }
}

export default validate
