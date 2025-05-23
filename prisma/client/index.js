
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    }
  ],
});

prisma.$on('query', async (e) => {
  console.log(`${e.query} ${e.params}`);
});

module.exports = {
    prisma
}