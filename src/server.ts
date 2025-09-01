import fastify from 'fastify'
import { createEvent } from './http/create-event.js'

const app = fastify()

app.register(createEvent)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Runnig')
})