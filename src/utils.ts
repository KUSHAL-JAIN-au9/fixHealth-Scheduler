// utils.ts
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Appointments } from "./context/doctorContext";

dayjs.extend(duration);

export interface Slots {
  id: number;
  slot: string;
  status: string;
}

export interface DateSlots {
  id: number;
  date: string;
  slots: Slots[];
}

export async function getTimeSlots(
  start: string,
  end: string
): Promise<string[]> {
  const startTime = dayjs(start, "HH:mm a");
  const endTime = dayjs(end, "HH:mm a");
  const slots: string[] = [];

  for (
    let time = startTime;
    time.isBefore(endTime);
    time = time.add(45, "minute")
  ) {
    slots.push(time.format("HH:mm a"));
  }

  return slots;
}

export function filterDataByTime(data: Appointments[]) {
  const morningData = data.filter((item) => {
    return (
      Array.isArray(item.time) &&
      item.time.some((time) => {
        const hour = parseInt(time.split(":")[0]);
        const period = time.split(" ")[1];
        return period === "am" && hour >= 5 && hour < 12;
      })
    );
  });

  const afternoonData = data.filter((item) => {
    return (
      Array.isArray(item.time) &&
      item.time.some((time) => {
        const hour = parseInt(time.split(":")[0]);
        const period = time.split(" ")[1];
        return period === "pm" && hour < 5;
      })
    );
  });

  const eveningData = data.filter((item) => {
    return (
      Array.isArray(item.time) &&
      item.time.some((time) => {
        const hour = parseInt(time.split(":")[0]);
        const period = time.split(" ")[1];
        return period === "pm" && hour >= 5;
      })
    );
  });

  return {
    morning: morningData,
    afternoon: afternoonData,
    evening: eveningData,
  };
}

// function to create appointment objects for the week
export const createAppointmentObjects = async (
  weekRange: string,
  slots: string[] = []
) => {
  // Split the week range into start and end dates
  const [start, end] = weekRange
    .split(" ~ ")
    .map((date) => dayjs(date, "MM/DD"));

  // Generate the dates in the week range
  const dates = [];
  for (
    let date = start;
    date.isBefore(end) || date.isSame(end);
    date = date.add(1, "day")
  ) {
    dates.push(date.format("YYYY-MM-DD"));
  }

  // Map over the dates to create the objects
  const dateSlots = dates.map((date, i) => ({
    id: i + 1,
    date,
    slots: slots.map((slot) => ({ id: i + 1, slot, status: "available" })),
  }));

  return { dateSlots, dates };
};
