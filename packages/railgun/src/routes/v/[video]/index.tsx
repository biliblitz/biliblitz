import type { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = ({ params, redirect }) => {
  throw redirect(302, `/v/${params.video}/0/`);
};
