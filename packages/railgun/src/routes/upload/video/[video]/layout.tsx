import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { assertObjectId } from "~/utils/middleware";

export const onRequest: RequestHandler = ({ params, error }) => {
  if (!assertObjectId(params.video)) {
    throw error(404, "URL is not a valid ObjectId");
  }
};

export default component$(() => <Slot />);
