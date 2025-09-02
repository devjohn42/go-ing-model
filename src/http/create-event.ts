import { } from '@prisma/client'
import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { prisma } from "../db/prisma.js"
import { generateSlug } from '../utils/generate-slug.js'

export const createEvent = async (app: FastifyInstance) => {
  app.post('/event', async (request, reply) => {
    const createEventBodySchema = z.object({
      title: z.string().min(4),
      details: z.string().nullable(),
      maximumAttendees: z.number().int().positive().min(1)
    })

    const { title, details, maximumAttendees } = createEventBodySchema.parse(request.body)

    const slug = generateSlug(title)

    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug
      }
    })

    if (eventWithSameSlug !== null) {
      throw new Error('Another event with same title already exists.')
    }

    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug
      }
    })

    return reply.status(201).send({
      eventId: event.id
    })

  })
}