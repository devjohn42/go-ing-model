import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import fastify from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { checkIn } from './http/check-in.js'
import { createEvent } from './http/create-event.js'
import { getAttendeeBadge } from './http/get-attendee-badge.js'
import { getEventAttendees } from './http/get-event-attendees.js'
import { getEvent } from './http/get-event.js'
import { registerForEvent } from './http/register-for-event.js'

const app = fastify()

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Go_ing',
      description: 'Uma API que realiza o check-in em eventos',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Local Server'
      }
    ]
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Runnig')
})