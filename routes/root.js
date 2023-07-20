"use strict";

const { formIoReqValidator, responseValidator } = require("../validation/form");

const { formIo } = require("../models/formio");

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "OPTIONS",
    url: "/*",
    handler: async (request, reply) => {
      reply
        .code(200)
        .header("Content-Length", "0")
        .header("Access-Control-Allow-Origin", "*")
        .header(
          "Access-Control-Allow-Methods",
          "GET,HEAD,PUT,PATCH,POST,DELETE"
        )
        .send();
    },
  });

  fastify.get(
    "/",
    {
      onRequest: [fastify.authenticate],
    },
    async function (request, reply) {
      return request.user;
    }
  );

  fastify.post("/signup", async (req, reply) => {
    // some code
    // const response = await fastify.mongo.db
    //   .collection("users")
    //   .insertOne(req.body);

    const token = fastify.jwt.sign({ username: req.body.name });

    reply.send({ token });
  });

  fastify.get(
    "/protected",
    {
      onRequest: [fastify.authenticate],
    },
    async function (request, reply) {
      try {
        const response = await fastify.mongo.db
          .collection("users")
          .insertOne(request.body);
        return { user: { ...request.user, ...response } };
      } catch (err) {
        throw err;
      }
    }
  );

  fastify.post(
    "/create",
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: validatePostForm,
      },
    },
    async function (request, ...rest) {
      try {
        const response = await fastify.mongo.db
          .collection("tokens")
          .insertOne(request.body);
        return response;
      } catch (err) {
        throw err;
      }
    }
  );

  fastify.post(
    "/auth/formio",
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: formIoReqValidator,
        response: {
          200,
          schema: responseValidator,
        }
      },
    },
    formIo
  );
};
