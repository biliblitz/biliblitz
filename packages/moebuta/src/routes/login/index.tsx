import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { action$, Form, Link, z, zod$ } from "@builder.io/qwik-city";
import { issueSession } from "~/utils/db/session";
import { userLogin } from "~/utils/db/user";

export const useLogin = action$(
  async (data, { cookie, redirect }) => {
    const user = await userLogin(data.username, data.password);

    if (!user) {
      return { reason: "User not exist" };
    }

    const session = await issueSession(user._id);
    cookie.set("session", session, {
      maxAge: [4, "weeks"],
      httpOnly: true,
      path: "/",
    });

    throw redirect(302, `/u/${user._id.toHexString()}`);
  },
  zod$({
    username: z.string().min(1),
    password: z.string().min(1),
  })
);

export default component$(() => {
  const login = useLogin();

  return (
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Login</h2>

      <Form action={login} class="w-96">
        <label class="block py-2">
          <span>Username</span>
          <input type="text" class="input" name="username" />
        </label>
        <label class="block py-2">
          <span>Password</span>
          <input type="password" class="input" name="password" />
        </label>
        <div class="mt-2 flex justify-between">
          <button class="btn" disabled={login.isRunning}>
            Login
          </button>
          <Link class="btn-ghost btn" href="/register">
            Register
          </Link>
        </div>
      </Form>

      <p class="text-red-500">{login.value?.reason}</p>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Login - Moebuta",
};
