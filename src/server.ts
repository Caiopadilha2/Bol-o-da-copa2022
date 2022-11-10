import Fastify from "fastify";
import { PrismaClient } from '@prisma/client'
import cors from "@fastify/cors";

const prisma = new PrismaClient({
  log: ['query'], 
  // para printar as querys executadas no banco.
})

async function start() {
  const fastify = Fastify({
    logger: true,
    // loggar a aplicação se tiver erros.
  })

  await fastify.register(cors, {
    origin: true,
    // qualquer aplicação acessar o back-end
    // em produção é mais saudável colocar qual é o domínio.
  })

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

    return { count }
  })

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

start();