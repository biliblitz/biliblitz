import { z } from "@builder.io/qwik-city";

export const zDatetimeLocal = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
  .transform((x) => new Date(`${x}Z`).getTime());

export const zTimezone = z
  .string()
  .regex(/^-?[1-9]+\d$/)
  .transform((x) => parseInt(x) * 60_000);
