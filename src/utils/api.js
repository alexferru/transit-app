const apiKey = import.meta.env.WINNIPEG_API_KEY;

export async function searchBusStops(name) {
  const response =
    await fetch(`https://api.winnipegtransit.com/v3/stops/?name=${name}&api-key=${apiKey}
`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function getUpcomingBuses(stopNumber) {
  const response = await fetch(
    `https://api.winnipegtransit.com/v3/stops/${stopNumber}/schedule?api-key=${apiKey}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
