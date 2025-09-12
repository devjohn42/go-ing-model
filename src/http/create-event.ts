import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from "../db/prisma.js"
import { generateSlug } from '../utils/generate-slug.js'
import { BadRequest } from "./_errors/bad-request.js"

export const createEvent = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>()
    .post('/event', {
      schema: {
        summary: 'Create an event',
        tags: ['events'],
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().min(1)
        }),
        response: {
          201: z.object({
            eventId: z.uuid()
          })
        },
      },
    }, async (request, reply) => {
      const { title, details, maximumAttendees } = request.body

      const slug = generateSlug(title)

      const eventWithSameSlug = await prisma.event.findUnique({
        where: {
          slug
        }
      })

      if (eventWithSameSlug !== null) {
        throw new BadRequest('Another event with same title already exists.')
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