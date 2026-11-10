import { addDays, addMinutes, format, isBefore, isEqual, parseISO, startOfDay } from "date-fns";

export const BOOKING_DURATION_MINUTES = 30;
export const BOOKING_TIMEZONE_LABEL = "Europe/Berlin";

/** Weekday slots in local clinic hours (24h). */
const WEEKDAY_HOURS = [9, 10, 11, 13, 14, 15, 16];

export type SlotOption = {
  start: string; // ISO
  end: string;
  label: string;
};

function isWeekday(date: Date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

export function listDaysAhead(count = 14) {
  const days: { date: string; label: string; weekday: boolean }[] = [];
  const today = startOfDay(new Date());
  for (let i = 1; i <= count + 6; i += 1) {
    const d = addDays(today, i);
    if (!isWeekday(d)) continue;
    days.push({
      date: format(d, "yyyy-MM-dd"),
      label: format(d, "EEE, MMM d"),
      weekday: true,
    });
    if (days.length >= count) break;
  }
  return days;
}

export function generateSlotsForDate(
  dateKey: string,
  bookedStarts: string[] = []
): SlotOption[] {
  const day = startOfDay(parseISO(dateKey));
  if (!isWeekday(day)) return [];

  const booked = new Set(
    bookedStarts.map((iso) => parseISO(iso).toISOString())
  );
  const now = new Date();
  const slots: SlotOption[] = [];

  for (const hour of WEEKDAY_HOURS) {
    const start = new Date(day);
    start.setHours(hour, 0, 0, 0);
    const end = addMinutes(start, BOOKING_DURATION_MINUTES);
    if (isBefore(start, now)) continue;
    const startIso = start.toISOString();
    const taken = [...booked].some((b) => isEqual(parseISO(b), start));
    if (taken) continue;
    slots.push({
      start: startIso,
      end: end.toISOString(),
      label: format(start, "HH:mm"),
    });
  }

  return slots;
}
