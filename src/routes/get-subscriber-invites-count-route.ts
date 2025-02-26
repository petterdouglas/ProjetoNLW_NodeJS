import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getSubscriberInvitesCount } from "../functions/get-subscriber-invites-count";

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    "/subscribers/:subscriber/ranking/count",
    {
      schema: {
        summary: "Get subscriber invites count",
        tags: ["referral"],
        params: z.object({
          subscriber: z.string(),
        }),
        response: {
          200: z.object({
            count: z.number(),
          }),
        },
      },
    },
    async (request) => {
      const { subscriber } = request.params;
      const { count } = await getSubscriberInvitesCount({ subscriber });
      return { count };
    }
  );
};
