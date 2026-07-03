import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export const create_availability_exceptionSchema = z.object({
  date: z.string().regex(dateRegex, "Invalid date format, expected YYYY-MM-DD"),
  type: z.enum(["BLOCK_FULL_DAY", "BLOCK_PARTIAL", "ADD_AVAILABLE_WINDOW"]),
  start_time: z.string().regex(timeRegex, "Invalid time format, expected HH:mm").optional(),
  end_time: z.string().regex(timeRegex, "Invalid time format, expected HH:mm").optional(),
  timezone: z.string().default("UTC"),
  reason: z.string().max(500, "reason must be less than 500 characters").optional(),
}).refine((data) => {
  // BLOCK_FULL_DAY must not have start_time or end_time
  if (data.type === "BLOCK_FULL_DAY") {
    if (data.start_time || data.end_time) {
      return false;
    }
    return true;
  }
  
  // BLOCK_PARTIAL and ADD_AVAILABLE_WINDOW must have both start_time and end_time
  if (data.type === "BLOCK_PARTIAL" || data.type === "ADD_AVAILABLE_WINDOW") {
    if (!data.start_time || !data.end_time) {
      return false;
    }
  }
  
  return true;
}, {
  message: "BLOCK_FULL_DAY cannot have start_time or end_time; BLOCK_PARTIAL and ADD_AVAILABLE_WINDOW require both start_time and end_time",
  path: ["type"],
}).refine((data) => {
  // Validate time ordering only if both times are present
  if (!data.start_time || !data.end_time) return true;
  const [startHour, startMinute] = data.start_time.split(":").map(Number) as [number, number];
  const [endHour, endMinute] = data.end_time.split(":").map(Number) as [number, number];
  return startHour < endHour || (startHour === endHour && startMinute < endMinute);
}, {
  message: "End time must be after start time",
  path: ["start_time", "end_time"],
});

export const update_availability_exceptionSchema = create_availability_exceptionSchema.partial();

export type create_availability_exceptionDto = z.infer<typeof create_availability_exceptionSchema>;
export type update_availability_exceptionDto = z.infer<typeof update_availability_exceptionSchema>;
