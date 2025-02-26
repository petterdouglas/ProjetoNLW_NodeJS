import { redis } from "../redis/client";

interface GetSubscriberInviteClicksParams {
  subscriber: string;
}

export async function getSubscriberInviteClicks({
  subscriber,
}: GetSubscriberInviteClicksParams) {
  const count = await redis.hget("referral:acess-count", subscriber);
  return { count: count ? Number.parseInt(count) : 0 };
}
