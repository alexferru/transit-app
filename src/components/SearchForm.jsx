import React, { useState } from "react";
import { getTransitData } from "../utils/api";

const SearchForm = () => {
  const [stopId, setStopId] = useState("");
  const [data, setData] = useState(null);
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
      const fetchedData = await getTransitData(trimmedStopId);
      if (fetchedData.error) {
        throw new Error(fetchedData.error.message);
      }
      setData(fetchedData);
    } catch (err) {
      setError(`Error fetching transit data: ${err.message}`);
      setData(null);
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
      {data && (
        <div>
          <h1>{data["stop-schedule"].stop.name}</h1>
          <h2>
            {JSON.stringify(
              data["stop-schedule"]["route-schedules"].map(
                (routeSchedule) => routeSchedule.route.name
              )
            )}
          </h2>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
