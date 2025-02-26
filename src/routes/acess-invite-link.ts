import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { acessInviteLink } from "../functions/acess-invite-link";

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/invites/:subscriber",
    {
      schema: {
        summary: "Acess invite links and redirects user",
        tags: ["referral"],
        params: z.object({
          subscriber: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriber } = request.params;
      await acessInviteLink({ subscriber });
      const redirectUrl = new URL(env.WEB_URL);
      redirectUrl.searchParams.set("referrer", subscriber);
      return reply.redirect(redirectUrl.toString(), 302);
    }
  );
};
