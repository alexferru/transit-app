import React, { useState } from "react";
import { getRouteSchedulesForStop } from "../utils/api";

const SearchForm = () => {
  const [stopId, setStopId] = useState("");
  const [routeSchedules, setRouteSchedules] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const trimmedStopId = stopId.trim();

    if (!trimmedStopId) {
      setError("Please enter a valid stop ID.");
      setLoading(false);
      return;
    }

    try {
      const fetchedData = await getRouteSchedulesForStop(trimmedStopId);
      console.log("Fetched Data:", fetchedData);
      setRouteSchedules(fetchedData);
    } catch (err) {
      setError(`Error fetching route schedules: ${err.message}`);
      setRouteSchedules(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={stopId}
          onChange={(e) => setStopId(e.target.value)}
          placeholder="Enter stop ID"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {routeSchedules && (
        <div>
          {routeSchedules.map((routeSchedule, index) => (
            <div key={index}>
              <h2>Route: {routeSchedule.route.number}</h2>

              <h3>Scheduled Stops:</h3>
              <ul>
                {routeSchedule["scheduled-stops"].map(
                  (scheduledStop, sIndex) => (
                    <li key={sIndex}>
                      Variant: {scheduledStop.variant.name} - Arrival:{" "}
                      {new Date(
                        scheduledStop.times.arrival.scheduled
                      ).toLocaleTimeString()}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
