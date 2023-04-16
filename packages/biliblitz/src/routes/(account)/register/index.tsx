import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, Form, Link, z, zod$ } from "@builder.io/qwik-city";
import { issueSession } from "~/utils/db/session";
import { userRegister } from "~/utils/db/user";
import { ActionRedirect, action } from "~/utils/qwik";

export const useRegister = routeAction$(
  action(async (data, { cookie }) => {
    const user = await userRegister(data.username, data.password);

    const session = await issueSession(user._id);
    cookie.set("session", session, {
      maxAge: [4, "weeks"],
      httpOnly: true,
      path: "/",
    });

    throw new ActionRedirect(302, `/u/${user._id}`);
  }),
  zod$({
    username: z.string().min(1),
    password: z.string().min(1),
  })
);

export default component$(() => {
  const register = useRegister();

  return (
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Register</h2>

      <Form action={register} class="w-96">
        <label class="block py-2">
          <span>Username</span>
          <input type="text" class="input" name="username" required />
        </label>
        <label class="block py-2">
          <span>Password</span>
          <input type="password" class="input" name="password" required />
        </label>
        <div class="mt-2 flex justify-between">
          <button class="btn" disabled={register.isRunning}>
            Register
          </button>
          <Link class="btn-ghost btn" href="/login">
            Login
          </Link>
        </div>
      </Form>

      <p class="text-red-500">{register.value?.errorMessage}</p>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Register - biliblitz",
};
