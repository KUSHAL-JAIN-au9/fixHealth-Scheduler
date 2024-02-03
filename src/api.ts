/* eslint-disable @typescript-eslint/no-explicit-any */
import { Doctor } from "./context/doctorContext";

export const BASE_URL = "https://fixhealth-nodejs.onrender.com/api/doctors";

export const getDoctors = async (): Promise<Doctor[] | any> => {
  try {
    const response = await fetch(BASE_URL);
    console.log("Data:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data:", data);
    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error);
  }
};
