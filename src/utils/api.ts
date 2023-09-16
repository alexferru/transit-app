const apiKey = import.meta.env.WINNIPEG_API_KEY;

import { type TransitResponse } from "../types/TransitResponse";

export const getTransitData = async (stopId) => {
  const res = await fetch(
    `https://api.winnipegtransit.com/v3/stops/${stopId}/schedule.json?api-key=${apiKey}`
  );

  const data = (await res.json()) as TransitResponse;
  return data;
};
