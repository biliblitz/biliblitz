import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, Form, Link, z, zod$ } from "@builder.io/qwik-city";
import { userRegister } from "~/utils/db/user";

export const useRegister = routeAction$(
  async (data, { fail, redirect }) => {
    try {
      const user = await userRegister(data.username, data.password);

      redirect(302, `/u/${user._id}`);
    } catch (e) {
      if (e instanceof Error) {
        fail(400, { message: e.message });
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
  title: "Register - biliblitz",
};
