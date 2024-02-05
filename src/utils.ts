// utils.ts
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Appointments } from "./context/doctorContext";

dayjs.extend(duration);

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
