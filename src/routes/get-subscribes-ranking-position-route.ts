import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getSubscriberRankingPosition } from "../functions/get-subscriber-ranking-position";

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    "/subscribers/:subscriber/ranking/position",
    {
      schema: {
        summary: "Get subscriber ranking position",
        tags: ["referral"],
        params: z.object({
          subscriber: z.string(),
        }),
        response: {
          200: z.object({
            position: z.number().nullable(),
          }),
        },
      },
    },
    async (request) => {
      const { subscriber } = request.params;
      const { position } = await getSubscriberRankingPosition({ subscriber });
      return { position };
    }
  );
};
