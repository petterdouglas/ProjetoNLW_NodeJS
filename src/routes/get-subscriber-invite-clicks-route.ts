import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getSubscriberInviteClicks } from "../functions/get-subscriber-invite-clicks";

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    "/subscribers/:subscriber/ranking/clicks",
    {
      schema: {
        summary: "Get subscriber invites clicks",
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
      const { count } = await getSubscriberInviteClicks({ subscriber });
      return { count };
    }
  );
};
