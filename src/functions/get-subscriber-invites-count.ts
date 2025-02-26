import { redis } from "../redis/client";

interface GetSubscriberInvitesCountParams {
  subscriber: string;
}

export async function getSubscriberInvitesCount({
  subscriber,
}: GetSubscriberInvitesCountParams) {
  const count = await redis.zscore("referral:ranking", subscriber);
  return { count: count ? Number.parseInt(count) : 0 };
}
