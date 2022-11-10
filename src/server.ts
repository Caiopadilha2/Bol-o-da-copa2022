import Fastify from "fastify";

async function start() {
  const fastify = Fastify({
    logger: true,
    // loggar a aplicação se tiver erros.
  })

  await fastify.listen({ port: 3333 });
}

start();