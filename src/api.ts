/* eslint-disable @typescript-eslint/no-explicit-any */
import { Doctor } from "./context/doctorContext";

export const BASE_URL = "https://fixhealth-nodejs.onrender.com/api";

export const getDoctors = async (): Promise<Doctor[] | any> => {
  try {
    const response = await fetch(`${BASE_URL}/doctors`);
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

export const getAppointments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/appointments`);
    console.log("Appointment Data:", response);

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

export const postData = async (data: any): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response Data:", responseData);
    return responseData;
  } catch (error: any) {
    console.error("Error posting data:", error);
  }
};
