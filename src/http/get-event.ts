import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../db/prisma.js";

export const getEvent = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:eventId', {
      schema: {
        params: z.object({
          eventId: z.uuid()
        }),
        response: {
          200: {
            event: z.object({
              id: z.uuid(),
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maximunAttendees: z.number().int().nullable(),
              attendeesAmount: z.number().int(),
            })
          }
        }
      }
    }, async (request, reply) => {
      const { eventId } = request.params

      const event = await prisma.event.findUnique({
        select: {
          id: true,
          title: true,
          slug: true,
          details: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true
            }
          }
        },
        where: {
          id: eventId,
        }
      })

      if (event === null) {
        throw new Error('Event not found.')
      }

      return reply.status(200).send({
        event: {
          id: event.id,
          title: event.title,
          slug: event.slug,
          details: event.details,
          maximunAttendees: event.maximumAttendees,
          attendeesAmount: event._count.attendees
        }
      })
    })
}