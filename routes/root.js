"use strict";

const { validatePostForm } = require("../validation/form");
const { formIo } = require("../validation/form");
const { createForm } = require("../controllers/form.controller");
const { createProfile } = require("../controllers/profile.controller");

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
        body: formIo,
      },
    },
    async function (request, ...rest) {
      const {
        body: { formId },
      } = request;

      switch (formId) {
        case "contact":
          return createForm(request);
        case "profile":
          return createProfile(request);
        default:
          return { data: {}, message: "invalid form id"}
      }
    }
  );
};
