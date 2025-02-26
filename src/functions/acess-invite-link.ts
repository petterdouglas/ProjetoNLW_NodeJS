import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

interface AcessInviteLinkParams {
  subscriber: string;
}

export async function acessInviteLink({ subscriber }: AcessInviteLinkParams) {
  await redis.hincrby('referral:acess-count', subscriber, 1)
}
