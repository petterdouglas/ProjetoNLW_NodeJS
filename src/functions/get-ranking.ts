import { inArray } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

export async function getRanking() {
  const ranking = await redis.zrevrange("referral:ranking", 0, 2, "WITHSCORES");
  const subscriberIdandScore: Record<string, number> = {};
  for (let i = 0; i < ranking.length; i += 2) {
    subscriberIdandScore[ranking[i]] = Number.parseInt(ranking[i + 1]);
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberIdandScore)));
  const rankingWithScore = subscribers
    .map((subscriber) => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberIdandScore[subscriber.id],
      };
    })
    .sort((sub1, sub2) => {
      return sub1.score - sub2.score;
    });

  return { rankingWithScore };
}
