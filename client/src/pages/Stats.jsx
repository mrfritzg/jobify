import { useQuery } from "@tanstack/react-query";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";

// add a React Query
// this is the object that will be used by the React query
const statsQuery = {
  // this property is called queryKey & it is an identifier
  queryKey: ["stats"],
  // this property is a function that is looking for the promise from the fetch
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};

// loader for loading data on page load.
// queryClient is being sent from the App.js statsLoader for the Stats page
// React Query is being used in Stats Loader
export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
};

const Stats = () => {
  // using React useQuery Hook
  const { data } = useQuery(statsQuery);

  // load the data from the react query
  const { defaultStats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {/* conditional rendering, only show data if monthlyApplication has
  at least 1 month in it */}
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
