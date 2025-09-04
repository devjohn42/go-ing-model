import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createEvent } from './http/create-event.js'
import { registerForEvent } from './http/register-for-event.js'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Runnig')
})