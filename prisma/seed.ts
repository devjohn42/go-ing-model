import { prisma } from '../src/db/prisma'

const seed = async () => {
  await prisma.event.create({
    data: {
      id: 'unite-node-event-42', // esse ID será usado no complemento de outras trilhas (react/react-native)
      title: 'Unite Node Event',
      slug: 'unite-node-event',
      details: 'Um evento de devs para devs apaixonados por código!',
      maximumAttendees: 42
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})