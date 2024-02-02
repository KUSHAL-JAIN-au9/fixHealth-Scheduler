// utils.ts
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

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
