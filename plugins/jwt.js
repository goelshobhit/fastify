const fp = require("fastify-plugin");
const configuration = require("../config/configuration");

module.exports = fp(function (fastify, opts, done) {
  
  // fastify.register(require("@fastify/mongodb"), {
  //   forceClose: true,
  //   url: configuration.mongodbUrl,
  //   database: "prisma",
  // });

  fastify.register(require("@fastify/jwt"), {
    secret: configuration.secretKey,
    sign: { algorithm: "HS256" },
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  done();
});
