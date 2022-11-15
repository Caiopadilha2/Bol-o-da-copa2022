import Fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from '@prisma/client'
import cors from "@fastify/cors";
import ShortUniqueId from "short-unique-id";

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

  fastify.post('/pools', async (req, res) => {
    const createPoolBody = z.object({
      title: z.string(),
    })

    const { title } =createPoolBody.parse(req.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code: code,
      }
    })

    return res.status(201).send({code});
  })

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count();

    return { count }
  })

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count();

    return { count }
  })



  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

start();