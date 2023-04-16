import type { Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";
import type { serializeUser } from "./db/user";

export const UserContext =
  createContextId<Signal<ReturnType<typeof serializeUser> | null>>("user");
