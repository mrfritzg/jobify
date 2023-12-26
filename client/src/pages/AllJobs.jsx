import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

// loader for loading data on page load.
export const loader = async () => {
  // try {
  //   const { data } = await customFetch.get("/jobs");
  //   return { data };
  // } catch (error) {
  //   toast.error(error?.response?.data?.msg);
  //   return error;
  // }

  try {
    const { data } = await customFetch.get("/jobs");
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobs = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};
export default AllJobs;
