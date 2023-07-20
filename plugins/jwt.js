const fp = require("fastify-plugin");
const configuration = require("../config/configuration");

module.exports = fp(function (fastify, opts, done) {

  // fastify.register(helmet, { global: true })

  // fastify.register(require("@fastify/cookie"), {
  //   secret: "fastify",
  //   hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  //   parseOptions: {},
  // }); // See following section to ensure security

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
