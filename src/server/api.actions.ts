import { getAppointments } from "../api";

export const fetchData = async () => {
  try {
    const res = await getAppointments();
    console.log("api appointments ", res);

    return res; // Return the data to fulfill the promise
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error if needed
    return null; // Return null or some default value
  }
};
