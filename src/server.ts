import fastify from 'fastify'

const app = fastify()

app.get('/', (request, reply) => {
  return 'Hello Go-ing'
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Runnig')
})