import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { assertObjectId } from "~/utils/assert";

export const onRequest: RequestHandler = ({ params }) => {
  assertObjectId(params.video);
};

export default component$(() => <Slot />);
