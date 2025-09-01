import { } from '@prisma/client'
import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { prisma } from "../db/prisma.js"

export const createEvent = async (app: FastifyInstance) => {
  app.post('/event', async (request, reply) => {
    const createEventBodySchema = z.object({
      title: z.string().min(4),
      details: z.string().nullable(),
      maximumAttendees: z.number().int().positive().min(1)
    })

    const data = createEventBodySchema.parse(request.body)

    const event = await prisma.event.create({
      data: {
        title: data.title,
        details: data.details,
        maximumAttendees: data.maximumAttendees,
        slug: new Date().toISOString(),
      }
    })

    return reply.status(201).send({
      eventId: event.id
    })

  })
}