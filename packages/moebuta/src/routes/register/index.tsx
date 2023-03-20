import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, Form, Link, z, zod$ } from "@builder.io/qwik-city";
import { MongoServerError } from "mongodb";
import { userRegister } from "~/utils/db/user";

export const useRegister = routeAction$(
  async (data, { fail, redirect }) => {
    try {
      const result = await userRegister(data.username, data.password);

      if (!result.acknowledged) {
        return fail(403, { reason: "Permission Denied" });
      }

      throw redirect(302, `/u/${result.insertedId.toHexString()}`);
    } catch (e) {
      if (e instanceof MongoServerError && e.code === 11000) {
        return fail(403, { reason: "Username is Taken" });
      } else {
        throw e;
      }
    }
  },
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
          <input type="text" class="input" name="username" />
        </label>
        <label class="block py-2">
          <span>Password</span>
          <input type="password" class="input" name="password" />
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

      <p class="text-red-500">{register.value?.reason}</p>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Register - Moebuta",
};
