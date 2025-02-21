import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const SubscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscriptions",
    {
      schema: {
        summary: "Subscribe someone to an event",
        tags: ["subscription"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({ name: z.string(), email: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;
      return reply.status(201).send({
        name,
        email,
      });
    }
  );
};
