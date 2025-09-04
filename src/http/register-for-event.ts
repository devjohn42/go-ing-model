import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from "../db/prisma.js"

export const registerForEvent = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>()
    .post('/event/:eventId/attendee', {
      schema: {
        body: z.object({
          name: z.string().min(3),
          email: z.email(),
        }),
        params: z.object({
          eventId: z.uuid()
        }),
        response: {
          201: z.object({
            attendeeId: z.number()
          })
        },
      },
    }, async (request, reply) => {
      const { eventId } = request.params
      const { name, email } = request.body

      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId
        }
      })

      return reply.status(201).send({
        attendeeId: attendee.id
      })

    })
}