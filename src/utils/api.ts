const apiKey = import.meta.env.PUBLIC_WINNIPEG_API_KEY;

// Fetch transit data for a stop ID
export const getTransitData = async (stopId) => {
  const apiUrl = `https://api.winnipegtransit.com/v3/stops/${stopId}/schedule.json?api-key=${apiKey}`;

  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error(
      `API responded with status: ${res.status} - ${res.statusText}`
    );
  }

  return await res.json();
};

// Get all route schedules of a stop
export const getRouteSchedulesForStop = async (stopId) => {
  const data = await getTransitData(stopId);
  return data["stop-schedule"]["route-schedules"];
};
