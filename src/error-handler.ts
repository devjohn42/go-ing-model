import { FastifyInstance } from "fastify"
import { z, ZodError } from "zod"
import { BadRequest } from "./http/_errors/bad-request.js"

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      errors: z.treeifyError(error),
    })
  }

  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message })
  }

  return reply.status(500).send({ message: 'Internal Server Error!' })
}