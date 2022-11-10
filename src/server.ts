import Fastify from "fastify";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'], 
  // para printar as querys executadas no banco.
})

async function start() {
  const fastify = Fastify({
    logger: true,
    // loggar a aplicação se tiver erros.
  })

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

    return { count }
  })

  await fastify.listen({ port: 3333 });
}

start();