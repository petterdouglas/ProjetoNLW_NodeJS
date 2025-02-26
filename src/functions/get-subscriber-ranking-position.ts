import { redis } from "../redis/client";

interface GetSubscriberRankingPositionParams {
  subscriber: string;
}

export async function getSubscriberRankingPosition({
  subscriber,
}: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank("referral:ranking", subscriber);
  if (rank == null) {
    return { position: null };
  }
  return { position: rank + 1 };
}
