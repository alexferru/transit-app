const apiKey = import.meta.env.PUBLIC_WINNIPEG_API_KEY;

export const getTransitData = async (stopId) => {
  const apiUrl = `https://api.winnipegtransit.com/v3/stops/${stopId}/schedule.json?api-key=${apiKey}`;

  console.log("Fetching from URL:", apiUrl);

  const res = await fetch(apiUrl);

  if (!res.ok) {
    console.error("Error in API response:", res.status, res.statusText);
    throw new Error(
      `API responded with status: ${res.status} - ${res.statusText}`
    );
  }

  const data = await res.json();
  console.log("Received data:", data);

  return data;
};
